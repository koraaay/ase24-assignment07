import { Component, OnInit } from '@angular/core';
import { CdkDragDrop, CdkDrag, CdkDropList, CdkDropListGroup, moveItemInArray } from '@angular/cdk/drag-drop';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { TaskDto } from '../../client/model/taskDto';
import { TasksService } from '../../services/tasks.service';
import { CardComponent} from '../card/card.component';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import {NgForOf} from '@angular/common';

@Component({
  selector: 'task-table',
  standalone: true,
  imports: [MatButtonModule, MatInputModule, CdkDropListGroup, CdkDropList, CdkDrag, ScrollingModule, CardComponent, NgForOf],
  templateUrl: './task-table.component.html',
  styleUrls: ['./task-table.component.css'],
  providers: [TasksService]
})
export class TaskTableComponent implements OnInit {
  filter: string = "";



  TODO: TaskDto[] = [];
  DOING: TaskDto[] = [];
  DONE: TaskDto[] = [];

  constructor(private taskService: TasksService) {}

  ngOnInit() {
    this.update();
  }

  update() {
    this.taskService.getTasks().then(allTasks => {
      const filteredTasks = this.filterTasks(allTasks);
      console.log(filteredTasks);
      this.groupTasks(filteredTasks);
    });
  }

  updateFilter(filterText: string) {
    this.filter = filterText;
    this.update();
  }

  private filterTasks(tasks: TaskDto[]): TaskDto[] {
    if (!this.filter.trim()) {
      return tasks;
    }

    return tasks.filter(task =>
      task.title.includes(this.filter) ||
      task.description.includes(this.filter) ||
      (task.assignee?.name?.includes(this.filter) ?? false)
    );
  }

  private groupTasks(tasks: TaskDto[]) {
    this.TODO = [];
    this.DOING = [];
    this.DONE = [];

    tasks.forEach(task => {
      switch (task.status) {
        case TaskDto.StatusEnum.TODO:
          this.TODO.push(task);
          break;
        case TaskDto.StatusEnum.DOING:
          this.DOING.push(task);
          break;
        case TaskDto.StatusEnum.DONE:
          this.DONE.push(task);
          break;
        default:
          console.error(`Task ${task.id} has an undefined status`);
      }
    });
  }

  drop(event: CdkDragDrop<TaskDto[]>) {
    const targetArray = event.container.data;
    const originArray = event.previousContainer.data;
    const movingTask = originArray[event.previousIndex];

    if (!movingTask?.id) return;

    if (event.previousContainer === event.container) {
      moveItemInArray(targetArray, event.previousIndex, event.currentIndex);
    } else {
      switch (targetArray) {
        case this.TODO:
          movingTask.status = TaskDto.StatusEnum.TODO;
          break;
        case this.DOING:
          movingTask.status = TaskDto.StatusEnum.DOING;
          break;
        case this.DONE:
          movingTask.status = TaskDto.StatusEnum.DONE;
          break;
      }

      this.taskService.updateTask(movingTask.id, movingTask).then(() => this.update());
    }
  }
}
