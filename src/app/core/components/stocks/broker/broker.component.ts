import { Component, Input, ViewChild, Output, OnInit } from '@angular/core';
import { InPlaceEditorComponent } from '@syncfusion/ej2-angular-inplace-editor';
import { NumericTextBoxModel } from '@syncfusion/ej2-inputs';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'app-broker',
  templateUrl: './broker.component.html',
  styleUrls: ['./broker.component.scss']
})
export class BrokerComponent implements OnInit {

  @ViewChild('numericTextBox')
  public numericTextBoxObj: InPlaceEditorComponent;

  constructor() { }

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
}
