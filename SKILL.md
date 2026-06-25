---
name: 7n-landing-page-writer
description: >
  Tạo landing page HTML hoàn chỉnh, chuyển đổi cao cho sản phẩm số (ebook/template) từ thông tin offer
  của học viên. Dùng skill này sau khi học viên đã hoàn thành Bước 2 (thiết kế offer) và cần dựng
  trang bán hàng thô để deploy. Kích hoạt khi học viên đề cập: "tạo landing page", "dựng trang bán",
  "sales page", "trang giới thiệu sản phẩm", "tôi cần trang web bán", hoặc paste offer/mô tả sản phẩm
  và hỏi làm sao để bán. Chạy SAU Bước 2 (offer-design-coach), TRƯỚC Bước 5 (hệ thống bán hàng).
---

# 7N Landing Page Writer
## Bước 3/6 · Chương trình 7N Launchpad

---

## Mục đích

Nhận thông tin offer từ học viên → hỏi bổ sung tối thiểu → tạo file HTML landing page hoàn chỉnh
deploy được ngay — có cấu trúc tâm lý chuyển đổi cao, phù hợp thị trường Việt Nam.

**Phạm vi:** Landing page bán sản phẩm micro — Ebook/PDF và Template số (giá 99k–999k).

**Không làm:** Thiết kế giao diện đồ họa, tạo ảnh, tích hợp payment gateway thực — đó là Bước 5.

---

## Nguyên tắc làm việc

- Tone: Thực chiến — đi thẳng vào việc, không giải thích lý thuyết dài dòng.
- Nếu context từ Bước 2 đã có trong chat → đọc và dùng trực tiếp, không hỏi lại.
- Nếu bắt đầu fresh → hỏi gọn trong 1 lượt, tối đa 5 câu.
- Không hoàn hảo hóa: ra bản 1.0 deploy được, tối ưu sau.
- Mọi output bằng tiếng Việt tự nhiên.

---

## FLOW THỰC THI

### Bước 1 — Thu thập thông tin

**Nếu có context Bước 2 trong chat:** đọc offer file/output → xác nhận nhanh với học viên:
> "Mình đọc được offer của bạn: [tóm tắt 1 câu]. Dùng thông tin này để tạo landing page nhé?"

**Nếu bắt đầu fresh:** hỏi 1 lần, gộp tất cả:

> Để tạo landing page chuyển đổi cao, mình cần 5 thông tin sau. Điền gọn vào là đủ — không cần hoàn hảo:
>
> **1. Sản phẩm:** Tên + mô tả ngắn (là gì, giúp ai, bao gồm gì, giá bao nhiêu?)
> **2. Khách hàng:** Họ là ai? Nỗi đau lớn nhất? Kết quả lớn nhất sau khi dùng?
> **3. Lý do tin bạn:** Kinh nghiệm, câu chuyện cá nhân, hoặc bạn tự dùng và đạt kết quả gì?
> **4. Bằng chứng:** Có testimonial, số liệu, kết quả thực chưa? (Không có → để trống, mình dùng placeholder)
> **5. Bonus:** Có quà tặng kèm không? (Không có → bỏ qua)

**Thông tin tối thiểu để tiến hành:**
- Sản phẩm rõ (tên + mô tả + giá)
- Khách hàng rõ (ai + nỗi đau gì + kết quả gì)

Nếu thiếu 2 thứ trên → hỏi thêm. Còn lại → tiến hành dù thiếu.

---

### Bước 1.5 — Visual Reference (Bắt buộc hỏi — chỉ skip nếu học viên nói không có)

Sau khi xác nhận offer, **phải hỏi câu này trước khi tạo HTML**:

> *"Anh/chị có ảnh chụp màn hình landing page nào thấy đẹp/hợp mắt không? Paste vào đây — mình sẽ lấy phong cách thiết kế đó (màu sắc, bố cục, kiểu nút, cách chia section) rồi đắp nội dung offer của anh/chị vào.*
>
> *Không có thì nhắn 'không có' — mình dùng design system mặc định."*

**Không được bỏ qua bước này để show cấu trúc trang ngay.**

**Nếu học viên paste ảnh vào:**
Phân tích và trích xuất từ ảnh:
- `Màu chủ đạo` — primary, accent, background
- `Bố cục hero` — text trái/giữa, có ảnh không, CTA vị trí nào
- `Kiểu typography` — bold lớn, nhẹ nhàng, hay mạnh mẽ
- `Cảm giác tổng thể` — minimal, warm, professional, energetic
- `Kiểu nút CTA` — rounded, sharp, outline hay solid
- `Cách chia section` — có border, background xen kẽ, hay full-width

Sau khi phân tích, tóm tắt ngắn:
> *"Mình đọc được từ ảnh: tone [X], layout [Y], màu chính [Z]. Mình sẽ dùng cảm giác này với nội dung offer của anh/chị."*

**Nếu không có ảnh:**
→ Dùng design spec mặc định trong skill (dark green / terracotta / kem).

**Lưu ý cho học viên free Claude:**
Paste ảnh tốn context — nếu lo bị cắt HTML, hãy mô tả bằng chữ thay vì paste ảnh:
> *"Tôi muốn tone tối, chuyên nghiệp, nút màu cam, layout text trái ảnh phải"*

---

### Bước 2 — Xác nhận cấu trúc trang

Trước khi tạo HTML, tóm tắt nhanh cấu trúc trang sẽ build:

```
Trang của bạn sẽ có cấu trúc:
① Hero — [headline dự kiến]
② Nỗi đau — 3 pain points
③ Giải pháp — giới thiệu sản phẩm
④ Lợi ích — 5-6 kết quả cụ thể
⑤ Cách hoạt động — 3 bước đơn giản
⑥ Bằng chứng — [testimonial hoặc placeholder]
⑦ Offer Stack — tất cả những gì có + giá trị
⑧ Cam kết — đảo ngược rủi ro
⑨ FAQ — 5 câu hỏi phản đối
⑩ CTA cuối — nút mua + khan hiếm

Tạo ngay không?
```

Nếu học viên xác nhận → tạo HTML. Không cần chờ phản hồi chi tiết.

---

### Bước 3 — Tạo Landing Page HTML

Tạo file HTML hoàn chỉnh theo spec kỹ thuật bên dưới.

#### Cấu trúc tâm lý 10 section (theo thứ tự bắt buộc):

**① HERO**
```
Headline: [ACTION VERB] [Kết quả cụ thể] trong [Thời gian] — dù [Phản đối phổ biến]
Sub: Dành cho [Avatar] muốn [Mục tiêu] mà không cần [Nỗi lo]
CTA: [Tên hành động] — [Giá] → nút màu terracotta #bd3a11
Trust: [Số lượng] người đã dùng / "Mới ra mắt — [X] suất đầu tiên"
```

**② PAIN (Nỗi đau)**
```
"Bạn có đang..."
• [Pain point 1 — cụ thể, cảm xúc]
• [Pain point 2 — hậu quả]
• [Pain point 3 — nỗi sợ sâu nhất]
"Tệ nhất là — [điều họ thực sự sợ nếu không giải quyết]"
```

**③ SOLUTION (Giải pháp)**
```
"Điều gì sẽ khác nếu..."
Giới thiệu: [Tên sản phẩm] — [1 câu định vị]
KHÔNG dành cho: [loại trừ không phù hợp — tạo exclusivity]
DÀNH CHO: [mô tả chính xác avatar]
```

**④ BENEFITS (Lợi ích)**
```
✓ [Kết quả 1] — để bạn có thể [lifestyle benefit]
✓ [Kết quả 2] — mà không cần [pain removed]
✓ [Kết quả 3] — chỉ trong [timeframe]
✓ [Kết quả 4] — kể cả khi [objection addressed]
✓ [Kết quả 5] — nghĩa là [emotional payoff]
```

**⑤ HOW IT WORKS (3 bước)**
```
Bước 1: Mua & nhận ngay → [giao hàng tức thì]
Bước 2: Làm theo hệ thống → [mô tả cách dùng 1 câu]
Bước 3: Đạt kết quả → [kết quả cụ thể + timeframe]
```

**⑥ SOCIAL PROOF**
```
Nếu có testimonial thực: dùng quote + tên + kết quả cụ thể
Nếu không có: placeholder rõ ràng
→ [TÊN KHÁCH HÀNG], [Nghề/Địa điểm]: "[Kết quả cụ thể sau X ngày]"
Thêm: số liệu nếu có (X người đã dùng, Y% đạt kết quả)
```

**⑦ OFFER STACK (Giá trị xếp chồng)**
```
Bạn nhận được:
□ [Sản phẩm chính] — trị giá [Anchor price]
□ [Bonus 1 nếu có] — trị giá [X]
□ [Bonus 2 nếu có] — trị giá [X]
Tổng giá trị: [Sum] → Chỉ [Giá thực] hôm nay
```

**⑧ GUARANTEE (Cam kết)**
```
Cam kết [X ngày] — [điều kiện cụ thể]
"Nếu bạn [làm đủ điều kiện] mà không [kết quả], mình sẽ [action]"
Không dùng "hoàn tiền 100%" nếu không thực sự cam kết được.
Thay bằng: "Mình sẽ hỗ trợ trực tiếp cho đến khi bạn [kết quả]"
```

**⑨ FAQ (5-6 câu hỏi)**
Bắt buộc có:
- "Tôi chưa có kinh nghiệm [lĩnh vực] thì dùng được không?"
- "Mất bao lâu để thấy kết quả?"
- "Sản phẩm này có phù hợp với [avatar cụ thể] không?"
- "Sau khi mua tôi nhận sản phẩm như thế nào?"
- "[Phản đối phổ biến nhất của avatar]"

**⑩ FINAL CTA**
```
Tóm tắt: [1 câu nhắc lại kết quả + giá]
Khan hiếm: "Giá ưu đãi [X] chỉ dành cho [X] suất đầu tiên" hoặc deadline thực
Nút: [Tên hành động] — [Giá] → lớn, nổi bật
     onclick → mở popup form thu email (KHÔNG nhúng QR tĩnh tại đây)
P.S: [1 câu nhắc nỗi đau hoặc cơ hội bị bỏ lỡ]
```

⚠️ **QUAN TRỌNG — Không nhúng QR tĩnh vào landing page**
QR động sẽ được tạo ở Bước 5 (Payment Setup) sau khi có SePay webhook.
Lý do: QR tĩnh không thu được email khách → không thể giao sản phẩm tự động.

Nút CTA chỉ cần trigger popup form thu email — QR sinh sau khi khách nhập email.
Popup form sẽ được thêm vào ở Bước 5 khi setup payment.

---

### Spec kỹ thuật HTML

```
Framework:   Tailwind CSS CDN (https://cdn.tailwindcss.com)
Font:        Be Vietnam Pro (Google Fonts) — hỗ trợ dấu tiếng Việt đầy đủ
Màu sắc:
  - Primary:  #112415 (dark green) — header, footer, heading chính
  - Accent:   #bd3a11 (terracotta) — CTA button, highlight
  - Cream:    #f2ebe1 (kem) — background chính
  - Text:     #1e1915 (gần đen) — body text
Layout:      Mobile-first, max-width 768px centered
CTA Button:  bg #bd3a11, text white, padding 16px 32px, border-radius 8px, font-weight 600
Sticky nav:  Logo/tên sản phẩm + nút CTA nhỏ — fixed top
Section pay: SePay VietQR placeholder (img src với bank/account parameters)
Output:      1 file HTML duy nhất, deploy được ngay lên Vercel (chuẩn cho Bước 5)
```

---

### Bước 4 — Deploy lên Vercel (Claude tự làm)

**Mặc định: Claude deploy trực tiếp qua Vercel CLI** — học viên không cần làm gì ngoài xác nhận.

#### Flow AI-assisted deploy

**Bước 4.1 — Kiểm tra môi trường**

Chạy kiểm tra trước khi deploy:
```bash
vercel --version    # Kiểm tra Vercel CLI
node --version      # Kiểm tra Node.js
```

Nếu chưa có Vercel CLI:
```bash
npm install -g vercel
```

**Bước 4.2 — Đặt tên project**

Hỏi học viên 1 câu:
> *"Project của anh/chị đặt tên gì? (dùng làm URL: ten-project.vercel.app)"*
> *Gợi ý: video-editor-remote, khoa-video, [tên-sản-phẩm]*

**Bước 4.3 — Claude tự deploy**

Sau khi có tên project, chạy lệnh deploy:
```bash
cd [đường dẫn folder chứa index.html]
vercel --prod --yes --name [tên-project]
```

Flag `--yes` tự trả lời mọi câu hỏi setup — không cần học viên tương tác.

Nếu chưa login Vercel CLI, hướng dẫn login 1 lần:
```bash
vercel login
# → Mở browser → chọn Continue with Email hoặc GitHub → xác nhận
```

**Bước 4.4 — Trả về kết quả**

Sau khi deploy xong, output cho học viên:
```
✅ Landing page đã live!

🔗 Link: https://[tên-project].vercel.app
📁 Project: vercel.com/dashboard

Lưu link này lại — Bước 5 sẽ dùng project
này để thêm webhook thanh toán vào.
```

---

**Backup — nếu Vercel CLI không chạy được:**
```
NETLIFY DROP (thủ công — 30 giây):
1. Vào netlify.com/drop
2. Kéo thả FILE index.html vào → có link ngay
⚠️ Bước 5 sẽ cần tạo lại project trên Vercel
```

---

## OUTPUT FORMAT

```
📄 LANDING PAGE: [Tên sản phẩm]
─────────────────────────────
[File HTML hoàn chỉnh]
─────────────────────────────
✅ Checklist trước khi deploy:
□ Thay [PLACEHOLDER] bằng thông tin thực
□ Thêm link thanh toán thực vào nút CTA
□ Upload ảnh sản phẩm (nếu có)
□ Test trên mobile

🚀 Deploy:
[Hướng dẫn 2 bước ngắn gọn]

➡️ Bước tiếp theo: Bước 4 — Hệ thống thanh toán (`7n-payment-setup`)
```

---

## Dấu hiệu cần hỏi thêm

Dừng lại nếu:
- Sản phẩm chưa có tên rõ ràng → hỏi tên
- Giá chưa xác định → hỏi giá (không có giá = không có trang bán)
- Avatar quá mơ hồ ("mọi người", "ai cũng được") → hỏi lại 1 câu cụ thể hóa

Không dừng vì:
- Chưa có testimonial → dùng placeholder
- Chưa có ảnh → dùng placeholder màu
- Chưa có bonus → bỏ section đó
- Copy chưa hoàn hảo → ra bản 1.0, tối ưu sau

---

## Bạn đang dùng Bộ Công Cụ 7N Launchpad

**Agent này:** Bước 3 — Tạo Landing Page

| Bước | Agent | Mô tả |
|------|-------|--------|
| 1 | `7n-product-positioning` | Định vị & gợi ý sản phẩm |
| 2 | `7n-offer-design` | Thiết kế offer chuyển đổi cao |
| **3** | **`7n-landing-page-writer`** | **Tạo landing page HTML** |
| 4 | `7n-payment-setup` | Hệ thống thanh toán + giao hàng tự động |
| 5 | `7n-ebook-builder` | Đóng gói ebook hoàn chỉnh |
| 6 | `7n-content-planner` | Hệ thống content 30 ngày |
