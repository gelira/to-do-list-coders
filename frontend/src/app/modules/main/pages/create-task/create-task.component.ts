import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TaskService } from '../../services/task.service';

@Component({
  selector: 'main-create-task',
  templateUrl: './create-task.component.html',
  styleUrls: ['./create-task.component.css']
})
export class CreateTaskComponent implements OnInit {

  constructor(
    private taskService: TaskService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  createTask(data: any) {
    let {
      title,
      description,
      done,
      due_date,
      priority
    } = data;

    const sub = this.taskService.createTask({ description, done, priority, title, due_date }).subscribe(() => {
      this.router.navigate(['/tasks-list']);
      sub.unsubscribe();
    });
  }
}
