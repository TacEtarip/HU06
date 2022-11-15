import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FILTERS_OT_LIST, OT_ASSIGNMENT_STATES } from '@models/constants';
import { ICheckboxFiler } from '@models/interfaces/ICheckboxFiler';
import { IMaster } from '@models/interfaces/IMaster';
import { showMenu as ShowMenuFunction } from '@shared/functions';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.scss'],
})
export class FiltersComponent implements OnInit {
  showMenu = ShowMenuFunction;
  listaFiltro = FILTERS_OT_LIST;
  otStates = OT_ASSIGNMENT_STATES;

  @Output()
  currentMenuOnDisplay = new EventEmitter<string>();

  // * Filter zone
  otCodeFilter = { value: '', disabled: false };
  serviceFilter: IMaster & { disabled: false };
  landfallFilter: IMaster & { disabled: false };
  fromDateEtaFilter: string;
  toDateEtaFilter: string;
  fromDateScheduledFilter: string;
  toDateScheduledFilter: string;
  groupFilter: IMaster & { disabled: false };
  userFilter: IMaster & { disabled: false };
  statesFilters: ICheckboxFiler[] = [];
  // *

  constructor() {
    this.statesFilters = this.otStates.map((state) => {
      return { ...state, active: true };
    });
  }

  ngOnInit(): void {}
}
