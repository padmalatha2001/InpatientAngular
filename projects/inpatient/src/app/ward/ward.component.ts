import { Component,OnInit  } from '@angular/core';
import {Ward} from '../../Model/ward.model'
import { Department } from "../../Model/department.model";
import { WardService } from "../ward.service"
@Component({
  selector: 'app-ward',
  templateUrl: './ward.component.html',
  styleUrl: './ward.component.css'
})
export class WardComponent implements OnInit {
  wards: Ward[] = [];
 
  departments: Department[] = [];
  newWard: Ward = {
    id: 0,
    name: '',
    capacity: 0,
    availability: 0,
    departmentId : { id: 0, name: '' }
  };
  showNewRow = false;
  editMode: boolean[] = [];

  constructor(private wardService: WardService) {}

  ngOnInit(): void {
    this.loadWards();
    this.loadDepartments();
  }

  loadWards(): void {
    this.wardService.getAllWards()
      .subscribe(wards => {
        this.wards = wards;
        this.editMode = Array(wards.length).fill(false);
      });
  }

  loadDepartments(): void {
    this.wardService.getAllDepartments()
      .subscribe(departments => this.departments = departments);
  }

  toggleEditMode(index: number): void {
    this.editMode[index] = !this.editMode[index];
  }

  isEditMode(index: number): boolean {
    return this.editMode[index];
  }

  saveWard(ward: Ward): void {
    // console.log(ward)
    this.wardService.updateWard(ward)
      .subscribe(() => {
        this.loadWards();
      });
  }

  addNewWard(): void {
    this.showNewRow = true;
  }

  submitNewWard(id: number, name: string, departmentId: Department): void {
    // console.log(departmentId);
    // console.log(id);
    // console.log(name);
    this.wardService.addWard(this.newWard)
      .subscribe(() => {
        this.loadWards();
        this.newWard = {
          id: 0,
          name: '',
          capacity: 0,
          availability: 0,
          departmentId: { id : 0,
           name :''}
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
    this.wardService.deleteWard(id)
      .subscribe(() => {
        this.loadWards();
      });
  }

  getDepartmentName(departmentId: number): string {
    const department = this.departments.find(dep => dep.id === departmentId);
    return department ? department.name : '';
  }
}
