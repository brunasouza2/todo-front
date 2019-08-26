import { AuthService } from './../auth.service';
import { User } from './../../../typings/user';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  newUser: User = {
    _id: '',
    usuario: '',
    senha: '',
  };
  confirmSenha = ''

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
  }

  registerUser() {
    if(this.newUser.usuario=='' || this.newUser.senha==''|| this.confirmSenha==''){
      return this.showNotification('Todos os campos devem ser preenchidos!');
    }
    if(this.newUser.senha!=this.confirmSenha) {
      return this.showNotification('Senhas divergentes!');
    }
    this.authService.createAccount(this.newUser.usuario, this.newUser.senha).subscribe((result) => {
      this.showNotification('Usuario registrado com sucesso!');
      console.log(result);
      this.router.navigateByUrl('/auth/login');
    })  
    
  }

  showNotification(text) {
    var x = document.getElementById("snackbar");
    x.innerHTML = text;
    x.className = "show";
    setTimeout(function(){ 
      x.className = x.className.replace("show", ""); 
    }, 3000);
  }

}
