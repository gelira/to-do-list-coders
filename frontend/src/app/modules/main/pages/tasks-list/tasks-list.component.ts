import { Component, OnInit } from '@angular/core';

import { Task } from 'src/app/models/task.model';
import { TaskService } from '../../services/task.service';

@Component({
  selector: 'main-tasks-list',
  templateUrl: './tasks-list.component.html',
  styleUrls: ['./tasks-list.component.css']
})
export class TasksListComponent implements OnInit {
  tasks: Task[] = [];

  constructor(private taskService: TaskService) { }

  ngOnInit(): void {
    const obs = this.taskService.listTasks();
    const sub = obs.subscribe(data => {
      this.tasks = data;
      sub.unsubscribe();
    });
  }
}
