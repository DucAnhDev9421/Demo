import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './LoginForm.css';

const LoginForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    rememberMe: false
  });
  
  const [errors, setErrors] = useState({
    username: false,
    password: false
  });
  
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

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
    
    // Xóa thông báo lỗi khi user bắt đầu nhập
    if (message) {
      setMessage('');
    }
  };

  const validateForm = () => {
    const newErrors = {
      username: !formData.username.trim(),
      password: !formData.password.trim()
    };
    
    setErrors(newErrors);
    
    // Kiểm tra nếu có lỗi
    if (newErrors.username || newErrors.password) {
      setMessage('Điền đầy đủ username và password');
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
      
      // Demo login logic - bạn có thể thay thế bằng API call thực tế
      if (formData.username === 'admin' && formData.password === 'password') {
        setMessage('Đăng nhập thành công!');
        // Lưu thông tin đăng nhập nếu checkbox được chọn
        if (formData.rememberMe) {
          localStorage.setItem('rememberedUser', formData.username);
        } else {
          localStorage.removeItem('rememberedUser');
        }
      } else {
        setMessage('Tên đăng nhập hoặc mật khẩu không đúng');
      }
    } catch (error) {
      setMessage('Có lỗi xảy ra, vui lòng thử lại');
    } finally {
      setIsLoading(false);
    }
  };

  const handleForgotPassword = () => {
    navigate('/auth/forgotpassword');
  };

  const handleRegister = () => {
    navigate('/auth/register');
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-header">
          <h1>Đăng nhập</h1>
          <p>Vui lòng nhập thông tin đăng nhập của bạn</p>
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
            <label htmlFor="password">Mật khẩu</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              placeholder="Nhập mật khẩu"
              className={`form-input ${errors.password ? 'form-input-error' : ''}`}
              autoComplete="current-password"
            />
          </div>

          {/* Label ẩn cho thông báo */}
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
                name="rememberMe"
                checked={formData.rememberMe}
                onChange={handleInputChange}
                className="checkbox-input"
              />
              <span className="checkmark"></span>
              Nhớ tài khoản
            </label>
          </div>

          <button 
            type="submit" 
            className="login-button"
            disabled={isLoading}
          >
            {isLoading ? 'Đang đăng nhập...' : 'Đăng nhập'}
          </button>
        </form>

        <div className="login-links">
          <button 
            type="button" 
            className="link-button"
            onClick={handleRegister}
          >
            Đăng ký
          </button>
          <span className="separator">|</span>
          <button 
            type="button" 
            className="link-button"
            onClick={handleForgotPassword}
          >
            Quên mật khẩu
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginForm; 