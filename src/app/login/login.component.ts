import { Component, OnInit } from '@angular/core';
import { AuthService } from '../shared/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{
  username!:string;
  password!:string ;
  error!:string;
  constructor(
    private auth:AuthService
  ){}
  ngOnInit(): void {
  }


  login():void{
    this.auth.logIn(this.username,this.password)
    .then((value:any)=>{
      this.error=value.message;
    });
  }
}
