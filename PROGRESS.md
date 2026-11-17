\# Tiến độ dự án: Hóa đơn điện tử từ SAP (ABAP + Node.js)



\## Tuần 1: Nền tảng (xong)

\- \[x] Kết nối Eclipse ADT với SAP BTP ABAP trial

\- \[x] Tạo package ZEINV, bảng ZEINV\_INVOICE, class ZCL\_EINV\_HELLO

\- \[x] Node.js: server giả lập nhà cung cấp hóa đơn (express, zod)

\- \[x] Kiểm tra: phát hành hóa đơn (201), gửi trùng (200), dữ liệu sai (400)

\- \[x] Đẩy code lên GitHub



\## Tuần 2: Dữ liệu billing và app Fiori (xong)

\- \[x] Bảng billing mock: ZEINV\_BILLING, ZEINV\_BILL\_ITEM

\- \[x] Dịch vụ RAP + app Fiori Elements cho billing (CDS, behavior managed, draft)

\- \[x] Dòng hàng là thực thể con (composition), hiển thị trong app

\- \[x] Node.js: tính tiền hàng, thuế, tổng theo VND + 3 test tự động

\- \[x] Node.js: API tra cứu hóa đơn theo billing (GET, 404 khi không có)

\- \[x] Đối chiếu dữ liệu SAP và JSON mẫu



\## Tuần 3 đến 10 (kế hoạch)

\- Tuần 3: class ABAP tạo JSON từ billing, ABAP Unit test

\- Tuần 4: ABAP gọi HTTP sang Node.js, deploy Node.js lên BTP

\- Tuần 5-6: job nền kiểm tra trạng thái, app theo dõi hóa đơn, validation chặn hủy

\- Tuần 7-8: hóa đơn điều chỉnh và thay thế

\- Tuần 9-10: tối ưu hiệu năng, tài liệu, video demo, sao lưu ABAP bằng abapGit



\## Ghi chú kỹ thuật

\- Phần ABAP nằm trong hệ thống BTP ABAP trial (package ZEINV), sẽ sao lưu bằng abapGit ở tuần 10.

\- Quy tắc làm tròn: tính theo từng dòng (làm tròn về đồng), tổng hóa đơn là tổng các dòng. Đây là lựa chọn thiết kế, cần đối chiếu quy định khi dùng thật.

\- Server Node.js lưu hóa đơn trong bộ nhớ (mất khi khởi động lại).

