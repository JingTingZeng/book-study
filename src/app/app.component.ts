import { Component, OnInit } from '@angular/core';
import { DataSource } from './data/dataSource';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'my-app';
  names: string[] = ['Bob', 'Alice', 'Dora'];

  constructor(private data: DataSource) {

  }
  ngOnInit(): void {
    this.data.gettest();
  }
}
