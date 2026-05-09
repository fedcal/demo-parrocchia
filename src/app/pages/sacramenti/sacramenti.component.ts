import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { AsyncPipe, NgFor, NgIf } from '@angular/common';

import { MockDataService } from '../../data/mock-data.service';
import type { Sacramento } from '../../data/types';

@Component({
  selector: 'app-sacramenti',
  standalone: true,
  imports: [AsyncPipe, NgFor, NgIf],
  template: `
    <section class="page-header">
      <div class="demo-container">
        <h1>Sacramenti</h1>
        <p>Accompagnamento spirituale e percorsi di preparazione ai cinque sacramenti celebrati in parrocchia.</p>
      </div>
    </section>

    <article class="demo-container content" *ngIf="sacramenti$ | async as data">
      <!-- Tabs di navigazione -->
      <nav class="sacramenti-tabs" aria-label="Sacramenti">
        <button
          *ngFor="let s of data.sacramenti"
          class="tab-btn"
          [class.tab-btn--active]="attivo()?.id === s.id"
          (click)="seleziona(s)"
          [attr.aria-pressed]="attivo()?.id === s.id"
        >
          <span class="tab-btn__icon" aria-hidden="true">{{ s.icona }}</span>
          {{ s.nome }}
        </button>
      </nav>

      <!-- Dettaglio sacramento selezionato -->
      <section class="sacramento-detail" *ngIf="attivo() as s; else nessunaSelezione" [attr.id]="s.id">
        <header class="sacramento-detail__header">
          <h2>{{ s.nome }}</h2>
          <p class="sacramento-detail__destinatari">
            <strong>Per chi:</strong> {{ s.destinatari }}
          </p>
        </header>

        <p class="sacramento-detail__desc">{{ s.descrizione }}</p>

        <div class="sacramento-info-grid">
          <div class="info-box" *ngIf="s.preparazione.length > 0">
            <h3>Preparazione richiesta</h3>
            <ol class="prep-list">
              <li *ngFor="let p of s.preparazione">{{ p }}</li>
            </ol>
          </div>

          <div class="info-box" *ngIf="s.documenti.length > 0">
            <h3>Documenti necessari</h3>
            <ul class="doc-list">
              <li *ngFor="let d of s.documenti">{{ d }}</li>
            </ul>
          </div>
        </div>

        <div class="sacramento-meta">
          <div class="meta-item">
            <span class="meta-item__label">Celebrazione</span>
            <span class="meta-item__value">{{ s.periodicita }}</span>
          </div>
          <div class="meta-item">
            <span class="meta-item__label">Contatto</span>
            <span class="meta-item__value">{{ s.contatto }}</span>
          </div>
        </div>
      </section>

      <ng-template #nessunaSelezione>
        <p class="seleziona-hint">Seleziona un sacramento per vedere i dettagli del percorso di preparazione.</p>
      </ng-template>
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
      .sacramenti-tabs {
        display: flex;
        flex-wrap: wrap;
        gap: 0.5rem;
        margin-bottom: 2.5rem;
        border-bottom: 2px solid var(--color-border);
        padding-bottom: 0;
      }
      .tab-btn {
        display: flex;
        align-items: center;
        gap: 0.4rem;
        padding: 0.6rem 1.1rem;
        border: none;
        background: none;
        cursor: pointer;
        font-size: 0.95rem;
        color: var(--color-fg-muted);
        border-radius: var(--radius-sm) var(--radius-sm) 0 0;
        border-bottom: 2px solid transparent;
        margin-bottom: -2px;
        transition: all 0.15s ease;
      }
      .tab-btn:hover {
        color: var(--color-fg-default);
        background: var(--color-bg-subtle);
      }
      .tab-btn--active {
        color: var(--color-accent);
        border-bottom-color: var(--color-accent);
        font-weight: 600;
      }
      .tab-btn__icon {
        font-size: 1rem;
      }
      .sacramento-detail {
        animation: fadeIn 0.2s ease;
      }
      @keyframes fadeIn {
        from { opacity: 0; transform: translateY(4px); }
        to   { opacity: 1; transform: translateY(0); }
      }
      .sacramento-detail__header {
        margin-bottom: 1.5rem;
      }
      .sacramento-detail__header h2 {
        margin: 0 0 0.5rem;
        font-size: 1.75rem;
      }
      .sacramento-detail__destinatari {
        margin: 0;
        color: var(--color-fg-muted);
        font-size: 0.95rem;
      }
      .sacramento-detail__desc {
        line-height: 1.7;
        color: var(--color-fg-default);
        margin-bottom: 2rem;
        max-width: 720px;
      }
      .sacramento-info-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
        gap: 1.5rem;
        margin-bottom: 2rem;
      }
      .info-box {
        background: var(--color-bg-subtle);
        border-radius: var(--radius-md);
        padding: 1.5rem;
      }
      .info-box h3 {
        margin: 0 0 1rem;
        font-size: 1rem;
        color: var(--color-fg-default);
      }
      .prep-list,
      .doc-list {
        margin: 0;
        padding-left: 1.4rem;
      }
      .prep-list li,
      .doc-list li {
        margin-bottom: 0.5rem;
        font-size: 0.9rem;
        color: var(--color-fg-muted);
        line-height: 1.5;
      }
      .sacramento-meta {
        display: flex;
        flex-wrap: wrap;
        gap: 1.5rem;
        padding: 1.5rem;
        background: #fffbf0;
        border: 1px solid #fde68a;
        border-radius: var(--radius-md);
      }
      .meta-item {
        display: flex;
        flex-direction: column;
        gap: 0.25rem;
        flex: 1;
        min-width: 200px;
      }
      .meta-item__label {
        font-size: 0.78rem;
        font-weight: 700;
        text-transform: uppercase;
        letter-spacing: 0.05em;
        color: var(--color-accent);
      }
      .meta-item__value {
        font-size: 0.9rem;
        color: var(--color-fg-default);
      }
      .seleziona-hint {
        text-align: center;
        color: var(--color-fg-muted);
        font-style: italic;
        padding: 3rem 0;
      }
    `
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SacramentiComponent {
  private readonly mockData = inject(MockDataService);

  readonly sacramenti$ = this.mockData.sacramenti$;
  readonly attivo = signal<Sacramento | null>(null);

  seleziona(sacramento: Sacramento): void {
    this.attivo.set(sacramento);
  }
}
