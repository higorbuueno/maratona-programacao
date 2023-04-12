import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  cifraCesar: string = '';
  cifraVigenere: string = '';
  cercaTrilho: string = '';

  chaveCesar: string = '';
  chaveVigenere: string = '';
  chaveTrilho: string = '';

  resultadoCesar: string = '';
  resultadoVigenere: string = '';
  resultadoTrilho: string = '';

  cesarFocus: boolean = false;
  vigenereFocus: boolean = false;
  trilhoFocus: boolean = false;

  onChangeCifraCesar(){
    // TODO: FAZER A FUNÇÃO E DEFINIR A VARIÁVEL resultadoCesar com o codificado.
    this.resultadoCesar = this.cifraCesar
  }

  onClickCifraVigenere(){
    // TODO: FAZER A FUNÇÃO E DEFINIR A VARIÁVEL resultadoVigenere com o codificado.
    this.resultadoVigenere = this.cifraVigenere

  }

  onClickCercaTrilho(){
    // TODO: FAZER A FUNÇÃO E DEFINIR A VARIÁVEL resultadoTrilho com o codificado.
    this.resultadoTrilho = this.cercaTrilho

  }

}
