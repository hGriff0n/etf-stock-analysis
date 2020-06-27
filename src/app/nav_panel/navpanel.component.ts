import { Component, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'nav-panel',
  templateUrl: './navpanel.component.html',
  styleUrls: ['./navpanel.component.scss']
})
export class NavPanelComponent {
  @ViewChild('appDrawer') navpanel: ElementRef;
  @ViewChild('items') items: ElementRef;

  links = [
    { icon: 'home', text: 'Overview', link: '/overview' },
    { icon: 'attach_money', text: 'Fund', link: '/fund-focus/SPY' },
    { icon: 'table_view', text: 'Holdings', link: '/dash' },
    { icon: 'compare_arrows', text: 'Compare', link: '/compare/SPY/QQQ' },
    { icon: 'settings', text: 'Settings', link: '/overview' },
  ];
}
