# ĐÁP ÁN PHIẾU BÀI TẬP 04 - CSS LAYOUT

## PHẦN A — KIỂM TRA ĐỌC HIỂU

### Câu A1 (10đ) — 5 Loại Positioning

1. Position: static
- Vẫn chiếm chỗ trong flow? Có.
- Tham chiếu vị trí: Theo luồng tự nhiên của tài liệu (document flow).
- Cuộn theo trang? Có.
- Use case: Mặc định cho mọi phần tử, không định vị đặc biệt.

2. Position: relative
- Vẫn chiếm chỗ trong flow? Có.
- Tham chiếu vị trí: Vị trí ban đầu của chính nó.
- Cuộn theo trang? Có.
- Use case: Làm khung tọa độ (container) cho phần tử con absolute, dịch chuyển nhẹ phần tử mà không đẩy các khối xung quanh.

3. Position: absolute
- Vẫn chiếm chỗ trong flow? Không (bị rút ra khỏi flow).
- Tham chiếu vị trí: Phần tử tổ tiên gần nhất có thuộc tính position khác static (nearest positioned ancestor). Nếu không có, tham chiếu thẻ body.
- Cuộn theo trang? Có.
- Use case: Làm badge HOT trên góc sản phẩm, menu thả xuống (dropdown), icon tắt popup.

4. Position: fixed
- Vẫn chiếm chỗ trong flow? Không.
- Tham chiếu vị trí: Màn hình hiển thị của trình duyệt (Viewport).
- Cuộn theo trang? Không (đứng im khi cuộn).
- Use case: Navbar luôn dính ở trên cùng màn hình, nút "Cuộn lên đầu trang" ở góc dưới.

5. Position: sticky
- Vẫn chiếm chỗ trong flow? Có.
- Tham chiếu vị trí: Kết hợp giữa Viewport và ranh giới phần tử cha.
- Cuộn theo trang? Có (khi phần tử cha cuộn đi thì đi theo).
- Use case: Sidebar chứa mục lục bài viết tự động dính lại khi đọc bài dài.

Trả lời câu hỏi thêm:
- Khi nào absolute tham chiếu body? Khi tất cả các thẻ bao bọc ngoài nó đều không khai báo position (hoặc chỉ khai báo mặc định là static).
- Khi nào tham chiếu parent? Khi thẻ cha trực tiếp (hoặc thẻ tổ tiên bọc ngoài) được khai báo position khác static (phổ biến nhất là relative).
- Nearest positioned ancestor là gì? Là phần tử tổ tiên (cha, ông nội, cố...) gần nhất tính từ phần tử hiện tại đi ngược lên trên, mà có thuộc tính position khác static. Trình duyệt sẽ lấy tọa độ của phần tử tổ tiên đó làm mốc định vị cho phần tử absolute.

---

### Câu A2 (10đ) — Flexbox vs Grid

Trường hợp 1: .container { display: flex; } .item { flex: 1; } (4 items)
- Bố cục: 4 phần tử xếp sát nhau trên 1 hàng duy nhất từ trái qua phải. Do có flex: 1 nên mỗi item sẽ co giãn chia đều nhau, mỗi item chiếm đúng 25% chiều rộng container.
- Sơ đồ text:
[ Item 1 (25%) ] [ Item 2 (25%) ] [ Item 3 (25%) ] [ Item 4 (25%) ]

Trường hợp 2: .container { display: flex; flex-wrap: wrap; } .item { width: 45%; margin: 2.5%; } (6 items)
- Bố cục: Flexbox cho phép bẻ dòng (wrap). Mỗi item chiếm tổng cộng 50% chiều rộng (45% width + 5% margin 2 bên). Do đó mỗi hàng sẽ chứa vừa vặn 2 items. Với 6 items, ta có tổng cộng 3 hàng, mỗi hàng 2 items.
- Sơ đồ text:
Hàng 1:   [ Item 1 ]     [ Item 2 ]
Hàng 2:   [ Item 3 ]     [ Item 4 ]
Hàng 3:   [ Item 5 ]     [ Item 6 ]

Trường hợp 3: .container { display: flex; justify-content: space-between; align-items: center; } (3 items)
- Bố cục: 3 phần tử nằm trên 1 hàng và căn giữa theo chiều dọc. Khoảng trống còn dư được chia đều vào giữa các items. Item 1 bám sát lề trái, Item 3 bám sát lề phải, Item 2 đứng độc lập chính giữa.
- Sơ đồ text:
[ Item 1 ] <------- khoảng trống -------> [ Item 2 ] <------- khoảng trống -------> [ Item 3 ]

Trường hợp 4: .container { display: grid; grid-template-columns: 200px 1fr 200px; gap: 20px; } (3 items)
- Bố cục: Lưới chia làm 3 cột. Cột 1 rộng 200px, cột 3 rộng 200px. Cột 2 ở giữa tự co giãn chiếm toàn bộ không gian còn lại (1fr). Giữa các cột có khoảng hở 20px. 3 items vừa đúng điền vào 1 hàng đầu tiên.
- Sơ đồ text:
[ Item 1 (200px) ]  <20px>  [       Item 2 (1fr)       ]  <20px>  [ Item 3 (200px) ]

Trường hợp 5: .container { display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px; } (7 items)
- Bố cục: Lưới chia đều làm 3 cột bằng nhau (1fr). Do có 7 items, trình duyệt tự động xếp thành 3 hàng. Hàng 1 có 3 items, hàng 2 có 3 items. Hàng 3 chỉ có 1 item (Item 7) nằm ở cột ngoài cùng bên trái, 2 ô còn lại bỏ trống.
- Sơ đồ text:
[ Item 1 ]  [ Item 2 ]  [ Item 3 ]
[ Item 4 ]  [ Item 5 ]  [ Item 6 ]
[ Item 7 ]  [ Trống  ]  [ Trống  ]

---

## PHẦN C — SUY LUẬN

### Câu C1 (10đ) — Flexbox vs Grid: Khi nào dùng gì?

1. Navigation bar ngang (logo + menu + buttons)
- Lựa chọn: Dùng Flexbox.
- Lý do: Đây là layout 1 chiều (theo chiều ngang). Flexbox sinh ra để căn chỉnh các phần tử trên 1 hàng, dễ dàng đẩy logo sang trái và menu sang phải bằng justify-content: space-between, đồng thời căn giữa dọc hoàn hảo bằng align-items: center.

2. Lưới ảnh Instagram (3 cột đều nhau, số ảnh không biết trước)
- Lựa chọn: Dùng Grid.
- Lý do: Bố cục lưới 2 chiều là thế mạnh tuyệt đối của Grid. Chỉ cần khai báo 3 cột repeat(3, 1fr), khi ảnh mới được thêm vào, Grid sẽ tự động xếp chúng xuống hàng tiếp theo cực kỳ ngay ngắn mà không lo bị lệch.

3. Layout blog: main content + sidebar
- Lựa chọn: Dùng Grid.
- Lý do: Đây là layout cấu trúc trang (page layout). Dùng Grid giúp chia tỷ lệ mảng lớn rất rõ ràng (ví dụ grid-template-columns: 1fr 300px). Code sẽ cực kỳ gọn và mang tính định hình cao hơn so với Flexbox.

4. Footer với 4 cột thông tin (Về chúng tôi, Liên kết, Hỗ trợ, Liên hệ)
- Lựa chọn: Dùng Flexbox.
- Lý do: Dùng Flexbox với thuộc tính flex: 1 cho cả 4 cột sẽ giúp chúng tự động chia đều khoảng không gian và co giãn linh hoạt. Khi thu nhỏ màn hình điện thoại, chỉ cần một dòng flex-direction: column là 4 cột tự động xếp thành hàng dọc.

5. Card sản phẩm (ảnh trên, text giữa, nút dưới — nút luôn dính đáy)
- Lựa chọn: Kết hợp cả hai (hoặc chỉ dùng Flexbox hướng dọc).
- Lý do: Lưới chứa các thẻ card bên ngoài thì nên dùng Grid. Nhưng bên trong mỗi thẻ card, ta dùng Flexbox (flex-direction: column) là chuẩn nhất. Lý do là Flexbox hỗ trợ đẩy phần tử bằng margin: auto. Chỉ cần set margin-top: auto cho cái nút là nó tự động bị đẩy sát xuống đáy card, bất chấp đoạn text mô tả bên trên dài hay ngắn.

---
