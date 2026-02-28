import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { authApi } from '../api'

export default function ForgotPassword() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // 清除之前的错误
    setError('')

    // 验证邮箱
    if (!email.trim()) {
      setError('请输入邮箱地址')
      return
    }

    if (!validateEmail(email)) {
      setError('请输入有效的邮箱地址')
      return
    }

    setLoading(true)

    try {
      // 调用重置密码 API
      const response = await authApi.forgotPassword({
        email: email
      })

      if (response.code === 200) {
        setSuccess(true)
      } else {
        setError(response.message || '请求失败，请稍后重试')
      }
    } catch (err: any) {
      console.error('重置密码失败:', err)
      if (err.response?.data?.message) {
        setError(err.response.data.message)
      } else {
        setError('网络错误，请检查您的网络连接')
      }
    } finally {
      setLoading(false)
    }
  }

  const handleBackToLogin = () => {
    navigate('/login')
  }

  if (success) {
    return (
      <div className="forgot-password-page">
        <div className="forgot-password-container">
          <div className="forgot-password-header">
            <div className="logo">
              <img
                src="/images/logo.svg"
                alt="Logo"
                className="logo-image"
              />
            </div>
          </div>

          <div className="success-message">
            <div className="success-icon">✓</div>
            <h2 className="success-title">邮件已发送</h2>
            <p className="success-text">
              我们已向 <strong>{email}</strong> 发送了一封重置密码的邮件。
              请检查您的邮箱并按照邮件中的说明重置密码。
            </p>
          </div>

          <div className="back-to-login">
            <button
              onClick={handleBackToLogin}
              disabled={loading}
              className="back-button"
            >
              返回登录
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="forgot-password-page">
      <div className="forgot-password-container">
        <div className="forgot-password-header">
          <div className="logo">
            <img
              src="/images/logo.svg"
              alt="Logo"
              className="logo-image"
            />
          </div>
        </div>

        <h1 className="forgot-password-title">重置密码</h1>
        <p className="forgot-password-subtitle">
          请输入您的邮箱地址，我们将向您发送重置密码的链接
        </p>

        <form onSubmit={handleSubmit} className="forgot-password-form">
          {error && (
            <div className="error-message">{error}</div>
          )}

          <div className="form-group">
            <label htmlFor="email" className="form-label">
              邮箱地址
            </label>
            <div className="input-wrapper">
              <img
                src="/images/icon-email.svg"
                alt="Email"
                className="input-icon"
              />
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="请输入您的邮箱"
                className="form-input"
                disabled={loading}
                required
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="submit-button"
          >
            {loading ? '发送中...' : '发送重置链接'}
          </button>
        </form>

        <div className="back-to-login">
          <button
            onClick={handleBackToLogin}
            disabled={loading}
            className="back-link"
          >
            返回登录
          </button>
        </div>
      </div>
    </div>
  )
}
