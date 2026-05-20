# ĐÁP ÁN PHIẾU BÀI TẬP 05 - CSS RESPONSIVE & SCSS

## PHẦN A — KIỂM TRA ĐỌC HIỂU

### Câu A1 (5đ) — Viewport & Mobile-First

1. Thẻ meta viewport chuẩn và giải thích từng thuộc tính

Thẻ viết đầy đủ như sau:
meta name="viewport" content="width=device-width, initial-scale=1.0"

Giải thích từng phần:
- name="viewport": Cho trình duyệt biết đây là thông số cấu hình vùng hiển thị (viewport) của trang.
- width=device-width: Yêu cầu trình duyệt đặt chiều rộng của viewport bằng đúng chiều rộng thực tế của màn hình thiết bị đang dùng, thay vì mặc định 980px.
- initial-scale=1.0: Đặt mức phóng to ban đầu (zoom) là 1x, tức là hiển thị đúng kích thước thực, không thu nhỏ và cũng không phóng to.

2. Nếu thiếu thẻ này, iPhone sẽ hiển thị như thế nào?

Khi không có thẻ meta viewport, các trình duyệt di động (bao gồm Safari trên iPhone) sẽ mặc định giả lập chiều rộng màn hình khoảng 980px. Kết quả là toàn bộ trang web bị thu nhỏ lại để nhồi vừa vào màn hình nhỏ của điện thoại. Người dùng sẽ thấy chữ cực kỳ nhỏ, bố cục bị co rúm, và phải dùng 2 ngón tay kéo giãn (pinch-to-zoom) mới đọc được nội dung. Về cơ bản là trang web hoàn toàn không dùng được trên điện thoại.

3. Mobile-First và Desktop-First khác nhau thế nào?

Mobile-First là cách viết CSS bắt đầu từ màn hình nhỏ nhất (điện thoại) trước, sau đó dùng media query min-width để mở rộng dần lên các màn hình lớn hơn (tablet, desktop).

Ví dụ Mobile-First với breakpoint 768px:
.product-grid {
    display: grid;
    grid-template-columns: 1fr;
}
@media (min-width: 768px) {
    .product-grid {
        grid-template-columns: repeat(2, 1fr);
    }
}

Desktop-First là cách ngược lại, viết CSS cho màn hình lớn trước, rồi dùng media query max-width để thu nhỏ dần xuống.

Ví dụ Desktop-First với breakpoint 768px:
.product-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
}
@media (max-width: 768px) {
    .product-grid {
        grid-template-columns: 1fr;
    }
}

Tại sao Mobile-First được khuyên dùng?
- Ngày nay hơn 60% lượng truy cập web đến từ điện thoại di động, nên ưu tiên thiết kế cho mobile là hợp lý.
- Trình duyệt tải CSS theo thứ tự từ trên xuống. Với Mobile-First, thiết bị điện thoại yếu sẽ chỉ cần tải phần CSS cơ bản nhất và bỏ qua các khối media query phức tạp hơn, giúp trang tải nhanh hơn đáng kể.
- Về mặt tư duy thiết kế, Mobile-First buộc lập trình viên phải ưu tiên nội dung quan trọng nhất lên trước, loại bỏ phần thừa, tạo ra trải nghiệm gọn gàng hơn.

---

### Câu A2 (5đ) — Breakpoints chuẩn

Các breakpoints phổ biến theo Bootstrap và thực tế ngành:

1. Extra Small - xs (dưới 576px)
- Thiết bị đại diện: Điện thoại nhỏ (iPhone SE, Galaxy A series)
- Lưới sản phẩm nên hiển thị: 1 cột (toàn màn hình)

2. Small - sm (576px trở lên)
- Thiết bị đại diện: Điện thoại màn hình lớn (iPhone Plus, Samsung S series)
- Lưới sản phẩm nên hiển thị: 1 hoặc 2 cột

3. Medium - md (768px trở lên)
- Thiết bị đại diện: Tablet dọc (iPad, Samsung Tab)
- Lưới sản phẩm nên hiển thị: 2 cột

4. Large - lg (992px trở lên)
- Thiết bị đại diện: Tablet ngang, laptop nhỏ
- Lưới sản phẩm nên hiển thị: 3 cột

5. Extra Large - xl (1200px trở lên)
- Thiết bị đại diện: Desktop, laptop màn hình lớn
- Lưới sản phẩm nên hiển thị: 4 cột

6. XXL (1400px trở lên)
- Thiết bị đại diện: Màn hình 2K, 4K, widescreen
- Lưới sản phẩm nên hiển thị: 4 đến 6 cột tùy nội dung

Ghi chú thực tế: Trong thực tế dự án, không nhất thiết phải dùng hết 6 breakpoints. Phần lớn các trang web chỉ cần 3 mốc chính là Mobile (dưới 768px), Tablet (768px đến 1023px) và Desktop (1024px trở lên) là đủ để xử lý tốt đại đa số thiết bị trên thị trường.

---
