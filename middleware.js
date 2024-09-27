import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(request) {
  // JWT를 가져옵니다.
  const token = await getToken({ req: request, secret: 'jworg9914#' });

  const { pathname } = request.nextUrl;

  // 보호할 경로에 대해 로그인 여부 확인
  if (!token && (pathname === '/userlist' || pathname === '/map' || pathname === '/profile')) {
    // 로그인 페이지로 리다이렉트합니다.
    return NextResponse.redirect(new URL('/api/auth/signin?callbackUrl=' + encodeURIComponent(request.url), request.url));
  }

  // 로그인된 사용자는 요청을 계속 진행합니다.
  return NextResponse.next();
}

// 보호할 경로를 지정합니다.
export const config = {
  matcher: ['/userlist', '/map', '/profile'], // 보호할 경로 추가
};