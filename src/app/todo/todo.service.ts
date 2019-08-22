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

  getToken() {
    const user = {
        usuario: 'admin',
        senha: 'admin'
    }
    return this.http.post('http://localhost:3000/v1/login',user);
  }

  getAll(token): Observable<Task[]> {
    const headers = {
      headers: {
        Authorization: token['token']
      }
    }
    console.log('Authorization', headers);
    return this.http.get<Task[]>(this.url, headers);
  }

  getById(id: string) {
    return this.http.get<Task>(this.url + '/' + id);
  }

  create(todo: Task) {
    delete todo._id;
    return this.http.post(this.url, todo);
  }

  update(todo: Task) {
    let id = todo._id;
    delete todo._id;
    return this.http.patch(this.url + '/' + id, todo);
  }

  delete(id: number) {
    return this.http.delete(this.url + '/' + id);
  }
}
