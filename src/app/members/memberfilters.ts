import { Pipe, PipeTransform } from '@angular/core';

import {InterfaceCustomer} from '../model/Customers';

@Pipe({
    name:'alphabet'
})
export class FilterAlphabet implements PipeTransform{
    transform(allCustomers:InterfaceCustomer[]) {
       
        return allCustomers.filter(customer =>customer.activeStatus==true);
    }

}
