import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RoomRegisterService } from '../bedallocation.service';
@Component({
  selector: 'app-bed-allocation',
  templateUrl: './bed-allocation.component.html',
  styleUrl: './bed-allocation.component.css'
})
export class BedAllocationComponent implements OnInit {
    public medicationNames:any[]=[];
    wardNames: any[] = [];
    roomTypeNames: any[] = [];
    roomNumbers: any[] = [];
    bedNumbers: any[] =[];
     bed: any;
  
    medicationSelected: boolean = false;
  wardSelected: boolean = false;
  roomTypeSelected: boolean = false;
  roomSelected: boolean = false;
  bedSelected: boolean = false;
    form: FormGroup;
  
    constructor(private res:RoomRegisterService,private fb: FormBuilder,private http:HttpClient)
    {
      this.form = this.fb.group({
        department: ['', Validators.required],
        ward: ['', Validators.required],
        roomType: ['', Validators.required],
        room:['', Validators.required],
        bedNo:['', Validators.required],
        patientId:['',Validators.required],
        noOfDays:['',Validators.required],
        startDate:['',Validators.required],
        endDate:['',Validators.required],
        status:['',Validators.required],
        bedId:['',Validators.required],
  
      
        // roomStatus: ['', Validators.required],
        // wardName: ['', Validators.required],
        // wardCapacity: ['', Validators.required],
        // wardAvailability: ['', Validators.required],
        // departmentName: ['', Validators.required],
        
        // Add more dropdowns as needed
      });
    }
  
    ngOnInit(): void{
      this.res.getDetails().subscribe(data=>this.medicationNames=data);
      this.res.getRoomTypeNames().subscribe(data => this.roomTypeNames = data);
      throw new Error ('Method not implemented');
    }
    onMedicationChange() {
      const selectedMedicationId = this.form.get('department')?.value;
      this.res.getWardNames(selectedMedicationId).subscribe(data => this.wardNames = data);
      this.medicationSelected = true;
    }
    onWardChange(){
      const selectedWardId = this.form.get('ward')?.value;
      this.res.getRoomNumbers(selectedWardId).subscribe(data => this.roomNumbers = data);
      this.wardSelected = true;
    }
    onRoomChange()
    {
       const roomId = this.form.get('room')?.value;
       this.res.getBedNumbers(roomId).subscribe(data =>{ this.bedNumbers=data; console.log(this.bedNumbers)});
       this.roomTypeSelected = true;
    }
    onBedChange()
    {
      this.bedSelected = true;
      const bedId =this.form.get('bedNo')?.value;
      console.log(bedId)
    }
      onSubmit() {
        console.log('entered:',this.form.value)
       console.log('bed:',this.form.value.bedNo)
       // if (this.form.valid) {
          const selectedBedId = this.form.value.bedNo;
          console.log('Bed numbers:', this.bedNumbers);
          this.bed= this.bedNumbers.find(bed => bed.id == selectedBedId);
              console.log('bed:',this.bed)
          if(this.bed){
          const formData = {
            patientId: this.form.value.patientId,
            bedId:this.bed,
            noOfDays: this.form.value.noOfDays,
            startDate: this.form.value.startDate,
            endDate: this.form.value.endDate,
            status:this.form.value.status
          };
           console.log('form Data', formData)
          this.http.post('http://localhost:8083/bedAllocation/save', formData)
            .subscribe(response => {
              console.log('Form data sent successfully:', response);
            }, error => {
              console.error('Error sending form data:', error);
            });
        } 
        // }else {
        //   this.form.markAllAsTouched();
        // }
      }
    
    
  }

