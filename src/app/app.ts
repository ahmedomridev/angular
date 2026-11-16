import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

export interface Conference {
  id: number;
  title: string;
  description: string;
  date: string;
  place: string;
  maxParticipants: number;
  nbParticipants: number;
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  readonly navItems = ['Accueil', 'Conférences', 'Agenda', 'Contact'];
  readonly friends = ['Sami', 'Sarra', 'Amine'];
  readonly notifications = [
    'Nouveau programme publié',
    '2 places disponibles pour Angular 21',
    'Rappel : atelier de networking demain'
  ];

  searchTerm = '';
  conferences: Conference[] = [
    {
      id: 1,
      title: 'Angular 21 : fondements du framework',
      description: 'Découvrez les bases de Angular et les meilleures pratiques de structuration.',
      date: '2026-12-15',
      place: 'Paris',
      maxParticipants: 80,
      nbParticipants: 45
    },
    {
      id: 2,
      title: 'Tests unitaires avec Jasmine',
      description: 'Apprenez à protéger votre code et valider vos composants Angular.',
      date: '2026-12-18',
      place: 'Lyon',
      maxParticipants: 40,
      nbParticipants: 32
    },
    {
      id: 3,
      title: 'UI Design et composants réutilisables',
      description: 'Construisez des interfaces modulaires et maintenables.',
      date: '2026-12-22',
      place: 'Marseille',
      maxParticipants: 25,
      nbParticipants: 25
    }
  ];

  get filteredConferences(): Conference[] {
    const filter = this.searchTerm.trim().toLowerCase();

    if (!filter) {
      return this.conferences;
    }

    return this.conferences.filter((conference) =>
      conference.title.toLowerCase().includes(filter)
    );
  }

  remainingPlaces(conference: Conference): number {
    return conference.maxParticipants - conference.nbParticipants;
  }

  getButtonState(conference: Conference): 'available' | 'limited' | 'full' {
    const remaining = this.remainingPlaces(conference);

    if (remaining <= 0) {
      return 'full';
    }

    if (remaining < 10) {
      return 'limited';
    }

    return 'available';
  }

  register(conference: Conference): void {
    if (this.remainingPlaces(conference) <= 0) {
      return;
    }

    conference.nbParticipants += 1;
  }
}
