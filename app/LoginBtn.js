'use client';

import { signIn, signOut } from 'next-auth/react'; // 로그인 및 로그아웃 함수 임포트

// 로그인 버튼
export default function LoginBtn() {
  return (
    <button className="logout-btn" onClick={() => signIn()}>로그인</button>
  );
}

// 로그아웃 버튼
export function LogOutBtn() {
  return (
    <button  onClick={() => signOut()}>로그아웃</button>
  );
}