import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-satellite',
  templateUrl: './satellite.component.html',
  styleUrls: ['./satellite.component.css']
})
export class SatelliteComponent implements OnInit {

  @Input() satellite: string = 'valor inicial';

  constructor() { }

  ngOnInit() {
  }

}
