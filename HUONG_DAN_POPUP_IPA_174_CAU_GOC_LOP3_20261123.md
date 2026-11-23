# TAT — Popup IPA trong bộ 174 câu gốc lớp 3 cấp trường

Ngày cập nhật: 23/11/2026

## Nội dung cập nhật

- Tích hợp popup IPA vào **6 câu phát âm** thuộc bộ 174 câu gốc lớp 3 (số ảnh mẫu 11, 13, 35, 59, 65, 102).
- Chữ cái cần so sánh trong từ mẫu và trong 4 lựa chọn A–D được gạch chân. Rê chuột hoặc chạm vào phần gạch chân để xem IPA, cách đọc gần đúng bằng tiếng Việt và hướng dẫn khẩu hình.
- Trong popup có nút nghe âm IPA (tệp MP3 đóng gói cùng ứng dụng) và nút nghe cả từ (giọng tiếng Anh của trình duyệt).
- Trên điện thoại: chạm chữ gạch chân lần đầu để mở popup; chạm lần thứ hai để chọn đáp án và chuyển câu. Chạm phần còn lại của nút đáp án vẫn chọn ngay như trước.
- Khi xem lại kết quả, hiển thị bảng đối chiếu 4 phương án, âm IPA và nút nghe từ.
- Tận dụng cơ chế popup và âm thanh IPA đã có trong TAT; không cần thay đổi Firebase Rules.

## Phạm vi và dữ liệu

- Chỉ thay đổi giao diện `thi-thu/thi-thu-cap-truong/lop-3/index.html`.
- **Không sửa** 174 câu gốc, 5.826 câu biên soạn, đáp án hoặc tổng ngân hàng 6.000 câu.
- Các câu khác và các lớp khác giữ nguyên.
- Sử dụng phiên âm Anh–Anh để nhất quán với các tệp MP3 IPA có sẵn. Cách đọc gần đúng tiếng Việt chỉ để hỗ trợ, không thay thế IPA.

## Cài đặt

**Bản đầy đủ:** giải nén ZIP, sao chép nội dung bên trong `TiengAnhThi.github.io-main` vào repository và commit/push.

**Bản cập nhật gọn:** chỉ chép đè file `thi-thu/thi-thu-cap-truong/lop-3/index.html` vào đúng vị trí trong repository hiện tại. Bản cập nhật gọn giả định repository đang sử dụng bản đầy đủ ngày 23/11/2026 và đã có thư mục âm thanh `thi-thu/cap-truong/lop-3/ipa-audio/`.

Sau khi triển khai, nhấn Ctrl+Shift+R (hoặc xóa cache trang) để tải giao diện mới.

## Kiểm thử đã thực hiện

- Kiểm tra cú pháp JavaScript.
- Kiểm tra bằng Chromium: cả 6 câu có 5 vùng gạch chân kích hoạt popup (1 từ mẫu + 4 đáp án); IPA hiển thị đúng; mỗi popup có nút nghe âm và nghe từ.
- Kiểm tra mô phỏng màn hình cảm ứng: chạm lần đầu chỉ mở popup, chạm lần hai mới khóa đáp án và chuyển câu.
- Kiểm tra bảng giải thích sau bài: âm của phương án đúng khớp âm của từ mẫu cho cả 6 câu.

Lưu ý: chưa kiểm thử triển khai trực tiếp trên GitHub Pages/Firebase của người dùng. Nút nghe cả từ phụ thuộc vào hỗ trợ giọng đọc tiếng Anh của trình duyệt/thiết bị.
