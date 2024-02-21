import { Component } from '@angular/core';
import { Doctor } from '../../Model/doctor.model';
import { Department } from '../../Model/department.model';
import { DoctorService } from '../doctor.service';
@Component({
  selector: 'app-doctor',
  templateUrl: './doctor.component.html',
  styleUrl: './doctor.component.css'
})
export class DoctorComponent {
    doctors: Doctor[] = [];
    doctorName:'';
    patientDetails: any[]=[];
    departments: Department[] = [];
    newDoctor: Doctor = {
      id: 0,
      name: '',
      departmentId : 0
    };
    showNewRow = false;
    editMode: boolean[] = [];
  
  
  
    name: string = ''; 
    page: number = 1;
    pageSize: number = 10; 
    registrations: any[] = [];
  
    constructor(private doctorService: DoctorService) {
      this.doctorName='';
    }
  
    ngOnInit(): void {
      this.loadDoctors();
      this.loadDepartments();
    }
  
    loadDoctors(): void {
      this.doctorService.getAllDoctors()
        .subscribe(doctors => {
          this.doctors = doctors;
          this.editMode = Array(doctors.length).fill(false);
        });
    }
  
    loadDepartments(): void {
      this.doctorService.getAllDepartments()
        .subscribe(departments => this.departments = departments);
    }
  
    toggleEditMode(index: number): void {
      this.editMode[index] = !this.editMode[index];
    }
  
    isEditMode(index: number): boolean {
      return this.editMode[index];
    }
  
    saveDoctor(doctor: Doctor): void {
      // console.log(ward)
      this.doctorService.updateDoctor(doctor)
        .subscribe(() => {
          this.loadDoctors();
        });
    }
  
    addNewDoctor(): void {
      this.showNewRow = true;
    }
  
    submitNewDoctor(id: number, name: string, departmentId: number): void {
      // console.log(departmentId);
      // console.log(id);
      // console.log(name);
      this.doctorService.addDoctor(this.newDoctor)
        .subscribe(() => {
          this.loadDoctors();
          this.newDoctor = {
            id: 0,
            name: '',
            departmentId: 0
          };
          this.showNewRow = false;
        });
    }
  
    // submitNewWard(id: number, name: string, departmentId: Department): void {
    //   const newWard: Ward = {
    //     id: Number(id),
    //     name: name,
    //     capacity:0,
    //     availability: 0,
    //     departmentId: departmentId
    //   };
    
    //   // Send newWard object to the backend
    // }
  
    deleteWard(id: number): void {
      this.doctorService.deleteDoctor(id)
        .subscribe(() => {
          this.loadDoctors();
        });
    }
  
    getDepartmentName(departmentId: number): string {
      const department = this.departments.find(dep => dep.id === departmentId);
      return department ? department.name : '';
    }
    // getPatientsByDoctor():void{
    //   console.log(this.doctorName)
    //   this.doctorService.getPatients(this.doctorName).subscribe((patientDetails)=>{
    //     console.log('Received patient details:', patientDetails);
    //     this.patientDetails=patientDetails  
    //   })
    // }
  
  
    loadRegistrations() {
      this.doctorService.getRegistrationsByDoctor(this.name, this.page, this.pageSize)
        .subscribe(data => {
          this.registrations = data;
        });
    }
  }
