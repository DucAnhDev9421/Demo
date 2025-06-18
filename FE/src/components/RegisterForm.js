import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './LoginForm.css';

const RegisterForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    agreeToTerms: false
  });
  
  const [errors, setErrors] = useState({
    username: false,
    email: false,
    password: false,
    confirmPassword: false
  });
  
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Hàm kiểm tra ký tự Unicode
  const hasUnicodeCharacters = (str) => {
    return /[\u0080-\uFFFF]/.test(str);
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    // Xóa lỗi khi user bắt đầu nhập
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: false
      }));
    }
    
    if (message) {
      setMessage('');
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const validateForm = () => {
    const newErrors = {
      username: !formData.username.trim(),
      email: !formData.email.trim(),
      password: !formData.password.trim(),
      confirmPassword: !formData.confirmPassword.trim()
    };
    
    // Kiểm tra ký tự Unicode trong username
    if (formData.username.trim() && hasUnicodeCharacters(formData.username)) {
      newErrors.username = true;
      setErrors(newErrors);
      setMessage('Username không được dùng ký tự unicode');
      return false;
    }
    
    // Kiểm tra ký tự Unicode trong password
    if (formData.password.trim() && hasUnicodeCharacters(formData.password)) {
      newErrors.password = true;
      setErrors(newErrors);
      setMessage('Password không được dùng ký tự unicode');
      return false;
    }
    
    // Kiểm tra ký tự Unicode trong confirmPassword
    if (formData.confirmPassword.trim() && hasUnicodeCharacters(formData.confirmPassword)) {
      newErrors.confirmPassword = true;
      setErrors(newErrors);
      setMessage('Password không được dùng ký tự unicode');
      return false;
    }
    
    setErrors(newErrors);
    
    // Kiểm tra nếu có lỗi
    if (newErrors.username || newErrors.email || newErrors.password || newErrors.confirmPassword) {
      setMessage('Vui lòng điền đầy đủ thông tin');
      return false;
    }
    
    if (formData.password !== formData.confirmPassword) {
      setErrors(prev => ({
        ...prev,
        confirmPassword: true
      }));
      setMessage('Mật khẩu xác nhận không khớp');
      return false;
    }
    
    if (!formData.agreeToTerms) {
      setMessage('Vui lòng đồng ý với điều khoản sử dụng');
      return false;
    }
    
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validation
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    setMessage('');

    try {
      // Giả lập API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setMessage('Đăng ký thành công! Chuyển hướng về trang đăng nhập...');
      setTimeout(() => {
        navigate('/auth/login');
      }, 2000);
    } catch (error) {
      setMessage('Có lỗi xảy ra, vui lòng thử lại');
    } finally {
      setIsLoading(false);
    }
  };

  const handleBackToLogin = () => {
    navigate('/auth/login');
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-header">
          <h1>Đăng ký</h1>
          <p>Tạo tài khoản mới</p>
        </div>

        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label htmlFor="username">Tên đăng nhập</label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleInputChange}
              placeholder="Nhập tên đăng nhập"
              className={`form-input ${errors.username ? 'form-input-error' : ''}`}
              autoComplete="username"
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="Nhập email"
              className={`form-input ${errors.email ? 'form-input-error' : ''}`}
              autoComplete="email"
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Mật khẩu</label>
            <div className="password-input-container">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                placeholder="Nhập mật khẩu"
                className={`form-input ${errors.password ? 'form-input-error' : ''}`}
                autoComplete="new-password"
              />
              <button
                type="button"
                className="password-toggle-btn"
                onClick={togglePasswordVisibility}
                aria-label={showPassword ? "Ẩn mật khẩu" : "Hiện mật khẩu"}
              >
                {showPassword ? "🙈" : "👁️"}
              </button>
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="confirmPassword">Xác nhận mật khẩu</label>
            <div className="password-input-container">
              <input
                type={showConfirmPassword ? "text" : "password"}
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                placeholder="Nhập lại mật khẩu"
                className={`form-input ${errors.confirmPassword ? 'form-input-error' : ''}`}
                autoComplete="new-password"
              />
              <button
                type="button"
                className="password-toggle-btn"
                onClick={toggleConfirmPasswordVisibility}
                aria-label={showConfirmPassword ? "Ẩn mật khẩu" : "Hiện mật khẩu"}
              >
                {showConfirmPassword ? "🙈" : "👁️"}
              </button>
            </div>
          </div>

          <div 
            className={`message ${message ? 'message-visible' : ''}`}
            role="alert"
            aria-live="polite"
          >
            {message}
          </div>

          <div className="form-group checkbox-group">
            <label className="checkbox-label">
              <input
                type="checkbox"
                name="agreeToTerms"
                checked={formData.agreeToTerms}
                onChange={handleInputChange}
                className="checkbox-input"
              />
              <span className="checkmark"></span>
              Tôi đồng ý với điều khoản sử dụng
            </label>
          </div>

          <button 
            type="submit" 
            className="login-button"
            disabled={isLoading}
          >
            {isLoading ? 'Đang đăng ký...' : 'Đăng ký'}
          </button>
        </form>

        <div className="login-links">
          <button 
            type="button" 
            className="link-button"
            onClick={handleBackToLogin}
          >
            Đã có tài khoản? Đăng nhập
          </button>
        </div>
      </div>
    </div>
  );
};

export default RegisterForm; 