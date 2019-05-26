import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatmember'
})
export class FormatmemberPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    return null;
  }

}
