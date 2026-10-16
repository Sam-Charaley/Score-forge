// Numerical calculus for checking answer keys. A question's solve() works the
// problem out with these (integrating, differentiating, summing) instead of
// restating the closed-form answer, so an algebra slip in the key is caught
// when the test compares solve() with the marked choice.

// Adaptive Simpson's rule: accurate to about 1e-10 on smooth integrands.
export function integrate(f, a, b, tolerance = 1e-11) {
  if (a === b) return 0;
  if (a > b) return -integrate(f, b, a, tolerance);
  const simpson = (lo, hi, flo, fmid, fhi) => ((hi - lo) / 6) * (flo + 4 * fmid + fhi);
  const recurse = (lo, hi, flo, fmid, fhi, whole, tol, depth) => {
    const mid = (lo + hi) / 2;
    const leftMid = (lo + mid) / 2;
    const rightMid = (mid + hi) / 2;
    const fLeftMid = f(leftMid);
    const fRightMid = f(rightMid);
    const left = simpson(lo, mid, flo, fLeftMid, fmid);
    const right = simpson(mid, hi, fmid, fRightMid, fhi);
    if (depth <= 0 || Math.abs(left + right - whole) <= 15 * tol) return left + right + (left + right - whole) / 15;
    return recurse(lo, mid, flo, fLeftMid, fmid, left, tol / 2, depth - 1) + recurse(mid, hi, fmid, fRightMid, fhi, right, tol / 2, depth - 1);
  };
  const fa = f(a);
  const fb = f(b);
  const fm = f((a + b) / 2);
  return recurse(a, b, fa, fm, fb, simpson(a, b, fa, fm, fb), tolerance, 50);
}

// Integral to infinity, by substituting x = a + t/(1 − t) on [0, 1).
export function integrateToInfinity(f, a) {
  return integrate(t => (t >= 1 ? 0 : f(a + t / (1 - t)) / (1 - t) ** 2), 0, 1 - 1e-12);
}

// Five-point central difference: error on the order of h⁴.
export function derivative(f, x, h = 1e-3) {
  return (-f(x + 2 * h) + 8 * f(x + h) - 8 * f(x - h) + f(x - 2 * h)) / (12 * h);
}

export function secondDerivative(f, x, h = 1e-3) {
  return (-f(x + 2 * h) + 16 * f(x + h) - 30 * f(x) + 16 * f(x - h) - f(x - 2 * h)) / (12 * h * h);
}

// Limit as x approaches a. The average of f(a + h) and f(a − h) has error
// c·h² + O(h⁴) (the odd terms cancel), so Richardson extrapolation in h²
// leaves O(h⁴). Throws if the two one-sided values disagree (a jump). The
// probe distance is not smaller because many 0/0 forms (eˣ − 1 − x)/x² lose
// all their digits to cancellation much closer in.
export function limit(f, a) {
  const probe = 1e-5;
  const jumpThreshold = 1e-3;
  const left = f(a - probe);
  const right = f(a + probe);
  if (Math.abs(left - right) > jumpThreshold * Math.max(1, Math.abs(left))) throw new RangeError(`one-sided limits differ at ${a}: ${left} vs ${right}`);
  const symmetric = h => (f(a + h) + f(a - h)) / 2;
  const h = 1e-2;
  return (4 * symmetric(h / 2) - symmetric(h)) / 3;
}

export function limitAtInfinity(f) {
  // Same extrapolation in t = 1/x, for functions approaching L like c/x.
  const x1 = 1e5;
  return 2 * f(2 * x1) - f(x1);
}

// Partial sum of term(n) for n = from..to.
export function partialSum(term, from, to) {
  let total = 0;
  for (let n = from; n <= to; n++) total += term(n);
  return total;
}

// Euler's method: steps of size h from (x0, y0) to x = xEnd.
export function eulerMethod(dydx, x0, y0, h, xEnd) {
  let x = x0;
  let y = y0;
  const steps = Math.round((xEnd - x0) / h);
  for (let i = 0; i < steps; i++) { y += h * dydx(x, y); x += h; }
  return y;
}

// Points to draw a function as a smooth curve in a figure.
export function plot(f, xMin, xMax, segments = 80) {
  return Array.from({ length: segments + 1 }, (_, i) => {
    const x = xMin + ((xMax - xMin) * i) / segments;
    return [Number(x.toFixed(10)), f(x)];
  });
}

// Classic fourth-order Runge-Kutta for dy/dx = f(x, y): accurate to about
// 1e-12 with the default step on the smooth equations AP uses. (Euler's
// method above is for questions that ask about Euler's method itself.)
export function solveODE(dydx, x0, y0, xEnd, steps = 2000) {
  const h = (xEnd - x0) / steps;
  let x = x0;
  let y = y0;
  for (let i = 0; i < steps; i++) {
    const k1 = dydx(x, y);
    const k2 = dydx(x + h / 2, y + (h * k1) / 2);
    const k3 = dydx(x + h / 2, y + (h * k2) / 2);
    const k4 = dydx(x + h, y + h * k3);
    y += (h / 6) * (k1 + 2 * k2 + 2 * k3 + k4);
    x += h;
  }
  return y;
}

// A root of f in [a, b] by bisection; f(a) and f(b) must differ in sign.
export function findRoot(f, a, b) {
  let lo = a;
  let hi = b;
  const fLo = f(lo);
  if (fLo * f(hi) > 0) throw new RangeError(`f has the same sign at ${a} and ${b}`);
  for (let i = 0; i < 200 && hi - lo > 1e-14; i++) {
    const mid = (lo + hi) / 2;
    if ((f(mid) > 0) === (fLo > 0)) lo = mid; else hi = mid;
  }
  return (lo + hi) / 2;
}

// Largest or smallest value of f on [a, b], by a fine scan refined around
// the best sample.
export function extremeValue(f, a, b, kind = 'max') {
  const better = kind === 'max' ? (p, q) => p > q : (p, q) => p < q;
  const samples = 20000;
  let bestX = a;
  for (let i = 0; i <= samples; i++) {
    const x = a + ((b - a) * i) / samples;
    if (better(f(x), f(bestX))) bestX = x;
  }
  // Golden-section refinement on the neighborhood of the best sample.
  let lo = Math.max(a, bestX - (b - a) / samples);
  let hi = Math.min(b, bestX + (b - a) / samples);
  const ratio = (Math.sqrt(5) - 1) / 2;
  for (let i = 0; i < 100; i++) {
    const x1 = hi - ratio * (hi - lo);
    const x2 = lo + ratio * (hi - lo);
    if (better(f(x1), f(x2))) hi = x2; else lo = x1;
  }
  return Math.max(...[f(a), f(b), f((lo + hi) / 2), f(bestX)].map(v => (kind === 'max' ? v : -v))) * (kind === 'max' ? 1 : -1);
}
