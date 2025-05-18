import { Component, OnInit } from '@angular/core';
import { Pokemon } from 'src/app/models/pokemon.interface';
import { FacadeService } from '../../services/facade.service';

@Component({
  selector: 'app-list-pokemon',
  templateUrl: './list-pokemon.component.html',
  styleUrls: ['./list-pokemon.component.scss']
})
export class ListPokemonComponent implements OnInit {
  listado:Pokemon[]=[];
  constructor(private facadeService:FacadeService){}

  ngOnInit(): void {
    this.getListado();
  }

  getListado(){
    this.facadeService.getListadoPokemon().subscribe((data: Pokemon[]) => {
      this.listado = data;
    });
  }
}
