import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Department } from '../../Model/department.model';
import { Room } from '../../Model/room.model';
import { RoomType } from '../../Model/roomkind.model';
import { Ward } from '../../Model/ward.model';
import { RoomService } from '../room.service';

@Component({
  selector: 'app-addroom',
  templateUrl: './addroom.component.html',
  styleUrl: './addroom.component.css'
})
export class AddroomComponent implements OnInit{
  public id:number=0;
 public department?: Department ;
  public details:any;
  public data:any;
  wards:any;
  rooms:any;
  roomTypeId!: Room;
  wardId!:Ward;
  roomService: any;
  wardService: any;
  departments: any;
  d?: Department;
  roomType:any
  ward:any
  constructor(private room:FormBuilder,private service:RoomService,private router:Router,private http:HttpClient){
    this.loadRooms();
    this.loadWards();
    this.loadDepartments();
  }
  ngOnInit():void{
  }

public addRoomForm: FormGroup = this.room.group({
  roomNo:this.room.control(0, [Validators.required]),
  roomSharing:this.room.control(0, [Validators.required]),
  roomPrice:this.room.control(0, [Validators.required]),
  roomTypeId:this.room.control('', [Validators.required]),
  wardId:this.room.control('', [Validators.required]),
  
});


submit(): void {
  console.log("Form values:", this.addRoomForm.value);
  const roomTypeId =this.addRoomForm.value.roomTypeId
  console.log('room id',roomTypeId)
    this.roomType=this.rooms.find((roomType: { id: any; }) =>roomType.id==roomTypeId);
    console.log(this.roomType)
  const wardId=this.addRoomForm.value.wardId
  console.log('ward id',wardId)
  this.ward=this.wards.find((ward: { id: any; }) => ward.id==wardId);
  console.log(this.ward)
  const formData={
    roomNo:this.addRoomForm.value.roomNo,
    roomSharing:this.addRoomForm.value.roomSharing,
    roomPrice:this.addRoomForm.value.roomPrice,
    roomTypeId:this.roomType,
    wardId:this.ward

  };
  this.http.post('http://localhost:8083/room/save',formData)
     .subscribe(req=>{
       console.log(req);
     })
  
}

  loadRooms():void{
  this.service.getAllRoomTypes().subscribe((res:any)=>{
    console.log(res)
   this.rooms=res;
   console.log(this.rooms);
  });

}
loadWards(): void {
  this.service.getAllByWard()
    .subscribe((response:any) => {
      console.log(response);
      this.wards = response;
      console.log(this.wards);
    });
 }
 loadDepartments():void{
  this.service.getAllDepartments().
  subscribe((result:any)=>{
    console.log(result);
    this.departments=result;
    console.log(this.departments);
  })
}
}


