import { AbrigoAnimais } from "./abrigo-animais";

describe('Abrigo de Animais', () => {

  test('Deve rejeitar animal inválido', () => {
    const resultado = new AbrigoAnimais().encontraPessoas('CAIXA,RATO', 'RATO,BOLA', 'Lulu');
    expect(resultado.erro).toBe('Animal inválido');
    expect(resultado.lista).toBeFalsy();
  });

  test('Deve encontrar pessoa para um animal', () => {
    const resultado = new AbrigoAnimais().encontraPessoas(
      'RATO,BOLA', 'RATO,NOVELO', 'Rex,Fofo');
      expect(resultado.lista[0]).toBe('Fofo - abrigo');
      expect(resultado.lista[1]).toBe('Rex - pessoa 1');
      expect(resultado.lista.length).toBe(2);
      expect(resultado.erro).toBeFalsy();
  });

  test('Deve encontrar pessoa para um animal intercalando brinquedos', () => {
    const resultado = new AbrigoAnimais().encontraPessoas('BOLA,LASER',
      'BOLA,NOVELO,RATO,LASER', 'Mimi,Fofo,Rex,Bola');

      expect(resultado.lista[0]).toBe('Bola - abrigo');
      expect(resultado.lista[1]).toBe('Fofo - pessoa 2');
      expect(resultado.lista[2]).toBe('Mimi - abrigo');
      expect(resultado.lista[3]).toBe('Rex - abrigo');
      expect(resultado.lista.length).toBe(4);
      expect(resultado.erro).toBeFalsy();
  });

  test('Deve separar elementos corretamente a partir de um Set', () => {
    const abrigo = new AbrigoAnimais();
    const brinquedosEmSet = new Set(['BOLA ', ' RATO', 'LASER']);
    const resultado = abrigo.separarElementos(brinquedosEmSet);
    expect(resultado).toEqual(['BOLA', 'RATO', 'LASER']);
  });

  test('Deve retornar um array vazio se o tipo de entrada de separarElementos for inválido', () => {
    const abrigo = new AbrigoAnimais();
    
    const resultadoComNull = abrigo.separarElementos(null);
    const resultadoComUndefined = abrigo.separarElementos(undefined);
    const resultadoComNumero = abrigo.separarElementos(123);
    const resultadoComObjeto = abrigo.separarElementos({ a: 1 });

    expect(resultadoComNull).toEqual([]);
    expect(resultadoComUndefined).toEqual([]);
    expect(resultadoComNumero).toEqual([]);
    expect(resultadoComObjeto).toEqual([]);
  });

  test('Deve retornar erro para animais duplicados na lista', () => {
    const resultado = new AbrigoAnimais().encontraPessoas(
      'BOLA, RATO', 
      'LASER',
      'Rex, Fofo, Rex'
    );
    expect(resultado).toEqual({ erro: 'Animal inválido' });
  });

  test('Deve enviar Loco para o abrigo se a pessoa 2 for apta mas não tiver adotado outros animais', () => {
    const brinquedosPessoa1 = '';
    const brinquedosPessoa2 = 'SKATE, RATO';
    const ordemAnimais = 'Loco, Rex';

    const resultado = new AbrigoAnimais().encontraPessoas(brinquedosPessoa1, brinquedosPessoa2, ordemAnimais);
    expect(resultado.lista).toContain('Loco - abrigo');
  });

  test('Deve enviar Loco para o abrigo se a pessoa 1 for apta mas não tiver adotado outros animais', () => {
    const brinquedosPessoa1 = 'SKATE, RATO';
    const brinquedosPessoa2 = '';
    const ordemAnimais = 'Loco';

    const resultado = new AbrigoAnimais().encontraPessoas(brinquedosPessoa1, brinquedosPessoa2, ordemAnimais);

    expect(resultado.lista).toContain('Loco - abrigo');
  });

  test('Deve registrar que a pessoa 1 adotou um gato para bloquear adoções futuras de gatos', () => {
    const p1Brinquedos = 'BOLA, LASER'; 
    const p2Brinquedos = 'RATO';
    const ordem = 'Mimi';

    const resultado = new AbrigoAnimais().encontraPessoas(p1Brinquedos, p2Brinquedos, ordem);
    
    expect(resultado.lista).toContain('Mimi - pessoa 1');
    expect(resultado.erro).toBeFalsy();
  });

  test('Deve rejeitar brinquedo duplicado', () => {
    const resultado = new AbrigoAnimais().encontraPessoas('BOLA,BOLA',
      'BOLA,NOVELO,RATO,LASER', 'Mimi,Fofo,Rex,Bola');

      expect(resultado.erro).toBe('Brinquedo inválido');
      expect(resultado.lista).toBeFalsy();
  });
});