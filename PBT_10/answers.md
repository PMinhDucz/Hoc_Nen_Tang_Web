# ĐÁP ÁN PHIẾU BÀI TẬP 10 - ASYNC JAVASCRIPT & API INTEGRATION

## PHẦN A — KIỂM TRA ĐỌC HIỂU

### Câu A1 (5đ) — Sync vs Async

**Dự đoán thứ tự output:**
1 - Start
4 - End
3 - Promise
6 - Promise 2
2 - Timeout 0ms
7 - Nested timeout
5 - Timeout 100ms

**Giải thích:**
- **Synchronous (Đồng bộ):** Chạy trước tiên trên Call Stack (1 và 4).
- **Microtask Queue:** Chứa các tác vụ ưu tiên cao như Promise. Sau khi Call Stack trống, nó sẽ chạy Microtask (3 và 6). Trong lúc chạy Microtask 6, một Macrotask 7 được ném thêm vào hàng đợi.
- **Macrotask Queue:** Chứa các tác vụ ưu tiên thấp hơn như `setTimeout`. Sau khi Microtask Queue trống rỗng, nó mới bắt đầu chạy Macrotask (2, 7, và cuối cùng là 5 vì bị delay 100ms).

---

### Câu A2 (5đ) — Fetch API

1. `await fetch(...)` trả về một đối tượng Promise (lời hứa). Ta cần dùng `await` để yêu cầu mã JS tạm dừng ở dòng đó, kiên nhẫn chờ đến khi server trên mạng thực sự trả dữ liệu về thì mới chạy tiếp các dòng code bên dưới.
2. `response.ok` sẽ trả về `false` khi HTTP Status Code của gói tin nằm ngoài dải 200-299. Các trường hợp phổ biến: `404` (Không tìm thấy trang), `500` (Lỗi máy chủ nội bộ), `403` (Bị cấm truy cập).
3. `response.json()` cũng trả về một Promise vì luồng dữ liệu JSON từ server tải về có thể rất lớn và tốn thời gian để parse (dịch) từ chuỗi thành Object trong JS. Do đó CŨNG cần `await` để chờ quá trình dịch này hoàn tất.
4. `try...catch` ở đây bắt được 2 loại lỗi chính:
   - Lỗi mạng (Network error) do mất kết nối mạng internet hoặc sai URL, lúc này hàm `fetch` tự động nhảy thẳng vào `catch`.
   - Lỗi logic do ta chủ động ném ra bằng `throw new Error` khi `response.ok` bị `false`.

---

### Câu A3 (5đ) — Promise States

**Sơ đồ trạng thái:**
Pending (Đang chờ) ➔ Fulfilled (Thành công, có dữ liệu trả về)
Pending (Đang chờ) ➔ Rejected (Thất bại, có lỗi trả về)

**Callback Hell là gì?**
Là tình trạng lạm dụng việc lồng ghép các hàm callback vào bên trong nhau liên tục để xử lý tuần tự các tác vụ bất đồng bộ. Kết quả tạo ra một khối code thụt lề hình kim tự tháp (Pyramid of Doom) cực kỳ khó đọc, khó bảo trì và dễ sinh lỗi.

**Ví dụ Callback Hell:**
```javascript
getUser(function(user) {
    getProfile(user, function(profile) {
        getPosts(profile, function(posts) {
            getComments(posts, function(comments) {
                console.log(comments);
            });
        });
    });
});
```

**Refactor bằng async/await:**
```javascript
async function fetchAllData() {
    const user = await getUser();
    const profile = await getProfile(user);
    const posts = await getPosts(profile);
    const comments = await getComments(posts);
    console.log(comments);
}
```

---

## PHẦN C — PHÂN TÍCH

### Câu C1 (10đ) — Error Handling Strategy

1. **Network errors:** Bắt trong khối `catch`. Thường xảy ra khi rớt mạng, ta hiển thị thông báo "Không có kết nối mạng" cho người dùng.
2. **API errors:** Kiểm tra bằng `!response.ok`, sau đó dùng `switch...case` quét qua mã `response.status` (404, 500) để quăng ra lỗi tương ứng.
3. **Timeout:** Sử dụng `AbortController` tích hợp sẵn của Browser để hủy bỏ fetch sau N mili-giây.

```javascript
async function fetchWithTimeout(url, ms) {
    const controller = new AbortController();
    const timerId = setTimeout(() => controller.abort(), ms);
    const response = await fetch(url, { signal: controller.signal });
    clearTimeout(timerId);
    return response;
}
```

4. **Retry logic:** Dùng vòng lặp `for` để thử gọi lại nhiều lần nếu thất bại, chỉ `throw error` ở lần lặp cuối cùng.

```javascript
async function fetchWithRetry(url, maxRetries) {
    for (let i = 0; i < maxRetries; i++) {
        try {
            const res = await fetch(url);
            if (res.ok) {
                return await res.json();
            }
        } catch (err) {
            if (i === maxRetries - 1) {
                throw err;
            }
        }
    }
}
```

---

### Câu C2 (10đ) — Promise.all vs Promise.allSettled vs Promise.race vs Promise.any

| Method | Khi nào resolve? | Khi nào reject? | Use case |
|--------|------------------|-----------------|----------|
| `.all()` | Khi TẤT CẢ promise đều resolve | Ngay khi có BẤT KỲ 1 promise nào reject | Tải dữ liệu phụ thuộc nhau, 1 cái chết thì chết cả cụm. |
| `.allSettled()` | Khi TẤT CẢ promise đều đã xong (resolve hoặc reject) | Không bao giờ reject | Dashboard nhiều màn hình, 1 api lỗi các API khác vẫn hiện bình thường. |
| `.race()` | Giải quyết ngay lập tức theo promise hoàn thành NHANH NHẤT (bất chấp là resolve hay reject) | Theo promise NHANH NHẤT (bất chấp là resolve hay reject) | Thiết lập cơ chế Timeout cho API bằng cách đua tốc độ với hàm setTimeout. |
| `.any()` | Ngay khi có BẤT KỲ 1 promise nào resolve | Chỉ khi TẤT CẢ đều bị reject | Gọi cùng 1 dữ liệu từ 3 server khác nhau, server nào phản hồi thành công nhanh nhất thì lấy. |

**Ví dụ code thực tế:**

```javascript
async function fetchAllDependent() {
    const results = await Promise.all([
        fetch("/api/users").then(r => r.json()),
        fetch("/api/roles").then(r => r.json())
    ]);
}

async function fetchDashboardWidgets() {
    const results = await Promise.allSettled([
        fetch("/api/weather").then(r => r.json()),
        fetch("/api/news").then(r => r.json())
    ]);
}

async function fetchWithTimeoutRace() {
    const timeoutPromise = new Promise((resolve, reject) => {
        setTimeout(() => reject(new Error("Timeout")), 5000);
    });
    const result = await Promise.race([
        fetch("/api/heavy-data").then(r => r.json()),
        timeoutPromise
    ]);
}

async function fetchFastestMirror() {
    const result = await Promise.any([
        fetch("https://us-server.com/data").then(r => r.json()),
        fetch("https://eu-server.com/data").then(r => r.json()),
        fetch("https://asia-server.com/data").then(r => r.json())
    ]);
}
```
