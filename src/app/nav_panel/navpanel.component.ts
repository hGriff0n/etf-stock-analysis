import { Component, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'nav-panel',
  templateUrl: './navpanel.component.html',
  styleUrls: ['./navpanel.component.scss']
})
export class NavPanelComponent {
  @ViewChild('appDrawer') navpanel: ElementRef;
}
