
import { HoldingPlugin } from '../plugin.interface';
// import { Inject } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

/*
Plugin to provide integration with the robinhood brokerage firm.

Unfortunately, I haven't been able to get the robinhood apis to work, so this is operating
  on a downloaded json file (from a separate python script which calls the same endpoints)
*/

const hardcodedFilePath: string = 'C:\\Users\\ghoop\\Desktop\\holdings\\etf-stock-analysis\\src\\assets\\private\\holdings.json';
const hardcodedUrl: string = 'assets\\private\\holdings.json';

export class RobinhoodPlugin implements HoldingPlugin {

    private storage: any;
    private holdings: Record<string, any>;

    // constructor(@Inject(AccountsAPI) private api: AccountsAPI, @Inject(LoginAPI) private login: LoginAPI) { }


    getHoldings(): Observable<Record<string, any>> {
        return this.http.get(hardcodedUrl)
            .pipe(map(data => (data as Record<string, any>)));
    }

    constructor(private http: HttpClient) {
        this.storage = window.localStorage;
    }

    login() {
    }
}
