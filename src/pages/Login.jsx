import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';

export default function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const response = await fetch('https://60f5-35-187-248-252.ngrok-free.app/login/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (response.ok) {
        // Lưu thông tin người dùng bao gồm cả session_id và id
        localStorage.setItem('currentUser', JSON.stringify({
          username: data.username,
          id: data.id,
          session_id: data.session_id
        }));

        // Chuyển hướng đến trang chủ
        navigate('/home');
      } else {
        setError(data.detail || 'Tài khoản không tồn tại hoặc sai mật khẩu!');
      }
    } catch (error) {
      console.error('Error:', error);
      setError('Đã xảy ra lỗi khi đăng nhập');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex h-screen items-center justify-center bg-gray-100">
      <form onSubmit={handleLogin} className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4 text-center">Đăng nhập</h2>

        {error && <div className="mb-4 p-2 bg-red-100 text-red-700 rounded">{error}</div>}

        <input
          type="text"
          placeholder="Tên đăng nhập"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full px-3 py-2 mb-4 border rounded"
          required
        />
        <input
          type="password"
          placeholder="Mật khẩu"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-3 py-2 mb-4 border rounded"
          required
        />
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 disabled:bg-blue-300"
          disabled={isLoading}
        >
          {isLoading ? 'Đang đăng nhập...' : 'Đăng nhập'}
        </button>
        <p className="mt-4 text-center">
          Chưa có tài khoản? <Link to="/register" className="text-blue-500">Đăng ký</Link>
        </p>
      </form>
    </div>
  );
}