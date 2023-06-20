import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AssignmentsService } from 'src/app/shared/assignments.service';
import { Assignment } from '../assignment.model';
import { SpinnerService } from 'src/app/shared/spinner.service';
import { Matiere } from 'src/app/matieres/matieres.model';
import { Student } from 'src/app/students/student.model';
import { Pagination } from 'src/app/helper/pagination.model';
import { MatieresService } from 'src/app/shared/matieres.service';
import { StudentsService } from 'src/app/shared/students.service';
import { MatDialog } from '@angular/material/dialog';
import { ErrorDialogComponent } from 'src/app/component/error-dialog/error-dialog.component';

@Component({
  selector: 'app-edit-assignment',
  templateUrl: './edit-assignment.component.html',
  styleUrls: ['./edit-assignment.component.css'],
})
export class EditAssignmentComponent implements OnInit {
  assignment!: Assignment | undefined;
  // associées aux champs du formulaire
  nomAssignment!: string;
  dateDeRendu!: Date;
  idMatiere!: string;
  idStudent!: string;
  matieres:Pagination<Matiere> = new Pagination<Matiere>();
  students:Pagination<Student> = new Pagination<Student>();
  remarque!:string;
  note!:number|any;

  constructor(
    private assignmentsService: AssignmentsService,
    private route: ActivatedRoute,
    private router: Router,
    private spinnerService: SpinnerService,
    private matiereService:MatieresService,
    private studentService:StudentsService,
    private dialog:MatDialog
  ) { }

  ngOnInit(): void {
    this.getAssignment();
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
  getAssignment() {
    // on récupère l'id dans le snapshot passé par le routeur
    // le "+" force l'id de type string en "number"
    this.route.params.subscribe(params => {
      const id = params['id'];


      // Exemple de récupération des query params (après le ? dans l'url)
      const queryParams = this.route.snapshot.queryParams;
      console.log(queryParams);
      console.log("nom :" + queryParams['nom'])
      console.log("matière :" + queryParams['matiere'])

      // Exemple de récupération du fragment (après le # dans l'url)
      const fragment = this.route.snapshot.fragment;
      console.log("Fragment = " + fragment);

      this.assignmentsService.getAssignment(id)
        .subscribe((assignment) => {
          if (!assignment) return;
          this.assignment = assignment;
          // Pour pré-remplir le formulaire
          this.nomAssignment = assignment.nom;
          this.dateDeRendu = assignment.dateDeRendu;
          this.idMatiere = assignment.idMatiere;
          this.idStudent = assignment.idAuthor;
          this.remarque = assignment.remarque;
          this.note = assignment.note;
        });
    })
  }

  onSaveAssignment() {
    this.spinnerService.show();
    if (!this.assignment) return;

    // on récupère les valeurs dans le formulaire
    this.assignment.nom = this.nomAssignment;
    this.assignment.dateDeRendu = this.dateDeRendu;
    this.assignment.idAuthor = this.idStudent;
    this.assignment.idMatiere = this.idMatiere;
    this.assignment.remarque = this.remarque;
    this.assignment.note = this.note;
    this.assignmentsService
      .updateAssignment(this.assignment)
      .subscribe((message) => {
        console.log(message);

        this.spinnerService.hide();
        // navigation vers la home page
        this.router.navigate(['/assignments']);
      },(err)=>{
        console.log(err);
        this.spinnerService.hide();
        let ref = this.dialog.open(ErrorDialogComponent);
        ref.componentInstance.message= err.error.message;
        ref.afterClosed().subscribe(param=>{
          window.location.reload();
        });
      });
  }
}
