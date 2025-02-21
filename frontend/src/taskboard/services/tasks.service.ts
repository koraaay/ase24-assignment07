import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {firstValueFrom} from 'rxjs';
import {TaskDto} from '../client/model/taskDto';

@Injectable({
  providedIn: 'root'
})
/**
 * Service for backend calls related to tasks.
 */
export class TasksService {
  baseUrl = '/api/tasks';

  constructor(private httpClient: HttpClient) {
  }

  /**
   * Get all tasks.
   */
  public getTasks(): Promise<Array<TaskDto>> {
    return firstValueFrom(this.httpClient.get<Array<TaskDto>>(this.baseUrl));
  }

  public deleteTask(id: string): Promise<void> {
    return firstValueFrom(
      this.httpClient.delete<void>(`${this.baseUrl}/${id}`)
    );
  }

  public updateTask(id: string, updated_task: TaskDto): Promise<TaskDto> {
    return firstValueFrom(
      this.httpClient.put<TaskDto>(`${this.baseUrl}/${id}`,updated_task)
    );
  }
}
