import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dinhdang'
})
export class DinhdangPipe implements PipeTransform {
  
  transform(value: any, args?: any): any {
    value.sort((a,b)=>{
      if(a.createdDate<b.createdDate) return 1;
      else if(a.createdDate<b.createdDate) return -1;
      else return 0;
   })
return value;
  }

}
