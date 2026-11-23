# TAT lớp 6 cấp trường — Đồng bộ 175 câu gốc và popup IPA

Cập nhật: 23/11/2026.

## Nội dung

- **Không còn một trình làm bài gốc độc lập.** Trang `thi-thu/thi-thu-cap-truong/lop-6/index.html` có hai chế độ trong cùng một hệ thống TAT:
  - **Thi thử 200 câu:** chọn từ ngân hàng 6.000 câu, trong đó có 175 câu gốc.
  - **Làm đủ 175 câu gốc:** làm tuần tự 175 câu nhập từ 198 ảnh mẫu, dùng chung giao diện, đăng nhập Firebase, quyền Premium/Ultimate, đồng hồ, khóa đáp án, chấm điểm, xem lại và giải thích.
- Ngân hàng **giữ đúng 6.000 câu**: 175 câu gốc + 5.825 câu biên soạn; tệp JSON ngân hàng và dữ liệu nhúng trong trang đã được đồng bộ.
- **23 câu tham khảo** (thiếu dữ kiện, câu lỗi hoặc trùng) được liệt kê trên màn hình bắt đầu, không yêu cầu làm, không tính điểm.
- 175 câu gốc gồm **83 câu trắc nghiệm thường, 6 câu trắc nghiệm có đoạn đọc, 8 câu đúng/sai, 47 câu điền, 31 câu xếp thẻ**. Các câu có hình minh họa dùng ảnh đã tách riêng, không bắt học sinh làm trên ảnh chụp giao diện cũ.
- Trắc nghiệm/đúng-sai: chạm một phương án sẽ khóa và tự chuyển câu. Điền từ/xếp thẻ: bấm **ANSWER** để xác nhận và chuyển câu.
- Khi xem lại bài: hiện đề gốc dưới dạng văn bản, lựa chọn/thẻ từ, lời giải phân tích theo cùng mô-đun của lớp 3, và ảnh mẫu gốc để đối chiếu **chỉ sau khi làm bài**.
- Đường dẫn cũ `thi-198-goc.html` nay chuyển hướng về `index.html?mode=original` thay vì mở một bài thi riêng.

## Popup IPA cho câu gốc lớp 6

- Đã bổ sung vào **8 câu phát âm/trọng âm gốc**: ảnh mẫu **5, 6, 7, 37, 47, 81, 83, 94**.
- Chữ gạch chân (hoặc cả từ đối với câu trọng âm) có popup khi rê chuột hoặc chạm, gồm IPA cả từ, hướng dẫn đọc, vị trí trọng âm khi phù hợp, nút nghe âm (nếu có âm đơn), và nút nghe từ.
- Trên điện thoại: chạm lần đầu vào chữ gạch chân để xem popup, chạm lần hai vào cùng vị trí để chọn và khóa đáp án.
- **Chữ h trong `hour` là âm câm**; popup không phát nhầm âm /h/. Trường hợp `buy` giải thích chữ `u` không có âm riêng trong tổ hợp `uy` /aɪ/.
- Đã đóng gói **32 tệp WAV** phát âm từ dự phòng, giúp các từ trong 8 câu vẫn có âm thanh khi trình duyệt không có giọng TTS tiếng Anh. IPA âm đơn dùng MP3 đã có trong bộ website.

## Các tệp cần thay đổi

- `index.html` (cổng chọn lớp)
- `thi-thu/thi-thu-cap-truong/lop-6/index.html` (ngân hàng 6.000 câu nhúng và giao diện thống nhất)
- `thi-thu/thi-thu-cap-truong/lop-6/questions-grade6-trial-6000.json` (ngân hàng JSON thống nhất)
- `thi-thu/thi-thu-cap-truong/lop-6/question-bank-audit.json` (thống kê)
- `thi-thu/thi-thu-cap-truong/lop-6/thi-198-goc.html` (chuyển hướng)
- `thi-thu/thi-thu-cap-truong/lop-6/ipa-words/*.wav` (32 từ phát âm dự phòng)

Không cần sửa `firestore.rules`, Firebase Auth, Firebase Admin, hay dữ liệu lớp 3. Các lớp và cấp khác giữ nguyên.

## Cài đặt GitHub Pages

**Bản đầy đủ:** giải nén, chép **nội dung bên trong** `TiengAnhThi.github.io-main/` vào repository tương ứng, commit và push.

**Bản cập nhật gọn:** giải nén và chép đè **đúng các đường dẫn** trong ZIP lên repository hiện đang chạy bản TAT ngày 23/11/2026; không xóa những file khác.

Sau khi xuất bản, nhấn `Ctrl+Shift+R` để tải lại. Vào **Lớp 6 → Thi thử Cấp trường**, chọn **Làm đủ 175 câu gốc**; thử câu #1 (xếp thẻ), #2 (điền), #3 (trắc nghiệm), #5 (popup IPA), #7 (trọng âm), #80 (hình minh họa), và kiểm tra phần lời giải.

## Kiểm thử và lưu ý

- Kiểm tra cú pháp JavaScript bằng Node.js: đạt.
- Kiểm thử Chromium mô phỏng tài khoản: làm đúng cả **175/175 câu**; 10 lượt chọn 200 câu có **200 mã câu khác nhau** mỗi lượt; kiểm tra popup 8 câu, thao tác chạm hai lần trên điện thoại, chấm điểm 1.750 tối đa, lời giải và điều hướng 175 câu: đạt.
- Kiểm tra 32 WAV có header và thời lượng hợp lệ; kiểm tra đường dẫn 6 hình minh họa và 175 ảnh nguồn: đạt.
- **Chưa kiểm thử đăng nhập Firebase thật, phát âm thanh trên thiết bị thực tế hoặc GitHub Pages sau khi triển khai.** Âm đọc bằng giọng máy dự phòng có thể khác giọng tự nhiên.
- Đáp án gốc được TAT biên soạn/đối chiếu từ ảnh người dùng cung cấp, **không phải đáp án thi chính thức**. Nên rà soát lại nếu dùng để đánh giá học sinh.
