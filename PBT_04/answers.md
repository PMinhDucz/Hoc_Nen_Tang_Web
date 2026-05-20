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
