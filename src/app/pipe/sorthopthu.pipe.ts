import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sorthopthu'
})
export class SorthopthuPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    value.sort((a,b)=>{
      if(a.createdEmailDate>b.createdEmailDate) return 1;
      else if(a.createdEmailDate<b.createdEmailDate) return -1;
      else return 0;
   })
return value;
  }

}
