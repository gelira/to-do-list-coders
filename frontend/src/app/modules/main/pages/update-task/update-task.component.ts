import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Task, taskDefault } from 'src/app/models/task.model';
import { TaskService } from '../../services/task.service';

@Component({
  selector: 'main-update-task',
  templateUrl: './update-task.component.html',
  styleUrls: ['./update-task.component.css']
})
export class UpdateTaskComponent implements OnInit, OnDestroy {
  task: Task = taskDefault;
  sub?: Subscription;

  constructor(
    private taskService: TaskService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    const subRoute: Subscription = this.route.params.subscribe({
      next: data => {
        const id = data['id'] as string;
        this.taskService.retrieveTask(id);
      },
      complete: () => subRoute.unsubscribe(),
    });

    this.sub = this.taskService.task$.subscribe(data => this.task = data);
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }

}
