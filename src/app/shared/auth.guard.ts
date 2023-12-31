import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './auth.service';
import { inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NotConnectedComponent } from '../component/not-connected/not-connected.component';

export const authGuard: CanActivateFn = (route, state) => {
  
  // injection par programme (au lieu de le faire dans 
  // le constructeur d'un composant)
  let authService = inject(AuthService);
  let router = inject(Router);
  let dialog = inject(MatDialog);


  // si ça renvoie true, alors, on peut activer la route
  return authService.isAdmin()
  .then(authentifie => {
    if(authentifie) {
      return true;
    } else {
      dialog.open(NotConnectedComponent);
      // et on retourne vers la page d'accueil
      router.navigate(["/login"]);
      return false;
    }
  });
};
