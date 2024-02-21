import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RoomtypeDetailsService } from '../roomtype-details.service';

@Component({
  selector: 'app-billing',
  templateUrl: './billing.component.html',
  styleUrl: './billing.component.css'
})
export class BillingComponent implements OnInit {
  public details:any[]=[];
  public patientdetails:any[]=[];
  items: string[] = [];
  public pageSize:number = 4;
  public currentPage = 1;
  public totalItems = 0;
  public startDate:any;
  public endDate:any;
  public records:any[]=[];
 // public combinedDetails:any[]=[];
 searchForm: FormGroup;
    constructor(private service: RoomtypeDetailsService,private formBuilder:FormBuilder,private route:ActivatedRoute) {
      this.searchForm = this.formBuilder.group({
          startDate: ["", Validators.required],
          endDate:[""]
        })}
  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.startDate = params['startDate'] || null;
      this.endDate = params['endDate'] || null;
    // this.getDetails();
    this.filterData();
  });
}
  filterData() {
    // Use billing service to get data based on start and end dates
    if (this.startDate || this.endDate) {
      this.service.filterDataByDateRange(this.pageSize,this.currentPage,this.startDate, this.endDate).subscribe(
        (data: any[]) => {
          this.records = data;
          this.totalItems =data.length;
        this.records = data.slice((this.currentPage - 1) * this.pageSize, this.currentPage * this.pageSize);
        },
        error => {
          console.error('Error fetching filtered data:', error);
        }
      );
    } else {
      // Load default data
      this.service.getAllDetails(this.pageSize,this.currentPage).subscribe((data)=>{
        this.records=data;
        alert("recoprds"+this.records)
        console.log(this.records);
        this.totalItems =data.length;
        this.records = data.slice((this.currentPage - 1) * this.pageSize, this.currentPage * this.pageSize);
        // this.snackbar.open("your data get successfully",'close',{
        //   duration:3000,
        //   verticalPosition: 'top',
        //   panelClass: ['custom-snackbar'], 
        // })
      });
      
      
    }

  }
onPageChange(event: number): void {
  if (event >= 1 && event <= Math.ceil(this.totalItems / this.pageSize)) {
    this.currentPage = event;
  this.filterData();
  }
  
}
calculateTotalPages(): number {
return Math.ceil(this.totalItems / this.pageSize);
}
isPreviousButtonDisabled(): boolean {
  return this.currentPage === 1;
}

isNextButtonDisabled(): boolean {
  return this.currentPage === Math.ceil(this.totalItems / this.pageSize);
}
}


