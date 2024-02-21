import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Department } from '../Model/department.model';

@Injectable({
  providedIn: 'root'
})
export class DepartmentService {
  private apiUrl = 'http://localhost:8083/department';

  constructor(private http: HttpClient) {}

  getAllDepartments(): Observable<Department[]> {
    return this.http.get<Department[]>( 'http://localhost:8083/department/getAll')
    // return this.http.get<Department[]>(${this.apiUrl}/getAll);
  }

  saveDepartment(department: Department): Observable<Department> {
    return this.http.post<Department>(`http://localhost:8083/department/save`, department);
  }

  updateDepartment(id: number, department: Department): Observable<Department> {
    return this.http.put<Department>(`http://localhost:8083/department/${id}`, department);
  }

  deleteDepartment(id: number): Observable<void> {
    return this.http.delete<void>(`http://localhost:8083/department/deleteById/${id}`);
  }
}
