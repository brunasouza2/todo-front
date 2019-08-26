import { Task } from './../../typings/Task';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  constructor(private http: HttpClient) { }
  url = 'http://localhost:3000/v1/todos';

  getAll(token, userId): Observable<Task[]> {
    const headers = {
      headers: {
        Authorization: token
      }
    }
    return this.http.get<Task[]>(this.url+'?userId='+userId, headers);    
  }

  getById(id: string, token) {
    const headers = {
      headers: {
        Authorization: token
      }
    }
    return this.http.get<Task>(this.url + '/' + id, headers);
  }

  create(todo: Task, token) {
    const headers = {
      headers: {
        Authorization: token
      }
    }
    delete todo._id;
    return this.http.post(this.url, todo, headers);
  }

  update(todo: Task, token) {
    const headers = {
      headers: {
        Authorization: token
      }
    }
    let id = todo._id;
    delete todo._id;
    return this.http.patch(this.url + '/' + id, todo, headers);
  }

  delete(id: number, token) {
    const headers = {
      headers: {
        Authorization: token
      }
    }
    return this.http.delete(this.url + '/' + id, headers);
  }
}
