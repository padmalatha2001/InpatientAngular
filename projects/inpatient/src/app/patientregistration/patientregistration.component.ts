import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Department } from '../../Model/department.model';
import { Doctor } from '../../Model/doctor.model';
import { Patient } from '../../Model/patient.module';
import { PatientService } from '../patient.service';

@Component({
  selector: 'app-patientregistration',
  templateUrl: './patientregistration.component.html',
  styleUrl: './patientregistration.component.css'
})
export class PatientregistrationComponent implements OnInit {
  registrationForm!: FormGroup;
  doctors: Doctor[] = []; // Array to hold doctors data
  newPatient:Patient={
      patientid: 0,
      firstName: '',
      lastName: '',
      patientGender: '',
      patientAge: 0,
      patientContactNo: 0,
      patientAlternteContactNo: 0,
      doctorBean:{id:0,name:'',departmentId:0}
    }; // Initialize newPatient with default values

  constructor(private fb: FormBuilder, private service:PatientService) { }

  ngOnInit(): void {
    this.initForm();
    this.loadDoctors();
  }

  initForm(): void {
    this.registrationForm = this.fb.group({
      firstName:this.fb.control ('', Validators.required),
      lastName:this.fb.control ('', Validators.required),
      patientAge:this.fb.control ('', Validators.required),
      patientGender:this.fb.control ('', Validators.required),
      patientContactNo:this.fb.control ('', Validators.required),
      patientAlternteContactNo: this.fb.control ('', Validators.required),
      doctorBean: this.fb.control ('', Validators.required)
    });
  }

  loadDoctors(): void {
    this.service.getAlldoctor().subscribe(
      (doctors: Doctor[]) => {
        this.doctors = doctors;
      },
      (error) => {
        console.error('Error loading doctors:', error);
      }
    );
  }

  onSubmit(): void {
    alert("submit")
    if (this.registrationForm) {
    alert("method")
      const formData = this.registrationForm.value;
      alert("method"+formData);
      this.newPatient.firstName = formData.firstName;
      this.newPatient.lastName = formData.lastName;
      this.newPatient.patientAge = formData.patientAge;
      this.newPatient.patientGender = formData.patientGender;
      this.newPatient.patientContactNo = formData.patientContactNo;
      this.newPatient.patientAlternteContactNo = formData.patientAlternteContactNo;
      this.newPatient.doctorBean = formData.doctorBean;

      this.service.savePatient(formData).subscribe((res)=>{
        console.log(res);
      })
    } else {
      console.error('Form is invalid. Cannot submit.');
    }
  }

  // savePatient(patient: Patient): void {
  //   this.service.savePatient(patient).subscribe(
  //     () => {
  //       console.log('Patient saved successfully.');
  //       // Reset form after successful submission
  //       this.registrationForm.reset();
  //       // this.newPatient = new patient(); // Reset newPatient to default values
  //     },
  //     (error) => {
  //       console.error('Error saving patient:', error);
  //     }
  //   );
  // }
}

