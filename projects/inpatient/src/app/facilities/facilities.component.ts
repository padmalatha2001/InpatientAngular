import { Component } from '@angular/core';

@Component({
  selector: 'app-facilities',
  templateUrl: './facilities.component.html',
  styleUrl: './facilities.component.css'
})
export class FacilitiesComponent {
  adminVisible: boolean = false;
  receptionVisible: boolean = false;

  toggleAdmin() {
    this.adminVisible = !this.adminVisible;
    this.receptionVisible = false; // Hide reception if admin is toggled
  }

  toggleReception() {
    this.receptionVisible = !this.receptionVisible;
    this.adminVisible = false; // Hide admin if reception is toggled
  }
}
