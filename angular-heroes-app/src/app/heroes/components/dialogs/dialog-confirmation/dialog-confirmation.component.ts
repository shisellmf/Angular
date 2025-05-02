import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Hero } from 'src/app/heroes/interfaces/hero.interface';
import { HeroesService } from '../../../services/heroes.service';

@Component({
  selector: 'dialogConfirmation',
  templateUrl: './dialog-confirmation.component.html'
})
export class DialogConfirmationComponent {

  public heroid: String="";

  constructor( public dialogRef: MatDialogRef<DialogConfirmationComponent>,
                public heroeService:HeroesService,
                @Inject(MAT_DIALOG_DATA) public data: Hero,){
    this.heroid= data.id;
  }

  onNoClick(){
    this.dialogRef.close("no");
  }

  onyesClick(){
    this.heroeService.deleteHero(this.heroid).subscribe({
      complete: () => {
        this.dialogRef.close();
      }
    })
  }
}
