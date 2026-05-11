# ĐÁP ÁN PHIẾU BÀI TẬP 03 - CSS CORE

## PHẦN A — KIỂM TRA ĐỌC HIỂU

### Câu A1 (5đ) — 3 Cách nhúng CSS vào HTML

1. Inline CSS (Nhúng trực tiếp vào thẻ HTML)
Ví dụ code: <h1 style="color: red;">Tiêu đề</h1>
Ưu điểm: Có tác dụng ngay lập tức, độ ưu tiên rất cao không cần file ngoài.
Nhược điểm: Làm code HTML lộn xộn, cực kì khó bảo trì và không tái sử dụng được.
Khi nào dùng: Dùng khi test nhanh giao diện hoặc làm form email gửi tự động.

2. Internal CSS (Nhúng nội bộ bằng thẻ <style>)
Ví dụ code: 
<style>
  h1 { color: blue; }
</style>
Ưu điểm: Gom toàn bộ CSS của một trang lại phần head.
Nhược điểm: Không dùng chung được cho các trang HTML khác, không lưu cache được.
Khi nào dùng: Dùng cho các landing page chỉ có 1 trang duy nhất.

3. External CSS (Nhúng file ngoài)
Ví dụ code: <link rel="stylesheet" href="style.css">
Ưu điểm: Tách biệt code HTML và CSS, một file dùng được cho hàng trăm trang. Dễ bảo trì và trình duyệt có thể lưu cache giúp tải trang nhanh hơn.
Nhược điểm: Mất thêm 1 request tải file lúc ban đầu.
Khi nào dùng: Dùng cho mọi website thực tế có nhiều trang.

Trả lời Câu hỏi thêm: Nếu 1 thẻ dùng cả 3 cách thì Inline CSS sẽ thắng. 
Giải thích: Theo nguyên tắc Specificity (Độ ưu tiên), Inline CSS nằm trực tiếp trên thẻ nên được cộng điểm ưu tiên cao nhất (1,0,0,0), cao hơn thẻ style và file ngoài.

---

### Câu A2 (8đ) — CSS Selectors — Dự đoán kết quả

Dự đoán các phần tử bị chọn:
1. h1 → Chọn thẻ <h1> chứa chữ ShopTLU
2. .price → Chọn 2 thẻ <p> chứa giá 25.990.000đ và 45.990.000đ
3. #app header → Chọn khối <header> chứa cả h1 và nav nằm trong app
4. nav a:first-child → Chọn thẻ <a> đầu tiên trong nav là thẻ có chữ Home
5. .product.featured h2 → Chọn thẻ <h2> chứa chữ MacBook Pro vì nó nằm trong khối có cả class product và featured
6. article > p → Chọn 4 thẻ <p> là thẻ con trực tiếp của thẻ article (gồm các thẻ giá và mô tả)
7. a[href="/"] → Chọn thẻ <a> Home vì có thuộc tính href đúng bằng /
8. .top-bar.dark h1 → Chọn thẻ <h1> ShopTLU

---

### Câu A3 (7đ) — Box Model — Tính toán kích thước

1. Trường hợp 1: content-box (mặc định)
- Chiều rộng hiển thị (Visible width): 450px (Vì 400 content + 40 padding + 10 border = 450)
- Không gian chiếm trên trang: 470px (Lấy 450 chiều rộng + 20 margin 2 bên = 470)

2. Trường hợp 2: border-box
- Chiều rộng hiển thị: 400px (Do border-box chốt cứng width tổng)
- Kích thước content thực tế: 350px (Lấy 400 tổng trừ đi 40 padding trừ đi 10 border)
- Không gian chiếm trên trang: 420px (Lấy 400 + 20 margin)

3. Trường hợp 3: Margin collapse (Gộp Margin)
- Khoảng cách giữa box-a và box-b là: 40px
- Giải thích: Do cơ chế Margin Collapse trong CSS. Khi 2 thẻ đứng trên dưới nhau thì lề dọc của chúng không cộng dồn (25+40=65) mà xuyên qua nhau và lấy giá trị lớn hơn là 40px.
- Nâng cao: Nếu box-a margin-bottom -10px và box-b margin-top 40px thì khoảng cách là 30px do lấy margin dương 40 cộng với margin âm -10.

---

### Câu A4 (5đ) — Specificity (Độ ưu tiên)

1. Tính điểm Specificity
- p { color: black; } (Rule A) → 0, 0, 1 (1 thẻ)
- .price { color: blue; } (Rule B) → 0, 1, 0 (1 class)
- #main-price { color: red; } (Rule C) → 1, 0, 0 (1 ID)
- p.price { color: green; } (Rule D) → 0, 1, 1 (1 thẻ, 1 class)

2. Element hiển thị màu gì?
Sẽ có màu Đỏ (Red) vì Rule C dùng ID có độ ưu tiên cao nhất (1,0,0) nên đè hết class và element.

3. Nếu thêm Inline CSS style="color: orange;"
Sẽ ra màu Cam (Orange) vì inline CSS luôn có mức ưu tiên tuyệt đối đè hết CSS bên ngoài.

4. Nếu Rule A thêm !important
Sẽ ra màu Đen (Black) vì từ khóa !important bẻ gãy mọi quy luật tính điểm, đè được mọi ID, Class và cả Inline CSS.

---

## PHẦN C — DEBUG & SUY LUẬN

### Câu C1 (10đ) — Debug CSS Layout

1. Tính chiều rộng thực tế (content-box)
- Chiều rộng thực tế Sidebar: 342px (Width 300 + Padding 40 + Border 2)
- Chiều rộng thực tế Content: 722px (Width 660 + Padding 60 + Border 2)

2. Tại sao vỡ layout
Tổng hai khối cộng lại là 1064px. Mà thẻ container bao ngoài chỉ có 960px. Khối lượng quá lớn không vừa một dòng nên khối content bị rớt xuống dưới.

3. Cách sửa lỗi
Cách 1: Thêm thuộc tính box-sizing: border-box vào sidebar và content. Lúc này width 300px và 660px là tính cả viền rồi nên tổng đúng 960px.
Cách 2: Cứ để content-box nhưng sửa tay lại width cho nhỏ đi. Sidebar sửa width còn 258px. Content sửa width còn 598px. Cộng lại đúng 960px là ko bị rớt dòng.
(Có file debug_layout.html kèm theo)

---

### Câu C2 (10đ) — Cascade Puzzle

1. "Sản phẩm A" (thẻ h2) có font-size = 20px và color = green.
- Giải thích:
  - Về font-size: Thẻ này ăn thuộc tính từ rule .card .title { font-size: 20px; }.
  - Về color: Đáng lẽ nó màu đỏ theo #featured .title, nhưng nó lại ôm class .highlight có kẹp từ khóa !important (color: green !important;). Cái này là chùm cuối phá vỡ mọi quy luật nên nó đè bẹp màu đỏ, ép thành màu xanh lá (green).

2. "Mô tả sản phẩm" (thẻ p) có color = blue.
- Giải thích: Thẻ p này bị dính rule .card p { color: inherit; }. Thuộc tính inherit bắt buộc nó phải chạy đi xin màu của cha. Cha của nó là thẻ div mang class card (đang có rule .card { color: blue; }). Kế thừa cha nên nó ra màu xanh dương (blue).

3. "Sản phẩm B" (thẻ h2) có font-size = 20px và color = blue.
- Giải thích:
  - Về font-size: Tương tự như trên, do nó mang class .title nằm trong .card nên nhận 20px.
  - Về color: Thẻ h2 này không bị áp đặt màu trực tiếp nào cả. CSS có tính chất thả trôi (Cascade/Inheritance), nếu không ai quản lý thì nó sẽ bắt chước màu của cha. Thẻ cha .card đang giữ color: blue; nên nó ra màu xanh blue nốt.

4. "Mô tả sản phẩm B" (thẻ p) có color = green.
- Giải thích: Khỏi phải nghĩ, vì nó có mang class .highlight chứa bùa hộ mệnh !important nên auto ra màu green.

(Có 2 file cascade_test.html và cascade_test.css để chứng minh kết quả thực tế)

---

## PHẦN B — THỰC HÀNH CODE

### Bài B1 (20đ) — Style trang Profile

**Danh sách 5 loại Selector khác nhau đã sử dụng trong file `style.css`:**
1. **Element Selector (Thẻ HTML):** `body`, `header`, `footer`... (Chọn trực tiếp tên thẻ để style cơ bản).
2. **Class Selector (Lớp):** `.skills-table`, `.profile-img`, `.active`... (Chọn các phần tử mang class cụ thể để tái sử dụng giao diện).
3. **ID Selector (Định danh duy nhất):** `#lien-he` (Áp dụng style viền tím và khung shadow mỏng riêng biệt cho khu vực thông tin liên hệ).
4. **Descendant Selector (Cha-Con):** `nav a`, `#lien-he h3`, `.skills-table thead tr`... (Chọn thẻ con nằm sâu bên trong thẻ cha để tránh ảnh hưởng ra ngoài).
5. **Pseudo-class Selector (Trạng thái ảo):** `nav a:hover` (Khi di chuột vào đổi màu), `.skills-table tbody tr:nth-child(even)` (Tạo vằn ngựa Zebra cho bảng), `.skills-table tbody tr:hover` (Highlight dòng khi đưa chuột vào).
