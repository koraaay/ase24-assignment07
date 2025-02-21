import {Component} from '@angular/core';
import {TaskTableComponent} from "./components/task-table/task-table.component";
import {ToolbarComponent} from './components/toolbar/toolbar.component';

@Component({
  selector: 'taskboard-root',
  imports: [
    ToolbarComponent,
    TaskTableComponent
  ],
  templateUrl: './taskboard.component.html',
  styleUrl: './taskboard.component.css'
})
export class TaskboardComponent {
  title = 'TaskBoard Frontend';
}
