import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { forkJoin, map, Observable, switchMap } from 'rxjs';
import { Pokemon } from 'src/app/models/pokemon.interface';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {
  baseUrl:string= 'https://pokeapi.co/api/v2/pokemon';

  constructor(private http:HttpClient) { }

  getListado(){
    return this.http.get<{ results: { name: string; url: string }[] }>(`${this.baseUrl}?limit=9`).pipe(
      switchMap(response => {
        const requests: Observable<any>[] = response.results.map(pokemon =>
          this.http.get(pokemon.url)
        );
        return forkJoin(requests);
      }),
      map((details): Pokemon[] =>
        details.map(p => ({
          id: p.id,
          name: p.name,
          image: p.sprites.front_default
        }))
      )
    );
  }
}
