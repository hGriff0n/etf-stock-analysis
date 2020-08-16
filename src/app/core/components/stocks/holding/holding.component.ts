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
  constructor(private userdata: UserdataService, public dialog: MatDialog) {}

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
      shares: event.delta,
      price: this.price,
      broker: event.broker,
      remove: old_held - this.brokerages[event.broker].initial_shares
    });
  }

  // Context Menu

    showContextMenu(event) {
      event.stopPropagation();
      const dialogRef = this.dialog.open(HoldingContextMenu, {
        width: '200px'
      });
      dialogRef.afterClosed().subscribe(result => {
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
export class HoldingContextMenu implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<HoldingContextMenu>) { }

  ngOnInit() {
    this.dialogRef.beforeClosed().subscribe(() => this.dialogRef.close());
  }

  onNoClick(): void {
  }

  select(event) {
    console.log(event);
  }

  fund_menu = [
    { text: "Set Category" },
    { text: "Sell All" },
    { text: "Open in Focus" }
  ];

}
