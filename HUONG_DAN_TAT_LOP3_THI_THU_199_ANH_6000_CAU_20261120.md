# TAT lớp 3 — Thi thử cấp trường từ 199 ảnh mẫu

## Đã tích hợp
- Giữ nguyên bốn mục **Ôn tập** lớp 3 và dữ liệu lớp khác.
- Thêm thẻ **Thi thử Cấp trường** ngay bên dưới ô **Ôn tập Cấp trường** tại cổng chọn lớp 3.
- Ngân hàng **6.000 câu TAT mới** lớp 3 cấp trường, được biên soạn theo các dạng trong 199 ảnh: điền chữ/từ trực tiếp, trắc nghiệm, chọn tranh minh họa, xếp thẻ, Đúng/Sai đọc hiểu, tìm lỗi, phát âm, từ khác nhóm, kiến thức số/tháng, hội thoại, chọn câu đúng.
- Thi thử 200 câu/lượt, 30 phút; trắc nghiệm chọn là khóa và chuyển ngay; điền từ và xếp thẻ nhấn ANSWER. Giữ Firebase, giới hạn lượt, Premium/Ultimate và xem lại.
- **199 ảnh gốc** được lưu riêng để đối chiếu sau bài làm. **174 câu** đã nhập thành câu TAT làm trực tiếp (88 trắc nghiệm, 50 điền từ, 29 xếp thẻ, 7 Đúng/Sai); **25 câu tham khảo** không làm, không chấm vì thiếu âm thanh, mơ hồ, trùng lặp hoặc nội dung không xác minh được.
- Đã cắt 36 hình minh họa khỏi ảnh gốc cho các câu cần hình; không hiển thị nguyên ảnh chụp màn hình trong bài thi.

## Các trang
- `index.html#lop-3` (cổng chọn lớp 3)
- `thi-thu/thi-thu-cap-truong/lop-3/index.html` (thi thử 200 câu từ 6.000 câu)
- `thi-thu/thi-thu-cap-truong/lop-3/thi-199-goc.html` (làm 174 câu gốc tương tác)
- `thi-thu/thi-thu-cap-truong/lop-3/mau-199-tat-data.json` (dữ liệu 199 câu)
- `thi-thu/thi-thu-cap-truong/lop-3/questions-grade3-trial-6000.json` (ngân hàng 6.000 câu)
- `thi-thu/thi-thu-cap-truong/lop-3/mau-199-hinh/` (hình minh họa cắt riêng)
- `thi-thu/thi-thu-cap-truong/lop-3/mau-199/` (ảnh gốc để đối chiếu khi xem lại)

## Lưu ý
- Các câu và đáp án do TAT đối chiếu ảnh và biên soạn; không phải đề/đáp án chính thức.
- 6.000 câu là biến thể biên soạn mới theo dạng câu và trình độ lớp 3, không phải 6.000 câu được trích từ ảnh.
- Tài khoản Firebase và phân quyền cần kiểm thử trên môi trường triển khai thực tế.
- Giải nén ZIP đầy đủ và đưa toàn bộ nội dung bên trong thư mục `TiengAnhThi.github.io-main/` lên repository GitHub Pages. Không cần đổi Firestore Rules.

## Kiểm tra trước khi bàn giao
- 199/199 tệp ảnh gốc tồn tại; 174 câu tương tác và 25 câu tham khảo có mã riêng.
- Ngân hàng 6.000 câu có ID duy nhất, không có đề trùng hệt; mô phỏng 10 lượt chọn đủ 200 câu với 14 dạng, không lặp nội dung hiển thị trong lượt.
- Đã kiểm tra cú pháp JavaScript. **Chưa kiểm thử trực tiếp trên GitHub Pages hoặc Firebase**; trình duyệt kiểm thử tại môi trường này bị chặn điều hướng cục bộ.
- Đáp án câu gốc được đọc và biên soạn từ ảnh, cần giáo viên rà soát trước khi dùng làm điểm chính thức.
