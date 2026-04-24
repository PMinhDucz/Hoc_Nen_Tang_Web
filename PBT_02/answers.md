# ĐÁP ÁN PHẦN LÝ THUYẾT - PBT_02

## PHẦN A — KIỂM TRA ĐỌC HIỂU (25 điểm)

### Câu A1 (5đ) — 10 Input Types trong HTML5

1. `type="email"`: 
   - **Giao diện:** Ô nhập văn bản bình thường (trên điện thoại sẽ tự động hiện bàn phím có nút `@` và `.com`).
   - **Validation tự động:** Trình duyệt tự kiểm tra chuỗi bắt buộc phải có ký tự `@` và domain hợp lệ.
   - **Use case E-Commerce:** Dùng ở trang Đăng ký/Đăng nhập hoặc ô nhập email nhận bản tin khuyến mãi.

2. `type="password"`:
   - **Giao diện:** Ô nhập text nhưng các ký tự bị biến thành dấu chấm đen `•` hoặc dấu sao `*`.
   - **Validation tự động:** Không có (Thường kết hợp với thuộc tính `minlength` hoặc `pattern`).
   - **Use case E-Commerce:** Ô nhập mật khẩu khi tạo tài khoản hoặc đăng nhập mua hàng.

3. `type="number"`:
   - **Giao diện:** Ô nhập số, có kèm hai nút mũi tên nhỏ (spinner) ở góc phải để tăng/giảm giá trị. Điện thoại sẽ hiện bàn phím số.
   - **Validation tự động:** Chỉ cho phép nhập số. Không cho submit nếu nhập chữ cái (trừ chữ 'e' đại diện cho số mũ).
   - **Use case E-Commerce:** Ô điều chỉnh số lượng sản phẩm muốn mua trong Giỏ hàng.

4. `type="tel"`:
   - **Giao diện:** Ô nhập text bình thường (điện thoại sẽ bật bàn phím số chuyên gọi điện).
   - **Validation tự động:** Không tự kiểm tra định dạng số vì mỗi quốc gia một kiểu (Cần dùng thêm `pattern` như `pattern="[0-9]{10}"`).
   - **Use case E-Commerce:** Ô nhập số điện thoại người nhận ở trang Thanh toán (Checkout).

5. `type="date"`:
   - **Giao diện:** Ô text kèm theo một biểu tượng lịch (Calendar) để người dùng bấm vào chọn ngày tháng năm trực quan.
   - **Validation tự động:** Ép buộc định dạng ngày hợp lệ. Có thể giới hạn bằng `min` và `max`.
   - **Use case E-Commerce:** Chọn ngày tháng năm sinh lúc đăng ký, hoặc chọn "Ngày mong muốn nhận hàng".

6. `type="checkbox"`:
   - **Giao diện:** Một ô vuông nhỏ có thể tích (check) hoặc bỏ tích (uncheck).
   - **Validation tự động:** Không (Trừ khi thêm thuộc tính `required` thì bắt buộc phải tích mới được đi tiếp).
   - **Use case E-Commerce:** Dấu tích "Tôi đồng ý với điều khoản dịch vụ" trước khi đặt hàng.

7. `type="radio"`:
   - **Giao diện:** Một ô tròn nhỏ. Khi có nhiều ô tròn cùng chung thuộc tính `name`, chỉ được phép chọn 1 ô duy nhất.
   - **Validation tự động:** Tương tự checkbox.
   - **Use case E-Commerce:** Chọn phương thức thanh toán (COD / Chuyển khoản / Ví Momo).

8. `type="search"`:
   - **Giao diện:** Giống ô text nhưng thường có thêm biểu tượng dấu `x` ở góc để xóa nhanh nội dung vừa gõ.
   - **Validation tự động:** Không có.
   - **Use case E-Commerce:** Thanh tìm kiếm sản phẩm trên cùng (Header) của Shopee/Tiki.

9. `type="file"`:
   - **Giao diện:** Một nút bấm có chữ "Choose File" (Chọn tệp), bấm vào sẽ mở cửa sổ chọn file trên máy tính.
   - **Validation tự động:** Có thể giới hạn loại file tải lên bằng thuộc tính `accept` (VD: `accept="image/png"`).
   - **Use case E-Commerce:** Nút tải ảnh lên để Đánh giá/Review sản phẩm (kèm ảnh thực tế) sau khi nhận hàng.

10. `type="color"`:
    - **Giao diện:** Một ô hình chữ nhật hiển thị màu sắc hiện tại. Bấm vào sẽ mở ra bảng màu (Color Picker) của hệ điều hành.
    - **Validation tự động:** Đảm bảo giá trị trả về luôn là mã màu HEX hợp lệ (VD: `#ff0000`).
    - **Use case E-Commerce:** Chức năng chọn màu sắc áo quần khi đặt hàng tùy chỉnh (Custom T-Shirt design).
