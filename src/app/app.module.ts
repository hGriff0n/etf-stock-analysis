import 'reflect-metadata';
import '../polyfills';

import { BrowserModule } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { CoreModule } from './core/core.module';

import { AppRoutingModule } from './app-routing.module';

// NG Translate
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { AppComponent } from './app.component';

import { NavPanelModule } from './nav_panel/navpanel.module';
import { FundFocusModule } from './pages/fund_focus/fund_focus.module';
import { ComparisonModule } from './pages/comparison/comparison.module';
import { OverviewModule } from './pages/overview/overview.module';
import { PortfolioModule } from './pages/portfolio/portfolio.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { ConfigService, ReadOnlyDatabaseService } from './core/services/config/config.service';

// AoT requires an exported function for factories
export function HttpLoaderFactory(http: HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

export function ConfigLoaderFactory(configService: ConfigService) {
  return () => configService.load();
}

export function ReadOnlyDatabaseLoaderFactory(configService: ReadOnlyDatabaseService) {
  return () => configService.load();
}

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    CoreModule,
    AppRoutingModule,
    NavPanelModule,
    FundFocusModule,
    OverviewModule,
    ComparisonModule,
    DashboardModule,
    PortfolioModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
  ],
  providers: [
    ConfigService, {
      provide: APP_INITIALIZER,
      useFactory: ConfigLoaderFactory,
      multi: true,
      deps: [ConfigService]
    },
    ReadOnlyDatabaseService, {
      provide: APP_INITIALIZER,
      useFactory: ReadOnlyDatabaseLoaderFactory,
      multi: true,
      deps: [ReadOnlyDatabaseService]
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
