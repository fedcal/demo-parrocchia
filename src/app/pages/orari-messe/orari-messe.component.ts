import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { AsyncPipe, NgFor, NgIf } from '@angular/common';

import { MockDataService } from '../../data/mock-data.service';

@Component({
  selector: 'app-orari-messe',
  standalone: true,
  imports: [AsyncPipe, NgFor, NgIf],
  template: `
    <section class="page-header">
      <div class="demo-container">
        <h1>Orari delle messe</h1>
        <p>Tutti gli orari delle celebrazioni eucaristiche settimanali della parrocchia.</p>
      </div>
    </section>

    <article class="demo-container content" *ngIf="orari$ | async as orari">
      <div class="giorni-grid">
        <div *ngFor="let giorno of orari.orari" class="giorno-card">
          <h2 class="giorno-card__nome">{{ giorno.giorno }}</h2>
          <ul class="messe-list">
            <li *ngFor="let m of giorno.messe" class="messa-item">
              <span class="messa-item__ora">{{ m.ora }}</span>
              <div class="messa-item__details">
                <span class="messa-item__luogo">{{ m.luogo }}</span>
                <span class="messa-item__note" *ngIf="m.note">{{ m.note }}</span>
              </div>
            </li>
          </ul>
        </div>
      </div>

      <aside class="nota-liturgia" *ngIf="orari.noteLiturgia">
        <p class="nota-liturgia__icon" aria-hidden="true">ℹ</p>
        <p class="nota-liturgia__testo">{{ orari.noteLiturgia }}</p>
      </aside>
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
      .giorni-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
        gap: 1.25rem;
        margin-bottom: 3rem;
      }
      .giorno-card {
        border: 1px solid var(--color-border);
        border-radius: var(--radius-md);
        overflow: hidden;
      }
      .giorno-card__nome {
        margin: 0;
        padding: 0.75rem 1.25rem;
        font-size: 1rem;
        font-weight: 700;
        background: var(--color-accent);
        color: #ffffff;
        text-transform: uppercase;
        letter-spacing: 0.05em;
      }
      .messe-list {
        list-style: none;
        padding: 0;
        margin: 0;
      }
      .messa-item {
        display: flex;
        align-items: flex-start;
        gap: 1rem;
        padding: 0.75rem 1.25rem;
        border-bottom: 1px dashed var(--color-border);
      }
      .messa-item:last-child {
        border-bottom: none;
      }
      .messa-item__ora {
        font-weight: 700;
        color: var(--color-accent);
        min-width: 3rem;
        font-size: 0.95rem;
        flex-shrink: 0;
      }
      .messa-item__details {
        display: flex;
        flex-direction: column;
        gap: 0.15rem;
      }
      .messa-item__luogo {
        font-size: 0.9rem;
        color: var(--color-fg-default);
      }
      .messa-item__note {
        font-size: 0.8rem;
        color: var(--color-fg-muted);
        font-style: italic;
      }
      .nota-liturgia {
        display: flex;
        gap: 1rem;
        align-items: flex-start;
        background: #fffbf0;
        border: 1px solid #fde68a;
        border-radius: var(--radius-md);
        padding: 1.25rem;
      }
      .nota-liturgia__icon {
        font-size: 1.25rem;
        margin: 0;
        flex-shrink: 0;
        color: var(--color-accent);
      }
      .nota-liturgia__testo {
        font-size: 0.9rem;
        color: var(--color-fg-muted);
        margin: 0;
        line-height: 1.6;
      }
    `
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OrariMesseComponent {
  private readonly mockData = inject(MockDataService);
  readonly orari$ = this.mockData.messe$;
}
