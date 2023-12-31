import { Component } from '@angular/core';
import { AuthService } from './shared/auth.service';
import { NavigationEnd, Router } from '@angular/router';
import { AssignmentsService } from './shared/assignments.service';
import { SpinnerService } from './shared/spinner.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Application de gestion de devoirs à rendre';
  labelConnexion = "Se connecter";
  nom:string = "";
  currentRoute:string = "";

  // Variables pour la Toolbar
  toolbarTitle = 'Assignments App';

  // Variables pour la SideBar
  isSidenavOpen = false;

  constructor(private authService:AuthService, 
              private router:Router,
              private assigmmentsService:AssignmentsService,
              public spinnerService: SpinnerService) {

    router.events.subscribe(event => {
      if(event instanceof NavigationEnd) {
        console.log(event.url);
        this.currentRoute = event.url;
      }
    });
    
    
  }

  toggleSidenav() {
    this.isSidenavOpen = !this.isSidenavOpen;
  }

  login() {
    // utilise l'authService pour se connecter
    if(!this.authService.loggedIn) {
      this.router.navigate(['/login'])
    } else {
      this.authService.logOut();
      // et on navigue vers la page d'accueil
      this.router.navigate(["/home"]);
    }
  }

  isLogged() {
    if(this.authService.loggedIn) {
      this.nom = sessionStorage.getItem('username') || '';
      this.labelConnexion="Se déconnecter";
    }else {
      this.labelConnexion = "Se connecter";
    }
    return this.authService.loggedIn;
  }

  creerDonneesDeTest() {
    this.assigmmentsService.peuplerBDavecForkJoin()
    .subscribe(() => {
      console.log("Opération terminée, les 1000 données ont été insérées")

      // on refresh la page pour que la liste apparaisse
      // plusieurs manières de faire....
      window.location.reload();
    });
  }
}
