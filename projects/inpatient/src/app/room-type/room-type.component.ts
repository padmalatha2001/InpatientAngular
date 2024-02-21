import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-room-type',
  templateUrl: './room-type.component.html',
  styleUrl: './room-type.component.css'
})
export class RoomTypeComponent {
  constructor(private router:Router){}
  logout(){
    this.router.navigate(["/login"])
  }
}
