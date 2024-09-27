export default function Register() {
    return (
      <div>
          <form method="POST" action="/api/auth/signup">
            <input name="name" type="text" placeholder="이름" required /> 
            <input name="id" type="text" placeholder="아이디" required />
            <input name="password" type="password" placeholder="비밀번호" required />
            
            {/* 역할 선택 드롭다운 추가 */}
            <select name="role" required>
              <option value="" disabled selected>역할 선택</option>
              <option value="0">전도인</option>
              <option value="1">인도자</option>
              <option value="3">관리자</option>
              <option value="moderator">모더레이터</option>
            </select>

            <button type="submit">id/pw 가입 요청</button>
          </form>
      </div>
    )
}