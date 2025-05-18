import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatButton } from '@angular/material/button';
import { Pasatiempo } from 'src/app/models/entrenador.interface';

@Component({
  selector: 'app-form-entrenador',
  templateUrl: './form-entrenador.component.html',
  styleUrls: ['./form-entrenador.component.scss']
})
export class FormEntrenadorComponent implements OnInit {
  @ViewChild('btnContinuar', {static: true}) private btnContinuar!: MatButton;
  profileForm: FormGroup;
  disabledButton: boolean= false;
  descripcionDocumento:string='Documento';
  patternDui:RegExp = /^\d{8}-\d{1}$/;

  pasatiempos: Pasatiempo[] = [
    {value: '0', viewValue: 'Jugar Fútbol'},
    {value: '1', viewValue: 'Jugar Basquetball'},
    {value: '2', viewValue: 'Jugar Tennis'},
    {value: '3', viewValue: 'Jugar Voleibol'},
    {value: '4', viewValue: 'Jugar Fifa'},
    {value: '5', viewValue: 'Jugar Videojuegos'},
  ];

  constructor(private fb: FormBuilder) {
    this.profileForm = this.fb.group({
      nombre: ['', Validators.required],
      pasatiempo: [''],
      cumpleanos: ['',Validators.required],
      documento: ['']
    });
  }

  ngOnInit(): void {
    this.profileForm.statusChanges.subscribe(status => {
      if (status === 'VALID') {
        this.btnContinuar.disabled=false;
      } else {
        this.btnContinuar.disabled=true;
      }
    });
  }

  onSubmit() {
    if (this.profileForm.valid) {
      console.log(this.profileForm.value);
    }
  }

  updateDuiValidator(cumpleanos:Date){
    const today = new Date();
    const birth = new Date(cumpleanos);
    let isAdult = today.getFullYear() - birth.getFullYear();
    this.setValidatorDui(isAdult);
  }

  setValidatorDui(isAdult:number){
    const documentoControl = this.profileForm.get('documento');
    if (isAdult > 18) {
      this.descripcionDocumento= 'DUI';
      documentoControl?.setValidators([Validators.required,Validators.pattern(this.patternDui)]);
    } else {
      this.descripcionDocumento= 'Carnet de Minoridad';
      //documentoControl?.setValidators([Validators.pattern(this.patternDui)]);
    }
    documentoControl?.updateValueAndValidity();
  }

}
