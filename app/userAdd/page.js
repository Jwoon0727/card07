'use client'; // 클라이언트 컴포넌트로 설정
import { useState, useEffect } from 'react';

export default function UserAdd() {
    const [name, setName] = useState('');
    const [users, setUsers] = useState([]); // 유저 목록 상태 추가

    useEffect(() => {
        const fetchUsers = async () => {
            const response = await fetch('/api/users'); // 유저 목록 API 호출
            if (response.ok) {
                const data = await response.json();
                setUsers(data); // 유저 목록 저장
            } else {
                alert('유저 목록을 가져오는 데 실패했습니다.');
            }
        };

        fetchUsers();
    }, []); // 컴포넌트가 마운트될 때 호출

    const handleSubmit = async (e) => {
        e.preventDefault();

        // 이름 중복 확인
        const isDuplicate = users.some((user) => user.name === name);
        if (isDuplicate) {
            alert('중복된 유저 이름입니다. 다른 이름을 입력해주세요.'); // 중복 알림
            return; // 중복 시 함수 종료
        }

        // 유저 추가 API 호출
        await fetch('/api/userAdd', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name }),
        });

        setName(''); // 입력 필드 초기화
        window.location.reload(); // 페이지 새로 고침
    };

    const handleRefresh = () => {
        window.location.reload(); // 새로 고침 버튼 클릭 시 페이지 새로 고침
    };

    const handleDelete = async (userId) => {
        const response = await fetch(`/api/userDelete/${userId}`, {
            method: 'DELETE',
        });

        if (response.ok) {
            window.location.reload(); // 삭제 후 페이지 새로 고침
        } else {
            alert('유저 삭제에 실패했습니다.');
        }
    };

    return (
        <div>
            <h3>기존 유저</h3>
            <ul>
                {users.map((user, index) => (
                    <li key={index}>
                        {user.name}
                        <button onClick={() => handleDelete(user._id)}>삭제</button> {/* 삭제 버튼 추가 */}
                    </li> // 유저 이름 목록 표시
                ))}
            </ul>

            <h3>유저 추가</h3>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="유저 이름"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
                <button type="submit">유저 추가</button>
            </form>

            {/* 새로 고침 버튼 추가 */}
            <button onClick={handleRefresh}>전체 새로 고침</button>
        </div>
    );
}