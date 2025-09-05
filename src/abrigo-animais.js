class AbrigoAnimais {
  animais = {
    Rex: { tipo: 'cão', brinquedos: ['RATO', 'BOLA'] },
    Mimi: { tipo: 'gato', brinquedos: ['BOLA', 'LASER'] },
    Fofo: { tipo: 'gato', brinquedos: ['BOLA', 'RATO', 'LASER'] },
    Zero: { tipo: 'gato', brinquedos: ['RATO', 'BOLA'] },
    Bola: { tipo: 'cão', brinquedos: ['CAIXA', 'NOVELO'] },
    Bebe: { tipo: 'cão', brinquedos: ['LASER', 'RATO', 'BOLA'] },
    Loco: { tipo: 'jabuti', brinquedos: ['SKATE', 'RATO'] },
  };

  separarElementos(brinquedos) {
    if (typeof brinquedos === 'string') {
      return brinquedos.split(',').map(item => item.trim());
    }
    if (Array.isArray(brinquedos)) {
      return brinquedos.map(item => item.trim());
    }
    if (brinquedos instanceof Set) {
      return Array.from(brinquedos).map(item => item.trim());
    }
    return [];
  }

  pessoaApta(brinquedos, animal){
    const brinquedosPessoa = this.separarElementos(brinquedos);
    const brinquedosAnimal = this.animais[animal].brinquedos;

    if (brinquedosAnimal.length !== brinquedosPessoa.length) return false;

    for (let i = 0; i < brinquedos.length; i++){
      if(brinquedosAnimal[i] !== brinquedosPessoa[i]) return false;
    }
    return true;
  }


  encontraPessoas(brinquedosPessoa1, brinquedosPessoa2, ordemAnimais) {
    let registroAnimais = [];

    const brinquedosP1 = this.separarElementos(brinquedosPessoa1);
    const brinquedosP2 = this.separarElementos(brinquedosPessoa2);

    let pessoa1 = {
      brinquedos: brinquedosP1,
      quantidadeAdotados: 0
    };
    
    let pessoa2 = {
      brinquedos: brinquedosP2,
      quantidadeAdotados: 0
    };

    for (const nomeAnimal of ordemAnimais) {
      if (!this.animais.hasOwnProperty(nomeAnimal)) {
        continue; // Tratar animais nao encontrados :TODO:
      }
      if (!this.pessoaApta(pessoa1.brinquedos, nomeAnimal) || pessoa1.quantidadeAdotados == 3){
        if (!this.pessoaApta(pessoa2.brinquedos, nomeAnimal) || pessoa2.quantidadeAdotados == 3){
          // adiciona no registro 
          registroAnimais.push(`${nomeAnimal} - ABRIGO`); // Nenhuma pessoa apta ou ambas ja adotaram 3 ou não possuem brinquedos
        } else {
          pessoa2.quantidadeAdotados += 1;
          registroAnimais.push(`${nomeAnimal} - PESSOA 2`);
        }
      } else if (this.pessoaApta(pessoa2.brinquedos, nomeAnimal) && pessoa2.quantidadeAdotados < 3){
        continue;
      } else if (pessoa1.quantidadeAdotados < 3) {
        pessoa1.quantidadeAdotados += 1;
        registroAnimais.push(`${nomeAnimal} - PESSOA 1`);
      }
    }

    return registroAnimais;
  }
}

export { AbrigoAnimais as AbrigoAnimais };

function main() {
  console.log("************ INICIANDO TESTE DO ABRIGO ************\n");

  // 1. Cria uma instância da classe
  const abrigo = new AbrigoAnimais();

  // 2. Define os dados de entrada para o teste
  const brinquedosPessoa1 = "RATO, BOLA"; // Apta para Rex e Zero
  const brinquedosPessoa2 = "LASER, BOLA"; // Apta para Mimi
  const ordemDeAnimais = ["Rex", "Mimi", "Fofo", "Zero", "Bola", "Pikachu"];

  console.log(`Pessoa 1 tem os brinquedos: [${brinquedosPessoa1}]`);
  console.log(`Pessoa 2 tem os brinquedos: [${brinquedosPessoa2}]`);
  console.log(`Ordem de avaliação dos animais: [${ordemDeAnimais.join(', ')}]\n`);
  
  // 3. Executa o método principal
  const resultado = abrigo.encontraPessoas(
    brinquedosPessoa1,
    brinquedosPessoa2,
    ordemDeAnimais
  );

  // 4. Exibe o resultado formatado
  console.log("------ RESULTADO DO PROCESSO DE ADOÇÃO ------");
  resultado.forEach(log => {
    console.log(`- ${log}`);
  });
  console.log("-------------------------------------------");
}

// Executa a função principal de teste
main();