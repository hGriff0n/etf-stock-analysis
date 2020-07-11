import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import * as op from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  constructor(private router: Router) { }

  search(terms: Observable<string>) {
    return terms.pipe(op.debounceTime(400))
      .pipe(op.distinctUntilChanged())
      .pipe(op.switchMap(term => this.searchEntries(term)));
  }

  // NOTE: Currently only works with actual securities
  searchEntries(term: string) {
    return this.router.navigate(['/fund-focus/', term.toUpperCase()]);
  }
}
