import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Matiere } from '../matieres.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatieresService } from 'src/app/shared/matieres.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-matiere',
  templateUrl: './add-matiere.component.html',
  styleUrls: ['./add-matiere.component.css']
})
export class AddMatiereComponent implements OnInit {
  matiereForm!: FormGroup;
  profPictureUrl!: string;
  matierePictureUrl!: string;
  constructor(
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar,
    private matiereService: MatieresService,
    private router: Router
  ) { }
  ngOnInit(): void {
    this.matiereForm = this.formBuilder.group({
      name: ['', Validators.required]
    });
  }

  get name() { return this.matiereForm.get('name'); }

  getMatierePicture(data: Array<string>) {
    if (data.length > 0)
      this.matierePictureUrl = data[0];
  }

  getProfPicture(data: Array<string>) {
    if (data.length > 0)
      this.profPictureUrl = data[0];
  }

  submitForm(): void {
    if (this.matiereForm.valid) {
      const matiere: Matiere = this.matiereForm.value;

      console.log(matiere);
      if (this.profPictureUrl) {
        matiere.profPicture = this.profPictureUrl;
      } else {
        this.openSnackBar('Veulez vérifier les informations! ', 'x');
        return;
      }
      if (this.matierePictureUrl) {
        matiere.matierePicture = this.matierePictureUrl;
      } else {
        this.openSnackBar('Veulez vérifier les informations! ', 'x');
        return;
      }

      this.matiereService.addMatiere(matiere).subscribe(
        (message => {
          console.log(message);
          this.openSnackBar('Matiere ajouté avec success', 'x');
          this.router.navigate(['/matieres']);
        })
      );
    }
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000, // Durée d'affichage du Snackbar en millisecondes
      verticalPosition: 'top', // Position verticale (top, bottom)
      horizontalPosition: 'start', // Position horizontale (start, center, end, left, right)
    });
  }
}
