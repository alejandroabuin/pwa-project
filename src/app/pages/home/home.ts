import { Component, inject, signal } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Router } from '@angular/router';
import { Dog } from '../../models/dog.model';
import { DogService } from '../../services/dog';

@Component({
  selector: 'app-home',
  imports: [MatProgressSpinnerModule],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {
  private dogService = inject(DogService);
  private router = inject(Router);

  dogs = signal<Dog[]>([]);
  viewMode = signal('cards');
  loading = signal(true);

  ngOnInit(): void {
    this.dogService.getDogs().subscribe({
      next: (dogs) => {
        this.dogs.set(dogs);
        this.loading.set(false);
      },
    });
  }

  changeView(mode: string): void {
    this.viewMode.set(mode);
  }

  goToDetail(id: number): void {
    this.router.navigate(['/detail', id]);
  }
}
