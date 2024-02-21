import { Component } from '@angular/core';
import { Bed } from '../../Model/bed.model';
import { Room } from '../../Model/room.model';
import { BedService } from '../bed.service';
@Component({
  selector: 'app-bed',
  templateUrl: './bed.component.html',
  styleUrl: './bed.component.css'
})
export class BedComponent {

  beds: Bed[] = [];
  rooms: Room[] =[];
  newBed: Bed = { id: null, bedNo: null, status: '', roomId: null };
  showNewRow = false;
  editMode: boolean[] = [];

  constructor(private bedService: BedService) {}

  ngOnInit(): void {
    this.loadBeds();
    this.loadRooms();
  }

  addNewRow(): void {
    console.log('Adding new row');
    this.showNewRow = true;
  }

  toggleEditMode(index: number): void {
    this.editMode[index] = !this.editMode[index];
  }

  isEditMode(index: number): boolean {
    return this.editMode[index];
  }

  submitNewBed(): void {
    this.bedService.saveBed(this.newBed)
      .subscribe(
        () => {
          this.loadBeds();
          this.newBed = { id: null, bedNo: null, status: '', roomId: null };
          this.showNewRow = false;
        },
        error => {
          console.error('Error saving bed:', error);
        }
      );
  }

  loadBeds(): void {
    this.bedService.getAllBeds()
      .subscribe(
        beds => {
          console.log(beds)
          this.beds = beds;
          this.editMode = Array(beds.length).fill(false);
        },
        error => {
          console.error('Error loading beds:', error);
        }
      );
  }

  loadRooms(): void {
    this.bedService.getAllRooms()
      .subscribe(
        rooms => {
          this.rooms = rooms;
        },
        error => {
          console.error('Error loading rooms:', error);
        }
      );
  }

  editBed(index: number): void {
    const bed = this.beds[index];
    if (bed?.id !== undefined && bed?.id !== null) {
      console.log("Editing Bed:", bed);
      this.bedService.updateBed(bed.id, bed)
        .subscribe(
          updatedBed => {
            console.log("Updated Bed:", updatedBed);
            this.loadBeds();
          },
          error => {
            console.error('Error updating bed:', error);
          }
        );
    } else {
      console.error("Invalid bed or bed ID is null");
    }
    this.editMode[index] = false; // Exit edit mode after editing
  }

  deleteBed(id: number | null | undefined): void {
    console.log("Deleting Bed with ID:", id);
    if (id !== null && typeof id !== 'undefined') {
      this.bedService.deleteBed(id)
        .subscribe(
          () => {
            console.log("Bed deleted successfully");
            this.beds = this.beds.filter(bed => bed.id !== id);
            this.loadBeds();
          },
          error => {
            console.error('Error deleting bed:', error);
          }
        );
    }
  }
}
// deleteBed(bedId: any) {
//   this.bedService.deleteBed(bedId).subscribe(()=>{
//     console.log("Bed deleted successfully");
//                this.beds = this.beds.filter(bed => bed.id !== bedId);
//            this.loadBeds();
//   })
// }
//}
