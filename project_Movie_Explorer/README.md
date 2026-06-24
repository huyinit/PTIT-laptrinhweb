# Movie Explorer 🎬

Movie Explorer là một ứng dụng Web đơn giản dành cho sinh viên môn **Lập trình Web** dùng làm bài thực hành/demo trên lớp. Ứng dụng kết nối tới API miễn phí **TVMaze** để tìm kiếm phim, áp dụng các bộ lọc theo năm/thể loại và hỗ trợ phân trang dữ liệu ở phía client.

---

## 🚀 Chức năng nổi bật
1. **Tìm kiếm phim**: Nhập từ khoá tìm kiếm phim thông qua ô input.
2. **Bộ lọc thông minh**: Lọc tức thời kết quả theo năm phát hành hoặc thể loại (Scripted, Reality, Animation).
3. **Phân trang**: Hỗ trợ phân trang phía client (Previous/Next) giúp giao diện gọn gàng.
4. **Thiết kế Glassmorphism**: Giao diện tối (Dark Mode) kết hợp các hiệu ứng kính mờ (glassmorphism), chuyển động hover mượt mà và hiển thị responsive tốt trên di động.
5. **Trạng thái giao diện**: Hiển thị rõ các trạng thái Loading, No Results Found hoặc Lỗi kết nối.

---

## 📁 Cấu trúc thư mục dự án
Dự án tuân thủ nghiêm ngặt cấu trúc modular sạch sẽ:
```text
├── index.html       # Giao diện chính của ứng dụng
├── css/
│   └── style.css    # Thiết kế giao diện (Glassmorphism & Layout Grid)
└── js/
    ├── api.js       # Module kết nối và chuẩn hóa dữ liệu từ API TVMaze
    ├── ui.js        # Module render danh sách phim và các trạng thái giao diện
    └── main.js      # Module chính quản lý state, bộ lọc, phân trang và sự kiện
```

---

## 🛠️ Công nghệ & Kỹ thuật ES6+ sử dụng
Để phục vụ mục tiêu demo lập trình Web hiện đại, mã nguồn sử dụng:
* **ES6+ Syntax**: `let`, `const`, destructuring (ở tham số map/filter), spread operator (`[...filtered]`), template literals.
* **Arrow functions**: Viết ngắn gọn toàn bộ hàm xử lý.
* **Array Methods**: 
  * `map()`: Biến đổi dữ liệu thô từ API.
  * `filter()`: Lọc kết quả tìm kiếm theo năm/thể loại phim.
  * `reduce()`: Tạo chuỗi HTML động từ mảng đối tượng phim một cách tối ưu.
* **Asynchronous JS**: `Promise`, `async/await`, và `try/catch` để xử lý ngoại lệ khi gọi API.
* **JS Modules**: Sử dụng `import/export` để tách biệt logic xử lý.

---

## 📏 Kiểm soát giới hạn dòng code (Đã tối ưu hóa)

Dự án được thiết kế siêu ngắn gọn để dễ giải thích trong 10-15 phút trên lớp:

| File | Số dòng thực tế (không tính dòng trống & comment) | Giới hạn yêu cầu | Trạng thái |
| :--- | :---: | :---: | :---: |
| **HTML** (`index.html`) | **32 dòng** | <= 40 dòng | Đạt chuẩn |
| **CSS** (`css/style.css`) | **20 dòng** | <= 60 dòng | Đạt chuẩn |
| **JavaScript** (`api.js` + `ui.js` + `main.js`) | **64 dòng** | <= 100 dòng | Đạt chuẩn |

---

## 💻 Hướng dẫn chạy chương trình

Do ứng dụng sử dụng cơ chế **ES Modules** (`import/export`), trình duyệt sẽ chặn tải các file JS trực tiếp từ giao thức `file://` vì chính sách CORS. Bạn **bắt buộc** phải chạy ứng dụng thông qua một local web server.

### Cách 1: Sử dụng VS Code Live Server (Khuyên dùng)
1. Cài đặt extension **Live Server** trên VS Code.
2. Click chuột phải vào tệp `index.html` và chọn **Open with Live Server**.

### Cách 2: Sử dụng NodeJS
Chạy lệnh sau tại thư mục dự án:
```bash
npx serve
```
Sau đó truy cập địa chỉ được cung cấp (thường là `http://localhost:3000` hoặc `http://localhost:5000`).

### Cách 3: Sử dụng Python
Nếu máy tính đã cài sẵn Python, chạy lệnh sau tại thư mục dự án:
```bash
# Python 3
python -m http.server 8000
```
Sau đó mở trình duyệt truy cập `http://localhost:8000`.
