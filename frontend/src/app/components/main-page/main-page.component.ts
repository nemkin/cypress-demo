import { Component, OnInit } from '@angular/core';
import { TodoViewModel } from 'src/app/models/todo.model';
import { TodoService } from 'src/app/services/todo.service';
import { MatDialog } from '@angular/material/dialog';
import { TodoDialogComponent } from '../todo-dialog/todo-dialog.component';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss'],
})
export class MainPageComponent implements OnInit {
  todos: TodoViewModel[] | undefined;
  columns = ['isCompleted', 'title', 'description', 'deadline'];
  dataSource = new MatTableDataSource<TodoViewModel>();

  constructor(
    private readonly todoService: TodoService,
    private readonly dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.getTodos();
  }

  getTodos(): void {
    this.todoService.getAll().subscribe((todos) => {
      this.todos = todos;
      this.dataSource.data = todos;
    });
  }

  openDialog(id: string | undefined): void {
    const dialogRef = this.dialog.open(TodoDialogComponent, {
      width: '400px',
      height: '450px',
      hasBackdrop: true,
      data: { id },
    });

    dialogRef.afterClosed().subscribe((_) => {
      this.getTodos();
    });
  }
}
