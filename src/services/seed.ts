import type { Appointment, Patient, AppointmentType } from '../types';

// >>> Ajuste aqui se quiser outro volume
const PATIENT_COUNT = 500;
const APPOINTMENT_COUNT = 200;

// Aceita arrays readonly ou mutáveis
function pick<T>(arr: readonly T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}
function randInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const FIRST_NAMES = ['Ana','Bruno','Carla','Diego','Eva','Felipe','Gustavo','Helena','Igor','Júlia','Karla','Luiz','Marina','Nina','Otávio','Paula','Rafa','Sofia','Thiago','Vera','Yasmin','Caio','Danilo','Elisa','Fábio','Hugo','Isabela','Jonas','Lara','Marcelo','Natália','Olívia','Priscila','Renato','Samuel','Tatiane','Ulisses','Vicente','Wagner'] as const;
const LAST_NAMES  = ['Souza','Lima','Nunes','Alves','Pereira','Oliveira','Santos','Araujo','Ferreira','Gomes','Ribeiro','Almeida','Barbosa','Moraes','Cardoso','Teixeira','Batista','Cavalcante','Dias','Castro','Melo','Rocha','Carvalho','Monteiro'] as const;

export function generatePatients(count = 250): Patient[] {
  const list: Patient[] = [];
  for (let i = 1; i <= count; i++) {
    const name = `${pick(FIRST_NAMES)} ${pick(LAST_NAMES)}`;
    const age = randInt(20, 85);
    const risk: Patient['risk'] = Math.random() < 0.25 ? 'alto' : 'baixo';
    const d = new Date();
    d.setDate(d.getDate() - randInt(0, 90));
    const lastExam = d.toISOString().slice(0, 10);
    list.push({ id: i, name, age, risk, lastExam });
  }
  return list;
}

export function generateAppointments(patients: Patient[], count = 80): Appointment[] {
  // Defina como readonly ou mutável — ambas funcionam com o pick acima
  const TYPES: readonly AppointmentType[] = ['Consulta','Exame','Retorno'];
  // (alternativa mutável)
  // const TYPES: AppointmentType[] = ['Consulta','Exame','Retorno'];

  const out: Appointment[] = [];
  for (let i = 0; i < count; i++) {
    const p = pick(patients);
    const when = new Date();
    when.setDate(when.getDate() + randInt(-5, 30));
    out.push({
      id: 100 + i,
      patientId: p.id,
      date: when.toISOString().slice(0, 10),
      type: pick(TYPES), // agora o TS aceita
      notes: Math.random() < 0.4 ? 'Avaliação de rotina' : '—'
    });
  }
  return out.sort((a, b) => (a.date < b.date ? 1 : -1));
}

// Exports usados pela API fake
export const patients: Patient[] = generatePatients(PATIENT_COUNT);
export const initialAppointments: Appointment[] = generateAppointments(patients, APPOINTMENT_COUNT);
