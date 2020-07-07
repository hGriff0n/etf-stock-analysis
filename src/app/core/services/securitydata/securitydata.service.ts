import { Injectable } from '@angular/core';
import { IexService } from './iex/iex.service';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { News } from 'node-iex-cloud/lib/types';

@Injectable({
  providedIn: 'root'
})
export class SecuritydataService {

  constructor(private iex: IexService) { }

  company(symbol: string): Observable<Record<string, any>> {
    return this.iex.company(symbol);
  }

  quote(symbol: string): Observable<Record<string, any>> {
    return this.iex.quote(symbol);
  }

  news(symbol: string, limit: number): Observable<News[]> {
    return this.iex.news(symbol, limit);
  }

}
