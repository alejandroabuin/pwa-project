import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Dog as DogModel } from '../models/dog.model';

@Injectable({
  providedIn: 'root',
})
export class DogService {
  private http = inject(HttpClient);

  getDogs(): Observable<DogModel[]> {
    return this.http
      .get<{ message: string[] }>('https://dog.ceo/api/breed/hound/images/random/12')
      .pipe(
        map((response) =>
          response.message.map((image, index) => ({
            id: index + 1,
            name: `Dog ${index + 1}`,
            image,
          })),
        ),
      );
  }

  getDogById(id: number): Observable<DogModel | undefined> {
    return this.getDogs().pipe(map((dogs) => dogs.find((dog) => dog.id === id)));
  }
}
