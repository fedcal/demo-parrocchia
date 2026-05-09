import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { AsyncPipe, NgFor, NgIf, KeyValuePipe } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { MockDataService } from '../../data/mock-data.service';

type GiornoKey = 'lunedi' | 'martedi' | 'mercoledi' | 'giovedi' | 'venerdi' | 'sabato' | 'domenica';

const GIORNI_LABELS: Record<GiornoKey, string> = {
  lunedi: 'Lunedì',
  martedi: 'Martedì',
  mercoledi: 'Mercoledì',
  giovedi: 'Giovedì',
  venerdi: 'Venerdì',
  sabato: 'Sabato',
  domenica: 'Domenica'
};

@Component({
  selector: 'app-contatti',
  standalone: true,
  imports: [AsyncPipe, NgFor, NgIf, ReactiveFormsModule, KeyValuePipe],
  template: `
    <section class="page-header">
      <div class="demo-container">
        <h1>Contatti</h1>
        <p>Dove siamo, come raggiungerci e come mettersi in contatto con la segreteria parrocchiale.</p>
      </div>
    </section>

    <article class="demo-container content" *ngIf="info$ | async as info">
      <div class="contact-grid">
        <!-- Info -->
        <section class="info-block">
          <h2>Indirizzo</h2>
          <address class="indirizzo">
            {{ info.indirizzo.via }}<br />
            {{ info.indirizzo.cap }} {{ info.indirizzo.citta }} ({{ info.indirizzo.provincia }})<br />
            {{ info.diocesi }}
          </address>

          <h2>Contatti</h2>
          <ul class="contact-list">
            <li>
              <strong>Telefono:</strong>
              <a [href]="'tel:' + info.contatti.telefono">{{ info.contatti.telefono }}</a>
            </li>
            <li>
              <strong>Email:</strong>
              <a [href]="'mailto:' + info.contatti.email">{{ info.contatti.email }}</a>
            </li>
            <li *ngIf="info.contatti.social.facebook">
              <strong>Facebook:</strong>
              <a [href]="info.contatti.social.facebook" target="_blank" rel="noopener">Pagina ufficiale</a>
            </li>
          </ul>

          <h2>Orari segreteria</h2>
          <ul class="hours-list">
            <li *ngFor="let g of giorni">
              <span>{{ g.label }}</span>
              <span>{{ getOrario(info.segreteria, g.key) }}</span>
            </li>
          </ul>
        </section>

        <!-- Form contatto -->
        <section class="form-block">
          <h2>Invia un messaggio</h2>
          <form [formGroup]="form" (ngSubmit)="onSubmit()" *ngIf="!inviato(); else grazie">
            <div class="field">
              <label for="nome">Nome e cognome</label>
              <input id="nome" type="text" formControlName="nome" autocomplete="name" required />
            </div>
            <div class="field">
              <label for="email">Email</label>
              <input id="email" type="email" formControlName="email" autocomplete="email" required />
            </div>
            <div class="field">
              <label for="oggetto">Oggetto</label>
              <select id="oggetto" formControlName="oggetto" required>
                <option value="">Scegli un argomento…</option>
                <option value="battesimo">Battesimo</option>
                <option value="matrimonio">Matrimonio</option>
                <option value="cresima">Cresima / Prima Comunione</option>
                <option value="gruppi">Gruppi parrocchiali</option>
                <option value="caritas">Caritas e volontariato</option>
                <option value="info">Informazioni generali</option>
                <option value="altro">Altro</option>
              </select>
            </div>
            <div class="field">
              <label for="messaggio">Messaggio</label>
              <textarea id="messaggio" formControlName="messaggio" rows="4" required></textarea>
            </div>
            <div class="field field--checkbox">
              <input id="privacy" type="checkbox" formControlName="privacy" />
              <label for="privacy">
                Ho letto l'informativa sul trattamento dei dati personali (GDPR) e acconsento al loro utilizzo per rispondere alla mia richiesta.
              </label>
            </div>
            <button type="submit" class="btn btn-primary" [disabled]="form.invalid">Invia messaggio</button>
            <p class="form-disclaimer">
              Demo non funzionale: nessun dato viene inviato. Per contatti urgenti usa il telefono.
            </p>
          </form>

          <ng-template #grazie>
            <div class="thankyou">
              <span class="thankyou__icon" aria-hidden="true">✓</span>
              <h3>Grazie, {{ form.value['nome'] }}!</h3>
              <p>Il tuo messaggio riguardante <strong>{{ form.value['oggetto'] }}</strong> è stato simulato correttamente.</p>
              <p>In un sito reale riceveresti una risposta all'email indicata entro 2-3 giorni lavorativi.</p>
              <button type="button" class="btn btn-secondary" (click)="reset()">Nuovo messaggio</button>
            </div>
          </ng-template>
        </section>
      </div>

      <!-- FAQ -->
      <section class="faq-section" *ngIf="faq$ | async as faqData">
        <h2>Domande frequenti</h2>
        <ul class="faq-list">
          <li *ngFor="let item of faqData.faq" class="faq-item">
            <h3 class="faq-item__domanda">{{ item.domanda }}</h3>
            <p class="faq-item__risposta">{{ item.risposta }}</p>
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
      .contact-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
        gap: 3rem;
        margin-bottom: 4rem;
      }
      .info-block h2 {
        margin: 1.5rem 0 0.75rem;
        font-size: 1.1rem;
      }
      .info-block h2:first-child {
        margin-top: 0;
      }
      .indirizzo {
        font-style: normal;
        color: var(--color-fg-muted);
        font-size: 0.95rem;
        line-height: 1.7;
      }
      .contact-list {
        list-style: none;
        padding: 0;
        margin: 0;
      }
      .contact-list li {
        margin-bottom: 0.5rem;
        font-size: 0.9rem;
      }
      .hours-list {
        list-style: none;
        padding: 0;
        margin: 0;
      }
      .hours-list li {
        display: flex;
        justify-content: space-between;
        padding: 0.4rem 0;
        border-bottom: 1px dashed var(--color-border);
        font-size: 0.9rem;
        gap: 1rem;
      }
      .hours-list li:last-child {
        border-bottom: none;
      }
      .form-block {
        background: var(--color-bg-subtle);
        padding: 2rem;
        border-radius: var(--radius-lg);
      }
      .form-block h2 {
        margin: 0 0 1.5rem;
      }
      .field {
        margin-bottom: 1rem;
        display: flex;
        flex-direction: column;
      }
      .field label {
        font-size: 0.85rem;
        font-weight: 600;
        margin-bottom: 0.25rem;
      }
      .field input,
      .field textarea,
      .field select {
        padding: 0.5rem 0.75rem;
        border: 1px solid var(--color-border);
        border-radius: var(--radius-sm);
        font-family: inherit;
        font-size: 0.95rem;
        background: #ffffff;
      }
      .field input:focus,
      .field textarea:focus,
      .field select:focus {
        outline: 2px solid var(--color-accent);
        outline-offset: 1px;
        border-color: var(--color-accent);
      }
      .field--checkbox {
        flex-direction: row;
        align-items: flex-start;
        gap: 0.5rem;
      }
      .field--checkbox input {
        margin-top: 0.15rem;
        flex-shrink: 0;
      }
      .field--checkbox label {
        font-weight: 400;
        font-size: 0.82rem;
        color: var(--color-fg-muted);
      }
      .btn {
        display: inline-block;
        padding: 0.7rem 1.5rem;
        border-radius: var(--radius-md);
        text-decoration: none;
        font-weight: 600;
        border: none;
        cursor: pointer;
        font-size: 0.95rem;
      }
      .btn-primary {
        background: var(--color-accent);
        color: #ffffff;
      }
      .btn-primary:disabled {
        opacity: 0.5;
        cursor: not-allowed;
      }
      .btn-secondary {
        background: #ffffff;
        color: var(--color-fg-default);
        border: 1px solid var(--color-border);
      }
      .form-disclaimer {
        font-size: 0.78rem;
        color: var(--color-fg-muted);
        font-style: italic;
        margin-top: 0.5rem;
      }
      .thankyou {
        text-align: center;
        padding: 2rem 0;
      }
      .thankyou__icon {
        display: block;
        font-size: 2.5rem;
        color: var(--color-success);
        margin-bottom: 0.5rem;
      }
      .thankyou h3 {
        color: var(--color-success);
        margin: 0 0 1rem;
      }
      .faq-section {
        border-top: 1px solid var(--color-border);
        padding-top: 3rem;
      }
      .faq-section h2 {
        margin-bottom: 2rem;
      }
      .faq-list {
        list-style: none;
        padding: 0;
        margin: 0;
        display: flex;
        flex-direction: column;
        gap: 1rem;
      }
      .faq-item {
        border: 1px solid var(--color-border);
        border-radius: var(--radius-md);
        padding: 1.25rem 1.5rem;
      }
      .faq-item__domanda {
        margin: 0 0 0.5rem;
        font-size: 1rem;
        font-weight: 600;
      }
      .faq-item__risposta {
        margin: 0;
        font-size: 0.9rem;
        color: var(--color-fg-muted);
        line-height: 1.6;
      }
    `
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ContattiComponent {
  private readonly mockData = inject(MockDataService);
  private readonly fb = inject(FormBuilder);

  readonly info$ = this.mockData.info$;
  readonly faq$ = this.mockData.faq$;
  readonly inviato = signal(false);

  readonly giorni: { key: GiornoKey; label: string }[] = [
    { key: 'lunedi', label: 'Lunedì' },
    { key: 'martedi', label: 'Martedì' },
    { key: 'mercoledi', label: 'Mercoledì' },
    { key: 'giovedi', label: 'Giovedì' },
    { key: 'venerdi', label: 'Venerdì' },
    { key: 'sabato', label: 'Sabato' },
    { key: 'domenica', label: 'Domenica' }
  ];

  readonly form: FormGroup = this.fb.nonNullable.group({
    nome: ['', [Validators.required, Validators.minLength(2)]],
    email: ['', [Validators.required, Validators.email]],
    oggetto: ['', Validators.required],
    messaggio: ['', [Validators.required, Validators.minLength(10)]],
    privacy: [false, Validators.requiredTrue]
  });

  getOrario(segreteria: Record<string, string>, key: GiornoKey): string {
    return segreteria[key] ?? '—';
  }

  onSubmit(): void {
    if (this.form.valid) {
      this.inviato.set(true);
    }
  }

  reset(): void {
    this.form.reset({ privacy: false });
    this.inviato.set(false);
  }
}
