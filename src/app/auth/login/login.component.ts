import { Router } from '@angular/router';
import { AuthService } from './../auth.service';
import { Component, OnInit } from '@angular/core';
import { User } from 'src/typings/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user: User = {
    _id: '',
    usuario: '',
    senha: '',
  };

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
  }

  logar() {
    if (this.user.usuario == '' || this.user.senha == '') {
      return this.showNotification('Todos os campos devem ser preenchidos!');
    }

    this.authService.login(this.user.usuario, this.user.senha).subscribe((value: any) => {
      if (value == false) {
        return this.showNotification('Usuario ou senha estão incorretos');
      }

      const element = value['user']
      const token = element['token']
      const user = element['0']


      localStorage.setItem('token', token);
      localStorage.setItem('user', user);

      this.authService.setUser({
        id: user._id,
        usuario: user.usuario,
      }, true);

      this.router.navigateByUrl('/todo');
    })
  }

  showNotification(text) {
    var x = document.getElementById("snackbar");
    x.innerHTML = text;
    x.className = "show";
    setTimeout(function () {
      x.className = x.className.replace("show", "");
    }, 3000);
  }

}
