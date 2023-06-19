import { Component, OnInit } from '@angular/core';
import { StudentsService } from '../shared/students.service';
import { Student } from './student.model';
import { Pagination } from 'src/app/helper/pagination.model';
import { MatDialog } from '@angular/material/dialog';
import { DialogDataDialogComponent } from 'src/app/dialog-data-dialog/dialog-data-dialog.component';
import { DataDialog } from '../dialog-data-dialog/data-dialog.model';
@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.css']
})
export class StudentsComponent implements OnInit{
  data:Pagination<Student>=new Pagination<Student>();
  displayedColumns: string[] = [  'name' ,'firstname' ,'class' ,'year' ,'picture'  ];
  constructor(
    private studentsService:StudentsService,
    public dialog: MatDialog
  ){}

  ngOnInit(): void {
    this.getStudentPaginated();
  }

  getStudentPaginated(page:number=1,limit:number=5){
    this.studentsService.getStudents(page,limit).subscribe(
      (data:Pagination<Student>)=>{
        this.data = data;
      },(err)=>{
        console.log(err);
      }
    );
  }

  handlePage(event: any) {
   
    let page = event.pageIndex;
    let limit = event.pageSize;
    this.getStudentPaginated(page,limit);
  }

  openDialog(student: Student) {
    let dataDialog: DataDialog = new DataDialog();
    dataDialog.name = student.name + ' ' + student.firstname;
    dataDialog.picture = student.picture;
    this.dialog.open(DialogDataDialogComponent, { data: dataDialog});
  }
}