import { useEffect, useState } from 'react';
import Modal from '@/app/components/Modal';

export default function MapDenied() {
  const [showModal, setShowModal] = useState(false); // 초기값 false로 설정

  useEffect(() => {
    // 모달을 열기 위한 로직
    setShowModal(true); // 페이지 로드 시 모달을 보여줌
  }, []);


  const handleGoBack = () => {
    window.history.back(); // 이전 페이지로 돌아가기
  };

  // showModal이 true일 때만 Modal을 렌더링
  return (
    <div>
      {showModal && (
        <Modal message="권한이 없습니다">
          <button onClick={handleGoBack}>이전</button>
        </Modal>
      )}
    </div>
  );
}