import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Matiere } from 'src/app/matieres/matieres.model';

@Injectable({
  providedIn: 'root'
})
export class MatieresService {

  constructor(
    private http:HttpClient
  ) { }
    uri_api = `${environment.base_url}/api/matieres`
  getMatieres(page:number,limit:number):Observable<any>{
    return this.http.get(`${this.uri_api}?page=${page}&limit=${limit}`);
  }

  addMatiere(matiere:Matiere):Observable<any>{
    return this.http.post(this.uri_api,matiere); 
  }

  getAllMatieres():Observable<any>{
    return this.http.get(`${this.uri_api}/all`);
  }
}
