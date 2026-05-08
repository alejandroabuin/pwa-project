import { Component, inject, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatExpansionModule } from '@angular/material/expansion';
import { ActivatedRoute, Router } from '@angular/router';
import { Dog } from '../../models/dog.model';
import { DogService } from '../../services/dog';

@Component({
  selector: 'app-detail',
  imports: [MatExpansionModule, MatButtonModule],
  templateUrl: './detail.html',
  styleUrl: './detail.scss',
})
export class Detail {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private dogService = inject(DogService);

  dog = signal<Dog | undefined>(undefined);

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));

    this.dogService.getDogById(id).subscribe({
      next: (dog) => {
        this.dog.set(dog);
      },
    });
  }

  back(): void {
    this.router.navigate(['/']);
  }
}
