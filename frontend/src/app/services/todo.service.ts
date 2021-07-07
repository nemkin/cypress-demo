import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { TodoDto, TodoViewModel } from '../models/todo.model';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  private readonly todoBaseUrl = `${environment.apiBaseUrl}/todo`;

  constructor(private readonly http: HttpClient) {}

  public getAll(): Observable<TodoViewModel[]> {
    return this.http.get<TodoViewModel[]>(this.todoBaseUrl);
  }

  public getById(id: string): Observable<TodoViewModel> {
    return this.http.get<TodoViewModel>(`${this.todoBaseUrl}/${id}`);
  }

  public create(todo: TodoDto): Observable<string> {
    console.log(JSON.stringify(todo));
    return this.http.post(this.todoBaseUrl, todo, {
      responseType: 'text',
    });
  }

  public update(id: string, todo: TodoDto): Observable<any> {
    return this.http.put(`${this.todoBaseUrl}/${id}`, todo);
  }

  public deleteAll(): Observable<any> {
    return this.http.delete(this.todoBaseUrl);
  }

  public deleteById(id: string): Observable<any> {
    return this.http.delete(`${this.todoBaseUrl}/${id}`);
  }
}
