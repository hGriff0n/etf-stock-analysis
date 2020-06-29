import { Observable } from "rxjs";


export interface HoldingPlugin {
    getHoldings(): Observable<Record<string, any>>;
}
