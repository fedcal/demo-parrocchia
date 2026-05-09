import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import { map } from 'rxjs';

import { MockDataService } from '../../data/mock-data.service';
import type { Gruppo } from '../../data/types';

interface GruppiPerCategoria {
  categoria: string;
  gruppi: Gruppo[];
}

@Component({
  selector: 'app-gruppi',
  standalone: true,
  imports: [AsyncPipe, NgFor, NgIf],
  template: `
    <section class="page-header">
      <div class="demo-container">
        <h1>Gruppi parrocchiali</h1>
        <p>Oratorio, scout, Caritas, coro, catechesi, Azione Cattolica, anziani e famiglie: la vita comunitaria di Sant'Antonio.</p>
      </div>
    </section>

    <article class="demo-container content" *ngIf="gruppiPerCategoria$ | async as categorie">
      <section
        *ngFor="let cat of categorie"
        class="categoria-section"
      >
        <h2 class="categoria-section__titolo">{{ cat.categoria }}</h2>
        <ul class="gruppi-grid">
          <li *ngFor="let g of cat.gruppi" class="gruppo-card">
            <header class="gruppo-card__header">
              <span class="gruppo-card__icona" aria-hidden="true">{{ g.icona }}</span>
              <h3>{{ g.nome }}</h3>
            </header>
            <p class="gruppo-card__desc">{{ g.descrizione }}</p>
            <ul class="gruppo-card__attivita">
              <li *ngFor="let a of g.attivita">{{ a }}</li>
            </ul>
            <dl class="gruppo-card__meta">
              <div class="meta-row">
                <dt>Per chi</dt>
                <dd>{{ g.destinatari }}</dd>
              </div>
              <div class="meta-row">
                <dt>Incontri</dt>
                <dd>{{ g.incontri }}</dd>
              </div>
              <div class="meta-row">
                <dt>Referente</dt>
                <dd>{{ g.referente }}</dd>
              </div>
              <div class="meta-row" *ngIf="g.contatto">
                <dt>Contatto</dt>
                <dd>
                  <a
                    *ngIf="isEmail(g.contatto); else testoContatto"
                    [href]="'mailto:' + g.contatto"
                  >{{ g.contatto }}</a>
                  <ng-template #testoContatto>{{ g.contatto }}</ng-template>
                </dd>
              </div>
            </dl>
          </li>
        </ul>
      </section>
    </article>
  `,
  styles: [
    `
      .page-header {
        padding: 4rem 1rem 3rem;
        background: var(--color-bg-subtle);
        text-align: center;
        border-bottom: 1px solid var(--color-border);
      }
      .page-header h1 {
        margin: 0 0 0.5rem;
      }
      .page-header p {
        color: var(--color-fg-muted);
        margin: 0;
      }
      .content {
        padding: 3rem 1rem;
      }
      .categoria-section {
        margin-bottom: 3.5rem;
      }
      .categoria-section__titolo {
        font-size: 1.2rem;
        font-weight: 700;
        text-transform: uppercase;
        letter-spacing: 0.07em;
        color: var(--color-accent);
        margin: 0 0 1.5rem;
        padding-bottom: 0.5rem;
        border-bottom: 2px solid var(--color-accent);
        display: inline-block;
      }
      .gruppi-grid {
        list-style: none;
        padding: 0;
        margin: 0;
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
        gap: 1.25rem;
      }
      .gruppo-card {
        border: 1px solid var(--color-border);
        border-radius: var(--radius-md);
        padding: 1.5rem;
        background: #ffffff;
        display: flex;
        flex-direction: column;
        gap: 1rem;
      }
      .gruppo-card__header {
        display: flex;
        align-items: center;
        gap: 0.75rem;
      }
      .gruppo-card__icona {
        font-size: 1.75rem;
        flex-shrink: 0;
      }
      .gruppo-card__header h3 {
        margin: 0;
        font-size: 1.05rem;
      }
      .gruppo-card__desc {
        margin: 0;
        font-size: 0.9rem;
        color: var(--color-fg-muted);
        line-height: 1.6;
      }
      .gruppo-card__attivita {
        margin: 0;
        padding-left: 1.2rem;
      }
      .gruppo-card__attivita li {
        font-size: 0.85rem;
        color: var(--color-fg-muted);
        margin-bottom: 0.3rem;
        line-height: 1.4;
      }
      .gruppo-card__meta {
        margin: 0;
        border-top: 1px solid var(--color-border);
        padding-top: 1rem;
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
      }
      .meta-row {
        display: grid;
        grid-template-columns: 6rem 1fr;
        gap: 0.5rem;
        font-size: 0.85rem;
      }
      .meta-row dt {
        font-weight: 600;
        color: var(--color-fg-default);
      }
      .meta-row dd {
        margin: 0;
        color: var(--color-fg-muted);
      }
      .meta-row dd a {
        color: var(--color-accent);
        text-decoration: none;
      }
      .meta-row dd a:hover {
        text-decoration: underline;
      }
    `
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GruppiComponent {
  private readonly mockData = inject(MockDataService);

  readonly gruppiPerCategoria$ = this.mockData.gruppi$.pipe(
    map((data) => {
      const mapCategorie = new Map<string, Gruppo[]>();
      for (const g of data.gruppi) {
        const existing = mapCategorie.get(g.categoria) ?? [];
        mapCategorie.set(g.categoria, [...existing, g]);
      }
      return Array.from(mapCategorie.entries()).map(
        ([categoria, gruppi]): GruppiPerCategoria => ({ categoria, gruppi })
      );
    })
  );

  isEmail(value: string): boolean {
    return value.includes('@');
  }
}
