import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { fetchPatients, fetchAppointments } from '../services/api';
import { format } from 'date-fns';
import type { Appointment, Patient } from '../types';

const Grid = styled.div`
  padding: 20px; display: grid; gap: 16px;
`;
const Cards = styled.div`
  display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 16px;
`;
const Card = styled.div`
  background: var(--panel); border: 1px solid #1f2937; border-radius: 16px; padding: 16px;
`;
const Title = styled.h2`margin: 0 0 12px;`;

export default function Dashboard(){
  const [counts, setCounts] = useState({ patients: 0, appointments: 0, highRisk: 0 });

  useEffect(() => {
    (async () => {
      const [p, a] = await Promise.all([fetchPatients(), fetchAppointments()]);
      const highRisk = (p as Patient[]).filter(x=>x.risk==='alto').length;
      setCounts({ patients: p.length, appointments: a.length, highRisk });
    })();
  }, []);

  return (
    <Grid>
      <Title>Dashboard</Title>
      <Cards>
        <Card>
          <div style={{fontSize:12, color:'var(--muted)'}}>Pacientes</div>
          <div style={{fontSize:32, fontWeight:800}}>{counts.patients}</div>
        </Card>
        <Card>
          <div style={{fontSize:12, color:'var(--muted)'}}>Agendamentos</div>
          <div style={{fontSize:32, fontWeight:800}}>{counts.appointments}</div>
        </Card>
        <Card>
          <div style={{fontSize:12, color:'var(--muted)'}}>Risco Alto</div>
          <div style={{fontSize:32, fontWeight:800, color:'var(--danger)'}}>{counts.highRisk}</div>
        </Card>
      </Cards>
      <Card>
        <Title>Últimos agendamentos</Title>
        <RecentAppointments />
      </Card>
    </Grid>
  );
}

function RecentAppointments(){
  const [rows, setRows] = useState<Appointment[]>([]);
  const [patMap, setPatMap] = useState<Map<number, Patient>>(new Map());

  useEffect(() => {
    (async () => {
      const [apps, pats] = await Promise.all([fetchAppointments(), fetchPatients()]);
      setRows(apps);
      setPatMap(new Map(pats.map(p => [p.id, p])));
    })();
  }, []);

  return (
    <div style={{display:'grid', gap:8}}>
      {rows.map(r=> {
        const patientName = patMap.get(r.patientId)?.name ?? `Paciente #${r.patientId}`;
        const noteText = r.notes && r.notes !== '—' ? r.notes : '';
        return (
          <div key={r.id} style={{display:'grid', gridTemplateColumns:'120px 1fr 1fr', gap:12, padding:'10px 0', borderBottom:'1px solid #1f2937'}}>
            <div>{format(new Date(r.date+'T00:00:00'), 'dd/MM/yyyy')}</div>
            <div><b>{patientName}</b></div>
            <div>
              {r.type}{noteText ? ' — ' : ''}
              {noteText && <span style={{color:'var(--muted)'}}>{noteText}</span>}
            </div>
          </div>
        );
      })}
    </div>
  );
}
