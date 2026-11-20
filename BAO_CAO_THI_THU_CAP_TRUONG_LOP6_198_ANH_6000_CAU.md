# BÁO CÁO CẬP NHẬT TAT – THI THỬ CẤP TRƯỜNG LỚP 6

Ngày: 20/11/2026

## Thay đổi
- Thêm mục Thi thử Cấp trường cho lớp 6 ở ngay dưới ô Ôn tập Cấp trường.
- 198 ảnh gốc được chuyển sang WebP chất lượng cao, đánh số 001–198, có trình xem và lưu câu trả lời cục bộ.
- 6.000 câu TAT biên soạn mới theo dạng trong ảnh, 18 dạng, có đáp án và giải thích.
- 200 câu/lượt, 30 phút, điểm tối đa 2.000, tránh lặp câu trong cùng lượt.
- Giữ nguyên Firebase/Auth/Premium/Ultimate và toàn bộ các ngân hàng cũ.

## Kết quả kiểm tra tự động
- 6.000/6.000 mã câu hỏi không trùng.
- 198/198 ảnh WebP mở và giải mã thành công.
- 10 lượt thi thử được mô phỏng: mỗi lượt có đúng 200 câu và 200 ID khác nhau.
- 18/18 dạng câu đã được thử dựng giao diện trong trình chạy JavaScript giả lập.
- 815 tệp gốc được đối chiếu: chỉ index.html thay đổi; 814 tệp còn lại giữ nguyên từng byte.
- Mã JavaScript của cổng, trang thi và trang ảnh mẫu đều vượt qua node --check.

## Phân bố 6.000 câu theo dạng
- fill: 1100
- choice: 1100
- order: 800
- question_start: 350
- reading: 350
- reading_tf: 280
- preposition_choice: 250
- find_error: 250
- incorrect_sentence: 200
- context_choice: 200
- listen: 180
- odd_one_out: 160
- sentence_choice: 160
- dialogue_choice: 150
- reply_choice: 150
- pronunciation: 120
- knowledge: 100
- inline_word: 100

## Phạm vi và lưu ý
- Các câu mới là câu TAT biên soạn theo cấu trúc/dạng bài của ảnh, KHÔNG phải bản chép nguyên văn 198 câu.
- 198 ảnh gốc thiếu đáp án chuẩn và một số câu nghe không có file âm thanh; phần ảnh hỗ trợ tự làm và lưu câu trả lời, không tự chấm.
- TTS trong phần 6.000 câu là tiếng đọc do trình duyệt tạo, không phải bản ghi âm gốc.
- Chưa kiểm thử đăng nhập Firebase thật hoặc kiểm thử trên website GitHub Pages sau khi triển khai; cần kiểm tra trên môi trường thực tế.
- Không cần cập nhật Firestore Rules nếu hệ thống đang dùng cùng quy tắc đã hoạt động.

## Triển khai
1. Sao lưu website GitHub hiện tại.
2. Dùng ZIP đầy đủ để thay toàn bộ nội dung hoặc ZIP cập nhật gọn để chỉ thay các tệp mới.
3. Git commit và push lên nhánh GitHub Pages.
4. Mở trang lớp 6, bấm Thi thử Cấp trường, kiểm tra trang 198 ảnh và thử một lượt với tài khoản hợp lệ.
