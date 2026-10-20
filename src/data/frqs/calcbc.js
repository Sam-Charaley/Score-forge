// AP Calculus BC free-response practice: two per FRQ type, in the style of
// the current exam. Answers are written (worked on paper), then self-checked
// against an AP-style rubric: one point per line, each one a student can tick.
// FRQ ids are permanent once reviewed: saved self-checks point at them.
// Rubric point ids are permanent too: saved scores list the ones earned.
// All data and contexts are written for ScoreForge.
import { plot } from '../questions/calcMath.js'

// graph-002: f′ is the lower half of a circle of radius 2 on [−2, 2], then two
// line segments. The arc is drawn as many short segments.
const LOWER_SEMICIRCLE = plot(x => -Math.sqrt(Math.max(0, 4 - x * x)), -2, 2, 40);

export const FRQ_TYPES = {
  rates: 'Rates In and Out',
  particle: 'Particle and Vector Motion',
  graph: 'Analysis of a Graph of f′',
  diffeq: 'Differential Equations',
  parametric: 'Parametric and Polar Curves',
  series: 'Taylor and Power Series',
};

export default [
  {
    id: 'calcbc-frq-rates-001',
    type: 'rates',
    title: 'Rain barrel',
    intro: 'Calculator allowed. Rainwater flows into a barrel at a rate of R(t) gallons per hour, where R is a differentiable function of t and t is measured in hours for 0 ≤ t ≤ 12. Selected values of R(t) are given in the table. Water drains out of the barrel at a rate modeled by D(t) = 8 + 6 sin(t/3) gallons per hour. At time t = 0 the barrel holds 50 gallons of water.',
    figure: { type: 'table', columns: ['t (hours)', 'R(t) (gallons per hour)'], rows: [[0, 10], [3, 14], [5, 15], [8, 12], [12, 8]],
      alt: 'Table of the inflow rate R(t) in gallons per hour: R(0) = 10, R(3) = 14, R(5) = 15, R(8) = 12 and R(12) = 8.' },
    reviewed: false,
    parts: [
      {
        id: 'a',
        prompt: 'Use the data in the table to approximate R′(4). Show the computations that lead to your answer, and indicate units of measure.',
        solution: 'R′(4) ≈ (R(5) − R(3))/(5 − 3) = (15 − 14)/2 = 0.5 gallons per hour per hour.',
        points: [
          { id: 'a1', text: 'Uses a difference quotient from the table on an interval containing t = 4: (R(5) − R(3))/(5 − 3)' },
          { id: 'a2', text: 'Gets 0.5 with units of gallons per hour per hour' },
        ],
      },
      {
        id: 'b',
        prompt: 'Use a trapezoidal sum with the four subintervals indicated by the table to approximate ∫₀¹² R(t) dt. Using correct units, explain the meaning of ∫₀¹² R(t) dt in the context of this problem.',
        solution: '∫₀¹² R(t) dt ≈ 3(10 + 14)/2 + 2(14 + 15)/2 + 3(15 + 12)/2 + 4(12 + 8)/2 = 36 + 29 + 40.5 + 40 = 145.5. The integral is the total number of gallons of rainwater that flow into the barrel from t = 0 to t = 12 hours.',
        points: [
          { id: 'b1', text: 'Sets up a trapezoidal sum using each subinterval\'s own width (3, 2, 3 and 4)' },
          { id: 'b2', text: 'Gets 145.5' },
          { id: 'b3', text: 'Explains the integral as the total gallons of water flowing in over 0 ≤ t ≤ 12 hours, with units' },
        ],
      },
      {
        id: 'c',
        prompt: 'Is the amount of water in the barrel increasing or decreasing at time t = 5 hours? Give a reason for your answer.',
        solution: 'The rate of change of the amount of water is R(5) − D(5) = 15 − (8 + 6 sin(5/3)) = 15 − 13.972 = 1.028 > 0, so the amount of water is increasing at t = 5.',
        points: [
          { id: 'c1', text: 'Compares R(5) = 15 with D(5) ≈ 13.972, concluding the amount is increasing because R(5) − D(5) > 0' },
        ],
      },
      {
        id: 'd',
        prompt: 'Use your answer from part (b) to approximate the amount of water in the barrel at time t = 12 hours.',
        solution: 'W(12) = 50 + ∫₀¹² R(t) dt − ∫₀¹² D(t) dt ≈ 50 + 145.5 − 125.766 = 69.734 gallons. (∫₀¹² D(t) dt ≈ 125.766 by calculator.)',
        points: [
          { id: 'd1', text: 'Writes the amount as 50 + ∫₀¹² R(t) dt − ∫₀¹² D(t) dt' },
          { id: 'd2', text: 'Gets ∫₀¹² D(t) dt ≈ 125.766' },
          { id: 'd3', text: 'Gets about 69.734 gallons (69.733 or 69.734)' },
        ],
      },
    ],
  },
  {
    id: 'calcbc-frq-rates-002',
    type: 'rates',
    title: 'Concert line',
    intro: 'Calculator allowed. Fans line up outside a concert hall. On a particular evening, fans join the line at a rate of A(t) people per minute, where A is a differentiable function of t and t is measured in minutes for 0 ≤ t ≤ 60. Selected values of A(t) are given in the table. Starting at t = 0 the doors admit fans from the front of the line at a constant rate of 9 people per minute. At time t = 0 there are 40 people in line.',
    figure: { type: 'table', columns: ['t (minutes)', 'A(t) (people per minute)'], rows: [[0, 12], [10, 17], [20, 17], [30, 12], [40, 7], [60, 12]],
      alt: 'Table of the rate fans join the line, A(t), in people per minute: A(0) = 12, A(10) = 17, A(20) = 17, A(30) = 12, A(40) = 7 and A(60) = 12.' },
    reviewed: false,
    parts: [
      {
        id: 'a',
        prompt: 'Use a right Riemann sum with the five subintervals indicated by the table to approximate ∫₀⁶⁰ A(t) dt. Using correct units, explain the meaning of this integral in the context of the problem.',
        solution: '∫₀⁶⁰ A(t) dt ≈ 10(17) + 10(17) + 10(12) + 10(7) + 20(12) = 170 + 170 + 120 + 70 + 240 = 770. The integral is the total number of people who join the line from t = 0 to t = 60 minutes.',
        points: [
          { id: 'a1', text: 'Sets up a right Riemann sum using the right endpoint of each subinterval and its width' },
          { id: 'a2', text: 'Gets 770' },
          { id: 'a3', text: 'Explains the integral as the total number of people who join the line over the 60 minutes' },
        ],
      },
      {
        id: 'b',
        prompt: 'Must there be a value of t, for 0 < t < 60, at which A′(t) = 0? Justify your answer.',
        solution: 'Yes. A is differentiable, so it is continuous on [10, 20] and differentiable on (10, 20). Since A(10) = A(20) = 17, the Mean Value Theorem guarantees a value c in (10, 20) with A′(c) = (17 − 17)/(20 − 10) = 0.',
        points: [
          { id: 'b1', text: 'Notes A(10) = A(20) (or another pair of equal values)' },
          { id: 'b2', text: 'Answers yes, citing the Mean Value Theorem (or Rolle\'s theorem) with the conditions that A is continuous and differentiable' },
        ],
      },
      {
        id: 'c',
        prompt: 'Use your answer from part (a) to approximate the number of people in line at time t = 60 minutes.',
        solution: 'People in line at t = 60 ≈ 40 + 770 − 9(60) = 40 + 770 − 540 = 270 people.',
        points: [
          { id: 'c1', text: 'Writes 40 + ∫₀⁶⁰ A(t) dt − 9(60) and gets 270' },
        ],
      },
      {
        id: 'd',
        prompt: 'For 0 ≤ t ≤ 60, the rate at which fans join the line is modeled by f(t) = 12 + 6 sin(πt/30). Using this model, find the time t at which the line is longest. Justify your answer.',
        solution: 'With the model, the number in line is L(t) = 40 + ∫₀ᵗ (f(s) − 9) ds, so L′(t) = f(t) − 9. L′(t) = 0 when sin(πt/30) = −1/2, at t = 35 and t = 55. Candidates: L(0) = 40, L(35) = 40 + ∫₀³⁵ (f(s) − 9) ds ≈ 251.915, L(55) ≈ 212.676, L(60) = 220. The line is longest at t = 35 minutes, with about 252 people.',
        points: [
          { id: 'd1', text: 'Sets L′(t) = f(t) − 9 = 0' },
          { id: 'd2', text: 'Finds the critical points t = 35 and t = 55' },
          { id: 'd3', text: 'Justifies with a candidates test (or sign analysis of L′) and answers t = 35' },
        ],
      },
    ],
  },
  {
    id: 'calcbc-frq-particle-001',
    type: 'particle',
    title: 'Particle in the plane',
    intro: 'Calculator allowed. A particle moves in the xy-plane so that its velocity vector at time t is ⟨x′(t), y′(t)⟩ = ⟨1 + 2 sin(t²), 4 cos(0.5t)⟩ for 0 ≤ t ≤ 3. At time t = 0 the particle is at the point (2, −1).',
    reviewed: false,
    parts: [
      {
        id: 'a',
        prompt: 'Find the speed of the particle at time t = 1.5, and find its acceleration vector at time t = 1.5.',
        solution: 'Speed = √(x′(1.5)² + y′(1.5)²) = √(2.556² + 2.927²) ≈ 3.886. Acceleration = ⟨x″(1.5), y″(1.5)⟩ = ⟨4(1.5)cos(2.25), −2 sin(0.75)⟩ ≈ ⟨−3.769, −1.363⟩.',
        points: [
          { id: 'a1', text: 'Speed about 3.886' },
          { id: 'a2', text: 'Acceleration about ⟨−3.769, −1.363⟩' },
        ],
      },
      {
        id: 'b',
        prompt: 'For 0 < t < 3, find all times at which the particle is moving to the left. Give a reason for your answer.',
        solution: 'The particle moves to the left when x′(t) < 0, that is 1 + 2 sin(t²) < 0, or sin(t²) < −1/2. For 0 < t < 3 this happens when 7π/6 < t² < 11π/6, so for 1.915 < t < 2.400.',
        points: [
          { id: 'b1', text: 'States that the particle moves left when x′(t) < 0' },
          { id: 'b2', text: 'Gets the interval 1.915 < t < 2.400 (accept 1.914 to 1.915 and 2.399 to 2.400)' },
        ],
      },
      {
        id: 'c',
        prompt: 'Find the total distance traveled by the particle over the time interval 0 ≤ t ≤ 3.',
        solution: 'Distance = ∫₀³ √((1 + 2 sin(t²))² + (4 cos(0.5t))²) dt ≈ 10.013.',
        points: [
          { id: 'c1', text: 'Writes the integral of speed, ∫₀³ √(x′(t)² + y′(t)²) dt' },
          { id: 'c2', text: 'Gets about 10.013 (10.012 or 10.013)' },
        ],
      },
      {
        id: 'd',
        prompt: 'Find the coordinates of the particle at time t = 3.',
        solution: 'x(3) = 2 + ∫₀³ (1 + 2 sin(t²)) dt ≈ 2 + 4.547 = 6.547. y(3) = −1 + ∫₀³ 4 cos(0.5t) dt = −1 + 8 sin(1.5) ≈ 6.980. The particle is at about (6.547, 6.980).',
        points: [
          { id: 'd1', text: 'Uses a starting coordinate plus a definite integral of velocity for at least one coordinate' },
          { id: 'd2', text: 'x(3) ≈ 6.547' },
          { id: 'd3', text: 'y(3) ≈ 6.980' },
        ],
      },
    ],
  },
  {
    id: 'calcbc-frq-particle-002',
    type: 'particle',
    title: 'Particle on a line',
    intro: 'No calculator. A particle moves along the x-axis so that its velocity at time t is v(t) = t² − 6t + 8 for 0 ≤ t ≤ 5. At time t = 0 the particle is at position x = 2.',
    reviewed: false,
    parts: [
      {
        id: 'a',
        prompt: 'At what times in the interval 0 < t < 5 does the particle change direction? Justify your answer.',
        solution: 'v(t) = (t − 2)(t − 4), which is zero at t = 2 and t = 4. v changes from positive to negative at t = 2 and from negative to positive at t = 4, so the particle changes direction at both t = 2 and t = 4.',
        points: [
          { id: 'a1', text: 'Finds v(t) = 0 at t = 2 and t = 4' },
          { id: 'a2', text: 'Justifies with the sign change of v(t) at each time' },
        ],
      },
      {
        id: 'b',
        prompt: 'Is the speed of the particle increasing or decreasing at time t = 4.5? Give a reason for your answer.',
        solution: 'v(4.5) = 20.25 − 27 + 8 = 1.25 > 0 and a(t) = v′(t) = 2t − 6, so a(4.5) = 3 > 0. Velocity and acceleration have the same sign, so the speed is increasing.',
        points: [
          { id: 'b1', text: 'Finds v(4.5) = 1.25 and a(4.5) = 3' },
          { id: 'b2', text: 'Concludes the speed is increasing because v and a have the same sign' },
        ],
      },
      {
        id: 'c',
        prompt: 'Find the position of the particle at time t = 5.',
        solution: 'x(5) = 2 + ∫₀⁵ (t² − 6t + 8) dt = 2 + [t³/3 − 3t² + 8t] from 0 to 5 = 2 + (125/3 − 75 + 40) = 2 + 20/3 = 26/3.',
        points: [
          { id: 'c1', text: 'Writes x(5) = 2 + ∫₀⁵ v(t) dt' },
          { id: 'c2', text: 'Gets 26/3' },
        ],
      },
      {
        id: 'd',
        prompt: 'Find the total distance traveled by the particle over the interval 0 ≤ t ≤ 5.',
        solution: 'Split where v changes sign. With F(t) = t³/3 − 3t² + 8t: on [0, 2] the particle moves F(2) − F(0) = 20/3; on [2, 4] it moves |F(4) − F(2)| = |16/3 − 20/3| = 4/3; on [4, 5] it moves F(5) − F(4) = 20/3 − 16/3 = 4/3. Total distance = 20/3 + 4/3 + 4/3 = 28/3.',
        points: [
          { id: 'd1', text: 'Uses ∫₀⁵ |v(t)| dt, or splits the interval at t = 2 and t = 4' },
          { id: 'd2', text: 'Gets 28/3' },
        ],
      },
    ],
  },
  {
    id: 'calcbc-frq-graph-001',
    type: 'graph',
    title: 'Accumulation from a graph',
    intro: 'No calculator. The continuous function f is defined on the closed interval −4 ≤ x ≤ 6. The graph of f, shown in the figure, consists of three line segments. Let g be the function given by g(x) = 5 + ∫₀ˣ f(t) dt, so that g′(x) = f(x).',
    figure: { type: 'graph', xLabel: 'x', yLabel: 'f(x)', xMin: -4, xMax: 6, xStep: 1, yMin: -3, yMax: 3, yStep: 1,
      series: [{ points: [[-4, 2], [0, -2], [3, 1], [6, -2]] }],
      alt: 'Graph of f for −4 ≤ x ≤ 6, made of three line segments. It falls from (−4, 2) to (0, −2), crossing zero at x = −2. It rises from (0, −2) to (3, 1), crossing zero at x = 2. It falls from (3, 1) to (6, −2), crossing zero at x = 4.' },
    reviewed: false,
    parts: [
      {
        id: 'a',
        prompt: 'Find g(3) and g(−4).',
        solution: 'g(3) = 5 + ∫₀³ f(t) dt = 5 + (−2 + 1/2) = 3.5, using the triangle below the axis from 0 to 2 (area 2) and the triangle above it from 2 to 3 (area 1/2). g(−4) = 5 + ∫₀⁻⁴ f(t) dt = 5 − ∫₋₄⁰ f(t) dt = 5 − (2 − 2) = 5.',
        points: [
          { id: 'a1', text: 'g(3) = 3.5' },
          { id: 'a2', text: 'g(−4) = 5, reversing the limits correctly' },
        ],
      },
      {
        id: 'b',
        prompt: 'Find the x-coordinate of each point at which g has a relative minimum on the interval −4 < x < 6. Justify your answer.',
        solution: 'g′(x) = f(x), which is zero at x = −2, x = 2 and x = 4. g′ changes from negative to positive only at x = 2, so g has a relative minimum at x = 2 and nowhere else.',
        points: [
          { id: 'b1', text: 'Identifies x = 2 as the only relative minimum' },
          { id: 'b2', text: 'Justifies with g′ = f changing from negative to positive at x = 2' },
        ],
      },
      {
        id: 'c',
        prompt: 'Find the absolute maximum value of g on the interval −4 ≤ x ≤ 6. Justify your answer.',
        solution: 'Candidates are the endpoints and the critical points: g(−4) = 5, g(−2) = 5 − ∫₋₂⁰ f(t) dt = 5 + 2 = 7, g(2) = 5 − 2 = 3, g(4) = 3 + 1 = 4, g(6) = 4 − 2 = 2. The absolute maximum value is 7, at x = −2.',
        points: [
          { id: 'c1', text: 'Considers g at x = −4, the critical points x = −2, 2, 4, and x = 6 (a candidates test)' },
          { id: 'c2', text: 'Answers 7' },
        ],
      },
      {
        id: 'd',
        prompt: 'Find the x-coordinate of each point of inflection of the graph of g on the interval −4 < x < 6. Give a reason for your answer.',
        solution: 'g″(x) = f′(x). f′ changes sign at x = 0 (f goes from decreasing to increasing) and at x = 3 (f goes from increasing to decreasing), so the graph of g has points of inflection at x = 0 and x = 3.',
        points: [
          { id: 'd1', text: 'Answers x = 0 and x = 3, because f′ = g″ changes sign there' },
        ],
      },
      {
        id: 'e',
        prompt: 'Find lim (x → 0) of (g(x) − 5)/sin(2x), or show that it does not exist.',
        solution: 'As x → 0, g(x) − 5 → ∫₀⁰ f(t) dt = 0 and sin(2x) → 0, so L\'Hôpital\'s rule applies: the limit is lim g′(x)/(2 cos(2x)) = f(0)/2 = −2/2 = −1.',
        points: [
          { id: 'e1', text: 'Shows the limit has the form 0/0 and applies L\'Hôpital\'s rule' },
          { id: 'e2', text: 'Gets −1' },
        ],
      },
    ],
  },
  {
    id: 'calcbc-frq-graph-002',
    type: 'graph',
    title: 'Reading f from its derivative',
    intro: 'No calculator. The function f is differentiable on the closed interval −2 ≤ x ≤ 6, and f(2) = 1. The graph of f′, the derivative of f, consists of a semicircle (the lower half of the circle of radius 2 centered at the origin) and two line segments, as shown in the figure.',
    figure: { type: 'graph', xLabel: 'x', yLabel: 'f′(x)', xMin: -2, xMax: 6, xStep: 1, yMin: -3, yMax: 3, yStep: 1,
      series: [{ points: [...LOWER_SEMICIRCLE, [4, 2], [6, 0]] }],
      alt: 'Graph of f′ for −2 ≤ x ≤ 6. From x = −2 to x = 2 it is a semicircle below the x-axis, starting at 0, reaching its lowest value −2 at x = 0, and returning to 0 at x = 2. It then rises in a straight line to (4, 2) and falls in a straight line to (6, 0).' },
    reviewed: false,
    parts: [
      {
        id: 'a',
        prompt: 'Find f(−2) and f(6).',
        solution: 'f(−2) = f(2) − ∫₋₂² f′(x) dx = 1 − (−2π) = 1 + 2π, since the semicircle below the axis has area (1/2)π(2²) = 2π. f(6) = f(2) + ∫₂⁶ f′(x) dx = 1 + (1/2)(4)(2) = 5.',
        points: [
          { id: 'a1', text: 'f(−2) = 1 + 2π' },
          { id: 'a2', text: 'f(6) = 5' },
        ],
      },
      {
        id: 'b',
        prompt: 'On what open intervals is the graph of f concave up? Give a reason for your answer.',
        solution: 'The graph of f is concave up where f′ is increasing. f′ increases on (0, 2) (the rising half of the semicircle) and on (2, 4), so f is concave up on (0, 4).',
        points: [
          { id: 'b1', text: 'Answers (0, 4)' },
          { id: 'b2', text: 'Reason: f′ is increasing on that interval' },
        ],
      },
      {
        id: 'c',
        prompt: 'Find an equation for the line tangent to the graph of f at x = 4, and use it to approximate f(4.2). Is this approximation an overestimate or an underestimate of f(4.2)? Give a reason for your answer.',
        solution: 'f(4) = 1 + ∫₂⁴ f′(x) dx = 1 + 2 = 3 and f′(4) = 2, so the tangent line is y = 3 + 2(x − 4). Then f(4.2) ≈ 3 + 2(0.2) = 3.4. On (4, 6), f′ is decreasing, so the graph of f is concave down there and lies below its tangent line: 3.4 is an overestimate.',
        points: [
          { id: 'c1', text: 'Tangent line y = 3 + 2(x − 4)' },
          { id: 'c2', text: 'Approximation f(4.2) ≈ 3.4' },
          { id: 'c3', text: 'Overestimate, because f′ is decreasing (f is concave down) on (4, 4.2)' },
        ],
      },
      {
        id: 'd',
        prompt: 'Find the absolute minimum value of f on the interval −2 ≤ x ≤ 6. Justify your answer.',
        solution: 'f′(x) < 0 on (−2, 2) and f′(x) > 0 on (2, 6), so f decreases until x = 2 and increases after. The absolute minimum is at x = 2, and its value is f(2) = 1. (Check: f(−2) = 1 + 2π and f(6) = 5 are both larger.)',
        points: [
          { id: 'd1', text: 'Justifies using the sign of f′ (or a candidates test with x = −2, 2, 6)' },
          { id: 'd2', text: 'Answers 1, at x = 2' },
        ],
      },
    ],
  },
  {
    id: 'calcbc-frq-diffeq-001',
    type: 'diffeq',
    title: 'Slope field and Euler\'s method',
    intro: 'No calculator. Consider the differential equation dy/dx = x²(y − 1). Let y = f(x) be the particular solution to this differential equation with initial condition f(1) = 2.',
    reviewed: false,
    parts: [
      {
        id: 'a',
        prompt: 'On paper, sketch a slope field for the differential equation at the nine points in the table: find dy/dx at each point and draw a short segment with that slope.',
        figure: { type: 'table', columns: ['Point', 'dy/dx'], rows: [['(−1, 0)', '?'], ['(−1, 1)', '?'], ['(−1, 2)', '?'], ['(0, 0)', '?'], ['(0, 1)', '?'], ['(0, 2)', '?'], ['(1, 0)', '?'], ['(1, 1)', '?'], ['(1, 2)', '?']],
          alt: 'Table of nine points at which to find dy/dx: x = −1, 0 and 1, each paired with y = 0, 1 and 2. The dy/dx column is blank, shown with question marks.' },
        solution: 'At x = 0 every slope is 0. Along y = 1 every slope is 0. At (−1, 0) and (1, 0) the slope is 1(0 − 1) = −1. At (−1, 2) and (1, 2) the slope is 1(2 − 1) = 1.',
        points: [
          { id: 'a1', text: 'All nine slopes correct: zero on x = 0 and on y = 1, −1 at (±1, 0), and 1 at (±1, 2)' },
        ],
      },
      {
        id: 'b',
        prompt: 'Write an equation for the line tangent to the graph of f at x = 1, and use it to approximate f(1.2).',
        solution: 'At (1, 2), dy/dx = 1²(2 − 1) = 1, so the tangent line is y = 2 + (x − 1). Then f(1.2) ≈ 2 + 0.2 = 2.2.',
        points: [
          { id: 'b1', text: 'Tangent line y = 2 + (x − 1) and approximation f(1.2) ≈ 2.2' },
        ],
      },
      {
        id: 'c',
        prompt: 'Find d²y/dx² in terms of x and y. Is the approximation from part (b) an overestimate or an underestimate of f(1.2)? Give a reason for your answer.',
        solution: 'd²y/dx² = 2x(y − 1) + x²(dy/dx) = 2x(y − 1) + x⁴(y − 1). At (1, 2) this is 2 + 1 = 3 > 0, so the graph of f is concave up near x = 1 and lies above its tangent line: 2.2 is an underestimate.',
        points: [
          { id: 'c1', text: 'd²y/dx² = 2x(y − 1) + x²(dy/dx), or the equivalent 2x(y − 1) + x⁴(y − 1)' },
          { id: 'c2', text: 'Underestimate, because d²y/dx² > 0 at (1, 2)' },
        ],
      },
      {
        id: 'd',
        prompt: 'Use Euler\'s method, starting at x = 1 with two steps of equal size, to approximate f(1.2). Show the work that leads to your answer.',
        solution: 'Step size 0.1. First step: slope at (1, 2) is 1, so y ≈ 2 + 0.1(1) = 2.1 at x = 1.1. Second step: slope at (1.1, 2.1) is 1.21(1.1) = 1.331, so y ≈ 2.1 + 0.1(1.331) = 2.2331. f(1.2) ≈ 2.2331.',
        points: [
          { id: 'd1', text: 'Two Euler steps of size 0.1, giving f(1.2) ≈ 2.2331' },
        ],
      },
      {
        id: 'e',
        prompt: 'Find y = f(x), the particular solution to the differential equation with the initial condition f(1) = 2.',
        solution: 'Separate: dy/(y − 1) = x² dx. Integrate: ln|y − 1| = x³/3 + C. At (1, 2): ln 1 = 1/3 + C, so C = −1/3. Since y − 1 > 0 near the initial point, y − 1 = e^((x³ − 1)/3), so f(x) = 1 + e^((x³ − 1)/3).',
        points: [
          { id: 'e1', text: 'Separates variables: dy/(y − 1) = x² dx' },
          { id: 'e2', text: 'Finds antiderivatives: ln|y − 1| = x³/3' },
          { id: 'e3', text: 'Includes a constant of integration and uses f(1) = 2 to find C = −1/3' },
          { id: 'e4', text: 'Solves for y: f(x) = 1 + e^((x³ − 1)/3)' },
        ],
      },
    ],
  },
  {
    id: 'calcbc-frq-diffeq-002',
    type: 'diffeq',
    title: 'Logistic population',
    intro: 'No calculator. The population P(t) of a protected deer herd, where t is measured in years, satisfies the logistic differential equation dP/dt = 0.3P(1 − P/600), with P(0) = 100.',
    reviewed: false,
    parts: [
      {
        id: 'a',
        prompt: 'Find lim (t → ∞) of P(t).',
        solution: 'The carrying capacity is 600. Since 0 < P(0) < 600, P increases toward 600, so lim (t → ∞) P(t) = 600.',
        points: [
          { id: 'a1', text: 'Answers 600' },
        ],
      },
      {
        id: 'b',
        prompt: 'For what value of P is the population growing the fastest? Give a reason for your answer.',
        solution: 'dP/dt = 0.3P − 0.0005P² is a downward parabola in P with its maximum at P = 300, half the carrying capacity. (Equivalently, d²P/dt² = (0.3 − 0.001P)(dP/dt) changes sign at P = 300.)',
        points: [
          { id: 'b1', text: 'Answers P = 300, with a reason (half the carrying capacity, or the maximum of dP/dt as a function of P)' },
        ],
      },
      {
        id: 'c',
        prompt: 'Use the line tangent to the graph of P at t = 0 to approximate P(1). Is this approximation an overestimate or an underestimate? Give a reason for your answer.',
        solution: 'P′(0) = 0.3(100)(1 − 100/600) = 25, so P(1) ≈ 100 + 25(1) = 125. d²P/dt² = (0.3 − 0.001P)(dP/dt) = (0.3 − 0.1)(25) = 5 > 0 at t = 0, so P is concave up there and the tangent line gives an underestimate.',
        points: [
          { id: 'c1', text: 'Approximation P(1) ≈ 125' },
          { id: 'c2', text: 'Underestimate, because d²P/dt² > 0 near t = 0' },
        ],
      },
      {
        id: 'd',
        prompt: 'Use Euler\'s method, starting at t = 0 with two steps of equal size, to approximate P(1).',
        solution: 'Step size 0.5. First step: slope 25, so P ≈ 100 + 0.5(25) = 112.5 at t = 0.5. Second step: slope 0.3(112.5)(1 − 112.5/600) = 27.421875, so P ≈ 112.5 + 0.5(27.421875) = 126.2109375, about 126.211.',
        points: [
          { id: 'd1', text: 'Two Euler steps of size 0.5, giving P(1) ≈ 126.211' },
        ],
      },
      {
        id: 'e',
        prompt: 'Use separation of variables to find P(t), the particular solution with P(0) = 100.',
        solution: 'Rewrite: dP/(P(1 − P/600)) = 0.3 dt, and 1/(P(1 − P/600)) = 600/(P(600 − P)) = 1/P + 1/(600 − P). Integrate: ln|P| − ln|600 − P| = 0.3t + C. At t = 0: ln(100/500) = C, so C = −ln 5. Then P/(600 − P) = (1/5)e^(0.3t), which solves to P(t) = 600/(1 + 5e^(−0.3t)).',
        points: [
          { id: 'e1', text: 'Separates variables and uses partial fractions: 1/P + 1/(600 − P)' },
          { id: 'e2', text: 'Finds antiderivatives: ln|P| − ln|600 − P| = 0.3t' },
          { id: 'e3', text: 'Includes a constant of integration and uses P(0) = 100' },
          { id: 'e4', text: 'Solves for P: P(t) = 600/(1 + 5e^(−0.3t))' },
        ],
      },
    ],
  },
];
