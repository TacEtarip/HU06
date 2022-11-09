import { Component, OnInit } from '@angular/core';
import { ES_CALENDAR } from '@models/constants';
import { PrimeNGConfig } from 'primeng/api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(private primengConfig: PrimeNGConfig) {}

  ngOnInit(): void {
    this.primengConfig.setTranslation({
      accept: 'Accept',
      reject: 'Cancel',
      ...ES_CALENDAR,
    });

    this.primengConfig.ripple = true;
  }
}
