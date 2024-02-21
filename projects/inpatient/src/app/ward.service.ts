import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Department } from '../Model/department.model';
import { Ward } from '../Model/ward.model';
@Injectable({
    providedIn: 'root'
  })
  export class WardService {
    constructor(private http: HttpClient) {}
    private apiUrl = 'http://localhost:8083/ward';

    getAllDepartments(): Observable<Department[]> {
      return this.http.get<Department[]>('http://localhost:8083/department/getAll');
    }
  
    getAllWards(): Observable<Ward[]> {
        return this.http.get<Ward[]>('http://localhost:8083/ward/getAll');
      }
    
      addWard(ward: Ward): Observable<Ward> {
        return this.http.post<Ward>('http://localhost:8083/ward/save', ward);
      }
    
      updateWard(ward: Ward): Observable<Ward> {
        return this.http.put<Ward>(`http://localhost:8083/ward/update/${ward.id}`, ward);
      }
    
      deleteWard(id: number): Observable<void> {
        return this.http.delete<void>(`http://localhost:8083/ward/deleteById/${id}`);
      }
  }
