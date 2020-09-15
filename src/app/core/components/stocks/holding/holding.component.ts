import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { UserdataService } from '../../../services';
import { first } from 'rxjs/operators';
import { MatDialogRef, MatDialog } from '@angular/material/dialog';

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
  constructor(private userdata: UserdataService, public dialog: MatDialog) { }

  @Input()
  symbol = "";
  @Input()
  enableContextMenu = true;

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
    let old_held = this.brokerages[event.broker].held_shares;
    this.brokerages[event.broker].held_shares = this.brokerages[event.broker].initial_shares + event.delta;
    this.quantity = this.quantity - old_held + this.brokerages[event.broker].held_shares;
    this.equity += this.price * event.delta;

    // Send buy/sell event to holding list
    var type = "buy";
    if (event.delta < 0) {
      type = "sell";
    }
    this.change.emit({
      type: type,
      symbol: this.symbol,
      old_shares: old_held,
      new_shares: this.brokerages[event.broker].held_shares,
      delta: event.delta,
      price: this.price,
      broker: event.broker,
    });
  }

  // Context Menu
  showContextMenu(event) {
    event.stopPropagation();
    if (!this.enableContextMenu) {
      return;
    }

    const dialogRef = this.dialog.open(HoldingContextMenu, {
      width: '200px'
    });
    dialogRef.afterClosed().subscribe(result => {
      switch (result) {
        case "Sell All": {
          for (let broker of Object.keys(this.brokerages)) {
            this.change.emit({
              type: "sell",
              symbol: this.symbol,
              old_shares: this.brokerages[broker].held_shares,
              new_shares: 0,
              delta: -this.brokerages[broker].held_shares,
              price: this.price,
              broker: broker,
            });
          }
          this.brokerages = [];
          break;
        }
        case "Open in Focus": {
          // router.send
          console.log("TODO: Add router connection")
          break;
        }
        case "Add Broker": {
          this.brokerages["new brokerage"] = { held_shares: 0, initial_shares: 0 };
          break;
        }
        default: { break; }
      }
      console.log("Stocklist Context Menu");
      console.log(result);
    })
  }

  @Output()
  change: EventEmitter<Record<string, any>> = new EventEmitter<Record<string, any>>();

}


@Component({
  selector: 'holding_context_menu',
  templateUrl: './context_menu.html'
})
export class HoldingContextMenu {
  constructor(
    public dialogRef: MatDialogRef<HoldingContextMenu>) { }

  select(event) {
    this.dialogRef.close(event.srcElement.innerText)
  }

  fund_menu = [
    { text: "Add Broker" },
    { text: "Sell All" },
    { text: "Open in Focus" }
  ];

}
