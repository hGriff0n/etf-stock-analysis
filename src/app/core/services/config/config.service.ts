import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

const hardcodedUrl: string = 'assets\\private\\config.yaml';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  constructor(private http: HttpClient) {
    console.log('getting config');
    http.get(hardcodedUrl)
      .subscribe(data => {
        this.values = (data as Record<string, any>);
        console.log(this.values);
      });
  }

  values: Record<string, any>;
}
