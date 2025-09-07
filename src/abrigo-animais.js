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

    if (this.animais[animal].tipo === 'jabuti') {
      const temSkate = brinquedosPessoa.includes('SKATE');
      const temRato = brinquedosPessoa.includes('RATO');
      
      return temSkate && temRato;
    }

    let indiceAnimal = 0; 
    
    for (const brinquedoDaPessoa of brinquedosPessoa) {
        if (brinquedoDaPessoa === brinquedosAnimal[indiceAnimal]) {
            indiceAnimal++;
        }
        if (indiceAnimal === brinquedosAnimal.length) {
            return true;
        }
    }
    return false;
  }

  temDuplicado(array) {
    return new Set(array).size !== array.length;
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

    if (this.temDuplicado(ordemAnimais)) {
      registroAnimais.push(`erro: - Animal invalido`);
      return registroAnimais;
    }

    if (this.temDuplicado(brinquedosP1) || this.temDuplicado(brinquedosP2)) {
      registroAnimais.push(`erro: - Brinquedo inválido`);
      return registroAnimais;
    }


    for (const nomeAnimal of ordemAnimais) {
      if (!this.animais.hasOwnProperty(nomeAnimal)) {                                             // Animal nao existe
        registroAnimais.push(`erro: - Animal inválido`);
        return registroAnimais;
      }
      if (!this.pessoaApta(pessoa1.brinquedos, nomeAnimal) || pessoa1.quantidadeAdotados == 3){   // Pessoa 1 não apta ou ja adotou 3
        if (!this.pessoaApta(pessoa2.brinquedos, nomeAnimal) || pessoa2.quantidadeAdotados == 3){ // Pessoa 2 não apta ou ja adotou 3
          // adiciona no registro 
          registroAnimais.push(`${nomeAnimal} - ABRIGO`);                                         // Nenhuma pessoa apta ou ambas ja adotaram 3 ou não possuem brinquedos
        } else {            
          // checa se é o Loco
          if (nomeAnimal === 'Loco' && pessoa2.quantidadeAdotados == 0) {                   // Pessoa 2 nao pode adotar o Loco se for o primeiro animal
            registroAnimais.push(`${nomeAnimal} - ABRIGO`);
            continue;
          }
          pessoa2.quantidadeAdotados += 1;
          registroAnimais.push(`${nomeAnimal} - PESSOA 2`);
        }
      } else if (this.pessoaApta(pessoa2.brinquedos, nomeAnimal) && pessoa2.quantidadeAdotados < 3){    
        registroAnimais.push(`${nomeAnimal} - ABRIGO`);                                            // Ambas as pessoas aptas, mas nenhuma pode adotar;
      } else if (pessoa1.quantidadeAdotados < 3) {  
        // checa se é o Loco
        if (nomeAnimal === 'Loco' && pessoa1.quantidadeAdotados == 0) {                   // Pessoa 1 nao pode adotar o Loco se for o primeiro animal
          registroAnimais.push(`${nomeAnimal} - ABRIGO`);
          continue;
        }
        // Pessoa 1 apta e pode adotar
        pessoa1.quantidadeAdotados += 1;
        registroAnimais.push(`${nomeAnimal} - PESSOA 1`);
      }
    }

    return registroAnimais;
  }
}

export { AbrigoAnimais as AbrigoAnimais };