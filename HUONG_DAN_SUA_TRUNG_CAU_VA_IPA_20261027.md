# TAT – Sửa trùng câu và chú giải phiên âm IPA

## Các thay đổi

- 47 lộ trình lớp/cấp cập nhật; không thay đổi bất kỳ file nào của lớp 3 cấp trường.
- Mỗi ngân hàng chứa 2.000 câu thuộc 35 dạng, đã loại trùng nội dung theo câu hỏi + ngữ cảnh + đáp án + hình/lời thoại.
- Đồng bộ dữ liệu JSON và ngân hàng câu hỏi nhúng trong index.html để GitHub Pages dùng bản mới ngay.
- Câu phát âm có chú giải trên từ mẫu và từng lựa chọn: IPA, cách đọc gần đúng bằng tiếng Việt, mẹo phát âm, phát âm mẫu/đọc từ. Trên điện thoại chạm lần một để xem, lần hai để chọn đáp án.
- Thuật toán chọn đề tránh lặp nội dung hiển thị trong một đề; vẫn lấy đủ 200 câu và 35 dạng.

## Kết quả kiểm tra tự động

- Kiểm tra 47 ngân hàng x 2.000 mục = 94.000 mục; 2.000 dấu vân tay nội dung riêng trên từng ngân hàng (chỉ so nội dung, không tính thứ tự A-D).
- Kiểm tra 64.484 câu có phương án chọn; không có 4 phương án bị trùng nguyên văn trong một câu.
- Kiểm tra JavaScript, dữ liệu nhúng và chỉ số đáp án trên 47 trang, không phát hiện lỗi.
- 12 lượt đề mô phỏng mỗi trang (564 lượt): đúng 200 câu, đủ 35 dạng; không phát hiện câu trùng theo khóa nội dung hiển thị.
- Không thay đổi 108 file trong thư mục thi-thu/cap-truong/lop-3/.

## Cập nhật GitHub

Bản **2-file-lop3-quocgia**: đưa `index.html` và `questions-grade3-2000.json` vào `thi-thu/cap-quoc-gia/lop-3/`.

Bản **cap-nhat-94-file**: giải nén, tải 94 file trong `thi-thu/...` lên repository tại đúng đường dẫn. Không tải nguyên ZIP lên GitHub Pages. Khi GitHub Web báo giới hạn file, sử dụng GitHub Desktop.

Bản **full**: giải nén, dùng nội dung trong `TiengAnhThi.github.io-main/` để đồng bộ bằng GitHub Desktop.

## Giới hạn

Kiểm thử trình duyệt thực qua địa chỉ website đã triển khai và xác thực Firebase thật chưa thực hiện. Bộ kiểm tra trùng dùng dấu vân tay cấu trúc và mẫu nội dung hiển thị, có thể vẫn còn câu tương đương về ý nghĩa mà cần giáo viên rà soát thủ công. Đây là câu hỏi tự biên soạn theo chủ đề chương trình, không phải đề IOE chính thức. Âm từ dựa vào TTS của trình duyệt; phát âm IPA mẫu dùng thư viện âm hiện có.
