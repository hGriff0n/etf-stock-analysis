import { Component, ViewChild, ElementRef } from '@angular/core';
import { PluginsService, SearchService } from '../core/services';
import { Subject } from 'rxjs';

/*
Navigation side bar for navigating around the application
 */

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

  search_results: Object;
  searchTerm$ = new Subject<string>();

  constructor(private plugins: PluginsService, private search: SearchService) {
    this.search.search(this.searchTerm$)
      .subscribe(results => { this.search_results = results; });
  }
}
