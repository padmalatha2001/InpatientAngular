import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RoomtypeDetailsService } from '../roomtype-details.service';

@Component({
  selector: 'app-addpatient',
  templateUrl: './addpatient.component.html',
  styleUrl: './addpatient.component.css'
})
export class AddpatientComponent implements OnInit{
  public details:any;
  public data :any;
  constructor(private patient:FormBuilder,private service:RoomtypeDetailsService,private router:Router){}
  ngOnInit(): void {
    
  }

  public patientForm = this.patient.group({
    // billingdate:["",[Validators.required]],
    bedAllocationId:["",[Validators.required]],
     paidAmount: [
        '',
        [Validators.required, Validators.min(500)]
      ],
    discount: [""],
    paymentStatus: ["", [Validators.required]],
    // pinCode:["",[Validators.required]]
  })
submit()
{
  
  if(this.patientForm.valid)
    {
      this.data=this.patientForm.value;
      alert("adding billing details successfully")
       this.details=JSON.stringify(this.data)
      console.log(this.details);
     this.service.saveBillingdetails(this.details)
      .subscribe(items=>{
        console.log("saved successfully");
        this.router.navigate(['/billing']),
      (error: any)=>console.log("error occured")})
     // this.openSnackBar('Record saved successfully!');
      //this.router.navigate(['/billing']);
    }
     
}
}
