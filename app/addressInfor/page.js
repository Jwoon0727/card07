"use client";

import { useSearchParams, useRouter } from 'next/navigation';

const AddressInfor = () => {
  const searchParams = useSearchParams(); // useSearchParams 사용
  const jibun = searchParams.get('jibun'); // 'jibun' 파라미터 가져오기
  const router = useRouter(); // useRouter 사용

  if (!jibun) {
    return <div>Loading...</div>; // jibun 값이 없으면 로딩 화면
  }

  return (
    <div>
      <h1>주소 정보</h1>
      <p>지번 주소: {jibun}</p>
      
      {/* 이전 페이지로 돌아가기 버튼 */}
      <button onClick={() => router.back()}>이전</button>
    </div>
  );
};

export default AddressInfor;