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

  pessoaApta(brinquedos, animal) {
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
    const ordemAnimaisArray = this.separarElementos(ordemAnimais);

    let pessoa1 = {
      brinquedos: brinquedosP1,
      quantidadeAdotados: 0,
      adotouGato: false
    };

    let pessoa2 = {
      brinquedos: brinquedosP2,
      quantidadeAdotados: 0,
      adotouGato: false
    };

    if (this.temDuplicado(ordemAnimaisArray)) {
      return { erro: 'Animal inválido' };
    }

    if (this.temDuplicado(brinquedosP1) || this.temDuplicado(brinquedosP2)) {
      return { erro: 'Brinquedo inválido' };
    }

    for (const nomeAnimal of ordemAnimaisArray) {
      if (!this.animais.hasOwnProperty(nomeAnimal)) {
        return { erro: 'Animal inválido' };
      }

      const animalAtual = this.animais[nomeAnimal];

      const p1PodeAdotar = this.pessoaApta(pessoa1.brinquedos, nomeAnimal) &&
        pessoa1.quantidadeAdotados < 3 &&
        !(animalAtual.tipo === 'gato' && pessoa1.adotouGato);

      const p2PodeAdotar = this.pessoaApta(pessoa2.brinquedos, nomeAnimal) &&
        pessoa2.quantidadeAdotados < 3 &&
        !(animalAtual.tipo === 'gato' && pessoa2.adotouGato);


      if (!p1PodeAdotar) {
        if (!p2PodeAdotar) {
          registroAnimais.push(`${nomeAnimal} - abrigo`);
        } else {
          if (nomeAnimal === 'Loco' && pessoa2.quantidadeAdotados == 0) {
            registroAnimais.push(`${nomeAnimal} - abrigo`);
            continue;
          }
          pessoa2.quantidadeAdotados += 1;
          if (animalAtual.tipo === 'gato') pessoa2.adotouGato = true;
          registroAnimais.push(`${nomeAnimal} - pessoa 2`);
        }
      } else if (p2PodeAdotar) {
        registroAnimais.push(`${nomeAnimal} - abrigo`);
      } else if (pessoa1.quantidadeAdotados < 3) {
        if (nomeAnimal === 'Loco' && pessoa1.quantidadeAdotados == 0) {
          registroAnimais.push(`${nomeAnimal} - abrigo`);
          continue;
        }
        pessoa1.quantidadeAdotados += 1;
        if (animalAtual.tipo === 'gato') pessoa1.adotouGato = true;
        registroAnimais.push(`${nomeAnimal} - pessoa 1`);
      }
    }

    registroAnimais.sort();

    return { lista: registroAnimais };
  }
}

export { AbrigoAnimais as AbrigoAnimais };