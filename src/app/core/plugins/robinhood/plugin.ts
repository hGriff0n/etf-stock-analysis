
// import { NgModule } from '@angular/core';

// @NgModule({})
// export class RobinhoodPlugin {}

import { HoldingPlugin } from '../plugin.interface';
// import { Inject } from '@angular/core';
import { readFile } from 'fs';

import { HttpClient } from '@angular/common/http';

const hardcodedFilePath: string = 'C:\\Users\\ghoop\\Desktop\\holdings\\etf-stock-analysis\\src\\app\\core\\plugins\\robinhood\\holdings.json';

export class RobinhoodPlugin implements HoldingPlugin {

    private storage: any;
    private holdings: any;

    // constructor(@Inject(AccountsAPI) private api: AccountsAPI, @Inject(LoginAPI) private login: LoginAPI) { }

    getHoldings(): any {
        return this.holdings
    }

    constructor(private http: HttpClient) {
        this.storage = window.localStorage;
    }

    login() {
        readFile(hardcodedFilePath, 'utf-8', (err, data) => {
            if (err) {
                console.log("Failed to read holdings file");
                return;
            }
            this.holdings = JSON.parse(data);
            console.log(this.holdings);
        });
    }
}
