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
