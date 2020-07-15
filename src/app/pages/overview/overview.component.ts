import { Component } from '@angular/core';

/*
Home page for the user

Various "at-a-glance" pieces of information are shown to the user to give them
  a sense of how their portfolio is operating. Either via a set of graphs displaying
  portfolio allocations, a set of user-configured metrics measuring porfolio "fitness",
  or a list of the raw holdings the user has
*/

@Component({
  selector: 'overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss']
})
export class OverviewComponent {
  constructor() {}
}
