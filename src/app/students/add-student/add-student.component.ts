import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Student } from '../student.model';
import { StudentsService } from 'src/app/shared/students.service';
import { SpinnerService } from 'src/app/shared/spinner.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-student',
  templateUrl: './add-student.component.html',
  styleUrls: ['./add-student.component.css']
})
export default class AddStudentComponent {
  studentForm! : FormGroup;

  constructor(private formBuilder: FormBuilder,
    private studentsService: StudentsService, 
    private snackBar: MatSnackBar,
    private spinnerService: SpinnerService,
    private router:Router) { }

  ngOnInit() {
    this.studentForm = this.formBuilder.group({
      name: ['', Validators.required],
      firstname: ['', Validators.required],
      class: ['', Validators.required],
      year: ['', Validators.required],
      picture: ['', Validators.required]
    });
  }

  get name() { return this.studentForm.get('name'); }
  get firstname() { return this.studentForm.get('firstname'); }
  get class() { return this.studentForm.get('class'); }
  get year() { return this.studentForm.get('year'); }
  get picture() { return this.studentForm.get('picture'); }

  submitForm() {
    
    if (this.studentForm.valid) {
      const student: Student = this.studentForm.value;
      // You can now use the student object or perform any required actions with the data
      console.log(student);
      
      // on demande au service d'ajouter l'Student
      this.studentsService.addStudent(student)
        .subscribe(message => {
          console.log(message);
          this.spinnerService.hide();
          this.openSnackBar('Student ajouté avec succès! ', 'x');
          // On va naviguer vers la page d'accueil pour afficher la liste
          // des Students
          this.router.navigate(["/students"]);

        });
    } else {
      this.openSnackBar('Veulez vérifier les informations! ', 'x');
      // Handle form validation errors or display error messages
    }
  }  

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000, // Durée d'affichage du Snackbar en millisecondes
      verticalPosition: 'top', // Position verticale (top, bottom)
      horizontalPosition: 'start', // Position horizontale (start, center, end, left, right)
    });
  }
}