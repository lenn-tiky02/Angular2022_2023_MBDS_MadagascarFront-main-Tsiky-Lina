import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

import {MatSelectModule} from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatMenuModule } from '@angular/material/menu';
import {MatTooltipModule} from '@angular/material/tooltip';
import { MatDialogModule } from '@angular/material/dialog';

import { AssignmentsComponent } from './assignments/assignments.component';
import { RenduDirective } from './shared/rendu.directive';
import { FormsModule } from '@angular/forms';
import { MatNativeDateModule } from '@angular/material/core';
import { AssignmentDetailComponent } from './assignments/assignment-detail/assignment-detail.component';
import { AddAssignmentComponent } from './assignments/add-assignment/add-assignment.component';
import { Routes, RouterModule } from '@angular/router';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { EditAssignmentComponent } from './assignments/edit-assignment/edit-assignment.component';
import { authGuard } from './shared/auth.guard';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { FooterComponent } from './footer/footer.component';
import { StudentsComponent } from './students/students.component';  
import AddStudentComponent from './students/add-student/add-student.component';
import { ImageUploaderComponent } from './image-uploader/image-uploader.component';
import { NotConnectedComponent } from './component/not-connected/not-connected.component';
import { ConnectedDialogComponent } from './component/connected-dialog/connected-dialog.component';
import { loginGuard } from './shared/login.guard';
import { NoterDevoirComponent } from './noter-devoir/noter-devoir.component';
import { DialogDataDialogComponent } from './dialog-data-dialog/dialog-data-dialog.component';
import { MatieresComponent } from './matieres/matieres.component';
import { AddMatiereComponent } from './matieres/add-matiere/add-matiere.component';
import { ErrorDialogComponent } from './component/error-dialog/error-dialog.component';
const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'students',
    component: StudentsComponent,
    canActivate: [authGuard]
  },
  {
    path: 'students/add',
    component: AddStudentComponent,
    canActivate: [authGuard]
  },
  {
    path:'matieres',
    component:MatieresComponent,
    canActivate:[authGuard]
  },
  {
    path:'matieres/add',
    component:AddMatiereComponent,
    canActivate:[authGuard]
  },
  {
    path: 'assignments',
    component: AssignmentsComponent,
    canActivate: [authGuard]
  },
  {
    path: 'markAssignments',
    component: NoterDevoirComponent,
    canActivate: [authGuard]
  },
  {
    path: 'add',
    component: AddAssignmentComponent,
    canActivate: [authGuard]
  },
  {
    path: 'assignments/:id',
    component: AssignmentDetailComponent,
    canActivate: [authGuard]
  },
  {
    path: 'assignments/:id/edit',
    component: EditAssignmentComponent,
    canActivate: [authGuard]
  },
  {
    path: 'login',
    component: LoginComponent,
    canActivate : [loginGuard]
  }
]
@NgModule({
  declarations: [
    AppComponent,
    AssignmentsComponent,
    RenduDirective,
    AssignmentDetailComponent,
    AddAssignmentComponent,
    EditAssignmentComponent,
    LoginComponent,
    HomeComponent,
    FooterComponent,
    StudentsComponent,
    AddStudentComponent,
    ImageUploaderComponent,
    NotConnectedComponent,
    ConnectedDialogComponent,
    NoterDevoirComponent,
    DialogDataDialogComponent,
    MatieresComponent,
    AddMatiereComponent,
    ErrorDialogComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule, RouterModule.forRoot(routes),
    HttpClientModule,
    MatNativeDateModule, ScrollingModule,
    MatButtonModule, MatIconModule, MatDividerModule, MatDialogModule, 
    MatInputModule, MatFormFieldModule, MatDatepickerModule,
    MatListModule, MatCardModule, MatCheckboxModule, MatSlideToggleModule,
    MatTableModule, MatPaginatorModule, MatSelectModule,
    MatToolbarModule,    MatSidenavModule, 
    MatMenuModule, MatTooltipModule,
    MatSnackBarModule,
    MatProgressSpinnerModule,
    ReactiveFormsModule,
    NgxDropzoneModule,
    DragDropModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
