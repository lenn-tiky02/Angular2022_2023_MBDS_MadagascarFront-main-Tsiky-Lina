import { Component, OnInit } from '@angular/core';
import { StudentsService } from '../shared/students.service';
import { Student } from './student.model';
import { Pagination } from '../helper/Pagination.model';
import { MatTableModule } from '@angular/material/table';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.css']
})
export class StudentsComponent implements OnInit{
  data:Pagination<Student>=new Pagination<Student>();
  docs:Student[] = [];
  constructor(
    private studentsService:StudentsService
  ){}
  ngOnInit(): void {
    this.getStudentPaginated();
  }

  getStudentPaginated(page:number=1,limit:number=10){
    this.studentsService.getStudents(page,limit).subscribe(
      (data:Pagination<Student>)=>{
        this.data = data;
        this.docs = data.docs;
      },(err)=>{
        console.log(err);
      }
    );
  }

}
