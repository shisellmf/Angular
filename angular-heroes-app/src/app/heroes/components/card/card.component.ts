import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Hero } from '../../interfaces/hero.interface';

@Component({
  selector: 'heroes-hero-card',
  templateUrl: './card.component.html',
  styles: [
  ]
})
export class CardComponent implements OnInit {

  @Input()
  public hero!: Hero;
  public showHero:boolean=true;

  constructor(private router: Router){

  }


  ngOnInit(): void {
    if ( !this.hero ) this.showHero=false;
  }

  editHero(idHero:String){
    localStorage.setItem("urlBack",this.router.url);
    this.router.navigateByUrl("/heroes/edit/"+idHero);
  }

}
