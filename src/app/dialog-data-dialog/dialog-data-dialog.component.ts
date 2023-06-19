import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DataDialog } from './data-dialog.model';

@Component({
  selector: 'app-dialog-data-dialog',
  templateUrl: './dialog-data-dialog.component.html',
  styleUrls: ['./dialog-data-dialog.component.css']
})
export class DialogDataDialogComponent {

  constructor(@Inject(MAT_DIALOG_DATA) public data: DataDialog) {}
}
