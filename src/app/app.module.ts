import { CustomInterceptorService } from './services/custom-interceptor.service';
import { NotificationModule } from './notification/notification.module';
import { AuthGuardGuard } from './auth/auth-guard.guard';
import { AuthModule } from './auth/auth.module';
import { TodoModule } from './todo/todo.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';

const routes : Routes = [
  {path: 'auth', loadChildren: ()=>import('./auth/auth.module').then(m=>m.AuthModule)},
  {path: 'todo', loadChildren: ()=>import('./todo/todo.module').then(m=>m.TodoModule)},
]

@NgModule({
  declarations: [
    AppComponent  
  ],
  imports: [
    BrowserModule,
    FormsModule,
    TodoModule,
    HttpClientModule,
    AuthModule,
    NotificationModule,
    RouterModule.forRoot(routes),
  ],  
  providers: [
    AuthGuardGuard,
    { provide: HTTP_INTERCEPTORS, useClass: CustomInterceptorService, multi: true } 
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
