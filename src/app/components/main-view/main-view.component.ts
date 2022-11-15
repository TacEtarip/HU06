import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NO_TOKEN_MESSAGE } from '@models/constants';
import { NotificationService } from '@services/notification.service';
import { UserDataService } from '@services/user-data.service';
import { BlockUI, NgBlockUI } from 'ng-block-ui';

@Component({
  selector: 'app-main-view',
  templateUrl: './main-view.component.html',
  styleUrls: ['./main-view.component.scss'],
})
export class MainViewComponent implements OnInit {
  @BlockUI() blockUI: NgBlockUI;

  constructor(
    private activatedRoute: ActivatedRoute,
    private userDataService: UserDataService,
    private notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    this.blockUI.start('Espere...');

    const childrenSnapShotParamMap =
      this.activatedRoute.firstChild.snapshot.paramMap;

    const rawToken = childrenSnapShotParamMap.get('token');
    const refreshToken = childrenSnapShotParamMap.get('refreshToken');
    const userId = childrenSnapShotParamMap.get('userId');

    this.blockUI.stop();

    if (rawToken && refreshToken && userId) {
      this.userDataService.setToken(rawToken);
      this.userDataService.setUser(userId);
      this.userDataService.setRefreshToken(refreshToken);
      return;
    }

    this.notificationService.warn(NO_TOKEN_MESSAGE);
  }
}
