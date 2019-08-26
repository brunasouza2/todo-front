import { Router } from '@angular/router';
import { AuthService } from './../auth/auth.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { Task } from 'src/typings/Task';
import { TodoService } from './todo.service';


@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit {

  user: any;

  title = 'todolist';
  taskList: Task[] = [];
  task: Task = {
    _id: '',
    nome: '',
    done: false,
    userId: ''
  };
  token =''
  

  constructor(private todoService: TodoService, private authService: AuthService, private router: Router) { }

  @ViewChild('myInput', {static: false}) myInput: any;

  ngOnInit() {
    const token = localStorage.getItem('token');
    if (token) {
      this.token = token
    }

    this.authService.getUser()
    .subscribe((user) => {
      this.user = user;
    })

    setTimeout(() => {
      this.myInput.nativeElement.focus();
    }, 10);

    this.listarTask();
  }

  addTask(){
    if(this.task.nome!=''){
        this.todoService.create({...this.task, userId: this.user.id}, this.token ).subscribe((result) => {
        console.log('task', this.task);
        //this.todoService.create(this.task, this.token ).subscribe((result) => {
        this.listarTask();
        this.clearTask();
      })  
    }
    this.myInput.nativeElement.focus();
  }

  clearTask(){
    this.task._id='';
    this.task.nome='';
    this.task.done=false;
    this.task.userId='';
  }

  checkTask(item: Task){
    this.taskList.map((itemList: Task)=>{
      if(itemList._id == item._id){
        itemList.done = !itemList.done;
        this.todoService.update(item, this.token ).subscribe((result) => {
          this.listarTask();
        })  
      }
    })
  }

  listarTask(){    
      console.log('listar');
      this.todoService.getAll(this.token, this.user.id).subscribe(
        res => {
          console.log('getAll', res);
          this.taskList = res;
        },
        err => { 
          console.log('ERRADO', err);
          this.router.navigateByUrl('/auth/login');
        }
      );
  }

}
