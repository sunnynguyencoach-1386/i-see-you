const GMAIL_URL = 'https://script.google.com/macros/s/AKfycbyJqJ4mp8FnTR8ChetYdNrXY-NiQNLBluj1UYLNsLO5l_jyTJk93f2jhaNCuOlRy1qA/exec';

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
  const msg = `🛒 ĐƠN MỚI!\n💰 ${Number(order.amount).toLocaleString('vi-VN')}đ\n📧 ${order.email}\n⏰ ${now}\n✉️ Email ebook đã gửi tự động`;
  await fetch(`https://api.telegram.org/bot${process.env.TELEGRAM_TOKEN}/sendMessage`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ chat_id: process.env.TELEGRAM_CHAT_ID, text: msg }),
  });
}

async function sendEmail(order) {
  await fetch(GMAIL_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: order.email, transaction_id: order.transaction_id }),
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
