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

### Câu A3 (5đ) — Media Queries

Bảng kết quả chiều rộng .container theo từng kích thước màn hình:

- 375px (iPhone SE): width = 100%
  Lý do: 375px nhỏ hơn tất cả các breakpoint (576, 768, 992, 1200). Không có media query nào được kích hoạt. CSS mặc định là width: 100% được áp dụng.

- 600px: width = 540px
  Lý do: 600px lớn hơn 576px nên media query min-width: 576px được kích hoạt. Nhưng 600px vẫn nhỏ hơn 768px nên media query tiếp theo chưa có hiệu lực. Kết quả cuối cùng là 540px.

- 800px: width = 720px
  Lý do: 800px lớn hơn cả 576px lẫn 768px. Hai media query đầu đều được kích hoạt, nhưng theo quy tắc Cascade trong CSS, media query khai báo sau sẽ đè lên trước. Media query min-width: 768px khai báo sau cho width: 720px. Kết quả là 720px.

- 1000px: width = 960px
  Lý do: 1000px lớn hơn 576px, 768px và 992px. Ba media query đầu đều được kích hoạt. Media query cuối trong số đó là min-width: 992px (width: 960px) sẽ thắng. Kết quả là 960px.

- 1400px: width = 1140px
  Lý do: 1400px lớn hơn tất cả 4 breakpoints. Tất cả media query đều được kích hoạt. Media query cuối cùng là min-width: 1200px (width: 1140px) ghi đè tất cả. Kết quả là 1140px.

---

### Câu A4 (5đ) — SCSS Basics

4 tính năng chính của SCSS:

1. Variables (Biến)
Dùng để lưu trữ các giá trị hay dùng đi dùng lại như màu sắc, font chữ, kích thước vào một chỗ. Khi cần thay đổi màu chủ đạo của toàn trang, chỉ cần sửa 1 chỗ duy nhất thay vì phải tìm và sửa hàng chục chỗ trong file CSS.

Ví dụ:
$primary-color: #1a73e8;
$font-size-base: 16px;

.button {
    background-color: $primary-color;
    font-size: $font-size-base;
}

2. Nesting (Lồng nhau)
Cho phép viết CSS theo cấu trúc cây, lồng selector con bên trong selector cha, phản ánh đúng cấu trúc HTML. Giúp code dễ đọc hơn và tránh phải lặp lại tên class cha nhiều lần.

Ví dụ:
.navbar {
    background: #333;

    .logo {
        font-size: 24px;
        color: white;
    }

    a {
        color: #ccc;

        &:hover {
            color: white;
        }
    }
}

3. Mixins
Là các đoạn code CSS được đóng gói lại thành tên gọi riêng, có thể truyền tham số vào. Dùng @mixin để khai báo và @include để gọi ra dùng. Cực kỳ hữu ích cho các pattern lặp lại như flex-center, box-shadow hay các đoạn media query.

Ví dụ:
@mixin flex-center {
    display: flex;
    justify-content: center;
    align-items: center;
}

.hero {
    height: 100vh;
    @include flex-center;
}

4. @extend (Kế thừa)
Cho phép một selector sao chép toàn bộ CSS từ một selector khác đã được khai báo trước đó, rồi có thể bổ sung thêm thuộc tính riêng. Khác với mixin ở chỗ @extend không cho phép truyền tham số nhưng code sinh ra gọn hơn vì SCSS sẽ gộp chung các selector lại.

Ví dụ:
.btn-base {
    padding: 10px 20px;
    border-radius: 4px;
    cursor: pointer;
}

.btn-primary {
    @extend .btn-base;
    background-color: $primary-color;
    color: white;
}

Tại sao trình duyệt không đọc được file .scss?
Vì trình duyệt chỉ hiểu ngôn ngữ CSS thuần túy theo tiêu chuẩn W3C. SCSS là ngôn ngữ mở rộng (superset) của CSS được tạo ra để lập trình viên viết code dễ hơn, nhưng bản thân nó không phải CSS hợp lệ và trình duyệt không có bộ xử lý SCSS nào cả.

Các bước chuyển SCSS sang CSS:
Bước 1: Cài đặt Sass compiler (thông qua Node.js bằng lệnh npm install -g sass).
Bước 2: Chạy lệnh biên dịch: sass style.scss style.css
Bước 3: Hoặc dùng chế độ watch để tự động biên dịch mỗi khi lưu file: sass --watch style.scss:style.css
Bước 4: Nhúng file style.css đã được biên dịch vào HTML như bình thường.

---

## PHẦN C — PHÂN TÍCH

### Câu C1 (10đ) — Phân tích trang web thực

Trang web được chọn để phân tích: Shopee (shopee.vn)

Phân tích ở 3 kích thước màn hình (mở bằng DevTools Toggle Device):

1. Mobile - 375px (iPhone SE)
- Navigation: Thanh menu ngang biến mất hoàn toàn. Thay vào đó là biểu tượng hamburger ở góc trái và biểu tượng tìm kiếm, giỏ hàng ở góc phải. Khi bấm vào hamburger mới mở ra menu dạng slide từ trái sang.
- Lưới sản phẩm: Hiển thị 2 cột. Shopee vẫn giữ 2 cột ở mobile vì sản phẩm nhỏ và người dùng quen duyệt kiểu này trên điện thoại rồi.
- Các phần bị ẩn: Sidebar danh mục bên trái ẩn hoàn toàn, banner quảng cáo thu nhỏ lại còn 1 banner duy nhất, khu vực flash sale vẫn hiển thị nhưng cuộn ngang thay vì dàn hàng ngang.
- Font size: Tên sản phẩm khoảng 12-13px, giá khoảng 14px, nhỏ hơn đáng kể so với desktop.

2. Tablet - 768px
- Navigation: Vẫn còn thanh tìm kiếm chiếm toàn chiều ngang header. Logo và các icon giỏ hàng, thông báo hiện ra. Menu danh mục hiện dạng ngang nhưng bị rút gọn còn khoảng 5-6 mục chính.
- Lưới sản phẩm: Tăng lên 3 cột. Ảnh sản phẩm to hơn, thông tin rõ hơn.
- Các phần bị ẩn: Sidebar vẫn chưa xuất hiện. Banner quảng cáo hiện 2 cột.
- Font size: Tên sản phẩm tăng lên khoảng 14px.

3. Desktop - 1440px
- Navigation: Hiển thị đầy đủ với logo, thanh tìm kiếm rộng, và toàn bộ các icon (giỏ hàng, thông báo, tài khoản). Bên dưới là thanh danh mục ngang hiện tất cả các category.
- Lưới sản phẩm: Hiển thị 5 đến 6 cột sản phẩm trên một hàng.
- Các phần hiện thêm: Sidebar bộ lọc xuất hiện ở trang danh mục, banner hero to rõ nét, khu vực flash sale hiện đầy đủ sản phẩm không cần cuộn ngang.
- Font size: Tên sản phẩm khoảng 14-15px, thoải mái hơn để đọc.

Media queries tìm thấy trong DevTools (Styles panel):
- @media (max-width: 1200px): Shopee dùng để thu hẹp container và điều chỉnh padding cho màn hình nhỏ hơn.
- @media (max-width: 768px): Đây là breakpoint chính, ẩn sidebar, chuyển navigation sang hamburger, điều chỉnh lưới sản phẩm.

(Ảnh chụp màn hình ở 3 kích thước và ảnh DevTools media query được lưu trong thư mục screenshots)

---

### Câu C2 (10đ) — Thiết kế Responsive Strategy cho trang đặt bàn nhà hàng

Trang đặt bàn nhà hàng cần xử lý tốt 3 kích thước màn hình. Dưới đây là wireframe bố cục và phân tích từng breakpoint.

Wireframe Mobile (dưới 768px):
+---------------------------+
|  LOGO         SĐT liên hệ |
+---------------------------+
|    HERO IMAGE (full width) |
|  (ảnh thu nhỏ, vẫn giữ)  |
+---------------------------+
|  LƯỚI ẢNH MÓN ĂN (1 cột) |
|  [Ảnh 1]                  |
|  [Ảnh 2]                  |
|  [Ảnh 3]                  |
|  [Ảnh 4]                  |
|  [Ảnh 5]                  |
|  [Ảnh 6]                  |
+---------------------------+
|  FORM ĐẶT BÀN (full width)|
|  Ngày / Giờ               |
|  Số người                 |
|  Ghi chú                  |
|  [Nút đặt bàn]            |
+---------------------------+
|  BẢN ĐỒ (ẩn để nhẹ trang) |
|  Thay bằng địa chỉ text   |
+---------------------------+
|  FOOTER                   |
+---------------------------+

Những gì bị ẩn trên Mobile: Bản đồ Google Maps bị ẩn để tránh tốn dữ liệu và tăng tốc tải trang. Thay vào đó hiển thị địa chỉ và số điện thoại dạng text. Ảnh hero vẫn giữ nhưng chiều cao giảm xuống khoảng 200px.

Wireframe Tablet (768px đến 1023px):
+------------------------------------------+
|   LOGO              SĐT liên hệ          |
+------------------------------------------+
|       HERO IMAGE (full width, cao hơn)   |
+------------------------------------------+
|  LƯỚI ẢNH MÓN ĂN (2 cột)               |
|  [Ảnh 1]   [Ảnh 2]                      |
|  [Ảnh 3]   [Ảnh 4]                      |
|  [Ảnh 5]   [Ảnh 6]                      |
+------------------------------------------+
|  FORM ĐẶT BÀN  |  BẢN ĐỒ GOOGLE MAPS   |
|  (1/2 chiều rộng)  (1/2 chiều rộng)     |
+------------------------------------------+
|  FOOTER                                  |
+------------------------------------------+

Grid ảnh món ăn ở Tablet: 2 cột. Bản đồ Google Maps xuất hiện trở lại và đặt cạnh form đặt bàn (mỗi cái chiếm 50% chiều rộng).

Wireframe Desktop (1024px trở lên):
+--------------------------------------------------+
|  LOGO          Menu điều hướng          SĐT      |
+--------------------------------------------------+
|           HERO IMAGE (full width, cao đủ)        |
+--------------------------------------------------+
|    LƯỚI ẢNH MÓN ĂN (3 cột)                     |
|  [Ảnh 1]   [Ảnh 2]   [Ảnh 3]                   |
|  [Ảnh 4]   [Ảnh 5]   [Ảnh 6]                   |
+--------------------------------------------------+
|   FORM ĐẶT BÀN (1/3)  |  BẢN ĐỒ MAPS (2/3)    |
+--------------------------------------------------+
|  FOOTER (3 cột thông tin)                        |
+--------------------------------------------------+

Layout Desktop: Grid 3 cột cho ảnh món ăn. Form đặt bàn chiếm 1 phần 3, bản đồ chiếm 2 phần 3 để nhìn rõ vị trí nhà hàng hơn.

CSS Skeleton Mobile-First:

.restaurant-page {
    display: grid;
    grid-template-areas:
        "header"
        "hero"
        "gallery"
        "form"
        "address"
        "footer";
}

.gallery {
    display: grid;
    grid-template-columns: 1fr;
    gap: 16px;
}

.google-map {
    display: none;
}

@media (min-width: 768px) {
    .restaurant-page {
        grid-template-areas:
            "header"
            "hero"
            "gallery"
            "form-map"
            "footer";
    }

    .form-map-section {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 20px;
    }

    .gallery {
        grid-template-columns: repeat(2, 1fr);
    }

    .google-map {
        display: block;
    }
}

@media (min-width: 1024px) {
    .restaurant-page {
        max-width: 1200px;
        margin: 0 auto;
    }

    .gallery {
        grid-template-columns: repeat(3, 1fr);
    }

    .form-map-section {
        grid-template-columns: 1fr 2fr;
    }
}

---
