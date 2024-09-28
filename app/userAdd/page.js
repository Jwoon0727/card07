'use client'; // 클라이언트 컴포넌트로 설정
import { useState, useEffect } from 'react';

export default function UserAdd() {
    const [name, setName] = useState('');
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const fetchUsers = async () => {
            const response = await fetch('/api/users');
            if (response.ok) {
                const data = await response.json();
                setUsers(data);
            } else {
                alert('유저 목록을 가져오는 데 실패했습니다.');
            }
        };

        fetchUsers();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const isDuplicate = users.some((user) => user.name === name);
        if (isDuplicate) {
            alert('중복된 유저 이름입니다. 다른 이름을 입력해주세요.');
            return;
        }

        await fetch('/api/userAdd', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name }),
        });

        setName('');
        window.location.reload();
    };

    const handleRefresh = () => {
        window.location.reload();
    };

    const handleDelete = async (userId) => {
        const response = await fetch(`/api/userDelete/${userId}`, {
            method: 'DELETE',
        });

        if (response.ok) {
            const data = await response.json();
            if (data.message.includes('로그아웃되었습니다.')) {
                // 로그아웃 처리
                await fetch('/api/auth/logout', { method: 'POST' });
                window.location.href = '/'; // 로그아웃 후 홈으로 리디렉션
            } else {
                window.location.reload();
            }
        } else {
            alert('유저 삭제에 실패했습니다.');
        }
    };

    return (
        <div>
            <h3>기존 유저</h3>
            <ul>
                {users.map((user) => (
                    <li key={user._id}>
                        {user.name}
                        <button onClick={() => handleDelete(user._id)}>삭제</button>
                    </li>
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

            <button onClick={handleRefresh}>전체 새로 고침</button>
        </div>
    );
}