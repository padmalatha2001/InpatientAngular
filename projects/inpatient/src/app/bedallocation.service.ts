import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RoomRegisterService {

  private apiUrl = 'http://localhost:8083';

  constructor(private http:HttpClient) { }

  getDetails():Observable<any[]>
  {
    return this.http.get<any[]>(`${this.apiUrl}/department/getAll`)
  }
 
  getWardNames(medicationId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/ward/getByDepartmentId/${medicationId}`);
  }

  getRoomTypeNames(): Observable<any[]>{
    return this.http.get<any[]>(`${this.apiUrl}/roomType/getAll`);
  }
  getRoomNumbers(selectedWardId: number): Observable<any[]>{
    return this.http.get<any[]>(`${this.apiUrl}/room/getByWardId/${selectedWardId}`);
  }
  getBedNumbers(roomId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/bed/getByRoomId/${roomId}`);
  }
  
}
