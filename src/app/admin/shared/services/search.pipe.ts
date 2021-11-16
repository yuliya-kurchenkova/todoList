import {Pipe, PipeTransform} from "@angular/core";
import {Task} from "../../../shared/interfaces/interfaces";


@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform{
  transform(tasks: Task[], value: any): any {
    return tasks.filter(task => {
      if (value === undefined) {
        return tasks;
      }
      return task.title.includes(value)
    })
 }
}
