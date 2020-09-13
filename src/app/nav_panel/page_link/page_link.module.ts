
import { NgModule } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';

import { InAppMenuLinkComponent } from './page_link.component';

@NgModule({
  declarations: [
    InAppMenuLinkComponent
  ],
  imports: [
    BrowserAnimationsModule,
    MatIconModule,
    MatButtonModule,
    RouterModule
  ],
  exports: [
    InAppMenuLinkComponent
  ]
})
export class InAppMenuLinkModule { }
