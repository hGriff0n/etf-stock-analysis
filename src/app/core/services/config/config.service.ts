import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

const hardcodedUrl: string = 'assets\\private\\config.json';

@Injectable()
export class ConfigService {

  constructor(private http: HttpClient) {}

  load(): Promise<any>{
    console.log("loading");
    return this.http.get(hardcodedUrl)
      .toPromise()
      .then(data => {
        console.log(data);
        this.values = data;
      });
  }

  values: Record<string, any>;
}
