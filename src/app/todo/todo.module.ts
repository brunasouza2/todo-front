import { HeaderComponent } from './../header/header.component';
import { NotificationComponent } from './../notification/notification.component';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { TodoComponent } from './todo.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotificationModule } from '../notification/notification.module';

const routes: Routes = [
  {path: '', component : TodoComponent},
];


@NgModule({
  declarations: [TodoComponent, HeaderComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    NotificationModule
  ],
  exports: [TodoComponent]
})
export class TodoModule { }
