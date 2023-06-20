import {Component, Inject, OnInit} from '@angular/core';
import {MatDialog, MAT_DIALOG_DATA, MatDialogRef, MatDialogModule} from '@angular/material/dialog';
import { Assignment } from '../assignments/assignment.model';
import { AssignmentsService } from '../shared/assignments.service';
@Component({
  selector: 'app-dialog-noter-devoir',
  templateUrl: './dialog-noter-devoir.component.html',
  styleUrls: ['./dialog-noter-devoir.component.css']
})
export class DialogNoterDevoirComponent implements OnInit{
  noteInitiale!:number;
  constructor(
    public dialogRef: MatDialogRef<DialogNoterDevoirComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Assignment,
    private assignmentService:AssignmentsService
  ) {
  }
  ngOnInit(): void {
    this.noteInitiale = this.data.note;

  }

  onNoClick(): void {
    this.data.note = this.noteInitiale;
    this.dialogRef.close(false);
  }
  
  soumettre(){
    this.data.rendu = !this.data.rendu;
    this.assignmentService.updateAssignment(this.data,true).subscribe(
      data=>{
        this.dialogRef.close(true);
      },error=>{
        this.data.note = this.noteInitiale;
        this.dialogRef.close(false);
      }
    );
  }
}
