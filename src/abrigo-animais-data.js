import { Animal } from "./animais.js";
const animais = {
    Rex:  new Animal('Rex', 'cão', ['RATO', 'BOLA']),
    Mimi: new Animal('Mimi', 'gato', ['BOLA', 'LASER']),
    Fofo: new Animal('Fofo', 'gato', ['BOLA', 'RATO', 'LASER']),
    Zero: new Animal('Zero', 'gato', ['RATO', 'BOLA']),
    Bola: new Animal('Bola', 'cão', ['CAIXA', 'NOVELO']),
    Bebe: new Animal('Bebe', 'cão', ['LASER', 'RATO', 'BOLA']),
    Loco: new Animal('Loco', 'jabuti', ['SKATE', 'RATO']),
  };
  
  export { animais };