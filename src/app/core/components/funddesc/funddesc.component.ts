import { Component, OnInit, Input, Output, Inject } from '@angular/core';
import { Observable } from 'rxjs';
import { EventEmitter } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-funddesc',
  templateUrl: './funddesc.component.html',
  styleUrls: ['./funddesc.component.scss']
})
export class FunddescComponent {

  constructor() { }

  @Input()
  public symbol: string;

  @Input()
  public description: Observable<string>;

  @Input()
  public fund_name: Observable<string>;

  @Output()
  fund_click: EventEmitter<string> = new EventEmitter<string>();

  changeFund() {
    this.fund_click.emit("open");
  }
}


export interface SwitchFundData {
  fund: string
}

@Component({
  selector: 'switch-fund-dialog',
  templateUrl: './switch_fund_dialog.html'
})
export class SwitchFundDialog implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<SwitchFundDialog>,
    @Inject(MAT_DIALOG_DATA) public data: SwitchFundData) { }

  ngOnInit() {
    this.dialogRef.beforeClosed().subscribe(() => this.dialogRef.close(this.data));
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  close() {
    this.dialogRef.close(this.data);
  }
}
