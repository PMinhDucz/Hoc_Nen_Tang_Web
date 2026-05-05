# ĐÁP ÁN PHIẾU BÀI TẬP 03 - CSS CORE

## PHẦN A — KIỂM TRA ĐỌC HIỂU

### Câu A1 (5đ) — 3 Cách nhúng CSS vào HTML

**1. Inline CSS (Nhúng trực tiếp vào thẻ HTML)**
- **Ví dụ code:** `<h1 style="color: red; font-size: 20px;">Tiêu đề Bài Viết</h1>`
- **Ưu điểm:** Có tác dụng ngay lập tức, đè được hầu hết mọi cách nhúng khác (độ ưu tiên rất cao). Không cần tạo file ngoài.
- **Nhược điểm:** Phá vỡ cấu trúc HTML khiến code cực kỳ lộn xộn. Khó bảo trì (nếu muốn đổi màu 100 thẻ H1 thì phải đi sửa tay 100 lần), không thể tái sử dụng.
- **Khi nào nên dùng:** Dùng khi muốn test nhanh (debug) giao diện xem màu đó có hợp không, hoặc khi làm template cho Email gửi tự động (vì các ứng dụng Email như Gmail thường chặn hoặc xóa mất file CSS ngoài).

**2. Internal CSS (Nhúng nội bộ bằng thẻ `<style>`)**
- **Ví dụ code:** 
  ```html
  <head>
    <style>
      h1 { color: blue; }
      p { line-height: 1.5; }
    </style>
  </head>
  ```
- **Ưu điểm:** Gom toàn bộ CSS của một trang lại 1 chỗ (trên thẻ head) thay vì rải rác từng dòng. Không cần tải thêm file `.css` bên ngoài.
- **Nhược điểm:** Không thể chia sẻ CSS sang các trang HTML khác (ví dụ trang `index.html` và `about.html` không dùng chung được cái style này). Trang web load lâu hơn vì trình duyệt không thể lưu bộ nhớ đệm (cache) cho thẻ `<style>`.
- **Khi nào nên dùng:** Chỉ nên dùng khi làm một trang web đơn lẻ, landing page độc lập (chỉ có duy nhất 1 trang) không liên quan đến trang nào khác.

**3. External CSS (Nhúng file ngoài qua thẻ `<link>`)**
- **Ví dụ code:** `<link rel="stylesheet" href="style.css">`
- **Ưu điểm:** Tách biệt hoàn toàn HTML (khung xương) và CSS (quần áo). Một file `style.css` có thể tái sử dụng cho hàng trăm trang HTML khác nhau. Giúp code HTML gọn gàng. Trình duyệt có thể lưu bộ nhớ đệm file CSS này giúp các lần tải trang sau cực kì nhanh. Đây là đỉnh cao của sự chuyên nghiệp.
- **Nhược điểm:** Lần tải đầu tiên trình duyệt phải mất công gửi thêm 1 request HTTP tới máy chủ để tải file `.css` về trước khi trang web có giao diện.
- **Khi nào nên dùng:** Dùng **MỌI LÚC MỌI NƠI** khi phát triển các Website thực tế, nhiều trang.

**Trả lời Câu hỏi thêm: Nếu 1 thẻ có cả 3 cách cùng áp dụng, cách nào "thắng"?**
- **Trạng thái:** Inline CSS sẽ giành chiến thắng chung cuộc (Thẻ H1 sẽ mang màu của Inline).
- **Giải thích:** Dựa vào nguyên lý **Độ ưu tiên (Specificity)** trong CSS. Trình duyệt xếp hạng Inline CSS ở mức điểm cao nhất (1,0,0,0) vì nó nằm ngay trên xác thịt của thẻ HTML. Internal và External được xếp cùng mức điểm (dựa vào thứ tự thẻ Selector), nhưng không thể nào đâm xuyên qua được cái khiên ưu tiên tuyệt đối của Inline CSS (trừ phi dùng `!important`).

---

### Câu A2 (8đ) — CSS Selectors — Dự đoán kết quả

**Phân tích và dự đoán (Không chạy code):**
Dựa vào kiến thức về CSS Selectors, dưới đây là kết quả dự đoán những thành phần nào trên trang HTML sẽ bị các Selector này "tóm" được:

1. `h1` → Chọn: **Thẻ `<h1>` duy nhất chứa dòng chữ "ShopTLU"**. (Đây là Element Selector cơ bản).
2. `.price` → Chọn: **2 thẻ `<p>` chứa giá tiền "25.990.000đ" và "45.990.000đ"**. (Đây là Class Selector).
3. `#app header` → Chọn: **Toàn bộ khối `<header>`** (bao gồm cả H1 và Nav) nằm bên trong thẻ có ID là `app`. (Descendant Selector).
4. `nav a:first-child` → Chọn: **Thẻ `<a>` đầu tiên** nằm trong `<nav>`, tức là link chữ **"Home"**. (Pseudo-class Selector).
5. `.product.featured h2` → Chọn: **Thẻ `<h2>` chứa dòng chữ "MacBook Pro"**. (Giải thích: Đi tìm thẻ `h2` nằm trong phần tử mang ĐỒNG THỜI 2 class là `product` VÀ `featured`).
6. `article > p` → Chọn: **TẤT CẢ 4 thẻ `<p>`** chứa giá tiền và mô tả của cả iPhone và MacBook. (Giải thích: Dấu `>` là Child Selector, bắt tất cả thẻ `p` là con TRỰC TIẾP của thẻ `article`).
7. `a[href="/"]` → Chọn: **Thẻ `<a>` chứa dòng chữ "Home"**. (Đây là Attribute Selector, chỉ bắt thẻ a có chính xác đường dẫn là `/`).
8. `.top-bar.dark h1` → Chọn: **Thẻ `<h1>` chứa dòng chữ "ShopTLU"**. (Giải thích: Bắt thẻ `h1` nằm trong phần tử mang đồng thời class `top-bar` và `dark`).

---

### Câu A3 (7đ) — Box Model — Tính toán kích thước

**1. Trường hợp 1: content-box (mặc định)**
- **Chiều rộng hiển thị (Visible width):** `450px`
  *Cách tính:* Lấy Content Width (400) + Padding trái/phải (20x2) + Border trái/phải (5x2) = 400 + 40 + 10 = 450px. (Đây là chiều rộng của hình hộp mà mắt thường nhìn thấy).
- **Không gian chiếm trên trang (Total space):** `470px`
  *Cách tính:* Lấy Chiều rộng hiển thị (450) + Margin trái/phải (10x2) = 470px.

**2. Trường hợp 2: border-box**
- **Chiều rộng hiển thị (Visible width):** `400px`
  *Cách tính:* Vì dùng `border-box`, thuộc tính `width: 400px` chính là chốt cứng kích thước tổng của cả Content + Padding + Border. Nên cái hộp nhìn thấy bằng mắt đúng bằng 400px.
- **Kích thước content thực tế:** `350px`
  *Cách tính:* Do tổng bị khóa ở 400px, phần content ở giữa bị bóp lại: 400 - Padding (40) - Border (10) = 350px.
- **Không gian chiếm trên trang:** `420px`
  *Cách tính:* Lấy Chiều rộng hiển thị (400) + Margin trái/phải (20) = 420px.

**3. Trường hợp 3: Margin collapse (Gộp Margin)**
- **Khoảng cách giữa box-a và box-b:** `40px`
- **Giải thích tại sao KHÔNG PHẢI 65px:** Đây là một "cú lừa" kinh điển trong CSS mang tên **Margin Collapse** (Gộp lề). Khi hai phần tử khối (block element) đứng xếp chồng lên nhau (trên-dưới), lề dưới của khối trên và lề trên của khối dưới sẽ **KHÔNG cộng dồn** vào nhau (25 + 40 = 65). Thay vào đó, chúng sẽ tự xuyên qua nhau, và trình duyệt chỉ **lấy con số nào LỚN HƠN** (trong trường hợp này là 40px) để làm khoảng cách cuối cùng.
- **Câu hỏi nâng cao:** Nếu `.box-a` có `margin-bottom: -10px` và `.box-b` có `margin-top: 40px`, khoảng cách sẽ là: `30px`. 
  *Giải thích:* Theo luật Margin Collapse có giá trị âm, trình duyệt sẽ lấy margin Dương (40) thực hiện phép tính cộng đại số với margin Âm (-10) sinh ra kết quả: 40 + (-10) = 30px.

