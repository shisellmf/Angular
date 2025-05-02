import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Hero, Publisher } from '../../interfaces/hero.interface';
import { HeroesService } from '../../services/heroes.service';
import { ActivatedRoute, Router, UrlTree } from '@angular/router';
import { switchMap, throwError } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { DialogConfirmationComponent } from '../../components/dialogs/dialog-confirmation/dialog-confirmation.component';

@Component({
  selector: 'app-new-page',
  templateUrl: './new-page.component.html',
  styles: [
  ]
})
export class NewPageComponent implements OnInit{

  public heroImg?:string="";
  public pagePrevious?:string;

  public formHeroe= new FormGroup({
    id:         new FormControl<string>(''),
    superhero: new FormControl<string>('',{nonNullable:true}),
    publisher:  new FormControl<Publisher>(Publisher.DCComics),
    alter_ego:  new FormControl<string>(''),
    first_appearance:new FormControl<string>(''),
    characters: new FormControl<string>(''),
    alt_img:    new FormControl<string>(''),
  });

  public publishers = [
    { id: 'DC Comics', desc: 'DC - Comics' },
    { id: 'Marvel Comics', desc: 'Marvel - Comics' },
  ];

  constructor(
    private heroesService:HeroesService,
    private activatedRoute:ActivatedRoute,
    private router:Router,
    private snackbar:MatSnackBar,
    private dialog:MatDialog
  ){}

  ngOnInit(): void {
    this.pagePrevious = localStorage.getItem("urlBack") ?? '';
    if(this.router.url.includes("edit")){
      this.activatedRoute.params
      .pipe(
        switchMap(({id}) => this.heroesService.getHeroById(id))
      ).subscribe(hero=>{
        if(!hero){this.router.navigateByUrl("/heroes")}
        this.formHeroe.reset(hero);
      })
    }else{
      //"Crear"
    }
  }

  get currentHero(){
    const hero= this.formHeroe.value as Hero;
    this.heroImg= `assets/heroes/${ hero.id }.jpg`;
    return hero;
  }

  goBack():void {
    this.router.navigateByUrl(this.pagePrevious??'');
  }

  onSubmit():void{
    if(this.formHeroe.invalid) return ;
    if(this.currentHero.id){
      this.heroesService.updateHero(this.currentHero)
      .subscribe(hero => {
          this.showSnackBar(`${hero.superhero} updated!`)
      });
      //return;
    }

    this.heroesService.addHero(this.currentHero)
    .subscribe(hero => {
      this.router.navigate(['/heroes/edit',hero.id]);
      this.showSnackBar(`${hero.superhero} created!`)
    })
    //this.router.navigateByUrl("/heroes")
  }

  onDeleteHero(){
    if(!this.currentHero.id) throw Error('Hero is required');
    const dialogref= this.dialog.open(DialogConfirmationComponent,{
      data:this.formHeroe.value
    })
  }

  showSnackBar(message:string){
    this.snackbar.open(message, 'done',{
      duration:2500
    })
  }

}
