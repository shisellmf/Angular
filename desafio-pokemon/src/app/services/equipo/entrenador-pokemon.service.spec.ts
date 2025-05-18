import { TestBed } from '@angular/core/testing';

import { EntrenadorPokemonService } from './entrenador-pokemon.service';

describe('EntrenadorPokemonService', () => {
  let service: EntrenadorPokemonService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EntrenadorPokemonService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
