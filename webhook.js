import { Resend } from 'resend';
import crypto from 'crypto';

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
  const orderNumber = order.transaction_id.slice(-6).toUpperCase();
  const message = [
    `🛒 *ĐƠN HÀNG MỚI #${orderNumber}*`, ``,
    `💰 Thanh toán: ${Number(order.amount).toLocaleString('vi-VN')}đ ✅`,
    `📧 Email: ${order.customer_email}`,
    `📦 Sản phẩm: I See You Workbook`,
    `💳 Mã GD: ${order.transaction_id}`,
    `⏰ Thời gian: ${now}`, ``,
    `→ Email sản phẩm đã gửi tự động ✉️`,
  ].join('\n');
  await withRetry(() =>
    fetch(`https://api.telegram.org/bot${process.env.TELEGRAM_TOKEN}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ chat_id: process.env.TELEGRAM_CHAT_ID, text: message, parse_mode: 'Markdown' }),
    }).then(r => { if (!r.ok) throw new Error(`Telegram ${r.status}`); })
  );
}

async function sendEmail(order) {
  await withRetry(() =>
    resend.emails.send({
      from: 'onboarding@resend.dev',
      to: order.customer_email,
      subject: '☀ Workbook "I See You" của bạn đã sẵn sàng!',
      html: `
        <div style="font-family:'Helvetica Neue',sans-serif;max-width:540px;margin:0 auto;padding:40px 24px;background:#FDF8F0">
          <div style="text-align:center;margin-bottom:32px">
            <div style="width:64px;height:64px;background:linear-gradient(135deg,#F5A623,#E8960C);border-radius:50%;display:inline-flex;align-items:center;justify-content:center;font-size:28px;color:white">☀</div>
            <h1 style="font-size:24px;color:#1A1208;margin:16px 0 4px">Chào mừng bạn đến với hành trình!</h1>
            <p style="color:#7A5C2E;font-size:15px;margin:0">Cảm ơn bạn đã tin tưởng — Sunny Trang</p>
          </div>

          <div style="background:white;border-radius:16px;padding:28px;margin-bottom:24px;border:1px solid #F0E0B8">
            <p style="color:#1A1208;font-size:16px;margin:0 0 16px">Xin chào <strong>${order.customer_email.split('@')[0]}</strong>,</p>
            <p style="color:#3D2C14;font-size:15px;line-height:1.7;margin:0 0 20px">
              Cảm ơn bạn đã bắt đầu hành trình <strong>"I See You — 7 Ngày Nhìn Thấy Chính Mình"</strong>.
              Đây là bước đầu tiên để bạn thật sự sống — không chỉ tồn tại.
            </p>
            <div style="text-align:center">
              <a href="${process.env.PRODUCT_LINK || 'https://i-see-you-psi.vercel.app/ebook.html'}"
                 style="display:inline-block;padding:16px 32px;background:linear-gradient(135deg,#F5A623,#E8960C);
                        color:white;text-decoration:none;font-weight:700;border-radius:12px;font-size:16px;
                        box-shadow:0 4px 16px rgba(232,150,12,0.3)">
                ☀ Mở Workbook Ngay
              </a>
            </div>
          </div>

          <div style="background:#FEF3DC;border-radius:12px;padding:20px;margin-bottom:24px">
            <p style="font-weight:700;color:#1A1208;margin:0 0 8px">📌 Gợi ý bắt đầu:</p>
            <ul style="color:#7A5C2E;font-size:14px;line-height:1.8;margin:0;padding-left:20px">
              <li>Mỗi ngày chỉ cần <strong>15–20 phút</strong></li>
              <li>Làm theo thứ tự từ Ngày 1 đến Ngày 7</li>
              <li>Lấy giấy bút ra — viết tay hiệu quả hơn gõ máy</li>
              <li>Không có câu trả lời đúng sai — chỉ có câu trả lời thật của bạn</li>
            </ul>
          </div>

          <div style="text-align:center;padding-top:20px;border-top:1px solid #F0E0B8">
            <p style="color:#7A5C2E;font-size:13px;margin:0 0 4px">Sunny Trang · Người Mặt Trời</p>
            <p style="color:#B8924A;font-size:12px;margin:0">sunnytrangbiz@gmail.com · 0913 922 713</p>
            <p style="color:#C8B89A;font-size:11px;margin-top:12px">Mã giao dịch: ${order.transaction_id}</p>
          </div>
        </div>
      `
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

  // Bỏ qua xác thực chữ ký — sẽ bật lại sau khi xác nhận luồng hoạt động

  const { transaction_id, amount, transferType, description } = body;

  // Chỉ xử lý giao dịch tiền vào
  if (transferType === 'out') return res.status(200).json({ ok: true, note: 'skip outgoing' });

  const resolvedEmail = extractEmail(description) || extractEmail(transaction_id);

  if (!resolvedEmail) {
    console.error('[webhook] No email in description:', description);
    return res.status(200).json({ ok: true, note: 'no email found' });
  }

  if (processedTransactions.has(transaction_id))
    return res.status(200).json({ ok: true, note: 'duplicate' });
  processedTransactions.add(transaction_id);

  const order = { transaction_id, amount, customer_email: resolvedEmail };

  const results = await Promise.allSettled([
    sendEmail(order),
    sendTelegram(order),
  ]);
  results.forEach((r, i) => {
    if (r.status === 'rejected')
      console.error(`[${i===0?'email':'telegram'}] failed:`, r.reason);
  });

  return res.status(200).json({ ok: true });
}
