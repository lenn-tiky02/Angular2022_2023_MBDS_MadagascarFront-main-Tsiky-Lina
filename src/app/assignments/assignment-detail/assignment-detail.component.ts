import { Component, OnInit } from '@angular/core';
import { Assignment } from '../assignment.model';
import { AssignmentsService } from 'src/app/shared/assignments.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/shared/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { ErrorDialogComponent } from 'src/app/component/error-dialog/error-dialog.component';

@Component({
  selector: 'app-assignment-detail',
  templateUrl: './assignment-detail.component.html',
  styleUrls: ['./assignment-detail.component.css']
})
export class AssignmentDetailComponent implements OnInit {
  assignmentTransmis?: Assignment;

  constructor(
    private assignmentsService: AssignmentsService,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    // appelée avant le rendu du composant
    // on va chercher l'id dans l'url active
    // en mettant + on force la conversion en number
    this.route.params.subscribe(params => {
      const id = params['id'];

      console.log("Dans le ngOnInit de detail, id = " + id);

      // on va chercher l'assignment à afficher
      this.assignmentsService.getAssignment(id)
        .subscribe(assignment => {
          this.assignmentTransmis = assignment;
        });
    })

  }

  onDeleteAssignment() {
    if (!this.assignmentTransmis) return;

    console.log("Suppression de l'assignment " + this.assignmentTransmis.nom);

    // on demande au service la suppression de l'assignment
    this.assignmentsService.deleteAssignment(this.assignmentTransmis)
      .subscribe(message => {
        console.log(message);
        // Pour cacher le detail, on met l'assignment à null
        this.assignmentTransmis = undefined;

        // et on navigue vers la page d'accueil
        this.router.navigate(["/home"]);
      }, error => {
        console.log(error);
        let ref = this.dialog.open(ErrorDialogComponent);
        ref.componentInstance.message = error.error;
        ref.afterClosed().subscribe(p=>{
          window.location.reload();
        })
      });

  }

  onAssignmentRendu() {
    if (!this.assignmentTransmis) return;

    this.assignmentTransmis.rendu = true;

    // on appelle le service pour faire l'update
    this.assignmentsService.updateAssignment(this.assignmentTransmis)
      .subscribe(message => {
        console.log(message);
      });
  }

  onEditAssignment() {
    // navigation vers la page edit
    // équivalent à "/assignment/2/edit" par exemple
    // path = "/assignment/" + this.assignmentTransmis?.id + "/edit";
    // this.router.navigate([path]);
    // c'est pour vous montrer la syntaxe avec [...]
    this.router.navigate(["/assignments", this.assignmentTransmis?._id, "edit"],
      {
        queryParams: {
          nom: this.assignmentTransmis?.nom,
          matiere: "Angular"
        },
        fragment: "edition"
      });
  }

  isLogged() {
    // renvoie si on est loggé ou pas
    return this.authService.loggedIn;
  }
}
