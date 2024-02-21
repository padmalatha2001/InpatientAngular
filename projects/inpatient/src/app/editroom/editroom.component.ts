import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Room } from '../../Model/room.model';
import { RoomService } from '../room.service';
import { Ward } from '../../Model/ward.model';
@Component({
  selector: 'app-editroom',
  templateUrl: './editroom.component.html',
  styleUrl: './editroom.component.css'
})
export class EditroomComponent implements OnInit {
  details: any = {};
  data: any = {};
  roomForm!: FormGroup; // Initialize roomForm as a FormGroup
  rooms: any;
  wards: any;
  departments: any;
  roomType: any;
  ward: any;
  public id:any;
  
  

  constructor(
    private fb: FormBuilder, // Renamed 'room' to 'formBuilder'
    private service: RoomService,
    private router: Router,
    private http: HttpClient,
    private route: ActivatedRoute // Renamed 'ref' to 'route'
  ) {
    this.loadRooms();
    this.loadWards();
    this.loadDepartments();
  }

  ngOnInit(): void {
    this.roomForm = this.fb.group({
      roomNo:this.fb.control([Validators.required]),
      roomSharing:this.fb.control([Validators.required]),
      roomPrice:this.fb.control([Validators.required]),
      roomTypeId: [ [Validators.required]], 
      wardId:[Validators.required]
    });

    this.id = this.route.snapshot.paramMap.get('id'); // Renamed 'ref' to 'route'
    this.getRoomdetails(this.id);
   // alert("details:"+JSON.stringify(this.details))
    
  }

  getRoomdetails(roomId: any) {
    // alert("get")
    this.service.roomDetailsById(roomId).subscribe((data) => {
      // alert("data"+JSON.stringify(data))
      this.details = data;
      this.roomForm.patchValue(this.details); // Patch form values with fetched details
    });
  }

  loadRooms(): void {
    this.service.getAllRoomTypes().subscribe((res: any) => {
      console.log(res)
      this.rooms = res;
      console.log(this.rooms);
    });
  }

  loadWards(): void {
    this.service.getAllByWard().subscribe((response: any) => {
      console.log(response);
      this.wards = response;
      console.log(this.wards);
    });
  }

  loadDepartments(): void {
    this.service.getAllDepartments().subscribe((result: any) => {
      console.log(result);
      this.departments = result;
      console.log(this.departments);
    })
  }

  submit() {
    // alert("edit values "+this.details)
    const roomTypeId = this.roomForm.value.roomTypeId;
    console.log('room id', roomTypeId);
    this.roomType = this.rooms.find((roomType: { id: any; }) => roomType.id == roomTypeId);
    console.log(this.roomType);
    const wardId = this.roomForm.value.wardId;
    console.log('ward id', wardId);
    this.ward = this.wards.find((ward: { id: any; }) => ward.id == wardId);
    console.log(this.ward);
    const roomId = this.route.snapshot.paramMap.get('id'); // Get the ID of the room being edited
    const formData = {
      id: roomId, // Pass the ID of the room being edited
      roomNo: this.roomForm.value.roomNo,
      roomSharing: this.roomForm.value.roomSharing,
      roomPrice: this.roomForm.value.roomPrice,
      roomTypeId: this.roomType,
      wardId: this.ward
    };
  
    // Send a PUT request to update the existing record
    this.http.put('http://localhost:8083/room/update', formData)
      .subscribe(req => {
        console.log(req);
        alert("updated successfully");
        this.router.navigate(["/rooms"]);
        // Handle success or navigate to another page
      } ,
       error => {
        console.error(error);
        // Handle error
      });
  }  
}
