import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-direct-bar',
  templateUrl: './direct-bar.component.html',
  styleUrls: ['./direct-bar.component.css']
})
export class DirectBarComponent implements OnInit {
  @Input() topicName: string;
  @Input() threadName: string;
  @Input() threadId: string
  constructor() { }

  ngOnInit() {
    

  }

}
