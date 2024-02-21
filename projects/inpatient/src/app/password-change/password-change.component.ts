import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RoomtypeDetailsService } from '../roomtype-details.service';

@Component({
  selector: 'app-password-change',
  templateUrl: './password-change.component.html',
  styleUrl: './password-change.component.css'
})
export class PasswordChangeComponent implements OnInit  {
 public securitycode:number=0;
 passwordForm!: FormGroup;
  successmessage: any;
 constructor(private fb:FormBuilder,private http:HttpClient,private service:RoomtypeDetailsService){
  this.createForm();
 }
  
  ngOnInit():void{
     this.passwordForm=this.fb.group({
      email:this.fb.control('',[Validators.required,Validators.email]),
      enteredOtp:this.fb.control('',[Validators.required,Validators.pattern(/[6]/)]),
      newpassword:this.fb.control('',[Validators.required]),
      confirmpassword:this.fb.control('',Validators.required)
     })
  }
 
  passwordData(){
    console.log(this.passwordForm.value)
    console.log(this.securitycode);
    if (this.passwordForm?.valid) {
      // Submit logic here
    } else {
      // Form is invalid, handle accordingly
    }
  }
  patternValidator(regex: RegExp, error: any) {
    return (control: any) => {
      if (!control.value) {
        return null;
      }
      const valid = regex.test(control.value);
      return valid ? null : error;
    };
  }
  createForm() {
    this.passwordForm = this.fb.group({
      otp: ['', Validators.required]
    });
  }
  email: string = '';
  enteredOtp: string = '';
  verificationMessage: string = '';
  verifyOtp() {
    alert("otp")
    // if(this.otpForm.valid){
      this.email=this.passwordForm.get('email')?.value;
      alert(this.email)
      
      this.enteredOtp=this.passwordForm.get('enteredOtp')?.value
      alert(this.enteredOtp)
    this.service.verifyOtp(this.email, this.enteredOtp)
      .subscribe(
        (response) => {
          alert(response)
          // this.successmessage=response['message'];
          // Check if the response is a string (success message)
         
          console.log(response);
          
        },
        (error) => {
          console.error('Error verifying OTP:', error);
          // Handle error, show a message, etc.
        }
      );
  }
  reset():void{
    alert("")
  }
}