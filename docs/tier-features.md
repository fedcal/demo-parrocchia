# Piano Tariffario e Tier di Funzionalità

## Panorama Tier

Il template **Parrocchia / Oratorio** è disponibile in 3 livelli di funzionalità, progettati per digitalizzare la comunità parrocchiale:

| Tier | Prezzo | Ore sviluppo | Pubblico ideale |
|------|--------|-------------|-----------------|
| **Base** | €500–800 | 75h | Piccole parrocchie, info orari messe |
| **Intermedio** | €1.500–2.200 | 240h | Parrocchie medie, booking sacramenti + donazioni 8x1000 |
| **Avanzato** | €4.000–6.000 | 480h | Parrocchie grandi, live streaming + biblioteca digitale + matrimonio planner |

---

## Tier Base — €500–800 (75h)

**Obiettivo**: Sito vetrina informativo, SEO locale, credibilità diocesana.

### Funzionalità incluse

- **Hero section** con storia parrocchia, foto chiesa + parroco
- **Calendario messe settimanale** — orari feriale/festivo/vigilia, ferie estive
- **Gallery chiesa** — interno, altare, campanile, affreschi
- **Galleria oratorio** — sale attività, giardino, cucina
- **Attività parocchiali** — catechismo, oratorio, GREST estivo, gruppi parrocchiali
- **Contatti + Ufficio** — form contatti, tel parroco, email segreteria, orari sportello
- **Blog comunità** — commenti domenicali, riflessioni, notizie gruppo giovani
- **Schema.org LocalBusiness + Place** — JSON-LD per SEO mappa/ricerca Google
- **Design system** — CSS tokens light theme (GitHub Primer)
- **Prerender statico** — fast, 99.9% uptime
- **Responsive mobile** — Lighthouse target ≥90 SEO

### Cosa NON è incluso

- Prenotazione sacramenti
- Pagamenti donazioni online
- Chat comunicazioni
- Live streaming
- Biblioteca digitale
- Matrimonio planner

---

## Tier Intermedio — €1.500–2.200 (240h)

**Obiettivo**: Portale parrocchiale interattivo, sacramenti booking, fundraising digitale.

### Funzionalità incluse (Tier Base +)

- **Calendario messe + booking sacramenti** — matrimonio, battesimo, cresima
  - Visualizzazione date disponibili parroco (calendario editabile da staff)
  - Form prenotazione con dati sposi/genitori/padrini
  - Conferma email automatica + reminder 1 sett prima
  - Supporto tedesco (diocesi Alto Adige)

- **Iscrizioni online catechismo** — lista d'attesa, segmentazione per età
  - Form iscrizione bambini con dati genitori
  - Classi per fascia (elementari, medie, superiori)
  - Notifica auto per cambio status (iscritto, lista attesa)
  - Contatto catecheta assegnato via email

- **Donation form 8x1000 redirect + offerte libere**
  - Button 8x1000 → redirect agenzia entrate (IBAN dichiarazione Chiesa)
  - Form offerte libere: Stripe, Satispay, bonifico
  - Ricevuta email con opzione donazione anonima
  - Dashboard parroco: raccolta per categoria (8x1000, offerte messe, rosone manutenzione)

- **Newsletter parrocchia** — comunicazioni bulk GDPR-safe
  - Avvisi liturgici
  - News gruppo giovani, GREST, iniziative
  - Segmentazione per interesse (giovani, famiglie, anziani)
  - Unsubscribe one-click

- **Comunicazioni gruppi parocchiali** — messaggi annunci
  - Chat group per carità, catecheti, coro parrocchiale
  - Polling semplice (quando riunione, chi partecipa evento)
  - Pinboard locale notizie gruppo

- **Multi-lingua IT/DE** — sito bilingue per diocesi Alto Adige

- **GDPR completo** — cookie banner, informativa privacy

### Cosa NON è incluso

- Live streaming messe
- Biblioteca digitale Bibbia
- Video archiviati
- Matrimonio planner avanzato
- App mobile

---

## Tier Avanzato — €4.000–6.000 (480h)

**Obiettivo**: Ecosistema digitale parrocchia completo, streaming, biblioteca, planner matrimoni.

### Funzionalità incluse (Tier Base + Intermedio +)

- **Live streaming messe** — fedeli online + archivio registrazioni
  - Integrazione Zoom / YouTube Live
  - Video dual-camera: altare + assemblea
  - Chat live moderata (domande, intenzioni di preghiera)
  - Recording automatico con consenso GDPR
  - Archivio 1 anno (download torrent per fedeli, backup diocesi)

- **Biblioteca digitale parrocchia** — Bibbia, encicliche, riflessioni
  - Bibbia CEI 2008 full-text ricercabile (API pubbliche Vatican)
  - Encicliche papali (testo completo, index per tema: famiglia, lavoro, pace)
  - Riflessioni parroco (audio podcast + transcript)
  - Vangelo della domenica con commento (auto-updated)
  - Preghiere (rosario, Padre Nostro, Ave Maria) in 10 lingue
  - Accesso libero, no paywall

- **Matrimonio planner completo** — preparazione + documentazione + giorno
  - **Preparazione**: checklist step-by-step (corsi prematrimoniali, documenti, consenso testimoni)
  - **Gallery immagini santa messa**: galleria privata sposi dove fotografo/parenti uploadano foto
  - **Documento checklist**: kit documenti necessari (nulla osta, certificati battesimo, consenso genitori se minori)
  - **Giorno matrimonio**: timeline cerimonia (orario processione, scambio anelli, uscita sposi), foto in tempo reale
  - **Condivisione privata**: link privacy per parenti online (livestream + foto gallery)

- **Battesimo/Cresima preparation tracking** — genitori monitorano processo
  - Calendario appuntamenti (colloquio parroco, rito prep, celebrazione)
  - Documento certificato post-celebrazione PDF
  - Gallery foto battesimo/cresima per famiglia

- **Archivio storico parrocchia digitalizzato** — patrimonio documentale
  - Scansione registri battesimi (anonymizzato per privacy)
  - Storia chiesa (cronologia restauri, foto d'epoca)
  - Elenco benefattori storici
  - Genealogia famiglie parrocchia (consenso opt-in)

- **App mobile** — iOS + Android (wrapper React Native)
  - Notifica push per messe ordinarie (ricordatorio 12h prima)
  - Chat gruppo parocchiale offline-capable
  - Accesso rapido streaming live domenica
  - Preghiere memorizzate offline

- **Dashboard parroco** — analytics comunità
  - Fedeli partecipazione (avg messe/mese)
  - Trending temi biblioteca (cosa legge, cosa scarica)
  - Streaming attendance (live watchers vs archivio replay)
  - Newsletter engagement (open rate, click rate per topic)

---

## Dettagli implementativi per Tier

### Tier Base: Stack semplice

```
Frontend: Angular 21 SSR prerender-only
Backend: API REST mock (no DB)
Hosting: Vercel CDN
Docs: VitePress GitHub Pages
```

### Tier Intermedio: Stack full-stack leggero

```
Frontend: Angular 21 SSR + login, booking form
Backend: Spring Boot 3.4 + PostgreSQL + Redis
Auth: JWT proprietario
Payments: Stripe SDK + Satispay SDK
Email: Brevo / Resend SMTP
Hosting: Vercel (frontend) + VPS own (backend)
```

### Tier Avanzato: Stack complete + media

```
Frontend: Angular 21 SSR + Signals + dashboard
Backend: Spring Boot clean-arch 4-layer
Video: Zoom SDK (webinar) + YouTube API (streaming)
Media: ffmpeg (transcoding), Cloudflare Stream optional
Bible API: Vatican API (OpenBible.info)
Podcast: RSS feed + audio host (Buzzsprout, Transistor)
DB: PostgreSQL 16 + Redis Stack
Auth: JWT + opt-in OAuth
Hosting: VPS Hetzner CCX23 (3 microservizi) + Nginx SSL
```

---

## Scegliere il Tier

### **Base** se:
- Parrocchia piccola (<100 fedeli attivi)
- Budget <€1k
- Esigenza primaria: info orari messe, credibilità online
- No aspettativa prenotazioni sacramenti, streaming

### **Intermedio** se:
- Parrocchia media (100–400 fedeli)
- Voglia digitalizzare prenotazioni (matrimoni, battesimi, catechismo)
- Budget €1.500–2.200
- Diocesi supporta digitale (possibile fundraising 8x1000 online)

### **Avanzato** se:
- Parrocchia grande (400+ fedeli, 10+ messe/settimana)
- Missione apostolica: raggiungere fedeli online (streaming domenica)
- Budget €4k–6k, ROI stimato 12–24 mesi
- Staff willing to learn streaming, digital library, matrimonio planner
- Visione: sito è estensione pastorale, ponte online-offline

---

## Costi aggiuntivi (extra-tier)

| Servizio | Costo mensile | Note |
|----------|---------------|------|
| Zoom webinar | €150–300 | Streaming messe live, capacity 300+ fedeli |
| YouTube streaming | €0 | Gratuito, auto-archive su canale parrocchiale |
| Vatican/Bible API | €0 | Gratuito (open data) |
| Podcast host (audio encicliche) | €20–50 | Buzzsprout, Transistor (auto-RSS) |
| Brevo email marketing | €20–100 | Newsletter >5k contatti, GDPR |
| Storage backup video (1 anno) | €30–100 | Backblaze, Wasabi cold storage |
| SSL Let's Encrypt | €0 | Automatico |
| Consulenza GDPR diocesana | €500–1.000 | Uno-time, handling fedeli data |

---

## Timeline tipica per Tier

| Fase | Base | Intermedio | Avanzato |
|------|------|-----------|----------|
| Discovery | 1 sett | 1 sett | 2 sett |
| Sviluppo | 2–2.5 sett | 6 sett | 12–13 sett |
| Testing + UAT | 0.5 sett | 1.5 sett | 2–3 sett |
| Deploy + training | 0.5 sett | 1 sett | 1–2 sett |
| **Totale** | **4 sett** | **9.5 sett** | **17–20 sett** |

---

## GDPR e Privacy — Conformità per Tier

### Tier Base
- Informativa privacy footer
- Cookie banner
- NO raccolta dati fedeli

### Tier Intermedio
- GDPR completo (Data Protection Policy)
- Crittografia password sposi/genitori
- DPA con Stripe/Satispay
- Retention policy: prenotazioni sacramenti 5 anni (obbligo diocesano)
- Consenso newsletter opt-in

### Tier Avanzato (aggiunto)
- Registro trattamenti (handling video fedeli, biography)
- Video consent form (recording streaming + archive)
- DPA esteso (Zoom, YouTube, podcast host)
- Anonymizzazione dati storici (battesimi, genealogia opt-in)
- Diritto oblio: sposi cancella dati matrimonio → purge foto + documenti

---

## Prossimi step

1. **Contatta Federico** — dimensione parrocchia, budget, feste principali (matrimoni/anno)
2. **Demo live** — accesso Tier Base con dati mock tua parrocchia
3. **Proposta personalizzata** — timeline, SLA uptime 99.5%, training staff streaming
4. **Contratto e kickoff** — discovery call, coordinamento con diocesi
