# Báo cáo chỉnh dữ liệu IOE – 26/10/2026
**Phạm vi:** 47 trang thi được cập nhật. Lớp 3 cấp trường không sửa bất kỳ file nào. Mỗi trang có 2.000 câu, 35 dạng.
**Mục tiêu:** Loại bỏ nhãn rác `[Practice set ...]`, loại chú thích chủ đề không liên quan trong câu, thay các mẫu điền từ mang tính máy móc và chỉnh một nhóm câu ngữ pháp theo lớp học.
**Nguồn tham khảo định dạng (không sao chép câu hỏi):**
- IOE lớp 3: https://www.youtube.com/playlist?list=PLE_1Ir-UuSKPErUxB9aqKhP4WMml0jWcu
- IOE lớp 6: https://www.youtube.com/playlist?list=PLE_1Ir-UuSKPFlg78-trKtCx-Mz6NLl6N
- IOE lớp 9: https://www.youtube.com/playlist?list=PLE_1Ir-UuSKPWeJq-fONgyknDzAetg-OL
**Giới hạn:** Không thu thập được bản chép nội dung từng câu từ video YouTube; phần lớn câu trong phiên bản này vẫn là bài tập tự biên soạn hoặc kế thừa bản trước. Bộ đề chưa được giáo viên xác minh từng câu, đặc biệt về độ khó và tính tự nhiên; không tuyên bố đây là đề IOE chính thức.
**Số chuỗi có nhãn dư đã loại:** 6,819 (trong dữ liệu JSON, bản HTML được đồng bộ).
### Ví dụ trước / sau
- Cũ: `Look at the cartoon picture and complete the word. [Practice set 30: Our Tet holiday]`
- Mới: `Look at the cartoon picture and complete the word.`
- Cũ: `Emma discusses food and writes b___na in a vocabulary notebook.`
- Mới (lớp 6): `We should protect the envi____ent.` và các ngữ cảnh theo lớp.
### Phân tầng nội dung
- **Lớp 1:** red, blue, green, pencil, book, cat.
- **Lớp 2:** breakfast, garden, rabbit, birthday, library, weather.
- **Lớp 3:** favourite, classroom, hobby, mother, computer, music.
- **Lớp 4:** timetable, favourite, exercise, village, weekend, museum.
- **Lớp 5:** direction, healthy, accident, stadium, temperature, countryside.
- **Lớp 6:** neighbourhood, apartment, furniture, festival, pollution, environment.
- **Lớp 7:** voluntary, charity, traffic, musician, performance, portrait.
- **Lớp 8:** disaster, earthquake, communication, technology, privacy, fascinating.
- **Lớp 9:** pressure, tourism, heritage, globalisation, generation, efficient.
- **Lớp 10:** equality, invention, ecosystem, diversity, volunteer, influence.
- **Lớp 11:** urbanisation, sustainability, biodiversity, initiative, collaboration, innovation.
- **Lớp 12:** urbanisation, globalisation, automation, sustainability, biodiversity, integrity.

### Kiểm thử tự động
- 47/47 ngân hàng có 2.000 câu và 35 dạng.
- Kiểm tra đáp án nằm trong lựa chọn, không có lựa chọn giống hệt nhau trong cùng câu và độ dài chữ cần điền khớp dữ liệu.
- Dữ liệu JSON và bản nhúng HTML được đồng bộ.
- Sử dụng lại âm thanh IPA hiện tại, không phát sinh hàng trăm MP3 mới.

### Hướng dẫn cập nhật
Giải nén bản cập nhật, chép các file vào đúng đường dẫn website và ghi đè 47 file `index.html` cùng 47 JSON tương ứng. Nếu GitHub Web giới hạn dưới 100 file, bản cập nhật có 95 file (94 file dữ liệu và trang + một README) và vẫn cần giữ nguyên cấu trúc thư mục. Nên sử dụng GitHub Desktop để thay đổi an toàn.
