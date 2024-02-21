import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RoomtypeDetailsService } from '../roomtype-details.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
  public email:string="";
  public password:string="";
  public values:any[]=[];
  public details:any;
  showPassword: boolean = false;
  
  click(){

  }
  loginForm!: FormGroup;
 

  constructor(private fb: FormBuilder,private service:RoomtypeDetailsService,private router:Router) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email:this.fb.control('',[Validators.required,Validators.email]),
      password:this.fb.control('',[Validators.required,Validators.minLength(4)])
    });
  }
  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }
  loginData() {
    if (this.loginForm.valid) {
            const email = this.loginForm.value.email;
            const password = this.loginForm.value.password;
            console.log(email);
            console.log(password );
            
            
            this.values = this.loginForm.value;
            this.details = JSON.stringify(this.values);
            // alert("formDetails"+this.details)
            console.log(this.details);
            
        
            this.service.loginDetails(this.details).subscribe(
              (response: any) => {
      
                // alert("response")
                const json=response.JSON
                console.log("Response:", response);
        
                // Check for success or failure based on your server response
                if (response!=null) {
                  // Login successful logic
              if(    response.serviceType=='admin'){
                this.router.navigate(["/admin"])
              }
                  console.log("Login successful");
                  
                } else {
                  // Login failed logic
                  console.log("Login failed");
                  this.router.navigate(["/login"])
                }
              },
              (error: any) => {
                console.error("Error:", error);
        
                // Handle specific error cases if needed
                if (error.status === 401) {
                  console.log("Unauthorized - Incorrect credentials");
                } else {
                  console.log("Login failed - Unexpected error");
                }
              }
            );
          }
        }
 
  }







