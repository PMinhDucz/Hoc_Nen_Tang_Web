# ĐÁP ÁN PHIẾU BÀI TẬP 07 - JAVASCRIPT BASICS

## PHẦN A — KIỂM TRA ĐỌC HIỂU

### Câu A1 (5đ) — var / let / const

Dự đoán kết quả:
- **Đoạn 1:** In ra `undefined`. Vì `var` có cơ chế hoisting đưa biến `x` lên đầu nhưng chưa được gán giá trị 5.
- **Đoạn 2:** Lỗi `ReferenceError`. Vì `let` cũng có hoisting nhưng nó nằm trong "vùng chết tạm thời" (TDZ - Temporal Dead Zone), trình duyệt không cho phép sử dụng trước khi dòng khởi tạo chạy.
- **Đoạn 3:** Lỗi `TypeError`. Vì `z` là hằng số (`const`) nên không thể gán lại một giá trị mới.
- **Đoạn 4:** In ra mảng có 4 phần tử là `[1, 2, 3, 4]`. Vì `const` chỉ cấm gán lại biến `arr` bằng một mảng hay giá trị khác, chứ không cấm thay đổi nội dung (thêm/bớt phần tử) bên trong cái mảng đó.
- **Đoạn 5:** In ra `"Trong block: 2"` và `"Ngoài block: 1"`. Vì `let` có phạm vi block scope, biến `a` bên trong dấu ngoặc nhọn và biến `a` bên ngoài là 2 biến hoàn toàn độc lập với nhau.

---

### Câu A2 (5đ) — Data Types & Coercion

Dự đoán kết quả:
- `typeof null` -> `"object"` (đây là một bug lịch sử của JS)
- `typeof undefined` -> `"undefined"`
- `typeof NaN` -> `"number"` (Not a Number nhưng kiểu dữ liệu vẫn là số)
- `"5" + 3` -> `"53"`
- `"5" - 3` -> `2`
- `"5" * "3"` -> `15`
- `true + true` -> `2` (true bị ép kiểu thành 1)
- `[] + []` -> `""` (chuỗi rỗng)
- `[] + {}` -> `"[object Object]"`
- `{} + []` -> `0` (trên console) hoặc `"[object Object]"` tùy môi trường.

**Giải thích tại sao `"5" + 3` và `"5" - 3` cho kết quả khác nhau:**
- Với phép cộng `+`: JS ưu tiên việc nối chuỗi (String Concatenation). Vì có số `"5"` là chuỗi, số `3` sẽ bị ép kiểu thành chuỗi `"3"` và nối lại thành `"53"`.
- Với phép trừ `-`: Phép trừ chỉ có ý nghĩa trong toán học, không có khái niệm trừ chuỗi. Do đó JS buộc phải ép ngược chuỗi `"5"` về dạng số nguyên `5` để làm toán, ra kết quả là `2`.

---

### Câu A3 (5đ) — So sánh == vs ===

Dự đoán kết quả:
- `5 == "5"` -> `true`
- `5 === "5"` -> `false`
- `null == undefined` -> `true`
- `null === undefined` -> `false`
- `NaN == NaN` -> `false` (Trường hợp đặc biệt, NaN không bao giờ bằng chính nó)
- `0 == false` -> `true`
- `0 === false` -> `false`
- `"" == false` -> `true`

**Quy tắc:** Từ giờ trở đi, LUÔN LUÔN dùng `===` (Strict equality). 
**Lý do:** Toán tử `==` tự động ép kiểu ngầm định (Type Coercion) nên dễ sinh ra các kết quả rất phi logic (như `"" == false`). Dùng `===` sẽ kiểm tra cả kiểu dữ liệu lẫn giá trị, nếu khác kiểu dữ liệu là trả về `false` luôn, giúp code chặt chẽ và không bị bug ngầm.

---

### Câu A4 (5đ) — Truthy & Falsy

Các giá trị Falsy trong JS bao gồm đúng 8 cái: `false`, `0`, `-0`, `0n` (BigInt), `""` (chuỗi rỗng), `null`, `undefined`, `NaN`.
Tất cả các giá trị còn lại không nằm trong danh sách này đều là Truthy.

Dự đoán in hay không in:
- `if ("0")` -> **Có in** (chuỗi có ký tự 0 là truthy)
- `if ("")` -> **Không in** (chuỗi rỗng là falsy)
- `if ([])` -> **Có in** (mảng rỗng vẫn là truthy)
- `if ({})` -> **Có in** (object rỗng vẫn là truthy)
- `if (null)` -> **Không in** (falsy)
- `if (0)` -> **Không in** (falsy)
- `if (-1)` -> **Có in** (số khác 0 là truthy)
- `if (" ")` -> **Có in** (chuỗi chứa dấu cách là truthy)

---

### Câu A5 (5đ) — Template Literals

Viết lại 3 cách nối chuỗi bằng backtick:

```javascript
var greeting = `Xin chào ${name}! Bạn ${age} tuổi.`;


var url = `https://api.example.com/users/${userId}/orders?page=${page}`;


var html = `
<div class="card">
    <h2>${title}</h2>
    <p>${description}</p>
    <span>Giá: ${price}đ</span>
</div>
`;
```

---

## PHẦN C — SUY LUẬN

### Câu C1 (10đ) — Debug JavaScript

Đoạn code trong đề có 5 lỗi cơ bản và 1 lỗi ẩn (logic scope):

1. **Lỗi so sánh gán (`giaSauGiam = 0`):**
   - Lỗi ở: `if (giaSauGiam = 0)`
   - Giải thích: Dấu `=` là phép gán, không phải phép so sánh. Biểu thức này tự động gán giá trị 0 cho `giaSauGiam`. Hơn nữa vì `0` là falsy, nên điều kiện `if` bị bỏ qua không chạy.
   - Cách sửa: Đổi thành `if (giaSauGiam === 0)`

2. **Lỗi logic tham số đầu vào là chuỗi:**
   - Lỗi ở: `tinhGiaGiamGia("100000", 20)`
   - Giải thích: Hàm mong đợi số học, nhưng lại truyền chuỗi `"100000"`. Tuy trong hàm sử dụng `*` và `-` nên JS tự động ép kiểu và tính đúng, nhưng đây là bad practice, nếu có phép `+` sẽ sinh ra thảm họa.
   - Cách sửa: Gọi hàm với kiểu số `tinhGiaGiamGia(100000, 20)`

3. **Lỗi không xử lý early return cho giá trị lỗi:**
   - Lỗi ở: Test case `110%`
   - Giải thích: Khi nhập 110%, hàm return dòng chữ `"Phần trăm giảm không hợp lệ"`. Nhưng lệnh `console.log("Giá: " + gia2)` bên ngoài lại thản nhiên nối thêm chữ "Giá:" vào, in ra một câu rất vô lý.
   - Cách sửa: Cần dùng `if-else` ở dưới để kiểm tra nếu `typeof gia2 === "string"` thì in ra lỗi, ngược lại mới in "Giá: ...".

4. **Lỗi khai báo biến (thiếu an toàn):**
   - Lỗi ở: `var giamGia = ...`
   - Giải thích: Sử dụng `var` có thể làm rò rỉ biến ra toàn cục (nếu không bọc trong hàm) và dễ gây lỗi trùng lặp tên biến.
   - Cách sửa: Đổi thành `const giamGia = ...` vì biến này chỉ tính 1 lần không đổi lại.

5. **Lỗi thiếu dấu chấm phẩy (;) kết thúc câu lệnh:**
   - Dù JS tự chèn (ASI) nhưng rất dễ gây lỗi ngầm nguy hiểm nếu có 2 dòng code liền nhau kiểu `[1,2,3].forEach(...)`.
   - Cách sửa: Bổ sung `;` vào cuối tất cả các lệnh gán và `return`.

6. **Lỗi "ẨN" - Vòng lặp `for` kết hợp `var` và `setTimeout`:**
   - Lỗi ở: `for (var i = 0; i < 5; i++) { setTimeout(...) }`
   - Giải thích: Hàm `setTimeout` chạy bất đồng bộ (chạy sau cùng). Vì `var` không có block scope (chỉ có function scope/global scope), nên khi vòng lặp chạy xong cả 5 lần, biến `i` mang giá trị cuối cùng là 5. Lúc này 5 hàm `setTimeout` mới bắt đầu chạy và in ra `Item 5` liên tục 5 lần.
   - Cách sửa: Đổi `var i = 0` thành `let i = 0`. Khóa `let` hỗ trợ block scope, giúp mỗi vòng lặp lưu lại một bản sao độc lập của `i` tại thời điểm đó. Kết quả sẽ in ra đúng từ `Item 0` đến `Item 4`.

---

## 🎬 PHẦN D — VIDEO THỰC HÀNH OBS
**Link Video (Google Drive):** [https://drive.google.com/drive/u/0/folders/17gi3799assi8j0UU5QCvpXjvD42kgzwl](https://drive.google.com/drive/u/0/folders/17gi3799assi8j0UU5QCvpXjvD42kgzwl)
