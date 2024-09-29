'use client'

import { useEffect, useState } from "react";
import ClientNavbar from "@/app/components/ClientNavbar";

export default function Detail(props) {
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const [editCardId, setEditCardId] = useState(null);
  const [editCardDetails, setEditCardDetails] = useState({ 지번: "", 세부정보: "" });

  const zoneNumber = parseInt(props.params.id, 10); // URL 파라미터에서 구역번호를 가져옴

  useEffect(() => {
    async function fetchZoneData() {
      try {
        const response = await fetch(`/api/zone/${zoneNumber}`);
        if (!response.ok) {
          throw new Error("데이터를 불러오는 중 오류가 발생했습니다.");
        }
        const data = await response.json();
        setCards(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchZoneData();
  }, [zoneNumber]);

  const handleEditClick = (card) => {
    setEditCardId(card._id);
    setEditCardDetails({ 지번: card.지번, 세부정보: card.세부정보 });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditCardDetails((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdateCard = async () => {
    // 수정할 내용이 없는 경우 API 호출 방지
    if (editCardDetails.지번 === "" && editCardDetails.세부정보 === "") {
      alert("수정할 내용을 입력해 주세요.");
      return;
    }

    try {
      const response = await fetch(`/api/zone/${editCardId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(editCardDetails),
      });

      if (!response.ok) {
        window.location.reload();
        return;
      }

      // 카드 목록 새로 고침
      const updatedCards = cards.map(card => (card._id === editCardId ? { ...card, ...editCardDetails } : card));
      setCards(updatedCards);
      setEditCardId(null);
      setEditCardDetails({ 지번: "", 세부정보: "" });
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) {
    return <p>데이터를 불러오는 중...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div>
      <ClientNavbar />
  

      {cards.length > 0 ? (
        <>
          <h4>구역번호: {zoneNumber}</h4>
          <h4>지번 및 세부정보 목록:</h4>
          {cards.map((card) => (
            <div key={card._id}>
              {editCardId === card._id ? (
                <>
                  <input 
                    type="text" 
                    name="지번" 
                    value={editCardDetails.지번} 
                    onChange={handleInputChange} 
                    placeholder="지번" 
                  />
                  <input 
                    type="text" 
                    name="세부정보" 
                    value={editCardDetails.세부정보} 
                    onChange={handleInputChange} 
                    placeholder="세부정보" 
                  />
                  <button onClick={handleUpdateCard}>수정 완료</button>
                </>
              ) : (
                <>
                  <h5>지번: {card.지번}</h5>
                  <p>세부정보: {card.세부정보 || '정보 없음'}</p>
                  <button onClick={() => handleEditClick(card)}>수정</button>
                </>
              )}
            </div>
          ))}
        </>
      ) : (
        <p>해당 구역번호에 대한 데이터가 없습니다.</p>
      )}
    </div>
  );
}