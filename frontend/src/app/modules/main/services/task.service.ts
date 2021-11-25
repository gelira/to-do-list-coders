import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment } from 'src/environments/environment';
import { Task, TaskCreate, TaskUpdate } from 'src/app/models/task.model';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private url = `${environment.apiUrl}/tasks`;

  constructor(private http: HttpClient) { }

  listTasks() {
    return this.http.get<Task[]>(this.url);
  }

  retrieveTasks(id: string) {
    return this.http.get<Task>(`${this.url}/${id}`);
  }

  createTask(task: TaskCreate) {
    return this.http.post<Task>(this.url, task);
  }

  updateTask(id: string, task: TaskUpdate) {
    return this.http.patch<Task>(`${this.url}/${id}`, task);
  }

  deleteTask(id: string) {
    return this.http.delete(`${this.url}/${id}`);
  }
}
