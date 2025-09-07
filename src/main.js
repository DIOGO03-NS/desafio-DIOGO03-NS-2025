
import { AbrigoAnimais } from './abrigo-animais.js';
// testando 

// main
function main() {
    // importa abrigo animais 
    
  
    // cria uma instancia do abrigo
    const abrigo = new AbrigoAnimais();
  
    // Define os brinquedos que cada pessoa possui
    const brinquedosPessoa1 = 'RATO, BOLA, LASER';
    const brinquedosPessoa2 = 'CAIXA, NOVELO, SKATE';
  
    // Define a ordem dos animais a serem considerados para adoção
    const ordemAnimais = ['Rex', 'Mimi', 'Fofo', 'Zero', 'Bola', 'Bebe', 'Loco'];
  
    // Encontra as pessoas aptas a adotar os animais
    const resultado = abrigo.encontraPessoas(brinquedosPessoa1, brinquedosPessoa2, ordemAnimais);
    console.log(resultado);
  }
  
  main();