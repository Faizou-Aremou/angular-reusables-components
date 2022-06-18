import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'in'
})
export class InPipe implements PipeTransform {

  transform<T>(attribute: string, object: T): boolean {
    return attribute in object;
  }

}
