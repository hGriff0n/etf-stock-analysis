import { Component, ViewChild, ElementRef } from '@angular/core';
import { PluginsService } from '../core/services';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import * as op from 'rxjs/operators';

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
  searchTerm = "";

  constructor(private plugins: PluginsService, private router: Router) {
    // this.search.search(this.searchTerm$)
    //   .subscribe(results => { this.router.navigate([`/fund-focus/${result}`]); });
  }

  submit() {
    this.router.navigate([`/fund-focus/${this.searchTerm}`]);
    this.searchTerm = "";
  }
}
