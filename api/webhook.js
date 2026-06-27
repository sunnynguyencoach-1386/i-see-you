import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export const config = { api: { bodyParser: false } };

const processedTransactions = new Set();

function extractEmail(des = '') {
  const match = des.match(/VID_(.+@.+\..+)/i);
  if (match) return match[1];
  const match2 = des.match(/VID_([^\s]+)/i);
  return match2 ? match2[1] + '@gmail.com' : null;
}

async function withRetry(fn, retries = 3, delay = 1000) {
  for (let i = 0; i < retries; i++) {
    try { return await fn(); }
    catch (err) {
      if (i === retries - 1) throw err;
      await new Promise(r => setTimeout(r, delay * (i + 1)));
    }
  }
}

async function sendTelegram(order) {
  if (!process.env.TELEGRAM_TOKEN || !process.env.TELEGRAM_CHAT_ID) return;
  const now = new Date().toLocaleString('vi-VN', { timeZone: 'Asia/Ho_Chi_Minh' });
  const msg = `🛒 ĐƠN MỚI\n💰 ${Number(order.amount).toLocaleString('vi-VN')}đ\n📧 ${order.customer_email}\n⏰ ${now}\n→ Email đã gửi tự động ✉️`;
  await withRetry(() =>
    fetch(`https://api.telegram.org/bot${process.env.TELEGRAM_TOKEN}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ chat_id: process.env.TELEGRAM_CHAT_ID, text: msg }),
    })
  );
}

async function sendEmail(order) {
  await withRetry(() =>
    resend.emails.send({
      from: 'onboarding@resend.dev',
      to: order.customer_email,
      subject: '☀ Workbook I See You của bạn đã sẵn sàng!',
      html: `<div style="font-family:sans-serif;max-width:520px;margin:0 auto;padding:32px">
        <h2 style="color:#1A1208">Chào mừng bạn đến với hành trình! ☀</h2>
        <p>Cảm ơn bạn đã tin tưởng. Đây là link workbook của bạn:</p>
        <a href="${process.env.PRODUCT_LINK || 'https://i-see-you-psi.vercel.app/ebook.html'}"
           style="display:inline-block;padding:14px 28px;background:#F5A623;color:white;text-decoration:none;font-weight:700;border-radius:10px;margin:16px 0">
          ☀ Mở Workbook Ngay
        </a>
        <p style="color:#888;font-size:13px">Mã GD: ${order.transaction_id}</p>
        <p style="color:#888;font-size:13px">Sunny Trang · sunnytrangbiz@gmail.com</p>
      </div>`
    })
  );
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

  const resolvedEmail = extractEmail(description) || extractEmail(transaction_id);
  if (!resolvedEmail) return res.status(200).json({ ok: true, note: 'no email' });

  if (processedTransactions.has(transaction_id))
    return res.status(200).json({ ok: true, note: 'duplicate' });
  processedTransactions.add(transaction_id);

  const order = { transaction_id, amount, customer_email: resolvedEmail };

  await Promise.allSettled([sendEmail(order), sendTelegram(order)]);

  return res.status(200).json({ ok: true });
}
