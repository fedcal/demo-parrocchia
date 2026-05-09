import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, shareReplay } from 'rxjs';

import type { InfoParrocchia, OrariMesse, Sacramenti, Gruppi, Team, Faq } from './types';

@Injectable({ providedIn: 'root' })
export class MockDataService {
  private readonly http = inject(HttpClient);

  // Cache streams con shareReplay per evitare richieste duplicate
  readonly info$: Observable<InfoParrocchia> = this.http
    .get<InfoParrocchia>('/assets/mock/info.json')
    .pipe(shareReplay(1));

  readonly messe$: Observable<OrariMesse> = this.http
    .get<OrariMesse>('/assets/mock/messe.json')
    .pipe(shareReplay(1));

  readonly sacramenti$: Observable<Sacramenti> = this.http
    .get<Sacramenti>('/assets/mock/sacramenti.json')
    .pipe(shareReplay(1));

  readonly gruppi$: Observable<Gruppi> = this.http
    .get<Gruppi>('/assets/mock/gruppi.json')
    .pipe(shareReplay(1));

  readonly team$: Observable<Team> = this.http
    .get<Team>('/assets/mock/team.json')
    .pipe(shareReplay(1));

  readonly faq$: Observable<Faq> = this.http
    .get<Faq>('/assets/mock/faq.json')
    .pipe(shareReplay(1));
}
