import { Component, Input, OnInit } from '@angular/core';
import { OT_STATES } from '@models/constants';

@Component({
  selector: 'app-register-status',
  templateUrl: './register-status.component.html',
  styleUrls: ['./register-status.component.scss'],
})
export class RegisterStatusComponent implements OnInit {
  @Input() registerStatus: number;

  @Input()
  states = OT_STATES;

  constructor() {}

  ngOnInit(): void {}
}
