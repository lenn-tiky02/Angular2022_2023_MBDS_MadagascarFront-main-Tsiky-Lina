import { Injectable } from '@angular/core';
import { Student } from '../students/student.model';
import { Observable, catchError, forkJoin, map, of, tap } from 'rxjs';
import { LoggingService } from './logging.service';
import { HttpClient } from '@angular/common/http';
import { bdInitialAssignments } from './data';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class StudentsService {

// tableau de devoirs à rendre
Students:Student[] = []
  constructor(private loggingService:LoggingService,
    private http:HttpClient) { }

    //uri_api = 'http://localhost:8010/api/students';
    uri_api = `${environment.base_url}/api/students`;

  getStudents(page:number, limit:number):Observable<any> {
    // normalement on doit envoyer une requête HTTP
    // sur un web service, et ça peut prendre du temps
    // On a donc besoin "d'attendre que les données arrivent".
    // Angular utilise pour cela la notion d'Observable
    return this.http.get<Student[]>(this.uri_api + "?page=" + page + "&limit=" + limit);
    
    // of() permet de créer un Observable qui va
    // contenir les données du tableau Students
    //return of(this.Students);
  }

  getStudent(id:number):Observable<Student|undefined> {
    // Plus tard on utilisera un Web Service et une BD
    return this.http.get<Student|undefined>(`${this.uri_api}/${id}`)
   
    .pipe(
      map(a => {
        if(a) {
          a.name += " MAP MAP MAP";
        }
        return a;
      }),
      tap(a => {
        if(a)
          console.log("ICI DANS LE TAP " + a.firstname)
      }),
      map(a => {
        if(a) {
          a.name += " TOTOTOTO";
        }
        return a;
      }),
      catchError(this.handleError<Student>("Erreur dans le traitement de Student avec id = " + id))
    )
    
    // On va chercher dans le tableau des Students
    // l'Student dont l'id est celui passé en paramètre
    
    //const Student = this.Students.find(a => a.id === id);
    // on retourne cet Student encapsulé dans un Observable
    //return of(Student);
  }

  private handleError<T>(operation: any, result?: T) {
    return (error: any): Observable<T> => {
      console.log(error); // pour afficher dans la console
      console.log(operation + ' a échoué ' + error.message);
 
      return of(result as T);
    }
 };
 
  addStudent(Student:Student):Observable<any> {
    this.loggingService.log(Student.name, 'ajouté');

    // plus tard on utilisera un web service pour l'ajout dans une vraie BD
    return this.http.post<Student>(this.uri_api, Student);
    // on ajoute le devoir au tableau des devoirs
    //this.Students.push(Student);
    // on retourne un message de succès à travers
    // un Observable
    //return of(`Student ${Student.nom} ajouté avec succès`);
  }

  updateStudent(Student:Student):Observable<any> {
    // Normalement : on appelle un web service pour l'update des
    // données
    return this.http.put<Student>(this.uri_api, Student);

    // dans la version tableau : rien à faire (pourquoi ? Parceque Student
    // est déjà un élément du tableau this.Students)

    //this.loggingService.log(Student.nom, 'modifié');

    //return of(`Student ${Student.nom} modifié avec succès`)
  }

  deleteStudent(Student:Student):Observable<any> {
    return this.http.delete(this.uri_api + "/" + Student._id)
      // pour supprimer on passe à la méthode splice
    // l'index de l'Student à supprimer et 
    // le nombre d'éléments à supprimer (ici 1)
    /*
    const index = this.Students.indexOf(Student);
    this.Students.splice(index, 1);

    this.loggingService.log(Student.nom, 'supprimé');

    return of('Student supprimé avec succès')
    */
  }

}
