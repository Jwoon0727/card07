'use client'; // 클라이언트 컴포넌트로 설정

import { Navbar, Nav, Container, NavDropdown, Button } from 'react-bootstrap';
import { useSession } from 'next-auth/react'; // useSession 훅 임포트
import LoginBtn, { LogOutBtn } from '../LoginBtn'; // 로그인 및 로그아웃 버튼 임포트
import Link from 'next/link'; // Link 임포트


export default function ClientNavbar() {

  const { data: session, status } = useSession(); // 세션 정보와 상태 가져오기

  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="/">구역카드123</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
          {
          status === 'authenticated' ? ( // 사용자가 로그인된 상태일 때
            <span>
              {/* userName을 표시 */}
              환영합니다, {session.user.name} <LogOutBtn/>
            </span>
          ) : (
            <>
              <LoginBtn/>
              <Link href="/Registerr">
                <Button variant="outline-primary" className="ms-2">회원가입</Button> {/* 회원가입 버튼 추가 */}
              </Link>
            </>
          )
        }
            <Nav.Link href="/map">지도</Nav.Link>
            <Nav.Link href="/userlist">유저</Nav.Link>
            <NavDropdown title="Dropdown" id="basic-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">상세페이지</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}