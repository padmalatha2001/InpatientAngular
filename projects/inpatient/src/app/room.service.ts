import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { Department } from '../Model/department.model';
import { Room } from '../Model/room.model';

@Injectable({
  providedIn: 'root'
})
export class RoomService {
  

  constructor(private http:HttpClient) { }
  private apiUrl = 'http://localhost:8083/room';
  getAllRoomTypes():Observable<any[]>{
    return this.http.get<any[]>(`http://localhost:8083/roomType/getAll`);
  }
  getAllByWard():Observable<any[]>{
    return this.http.get<any[]>(`http://localhost:8083/ward/getAll`);
  }
  // addRoom(room: Room):Observable<Room>{
  //   return this.http.post<Room>(`http://localhost:8083/room/save`,room);
  // }
  addRoom(roomDetails: any): Observable<any> {
    // Your logic to add room along with department details
    // You can send both roomDetails and department to the backend API
    return this.http.post<any>(`http://localhost:8083/room/save`, { roomDetails});
  }
  updateRoom(room : Room): Observable<Room> {
    return this.http.put<Room>(`http://localhost:8083/room/update/${room.id}`, room);
  }
  deleteRoom(id: number): Observable<void> {
    return this.http.delete<void>(`http://localhost:8083/room/deleteById/${id}`);
      }
  getAllDetails():Observable<any[]>{
   return this.http.get<any[]>(`http://localhost:8083/room/getAll`);
  }
  getAllDepartments(): Observable<Department[]> {
    return this.http.get<Department[]>('http://localhost:8083/department/getAll');
  }
  roomDetailsById(roomId:any[]):Observable<any[]>{
    alert("service "+roomId)
    alert("http://localhost:8083/room/getByRoomId/{id}")
    return this.http.get<any[]>(`http://localhost:8083/room/getByRoomId/${roomId}`).pipe(tap(data=>JSON.stringify("edit data"+data)))
  }
//   billingDetailsById(billId:any[]):Observable<any[]>
// {
//   return this.http.get<any[]>(`http://localhost:8082/billing/fetch/${billId}`)
// }
}
