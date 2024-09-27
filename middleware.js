import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export default async function middleware(request) {
    const token = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET });

    // 토큰의 내용을 로그로 출력
    console.log('Retrieved Token:', token);

    // 로그인한 사용자의 이름을 변수에 저장
    const userName = token ? token.user.name : null;

    console.log('Retrieved User Name:', userName); // 수정된 로그

    // /userlist 경로에 접근할 때
    if (request.nextUrl.pathname.startsWith('/userlist')) {
        // 인증된 사용자가 아닐 경우
        if (!userName) {
            console.log('사용자가 인증되지 않았습니다.'); // 추가 로그
            // 로그인 페이지로 리디렉션
            return NextResponse.redirect(new URL('/api/auth/signin?callbackUrl=http%3A%2F%2Flocalhost%3A3000%2F', request.url));
        }
        // 인증된 사용자일 경우, 다음 처리로 진행
        console.log('사용자가 인증되었습니다:', userName); // 인증된 사용자의 이름 로그
    }

    // 나머지 요청은 그대로 진행
    return NextResponse.next();
}