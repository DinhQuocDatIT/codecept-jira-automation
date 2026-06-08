Feature("Register Driver");

Scenario("Register success", ({ I }) => {
  I.amOnPage("http://localhost:3000/register");

  I.fillField('input[name="Ho_Ten"]', "Nguyen Van A");
  I.fillField('input[name="Email"]', "nguyenvana@test.com");
  I.fillField('input[name="Sdt"]', "0987654321");

  I.selectOption('select[name="Gioi_tinh"]', "Nam");

  I.fillField('input[name="Mat_Khau"]', "123456");
  I.fillField('input[name="Xac_Nhan_Mat_Khau"]', "123456");

  I.fillField('input[name="Ngay_sinh"]', "2000-01-01");

  I.fillField('input[name="Dia_Chi"]', "123 Đường ABC");

  I.fillField('input[name="Bang_Lai_Xe"]', "B2-123456");

  I.click('button[type="submit"]');

  // Chờ chuyển trang login
  I.waitForNavigation();

  // Kiểm tra URL sau khi đăng ký thành công
  I.seeInCurrentUrl("/login");
});
Scenario("Password less than 6 chars", ({ I }) => {
  I.amOnPage("http://localhost:3000/register");

  I.fillField('input[name="Mat_Khau"]', "123");
  I.fillField('input[name="Xac_Nhan_Mat_Khau"]', "123");

  I.click('button[type="submit"]');

  I.see("Mật khẩu phải có ít nhất 6 ký tự!");
});
Scenario("Password confirmation mismatch", ({ I }) => {
  I.amOnPage("http://localhost:3000/register");

  I.fillField('input[name="Mat_Khau"]', "123456");
  I.fillField('input[name="Xac_Nhan_Mat_Khau"]', "654321");

  I.click('button[type="submit"]');

  I.see("Mật khẩu và xác nhận mật khẩu không khớp!");
});
Scenario("Under 18 years old", ({ I }) => {
  I.amOnPage("http://localhost:3000/register");

  I.fillField('input[name="Ngay_sinh"]', "2012-01-01");

  I.click('button[type="submit"]');

  I.see("Bạn phải đủ 18 tuổi trở lên để đăng ký lái xe!");
});
