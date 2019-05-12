import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sortDate'
})
export class SortDatePipe implements PipeTransform {

  transform(value: any, args?: any): any {
       value.sort((a,b)=>{
          if(a.createdDate>b.createdDate) return 1;
          else if(a.createdDate<b.createdDate) return -1;
          else return 0;
       })
    return value;
  }

}
