
# FIAP - Faculdade de Informática e Administração Paulista

<p align="center">
  <a href="https://www.fiap.com.br/">
    <img src="public/logo-fiap.png" alt="FIAP - Faculdade de Informática e Administração Paulista" width="40%">
  </a>
</p>

<br>


# CardioIA Portal – Interface Front-End (React + Vite)

## Grupo 46

## 👨‍🎓 Integrantes

- Gustavo di Primio Valtrick de Almeida - RM559575  
- Iago Cotta Locatelli Guinatti - RM559655  
- Pedro Scofield da Cunha - RM560589  
- Rodrigo Mastropietro - RM560081  
- Tiago de Andrade Bastos - RM560467  

## 👩‍🏫 Professores:
### Tutor(a) 
- <a href="">Leonardo Ruiz Orabona</a>
### Coordenador(a)
- <a href="https://www.linkedin.com/in/profandregodoi/">André Godoi</a>

---

## 📜 Objetivo do Projeto

Criar **apenas a interface** do **CardioIA**, um pequeno portal **responsivo** em **React + Vite** que simula a rotina visual de um sistema de cardiologia.  
A aplicação utiliza **dados simulados** (sem back-end real), **Context API** para autenticação **fake** (token no `localStorage`), **Hooks** (useState, useEffect, useReducer) e **Styled Components** para estilização.

---

## 🧭 Funcionalidades Entregues

- **Autenticação simulada (Context API)** com **JWT fake** salvo no `localStorage`.
- **Proteção de rotas**: somente usuários autenticados acessam o portal.
- **Dashboard (Painel de Métricas)**: contagem de pacientes, agendamentos e pacientes de **alto risco**, além de lista de **últimos agendamentos**.
- **Listagem de Pacientes** proveniente de uma **API fake**/base simulada.
- **Agendamentos**:
  - Formulário com **useReducer** para gerenciar campos (`patientId`, `date`, `type`, `notes`).
  - **useState** para `loading`, `mensagens` e **lista** de agendamentos.
  - Criação de novo agendamento e inclusão imediata na lista.
- **Estilização** com **Styled Components** e layout responsivo.
- **Dados simulados** em memória: **500+ pacientes** e **200+ agendamentos** (ajustável).

---

## 🗂️ Estrutura de Pastas

```
/cardioia-portal
├─ public/                  # arquivos estáticos (ex.: patients.json, logo, etc.)
├─ src/
│  ├─ components/           # NavBar, ProtectedRoute
│  ├─ contexts/             # AuthContext (token fake, isAuthenticated, login/logout)
│  ├─ pages/                # Login, Dashboard, Patients, Appointments
│  ├─ services/             # api (fake), seed (gerador de dados sintéticos)
│  ├─ styles/               # global.ts (Styled Components)
│  ├─ types.(ts|d.ts)       # tipagens (no projeto TS)
│  ├─ App.(tsx|jsx)
│  └─ main.(tsx|jsx)
├─ index.html               # entrada Vite
├─ package.json
├─ tsconfig.json            # apenas na variante TypeScript
└─ README.md
```

> **Observação**: o volume de dados é controlado pelo arquivo `src/services/seed.(js|ts)` através das constantes `PATIENT_COUNT` e `APPOINTMENT_COUNT`.

---

## 🧰 Tecnologias e Bibliotecas

- **React + Vite**
- **React Router DOM** (rotas e redirecionamentos)
- **Context API** (autenticação simulada e proteção de rotas)
- **Hooks**: `useState`, `useEffect`, `useReducer`
- **Styled Components**
- **date-fns** (formatação de datas, quando aplicável)
- **TypeScript** (variante TS do projeto)

---

## ▶️ Como Executar o Projeto (Local)

```bash
# 1) Instalar dependências (caso seja a primeira vez rodando)
npm i

# 2) Executar em modo desenvolvimento
npm run dev

# O Vite abrirá um endereço local, por padrão http://localhost:5173
```

**Login**: utilize **qualquer e-mail/senha**, pois a autenticação é **fake** (token salvo no `localStorage`).  
Para visualizar o token, abra o DevTools do navegador (Application/Armazenamento).

---

## 🔢 Dados Simulados

Os dados são gerados em memória no arquivo `src/services/seed.(js|ts)` (sem back-end real).  
Exemplo (TypeScript):
```ts
export const patients: Patient[] = generatePatients(500);
export const initialAppointments: Appointment[] = generateAppointments(patients, 200);
```
Você pode ajustar o volume de pacientes conforme a necessidade para demonstrar o portal como se fosse um hospital (ex.: 1000 pacientes).

---

## 🧪 Cenários Demonstrados

- **Login e proteção de rotas** (sem token → redireciona para `/login`).
- **Dashboard/Painel** com contagens e últimos agendamentos.
- **Pacientes**: listagem com *badge* de risco (alto/baixo).
- **Agendamentos**: criação de novo agendamento (form com useReducer) e atualização imediata da lista.
- **Responsividade**: layout fluido com Styled Components.

---

## 🎬 Vídeo de Demonstração (até 4 minutos)

- **Link**: 

---

## 📄 Requisitos Atendidos (Checklist)

- [x] React + Vite
- [x] Dados simulados (sem back-end real)
- [x] Autenticação fake (Context API + token no localStorage)
- [x] Proteção de rotas (AuthContext + ProtectedRoute)
- [x] Dashboard (painel de métricas simples)
- [x] Listagem de pacientes
- [x] Formulário de agendamento com **useState** + **useReducer**
- [x] Estilização com **Styled Components**
- [x] Responsividade

---

## 👥 Créditos / Atribuições

- **Template base (Vite + React)** e bibliotecas citadas nas respectivas licenças.
- **FIAP** – Curso, orientação e modelo de boas práticas.

---

## 📋 Licença

![CC BY License](https://mirrors.creativecommons.org/presskit/icons/cc.svg?ref=chooser-v1) ![CC BY License](https://mirrors.creativecommons.org/presskit/icons/by.svg?ref=chooser-v1)

[MODELO GIT FIAP](https://github.com/agodoi/template) por [Fiap](https://fiap.com.br) está licenciado sob [Attribution 4.0 International](http://creativecommons.org/licenses/by/4.0/?ref=chooser-v1).
