import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';

// An individual stock holding for the portfolio page. Expandable to per-brokerage holdings
// Has up/down integration with a planning service (and/or internal count)
// Might want to be able to integrate with brokerages to buy/sell directly (might want to do through plans)
// Popup fundcard on hover
@Component({
  selector: 'app-holding',
  templateUrl: './holding.component.html',
  styleUrls: ['./holding.component.scss']
})
export class StockHoldingComponent implements OnInit {


  @Input()
  symbol = "";
  // TODO: These will likely be produced from SecuritydataService
  @Input()
  name = "Ford";
  @Input()
  held = 5;
  @Input()
  price = 24.53;

  quantity = 0;
  equity = 0;

  // TODO: Eventually surface from summation of sub-components?
  brokerages = {
    robinhood: {
      held_shares: 3
    },
    schwab:  {
      held_shares: 2
    }
  }

  ngOnInit() {
    this.quantity = this.held;
    this.equity = this.held * this.price;
    this.change.emit({
      symbol: this.symbol,
      delta: this.equity
    })
  }

  onChange(event) {
    this.brokerages[event.broker].held_shares += event.delta;
    this.quantity += event.delta;
    this.equity += this.price * event.delta;

    this.change.emit({
      symbol: this.symbol,
      delta: event.delta * this.price,
      purchase: event.delta,
    });
  }

  @Output()
  change: EventEmitter<Record<string, any>> = new EventEmitter<Record<string, any>>();

}
