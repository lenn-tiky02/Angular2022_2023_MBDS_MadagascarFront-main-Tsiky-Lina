import { Component, OnInit } from '@angular/core';
import { StudentsService } from '../shared/students.service';
import { Student } from './student.model';
import { Pagination } from 'src/app/helper/pagination.model';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.css']
})
export class StudentsComponent implements OnInit{
  data:Pagination<Student>=new Pagination<Student>();
  docs:Student[]=[];
  displayedColumns: string[] = [  'name' ,'firstname' ,'class' ,'year' ,'picture'  ];
  constructor(
    private studentsService:StudentsService
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

}
