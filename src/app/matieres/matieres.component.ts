import { Component, OnInit } from '@angular/core';
import { Pagination } from 'src/app/helper/pagination.model';
import { Matiere } from './matieres.model';
import { MatieresService } from '../shared/matieres.service';
import { DataDialog } from '../dialog-data-dialog/data-dialog.model';
import { DialogDataDialogComponent } from '../dialog-data-dialog/dialog-data-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-matieres',
  templateUrl: './matieres.component.html',
  styleUrls: ['./matieres.component.css']
})
export class MatieresComponent implements OnInit{
  data:Pagination<Matiere> = new Pagination<Matiere>();
  displayedColumns:string[] = ['name','matierePicture','profPicture'];
  constructor(
    private matiereService:MatieresService,
    public dialog: MatDialog
  ){}
  ngOnInit(): void {
    this.getMatierePaginated();
  }

  getMatierePaginated(page:number=1,limit:number=10){
    this.matiereService.getMatieres(page,limit).subscribe(
      (data:Pagination<Matiere>)=>{
        this.data = data;
      },(err)=>{
        console.log(err);
      }
    )
  }
  handlePage(event: any) {
   
    let page = event.pageIndex;
    let limit = event.pageSize;
    this.getMatierePaginated(page,limit);
  }
  
  openDialog(matiere: Matiere, isPicMatiere: Boolean) {
    let dataDialog: DataDialog = new DataDialog();
    dataDialog.name = matiere.name;
    if(isPicMatiere){
      dataDialog.picture = matiere.matierePicture;

    }else{
      dataDialog.picture = matiere.profPicture;
    }
    this.dialog.open(DialogDataDialogComponent, { data: dataDialog});
  }
}
