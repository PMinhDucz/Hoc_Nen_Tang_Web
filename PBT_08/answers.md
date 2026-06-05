# ĐÁP ÁN PHIẾU BÀI TẬP 08 - JAVASCRIPT FUNCTIONS, ARRAYS & OBJECTS

## PHẦN A — KIỂM TRA ĐỌC HIỂU

### Câu A1 (5đ) — Function Declaration vs Expression vs Arrow

**3 cách viết hàm tinhThueBaoHiem:**

```javascript
function tinhThueBaoHiemDecl(luong) {
    let thuong = luong > 11000000 ? luong * 0.1 : 0;
    return { thuong: thuong, thuc_nhan: luong - thuong };
}

const tinhThueBaoHiemExpr = function(luong) {
    let thuong = luong > 11000000 ? luong * 0.1 : 0;
    return { thuong: thuong, thuc_nhan: luong - thuong };
};

const tinhThueBaoHiemArrow = (luong) => {
    let thuong = luong > 11000000 ? luong * 0.1 : 0;
    return { thuong, thuc_nhan: luong - thuong };
};
```

**Sự khác nhau về Hoisting:**
- **Function Declaration:** Được hoisting toàn bộ lên đầu scope. Tức là ta có thể **gọi hàm trước khi khai báo** mà code vẫn chạy bình thường.
- **Function Expression & Arrow Function (dùng let/const):** Khai báo biến được hoisting nhưng nằm trong "vùng chết tạm thời" (TDZ). Không có giá trị hàm nào được khởi tạo trước. Nếu ta **gọi hàm trước dòng khai báo**, chương trình sẽ văng lỗi ReferenceError lập tức.

---

### Câu A2 (5đ) — Scope & Closure

**Đoạn 1 - Dự đoán output in ra lần lượt:**
1
2
3
2
2

*Giải thích:* Khi chạy counter(), nó trả về một object chứa 3 hàm con. Cả 3 hàm này đều tạo ra "closure" (bao đóng) cùng trỏ về một biến count chung. Việc tăng hay giảm thông qua các hàm này đều trực tiếp làm thay đổi giá trị của count trong bộ nhớ đó.

**Đoạn 2 - Dự đoán output sau 200ms:**
var: 3
var: 3
var: 3
let: 0
let: 1
let: 2

*Giải thích chi tiết:* 
- Vòng lặp var: var có phạm vi là function scope (hoặc global). Biến i chỉ có đúng 1 bản thể duy nhất dùng chung cho cả 3 vòng lặp. Hàm setTimeout sẽ chờ 100ms mới chạy, lúc đó vòng lặp đã chạy xong từ lâu và i đã có giá trị cuối cùng là 3. Vì vậy nó in ra số 3 tận 3 lần.
- Vòng lặp let: let có phạm vi block scope. Cứ mỗi lần vòng lặp chạy, một không gian bộ nhớ (block) mới được tạo ra chứa giá trị riêng biệt của biến j tại thời điểm đó (0, 1, 2). Nên khi setTimeout chạy, mỗi hàm sẽ lấy đúng cái giá trị j đã được khóa lại trong block của nó.

---

### Câu A3 (5đ) — Array Methods

```javascript
const nums = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

const evens = nums.filter(n => n % 2 === 0);

const tripled = nums.map(n => n * 3);

const sum = nums.reduce((acc, curr) => acc + curr, 0);

const firstOver7 = nums.find(n => n > 7);

const hasOver10 = nums.some(n => n > 10);

const allOver0 = nums.every(n => n > 0);

const strings = nums.map(n => `Số ${n} là ${n % 2 === 0 ? 'chẵn' : 'lẻ'}`);

const reversed = [...nums].reverse();
```

---

### Câu A4 (5đ) — Object Destructuring & Spread

**Đoạn 1 - Destructuring:**
Kết quả in ra:
"iPhone 16" 25990000 8 "Titan"
ReferenceError: specs is not defined

*Giải thích:* Cú pháp `{ name, price, specs: { ram, color } }` có nghĩa là "hãy chui vào bên trong specs, lấy ra ram và color rồi biến chúng thành 2 biến độc lập". Nó KHÔNG tạo ra biến specs. Do đó khi in specs sẽ bị lỗi.

**Đoạn 2 - Spread:**
Kết quả in ra:
23990000
true
25990000

*Giải thích:* Cú pháp `...product` sẽ trải các thuộc tính của product cũ ra để gộp thành một object mới hoàn toàn (updated). Thuộc tính price đằng sau sẽ đè lên price cũ. Và do đây là object mới nên product gốc hoàn toàn không bị ảnh hưởng.

**Đoạn 3 - Spread gotcha:**
Kết quả in ra:
16 

*Giải thích:* Tại sao lại là 16 chứ không phải 8? Vì cú pháp spread chỉ là **Shallow Copy (Copy nông)**. Nó chỉ tạo ra object mới ở tầng ngoài cùng, còn những object con nằm sâu bên trong (như specs) thì nó chỉ copy địa chỉ bộ nhớ (reference) thôi. Thành ra copy.specs và product.specs vẫn đang trỏ chung vào cùng một chỗ. Sửa một bên là bên kia nhảy theo ngay!
