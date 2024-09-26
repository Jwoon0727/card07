// "use client"; // 클라이언트 컴포넌트로 설정

// import { useState } from "react";
// import ClientNavbar from '../components/ClientNavbar';

// function SignUp() {
//     const [username, setUsername] = useState('');
//     const [password, setPassword] = useState('');
//     const [email, setEmail] = useState('');
//     const [error, setError] = useState('');
//     const [success, setSuccess] = useState('');

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         try {
//             const response = await fetch('/api/register', {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json'
//                 },
//                 body: JSON.stringify({ username, password, email })
//             });

//             const data = await response.json();

//             if (response.ok) {
//                 setSuccess('회원가입이 완료되었습니다.');
//                 setUsername('');
//                 setPassword('');
//                 setEmail('');
//             } else {
//                 setError(data.error || '회원가입 중 오류가 발생했습니다.');
//             }
//         } catch (err) {
//             setError('회원가입 중 오류가 발생했습니다.');
//             console.error(err);
//         }
//     };

//     return (
//         <div>
//             <ClientNavbar />
//             <h1>회원가입</h1>
//             <form onSubmit={handleSubmit}>
//                 <div>
//                     <label>사용자 이름:</label>
//                     <input
//                         type="text"
//                         value={username}
//                         onChange={(e) => setUsername(e.target.value)}
//                         required
//                     />
//                 </div>
//                 <div>
//                     <label>비밀번호:</label>
//                     <input
//                         type="password"
//                         value={password}
//                         onChange={(e) => setPassword(e.target.value)}
//                         required
//                     />
//                 </div>
//                 <div>
//                     <label>이메일:</label>
//                     <input
//                         type="email"
//                         value={email}
//                         onChange={(e) => setEmail(e.target.value)}
//                         required
//                     />
//                 </div>
//                 <button type="submit">가입하기</button>
//             </form>
//             {error && <p style={{ color: 'red' }}>{error}</p>}
//             {success && <p style={{ color: 'green' }}>{success}</p>}
//         </div>
//     );
// }

// export default SignUp;