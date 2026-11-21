# Cập nhật lời giải câu sai theo giao diện ôn tập TAT — 22/11/2026

## Phạm vi

- **Lớp 6 / Thi 198 câu gốc**: 175 câu làm bài, 23 câu tham khảo, giữ nguyên câu hỏi và đáp án.
- **Lớp 3 / Thi 199 câu gốc**: 174 câu làm bài, 25 câu tham khảo, giữ nguyên câu hỏi và đáp án.
- Các mục ôn tập, ngân hàng 6.000 câu, đăng nhập Firebase, số lượt, thời gian, Ultimate/Premium không thay đổi.

## Khi xem kết quả

- Mặc định hiển thị **Câu sai** nếu có câu sai, có nút **Câu sai** / **Câu đúng**, vẫn giữ bộ lọc Tất cả và Chưa trả lời.
- Hiển thị **đề bài đầy đủ**, 4 lựa chọn hoặc các thẻ sắp xếp; đoạn văn/hình minh họa và ảnh gốc vẫn xem được.
- Tô màu đáp án đã chọn sai và đáp án đúng.
- Giải thích bằng tiếng Việt theo cấu trúc phần ôn tập: ghi chú của câu mẫu (nếu có), quy tắc ngữ pháp/từ vựng/phát âm, phân tích câu sắp xếp, cách sửa lỗi, đối chiếu với đoạn đọc.
- Dùng chung hàm phân tích câu sắp xếp từ trang ôn tập, không thay đổi dữ liệu đáp án.
- Không tự tạo lời giải dựa trên âm thanh gốc bị thiếu; các câu tham khảo vẫn không chấm.

## Tệp đã thay đổi

- `thi-thu/thi-thu-cap-truong/tat-review-explanations.js` (mới, dùng chung)
- `thi-thu/thi-thu-cap-truong/lop-6/thi-198-goc.html`, `.js`, `.css`
- `thi-thu/thi-thu-cap-truong/lop-3/thi-199-goc.html`, `.js`, `.css`

## Triển khai

Giải nén ZIP và chép **nội dung** thư mục `TiengAnhThi.github.io-main` lên repository hiện tại, rồi Commit/Push. Giữ nguyên đường dẫn `tat-review-explanations.js` (nằm ở thư mục cấp trường chung), nếu thiếu file này phần giải thích sẽ chỉ hiện thông báo ngắn.

**Lưu ý:** Đáp án TAT từ ảnh người dùng cung cấp, không phải đáp án chính thức. Những giải thích suy luận theo cấu trúc được thiết kế để hỗ trợ học tập, giáo viên cần kiểm tra lại những câu có dữ liệu ảnh/âm thanh thiếu.
