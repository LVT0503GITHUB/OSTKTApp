'use client';
import { FaUser, FaLock } from "react-icons/fa";
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function LoginPage() {
    const router = useRouter();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = () => {
        // TODO: xử lý đăng nhập thật tại đây
        if (username === 'admin' && password === '1') {
            router.push('/main'); // ✅ chuyển tới trang chính
        } else {
            alert('Sai tài khoản hoặc mật khẩu!');
        }
    };

    return (
        <div className="flex h-screen">
            {/* Bên trái: logo */}
            <div className="flex flex-col items-center justify-center w-1/2 bg-gradient-to-b from-blue-100 to-blue-50">
                <img
                    src="/logo_giaiphap.svg"
                    alt="Logo"
                    className="w-60 h-60 mb-10 object-contain" // tăng kích thước logo
                />
                <h2 className="text-3xl font-semibold text-blue-900">GIẢI PHÁP TỐI ƯU</h2> {/* tăng kích thước text */}
            </div>

            {/* Bên phải: form login */}
            <div className="flex flex-col items-center justify-center w-1/2 bg-white">
                <div className="w-3/5 max-w-lg"> {/* tăng độ rộng form */}
                    <h1 className="text-5xl font-semibold mb-14 text-blue-900 text-center">LOGIN</h1> {/* tăng kích thước chữ */}

                    <div className="mb-10 relative">
                        <FaUser className="absolute left-4 top-1/2 transform -translate-y-1/2 text-blue-900 text-2xl" /> {/* icon to hơn */}
                        <input
                            type="text"
                            placeholder="Tên đăng nhập"
                            className="w-full pl-14 pr-4 py-4 border-b-2 border-blue-900 text-xl focus:outline-none" // tăng padding và font
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>

                    <div className="mb-12 relative">
                        <FaLock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-blue-900 text-2xl" />
                        <input
                            type="password"
                            placeholder="Mật khẩu"
                            className="w-full pl-14 pr-4 py-4 border-b-2 border-blue-900 text-xl focus:outline-none"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    <button
                        onClick={handleLogin}
                        className="w-full bg-blue-900 text-white py-4 text-xl rounded-full hover:bg-blue-800 transition">
                        ĐĂNG NHẬP
                    </button>
                </div>
            </div>
        </div>
    );
}
