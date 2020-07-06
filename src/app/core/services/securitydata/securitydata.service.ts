import { Injectable } from '@angular/core';
import { IexService } from './iex/iex.service';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SecuritydataService {

  constructor(private iex: IexService) { }

  company(symbol: string): Observable<Record<string, any>> {
    return this.iex.company(symbol);
  }

  name(symbol: string): Observable<string> {
    return this.iex.company(symbol).pipe(map(s => s['companyName']));
  }

  quote(symbol: string): Observable<Record<string, any>> {
    return this.iex.quote(symbol);
  }

  price(symbol: string): Observable<number> {
    return this.iex.quote(symbol).pipe(map(s => s['latestPrice']));
  }

}
