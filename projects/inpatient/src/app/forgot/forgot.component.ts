import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RoomtypeDetailsService } from '../roomtype-details.service';

@Component({
  selector: 'app-forgot',
  templateUrl: './forgot.component.html',
  styleUrl: './forgot.component.css'
})
export class ForgotComponent implements OnInit{
  public email:string="";  
  public otp:string="";
  forgotForm!: FormGroup;
  public user: any[] | undefined;
  constructor(private fb: FormBuilder,private service:RoomtypeDetailsService,private router:Router) { 
    this.forgotForm = this.fb.group({
      email: this.fb.control('', [Validators.required, Validators.email]),
    });
  }

  ngOnInit(): void {
     this.generateOTP(); // You might want to remove this line if you don't want to generate OTP on component initialization
  }
  generateOTP() {
    alert("otp")
    // if (this.forgotForm) {
      
      this.email = this.forgotForm.get("email")?.value;
      alert("email"+this.email)
      this.service.sendOtp(this.email).subscribe(
        (response) => {
          this.user = response;
          alert("OTP sent successfully");
          console.log("OTP sent to email");
          this.router.navigate(['/otp'])
        },
        (error) => {
          console.log("Error sending OTP: ", error);
        }
      );
    // } else {
    //   console.log("Form is invalid");
    // }
  }
  
 
}

