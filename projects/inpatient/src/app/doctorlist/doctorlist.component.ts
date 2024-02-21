import { Component } from '@angular/core';
import { Doctor } from '../../Model/doctor.model';
import { DoctorService } from '../doctor.service';

@Component({
  selector: 'app-doctorlist',
  templateUrl: './doctorlist.component.html',
  styleUrl: './doctorlist.component.css'
})
export class DoctorlistComponent {
  doctors: Doctor[] = [];
  doctorName:'';
  patientDetails: any[]=[];

  constructor(private doctorService: DoctorService) {
    this.doctorName='';
  }
  ngOnInit(): void {
    this.loadDoctors();
  }

  loadDoctors(): void {
    this.doctorService.getAllDoctors()
      .subscribe(doctors => {
        this.doctors = doctors;
      });
  }

  getPatientsByDoctor():void{
    console.log(this.doctorName)
    this.doctorService.getPatients(this.doctorName).subscribe((patientDetails)=>{
      console.log('Received patient details:', patientDetails);
      this.patientDetails=patientDetails  
    })
  }
}
