import type { Appointment } from '../types';
import { patients, initialAppointments } from './seed';

let _appointments: Appointment[] = [...initialAppointments];

function sleep(ms: number){ return new Promise(r => setTimeout(r, ms)); }

export async function fetchPatients(){
  await sleep(300);
  return patients;
}

export async function fetchAppointments(){
  await sleep(300);
  return _appointments;
}

export async function createAppointment(payload: Omit<Appointment, 'id'>){
  await sleep(300);
  const newItem: Appointment = { id: Math.floor(Math.random()*10000), ...payload };
  _appointments = [newItem, ..._appointments];
  return newItem;
}