import { useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'

export default function Home() {
  const navigate = useNavigate()
  const [user, setUser] = useState<any>(null)

  useEffect(() => {
    // 检查用户登录状态
    const token = localStorage.getItem('token')
    const userStr = localStorage.getItem('user')

    if (!token) {
      // 未登录，跳转到登录页
      navigate('/login')
      return
    }

    if (userStr) {
      setUser(JSON.parse(userStr))
    }
  }, [navigate])

  const handleLogout = () => {
    // 清除登录信息
    localStorage.removeItem('token')
    localStorage.removeItem('refreshToken')
    localStorage.removeItem('user')

    // 跳转到登录页
    navigate('/login')
  }

  return (
    <div className="home-page">
      <div className="home-container">
        <header className="home-header">
          <div className="logo">
            <img
              src="/images/logo.svg"
              alt="Logo"
              className="logo-image"
            />
          </div>
          <button onClick={handleLogout} className="logout-button">
            退出登录
          </button>
        </header>

        <main className="home-main">
          <div className="welcome-section">
            <h1 className="welcome-title">
              欢迎回来，{user?.name || '用户'}！
            </h1>
            <p className="welcome-subtitle">
              您已成功登录系统
            </p>
          </div>

          <div className="user-info-card">
            <div className="user-avatar">
              {user?.avatar ? (
                <img src={user.avatar} alt={user.name} />
              ) : (
                <div className="avatar-placeholder">
                  {user?.name?.charAt(0) || 'U'}
                </div>
              )}
            </div>
            <div className="user-details">
              <h2 className="user-name">{user?.name || '用户'}</h2>
              <p className="user-email">{user?.email || ''}</p>
              <p className="user-id">ID: {user?.id || '-'}</p>
            </div>
          </div>

          <div className="feature-section">
            <h3 className="feature-title">功能列表</h3>
            <div className="feature-list">
              <div className="feature-item">
                <div className="feature-icon">📊</div>
                <div className="feature-text">
                  <h4>数据统计</h4>
                  <p>查看您的数据统计信息</p>
                </div>
              </div>
              <div className="feature-item">
                <div className="feature-icon">📝</div>
                <div className="feature-text">
                  <h4>任务管理</h4>
                  <p>管理您的待办任务</p>
                </div>
              </div>
              <div className="feature-item">
                <div className="feature-icon">⚙️</div>
                <div className="feature-text">
                  <h4>系统设置</h4>
                  <p>配置系统参数和偏好</p>
                </div>
              </div>
            </div>
          </div>
        </main>

        <footer className="home-footer">
          <p>&copy; 2026 Coze Coding. All rights reserved.</p>
        </footer>
      </div>
    </div>
  )
}
