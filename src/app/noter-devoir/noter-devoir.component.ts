
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

@Component({
  selector: 'app-noter-devoir',
  templateUrl: './noter-devoir.component.html',
  styleUrls: ['./noter-devoir.component.css']
})
export class NoterDevoirComponent {
  todo:Assignment[] = [];

  done:Assignment[] = [];

  constructor(private assignmentsService:AssignmentsService) {    
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

    this.assignmentsService.getAssignmentsByRendu(true)
    .subscribe(data => {
      this.todo = data;
      console.log("Données reçues");
    });

    this.assignmentsService.getAssignmentsByRendu(false)
    .subscribe(data => {
      this.done = data;
      console.log("Données reçues");
    });
  }

  drop(event: CdkDragDrop<Assignment[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
    this.ngOnInit();
  }
}
