# TAT IOE — Lớp 6 cấp trường — Bản cập nhật ngân hàng câu hỏi

Nguồn đối chiếu mức độ: 162 ảnh trong `ioe lop 6 cap truong.zip` và hồ sơ phân loại 162 ảnh đã lập trước đó. Ảnh được dùng làm chuẩn về dạng bài và độ khó; câu hỏi trong bản cập nhật là nội dung **tự biên soạn**, không phải bản sao lời giải IOE chính thức.

## Phạm vi
- Thay thế riêng `thi-thu/cap-truong/lop-6/questions-grade6-2000.json`.
- Đồng bộ cùng bộ dữ liệu nhúng trong `thi-thu/cap-truong/lop-6/index.html`.
- Đổi quota chọn đề 200 câu để tăng trọng số cho ngữ pháp, sắp xếp, đọc hiểu và giảm dạng hình quá đơn giản; vẫn đủ 35 dạng.
- Thêm 12 file PNG nội bộ trong `assets/tat-visuals` cho những emoji mới có mặt trong dữ liệu, để tránh hình trống.
- Các file của các lớp/cấp khác, Firebase, Premium, Ultimate và âm thanh có sẵn không thay đổi.

## Cấu trúc
- 2.000 mục câu hỏi, 35 dạng.
- Ngân hàng được kiểm tra tự động: đủ schema, chỉ số đáp án trong phạm vi, phương án không trùng nguyên văn, các câu điền chữ có số chữ cái đúng; các hình đều có asset nội bộ.
- 200 câu/lượt theo quota bên dưới.

## Lưu ý về chất lượng
- Dạng nghe sử dụng lời nghe **mới** được tạo riêng cho câu hỏi, trình duyệt đọc bằng giọng TTS (không phải audio gốc của các ảnh).
- Kiểm thử tự động không thể khẳng định 2.000 mục đều khác nhau về ý nghĩa hoặc đã được giáo viên thẩm định từng câu. Một số mẫu vẫn dùng lại quy tắc ngữ pháp/từ vựng với nội dung khác nhau.
- Nên kiểm tra sư phạm thủ công, nhất là ngữ âm, hội thoại và hình minh họa trước khi đưa lên website chính thức.

## Phân bố 200 câu/lượt
- `choice`: 9
- `fill`: 12
- `listen`: 6
- `order`: 12
- `picture`: 2
- `unscramble`: 3
- `sentence_choice`: 9
- `picture4`: 2
- `find_error`: 9
- `pronunciation`: 6
- `inline_word`: 7
- `knowledge`: 6
- `listen_pair`: 5
- `reading`: 9
- `incorrect_sentence`: 7
- `picture_false`: 2
- `context_choice`: 7
- `picture_inline`: 2
- `cartoon_fill`: 2
- `command_picture`: 2
- `phrase_gap`: 8
- `letter_choice`: 4
- `dialogue_choice`: 7
- `listen_not`: 5
- `reading_tf`: 9
- `number_picture`: 2
- `animal_spelling`: 2
- `question_start`: 8
- `reply_choice`: 7
- `sound_match`: 5
- `odd_one_out`: 5
- `preposition_choice`: 7
- `age_picture_gap`: 2
- `context_spelling`: 7
- `scene_truefalse`: 3

## Hướng dẫn cập nhật
Giải nén ZIP cập nhật và sao chép đúng đường dẫn các file vào repository `tienganhthi.github.io` (bao gồm thư mục `assets/tat-visuals`). GitHub Desktop: Commit → Push. Sau khi GitHub Pages cập nhật, Ctrl+F5 và thử lớp 6 cấp trường. Không cập nhật Firestore Rules cho lần sửa này.
