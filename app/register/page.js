'use client'
import { useState } from 'react';

export default function Register() {
  const [name, setName] = useState('');
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, id, password, role }),
      });

      const result = await response.json();

      if (response.ok) {
        alert(result.message); // 가입 성공 시 메시지 표시
        window.location.href = '/api/auth/signin?callbackUrl=http%3A%2F%2Flocalhost%3A3000%2F'; // 로그인 페이지로 리다이렉트
      } else {
        alert(result.message); // 에러 메시지 표시
      }
    } catch (error) {
      console.error('회원가입 중 에러 발생:', error);
      alert('서버와의 통신 중 문제가 발생했습니다. 나중에 다시 시도해주세요.');
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input 
          name="name" 
          type="text" 
          placeholder="이름" 
          value={name} 
          onChange={(e) => setName(e.target.value)} 
          required 
        />
        <input 
          name="id" 
          type="text" 
          placeholder="아이디" 
          value={id} 
          onChange={(e) => setId(e.target.value)} 
          required 
        />
        <input 
          name="password" 
          type="password" 
          placeholder="비밀번호" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
          required 
        />

        {/* 역할 선택 드롭다운 */}
        <select 
          name="role" 
          value={role} 
          onChange={(e) => setRole(e.target.value)} 
          required
        >
          <option value="" disabled>역할 선택</option>
          <option value="0">전도인</option>
          <option value="1">인도자</option>
          <option value="3">관리자</option>
          <option value="moderator">모더레이터</option>
        </select>

        <button type="submit">id/pw 가입 요청</button>
      </form>
    </div>
  );
}