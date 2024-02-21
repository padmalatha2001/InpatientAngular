import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Patient } from '../Model/patient.module';
import { Department } from '../Model/department.model';

@Injectable({
  providedIn: 'root'
})
export class PatientService {
  [x: string]: any;
//   private apiUrl = 'http://localhost:8085/registration';

  constructor(private http: HttpClient) {}

  getAllPatient(): Observable<Patient []> {
    return this.http.get<Patient[]>('http://localhost:8081/registration/getAll');
    // return this.http.get<Patient []>(${this.apiUrl}/getAll);
  }

  savePatient(patient : Patient ): Observable<Patient> {
    return this.http.post<Patient>('http://localhost:8081/registration/save', patient);
  }

  updatePatient(id: number, patient: Patient ): Observable<Patient> {
    return this.http.put<Patient>(`http://localhost:8081/registration/${id}`, patient);
  }
getAlldoctor():Observable<any[]>{
  return this.http.get<any[]>('http://localhost:8081/registration/doctor/getAll')
}
getAllDepartments(): Observable<Department[]> {
  return this.http.get<Department[]>('http://localhost:8083/department/getAll');
}

  }