// Tipi TypeScript per i dati mock della parrocchia

export interface Indirizzo {
  via: string;
  citta: string;
  provincia: string;
  cap: string;
  regione: string;
  paese: string;
  lat: number;
  lng: number;
}

export interface Contatti {
  telefono: string;
  email: string;
  social: {
    facebook?: string;
    instagram?: string;
  };
}

export interface OrariSegreteria {
  lunedi: string;
  martedi: string;
  mercoledi: string;
  giovedi: string;
  venerdi: string;
  sabato: string;
  domenica: string;
}

export interface MetaSeo {
  title: string;
  description: string;
  keywords: string[];
}

export interface InfoParrocchia {
  ragioneSociale: string;
  nomeCommerciale: string;
  tagline: string;
  diocesi: string;
  indirizzo: Indirizzo;
  contatti: Contatti;
  segreteria: OrariSegreteria;
  metaSeo: MetaSeo;
}

// Messe
export interface Messa {
  ora: string;
  luogo: string;
  note: string;
}

export interface OrarioGiorno {
  giorno: string;
  giornoCodice: string;
  messe: Messa[];
}

export interface OrariMesse {
  orari: OrarioGiorno[];
  noteLiturgia: string;
}

// Sacramenti
export interface Sacramento {
  id: string;
  nome: string;
  icona: string;
  descrizione: string;
  destinatari: string;
  preparazione: string[];
  documenti: string[];
  periodicita: string;
  contatto: string;
}

export interface Sacramenti {
  sacramenti: Sacramento[];
}

// Gruppi
export interface Gruppo {
  id: string;
  nome: string;
  categoria: string;
  icona: string;
  descrizione: string;
  attivita: string[];
  destinatari: string;
  incontri: string;
  referente: string;
  contatto: string;
}

export interface Gruppi {
  gruppi: Gruppo[];
}

// Team
export interface MembroTeam {
  id: number;
  nome: string;
  ruolo: string;
  bio: string;
  specialita: string[];
  image: string;
}

export interface Team {
  team: MembroTeam[];
}

// FAQ
export interface FaqItem {
  domanda: string;
  risposta: string;
}

export interface Faq {
  faq: FaqItem[];
}
