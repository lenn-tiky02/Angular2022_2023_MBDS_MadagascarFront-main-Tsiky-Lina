import { Matiere } from 'src/app/matieres/matieres.model';
import { Student } from 'src/app/students/student.model';

export class Assignment {
    _id!: string;
    id!: number;
    nom!: string;
    dateDeRendu!: Date;
    rendu!: boolean;
    idAuthor!:string;
    idMatiere!:string;
    note!:number;
    remarque!:string;
    matiere?:Matiere[];
    auteur?:Student[];
}

