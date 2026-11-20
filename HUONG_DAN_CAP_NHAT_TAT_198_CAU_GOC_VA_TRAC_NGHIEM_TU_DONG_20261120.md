# TAT — Cập nhật trắc nghiệm tự động và chuyển 198 ảnh mẫu thành dữ liệu làm bài

## 1. Trắc nghiệm toàn hệ thống

- Đã cập nhật **49 trang làm bài**: 12 lớp × 4 cấp ôn tập và trang thi thử cấp trường lớp 6 (6.000 câu).
- Với **trắc nghiệm một lựa chọn** (A–D, Đúng/Sai, chọn hình, phát âm, đọc hiểu trắc nghiệm...), **không hiển thị nút ANSWER**. Chạm một lựa chọn sẽ khóa đáp án ngay và tự chuyển đến câu chưa trả lời tiếp theo.
- Với **điền từ, nhập câu, sắp xếp thẻ**: vẫn giữ nút **ANSWER** để người học kiểm tra phần nhập và xác nhận.
- Câu đã khóa không sửa được; thanh số câu ở phía trên vẫn cho phép xem lại câu đã làm. Khi xác nhận hết, bài tự nộp. Giữ nguyên ngân hàng câu hỏi cũ, đăng nhập và phân quyền Premium/Ultimate.

## 2. 198 ảnh mẫu lớp 6 cấp trường → câu hỏi TAT

- **198 câu ảnh gốc đã được rà soát.**
- **175 câu được nhập lại** thành dữ liệu TAT có đề bài văn bản, đáp án, lựa chọn tương tác và các hình minh họa được cắt riêng khi cần.
  - 89 câu trắc nghiệm A–D
  - 8 câu Đúng/Sai
  - 31 câu sắp xếp thẻ
  - 47 câu điền từ/cụm từ
- **23 câu tham khảo** (không yêu cầu làm, không tính điểm) vì thiếu tệp âm thanh gốc, đề không đủ rõ để xác minh, trùng lặp hoặc có đáp án lỗi.
- Học sinh vào mục **Làm 175 câu gốc**: làm trên giao diện TAT, **không phải xem ảnh chụp rồi trả lời**. Ảnh gốc chỉ có trong mục **Xem ảnh tham khảo** hoặc phần xem lại để đối chiếu.
- Các câu trắc nghiệm **tự khóa và chuyển ngay khi chạm**. Các câu điền từ/sắp xếp cần bấm ANSWER.
- Có đồng hồ 30 phút (Ultimate không giới hạn), chấm điểm theo đáp án TAT, lọc câu sai/đúng, xem lại toàn bộ đề và câu trả lời, xuất JSON, giới hạn xem kết quả theo quyền tài khoản hiện tại.
- Điểm tối đa **1.750** (175 câu × 10 điểm). 23 câu tham khảo không tính vào điểm.

**Quan trọng:** Đáp án được TAT đối chiếu và biên soạn từ ảnh do người dùng cung cấp, **không phải đáp án chính thức của cuộc thi**. Một số ảnh có lỗi ngữ pháp/chính tả được sửa có ghi chú. Những câu không đủ căn cứ để chấm đã đưa vào danh sách tham khảo.

### Tệp dữ liệu và giao diện

- `thi-thu/thi-thu-cap-truong/lop-6/mau-198-tat-data.json`: dữ liệu 198 câu, gồm 175 câu làm và 23 câu tham khảo.
- `thi-thu/thi-thu-cap-truong/lop-6/thi-198-goc.html`: giao diện mới.
- `thi-thu/thi-thu-cap-truong/lop-6/thi-198-goc.js`: xử lý làm bài, khóa đáp án, chuyển câu, chấm điểm và xem lại.
- `thi-thu/thi-thu-cap-truong/lop-6/thi-198-goc.css`: giao diện làm bài đồng nhất TAT.
- `thi-thu/thi-thu-cap-truong/lop-6/mau-198-hinh/`: 6 hình minh họa tách riêng khỏi ảnh chụp giao diện cũ.
- Các tệp ảnh gốc trong `mau-198/` vẫn được giữ **chỉ để tham khảo và đối chiếu**.

## 3. Triển khai

**ZIP đầy đủ:** Giải nén, thay thế các tệp website trong repository GitHub, commit và push.  
**ZIP cập nhật gọn:** Giải nén và chép đè các tệp mới/đã sửa lên repository đang chạy. Không xóa những tệp không có trong ZIP.

Sau khi GitHub Pages xuất bản, kiểm tra:

1. Lớp 6 → Thi thử Cấp trường → **Làm 175 câu gốc**; làm câu xếp thẻ đầu tiên, câu điền từ thứ hai, chọn A–D câu thứ ba. Câu thứ ba phải chuyển ngay, không có nút ANSWER.
2. Vào mục **23 câu tham khảo**, xác nhận không yêu cầu trả lời các câu thiếu âm thanh.
3. Mở một lớp/cấp ôn tập khác: trắc nghiệm phải khóa và chuyển khi chọn; điền từ và sắp xếp vẫn dùng ANSWER.
4. Đăng nhập Firebase bằng tài khoản thử nghiệm để kiểm tra lượt thi và quyền Premium/Ultimate.

Không thay đổi `firestore.rules`. **Chưa kiểm thử trực tiếp trên Firebase/GitHub Pages sau khi xuất bản**.
