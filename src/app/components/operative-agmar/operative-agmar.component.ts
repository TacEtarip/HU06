import { Component, OnInit } from '@angular/core';
import {
  FILTERS_OT_LIST,
  OT_ASSIGNMENT_STATES,
  OT_HEADER_LIST,
} from '@models/constants';
import { ICheckboxFiler } from '@models/interfaces/ICheckboxFiler';
import { IMaster } from '@models/interfaces/IMaster';
import { IPlannedWorkOrder } from '@models/interfaces/IPlannedWorkOrder';
import { OperativePlanService } from '@services/operative-plan.service';
import { showMenu as ShowMenuFunction } from '@shared/functions';
import { ConfirmationService } from 'primeng/api';
import { OverlayPanel } from 'primeng/overlaypanel';
import { IMetric } from './../../@models/interfaces/IMetric';

@Component({
  selector: 'app-operative-agmar',
  templateUrl: './operative-agmar.component.html',
  styleUrls: ['./operative-agmar.component.scss'],
  providers: [ConfirmationService],
})
export class OperativeAgmarComponent implements OnInit {
  otHeaders = OT_HEADER_LIST;
  loadingTableData = false;
  calendar = false;
  listaFiltro = FILTERS_OT_LIST;
  otStates = OT_ASSIGNMENT_STATES;
  currentMenuOnDisplay = '';
  displayFiltersModal = false;

  generatedWorkOrders: IMetric = { name: 'OTs Generadas', value: 10 };
  assignedWorkOrders: IMetric = { name: 'OTs Asignadas', value: 10 };
  pendingWorkOrders: IMetric = { name: 'OTs Pendientes', value: 10 };
  isWidthLessThanOneThousand = false;

  showMenu = ShowMenuFunction;

  plannedOtList: (IPlannedWorkOrder & { spe: boolean })[] = [];

  metricDateRange!: {
    fromDate: string;
    toDate: string;
  };

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

  constructor(
    private operativePlanService: OperativePlanService,
    private confirmationService: ConfirmationService
  ) {
    const todayToSevenDaysAgo = new Date();
    todayToSevenDaysAgo.setDate(todayToSevenDaysAgo.getDate() - 7);

    const todayThirtyDaysFromToday = new Date();
    todayThirtyDaysFromToday.setDate(todayThirtyDaysFromToday.getDate() + 30);

    this.metricDateRange = {
      fromDate: todayToSevenDaysAgo.toISOString(),
      toDate: todayThirtyDaysFromToday.toISOString(),
    };

    for (const ot of this.operativePlanService.getPlannedOtList()) {
      this.plannedOtList.push({ ...ot, spe: false });
    }

    this.statesFilters = this.otStates.map((state) => {
      return { ...state, active: true };
    });
  }

  ngOnInit(): void {}

  openFilters(filterOverlayPanel: OverlayPanel, event: any) {
    if (window.innerWidth < 780) {
      this.displayFiltersModal = true;
      return;
    }
    this.isWidthLessThanOneThousand = window.innerWidth <= 1000;
    filterOverlayPanel.toggle(event);
  }

  save() {
    this.confirmationService.confirm({
      message: 'Esta seguro que desea guardar la asignación?',
      accept: () => {},
      reject: () => {},
    });
  }

  stopPropagation($event: Event): void {
    $event.stopPropagation();
  }

  changeStateOfSelectedAll(changeEvent: any) {
    const selectedState = changeEvent.target.checked as boolean;
    for (const ot of this.plannedOtList) {
      ot.spe = selectedState;
    }
  }

  getStyleClassFilter() {
    if (this.isWidthLessThanOneThousand) {
      return 'default-filter-overlay';
    }
    if (
      this.currentMenuOnDisplay === 'eta' ||
      this.currentMenuOnDisplay === 'scheduledTime'
    ) {
      return 'calendar-filter';
    }
    return 'regular-filter';
  }
}
