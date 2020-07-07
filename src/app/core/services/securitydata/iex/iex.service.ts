import { Injectable } from '@angular/core';
import { ConfigService } from '../../config/config.service';
import { IEXCloudClient } from 'node-iex-cloud';
import { Observable, from, of } from 'rxjs';
import { News } from 'node-iex-cloud/lib/types';

@Injectable({
  providedIn: 'root'
})
export class IexService {

  constructor(private config: ConfigService) {
    // TODO: Add a cache to avoid running through iex credits
    let use_sandbox = this.config.values['iex']['use_sandbox'];
    let token = this.config.values['iex']['api_token'];
    if (use_sandbox) {
      token = this.config.values['iex']['test_token'];
    }

    this.iex = new IEXCloudClient(window.fetch.bind(window), {
      sandbox: use_sandbox,
      publishable: token,
      version: 'stable'
    });
   }

   // sector, security name, issue type, industry, description, website
   company(symbol: string): Observable<Record<string, any>> {
     return from(this.iex.symbol(symbol).company());
   }

   // change, changePercent, volume, averageVolume, year high/low, ytdopen, close, low, high
   quote(symbol: string): Observable<Record<string, any>> {
     return from(this.iex.symbol(symbol).quote());
   }

   security(symbol: string): Observable<any> {
     return of(this.iex.symbol(symbol));
   }

   news(symbol: string, limit: number): Observable<News[]> {
     return from(this.iex.symbol(symbol).news(limit));
   }

   isEtf(symbol: string): Observable<boolean> {
     return from(this.iex.symbol(symbol).company().then(c => c['issueType'] == 'et'));
   }

  //  private iex: IEXCloudClient;
   private iex: IEXCloudClient;
}
