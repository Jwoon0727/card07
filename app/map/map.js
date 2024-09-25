"use client";

import { useEffect, useRef } from 'react';

const KakaoMap = () => {
  const mapRef = useRef(null); // useRef로 map 객체를 저장

  useEffect(() => {
    const createMap = () => {
      if (window.kakao && window.kakao.maps) {
        const container = document.getElementById('map');
        const options = {
          center: new window.kakao.maps.LatLng(33.450701, 126.570667),
          level: 3,
        };

        // 지도 객체가 없을 경우에만 생성
        if (!mapRef.current) {
          mapRef.current = new window.kakao.maps.Map(container, options);
        }
      } else {
        console.error('kakao.maps 객체를 불러오는 데 실패했습니다.');
      }
    };

    const script = document.createElement('script');
    script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=06f41dcc4cfb97542d10711c83d8457d&autoload=false`;
    script.async = true;
    document.head.appendChild(script);

    script.onload = () => {
      window.kakao.maps.load(() => {
        createMap();
      });
    };

    return () => {
      // 스크립트 제거
      document.head.removeChild(script);
    };
  }, []); // 빈 배열로 effect가 한 번만 실행되도록

  return (
    <div style={{ width: '100%', height: '50vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <div id="map" style={{ width: '100%', height: '100%', backgroundColor: 'lightgray' }}></div>
    </div>
  );
};

export default KakaoMap;