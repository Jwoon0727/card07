'use client';

import { useState } from 'react';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import * as XLSX from 'xlsx';

function ZoneRegistration() {
  const [zones, setZones] = useState([]); // 등록된 구역을 저장할 상태 변수

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const data = await file.arrayBuffer();
    const workbook = XLSX.read(data);
    const firstSheet = workbook.Sheets[workbook.SheetNames[0]];
    const jsonData = XLSX.utils.sheet_to_json(firstSheet);

    // 읽은 데이터로 구역 목록 업데이트
    setZones(jsonData);
  };

  const handleRegister = async () => {
    // 데이터베이스에 저장하는 API 호출
    const response = await fetch('/api/registerCard', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(zones), // 여러 개의 구역 데이터 전송
    });

    if (response.ok) {
      alert('구역이 성공적으로 등록되었습니다!');
      setZones([]); // 등록 후 구역 목록 초기화
    } else {
      alert('구역 등록에 실패했습니다.');
    }
  };

  return (
    <>
      <Form>
        <Form.Group controlId="formFileUpload">
          <Form.Label>구역 정보를 포함한 XLSX 파일 업로드</Form.Label>
          <Form.Control 
            type="file" 
            accept=".xlsx" 
            onChange={handleFileUpload} 
            required 
          />
        </Form.Group>
      </Form>

      {zones.length > 0 && (
        <>
          <Table striped bordered hover className="mt-3">
            <thead>
              <tr>
                <th>#</th>
                <th>구역번호</th>
                <th>지번</th>
                <th>세부정보</th>
              </tr>
            </thead>
            <tbody>
              {zones.map((zone, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{zone['구역번호']}</td>
                  <td>{zone['지번']}</td>
                  <td>{zone['세부정보']}</td>
                </tr>
              ))}
            </tbody>
          </Table>

          <Button variant="primary" onClick={handleRegister}>
            등록하기
          </Button>
        </>
      )}
    </>
  );
}

export default ZoneRegistration;