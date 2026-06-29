import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export const config = { api: { bodyParser: false } };

const processed = new Set();

function extractEmail(des = '') {
  const m1 = des.match(/VID_(.+@.+\..+)/i);
  if (m1) return m1[1];
  const m2 = des.match(/VID_([^\s]+)/i);
  return m2 ? m2[1] + '@gmail.com' : null;
}

async function sendTelegram(order) {
  if (!process.env.TELEGRAM_TOKEN || !process.env.TELEGRAM_CHAT_ID) return;
  const now = new Date().toLocaleString('vi-VN', { timeZone: 'Asia/Ho_Chi_Minh' });
  const msg = `🛒 ĐƠN MỚI!\n💰 ${Number(order.amount).toLocaleString('vi-VN')}đ\n📧 Khách: ${order.email}\n⏰ ${now}\n✉️ Email thông báo đã gửi về sunnynguyencoach@gmail.com`;
  await fetch(`https://api.telegram.org/bot${process.env.TELEGRAM_TOKEN}/sendMessage`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ chat_id: process.env.TELEGRAM_CHAT_ID, text: msg }),
  });
}

async function sendEmail(order) {
  await resend.emails.send({
    from: 'onboarding@resend.dev',
    to: 'sunnynguyencoach@gmail.com',
    subject: `☀ ĐƠN MỚI - Ebook I See You cho ${order.email}`,
    html: `
      <div style="font-family:sans-serif;max-width:520px;margin:0 auto;padding:32px;background:#FDF8F0">
        <h2 style="color:#1A1208">☀ Có đơn hàng mới!</h2>
        <p><strong>Email khách:</strong> ${order.email}</p>
        <p><strong>Số tiền:</strong> ${Number(order.amount).toLocaleString('vi-VN')}đ</p>
        <p><strong>Mã GD:</strong> ${order.transaction_id}</p>
        <hr style="border:1px solid #F0E0B8;margin:16px 0"/>
        <p style="color:#7A5C2E">Gửi link ebook này cho khách <strong>${order.email}</strong>:</p>
        <a href="https://i-see-you-psi.vercel.app/ebook.html"
           style="display:inline-block;padding:14px 28px;background:#F5A623;color:white;text-decoration:none;font-weight:700;border-radius:10px;margin:8px 0">
          ☀ Link Ebook I See You
        </a>
        <p style="color:#C8B89A;font-size:12px;margin-top:16px">Sunny Trang · sunnytrangbiz@gmail.com</p>
      </div>
    `
  });
}

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();

  const rawBody = await new Promise((resolve, reject) => {
    let data = '';
    req.on('data', chunk => data += chunk);
    req.on('end', () => resolve(data));
    req.on('error', reject);
  });

  const body = JSON.parse(rawBody);
  const { transaction_id, amount, transferType, description } = body;

  if (transferType === 'out') return res.status(200).json({ ok: true });

  const email = extractEmail(description) || extractEmail(transaction_id);
  if (!email) return res.status(200).json({ ok: true, note: 'no email' });

  if (processed.has(transaction_id)) return res.status(200).json({ ok: true, note: 'duplicate' });
  processed.add(transaction_id);

  const order = { transaction_id, amount, email };

  await Promise.allSettled([sendEmail(order), sendTelegram(order)]);

  return res.status(200).json({ ok: true });
}
