'use client'; // 클라이언트 컴포넌트로 설정
import { useState } from 'react';
import { useRouter } from 'next/navigation'; // Next.js 13 이상에서 사용

export default function UserAdd() {
    const [name, setName] = useState('');
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch('/api/userAdd', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name }),
        });

        if (response.ok) {
            alert('유저 이름이 추가되었습니다.');
            router.push('/'); // 성공적으로 추가 후 홈으로 리다이렉트
        } else {
            alert('유저 이름 추가에 실패했습니다.');
        }
    };

    return (
        <div>
            <h1>유저 추가</h1>
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
        </div>
    );
}