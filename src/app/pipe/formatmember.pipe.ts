import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatmember'
})
export class FormatmemberPipe implements PipeTransform {

  transform(value: any, search:any): any {
    if(!search){
      return value;
    }else{
        if(search){
          value=value.filter(x=>{
             return x.userName.toString().indexOf(search)!=-1;
          });
        }
    }

    return value;
  }

}
