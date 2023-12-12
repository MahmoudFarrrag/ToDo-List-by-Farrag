import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormsModule } from '@angular/forms';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
  CdkDrag,
  CdkDropList,
} from '@angular/cdk/drag-drop';
import { Column } from 'src/app/models/column.model';
import { Board } from 'src/app/models/board.model';

@Component({
  selector: 'app-main-view',
  templateUrl: './main-view.component.html',
  styleUrls: ['./main-view.component.scss']
})
export class MainViewComponent {
  doneList: any[] = [];

  board: Board = new Board('Test Board', [
    new Column('Ideas', [
      "Some random idea",
      "This is another random idea",
      "build an awesome application"
    ]),
    new Column('Research', [
      "Lorem ipsum",
      "foo",
      "This was in the 'Research' column"
    ]),
    new Column('Todo', ['Get to work', 'Pick up groceries',
      'Go home', 'Fall asleep']),
      new Column('Done', ['Get up', 'Brush teeth', 'Take a shower',
          'Check e-mail', 'Walk dog'])
  ]);

  getRandomColor() {
    // Function to generate a random color
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  taskForm: FormGroup;
  selectedTask: any = null; // Track the currently selected task

  constructor(private fb: FormBuilder) {
    this.taskForm = this.fb.group({
      taskInput: ['', Validators.required]
    });
  }

  ngOnInit( ){}

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
  }



  openTaskInput(column: Column) {
    // Add a new task to the specified column
    const newTask = `New Task ${column.tasks.length + 1}`;
    column.tasks.push(newTask);
  }
}
