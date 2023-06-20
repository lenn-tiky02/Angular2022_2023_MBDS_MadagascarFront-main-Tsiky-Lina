import {Component, Inject} from '@angular/core';
import {MatDialog, MAT_DIALOG_DATA, MatDialogRef, MatDialogModule} from '@angular/material/dialog';
import { Assignment } from '../assignments/assignment.model';
@Component({
  selector: 'app-dialog-noter-devoir',
  templateUrl: './dialog-noter-devoir.component.html',
  styleUrls: ['./dialog-noter-devoir.component.css']
})
export class DialogNoterDevoirComponent {
  constructor(
    public dialogRef: MatDialogRef<DialogNoterDevoirComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Assignment,
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}
