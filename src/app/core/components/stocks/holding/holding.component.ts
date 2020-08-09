import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { UserdataService } from '../../../services';
import { first } from 'rxjs/operators';

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
  constructor(private userdata: UserdataService) {}

  @Input()
  symbol = "";

  brokerages = {}

  held = 0;
  quantity = 0;
  equity = 0;
  price = 0;

  // TODO: This may be better of being generated from above
  // We're going to have to call `getHoldings` anyways to know which ones to instantiate
  ngOnInit() {
    this.userdata.getHoldings(this.symbol).pipe(first()).subscribe(holdings => {
      this.brokerages = {};
      this.quantity = 0;
      this.equity = 0;

      for (let broker of Object.keys(holdings)) {
        this.equity += parseFloat(holdings[broker].equity);

        let quantity = parseFloat(holdings[broker].quantity);
        this.quantity += quantity;
        this.brokerages[broker] = {
          held_shares: quantity,
          initial_shares: quantity
        }
      }

      this.held = this.quantity;
      this.price = this.equity / this.quantity;

      // Send init event to holding list
      this.change.emit({
        type: "init",
        symbol: this.symbol,
        equity: this.equity,
        held: this.quantity,
      });
    });
  }

  onChange(event) {
    this.brokerages[event.broker].held_shares += event.delta;
    this.quantity += event.delta;
    this.equity += this.price * event.delta;

    // Send buy/sell event to holding list
    var type = "buy";
    if (event.delta < 0) {
      type = "sell";
    }
    this.change.emit({
      type: type,
      symbol: this.symbol,
      shares: event.delta,
      price: this.price,
      broker: event.broker
    });
  }

  @Output()
  change: EventEmitter<Record<string, any>> = new EventEmitter<Record<string, any>>();

}
