import { Injectable } from '@angular/core';
import { PokemonService } from './listado/pokemon.service';

@Injectable({
  providedIn: 'root'
})
export class FacadeService {

  constructor(private pokemonService:PokemonService) { }

  getListadoPokemon(){
    return this.pokemonService.getListado();
  }
}
