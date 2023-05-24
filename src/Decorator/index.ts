class StackCalculator {
  private stack: number[];

  constructor() {
    this.stack = [];
  }

  putValue(value: number): void {
    this.stack.push(value);
  }

  getValue(): number | undefined {
    return this.stack.pop();
  }

  peekValue(): number | undefined {
    return this.stack[this.stack.length - 1];
  }

  clear(): void {
    this.stack = [];
  }

  divide(): number {
    const divisor = this.getValue();
    const dividend = this.getValue();
    const result = dividend / divisor;
    this.putValue(result);
    return result;
  }

  multiply(): number {
    const multiplicand = this.getValue();
    const multiplier = this.getValue();
    const result = multiplier * multiplicand;
    this.putValue(result);
    return result;
  }
}

class EnhancedCalculator {
  private calculator: StackCalculator;

  constructor(calculator: StackCalculator) {
    this.calculator = calculator;
  }

  add(): number {
    const addend2 = this.calculator.getValue();
    const addend1 = this.calculator.getValue();
    const result = addend1 + addend2;
    this.calculator.putValue(result);
    return result;
  }

  divide(): number {
    const divisor = this.calculator.peekValue();
    if (divisor === 0) {
      throw new Error("Division by 0");
    }
    return this.calculator.divide();
  }

  putValue(value: number): void {
    this.calculator.putValue(value);
  }

  getValue(): number | undefined {
    return this.calculator.getValue();
  }

  peekValue(): number | undefined {
    return this.calculator.peekValue();
  }

  clear(): void {
    this.calculator.clear();
  }

  multiply(): number {
    return this.calculator.multiply();
  }
}

const calculator = new StackCalculator();
const enhancedCalculator = new EnhancedCalculator(calculator);

enhancedCalculator.putValue(4);
enhancedCalculator.putValue(3);
console.log(enhancedCalculator.add()); // 4+3 = 7
enhancedCalculator.putValue(2);
console.log(enhancedCalculator.multiply()); // 7*2 = 14
// enhancedCalculator.putValue(0)
// console.log(enhancedCalculator.divide()) // 14/0 -> Error('Division by 0')
