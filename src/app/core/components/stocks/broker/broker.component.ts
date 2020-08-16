import { Component, Input, ViewChild, Output, OnInit } from '@angular/core';
import { InPlaceEditorComponent } from '@syncfusion/ej2-angular-inplace-editor';
import { NumericTextBoxModel } from '@syncfusion/ej2-inputs';
import { EventEmitter } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-broker',
  templateUrl: './broker.component.html',
  styleUrls: ['./broker.component.scss']
})
export class BrokerComponent implements OnInit {

  @ViewChild('numericTextBox')
  public numericTextBoxObj: InPlaceEditorComponent;

  constructor(public dialog: MatDialog) { }

  ngOnInit() {
    this.quantity = this.held;
  }

  public numericTextBoxModel: NumericTextBoxModel = {
    format: 'n2',
    placeholder: 'Shares',
    min: 0,
    showClearButton: false,
    showSpinButton: false,
    change: event => this.onSave(event),
  };

  onSave(event) {
    this.quantity = event.value;
    this.delta = this.quantity - this.held;
    // TODO: I may want to report this as a diff from the previous quantity instead
    this.change.emit({
      broker: this.broker,
      delta: this.delta,
    });
  }

  @Input()
  broker: string;
  @Input()
  held: number;

  delta: number = 0;
  quantity: number;

  @Output()
  change: EventEmitter<Record<string, any>> = new EventEmitter<Record<string, any>>();

  showContextMenu(event) {
    event.stopPropagation();
    const dialogRef = this.dialog.open(BrokerContextMenu, {
      width: '200px'
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log("Stocklist Context Menu");
      console.log(result);
    })
  }
}


@Component({
  selector: 'stocklist_context_menu',
  templateUrl: './context_menu.html'
})
export class BrokerContextMenu implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<BrokerContextMenu>) { }

  ngOnInit() {
    this.dialogRef.beforeClosed().subscribe(() => this.dialogRef.close());
  }

  onNoClick(): void {
  }

  select(event) {
    console.log(event);
  }

  holdings_menu = [
    { text: "Sell 10" },
    { text: "Buy 10" },
    { text: "Sell All" },
    { text: "Buy Up to 5" }
  ];
}
