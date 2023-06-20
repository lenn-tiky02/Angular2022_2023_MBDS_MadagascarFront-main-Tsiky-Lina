
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
import { Assignment } from 'src/app/assignments/assignment.model';
import { MatDialog } from '@angular/material/dialog';
import { DialogNoterDevoirComponent } from '../dialog-noter-devoir/dialog-noter-devoir.component';
import { Pagination } from 'src/app/helper/pagination.model';

@Component({
  selector: 'app-noter-devoir',
  templateUrl: './noter-devoir.component.html',
  styleUrls: ['./noter-devoir.component.css']
})
export class NoterDevoirComponent {
  todo:Assignment[] = [];
  dataTodo!:Pagination<Assignment>;
  done:Assignment[] = [];
  dataDone!:Pagination<Assignment>;

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
    .subscribe((data:Pagination<Assignment>) => {
      this.dataTodo = data;
      this.todo = data.docs;
      console.log("Données reçues");
    });

    this.assignmentsService.getAssignmentsByRendu(true)
    .subscribe((data:Pagination<Assignment>) => {
      this.dataDone = data;
      this.done = data.docs;
      console.log("Données reçues");
    });
  }

  drop(event: CdkDragDrop<Assignment[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      let idCom = event.previousContainer.data[event.previousIndex]._id;
      var devoir: Assignment = event.previousContainer.data[event.previousIndex];
      
      console.log(devoir);
      this.openDialog(devoir).then(data=>{
        if(data){
          transferArrayItem(
            event.previousContainer.data,
            event.container.data,
            event.previousIndex,
            event.currentIndex,
          );
        }
      });


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

  openDialog(assignment: Assignment): Promise<any> {
    return new Promise((resolve,reject)=>{
      const dialogRef = this.dialog.open(DialogNoterDevoirComponent, {
        data: assignment,
      });
  
      dialogRef.afterClosed().subscribe(result => {
        resolve(result)
      });
    });

  }

  handlePageTodo(event: any) {
   
    let page = event.pageIndex;
    let limit = event.pageSize;

    this.assignmentsService.getAssignmentsByRendu(false,page,limit)
    .subscribe((data:Pagination<Assignment>) => {
      this.dataTodo = data;
      this.todo = data.docs;
      console.log("Données reçues");
    });


  }

  handlePageDone(event: any) {
   
    let page = event.pageIndex;
    let limit = event.pageSize;



    this.assignmentsService.getAssignmentsByRendu(true,page,limit)
    .subscribe((data:Pagination<Assignment>) => {
      this.dataDone = data;
      this.done = data.docs;
      console.log("Données reçues");
    });
  }
}
