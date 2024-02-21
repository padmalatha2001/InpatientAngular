import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RoomtypeDetailsService } from '../roomtype-details.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {
  public firstName:string='';
  public lastName:string='';
  public dateOfBirth:number=0;
  public email:string='';
  public phoneNumber:number=0;
  public gender:string='';
  public serviceType:string='';
  public password:string='';
  signupForm: FormGroup = new FormGroup({});


  constructor(private fb: FormBuilder,private roomtypeservice:RoomtypeDetailsService,private router:Router) { }

  ngOnInit(): void {
    this.signupForm = this.fb.group({
      firstName: this.fb.control('',[Validators.required]),
      lastName:this.fb.control('',[Validators.required]),
      email: this.fb.control('',[Validators.required,Validators.email]),
      phoneNumber: this.fb.control('',[Validators.required,Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]),
      dateOfBirth: this.fb.control('',[Validators.required]),
      gender: this.fb.control('',[Validators.required]),
      serviceType: this.fb.control('',[Validators.required]),
      password:this.fb.control('',[Validators.required,Validators.minLength(8),Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)
    ])
    });
  }
  signup(){
    console.log(this.signupForm.value);
    if (this.signupForm.valid) {
      alert("Registered successfully");
      this.roomtypeservice.registrationDetails(this.signupForm.value).subscribe(item=>console.log("saved successfully"))
      this.router.navigate(["/login"])
    }
    else{
      alert("not submitted")
    }
  }
 

  }

