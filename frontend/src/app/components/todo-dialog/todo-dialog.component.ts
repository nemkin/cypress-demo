import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TodoDto } from 'src/app/models/todo.model';
import { TodoService } from 'src/app/services/todo.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-todo-dialog',
  templateUrl: './todo-dialog.component.html',
  styleUrls: ['./todo-dialog.component.scss'],
})
export class TodoDialogComponent implements OnInit {
  formControls: Record<keyof TodoDto, FormControl> = {
    title: new FormControl(null, [Validators.required]),
    description: new FormControl(null, [Validators.required]),
    deadline: new FormControl(null, [Validators.required]),
    isCompleted: new FormControl(false, [Validators.required]),
  };
  form = new FormGroup(this.formControls);

  constructor(
    private readonly dialogRef: MatDialogRef<TodoDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { id: string },
    private readonly todoService: TodoService,
    private readonly datepipe: DatePipe
  ) {}

  ngOnInit(): void {
    if (this.data.id) {
      this.todoService.getById(this.data.id).subscribe(
        (data) => this.form.patchValue(data),
        (error) => alert(`Get: ${error.status}\n${error.message}`)
      );
    }
  }

  submit() {
    var result = {
      ...this.form.value,
      deadline: this.datepipe.transform(this.form.value.deadline, 'yyyy-MM-dd'),
    };
    console.log(JSON.stringify(result));
    if (this.data.id) {
      this.todoService.update(this.data.id, result).subscribe(
        (_) => this.close(),
        (error) => alert(`Update: ${error.status}\n${error.message}`)
      );
    } else {
      this.todoService.create(result).subscribe(
        (_) => this.close(),
        (error) => alert(`Create: ${error.status}\n${error.message}`)
      );
    }
  }

  cancel() {
    this.close();
  }

  private close() {
    this.dialogRef.close();
  }
}
