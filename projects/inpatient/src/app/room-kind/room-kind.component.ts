import { Component } from '@angular/core';
import { RoomType } from '../../Model/roomkind.model';
import { RoomKindService } from '../room-kind.service';

@Component({
  selector: 'app-room-kind',
  templateUrl: './room-kind.component.html',
  styleUrl: './room-kind.component.css'
})
export class RoomKindComponent {
    roomTypes!: RoomType[];
    newRoomType: RoomType = { id: null, name: '' };
    showNewRow = false;
    editMode: boolean[] = [];
  
    constructor(private roomTypeService: RoomKindService) { }
  
    ngOnInit(): void {
      this.loadRoomTypes();
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
  
    submitNewRoomType(): void {
      this.roomTypeService.saveRoomType(this.newRoomType)
        .subscribe(
          () => {
            this.loadRoomTypes();
            this.newRoomType = { id: 0, name: '' };
            this.showNewRow = false;
          },
          error => {
            console.error('Error saving room type:', error);
          }
        );
    }
  
    loadRoomTypes(): void {
      this.roomTypeService.getAllRoomTypes()
        .subscribe(roomTypes => {
          this.roomTypes = roomTypes;
          this.editMode = Array(roomTypes.length).fill(false);
        });
    }
  
    editRoomType(index: number): void {
      const roomType = this.roomTypes[index];
      if (roomType?.id !== undefined && roomType?.id !== null) {
        // Implement edit functionality here
        console.log("Editing Room Type:", roomType);
  
        // Example of calling updateRoomType method from service
        this.roomTypeService.updateRoomType(roomType.id, roomType)
          .subscribe(
            updatedRoomType => {
              console.log("Updated Room Type:", updatedRoomType);
              // Optionally, reload room types after update
              this.loadRoomTypes();
            },
            error => {
              console.error('Error updating room type:', error);
            }
          );
      } else {
        console.error("Invalid room type or room type ID is null");
      }
    }
  
    deleteRoomType(id: number | null | undefined): void {
      // Implement delete functionality here
      console.log("Deleting Room Type with ID:", id);
      if (id !== null && typeof id !== 'undefined') {
  
        // Example of calling deleteRoomType method from service
        this.roomTypeService.deleteRoomType(id)
          .subscribe(
            () => {
              console.log("Room Type deleted successfully");
  
              // Reload room types after deletion
              this.roomTypes = this.roomTypes.filter(roomType => roomType.id !== id);
  
              this.loadRoomTypes();
              console.log("Reloaded successfully");
            },
            error => {
              console.error('Error deleting room type:', error);
            }
          );
      }
    }
  }

