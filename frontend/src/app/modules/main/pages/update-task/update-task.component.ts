import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Task, taskDefault } from 'src/app/models/task.model';
import { TaskService } from '../../services/task.service';

@Component({
  selector: 'main-update-task',
  templateUrl: './update-task.component.html',
  styleUrls: ['./update-task.component.css']
})
export class UpdateTaskComponent implements OnInit {
  task: Task = taskDefault;

  constructor(
    private taskService: TaskService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    const sub: Subscription = this.taskService.task$.subscribe({
      next: data => this.task = data,
      complete: () => sub.unsubscribe()
    });

    const subRoute: Subscription = this.route.params.subscribe({
      next: data => {
        const id = data['id'] as string;
        this.taskService.retrieveTask(id);
      },
      complete: () => subRoute.unsubscribe(),
    });
  }

}
