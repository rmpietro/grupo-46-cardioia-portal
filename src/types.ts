export type Risk = 'alto' | 'baixo';
export interface Patient { id: number; name: string; age: number; risk: Risk; lastExam: string; }
export type AppointmentType = 'Consulta' | 'Exame' | 'Retorno';
export interface Appointment { id: number; patientId: number; date: string; type: AppointmentType; notes?: string; }
