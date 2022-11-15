import { TableDirective } from '../../directives/table.directive';

import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import {
  Component,
  ContentChildren,
  EventEmitter,
  HostListener,
  Input,
  OnChanges,
  OnInit,
  Output,
  QueryList,
  SimpleChanges,
} from '@angular/core';
import { ITableHeader } from '@models/interfaces/ITableHeader';

@Component({
  selector: 'app-table-body',
  templateUrl: './table-body.component.html',
  styleUrls: ['./table-body.component.scss'],
  animations: [
    trigger('tableHeaderExpand', [
      state(
        'open',
        style({
          'border-bottom-right-radius': 0,
          'border-bottom-left-radius': 0,
        })
      ),
      state(
        'closed',
        style({
          'border-bottom-right-radius': 8,
          'border-bottom-left-radius': 8,
        })
      ),
    ]),
    trigger('rotateExpandBtn', [
      state(
        'rotated',
        style({
          transform: 'rotate(-90deg)',
        })
      ),
      state(
        'default',
        style({
          transform: 'rotate(0deg)',
        })
      ),
    ]),
    trigger('inOutAnimation', [
      transition(':enter', [
        style({ transform: 'translateY(-100%)' }),
        animate('0.25s ease-out', style({ transform: 'translateY(0)' })),
      ]),
      transition(':leave', [
        style({ transform: 'translateY(0)' }),
        animate('0.25s ease-out', style({ transform: 'translateY(-100%)' })),
      ]),
    ]),
  ],
})
export class TableBodyComponent implements OnInit, OnChanges {
  @ContentChildren(TableDirective) contents!: QueryList<TableDirective>;

  @Input() loading = true;

  @Input() header: ITableHeader[] = [];

  @Input() list: any[] = [];

  mobileList: any[] = [];

  @Output() clickOnRow = new EventEmitter<any>();

  @Input() rowsClickable = false;

  @Input() showCaseProperty: string;

  @Input() actionProperty: string;

  mobileHeaders: ITableHeader[] = [];

  gridTemplateColumns = '';

  getScreenWidth: number;

  @HostListener('window:resize', ['$event'])
  onWindowResize() {
    this.getScreenWidth = window.innerWidth;
  }

  ngOnInit(): void {
    this.getScreenWidth = window.innerWidth;

    let index = 0;

    for (const h of this.header) {
      this.gridTemplateColumns += `${h.col} `;

      if (
        ((this.showCaseProperty === undefined && index !== 0) ||
          (this.showCaseProperty && h.property !== this.showCaseProperty)) &&
        this.actionProperty &&
        h.property !== this.actionProperty
      ) {
        this.mobileHeaders.push(h);
      }

      index++;
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.list) {
      this.list = (changes.list.currentValue as any[]).map((item) => {
        return { ...item, active: false };
      });
    }
  }

  emitRowClick(row: any) {
    if (this.rowsClickable === false) {
      return;
    }
    this.clickOnRow.emit(row);
  }

  getContent(keyToSearch: string) {
    return this.contents.find((td) => td.key === keyToSearch);
  }
}
