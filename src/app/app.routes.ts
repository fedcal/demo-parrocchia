import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/home/home.component').then((m) => m.HomeComponent),
    title: "Parrocchia Sant'Antonio — Lecce centro storico"
  },
  {
    path: 'orari-messe',
    loadComponent: () => import('./pages/orari-messe/orari-messe.component').then((m) => m.OrariMesseComponent),
    title: "Orari Messe — Parrocchia Sant'Antonio Lecce"
  },
  {
    path: 'sacramenti',
    loadComponent: () => import('./pages/sacramenti/sacramenti.component').then((m) => m.SacramentiComponent),
    title: "Sacramenti — Parrocchia Sant'Antonio Lecce"
  },
  {
    path: 'gruppi',
    loadComponent: () => import('./pages/gruppi/gruppi.component').then((m) => m.GruppiComponent),
    title: "Gruppi Parrocchiali — Parrocchia Sant'Antonio Lecce"
  },
  {
    path: 'contatti',
    loadComponent: () => import('./pages/contatti/contatti.component').then((m) => m.ContattiComponent),
    title: "Contatti — Parrocchia Sant'Antonio Lecce"
  },
  {
    path: '**',
    redirectTo: ''
  }
];
