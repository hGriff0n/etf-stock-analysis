import { Component, Input, Output, EventEmitter } from '@angular/core';

// An individual stock holding for the portfolio page. Expandable to per-brokerage holdings
// Has up/down integration with a planning service (and/or internal count)
// Might want to be able to integrate with brokerages to buy/sell directly (might want to do through plans)
// Popup fundcard on hover
@Component({
  selector: 'app-holding',
  templateUrl: './holding.component.html',
  styleUrls: ['./holding.component.scss']
})
export class StockHoldingComponent {


  @Input()
  symbol = "";
  name = "Ford";

  quantity = 5;

  price = 24.53;

  brokerages = {
    robinhood: {
      gain_loss_pct: 24.2,
      held_shares: 3
    },
    schwab:  {
      gain_loss_pct: 4.2,
      held_shares: 2
    }
  }

  constructor() { }

  onChange(event) {
    this.brokerages[event.broker].held_shares += event.delta;
    this.quantity += event.delta;
    this.change.emit({
      symbol: this.symbol,
      delta: event.delta * this.price
    });
  }

  @Output()
  change: EventEmitter<Record<string, any>> = new EventEmitter<Record<string, any>>();

}
