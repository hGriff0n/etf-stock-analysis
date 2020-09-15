import { Component, OnInit, Input } from '@angular/core';

// Component which displays a "business-card" for funds
@Component({
  selector: 'app-fundcard',
  templateUrl: './fundcard.component.html',
  styleUrls: ['./fundcard.component.scss']
})
export class FundcardComponent {

  constructor() { }

  // might need to be async
  @Input()
  stock: any;

}
