import { Component, OnInit } from '@angular/core';
import { Department } from '../../Model/department.model';
import { DepartmentService } from '../department.service';
@Component({
  selector: 'app-departmentlist',
  templateUrl: './departmentlist.component.html',
  styleUrl: './departmentlist.component.css'
})
export class DepartmentListComponent implements OnInit {

  departments!: Department[];
  newDepartment: Department = { id: null, name: '' };
  showNewRow = false;
  editMode: boolean[] = [];

 

  constructor(private departmentService: DepartmentService) { }

  ngOnInit(): void {
    this.loadDepartments();
  }

   
  addNewRow(): void {
    console.log('Adding new row');
    this.showNewRow = true;
  }


  toggleEditMode(index: number): void {
    // Toggle edit mode for the selected row
    this.editMode[index] = !this.editMode[index];
  }

  isEditMode(index: number): boolean {
    // Check if edit mode is enabled for the selected row
    return this.editMode[index];
  }

  submitNewDepartment(): void {
    this.departmentService.saveDepartment(this.newDepartment)
      .subscribe(
        () => {
          this.loadDepartments();
          this.newDepartment = { id: 0, name: '' }; 
          this.showNewRow = false;
        },
        (error: any) => {
          console.error('Error saving department:', error);
        }
      );
  }
  loadDepartments(): void {
    this.departmentService.getAllDepartments()
      .subscribe(departments => {this.departments = departments;  
        this.editMode = Array(departments.length).fill(false);
      });
  }


  editDepartment(index: number): void {
    const department = this.departments[index];
  if (department?.id !== undefined && department?.id !== null) {
    // Implement edit functionality here
    console.log("Editing Department:", department);

    // Example of calling updateDepartment method from service
    this.departmentService.updateDepartment(department.id, department)
      .subscribe(
        updatedDepartment => {
          console.log("Updated Department:", updatedDepartment);
          // Optionally, reload departments after update
          this.loadDepartments();
        },
        error => {
          console.error('Error updating department:', error);
        }
      );
  } else {
    console.error("Invalid department or department ID is null");
  }
  }

  deleteDepartment(id: number |null | undefined): void {
    // Implement delete functionality here
    console.log("Deleting Department with ID:", id);
    if (id !== null && typeof id!== 'undefined') {

    // Example of calling deleteDepartment method from service
    this.departmentService.deleteDepartment(id)
      .subscribe(
        () => {
          console.log("Department deleted successfully");
        
          // Reload departments after deletion
          this.departments = this.departments.filter(department => department.id !== id);
          
          this.loadDepartments();
          console.log("reloded successfully");
        },
        error => {
          console.error('Error deleting department:', error);
        }
      );
  }
 }
}
