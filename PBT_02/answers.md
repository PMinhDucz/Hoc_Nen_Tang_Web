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

---

### Câu A2 (5đ) — Validation Attributes

**Dự đoán khi bấm Submit:**
- **Trường hợp 1 (Để trống + `required`):** Trình duyệt sẽ chặn không cho Submit và hiển thị popup thông báo lỗi (vd: *"Please fill out this field"* / *"Vui lòng điền vào trường này"*). **Giải thích:** Thuộc tính `required` bắt buộc ô input không được bỏ trống.
- **Trường hợp 2 (Nhập "abc" vào `type="email"`):** Trình duyệt chặn Submit và báo lỗi thiếu ký tự "@". **Giải thích:** Thuộc tính `type="email"` tự động kích hoạt bộ máy kiểm tra định dạng email chuẩn quốc tế.
- **Trường hợp 3 (Nhập "15" vào `max="10"`):** Trình duyệt chặn Submit và báo lỗi giá trị phải nhỏ hơn hoặc bằng 10. **Giải thích:** Giá trị nhập vào nằm ngoài giới hạn cho phép của thuộc tính `max`.
- **Trường hợp 4 (Nhập "abc123" vào `pattern="[0-9]{10}"`):** Trình duyệt chặn Submit và báo lỗi sai định dạng (vd: *"Please match the requested format"*). **Giải thích:** Thuộc tính `pattern` sử dụng Regex bắt buộc người dùng chỉ được phép nhập ĐÚNG 10 ký tự là số (từ 0 đến 9), nhưng user lại gõ chữ cái "abc" và độ dài chưa đủ 10.
- **Trường hợp 5 (Nhập "123" vào `minlength="8"`):** Trình duyệt chặn Submit và báo lỗi độ dài tối thiểu phải là 8 ký tự. **Giải thích:** Thuộc tính `minlength` ép buộc độ dài của chuỗi văn bản nhập vào.

*(Lưu ý: Kết quả screenshot thực tế bằng trình duyệt của 5 trường hợp trên:)*
![TH1](./screenshots/th1.png)
![TH2](./screenshots/th2.png)
![TH3](./screenshots/th3.png)
![TH4](./screenshots/th4.png)
![TH5](./screenshots/th5.png)

---

### Câu A3 (5đ) — Accessibility
1. **Tại sao `<label for="email">` quan trọng cho người dùng screen reader?**
   Screen reader sẽ đọc to nội dung của label khi người khiếm thị focus vào ô input. Ngoài ra, việc dùng thuộc tính `for` (khớp chính xác với `id` của input) giúp tăng diện tích click chuột (người dùng bấm vào chữ thì con trỏ sẽ nhảy luôn vào ô nhập liệu), rất thân thiện trên thiết bị di động màn hình nhỏ.
2. **Khi nào dùng `<fieldset>` + `<legend>`? Cho ví dụ cụ thể.**
   Dùng để nhóm các input có chung một chủ đề lại với nhau, tạo thành một khung viền (fieldset) và có một tiêu đề (legend) giúp form dài trở nên có bố cục rõ ràng và screen reader dễ hiểu hơn. **Ví dụ:** Nhóm các nút Radio chọn Giới tính (Nam/Nữ) hoặc nhóm các trường nhập Địa chỉ (Số nhà/Phường/Quận).
3. **`aria-label` dùng khi nào? Tại sao KHÔNG nên dùng `aria-label` khi đã có `<label>`?**
   `aria-label` dùng khi một input KHÔNG CÓ chữ hiển thị ra ngoài màn hình để dùng làm thẻ `<label>` (VD: Nút chỉ có icon cái kính lúp để tìm kiếm). Không nên lạm dụng `aria-label` nếu đã xài `<label for="..">` vì nó sẽ gây trùng lặp, khiến screen reader đọc tên trường đó 2 lần làm người khiếm thị bị rối trí.

---

### Câu A4 (5đ) — Media
1. **Giải thích thuộc tính `loading="lazy"` trên thẻ `<img>`. Cải thiện gì? Khi nào KHÔNG dùng?**
   Nó yêu cầu trình duyệt CHỈ tải hình ảnh khi người dùng cuộn chuột tới vùng chứa ảnh đó. Giúp cải thiện tốc độ tải trang ban đầu (Page Load Speed) và tiết kiệm băng thông. KHÔNG nên dùng cho các bức ảnh nằm ngay trên cùng của trang web (vùng above-the-fold như Logo, Banner chính) vì ta cần chúng phải hiện ngay lập tức để giữ chân user.
2. **Tại sao nên cung cấp nhiều `<source>` trong thẻ `<video>`? 3 format phổ biến?**
   Vì mỗi trình duyệt (Chrome, Safari, Firefox) hỗ trợ một chuẩn giải mã video khác nhau. Việc cung cấp nhiều thẻ `<source>` đảm bảo video luôn chạy được bất kể user dùng trình duyệt gì (Trình duyệt sẽ tự chọn source đầu tiên mà nó hỗ trợ). 3 format phổ biến: `.mp4`, `.webm`, `.ogg`.
3. **Thuộc tính `alt` trên `<img>` dùng để làm gì? Viết `alt` tốt cho 3 trường hợp:**
   Thuộc tính `alt` (Alternative Text) hiển thị chữ thay thế khi ảnh bị lỗi mạng, dùng để máy đọc màn hình đọc cho người khiếm thị nghe, và giúp Google Bot index SEO hình ảnh.
   - Ảnh sản phẩm iPhone 16: `alt="Điện thoại iPhone 16 Pro Max 256GB màu Titan tự nhiên"`
   - Ảnh trang trí (decorative): `alt=""` (Để trống cố ý để screen reader bỏ qua, không đọc lảm nhảm làm phiền user).
   - Ảnh biểu đồ doanh thu: `alt="Biểu đồ cột hiển thị doanh thu Quý 1 năm 2026 tăng 20% so với cùng kỳ"`

---

### Câu A5 (5đ) — So sánh `<figure>` vs `<img>`
- **Dùng Cách 1 (`<img>` trơn):** Khi bức ảnh chỉ mang tính chất minh họa đơn giản, không cần giải thích gì thêm, hoặc là thành phần phụ của giao diện.
  - *Ví dụ 1:* Logo công ty ở thanh menu header.
  - *Ví dụ 2:* Các icon nhỏ trên website (như icon giỏ hàng, avatar người dùng).
- **Dùng Cách 2 (`<figure>` + `<figcaption>`):** Khi bức ảnh mang thông tin quan trọng, cần có một đoạn văn bản (caption) đi kèm giải thích rõ nội dung bức ảnh, và cụm ảnh+chữ đó là một khối độc lập không thể tách rời.
  - *Ví dụ 1:* Ảnh của một biểu đồ số liệu trong bài báo khoa học kèm dòng chú thích "Biểu đồ 1.1: Tỉ lệ tăng trưởng năm 2026".
  - *Ví dụ 2:* Ảnh sản phẩm trong danh sách E-commerce bắt buộc phải đi kèm chú thích Tên và Giá tiền.

---

## PHẦN C — PHÂN TÍCH & SUY LUẬN (20 điểm)

### Câu C1 (10đ) — Debug Form
Form gốc được giao có 8 lỗi nghiêm trọng về cả chức năng (không gửi được dữ liệu) và Accessibility (không thân thiện với người dùng). 

**Lỗi 1: Dòng 1 — Thẻ `<form>` thiếu thuộc tính cốt lõi**
- **Mô tả:** Không có `action` (gửi dữ liệu đi đâu) và `method` (gửi bằng cách nào GET/POST).
- **Sửa:** `<form action="/submit-form" method="POST">`

**Lỗi 2: Dòng 2 — Input "Tên" thiếu thẻ `<label>` và các thuộc tính nhận diện**
- **Mô tả:** Viết chữ "Tên:" trần trụi khiến screen reader không hiểu. Input thiếu `id` (để label trỏ tới) và thiếu `name` (để server nhận diện dữ liệu).
- **Sửa:** `<label for="firstName">Tên:</label> <input type="text" id="firstName" name="firstName" required>`

**Lỗi 3: Dòng 4 — Input "Email" thiếu thẻ `<label>` và `name`**
- **Mô tả:** Chỉ dựa vào `placeholder` để thay cho label là một lỗi tồi tệ về Accessibility vì khi người dùng gõ chữ, placeholder sẽ biến mất, họ sẽ quên mình đang gõ ở ô nào.
- **Sửa:** `<label for="userEmail">Email:</label> <input type="email" id="userEmail" name="email" placeholder="Email của bạn">`

**Lỗi 4: Dòng 6 & 7 — Các Input "Mật khẩu" thiếu `<label>`, `id`, `name`**
- **Mô tả:** Tương tự như ô Email, bắt buộc phải có label đàng hoàng.
- **Sửa:** 
`<label for="pwd">Mật khẩu:</label> <input type="password" id="pwd" name="password">`
`<label for="confirmPwd">Nhập lại mật khẩu:</label> <input type="password" id="confirmPwd" name="confirmPassword">`

**Lỗi 5: Dòng 9 — Input "Phone" dùng sai kiểu dữ liệu (Type)**
- **Mô tả:** Đang dùng `type="text"`. Khi dùng trên điện thoại sẽ hiện bàn phím chữ, gây ức chế cho người dùng.
- **Sửa:** Chuyển thành `<input type="tel">` và bổ sung label: 
`<label for="phone">Phone:</label> <input type="tel" id="phone" name="phone" value="0901234567">`

**Lỗi 6: Dòng 11 — Thẻ `<select>` thiếu `<label>`, `id`, `name`**
- **Mô tả:** Không có `name` thì khi bấm Submit, server sẽ không biết người dùng chọn thành phố nào.
- **Sửa:** `<label for="city">Thành phố:</label> <select id="city" name="city">`

**Lỗi 7: Dòng 12 & 13 — Thẻ `<option>` thiếu giá trị `value`**
- **Mô tả:** Khi Submit form, dữ liệu gửi đi sẽ lấy nội dung text bên trong, điều này rất thiếu chuyên nghiệp. Cần gán giá trị code chuẩn cho từng lựa chọn.
- **Sửa:** `<option value="hn">Hà Nội</option>` và `<option value="hcm">TP.HCM</option>`

**Lỗi 8: Dòng 16 — Thẻ `<label>` "Tôi đồng ý" bị rỗng ruột**
- **Mô tả:** Có label nhưng lại... quên mất ô checkbox `<input type="checkbox">` ở đâu. Người dùng không có gì để bấm tick cả.
- **Sửa:** Bổ sung checkbox vào trong thẻ label:
`<label><input type="checkbox" name="terms" required> Tôi đồng ý điều khoản</label>`

---

### Câu C2 (10đ) — Thiết kế chiến lược Validation (Ngân hàng số)

**1. Viết `pattern` regex:**
- CMND/CCCD (Đúng 12 chữ số): `pattern="[0-9]{12}"`
- Số tài khoản (10-15 chữ số): `pattern="[0-9]{10,15}"`

**2. HTML5 Validation ĐÃ ĐỦ AN TOÀN cho ứng dụng ngân hàng chưa? Tại sao?**
- **Trạng thái:** HOÀN TOÀN KHÔNG. 
- **Giải thích:** HTML5 Validation chỉ đóng vai trò "cảnh báo nhắc nhở" (UX) để người dùng tử tế nhập liệu cho đúng. Một Hacker hoặc người am hiểu IT chỉ cần nhấn **F12 (DevTools)**, nháy đúp vào code xóa chữ `required` hoặc `pattern` đi là có thể vượt rào dễ dàng. Thậm chí họ có thể bỏ qua giao diện web, dùng phần mềm (như Postman/cURL) để bắn thẳng dữ liệu bẩn vào hệ thống.

**3. 3 loại Validation mà HTML5 KHÔNG THỂ làm được (bắt buộc dùng JS/Backend):**
- Kiểm tra xem Email/Số tài khoản này **đã tồn tại trong cơ sở dữ liệu** hay chưa (VD: Đăng ký trùng email).
- Xác thực tính logic của 2 trường (VD: "Mật khẩu xác nhận" phải giống hệt "Mật khẩu gốc", hoặc "Ngày kết thúc" phải lớn hơn "Ngày bắt đầu").
- Kiểm tra xem Số dư tài khoản hiện tại có đủ để thực hiện giao dịch rút tiền không.

- **Bị tấn công Injection (SQL Injection / XSS):** Kẻ gian vượt rào nhập đoạn mã độc (như đoạn script ăn cắp token hoặc câu lệnh xóa bảng Database) vào ô input. Nếu server cứ nhắm mắt lưu thẳng vào Database thì toàn bộ hệ thống sẽ bị phá hủy hoặc lộ dữ liệu khách hàng.
- **Lỗi logic nghiệp vụ nghiêm trọng:** Hacker cố tình sửa giá trị của món đồ thành số âm (VD: `<input type="number" name="price" value="-1000000">`). Nếu Backend không kiểm tra lại, hóa đơn sẽ bị trừ tiền, dẫn đến việc hacker mua hàng mà ngân hàng lại... trả ngược lại tiền cho hacker.

---

## PHẦN B — GIẢI THÍCH CODE THỰC HÀNH

### Giải thích Bài B1 — Form Đăng ký
**Tại sao HTML5 không thể tự động kiểm tra (validate) ô "Xác nhận mật khẩu" có trùng khớp với ô "Mật khẩu" hay không?**
- **Lý do:** HTML5 Validation (như `pattern`, `minlength`, `max`, `type`) chỉ hoạt động **độc lập trên từng ô input riêng lẻ**. Nó chỉ biết kiểm tra xem dữ liệu CỦA CHÍNH Ô ĐÓ có thỏa mãn điều kiện tĩnh (như độ dài, định dạng Regex) hay không.
- HTML5 **không có khả năng lấy giá trị của ô input này để so sánh động với giá trị của ô input khác**. Do đó, để so sánh hai mật khẩu có giống nhau không, bắt buộc chúng ta phải dùng tới **JavaScript** để viết hàm so sánh lúc người dùng bấm nút Submit.
