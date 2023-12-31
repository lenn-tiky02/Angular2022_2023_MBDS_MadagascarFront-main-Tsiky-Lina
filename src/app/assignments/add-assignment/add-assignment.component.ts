import { Component, OnInit } from '@angular/core';
import { Assignment } from '../assignment.model';
import { AssignmentsService } from 'src/app/shared/assignments.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SpinnerService } from 'src/app/shared/spinner.service';
import { MatieresService } from 'src/app/shared/matieres.service';
import { Pagination } from 'src/app/helper/pagination.model';
import { Matiere } from 'src/app/matieres/matieres.model';
import { Student } from 'src/app/students/student.model';
import { StudentsService } from 'src/app/shared/students.service';

@Component({
  selector: 'app-add-assignment',
  templateUrl: './add-assignment.component.html',
  styleUrls: ['./add-assignment.component.css']
})
export class AddAssignmentComponent implements OnInit {

  // champs du formulaire
  matieres:Pagination<Matiere> = new Pagination<Matiere>();
  students:Pagination<Student> = new Pagination<Student>();
  nomDevoir = "";
  dateDeRendu!: Date;
  idMatiere='';
  idStudent='';

  constructor(
    private assignmentsService: AssignmentsService,
    private router: Router,
    private snackBar: MatSnackBar,
    private spinnerService: SpinnerService,
    private matiereService:MatieresService,
    private studentService:StudentsService
  ) { }
  ngOnInit(): void {
    this.matiereService.getAllMatieres().subscribe(
      (data:Pagination<Matiere>)=>{
        this.matieres = data;
      }
    );
    this.studentService.getAllStudents().subscribe(
      (data:Pagination<Student>)=>{
        this.students = data;
      }
    );
    
  }

  onSubmit(event: any) {
    this.spinnerService.show();
    // On vérifie que les champs ne sont pas vides
    if (this.nomDevoir === "") return;
    if (this.dateDeRendu === undefined) return;

    let nouvelAssignment = new Assignment();
    // génération d'id, plus tard ce sera fait dans la BD
    nouvelAssignment.id = Math.abs(Math.random() * 1000000000000000);
    nouvelAssignment.nom = this.nomDevoir;
    nouvelAssignment.dateDeRendu = this.dateDeRendu;
    nouvelAssignment.rendu = false;
    nouvelAssignment.idAuthor= this.idStudent;
    nouvelAssignment.idMatiere = this.idMatiere;

    // on demande au service d'ajouter l'assignment
    this.assignmentsService.addAssignment(nouvelAssignment)
      .subscribe(message => {
        console.log(message);
        this.spinnerService.hide();
        this.openSnackBar('Assignment ajouté avec succès! ', 'x');
        // On va naviguer vers la page d'accueil pour afficher la liste
        // des assignments
        this.router.navigate(["/assignments"]);

      });
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000, // Durée d'affichage du Snackbar en millisecondes
      verticalPosition: 'top', // Position verticale (top, bottom)
      horizontalPosition: 'start', // Position horizontale (start, center, end, left, right)
    });
  }
}
