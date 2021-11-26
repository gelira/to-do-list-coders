import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Task, Priority, taskDefault } from 'src/app/models/task.model';

@Component({
  selector: 'main-form-task',
  templateUrl: './form-task.component.html',
  styleUrls: ['./form-task.component.css']
})
export class FormTaskComponent implements OnInit {
  @Input() task: Task = taskDefault;
  @Output() taskData = new EventEmitter();

  form = this.fb.group({
    title: [''],
    description: [''],
    due_date: [''],
    priority: [Priority.LOW],
    done: [false],
  });

  priorities = [
    {
      name: 'Baixa',
      value: Priority.LOW
    },
    {
      name: 'Média',
      value: Priority.MEDIUM
    },
    {
      name: 'Alta',
      value: Priority.HIGH
    }
  ];

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    if (!this.task._id) {
      return;
    }

    let {
      title,
      description,
      due_date,
      priority,
      done
    } = this.task;

    if (due_date) {
      const dt = new Date(due_date);
      if (isNaN(dt.getTime())) {
        due_date = '';
      }
    }

    this.form.setValue({ title, description, due_date, priority, done });
  }

  onSubmit() {
    let { title, description, due_date, priority, done } = this.form.value;

    const id = this.task._id;

    if (due_date) {
      due_date = typeof due_date === 'string' ? due_date : (due_date as Date).toISOString();
    }

    this.taskData.emit({ id, title, description, priority, done, due_date });
  }
}
