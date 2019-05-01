import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search-condition',
  templateUrl: './search-condition.component.html',
  styleUrls: ['./search-condition.component.css']
})
export class SearchConditionComponent implements OnInit {
  searchForm: FormGroup;
  constructor(
    private router: Router,
  ) { }

  ngOnInit() {
    this.searchForm = new FormGroup({
      key: new FormControl('')
    });
  }

  onSearch() {
    this.router.navigate([`/search/${this.searchForm.get('key').value}`]);
  }
}
