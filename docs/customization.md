# Customization

## Cambiare i dati mock

Edita i file in `src/assets/mock/`. Vedi [Mock Data](/mock-data).

## Cambiare i colori

I design tokens sono in `src/styles.css`:

```css
:root {
  --color-accent: #0969da;        /* Cambia qui per il colore primario */
  --color-bg-default: #ffffff;
  --color-fg-default: #1f2328;
  /* ... */
}
```

## Cambiare il logo

Sostituisci `public/favicon.ico` e aggiungi il logo SVG in `public/logo.svg`.

## Aggiungere route

1. Crea il componente in `src/app/pages/{nome}/`
2. Aggiungi la route in `src/app/app.routes.ts`:

```typescript
{
  path: 'servizi',
  loadComponent: () => import('./pages/servizi/servizi.component').then((m) => m.ServiziComponent),
  title: 'Servizi — Parrocchia'
}
```

## Cambiare i metadati SEO

Edita `src/index.html` per:
- `<title>` globale
- `<meta name="description">`
- Open Graph

Per metadati per-route usa `Title` e `Meta` di `@angular/platform-browser`.

## Disabilitare il prerender

In `angular.json`:

```json
"prerender": false
```

In questo caso il sito gira solo in modalità SSR runtime (più lento al cold start, più dinamico).

## White-label per cliente

1. Fork del repo o copia in nuova cartella
2. Sostituisci `parrocchia` con nome cliente (`acme-pizzeria`)
3. Sostituisci footer rimuovendo riferimento a Federico (modifica `footer.component.ts`)
4. Personalizza `vercel.json` con domain custom cliente
5. Deploy su Vercel cliente con loro account

---

## Possibili sviluppi customizzabili

Il template Parrocchia supporta diverse estensioni per pastorale digitale e comunità:

### Streaming e Media
1. **Live streaming messe con DVR** — archivio 1 anno, search per data (Tier Avanzato)
2. **Chat live durante messe** — intenzioni di preghiera, domande parroco (Tier Avanzato+)
3. **Podcast encicliche papali** — audio + transcript (Tier Avanzato)
4. **Video rosario guidato** — meditazione 20 min, arcivescovo/frate noto (custom)

### Biblioteca e Educazione
5. **Biblioteca digitale Bibbia** — CEI 2008 full-text ricercabile, commenti (Tier Avanzato)
6. **Catechismo Chiesa cattolica** — full PDF + quiz interattivi per catechisti (custom)
7. **Corso online catechesi** — video lezioni + esame, certificato partecipazione (custom)
8. **Encicliche papali index** — ricerca per tema (famiglia, lavoro, ecologia) (Tier Avanzato+)

### Sacramenti e Eventi
9. **Matrimonio planner completo** — checklist documenti, timeline cerimonia, foto gallery privata (Tier Avanzato)
10. **Battesimo/Cresima booking + prep tracking** — genitori vedono progress (Tier Avanzato)
11. **Funerale planning** — form immediato, raccolta offerte online, necrologio (custom)
12. **Festa patrono digitale** — countdown timer, gallery, live streaming serata (custom)

### Comunità e Pastorale
13. **Forum discussione tematica** — santità, famiglia, vocazioni (Tier Avanzato+)
14. **Archivio storico parrocchia** — genealogia famiglie (opt-in), restauri chiesa, benefattori (Tier Avanzato)
15. **Gruppo giovani integrato** — app chat privata, event planning, photo gallery (Tier Avanzato+)

**Nota**: Contatta Federico per costi specifici e timeline di ogni feature custom.
