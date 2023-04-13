import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  ngOnInit(): void {
    this.preencherTabelaVigenere();
  }

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
  alfabetoVigenere = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
  matrizVigenere: string[][] = [];
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
    this.verificarChaveCesar();

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
    this.verificarChaveCesar();

    let arrayResultadoDescripto = [] as string[];
    this.resultadoCesar.split('').forEach((caractere) => {

      // Variáveis para melhorar visualização de código
      const posicaoDoMeuCaracter = this.alfanumericoCesar.findIndex(alfanumerico => alfanumerico === caractere.toUpperCase());

      // Preciso fazer a validação do tamanho do array pra ele não bugar quando for buscar o tamanho limito (36) + a chave.
      // Caso ele esteja dentro do range, eu subtraio o valor da própria chave mesmo;
      if (posicaoDoMeuCaracter - this.chaveCesar > 0) {
        arrayResultadoDescripto.push(this.alfanumericoCesar[posicaoDoMeuCaracter - this.chaveCesar]);
      } else {

        // Caso não estiver eu volto pro começo do array continuando a contagem (limito a chave sendo o tamanho da string, para evitar loop)
        const novaPosicaoDoCaracter = (posicaoDoMeuCaracter - this.chaveCesar) + this.tamanhoDoAlfanumericoCesar;
        arrayResultadoDescripto.push(this.alfanumericoCesar[novaPosicaoDoCaracter]);
      }
    });

    this.fraseCesar = arrayResultadoDescripto.join('');
  }

  verificarChaveCesar() {
    if (this.chaveCesar > this.tamanhoDoAlfanumericoCesar) {
      this.chaveCesar = this.tamanhoDoAlfanumericoCesar;
    }

    if (this.chaveCesar < 0) {
      this.chaveCesar = 0;
    }
  }

  onChangeFraseVigenere() {
    // PALAVRA: HIGORBUENO -> FEITO
    // CHAVE: ABC -> FEITO
    // PALAVRA C/ CHAVE: ABCABCABCAB -> FEITO
    if (this.chaveVigenere) {

      const fraseVigenereEmArray = this.fraseVigenere.split('');
      const chaveVigenereEmArray = this.chaveVigenere.split('');
      let codigoPreenchidoAteOFinal: string[] = [];

      let indexParaMapeamento = 0;

      fraseVigenereEmArray.forEach(l => {
        // Verifico se estou na ultima posição da minha chave, se estiver, volta pro começo
        if (indexParaMapeamento > chaveVigenereEmArray.length - 1) {
          indexParaMapeamento = 0;
        }

        // Preencho meu código preenchido até o final de novo com a letra da chave
        codigoPreenchidoAteOFinal.push(chaveVigenereEmArray[indexParaMapeamento]?.toUpperCase());
        indexParaMapeamento++;
      });


      /*
        BEBE -> PALAVRA
        CIER -> CHAVE
        -
        BEBE -> 1 4 1 4
        CIER -> 2 8 4 17
            -> 3 12 5 21 -> DMFV
  
        DMFV -> 3 12 5 21
        CIER -> 2 8 4 17
        RESUL -> 1 4 1 4
      */

      let hashFinalEmArray: string[] = [];
      for (const i in fraseVigenereEmArray) {
        let indexDaLetraDoCodigoAtual = this.alfabetoVigenere.findIndex(letra => letra === codigoPreenchidoAteOFinal[i]);
        let indexDaLetraDaFraseAtual = this.alfabetoVigenere.findIndex(letra => letra === fraseVigenereEmArray[i]);

        let indexDoHash = indexDaLetraDoCodigoAtual + indexDaLetraDaFraseAtual;

        if (indexDaLetraDaFraseAtual + 1 > this.tamanhoDoAlfabetoVigenere - 1 || indexDaLetraDoCodigoAtual + 1 > this.tamanhoDoAlfabetoVigenere - 1) {
          indexDoHash -= this.tamanhoDoAlfabetoVigenere;
        }

        hashFinalEmArray.push(this.alfabetoVigenere[indexDoHash]);
      }

      this.resultadoVigenere = hashFinalEmArray.join('');
    }
  }

  onChangeResultadoVigenere() {
    //  Descriptografar o Vigenere!
  }

  onChangeFraseTrilho() {
    // TODO: FAZER A FUNÇÃO E DEFINIR A VARIÁVEL resultadoTrilho com o codificado.
    this.resultadoTrilho = this.fraseTrilho
  }

  onChangeResultadoTrilho() {
    //  Descriptografar o Trilho!

  }

  preencherTabelaVigenere() {

    for (const letraQueComecaOArray of this.alfabetoVigenere) {
      // DENTRO DESTE FOR EU TENHO A LETRA EM QUE O ARRAY DEVE COMEÇAR

      let arrayAtual: string[] = [];

      this.alfabetoVigenere.forEach(letra => {
        // Busco a ultima letra adicionada no array pra buscar a proxima letra no meu alfabeto 
        const ultimaLetraAdicionada = arrayAtual[arrayAtual.length - 1];
        const indexDaUltimaLetraAdicionada = this.alfabetoVigenere.findIndex(letra => ultimaLetraAdicionada === letra);

        // Adiciono +1 ao index para pegar a proxima letra
        let indexParaAdicionar: number = 0;
        if (indexDaUltimaLetraAdicionada + 1 > this.tamanhoDoAlfabetoVigenere - 1) {
          indexParaAdicionar = 0;
        } else {
          indexParaAdicionar = indexDaUltimaLetraAdicionada + 1;
        }
        arrayAtual.push(this.alfabetoVigenere[indexParaAdicionar]);
      })
      this.matrizVigenere.push(arrayAtual);
    }
  }

  get tamanhoDoAlfanumericoCesar() {
    return this.alfanumericoCesar.length;
  }

  get tamanhoDaFraseVigenere() {
    return this.fraseVigenere.length;
  }

  get tamanhoDoAlfabetoVigenere() {
    return this.alfabetoVigenere.length;
  }

}
