# ĐÁP ÁN PHIẾU BÀI TẬP 06 - CSS FRAMEWORKS (TRACK B: TAILWINDCSS)

## PHẦN A — ĐỌC HIỂU

### Câu A1 (10đ) — Utility Classes

Giải thích ý nghĩa từng class Tailwind trong đoạn HTML:

**Khối Div Container:**
- `flex` → `display: flex` (Thiết lập flexbox container)
- `items-center` → `align-items: center` (Căn giữa các phần tử con theo trục dọc)
- `justify-between` → `justify-content: space-between` (Đẩy các phần tử con ra xa nhau, phần tử đầu ở mép trái, phần tử cuối ở mép phải)
- `p-4` → `padding: 1rem` (Thêm khoảng đệm 16px ở tất cả các cạnh)
- `bg-white` → `background-color: rgb(255 255 255)` (Màu nền trắng)
- `shadow-md` → `box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), ...` (Thêm hiệu ứng đổ bóng mức độ vừa)
- `rounded-lg` → `border-radius: 0.5rem` (Bo góc 8px cho container)
- `hover:shadow-xl` → Khi hover, đổi bóng thành mức độ lớn hơn (đậm và lan rộng hơn)
- `transition-shadow` → `transition-property: box-shadow` (Thêm hiệu ứng chuyển động mượt mà chỉ cho thuộc tính box-shadow)
- `duration-300` → `transition-duration: 300ms` (Thời gian chuyển đổi là 0.3 giây)

**Khối Image (Avatar):**
- `w-16` → `width: 4rem` (Chiều rộng 64px)
- `h-16` → `height: 4rem` (Chiều cao 64px)
- `rounded-full` → `border-radius: 9999px` (Bo góc tròn xoe để tạo avatar hình tròn)
- `object-cover` → `object-fit: cover` (Cắt ảnh sao cho vừa vặn với khung hình mà không bị méo)

**Khối Div Thông tin (Tên và Chức danh):**
- `ml-4` → `margin-left: 1rem` (Thêm lề trái 16px để cách xa avatar)
- `flex-1` → `flex: 1 1 0%` (Cho phép khối div này chiếm toàn bộ khoảng trống còn lại ở giữa thẻ img và thẻ button)

**Khối Heading (Tên):**
- `text-lg` → `font-size: 1.125rem`, `line-height: 1.75rem` (Cỡ chữ lớn khoảng 18px)
- `font-semibold` → `font-weight: 600` (In đậm chữ)
- `text-gray-800` → Đổi màu chữ thành màu xám đậm
- `truncate` → `overflow: hidden`, `text-overflow: ellipsis`, `white-space: nowrap` (Nếu tên quá dài sẽ bị cắt ngang và thay bằng dấu "...")

**Khối Paragraph (Chức danh):**
- `text-sm` → `font-size: 0.875rem` (Cỡ chữ nhỏ khoảng 14px)
- `text-gray-500` → Đổi màu chữ thành màu xám nhạt hơn

**Khối Button (Nút Follow):**
- `px-4` → `padding-left: 1rem`, `padding-right: 1rem` (Khoảng đệm trái phải 16px)
- `py-2` → `padding-top: 0.5rem`, `padding-bottom: 0.5rem` (Khoảng đệm trên dưới 8px)
- `bg-blue-500` → Đổi màu nền thành màu xanh lam chuẩn
- `text-white` → Đổi màu chữ thành trắng
- `rounded-md` → `border-radius: 0.375rem` (Bo góc 6px cho nút)
- `hover:bg-blue-600` → Khi hover, đổi màu nền sang xanh lam đậm hơn
- `focus:ring-2` → Khi được focus (ví dụ tab vào), thêm một viền ring (outline) dày 2px
- `focus:ring-blue-300` → Đổi màu của viền ring đó thành màu xanh lam nhạt

---

### Câu A2 (10đ) — Responsive & States

1. Giải thích prefix responsive: `md:`, `lg:`, `xl:`
Tailwind tiếp cận theo chuẩn Mobile-First (giống Bootstrap). Mặc định nếu không có prefix thì áp dụng cho mọi kích thước màn hình (từ mobile trở lên).
- `md:` (Medium): Kích hoạt từ màn hình tablet trở lên (min-width: 768px)
- `lg:` (Large): Kích hoạt từ màn hình laptop/desktop trở lên (min-width: 1024px)
- `xl:` (Extra Large): Kích hoạt từ màn hình desktop lớn trở lên (min-width: 1280px)

Ví dụ `md:grid-cols-2 lg:grid-cols-4`: 
- Mặc định ở màn hình điện thoại (dưới 768px), element này không bị tác động bởi 2 class trên. Nếu trước đó có khai báo `grid-cols-1` thì nó sẽ là 1 cột.
- Khi màn hình rộng từ 768px trở lên (Tablet), class `md:grid-cols-2` được kích hoạt, layout chuyển thành 2 cột.
- Khi màn hình rộng từ 1024px trở lên (Desktop), class `lg:grid-cols-4` được kích hoạt ghi đè lên `md:`, layout chuyển thành 4 cột.

2. Giải thích state modifiers: `hover:`, `focus:`, `active:`, `group-hover:`
Tailwind dùng các modifier này để thêm CSS pseudo-classes trực tiếp vào HTML.
- `hover:` Áp dụng CSS khi người dùng di chuột qua phần tử (tương đương `:hover`). VD: `hover:bg-red-500` (đổi nền đỏ khi hover).
- `focus:` Áp dụng CSS khi phần tử được chọn/focus bằng phím Tab hoặc click vào (tương đương `:focus`), thường dùng cho input/button. VD: `focus:outline-none`.
- `active:` Áp dụng CSS ngay tại thời điểm người dùng click/chạm vào phần tử (tương đương `:active`). VD: `active:scale-95` (nút lún xuống khi bấm).
- `group-hover:` Áp dụng CSS cho phần tử con khi thẻ cha của nó (được gắn class `group`) bị hover. Rất hữu ích khi muốn đổi màu một icon con khi người dùng hover vào toàn bộ thẻ card cha.

3. Viết class Tailwind cho: "Ẩn trên mobile, hiện dạng flex trên tablet trở lên"
Class cần viết là:
`hidden md:flex`

Giải thích:
- `hidden` → `display: none` (Áp dụng từ mobile trở lên)
- `md:flex` → `display: flex` (Khi màn hình đạt mức `md` tức 768px, nó ghi đè lệnh `hidden` và chuyển thành `flex`)
Điều này tương đương chính xác với `d-none d-md-flex` của Bootstrap.

---

## PHẦN C — PHÂN TÍCH

### Câu C1 (10đ) — Tailwind vs CSS thuần

So sánh giữa việc viết một Product Card bằng CSS thuần (từ PBT_05) và dùng TailwindCSS:

1. HTML File Size
- CSS thuần: HTML rất gọn gàng (ví dụ `<div class="card">`). Nhưng bù lại phải có thêm một file `.css` đính kèm dung lượng khá lớn.
- TailwindCSS: HTML phình to ra rất nhiều (ví dụ `<div class="bg-white rounded-lg shadow-md hover:shadow-xl transition...">`). Nếu trang web có 100 cái card, chuỗi class này sẽ lặp lại 100 lần làm file HTML nặng hơn đáng kể.

2. Maintainability (Dễ đọc / Dễ sửa)
- CSS thuần: HTML dễ đọc hơn. Tuy nhiên khi sửa giao diện, ta phải nhảy qua lại liên tục giữa file HTML và file CSS. Khi dự án lớn, việc đặt tên class theo chuẩn BEM và tránh trùng lặp cực kỳ đau đầu. Sợ nhất là sửa class này lại làm vỡ layout chỗ khác.
- TailwindCSS: Nhìn HTML lúc đầu thấy rất rối mắt vì có quá nhiều class. Nhưng khi đã quen, việc maintain lại cực nhanh vì chỉ cần nhìn vào HTML là biết ngay phần tử đó trông như thế nào. Việc sửa chữa diễn ra ngay trên HTML, không sợ ảnh hưởng đến các phần tử khác (vì class `p-4` chỉ thay đổi padding, không tác động đến global styles).

3. Reusability (Khả năng tái sử dụng)
- CSS thuần: Rất dễ tái sử dụng. Chỉ cần khai báo class `.card` một lần, sau đó gắn class `.card` vào bất kỳ thẻ div nào là nó thành hình cái card ngay.
- TailwindCSS: Khá bất tiện nếu chỉ code bằng HTML tĩnh, vì phải copy-paste chuỗi class dài loằng ngoằng sang chỗ khác. Tuy nhiên, nếu dùng với các framework component như React/Vue, việc tái sử dụng nằm ở mức Component chứ không phải mức class. Nếu viết code thuần tĩnh, Tailwind cung cấp chỉ thị `@apply` để nhóm các utility class lại thành một class riêng, ví dụ:
```css
.card {
  @apply bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300;
}
```

### Câu C2 (10đ) — Performance

1. Tại sao file CSS cuối cùng của Tailwind thường NHỎ HƠN Bootstrap?
Bootstrap đính kèm một file CSS khổng lồ chứa sẵn tất cả mọi component, tiện ích, màu sắc (dù bạn không dùng đến thẻ carousel hay modal, mã CSS của chúng vẫn được tải xuống).
TailwindCSS thì tiếp cận theo cách tạo sẵn hàng ngàn tiện ích cực nhỏ. Tuy file CSS nguyên bản của Tailwind nặng tới hàng Megabyte, nhưng trong môi trường Production, Tailwind KHÔNG tải toàn bộ file này. Thay vào đó, nó dùng một trình quét để lọc ra các class thực sự được dùng, nhờ đó file CSS thực tế chỉ nặng khoảng vài KB đến vài chục KB.

2. Tailwind PurgeCSS (JIT) là gì?
Just-In-Time (JIT) compiler hoặc hệ thống Purge của Tailwind hoạt động bằng cách quét toàn bộ mã nguồn HTML/JS/Vue/React của dự án để tìm ra chính xác những class nào bạn đã gõ vào. Sau đó, nó MỚI CHỈ tạo mã CSS cho đúng các class đó rồi gộp thành file CSS cuối cùng. Tất cả những utility class của Tailwind mà bạn không dùng đều bị loại bỏ hoàn toàn (purge). Nhờ vậy, file CSS vô cùng nhẹ.

3. Khi nào KHÔNG NÊN dùng TailwindCSS?
- Xây dựng một trang web thuần HTML/JS tĩnh cực kỳ đơn giản và nhanh chóng (như một trang báo đơn giản): Việc phải cài đặt Node.js, cấu hình `tailwind.config.js` và chạy build step sẽ quá phức tạp so với việc chỉ nhúng file cdn của Bootstrap vào là xong ngay.
- Thiết kế một thư viện UI cho bên thứ 3 (như tạo một plugin jQuery): Nếu bạn build plugin dùng Tailwind, người dùng plugin của bạn sẽ phải đối mặt với việc xung đột class hoặc phải cài Tailwind vào dự án của họ. Ở đây, viết CSS thuần với prefix riêng (vd: `.myplugin-btn`) là lựa chọn tốt nhất.

---
