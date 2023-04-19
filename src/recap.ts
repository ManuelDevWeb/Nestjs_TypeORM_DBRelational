// Archivo para repasar conceptos de TypeScript

const myName = 'Manuel';

const myAge = 23;

const suma = (a: number, b: number): number => a + b;

suma(2, 3);

class Persona {
  static instance: Persona | null = null;

  constructor(public name: string, public age: number) {}

  getSummary() {
    return `My name is ${this.name} and I am ${this.age} years old.`;
  }

  static create(name: string): Persona {
    if (Persona.instance === null) {
      Persona.instance = new Persona(name, 23);
    }
    return Persona.instance;
  }
}

const persona1 = new Persona('Manuel', 22);
const persona2 = new Persona('Melissa', 23);

console.log(persona1.getSummary());
console.log(persona2.getSummary());
