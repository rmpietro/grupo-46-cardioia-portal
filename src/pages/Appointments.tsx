import { useEffect, useReducer, useState } from 'react';
import styled from 'styled-components';
import { createAppointment, fetchAppointments, fetchPatients } from '../services/api';
import type { Appointment, AppointmentType, Patient } from '../types';
import { format } from 'date-fns';


const Wrap = styled.div`padding: 20px; display: grid; gap: 20px;`;
const Grid = styled.div`display: grid; grid-template-columns: 1fr; gap: 16px;`;
const Card = styled.div`background: var(--panel); border: 1px solid #1f2937; border-radius: 16px; padding: 16px;`;
const Field = styled.div`display: grid; gap: 6px;`;
const Input = styled.input`
  background: #0b1023; border: 1px solid #1f2937; color: var(--text);
  padding: 10px 12px; border-radius: 10px; width: 100%;
`;
const Select = styled.select`
  background: #0b1023; border: 1px solid #1f2937; color: var(--text);
  padding: 10px 12px; border-radius: 10px; width: 100%;
`;
const Btn = styled.button`
  padding: 10px 14px; border: 0; border-radius: 12px; cursor: pointer;
  background: linear-gradient(135deg, var(--primary), var(--accent)); color: #0b1023; font-weight: 700;
`;

type FormState = { patientId: string; date: string; type: AppointmentType; notes: string };
const initialForm: FormState = { patientId: '', date: '', type: 'Consulta', notes: '' };
type Action = { type: 'SET'; field: keyof FormState; value: string } | { type: 'RESET' };

function reducer(state: FormState, action: Action): FormState{
  switch(action.type){
    case 'SET': return { ...state, [action.field]: action.value };
    case 'RESET': return initialForm;
    default: return state;
  }
}

export default function Appointments(){
  const [form, dispatch] = useReducer(reducer, initialForm);
  const [patients, setPatients] = useState<Patient[]>([]);
  const [rows, setRows] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState('');

  useEffect(() => {
    (async () => {
      const [p, a] = await Promise.all([fetchPatients(), fetchAppointments()]);
      setPatients(p); setRows(a);
    })();
  }, []);

  const onSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    setLoading(true); setMsg('');
    try{
      if(!form.patientId || !form.date) throw new Error('Selecione paciente e data.');
      const payload: Omit<Appointment, 'id'> = { 
        patientId: Number(form.patientId), 
        date: form.date, 
        type: form.type, 
        notes: form.notes || undefined 
      };
      const created = await createAppointment(payload);
      setRows(prev => [created, ...prev]);
      dispatch({ type: 'RESET' });
      setMsg('Agendamento criado com sucesso!');
    }catch(err: any){ setMsg(err?.message || 'Erro ao criar agendamento'); }
    finally{ setLoading(false); }
  };

  return (
    <Wrap>
      <h2>Agendamentos</h2>
      <Grid>
        <Card>
          <h3>Novo agendamento</h3>
          <form onSubmit={onSubmit} style={{display:'grid', gap:12}}>
            <Field>
              <label>Paciente</label>
              <Select value={form.patientId} onChange={(e: React.ChangeEvent<HTMLSelectElement>)=>dispatch({type:'SET', field:'patientId', value:e.target.value})}>
                <option value="">Selecione</option>
                {patients.map(p=>(<option key={p.id} value={p.id}>{p.name} (#{p.id})</option>))}
              </Select>
            </Field>
            <Field>
              <label>Data</label>
              <Input type="date" value={form.date} onChange={(e: React.ChangeEvent<HTMLInputElement>)=>dispatch({type:'SET', field:'date', value:e.target.value})} />
            </Field>
            <Field>
              <label>Tipo</label>
              <Select value={form.type} onChange={(e: React.ChangeEvent<HTMLSelectElement>)=>dispatch({type:'SET', field:'type', value:e.target.value})}>
                <option>Consulta</option>
                <option>Exame</option>
                <option>Retorno</option>
              </Select>
            </Field>
            <Field>
              <label>Observações</label>
              <Input placeholder="Opcional" value={form.notes} onChange={(e: React.ChangeEvent<HTMLInputElement>)=>dispatch({type:'SET', field:'notes', value:e.target.value})} />
            </Field>
            <div style={{display:'flex', gap:10, alignItems:'center'}}>
              <Btn disabled={loading} type="submit">{loading ? 'Salvando…' : 'Salvar'}</Btn>
              {msg && <span style={{opacity:.8}}>{msg}</span>}
            </div>
          </form>
        </Card>
        <Card>
          <h3>Lista</h3>
          <div style={{display:'grid', gap:8}}>
{rows.map(r => {
  const patientName = patients.find(p => p.id === r.patientId)?.name ?? `Paciente #${r.patientId}`;
  const noteText = r.notes && r.notes !== '—' ? r.notes : '';
  return (
    <div key={r.id} style={{display:'grid', gridTemplateColumns:'1fr 180px 120px 1fr', gap:12, padding:'10px 0', borderBottom:'1px solid #1f2937'}}>
      <div><b>#{r.id}</b></div>
      <div>{patientName}</div>
      <div>{format(new Date(r.date+'T00:00:00'), 'dd/MM/yyyy')}</div>
      <div>
        {r.type}{noteText ? ' — ' : ''}
        {noteText && <span style={{color:'var(--muted)'}}>{noteText}</span>}
      </div>
    </div>
  );
})}

          </div>
        </Card>
      </Grid>
    </Wrap>
  );
}