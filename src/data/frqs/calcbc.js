// AP Calculus BC free-response practice: two per FRQ type, in the style of
// the current exam. Answers are written (worked on paper), then self-checked
// against an AP-style rubric: one point per line, each one a student can tick.
// FRQ ids are permanent once reviewed: saved self-checks point at them.
// Rubric point ids are permanent too: saved scores list the ones earned.
// All data and contexts are written for ScoreForge.

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
];
