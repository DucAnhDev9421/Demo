# Ứng dụng Đăng nhập React

Đây là một ứng dụng React demo cho chức năng đăng nhập với giao diện hiện đại và responsive, bao gồm routing giữa các trang.

## Tính năng

- ✅ Form đăng nhập với username và password
- ✅ Label ẩn hiển thị thông báo lỗi/thành công
- ✅ Checkbox "Nhớ tài khoản"
- ✅ Button đăng nhập với loading state
- ✅ Routing giữa các trang
- ✅ Trang đăng ký tài khoản
- ✅ Trang quên mật khẩu
- ✅ Giao diện responsive và hiện đại
- ✅ Validation form
- ✅ Animation và hiệu ứng đẹp mắt

## Routing

Ứng dụng sử dụng React Router với các route sau:

- `/auth/login` - Trang đăng nhập (mặc định)
- `/auth/register` - Trang đăng ký
- `/auth/forgotpassword` - Trang quên mật khẩu
- `/` - Redirect về `/auth/login`

## Cài đặt

1. Cài đặt dependencies:
```bash
npm install
```

2. Chạy ứng dụng:
```bash
npm start
```

Ứng dụng sẽ chạy tại `http://localhost:3000`

## Demo

Để test đăng nhập, sử dụng:
- **Username:** `admin`
- **Password:** `password`

## Cấu trúc dự án

```
src/
├── components/
│   ├── LoginForm.js           # Component form đăng nhập
│   ├── RegisterForm.js        # Component form đăng ký
│   ├── ForgotPasswordForm.js  # Component form quên mật khẩu
│   └── LoginForm.css          # Styles cho tất cả forms
├── App.js                     # Component App chính với routing
├── App.css                    # Styles cho App
├── index.js                   # Entry point
└── index.css                  # Global styles
```

## Tính năng từng trang

### Trang Đăng nhập (`/auth/login`)
- Form đăng nhập với username/password
- Checkbox "Nhớ tài khoản"
- Link đến trang đăng ký và quên mật khẩu
- Validation và loading state

### Trang Đăng ký (`/auth/register`)
- Form đăng ký với username, email, password
- Xác nhận mật khẩu
- Checkbox đồng ý điều khoản
- Tự động chuyển về trang đăng nhập sau khi đăng ký thành công

### Trang Quên mật khẩu (`/auth/forgotpassword`)
- Form nhập email
- Validation email
- Hiển thị thông báo thành công
- Tùy chọn gửi lại email

## Tùy chỉnh

Bạn có thể dễ dàng tùy chỉnh:
- Thay đổi màu sắc trong file CSS
- Thêm validation rules
- Kết nối với API backend thực tế
- Thêm các tính năng bảo mật khác
- Tùy chỉnh routing

## Công nghệ sử dụng

- React 18
- React Router DOM
- CSS3 với animations
- Modern JavaScript (ES6+)
- Responsive design 