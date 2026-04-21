# PHIẾU BÀI TẬP 01 - ĐÁP ÁN
Tên học viên: Phạm Minh Đức
MSSV: 2251172292

---

## PHẦN A — KIỂMẾ TRA ĐỌC HIỂU

### Câu A1 (5đ) — HTTP & Browser
*Nguồn tham chiếu: tuan_1_html5/01_introduction_html_universe.md — Phần 1.1 "Architechture Client-Server" và Phần 4.3 "Developer Tools"*

**1. 5 bước xảy ra khi gõ `https://shopee.vn` vào trình duyệt và nhấn Enter:**
1. Trình duyệt (Client) gửi HTTP Request từ máy tính của bạn đi qua router WiFi.
2. Request đi qua nhà mạng (ISP) để truyền qua mạng lưới Internet (cáp quang).
3. Request đi đến được Server (Data Center) của Shopee.
4. Server của Shopee tiếp nhận và xử lý yêu cầu (lấy dữ liệu sản phẩm, banner,...).
5. Server đóng gói dữ liệu và gửi trả lại HTTP Response (bao gồm các file HTML, CSS, JS, Hình ảnh) về trình duyệt của bạn.
6. Trình duyệt khởi chạy quá trình Rendering: Parse HTML, gióng CSS và chạy JS để hiển thị giao diện phần News Feed (hay trang chủ Shopee) lên màn hình.

**2. Tab Network trong DevTools cho thấy thông tin gì?**
Tab Network trong bảng F12 (DevTools) dùng để xem và theo dõi toàn bộ các HTTP Requests và Responses được gửi đi/nhận về giữa trình duyệt và server. Bạn có thể thấy file nào đang tải, mất bao nhiêu thời gian, kích thước file, cũng như Status Code (như 200 OK hay 404 Not Found).

**3. Hình ảnh chụp Tab Network của trang Shopee:**
![Network Screenshot](./network-shopee.png.png)

---

### Câu A2 (5đ) — Semantic HTML
*Nguồn tham chiếu: tuan_1_html5/04_visible_part_html.md*

**Các lỗi semantic và thẻ thay thế tương ứng:**
1. `<div class="header">`  Thay bằng thẻ: `<header>`
2. `<div class="menu">`    Thay bằng thẻ: `<nav>`
3. `<div class="main">`    Thay bằng thẻ: `<main>`
4. `<div class="footer">`  Thay bằng thẻ: `<footer>`

---

### Câu A3 (5đ) — Block vs Inline
*Nguồn tham chiếu: tuan_1_html5/04_visible_part_html.md*

**Mô tả kết quả hiển thị của đoạn HTML:**

```text
Dòng 1: Hộp 1
Dòng 2: Text A Text B
Dòng 3: Hộp 2
Dòng 4: Text C Text D (in đậm)
Dòng 5: Hộp 3
```

**Giải thích tại sao lại hiển thị như vậy:**
- Hộp (Thẻ `<div>`) là các phần tử khối (Block): Luôn tự động nhảy xuống một dòng mới khi khai báo và nó chiếm chiều ngang không gian tối đa của trang web. Do vậy các hình hộp 1,2,3 đều đứng cô đơn trên 1 dòng.
- Text (Thẻ `<span>` và `<strong>`) là phần tử nội tuyến (Inline): Chúng được phép chung sống trên cùng một mạn dòng, chỉ tốn một không gian hẹp vừa đúng bằng dòng text nó chứa. Riêng `<strong>` làm chữ in đậm giúp mạnh SEO thêm chút.

---

---
