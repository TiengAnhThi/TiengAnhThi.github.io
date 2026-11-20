# Cập nhật TAT — Nút ANSWER và bài thi 198 câu gốc lớp 6

## Các mục đã cập nhật

- **49 trang làm bài**: 12 lớp × 4 cấp ôn tập + Thi thử cấp trường lớp 6. Nút **ANSWER** vàng được đặt giữa “Câu trước” và “Câu tiếp theo” theo giao diện mẫu. Nút xác nhận và khóa câu trả lời hiện tại, không hiển thị đáp án đúng trong lúc thi. Nếu chưa điền đủ, hiện cảnh báo.
- Chuyển câu hoặc rời ô nhập chỉ lưu bản nháp, không tự khóa đáp án. Nhấn **ANSWER** để xác nhận. Khi nộp bài, câu đang làm nếu đã hoàn chỉnh vẫn được tính như cơ chế cũ.
- **Thi 198 câu gốc lớp 6 cấp trường**: trang mới `thi-thu/thi-thu-cap-truong/lop-6/thi-198-goc.html`. Hiển thị lần lượt toàn bộ 198 ảnh gốc; hỗ trợ chọn A–D, điền từ/câu, tự tạo thẻ sắp xếp từ; xác nhận bằng ANSWER, đồng hồ 30 phút, thanh chuyển câu, nộp bài, xem lại từng ảnh, đánh dấu tự đối chiếu và xuất câu trả lời JSON.
- Liên kết tới bài thi 198 câu gốc được thêm ở cổng lớp 6, trang chào mừng thi thử 6.000 câu và trang xem ảnh.
- **Giữ nguyên** dữ liệu ngân hàng câu hỏi cũ, 6.000 câu biên soạn, 198 ảnh gốc, các tính năng IPA và âm thanh đang có, Firebase/Auth/Premium/Ultimate.

## Giới hạn dữ liệu ảnh gốc

Bộ 198 ảnh được cung cấp **không kèm đáp án xác minh hoặc các tệp âm thanh gốc**. Hệ thống **không tự suy đoán** đáp án từ ảnh, và **không tính câu chưa chấm là câu sai**. Đề gốc có thể làm bài, lưu câu trả lời và xem lại, nhưng chỉ tự chấm những câu có đáp án đã được quản trị viên xác minh.

Quản trị viên bổ sung vào `thi-thu/thi-thu-cap-truong/lop-6/mau-198-answers.json`, ví dụ:

```json
{
  "version": 1,
  "verified": true,
  "answers": [
    {"number": 3, "answer": "B", "explanation": "Giải thích đã kiểm tra từ đề gốc."},
    {"number": 9, "answer": "Is your hobby meeting new friends?", "explanation": "Câu hỏi sắp xếp từ."}
  ]
}
```

Để hệ thống sử dụng các đáp án, đặt `"verified": true` sau khi quản trị viên đã đối chiếu các đáp án trong tệp (hoặc đặt `"verified": true` cho từng đáp án đã xác minh).

**Đây chỉ là ví dụ định dạng**, không phải đáp án đã xác minh cho câu 3 hoặc 9. Phải thay bằng đáp án đã đối chiếu trước khi đưa vào tệp thật. Đáp án nhập theo chữ cái A–D đối với trắc nghiệm, hoặc toàn bộ từ/câu với câu điền và sắp xếp. Khi có đủ 198 đáp án chuẩn, hệ thống mới có thể chấm trọn bộ và lưu điểm lên Firebase. Không có âm thanh gốc thì các câu nghe không thể kiểm chứng đầy đủ.

## Cách cập nhật

1. Giải nén ZIP bản đầy đủ vào thư mục website hiện tại, giữ nguyên cấu trúc đường dẫn `TiengAnhThi.github.io-main/`.
2. Commit/Push toàn bộ nội dung lên GitHub Pages (bao gồm các tệp `.webp`, `.css`, `.js`, `.json`).
3. Vào lớp 6 → Thi thử Cấp trường → **Thi 198 câu gốc**; các cấp/lớp khác mở một câu để kiểm tra nút ANSWER vàng.
4. Không cần thay đổi `firestore.rules` cho phần cập nhật này.

**Lưu ý:** 198 câu gốc dùng chung tài khoản và lượt thi với TAT; Ultimate không giới hạn thời gian làm bài, Premium/Ultimate không giới hạn thời gian xem lại. Tài khoản thường có 5 phút xem lại theo cơ chế hiện tại.
