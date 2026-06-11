
Feature('Driver Register');

const validData = {
    hoTen: 'Nguyen Van A',
    email: 'nguyenvana@gmail.com',
    sdt: '0987654321',
    gioiTinh: 'Nam',
    matKhau: '123456',
    ngaySinh: '2000-01-01',
    diaChi: 'TP HCM',
    bangLaiXe: 'B2-123456'
};

function fillValidRegisterForm(I) {
    I.fillField('input[name="Ho_Ten"]', validData.hoTen);
    I.fillField('input[name="Email"]', validData.email);
    I.fillField('input[name="Sdt"]', validData.sdt);

    I.selectOption(
        'select[name="Gioi_tinh"]',
        validData.gioiTinh
    );

    I.fillField(
        'input[name="Mat_Khau"]',
        validData.matKhau
    );

    I.fillField(
        'input[name="Xac_Nhan_Mat_Khau"]',
        validData.matKhau
    );

    I.fillField(
        'input[name="Ngay_sinh"]',
        validData.ngaySinh
    );

    I.fillField(
        'input[name="Dia_Chi"]',
        validData.diaChi
    );

    I.fillField(
        'input[name="Bang_Lai_Xe"]',
        validData.bangLaiXe
    );
}

Before(({ I }) => {
    I.amOnPage('/register');
});

/**
 * TC01
 * Đăng ký thành công
 */
Scenario('TC01 - Register Success', ({ I }) => {
    fillValidRegisterForm(I);

    I.click('Đăng ký tài xế');

    I.wait(3);

    // tùy hệ thống
    I.seeInCurrentUrl('/login');
});

/**
 * TC02
 * Password dưới 6 ký tự
 */
Scenario('TC02 - Password less than 6 chars', ({ I }) => {
    fillValidRegisterForm(I);

    I.clearField('input[name="Mat_Khau"]');
    I.clearField('input[name="Xac_Nhan_Mat_Khau"]');

    I.fillField('input[name="Mat_Khau"]', '12345');
    I.fillField('input[name="Xac_Nhan_Mat_Khau"]', '12345');

    I.click('Đăng ký tài xế');

    I.see('Mật khẩu phải có ít nhất 6 ký tự!');
});

/**
 * TC03
 * Password confirm không khớp
 */
Scenario('TC03 - Confirm password mismatch', ({ I }) => {
    fillValidRegisterForm(I);

    I.clearField('input[name="Xac_Nhan_Mat_Khau"]');

    I.fillField(
        'input[name="Xac_Nhan_Mat_Khau"]',
        '654321'
    );

    I.click('Đăng ký tài xế');

    I.see('Mật khẩu và xác nhận mật khẩu không khớp!');
});

/**
 * TC04
 * Chưa đủ 18 tuổi
 */
Scenario('TC04 - Under 18 years old', ({ I }) => {
    fillValidRegisterForm(I);

    I.clearField('input[name="Ngay_sinh"]');

    I.fillField(
        'input[name="Ngay_sinh"]',
        '2012-01-01'
    );

    I.click('Đăng ký tài xế');

    I.see(
        'Bạn phải đủ 18 tuổi trở lên để đăng ký lái xe!'
    );
});

/**
 * TC05
 * Không nhập họ tên
 */
Scenario('TC05 - Empty Full Name', ({ I }) => {
    fillValidRegisterForm(I);

    I.clearField('input[name="Ho_Ten"]');

    I.click('Đăng ký tài xế');

    I.seeElement(
        'input[name="Ho_Ten"]:invalid'
    );
});

/**
 * TC06
 * Không nhập Email
 */
Scenario('TC06 - Empty Email', ({ I }) => {
    fillValidRegisterForm(I);

    I.clearField('input[name="Email"]');

    I.click('Đăng ký tài xế');

    I.seeElement(
        'input[name="Email"]:invalid'
    );
});

/**
 * TC07
 * Email sai format
 */
Scenario('TC07 - Invalid Email Format', ({ I }) => {
    fillValidRegisterForm(I);

    I.clearField('input[name="Email"]');

    I.fillField(
        'input[name="Email"]',
        'abcxyz'
    );

    I.click('Đăng ký tài xế');

    I.seeElement(
        'input[name="Email"]:invalid'
    );
});

/**
 * TC08
 * Không nhập số điện thoại
 */
Scenario('TC08 - Empty Phone Number', ({ I }) => {
    fillValidRegisterForm(I);

    I.clearField('input[name="Sdt"]');

    I.click('Đăng ký tài xế');

    I.seeElement(
        'input[name="Sdt"]:invalid'
    );
});

/**
 * TC09
 * Không nhập bằng lái xe
 */
Scenario('TC09 - Empty Driver License', ({ I }) => {
    fillValidRegisterForm(I);

    I.clearField('input[name="Bang_Lai_Xe"]');

    I.click('Đăng ký tài xế');

    I.seeElement(
        'input[name="Bang_Lai_Xe"]:invalid'
    );
});

/**
 * TC10
 * Không nhập ngày sinh
 */
Scenario('TC10 - Empty Birth Date', ({ I }) => {
    fillValidRegisterForm(I);

    I.clearField('input[name="Ngay_sinh"]');

    I.click('Đăng ký tài xế');

    I.seeElement(
        'input[name="Ngay_sinh"]:invalid'
    );
});

/**
 * TC11
 * Họ tên chỉ chứa khoảng trắng
 * BUG HIỆN TẠI
 */
Scenario('TC11 - Full Name contains spaces only', ({ I }) => {
    fillValidRegisterForm(I);

    I.clearField('input[name="Ho_Ten"]');

    I.fillField(
        'input[name="Ho_Ten"]',
        '      '
    );

    I.click('Đăng ký tài xế');

    // expected sau khi dev fix
    I.see('Họ tên không được để trống');
});

/**
 * TC12
 * Phone chứa ký tự
 * BUG HIỆN TẠI
 */
Scenario('TC12 - Invalid Phone Number', ({ I }) => {
    fillValidRegisterForm(I);

    I.clearField('input[name="Sdt"]');

    I.fillField(
        'input[name="Sdt"]',
        'abc123xyz'
    );

    I.click('Đăng ký tài xế');

    I.see('Số điện thoại không hợp lệ!');
});

/**
 * TC13
 * Bằng lái sai format
 * BUG HIỆN TẠI
 */
Scenario('TC13 - Invalid Driver License Format', ({ I }) => {
    fillValidRegisterForm(I);

    I.clearField('input[name="Bang_Lai_Xe"]');

    I.fillField(
        'input[name="Bang_Lai_Xe"]',
        '$$$$@@@@'
    );

    I.click('Đăng ký tài xế');

    I.see('Bằng lái xe không hợp lệ');
});

/**
 * TC14
 * Kiểm tra trạng thái loading
 */
Scenario('TC14 - Loading State', ({ I }) => {
    fillValidRegisterForm(I);

    I.click('Đăng ký tài xế');

    I.see('Đang đăng ký...');
});

/**
 * TC15
 * Double click submit
 */
Scenario('TC15 - Double Submit', ({ I }) => {
    fillValidRegisterForm(I);

    I.doubleClick('Đăng ký tài xế');

    // Dev cần verify chỉ gửi 1 request
});

