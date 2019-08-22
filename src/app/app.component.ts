import { TodoService } from './todo/todo.service';
import { TodoModule } from './todo/todo.module';
import { Task } from './../typings/Task';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'todolist';
  taskList: Task[] = [];
  task: Task = {
    _id: '',
    nome: '',
    done: false,
    userId: 0
  };

  @ViewChild('myInput', {static: false}) myInput: any;

  constructor(private todoService: TodoService){}

  ngOnInit() {
    setTimeout(() => {
      this.myInput.nativeElement.focus();
    }, 10);
    this.listarTask();
  }

  addTask(){
    if(this.task.nome!=''){
      this.todoService.create(this.task).subscribe((result) => {
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
    this.task.userId=0;
  }

  checkTask(item: Task){
    this.taskList.map((itemList: Task)=>{
      if(itemList._id == item._id){
        itemList.done = !itemList.done;
        this.todoService.update(item).subscribe((result) => {
          this.listarTask();
        })  
      }
    })
  }

  listarTask(){
    this.todoService.getToken().subscribe((token) => {
      this.todoService.getAll(token).subscribe((todos) => {
        this.taskList = todos;
      })
    })    
  }
}
