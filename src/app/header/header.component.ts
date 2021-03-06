import { Router } from '@angular/router';
import { AuthService } from './../auth/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  nome = ''

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
    this.authService.getUser()
    .subscribe((user) => {
      this.nome = user.usuario;
    })
  }

  logout() {
    localStorage.removeItem('token');
    this.authService.setUser(null);
    this.router.navigateByUrl('/auth/login');
  }

}
