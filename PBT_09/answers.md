# ĐÁP ÁN PHIẾU BÀI TẬP 09 - DOM MANIPULATION & EVENTS

## PHẦN A — KIỂM TRA ĐỌC HIỂU

### Câu A1 (5đ) — DOM Tree

**1. Sơ đồ cây (DOM Tree) của HTML:**
div#app
├── header
│   ├── h1 (Todo App)
│   └── nav
│       ├── a.active (All)
│       ├── a (Active)
│       └── a (Completed)
└── main
    ├── form#todoForm
    │   ├── input#todoInput
    │   └── button (Add)
    └── ul#todoList
        ├── li.todo-item (Learn HTML)
        └── li.todo-item.completed (Learn CSS)

**2. Viết querySelector:**
- Chọn thẻ h1: `document.querySelector('h1')`
- Chọn input trong form: `document.querySelector('#todoForm input')`
- Chọn tất cả .todo-item: `document.querySelectorAll('.todo-item')`
- Chọn link đang active: `document.querySelector('a.active')`
- Chọn li đầu tiên trong #todoList: `document.querySelector('#todoList li:first-child')`
- Chọn tất cả a bên trong nav: `document.querySelectorAll('nav a')`

---

### Câu A2 (5đ) — innerHTML vs textContent

**Sự khác nhau:**
- **innerHTML:** Trả về hoặc gán toàn bộ cấu trúc mã HTML bên trong một thẻ. Khi gán chuỗi mới, trình duyệt sẽ phân tích chuỗi đó và dựng thành các thẻ HTML thực sự trên giao diện. Dùng khi muốn nhúng một khối giao diện phức tạp từ Javascript.
- **textContent:** Chỉ thao tác với văn bản thuần túy (plain text) bên trong thẻ. Bất kỳ thẻ HTML nào nằm trong chuỗi cũng sẽ bị mã hóa thành ký tự văn bản bình thường (không được render thành giao diện). Dùng khi chỉ muốn cập nhật nội dung chữ an toàn, chạy nhanh hơn.

**Câu hỏi bảo mật:**
Lỗ hổng XSS (Cross-Site Scripting) xảy ra vì trình duyệt quá "ngây thơ" khi dùng `innerHTML`. Trình duyệt sẽ thực thi bất kỳ thẻ `<script>` hay event `onerror` nào bị người dùng cố ý nhập vào. 
Ví dụ: Người dùng nhập `<img src=x onerror="alert('Hacked!')">`. Khi bạn lấy nội dung đó đưa thẳng vào `innerHTML`, trình duyệt sẽ cố tải ảnh `x`, bị lỗi, sau đó chạy đoạn mã JS alert.

**Cách sửa code minh họa an toàn:**
```javascript
const userInput = document.querySelector("#search").value;
document.querySelector("#result").textContent = userInput;
```

---

### Câu A3 (5đ) — Event Bubbling

**Dự đoán khi click vào button:**
Kết quả in ra lần lượt:
BUTTON
INNER
OUTER
    
**Dự đoán khi uncomment stopPropagation():**
Kết quả in ra duy nhất:
BUTTON

*Giải thích:*
Theo mặc định của trình duyệt, sự kiện click lan truyền theo nguyên tắc "Nổi bọt" (Event Bubbling) từ con ra cha. Tức là bấm vào button thì cả button, cả div con và div cha bọc ngoài cùng đều ghi nhận sự kiện click.
Hàm `e.stopPropagation()` có tác dụng lập tức ngăn chặn bong bóng nổi lên, làm cho sự kiện click chỉ dừng lại ở đúng cái button đó, các thẻ cha bên ngoài hoàn toàn không biết có cú click nào vừa xảy ra.

---

## PHẦN C — DEBUG & PHÂN TÍCH

### Câu C1 (8đ) — Debug DOM Code

Tìm và sửa 7 lỗi sai trong đoạn mã "cổ đại" của đề bài:

1. Sự kiện click bị viết sai tên. Sửa `addEventListener("onclick", ...)` thành `addEventListener("click", ...)`.
2. Lỗi gán sai biến hiển thị. `countDisplay` là một DOM node, không thể gán bằng số. Cần sửa `countDisplay = count;` thành `countDisplay.textContent = count;`.
3. Xóa nội dung HTML không nên gán bằng chữ `null`. Sửa `historyList.innerHTML = null;` thành `historyList.innerHTML = "";`.
4. Gọi phương thức sai cú pháp (thiếu ngoặc). Sửa `item.remove;` thành `item.remove();`.
5. Dữ liệu lấy từ localStorage luôn luôn là dạng chuỗi (String). Cần phải ép kiểu trước khi cộng trừ. Sửa `localStorage.getItem("count")` thành `parseInt(localStorage.getItem("count")) || 0`.
6. Thiếu bước load lại lịch sử cũ từ bộ nhớ. Bổ sung thêm dòng: `historyList.innerHTML = localStorage.getItem("history") || "";` vào trong sự kiện load.
7. Lỗi thiết kế Event nguy hiểm: Khi load lại `history` bằng chuỗi `innerHTML`, toàn bộ sự kiện click gắn trên từng thẻ `li` (để gọi hàm `deleteHistory`) đã bị xóa sổ vĩnh viễn. Cần sử dụng cơ chế Event Delegation (gắn sự kiện lên trực tiếp thẻ `historyList`) để bắt sự kiện click cho các thẻ con bên trong.

---

### Câu C2 (7đ) — Performance

**1. Binding Event và Event Delegation:**
Gắn sự kiện lên 1000 phần tử riêng lẻ là BAD PRACTICE vì nó ép trình duyệt phải tạo ra 1000 vùng nhớ chứa 1000 hàm xử lý khác nhau, gây tiêu tốn tài nguyên RAM và làm giật lag trang web nặng nề.
Event Delegation giải quyết bằng cách: Chỉ gắn duy nhất 1 sự kiện lên thẻ "Ông nội" bọc ngoài cùng. Bất kỳ cái nào được click thì sự kiện cũng sủi tăm lên Ông nội. Ông nội chỉ cần nhìn vào `event.target` là biết chính xác đứa cháu nào vừa bị click để xử lý.

**2. Refactor Code bằng DocumentFragment:**

```javascript
const fragment = document.createDocumentFragment();
for (let i = 0; i < 1000; i++) {
    const div = document.createElement("div");
    div.textContent = `Item ${i}`;
    fragment.appendChild(div);
}
document.body.appendChild(fragment);
```

*Giải thích:*
`DocumentFragment` là một cấu trúc cây DOM vô hình (không nằm trong màn hình thật). Việc nhét 1000 thẻ vào Fragment chỉ diễn ra trong bộ nhớ nháp, giao diện hoàn toàn không bị thay đổi nên trình duyệt không tốn công tính toán vẽ lại (Reflow). Chỉ đến dòng lệnh cuối cùng bốc nguyên cái Fragment đắp vào body thì màn hình mới Reflow duy nhất 1 lần. Hiệu năng được cải thiện hàng nghìn lần!

---

## 🎬 PHẦN D — VIDEO THỰC HÀNH OBS
**Link Video (Google Drive):** [https://drive.google.com/drive/u/0/folders/17gi3799assi8j0UU5QCvpXjvD42kgzwl](https://drive.google.com/drive/u/0/folders/17gi3799assi8j0UU5QCvpXjvD42kgzwl)
