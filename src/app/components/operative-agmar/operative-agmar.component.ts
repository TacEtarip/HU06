import { Component, OnInit } from '@angular/core';
import { FILTERS_OT_LIST, OT_HEADER_LIST } from '@models/constants';
import { IPlannedWorkOrder } from '@models/interfaces/IPlannedWorkOrder';
import { OperativePlanService } from '@services/operative-plan.service';
import { showMenu as ShowMenuFunction } from '@shared/functions';
import { ConfirmationService } from 'primeng/api';
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
  generatedWorkOrders: IMetric = { name: 'OTs Generadas', value: 10 };
  assignedWorkOrders: IMetric = { name: 'OTs Asignadas', value: 10 };
  pendingWorkOrders: IMetric = { name: 'OTs Pendientes', value: 10 };

  showMenu = ShowMenuFunction;

  plannedOtList: (IPlannedWorkOrder & { spe: boolean })[] = [];

  metricDateRange!: {
    fromDate: string;
    toDate: string;
  };

  // * Filter zone
  otCodeFilter = { value: '', disabled: false };
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
  }

  ngOnInit(): void {}

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
}