import React, { useState } from 'react';

interface LoginProps {
  onLogin: (supervisorId: string) => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [supervisorId, setSupervisorId] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (supervisorId.trim()) {
      onLogin(supervisorId.trim().toUpperCase());
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-emerald-600 to-teal-700">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-2xl shadow-2xl transform transition-all hover:scale-105">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-800">성과관리 대시보드</h1>
          <p className="mt-2 text-gray-600">반장 사번을 입력하여 로그인하세요.</p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="relative">
            <input
              id="supervisorId"
              name="supervisorId"
              type="text"
              className="peer h-10 w-full border-b-2 border-gray-300 text-gray-900 placeholder-transparent focus:outline-none focus:border-teal-600"
              placeholder="S12345"
              value={supervisorId}
              onChange={(e) => setSupervisorId(e.target.value)}
              autoComplete="off"
            />
            <label
              htmlFor="supervisorId"
              className="absolute left-0 -top-3.5 text-gray-600 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
            >
              반장 사번
            </label>
          </div>
          <div>
            <button
              type="submit"
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 transition-transform transform hover:scale-105"
            >
              로그인
            </button>
          </div>
          <p className="text-center text-sm text-gray-500">
            Hint: 'S12345'를 입력하여 로그인하세요.
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
