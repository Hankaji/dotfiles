class CubicBezier {
  private cx1: number;
  private cy1: number;
  private cx2: number;
  private cy2: number;

  constructor(x1: number, y1: number, x2: number, y2: number) {
    this.cx1 = x1;
    this.cy1 = y1;
    this.cx2 = x2;
    this.cy2 = y2;
  }

  // Calculate the coefficient for bezier curve
  private calculateBezier(t: number, p1: number, p2: number): number {
    return 3 * (1 - t) ** 2 * t * p1 + 3 * (1 - t) * t ** 2 * p2 + t ** 3;
  }

  // Calculate the derivative of bezier curve
  private calculateBezierDerivative(t: number, p1: number, p2: number): number {
    return (
      3 * (1 - t) * (1 - t) * p1 +
      6 * (1 - t) * t * (p2 - p1) +
      3 * t * t * (1 - p2)
    );
  }

  // Find t value using Newton-Raphson method
  private getTForX(x: number): number {
    let t = x;
    // Newton's method, 8 iterations for precision
    for (let i = 0; i < 8; i++) {
      const currentX = this.calculateBezier(t, this.cx1, this.cx2) - x;
      const derivative = this.calculateBezierDerivative(t, this.cx1, this.cx2);
      if (derivative === 0) break;
      t -= currentX / derivative;
    }
    return t;
  }

  // Get easing value for progress
  getValue(x: number): number {
    if (x === 0 || x === 1) return x;
    return this.calculateBezier(this.getTForX(x), this.cy1, this.cy2);
  }

  bind(): (t: number) => number {
    return (t: number) => this.getValue(t);
  }
}

const Easing = {
  linear: (t: number): number => t,

  bounce: (t: number): number => {
    if (t < 1 / 2.75) {
      return 7.5625 * t * t;
    }
    if (t < 2 / 2.75) {
      const t2 = t - 1.5 / 2.75;
      return 7.5625 * t2 * t2 + 0.75;
    }
    if (t < 2.5 / 2.75) {
      const t2 = t - 2.25 / 2.75;
      return 7.5625 * t2 * t2 + 0.9375;
    }
    const t2 = t - 2.625 / 2.75;
    return 7.5625 * t2 * t2 + 0.984375;
  },

  // Elastic easing
  elastic: (t: number): number => {
    if (t === 0 || t === 1) return t;
    return 2 ** (-10 * t) * Math.sin((t * 10 - 0.75) * ((2 * Math.PI) / 3)) + 1;
  },

  easeInOut: new CubicBezier(0.42, 0, 0.58, 1),
  easeIn: new CubicBezier(0.42, 0, 1, 1),
  easeOut: new CubicBezier(0, 0, 0.58, 1),
};

export { Easing, CubicBezier };
