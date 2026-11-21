# Nâng cấp ngân hàng 2.000 câu – Lớp 3, cấp trường

Bộ đề có đúng 2.000 câu hỏi, với 10 dạng × 200 câu/dạng. Giữ lại 1.000 câu từ 5 dạng cũ và thay 1.000 câu còn lại bằng 5 dạng mới. Tất cả câu được tích hợp trực tiếp trong `index.html` để chạy ổn định trên GitHub Pages; `questions-grade3-2000.json` là bản dữ liệu tương ứng.

## 5 dạng mới theo ảnh mẫu

- `unscramble`: sắp chữ cái, điền **chỉ phần chữ thiếu** vào từ.
- `sentence_choice`: chọn câu tiếng Anh hoàn chỉnh đúng ngữ pháp trong A–D.
- `picture4`: chọn một trong 4 ô hình A–D, có nút 🔎 phóng to từng hình; hình emoji minh họa hoạt động ngoại tuyến, không cần ảnh bên ngoài.
- `find_error`: chọn từ/cụm từ sai được gạch chân trong câu.
- `pronunciation`: tìm từ có phần gạch chân phát âm khác, giải thích âm.

## 5 dạng cũ vẫn có

`choice`, `fill`, `listen`, `order`, `picture`.

## Luồng bài thi

Mỗi lần bắt đầu thi sẽ lấy **20 câu từ mỗi dạng**, xáo trộn tạo thành bài thi 200 câu trong 30 phút. Cơ chế đăng nhập, điều kiện lượt thi, lưu kết quả Firebase và các cấp/lớp khác không thay đổi. Bấm *Câu tiếp theo* để lưu/chốt đáp án. Sau khi nộp bài có giải thích và đáp án.

Tập tin phải cập nhật lên GitHub Pages là **toàn bộ nội dung** của ZIP. Mở `thi-thu/cap-truong/lop-3/index.html` để kiểm tra riêng cấp trường.

**Lưu ý:** Hình minh họa ở dạng emoji màu thay vì ảnh vẽ/ảnh chụp như video. Đặc điểm này giúp trang hoạt động ngoại tuyến, dung lượng nhỏ và không bị lỗi liên kết ảnh. Hiển thị emoji có thể hơi khác nhau giữa Windows, Android, iPhone.
