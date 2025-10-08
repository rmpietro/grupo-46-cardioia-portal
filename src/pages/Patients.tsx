import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { fetchPatients } from '../services/api';
import type { Patient } from '../types';

const Wrap = styled.div`padding: 20px;`;
const Table = styled.div`display: grid; gap: 10px;`;
const Row = styled.div`
  display: grid; grid-template-columns: 40px 1fr 80px 120px; gap: 12px;
  padding: 10px 0; border-bottom: 1px solid #1f2937;
`;
const Pill = styled.span<{risk: 'alto' | 'baixo'}>`
  padding: 4px 8px; border-radius: 999px; font-size: 12px;
  background: ${({risk}) => risk==='alto' ? 'rgba(248,113,113,.15)' : 'rgba(52,211,153,.15)'};
  color: ${({risk}) => risk==='alto' ? '#fca5a5' : '#6ee7b7'};
  border: 1px solid ${({risk}) => risk==='alto' ? '#7f1d1d' : '#064e3b'};
`;

export default function Patients(){
  const [rows, setRows] = useState<Patient[]>([]);
  useEffect(() => { (async ()=> setRows(await fetchPatients()))(); }, []);

  return (
    <Wrap>
      <h2>Pacientes</h2>
      <Table>
        <Row style={{color:'var(--muted)'}}>
          <div>#</div><div>Nome</div><div>Idade</div><div>Risco</div>
        </Row>
        {rows.map(p => (
          <Row key={p.id}>
            <div>{p.id}</div>
            <div>{p.name}</div>
            <div>{p.age}</div>
            <div><Pill risk={p.risk}>{p.risk}</Pill></div>
          </Row>
        ))}
      </Table>
    </Wrap>
  );
}