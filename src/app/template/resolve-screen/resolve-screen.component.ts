import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
@Component({
  selector: 'app-resolve-screen',
  templateUrl: './resolve-screen.component.html',
  styleUrls: ['./resolve-screen.component.css']
})
export class ResolveScreenComponent implements OnInit {

  constructor(private location: Location) {
    this.location.back();
   }

  ngOnInit(): void {
  }

}
