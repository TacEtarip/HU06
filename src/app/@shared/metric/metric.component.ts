import { Component, Input } from '@angular/core';
import { IMetric } from '@models/interfaces/IMetric';

@Component({
  selector: 'app-metric',
  templateUrl: './metric.component.html',
  styleUrls: ['./metric.component.scss'],
})
export class MetricComponent {
  @Input() metric: IMetric;
}
