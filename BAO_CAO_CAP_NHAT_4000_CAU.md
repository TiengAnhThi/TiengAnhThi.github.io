# Báo cáo cập nhật ngân hàng lớp 3 và lớp 6 cấp trường — 31/10/2026

## Phạm vi

- Tệp gốc: `TiengAnhThi.github.io-main (34).zip`.
- Chỉ chỉnh sửa `index.html` và `questions-gradeN-2000.json` trong 2 thư mục `thi-thu/cap-truong/lop-3/` và `thi-thu/cap-truong/lop-6/`.
- Giữ tên JSON `questions-gradeN-2000.json` để tương thích cấu trúc hiện tại, **bên trong là 4.000 câu**.
- Không sửa các lớp/cấp khác, Firebase, Premium, Ultimate, ngân hàng ảnh, tài khoản hay cơ chế chấm điểm.

## Kết quả dữ liệu

| Hạng mục | Lớp 3 cấp trường | Lớp 6 cấp trường |
|---|---:|---:|
| Tổng câu | 4.000 | 4.000 |
| Loại câu | 35 | 24 |
| Nội dung gốc duy trì | 1998 | 1982 |
| Câu biên soạn bổ sung | 2002 | 2018 |
| Trùng theo dấu vân tay nội dung hiển thị | 0 | 0 |
| Lỗi dữ liệu cơ bản | 0 | 0 |

Câu bổ sung dùng các mẫu ngữ pháp, từ vựng, đọc hiểu, phát âm, nghe có văn bản và câu sắp xếp dựa trên phạm vi của ngân hàng đang có; chỉ đảo lựa chọn A–D không được tính là câu độc lập.

## Kiểm tra thử trên trình duyệt Chromium (mô phỏng)

| Tiêu chí | Lớp 3 | Lớp 6 |
|---|---:|---:|
| Lượt thử gần nhất | 20 | 20 |
| Số câu mỗi đề | 200 | 200 |
| Số câu hiển thị riêng biệt trong đề | 200 | 200 |
| Số loại câu trong đề | 35 | 24 |
| Trùng tối đa giữa hai đề liên tiếp | 1 | 0 |
| Lỗi JavaScript phát hiện | 0 | 0 |

- Bộ chọn đề ưu tiên ID chưa xuất hiện trong 1.600 câu đã làm gần đây (trên cùng trình duyệt).
- Lịch sử này là **localStorage**, không tự đồng bộ giữa thiết bị/trình duyệt và có thể bị xóa bởi người dùng; khi kho của một dạng câu nhỏ bị dùng hết, câu cũ có thể xuất hiện trở lại.
- Một số câu mới cùng kiểu cấu trúc nhưng mang tình huống/từ vựng khác; kiểm tra tự động không bảo đảm tất cả câu đều khác nhau về ý nghĩa hoặc chuẩn sư phạm. Cần kiểm định thủ công trước khi dùng chính thức.
- Một lượt vẫn gồm 200 câu, chấm đúng +10, tối đa 2.000 điểm. Không đổi thời gian làm bài và chính sách tài khoản.

## Cách cài

1. Sao lưu repository đang chạy.
2. Giải nén **bản cập nhật gọn**.
3. Chép **cả bốn file** theo đúng đường dẫn `thi-thu/cap-truong/lop-3/` và `thi-thu/cap-truong/lop-6/` vào GitHub repository, ghi đè file cũ.
4. Commit và Push bằng GitHub Desktop.
5. Sau khi GitHub Pages triển khai, nhấn Ctrl+F5 và thử một bài của từng lớp; kiểm tra câu/ngữ pháp/âm thanh, kết quả thi và quyền đăng nhập.

**Không cần chỉnh sửa Firestore Rules cho bản thay đổi này.**
