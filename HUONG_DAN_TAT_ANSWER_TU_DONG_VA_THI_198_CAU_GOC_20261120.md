# Cập nhật TAT — ANSWER tự động chuyển câu và bài thi 198 câu gốc lớp 6

## Thay đổi trên toàn bộ TAT

- Áp dụng cho **49 trang làm bài**: 12 lớp × 4 cấp ôn tập, và Thi thử Cấp trường lớp 6 (ngân hàng 6.000 câu).
- **Bỏ hai nút “Câu trước” và “Câu tiếp theo” dưới câu hỏi**, chỉ còn nút **ANSWER** vàng ở giữa.
- Khi nhấn **ANSWER**: hệ thống kiểm tra câu đã được trả lời đủ, **khóa đáp án** và **tự động chuyển đến câu chưa xác nhận tiếp theo**.
- Nếu còn câu bỏ trống ở phía trước, hệ thống quay lại câu bỏ trống sau khi hoàn thành các câu phía sau. Khi đã xác nhận tất cả, bài tự nộp và mở kết quả.
- Người học vẫn có thể dùng **thanh số câu ở phía trên** để đi tới câu bất kỳ, nhưng câu đã xác nhận chỉ đọc, không thể sửa.
- Nhấn **Nộp bài** trước khi làm hết chỉ tính những câu đã bấm ANSWER; dữ liệu nháp không tự động được xác nhận.

## Bài thi 198 ảnh câu hỏi gốc lớp 6

- Giữ nguyên 198 ảnh do người dùng cung cấp, hiển thị trực tiếp trong từng câu.
- Phân loại **198/198** câu theo ảnh: **97 câu chọn A–D, 12 câu TRUE/FALSE, 31 câu sắp xếp thẻ, 58 câu điền từ/câu**. Phân loại có thể điều chỉnh trong `mau-198-interactive.json` nếu ảnh không khớp.
- Với **31 câu sắp xếp**, các thẻ từ đã được nhập lại từ ảnh gốc, người học chỉ việc chạm để xếp, không cần tự gõ lại các thẻ. Vẫn có tùy chọn chỉnh thẻ và nhập trực tiếp khi cần.
- Câu chọn đáp án hiển thị nút A–D hoặc TRUE/FALSE. Câu điền có ô nhập trực tiếp. Có đồng hồ 30 phút, thanh chọn câu, nút nộp bài, kết quả và xem lại từng ảnh.
- Nút **ANSWER** là nút xác nhận duy nhất, khóa câu và tự chuyển đến câu kế tiếp; không còn nút chuyển câu dưới đề.
- Tài khoản, lượt miễn phí, Premium/Ultimate, quyền xem lại bài và 6.000 câu đã biên soạn được giữ nguyên.

## Giới hạn quan trọng về chấm điểm 198 câu gốc

**Bộ ảnh không có đáp án chuẩn đã xác minh và không kèm âm thanh gốc.** Dữ liệu mới chỉ phân loại hình thức câu hỏi và thẻ từ, **không phải đáp án**. Vì vậy, phần thi 198 câu cho phép làm trực tiếp, khóa đáp án, xem lại, tự đối chiếu và xuất JSON; **chưa thể tự chấm đúng/sai hoặc giải thích đầy đủ tất cả 198 câu**. Hệ thống giữ trạng thái **“chưa chấm”** cho câu chưa có đáp án xác minh, không tự tính sai.

Để bật tự chấm, quản trị viên cần bổ sung đáp án đã kiểm tra vào `thi-thu/thi-thu-cap-truong/lop-6/mau-198-answers.json`, như hướng dẫn ở `HUONG_DAN_NUT_ANSWER_VA_THI_198_CAU_GOC.md`. Các câu nghe cần tệp âm thanh gốc nếu muốn đánh giá đầy đủ.

## Cách triển khai

1. **Bản ZIP đầy đủ:** giải nén và thay toàn bộ mã website hiện tại, giữ nguyên cấu trúc thư mục.
2. **Bản ZIP cập nhật:** chỉ ghi đè các tệp trong ZIP lên repository hiện tại, không xóa các tệp khác.
3. Commit và Push lên GitHub Pages. Kiểm tra lớp 3 cấp trường, lớp 6 cấp trường và bài **Thi 198 câu gốc**.
4. Không cần sửa Firestore Rules. Không thay đổi dữ liệu ngân hàng câu hỏi.

## Kiểm thử trước khi đóng gói

- Kiểm tra cú pháp JavaScript của **49/49 trang** bằng Node.js.
- Kiểm tra cấu trúc nút ANSWER của **49/49 trang**.
- Kiểm thử giao diện bằng trình duyệt chạy độc lập: làm câu sắp xếp, điền từ, A–D, TRUE/FALSE trong 198 ảnh; khóa và tự chuyển câu; tự nộp khi hết câu; xem lại kết quả.
- Kiểm thử trang 6.000 câu: ANSWER khóa câu, chuyển sang câu chưa làm kế tiếp và quay lại câu bỏ trống.
- Chưa kiểm thử trực tiếp với tài khoản Firebase thật trên website đã xuất bản.
