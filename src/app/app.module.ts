import { registerLocaleData } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import localeEs from '@angular/common/locales/es';
import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { environment } from '@env/environment';
import { SharedModule as InternalSharedModule } from '@shared';
import { ErrorInterceptor } from '@shared/interceptors/error.interceptor';
import { BlockUIModule } from 'ng-block-ui';
import { ButtonModule } from 'primeng/button';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { InputSwitchModule } from 'primeng/inputswitch';
import { TppLibRefreshModule, TppLibRefreshService } from 'tpp-lib-refresh';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ExampleComponent } from './components/example/example.component';
import { MainViewComponent } from './components/main-view/main-view.component';
import { OperativeAgmarComponent } from './components/operative-agmar/operative-agmar.component';
import { PrimeModule } from './prime.module';

registerLocaleData(localeEs);

@NgModule({
  declarations: [
    AppComponent,
    ExampleComponent,
    MainViewComponent,
    OperativeAgmarComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    InternalSharedModule,
    PrimeModule,
    InputSwitchModule,
    ButtonModule,
    ConfirmDialogModule,
    BlockUIModule.forRoot(),
    TppLibRefreshModule.forRoot({ url: environment.credentialsEndpoint }),
  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'es-PE' },
    { provide: HTTP_INTERCEPTORS, useClass: TppLibRefreshService, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
