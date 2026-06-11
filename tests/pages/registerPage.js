module.exports = {
  url: "http://localhost:3000/register", // Đường dẫn tương đối

  // Các hàm thao tác
  fillRegisterForm(I, data) {
    I.amOnPage(this.url); // Tự động vào đúng trang
    I.fillField("Ho_Ten", data.hoTen || "Nguyen Van Test");
    I.fillField("Email", data.email || "test@example.com");
    I.fillField("Sdt", data.sdt || "0900000000");
    I.selectOption("Gioi_tinh", data.gioiTinh || "Nam");
    I.fillField("Mat_Khau", data.matKhau || "123456");
    I.fillField("Xac_Nhan_Mat_Khau", data.xacNhan || "123456");
    I.fillField("Ngay_sinh", data.ngaySinh || "1995-01-01");
    I.fillField("Dia_Chi", data.diaChi || "Ha Noi");
    I.fillField("Bang_Lai_Xe", data.bangLai || "B2-123456");
  },
};
