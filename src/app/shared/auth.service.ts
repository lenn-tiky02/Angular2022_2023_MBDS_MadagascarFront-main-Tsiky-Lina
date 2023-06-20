import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Route, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  loggedIn = false;

  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

  uri_api = `${environment.base_url}/api/users/login`

  // théoriquement, on devrait passer en paramètre le login
  // et le password, cette méthode devrait faire une requête
  // vers un Web Service pour vérifier que c'est ok, renvoyer
  // un token d'authentification JWT etc.
  // elle devrait renvoyer un Observable etc.
  logIn(userName: string, password: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http.post(this.uri_api, { username: userName, password: password }).subscribe(
        (data: any) => {
          sessionStorage.setItem("auth_token", data.token);
          sessionStorage.setItem('username',userName);
          this.loggedIn = true;
          resolve({ message: "Connection réussie" });
          this.router.navigate(['/']);
        }, (err) => {
          this.loggedIn = false;
          sessionStorage.removeItem('auth_token');
          resolve({ message: err.error });
        }
      );
    });

  }

  logOut() {
    sessionStorage.removeItem('auth_token');
    sessionStorage.removeItem('username');
    this.loggedIn = false;
    this.router.navigate(['/']);
  }

  // si on l'utilisait on ferai isAdmin().then(...)
  isAdmin() {
    // Pour le moment, version simplifiée...
    // on suppose qu'on est admin si on est loggué
    const isUserAdminPromise = new Promise((resolve, reject) => {
      this.loggedIn = sessionStorage.getItem("auth_token")!==null;
      resolve(this.loggedIn);
    });

    // on renvoie la promesse qui dit si on est admin ou pas
    return isUserAdminPromise;
  }
}
