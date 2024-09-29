// app/SessionProviderWrapper.js
'use client'; // 클라이언트 컴포넌트로 설정

import { SessionProvider } from 'next-auth/react';

export default function SessionProviderWrapper({ children }) {
  return <SessionProvider>{children}</SessionProvider>;
}