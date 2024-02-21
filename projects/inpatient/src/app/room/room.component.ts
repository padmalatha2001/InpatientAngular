import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Room } from '../../Model/room.model';
import { RoomType } from '../../Model/roomkind.model';
import { Ward } from '../../Model/ward.model';
import { RoomService } from '../room.service';

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrl: './room.component.css'
})
export class RoomComponent implements OnInit {
  public combinedDetails:any[]=[];
  public roomKind:any[]=[];
  roomFormtype!: FormGroup;
  constructor(private service:RoomService,private router:Router){}
  ngOnInit(): void {
    this.getDetails();
  }
  addrooms(){

  }
  roomType(){
    this.service.getAllRoomTypes().subscribe((data)=>{
     this.roomKind=data;
    })
  }
  getDetails()
  {
    this.service.getAllDetails().subscribe((data)=>{
      this.combinedDetails=data;
      console.log(this.combinedDetails);
      
      // alert(this.combinedDetails)
    })
  }
// editroom(c:Room){
//   this.router.navigate(['/editRoom/{c.id}']})
// }

}
