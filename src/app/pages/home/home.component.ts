import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import { RouterLink } from '@angular/router';
import { map } from 'rxjs';

import { MockDataService } from '../../data/mock-data.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [AsyncPipe, NgFor, NgIf, RouterLink],
  template: `
    <section class="hero">
      <div class="demo-container">
        <div class="hero__badge" aria-hidden="true">⛪</div>
        <h1>Parrocchia Sant'Antonio</h1>
        <p class="hero-tagline">Comunità cristiana nel cuore di Lecce — diocesi di Lecce</p>
        <div class="hero-actions">
          <a routerLink="/orari-messe" class="btn btn-primary">Orari delle messe</a>
          <a routerLink="/contatti" class="btn btn-secondary">Contattaci</a>
        </div>
      </div>
    </section>

    <!-- Messe oggi -->
    <section class="messe-oggi demo-container" *ngIf="messeOggi$ | async as messeOggi">
      <div class="section-header">
        <h2>Messe di oggi — {{ messeOggi.giorno }}</h2>
        <a routerLink="/orari-messe" class="link-more">Tutti gli orari →</a>
      </div>
      <ul class="messe-list" *ngIf="messeOggi.messe.length > 0; else nessunaMessaOggi">
        <li *ngFor="let m of messeOggi.messe" class="messa-chip">
          <span class="messa-chip__ora">{{ m.ora }}</span>
          <span class="messa-chip__luogo">{{ m.luogo }}</span>
          <span class="messa-chip__note" *ngIf="m.note">{{ m.note }}</span>
        </li>
      </ul>
      <ng-template #nessunaMessaOggi>
        <p class="text-muted">Nessuna messa in programma per oggi. Consultate gli orari settimanali.</p>
      </ng-template>
    </section>

    <!-- Gruppi in evidenza -->
    <section class="gruppi-featured" *ngIf="gruppiFeatured$ | async as gruppi">
      <div class="demo-container">
        <div class="section-header">
          <h2>La nostra comunità</h2>
          <a routerLink="/gruppi" class="link-more">Tutti i gruppi →</a>
        </div>
        <ul class="gruppi-grid">
          <li *ngFor="let g of gruppi" class="gruppo-card">
            <span class="gruppo-card__icona" aria-hidden="true">{{ g.icona }}</span>
            <h3>{{ g.nome }}</h3>
            <p class="gruppo-card__categoria">{{ g.categoria }}</p>
            <p class="gruppo-card__desc">{{ g.descrizione }}</p>
            <p class="gruppo-card__destinatari">
              <strong>Per:</strong> {{ g.destinatari }}
            </p>
          </li>
        </ul>
      </div>
    </section>

    <!-- Band informazioni -->
    <section class="info-band">
      <div class="demo-container">
        <ul class="info-band__list">
          <li>
            <span class="info-band__icon" aria-hidden="true">📖</span>
            <div>
              <h3>Sacramenti</h3>
              <p>Battesimo, Prima Comunione, Cresima, Matrimonio e Confessione.</p>
              <a routerLink="/sacramenti">Scopri come prepararti →</a>
            </div>
          </li>
          <li>
            <span class="info-band__icon" aria-hidden="true">❤</span>
            <div>
              <h3>Caritas e volontariato</h3>
              <p>Sportello Caritas aperto a tutti. Entra a far parte dei nostri volontari.</p>
              <a routerLink="/gruppi">Unisciti →</a>
            </div>
          </li>
          <li>
            <span class="info-band__icon" aria-hidden="true">📞</span>
            <div>
              <h3>Segreteria parrocchiale</h3>
              <p>Aperta martedì–venerdì mattina e venerdì pomeriggio.</p>
              <a routerLink="/contatti">Orari e contatti →</a>
            </div>
          </li>
        </ul>
      </div>
    </section>
  `,
  styles: [
    `
      .hero {
        padding: 5rem 1rem;
        text-align: center;
        background: linear-gradient(180deg, #fffbf0 0%, #ffffff 100%);
        border-bottom: 1px solid var(--color-border);
      }
      .hero__badge {
        font-size: 3.5rem;
        margin-bottom: 1rem;
        display: block;
      }
      .hero h1 {
        font-size: clamp(2rem, 5vw, 3.5rem);
        margin: 0 0 1rem;
        color: var(--color-fg-default);
      }
      .hero-tagline {
        font-size: 1.15rem;
        color: var(--color-fg-muted);
        margin: 0 0 2rem;
      }
      .hero-actions {
        display: flex;
        gap: 0.75rem;
        justify-content: center;
        flex-wrap: wrap;
      }
      .btn {
        display: inline-block;
        padding: 0.7rem 1.5rem;
        border-radius: var(--radius-md);
        text-decoration: none;
        font-weight: 600;
        transition: all 0.15s ease;
      }
      .btn-primary {
        background: var(--color-accent);
        color: #ffffff;
      }
      .btn-primary:hover {
        background: #92400e;
      }
      .btn-secondary {
        background: #ffffff;
        color: var(--color-fg-default);
        border: 1px solid var(--color-border);
      }
      .btn-secondary:hover {
        background: var(--color-bg-subtle);
      }
      .messe-oggi {
        padding: 3rem 1rem;
      }
      .section-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 1.5rem;
        flex-wrap: wrap;
        gap: 0.5rem;
      }
      .section-header h2 {
        margin: 0;
      }
      .link-more {
        color: var(--color-accent);
        text-decoration: none;
        font-weight: 600;
        font-size: 0.9rem;
      }
      .link-more:hover {
        text-decoration: underline;
      }
      .messe-list {
        list-style: none;
        padding: 0;
        margin: 0;
        display: flex;
        flex-wrap: wrap;
        gap: 0.75rem;
      }
      .messa-chip {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        background: var(--color-bg-subtle);
        border: 1px solid var(--color-border);
        border-radius: var(--radius-md);
        padding: 0.6rem 1rem;
      }
      .messa-chip__ora {
        font-weight: 700;
        color: var(--color-accent);
        font-size: 1.05rem;
        min-width: 3.5rem;
      }
      .messa-chip__luogo {
        font-size: 0.9rem;
        color: var(--color-fg-default);
      }
      .messa-chip__note {
        font-size: 0.8rem;
        color: var(--color-fg-muted);
        font-style: italic;
      }
      .text-muted {
        color: var(--color-fg-muted);
        font-style: italic;
      }
      .gruppi-featured {
        background: var(--color-bg-subtle);
        padding: 4rem 0;
        border-top: 1px solid var(--color-border);
        border-bottom: 1px solid var(--color-border);
      }
      .gruppi-grid {
        list-style: none;
        padding: 0;
        margin: 0;
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
        gap: 1.25rem;
      }
      .gruppo-card {
        background: #ffffff;
        border: 1px solid var(--color-border);
        border-radius: var(--radius-md);
        padding: 1.5rem;
      }
      .gruppo-card__icona {
        font-size: 2rem;
        display: block;
        margin-bottom: 0.75rem;
      }
      .gruppo-card h3 {
        margin: 0 0 0.25rem;
        font-size: 1.05rem;
      }
      .gruppo-card__categoria {
        font-size: 0.78rem;
        font-weight: 600;
        text-transform: uppercase;
        letter-spacing: 0.05em;
        color: var(--color-accent);
        margin: 0 0 0.75rem;
      }
      .gruppo-card__desc {
        font-size: 0.9rem;
        color: var(--color-fg-muted);
        margin: 0 0 0.75rem;
        line-height: 1.5;
      }
      .gruppo-card__destinatari {
        font-size: 0.85rem;
        color: var(--color-fg-muted);
        margin: 0;
      }
      .info-band {
        padding: 4rem 0;
      }
      .info-band__list {
        list-style: none;
        padding: 0;
        margin: 0;
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
        gap: 2rem;
      }
      .info-band__list li {
        display: flex;
        gap: 1rem;
        align-items: flex-start;
      }
      .info-band__icon {
        font-size: 2rem;
        flex-shrink: 0;
        margin-top: 0.1rem;
      }
      .info-band__list h3 {
        margin: 0 0 0.4rem;
        font-size: 1rem;
      }
      .info-band__list p {
        font-size: 0.9rem;
        color: var(--color-fg-muted);
        margin: 0 0 0.4rem;
      }
      .info-band__list a {
        font-size: 0.85rem;
        font-weight: 600;
        color: var(--color-accent);
        text-decoration: none;
      }
      .info-band__list a:hover {
        text-decoration: underline;
      }
    `
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent {
  private readonly mockData = inject(MockDataService);

  private static readonly GIORNI_ORDINE = [
    'domenica', 'lunedi', 'martedi', 'mercoledi', 'giovedi', 'venerdi', 'sabato'
  ] as const;

  readonly messeOggi$ = this.mockData.messe$.pipe(
    map((data) => {
      const oggi = new Date().getDay();
      const giornoCodice = HomeComponent.GIORNI_ORDINE[oggi];
      const giornoData = data.orari.find((o) => o.giornoCodice === giornoCodice);
      return {
        giorno: giornoData?.giorno ?? '',
        messe: giornoData?.messe ?? []
      };
    })
  );

  readonly gruppiFeatured$ = this.mockData.gruppi$.pipe(
    map((data) => data.gruppi.slice(0, 3))
  );
}
