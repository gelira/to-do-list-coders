import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Subscription } from 'rxjs';

import { environment } from 'src/environments/environment';
import { Task, TaskCreate, TaskUpdate, taskDefault } from 'src/app/models/task.model';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private url = `${environment.apiUrl}/tasks`;

  private _tasks = new BehaviorSubject<Task[]>([]);
  tasks$ = this._tasks.asObservable();

  private _task = new BehaviorSubject<Task>(taskDefault);
  task$ = this._task.asObservable();

  constructor(private http: HttpClient) { }

  listTasks() {
    const obs = this.http.get<Task[]>(this.url);
    const sub: Subscription = obs.subscribe({
      next: data => this.tasks = data,
      error: () => this.tasks = [],
      complete: () => sub.unsubscribe(),
    });
  }

  retrieveTask(id: string) {
    const task = this.tasks.find(t => t._id === id);

    if (task) {
      this.task = task;
      return;
    }

    const obs = this.http.get<Task>(`${this.url}/${id}`);
    const sub: Subscription = obs.subscribe({
      next: data => this.task = data,
      error: () => this.task = taskDefault,
      complete: () => sub.unsubscribe(),
    });
  }

  createTask(task: TaskCreate) {
    return this.http.post<Task>(this.url, task);
  }

  updateTask(id: string, task: TaskUpdate) {
    return this.http.patch<Task>(`${this.url}/${id}`, task).pipe(
      map(data => {
        this.tasks = this.tasks.map(t => t._id === id ? data : t);
        return data;
      })
    );
  }

  deleteTask(id: string) {
    const obs = this.http.delete(`${this.url}/${id}`);
    const sub: Subscription = obs.subscribe({
      next: () => this.tasks = this.tasks.filter(t => t._id !== id),
      complete: () => sub.unsubscribe(),
    });
  }

  get tasks() {
    return this._tasks.getValue();
  }

  private set tasks(value: Task[]) {
    this._tasks.next(value);
  }

  get task() {
    return this._task.getValue();
  }

  private set task(value: Task) {
    this._task.next(value);
  }
}
