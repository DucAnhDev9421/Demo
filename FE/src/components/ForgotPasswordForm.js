import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './LoginForm.css';

const ForgotPasswordForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: ''
  });
  
  const [errors, setErrors] = useState({
    email: false
  });
  
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
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

  const validateForm = () => {
    const newErrors = {
      email: !formData.email.trim()
    };
    
    setErrors(newErrors);
    
    // Kiểm tra nếu có lỗi
    if (newErrors.email) {
      setMessage('Vui lòng nhập email');
      return false;
    }
    
    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setErrors(prev => ({
        ...prev,
        email: true
      }));
      setMessage('Vui lòng nhập email hợp lệ');
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
      
      setIsSubmitted(true);
      setMessage('Email đặt lại mật khẩu đã được gửi! Vui lòng kiểm tra hộp thư của bạn.');
    } catch (error) {
      setMessage('Có lỗi xảy ra, vui lòng thử lại');
    } finally {
      setIsLoading(false);
    }
  };

  const handleBackToLogin = () => {
    navigate('/auth/login');
  };

  const handleResendEmail = () => {
    setIsSubmitted(false);
    setMessage('');
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-header">
          <h1>Quên mật khẩu</h1>
          <p>Nhập email để đặt lại mật khẩu</p>
        </div>

        {!isSubmitted ? (
          <form onSubmit={handleSubmit} className="login-form">
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Nhập email của bạn"
                className={`form-input ${errors.email ? 'form-input-error' : ''}`}
                autoComplete="email"
              />
            </div>

            <div 
              className={`message ${message ? 'message-visible' : ''}`}
              role="alert"
              aria-live="polite"
            >
              {message}
            </div>

            <button 
              type="submit" 
              className="login-button"
              disabled={isLoading}
            >
              {isLoading ? 'Đang gửi...' : 'Gửi email đặt lại mật khẩu'}
            </button>
          </form>
        ) : (
          <div className="success-message">
            <div className="message message-visible success">
              {message}
            </div>
            <div className="form-group">
              <button 
                type="button" 
                className="link-button"
                onClick={handleResendEmail}
              >
                Gửi lại email
              </button>
            </div>
          </div>
        )}

        <div className="login-links">
          <button 
            type="button" 
            className="link-button"
            onClick={handleBackToLogin}
          >
            Quay lại đăng nhập
          </button>
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordForm; 