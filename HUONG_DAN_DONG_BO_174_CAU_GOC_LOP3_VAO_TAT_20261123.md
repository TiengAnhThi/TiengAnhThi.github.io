# Đồng bộ 174 câu gốc lớp 3 vào TAT — 23/11/2026

- Cổng chọn lớp 3 không còn thẻ / khung “Làm 174 câu gốc” tách riêng. Chỉ còn thẻ **Thi thử Cấp trường**.
- Trong cùng một giao diện TAT cấp trường lớp 3, chọn nguồn đề trước khi nhấn **Bắt đầu**:
  1. **Thi thử 200 câu**: rút từ ngân hàng 6.000 câu, trong đó có 174 câu gốc đã nhập.
  2. **Làm đủ 174 câu gốc**: hiển thị lần lượt 174 câu trong cùng trình làm bài TAT (không mở trang khác).
- Ngân hàng vẫn **đúng 6.000 câu**: 174 câu gốc thay thế 174 câu biên soạn tương ứng (88 trắc nghiệm, 50 điền từ, 29 xếp thẻ, 7 đúng/sai), còn 5.826 câu TAT biên soạn.
- Câu trắc nghiệm và đúng/sai tự khóa và chuyển khi chọn; câu điền và sắp xếp xác nhận bằng **ANSWER**. Có đồng hồ, điểm, điều hướng, chấm bài, lời giải chi tiết, hình minh họa và xem lại ảnh gốc sau bài.
- 25 ảnh không đủ dữ kiện được liệt kê trong mục **Câu tham khảo**, không tính điểm và không làm bài.
- Dùng chung Firebase, Premium, Ultimate và lượt làm bài TAT; không sửa Firestore Rules.
- Đường dẫn cũ `thi-199-goc.html` chuyển hướng về `index.html?mode=original` (không còn trang làm bài độc lập).
- Đáp án câu gốc được đối chiếu từ ảnh, không phải đáp án chính thức. Cần giáo viên rà soát khi dùng cho đánh giá.
- Giữ nguyên các lớp và cấp khác; chỉ cập nhật cổng chọn lớp 3 và trang thi thử cấp trường lớp 3.

## Ghi chú kiểm tra dữ liệu
- Câu gốc #76: dữ liệu thẻ ban đầu có dấu chấm ở “photos.” nhưng đáp án kết thúc bằng “maps.”. Bản TAT chỉ chuẩn hóa dấu chấm trong thẻ để câu có thể xếp đúng; giữ ảnh và dữ liệu gốc để đối chiếu.
- Đã kiểm tra toàn bộ 174 câu hiển thị được trong TAT, đủ 36 hình minh họa; thử 8 lượt đề 200 câu, không trùng mã trong mỗi lượt.
- Kiểm thử trình duyệt sử dụng mô phỏng trạng thái tài khoản; **chưa kiểm thử đăng nhập Firebase thật hoặc GitHub Pages trực tuyến**.
