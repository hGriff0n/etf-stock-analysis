import { Injectable } from '@angular/core';
import { PluginsService } from '../plugins/plugins.service';
import { Observable, of, defer, from } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserdataService {

  constructor(private plugins: PluginsService) { }

  // TODO: This should be produced by plugins
  // TODO: Should these just be numbers/strings/etc.
  // TODO: How to change overview when these change?

  scores = of({
    fit: 0,
    expenses: 0,
    brokerage: 0,
    dividends: 0,
    concentration: 0,
  })
}
