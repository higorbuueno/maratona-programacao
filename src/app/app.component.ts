import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {



  /**
   * CODIFICAÇÃO CIFRA DE CESAR
   */
  alfanumericoCesar = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9', ' '];
  fraseCesar: string = '';
  chaveCesar: number = 3;
  resultadoCesar: string = '';
  cesarFocus: boolean = false;

  /**
   * CODIFICAÇÃO CIFRA DE VIGENERE
   */
  fraseVigenere: string = '';
  chaveVigenere: string = '';
  resultadoVigenere: string = '';
  vigenereFocus: boolean = false;

  /**
   * CODIFICAÇÃO CERCA DE TRILHO
   */
  fraseTrilho: string = '';
  chaveTrilho: string = '';
  resultadoTrilho: string = '';
  trilhoFocus: boolean = false;

  onChangeFraseCesar() {
    if (this.chaveCesar > this.tamanhoDoAlfanumericoCesar) {
      this.chaveCesar = this.tamanhoDoAlfanumericoCesar;
    }

    let arrayResultado = [] as string[];
    this.fraseCesar.split('').forEach((caractere) => {

      // Variáveis para melhorar visualização de código
      const posicaoDoMeuCaracter = this.alfanumericoCesar.findIndex(alfanumerico => alfanumerico === caractere.toUpperCase());

      // Preciso fazer a validação do tamanho do array pra ele não bugar quando for buscar o tamanho limito (36) + a chave.
      // Caso ele esteja dentro do range, eu somo o valor dá própria chave mesmo;
      if (posicaoDoMeuCaracter + this.chaveCesar < this.tamanhoDoAlfanumericoCesar) {
        arrayResultado.push(this.alfanumericoCesar[posicaoDoMeuCaracter + this.chaveCesar]);
      } else {

        // Caso não estiver eu volto pro começo do array continuando a contagem (limito a chave sendo o tamanho da string, para evitar loop)
        const novaPosicaoDoCaracter = (posicaoDoMeuCaracter + this.chaveCesar) - this.tamanhoDoAlfanumericoCesar;
        arrayResultado.push(this.alfanumericoCesar[novaPosicaoDoCaracter]);
      }
    });

    this.resultadoCesar = arrayResultado.join('');
  }

  onChangeResultadoCesar() {
    //  Descriptografar o cesar!
    if (this.chaveCesar > this.tamanhoDoAlfanumericoCesar) {
      this.chaveCesar = this.tamanhoDoAlfanumericoCesar;
    }

    let arrayResultadoDescripto = [] as string[];
    this.resultadoCesar.split('').forEach((caractere) => {

      // Variáveis para melhorar visualização de código
      const posicaoDoMeuCaracter = this.alfanumericoCesar.findIndex(alfanumerico => alfanumerico === caractere.toUpperCase());

      // Preciso fazer a validação do tamanho do array pra ele não bugar quando for buscar o tamanho limito (36) + a chave.
      // Caso ele esteja dentro do range, eu subtraio o valor da própria chave mesmo;
      if (posicaoDoMeuCaracter - this.chaveCesar < this.tamanhoDoAlfanumericoCesar) {
        arrayResultadoDescripto.push(this.alfanumericoCesar[posicaoDoMeuCaracter - this.chaveCesar]);
      } else {

        // Caso não estiver eu volto pro começo do array continuando a contagem (limito a chave sendo o tamanho da string, para evitar loop)
        const novaPosicaoDoCaracter = (posicaoDoMeuCaracter - this.chaveCesar) + this.tamanhoDoAlfanumericoCesar;
        arrayResultadoDescripto.push(this.alfanumericoCesar[novaPosicaoDoCaracter]);
      }
    });

    this.fraseCesar = arrayResultadoDescripto.join('');
  }

  onChangeFraseVigenere() {
    // TODO: FAZER A FUNÇÃO E DEFINIR A VARIÁVEL resultadoVigenere com o codificado.
    this.resultadoVigenere = this.fraseVigenere
  }

  onChangeResultadoVigenere() {
    //  Descriptografar o Vigenere!
  }

  onChangeFraseTrilho() {
    // TODO: FAZER A FUNÇÃO E DEFINIR A VARIÁVEL resultadoTrilho com o codificado.
    this.resultadoTrilho = this.fraseTrilho
  }

  onChangeResultadoTrilho(){
    //  Descriptografar o Trilho!

  }

  get tamanhoDoAlfanumericoCesar() {
    return this.alfanumericoCesar.length;
  }

  get tamanhoDaFraseVigenere() {
    return this.fraseVigenere.length;
  }

}