
import {Component} from '@angular/core';
import {NgFor} from '@angular/common';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
  CdkDrag,
  CdkDropList,
} from '@angular/cdk/drag-drop';
import { AssignmentsService } from '../shared/assignments.service';
import { Assignment } from '../assignments/assignment.model';
import { MatDialog } from '@angular/material/dialog';
import { DialogNoterDevoirComponent } from '../dialog-noter-devoir/dialog-noter-devoir.component';

@Component({
  selector: 'app-noter-devoir',
  templateUrl: './noter-devoir.component.html',
  styleUrls: ['./noter-devoir.component.css']
})
export class NoterDevoirComponent {
  todo:Assignment[] = [];

  done:Assignment[] = [];

  constructor(private assignmentsService:AssignmentsService,
    public dialog: MatDialog) {    
  }
  
  ngOnInit(): void {
    console.log("OnInit Composant instancié et juste avant le rendu HTML (le composant est visible dans la page HTML)");
    // exercice : regarder si il existe des query params
    // page et limit, récupérer leur valeurs si elles existent
    // et les passer à la méthode getAssignments
    // TODO

    this.getAssignments();
  }

  getAssignments() {
    console.log("On va chercher les assignments dans le service");

    this.assignmentsService.getAssignmentsByRendu(false)
    .subscribe(data => {
      this.todo = data;
      console.log("Données reçues");
    });

    this.assignmentsService.getAssignmentsByRendu(true)
    .subscribe(data => {
      this.done = data;
      console.log("Données reçues");
    });
  }

  drop(event: CdkDragDrop<Assignment[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      let idCom = event.previousContainer.data[event.previousIndex]._id;
      console.log('$$$$$$$$')
      var devoir: Assignment = event.previousContainer.data[event.previousIndex];
      
      console.log(devoir);
      this.openDialog(devoir);

      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
      //this.onSaveAssignment(devoir, true, 2);
     
    }
   
  }
  /*
    changeStatusCommande(idCommande: String | null, status: String): void {  
      this.assignmentsService.getAssignment(idCommande).subscribe((data : CommandeAddDetails) => {
        data.statut = status;
        data.idLivreur = this.auth.getUserRoles()[0].roleid;
        data.dateLivraison = new Date();
        this.commandeService.modifierCommande(data).subscribe((data : CommandeAddDetails) => { console.log('Done')});
      });
    }
    */
  onSaveAssignment(assignment: Assignment, rendu:boolean, note:Number) { 
    console.log('assignment');
    console.log(assignment);
    var devoir = new Assignment();
    devoir = assignment;
    devoir.rendu = rendu;
    this.openDialog(devoir);
   /* this.assignmentsService
      .updateAssignment(devoir)
      .subscribe((message) => {
        console.log(message);
        this.ngOnInit();
      });*/
  }

  openDialog(assignment: Assignment): void {
    const dialogRef = this.dialog.open(DialogNoterDevoirComponent, {
      data: assignment,
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      
      console.log(result);
    //  this.assignment = result;
    });
  }
}
