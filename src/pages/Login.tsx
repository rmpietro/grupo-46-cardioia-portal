import { useState } from 'react';
import styled from 'styled-components';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const Wrap = styled.div`
  height: calc(100vh - 0px); display: grid; place-items: center;
`;
const Card = styled.div`
  width: 100%; max-width: 420px; background: var(--panel); padding: 24px; border-radius: 16px;
  border: 1px solid #1f2937; box-shadow: 0 10px 40px rgba(0,0,0,.35);
`;
const Title = styled.h1`margin: 0 0 12px; color: var(--primary); font-size: 24px;`;
const Field = styled.div`display: grid; gap: 6px; margin: 10px 0;`;
const Input = styled.input`
  background: #0b1023; border: 1px solid #1f2937; color: var(--text);
  padding: 10px 12px; border-radius: 10px; width: 100%;
`;
const Btn = styled.button`
  width: 100%; margin-top: 12px; padding: 10px 14px; border: 0; border-radius: 12px;
  background: linear-gradient(135deg, var(--primary), var(--accent)); color: #0b1023; font-weight: 700;
  cursor: pointer; box-shadow: 0 8px 24px rgba(34,211,238,.25);
`;

export default function Login(){
  const nav = useNavigate();
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const onSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await login({ email, password });
      nav('/');
    } catch (err: any){
      setError(err?.message || 'Falha ao autenticar');
    }
  };

  return (
    <Wrap>
      <Card>
        <Title>Entrar no CardioIA</Title>
        <form onSubmit={onSubmit}>
          <Field>
            <label>Email</label>
            <Input value={email} onChange={(e: React.ChangeEvent<HTMLInputElement>)=>setEmail(e.target.value)} placeholder="voce@exemplo.com" />
          </Field>
          <Field>
            <label>Senha</label>
            <Input type="password" value={password} onChange={(e: React.ChangeEvent<HTMLInputElement>)=>setPassword(e.target.value)} placeholder="••••••" />
          </Field>
          {error && <div style={{color:'var(--danger)', marginTop:6}}>{error}</div>}
          <Btn type="submit">Entrar</Btn>
        </form>
      </Card>
    </Wrap>
  );
}