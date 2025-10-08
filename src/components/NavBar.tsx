import styled from 'styled-components';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const Bar = styled.nav`
  display: flex; align-items: center; gap: 16px;
  padding: 12px 20px; background: var(--panel);
  border-bottom: 1px solid #1f2937; position: sticky; top: 0; z-index: 10;
`;
const Brand = styled.div`font-weight: 700; letter-spacing: .5px; color: var(--primary);`;
const Spacer = styled.div`flex: 1;`;
const Btn = styled.button`
  background: transparent; border: 1px solid #334155; color: var(--text);
  padding: 8px 12px; border-radius: 10px; cursor: pointer;
  &:hover{ border-color: var(--primary); }
`;
const NavLink = styled(Link)<{active?: boolean}>`
  padding: 6px 10px; border-radius: 8px;
  background: ${({active}) => active ? '#0b0f1f' : 'transparent'};
  border: 1px solid ${({active}) => active ? '#1f2937' : 'transparent'};
`;

export default function NavBar(){
  const { user, logout } = useAuth();
  const { pathname } = useLocation();
  return (
    <Bar>
      <Brand>CardioIA</Brand>
      <NavLink to="/" active={pathname==='/'}>Dashboard</NavLink>
      <NavLink to="/patients" active={pathname.startsWith('/patients')}>Pacientes</NavLink>
      <NavLink to="/appointments" active={pathname.startsWith('/appointments')}>Agendamentos</NavLink>
      <Spacer />
      {user && <div style={{opacity:.8}}>Olá, {user.name}</div>}
      <Btn onClick={logout}>Sair</Btn>
    </Bar>
  );
}