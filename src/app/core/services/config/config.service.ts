import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';


@Injectable()
export class ConfigService {
  private hardcodedUrl: string = 'assets\\private\\config.json';

  constructor(private http: HttpClient) {}

  load(): Promise<any> {
    console.log("loading");
    return this.http.get(this.hardcodedUrl)
      .toPromise()
      .then(data => {
        console.log("Loaded Configuration: " + data);
        this.values = data;
      });
  }

  values: Record<string, any>;
}

@Injectable()
export class ReadOnlyDatabaseService {
  private hardcodedUrl: string = 'assets\\private\\database.json';

  constructor(private http: HttpClient) {}

  load(): Promise<any> {
    console.log("loading");
    return this.http.get(this.hardcodedUrl)
      .toPromise()
      .then(data => {
        console.log("Loaded Configuration: " + data);
        this.values = data;
      });
  }

  values: Record<string, any>;
}
