import { Component, Input, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { Task, taskDefault } from 'src/app/models/task.model';
import { TaskService } from '../../services/task.service';

@Component({
  selector: 'main-task-abstract',
  templateUrl: './task-abstract.component.html',
  styleUrls: ['./task-abstract.component.css']
})
export class TaskAbstractComponent implements OnInit {
  @Input() task: Task = taskDefault;

  constructor(private taskService: TaskService) { }

  ngOnInit(): void {
  }

  dueDateFormat() {
    const prefix = 'Data limite de entrega: ';

    if (!this.task.due_date) {
      return prefix + 'Sem data';
    }

    const dt = new Date(this.task.due_date);
    const day = dt.getDate().toString().padStart(2, '0');
    const month = (dt.getMonth() + 1).toString().padStart(2, '0');
    const year = dt.getFullYear().toString();

    return prefix + `${day}/${month}/${year}`;
  }

  chipClass() {
    return this.task.done ? 'task-done-chip' : 'task-pending-chip';
  }

  chipText() {
    return this.task.done ? 'Concluída' : 'Pendente';
  }

  buttonLabelStatusTask() {
    return this.task.done ? 'Tarefa Pendente' : 'Tarefa Concluída';
  }

  changeStatusTask() {
    const obs = this.taskService.updateTask(this.task._id, { done: !this.task.done });
    const sub: Subscription = obs.subscribe({
      next: () => { },
      complete: () => sub.unsubscribe()
    });
  }

  deleteTask() {
    this.taskService.deleteTask(this.task._id);
  }
}
