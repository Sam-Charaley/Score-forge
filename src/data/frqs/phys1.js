// AP Physics 1 free-response practice: the four question types of the
// revised exam (first given 2025), two of each. Answers are written; free-body
// diagrams, graphs, bar charts and derivations are worked on paper, and the
// rubric points check them.
// FRQ ids are permanent once reviewed: saved self-checks point at them.
// Rubric point ids are permanent too: saved scores list the ones earned.
// Ids drop the hyphen from two-word types (phys1-frq-mathroutines-001)
// because frqs.test.js allows only letters and digits in that part.

export const FRQ_TYPES = {
  'math-routines': 'Mathematical Routines',
  representations: 'Translation Between Representations',
  experimental: 'Experimental Design and Analysis',
  'qual-quant': 'Qualitative/Quantitative Translation',
};

export default [
  {
    id: 'phys1-frq-mathroutines-001',
    type: 'math-routines',
    title: 'Block and hanging mass',
    intro: 'Block A (mass 2.0 kg) sits on a horizontal table. A light string tied to block A runs over a light, frictionless pulley at the table edge to block B (mass 1.0 kg), which hangs freely. The coefficient of kinetic friction between block A and the table is 0.20. The blocks are released from rest and block A slides toward the pulley. Use g = 9.8 m/s².',
    reviewed: false,
    parts: [
      {
        id: 'a',
        prompt: 'On paper, draw separate free-body diagrams for block A and for block B. Draw each force as an arrow starting on the block, and label each force with a distinct symbol.',
        solution: 'Block A: gravitational force F_g,A downward, normal force F_N upward (equal in length to F_g,A), tension T toward the pulley, and kinetic friction f away from the pulley (shorter than T, since block A speeds up). Block B: gravitational force F_g,B downward and tension T upward, with F_g,B longer than T since block B accelerates downward.',
        points: [
          { id: 'a1', text: 'Block A has exactly four forces: gravity down, normal force up, tension toward the pulley and friction opposite the motion' },
          { id: 'a2', text: 'Block B has exactly two forces: gravity down and tension up, with gravity drawn longer' },
        ],
      },
      {
        id: 'b',
        prompt: 'Derive an expression for the magnitude of the acceleration of the blocks in terms of m_A, m_B, μ and g. Begin your derivation by writing a fundamental physics principle or an equation from the reference sheet.',
        solution: 'Newton\'s second law for each block, with the direction of motion positive. Block B: m_B g − T = m_B a. Block A: T − μm_A g = m_A a. Adding the two equations removes T: m_B g − μm_A g = (m_A + m_B)a, so a = (m_B − μm_A)g / (m_A + m_B).',
        points: [
          { id: 'b1', text: 'Starts from Newton\'s second law, applied to each block or to the two-block system' },
          { id: 'b2', text: 'Uses a friction force of μm_A g on block A' },
          { id: 'b3', text: 'Gets a = (m_B − μm_A)g / (m_A + m_B), with correct signs throughout' },
        ],
      },
      {
        id: 'c',
        prompt: 'Calculate the numerical value of the acceleration of the blocks.',
        solution: 'a = (1.0 − 0.20 × 2.0)(9.8) / (2.0 + 1.0) = (0.60)(9.8)/3.0 ≈ 2.0 m/s².',
        points: [
          { id: 'c1', text: 'Gets about 2.0 m/s² (1.96 m/s²), with units' },
        ],
      },
      {
        id: 'd',
        prompt: 'Calculate the tension in the string while the blocks are moving.',
        solution: 'From block B: T = m_B(g − a) = 1.0 × (9.8 − 1.96) ≈ 7.8 N. This is less than block B\'s weight (9.8 N), as it must be for block B to accelerate downward.',
        points: [
          { id: 'd1', text: 'Uses Newton\'s second law for one block with the acceleration from part (c)' },
          { id: 'd2', text: 'Gets about 7.8 N, less than block B\'s weight' },
        ],
      },
      {
        id: 'e',
        prompt: 'Block B starts 0.50 m above the floor. Calculate the speed of block B just before it hits the floor.',
        solution: 'The acceleration is constant, so v² = v₀² + 2aΔy = 0 + 2(1.96)(0.50) = 1.96 m²/s², and v ≈ 1.4 m/s. (Energy gives the same result: m_B g d − μm_A g d = ½(m_A + m_B)v².)',
        points: [
          { id: 'e1', text: 'Uses constant-acceleration kinematics with the acceleration from part (c), or an energy equation that includes the work done by friction' },
          { id: 'e2', text: 'Gets about 1.4 m/s' },
        ],
      },
    ],
  },
  {
    id: 'phys1-frq-mathroutines-002',
    type: 'math-routines',
    title: 'Ramp, collision and rough floor',
    intro: 'Block 1 (mass 0.50 kg) is released from rest at the top of a curved, frictionless ramp, 0.45 m above the level floor. At the bottom it slides onto the floor and collides with block 2 (mass 1.0 kg), which is at rest. The blocks stick together and slide onto a rough section of floor where the coefficient of kinetic friction is 0.30, until they stop. The floor between the ramp and block 2 is frictionless. Use g = 9.8 m/s².',
    reviewed: false,
    parts: [
      {
        id: 'a',
        prompt: 'Calculate the speed of block 1 just before it hits block 2.',
        solution: 'The block-Earth system has no friction, so mechanical energy is conserved: m₁gh = ½m₁v², so v = √(2gh) = √(2 × 9.8 × 0.45) ≈ 3.0 m/s (2.97 m/s).',
        points: [
          { id: 'a1', text: 'Uses conservation of energy from the top of the ramp to the bottom' },
          { id: 'a2', text: 'Gets about 3.0 m/s' },
        ],
      },
      {
        id: 'b',
        prompt: 'Calculate the speed of the two blocks just after the collision.',
        solution: 'Momentum is conserved in the collision: m₁v₁ = (m₁ + m₂)v_f, so v_f = (0.50 × 2.97)/(1.5) ≈ 0.99 m/s. Kinetic energy is not conserved, because the blocks stick together.',
        points: [
          { id: 'b1', text: 'Uses conservation of momentum, not conservation of kinetic energy' },
          { id: 'b2', text: 'Gets about 0.99 m/s (accept 1.0 m/s)' },
        ],
      },
      {
        id: 'c',
        prompt: 'Derive an expression for the distance d the blocks slide on the rough floor, in terms of their speed v_f just after the collision, μ and g. Begin your derivation by writing a fundamental physics principle or an equation from the reference sheet.',
        solution: 'Work-energy theorem: the friction force μ(m₁ + m₂)g does negative work over distance d and removes all the kinetic energy. −μ(m₁ + m₂)g d = 0 − ½(m₁ + m₂)v_f², so d = v_f² / (2μg). The mass cancels.',
        points: [
          { id: 'c1', text: 'Starts from the work-energy theorem, or from Newton\'s second law and kinematics' },
          { id: 'c2', text: 'Gets d = v_f² / (2μg)' },
        ],
      },
      {
        id: 'd',
        prompt: 'Calculate the distance the blocks slide on the rough floor.',
        solution: 'd = (0.99)² / (2 × 0.30 × 9.8) = 0.98/5.88 ≈ 0.17 m.',
        points: [
          { id: 'd1', text: 'Gets about 0.17 m, using the speed from part (b)' },
        ],
      },
      {
        id: 'e',
        prompt: 'Calculate how much kinetic energy is lost in the collision, and state what happens to that energy.',
        solution: 'Before: ½(0.50)(2.97)² ≈ 2.2 J. After: ½(1.5)(0.99)² ≈ 0.74 J. About 1.5 J of kinetic energy is lost. It becomes internal energy of the blocks (thermal energy and the energy of deforming the surfaces that stick), plus a little sound.',
        points: [
          { id: 'e1', text: 'Gets a loss of about 1.5 J from the kinetic energies before and after the collision' },
          { id: 'e2', text: 'States that the energy becomes internal energy (thermal energy, deformation or sound), not that it is destroyed' },
        ],
      },
    ],
  },
  {
    id: 'phys1-frq-representations-001',
    type: 'representations',
    title: 'Cart on a spring',
    intro: 'A cart of mass m is attached to a horizontal spring with spring constant k on a level, frictionless track. The cart is pulled to position x = −A, where the spring is stretched, and released from rest at time t = 0. Position x = 0 is the spring\'s natural length.',
    reviewed: false,
    parts: [
      {
        id: 'a',
        prompt: 'On paper, draw two energy bar charts for the cart-spring system, one at the moment of release (x = −A) and one as the cart passes x = 0. Include bars for kinetic energy (K), spring potential energy (U_s) and total energy (E_total). Use the same scale for both charts.',
        solution: 'At x = −A: K = 0, U_s is a positive bar, and E_total equals U_s. At x = 0: U_s = 0, K is a positive bar the same height as U_s was at release, and E_total is unchanged.',
        points: [
          { id: 'a1', text: 'At release, K is zero and all the energy is spring potential energy' },
          { id: 'a2', text: 'At x = 0, U_s is zero and K equals the original U_s' },
          { id: 'a3', text: 'The total energy bar is the same height in both charts' },
        ],
      },
      {
        id: 'b',
        prompt: 'Derive an expression for the cart\'s maximum speed, in terms of k, m and A. Begin your derivation by writing a fundamental physics principle or an equation from the reference sheet.',
        solution: 'Mechanical energy is conserved: ½kA² = ½mv_max², so v_max = A√(k/m).',
        points: [
          { id: 'b1', text: 'Sets the spring energy at x = −A equal to the kinetic energy at x = 0' },
          { id: 'b2', text: 'Gets v_max = A√(k/m)' },
        ],
      },
      {
        id: 'c',
        prompt: 'On paper, sketch a graph of the cart\'s velocity as a function of time from t = 0 to t = T, where T is the period. Take the direction from x = −A toward x = 0 as positive. Label the maximum velocity and the times T/4, T/2 and 3T/4.',
        solution: 'A sine curve that starts at v = 0 at t = 0, rises to +v_max at T/4 (as the cart passes x = 0 moving in the positive direction), returns to 0 at T/2 (at x = +A), reaches −v_max at 3T/4 and returns to 0 at T. The peak is labeled A√(k/m).',
        points: [
          { id: 'c1', text: 'The curve starts at zero and is smooth and sinusoidal, not straight-line segments' },
          { id: 'c2', text: 'The velocity is positive and maximum at T/4, zero at T/2 and negative and maximum at 3T/4' },
          { id: 'c3', text: 'The maximum is labeled with the expression from part (b) or v_max' },
        ],
      },
      {
        id: 'd',
        prompt: 'The cart is replaced with a cart of mass 4m and again released from rest at x = −A. Using your answer to part (b) and the reference sheet, explain how the new cart\'s maximum speed and period compare with the original cart\'s. Describe how your sketch from part (c) would change.',
        solution: 'From v_max = A√(k/m), four times the mass gives half the maximum speed. From T = 2π√(m/k), four times the mass gives twice the period. The new graph has peaks half as tall and is stretched to twice the time per cycle. The system starts with the same spring energy, but the heavier cart needs less speed to carry the same kinetic energy.',
        points: [
          { id: 'd1', text: 'States that the maximum speed is halved, justified with the expression from part (b)' },
          { id: 'd2', text: 'States that the period doubles, justified with T = 2π√(m/k)' },
          { id: 'd3', text: 'Describes the new graph: half the height and twice as long per cycle' },
        ],
      },
    ],
  },
  {
    id: 'phys1-frq-representations-002',
    type: 'representations',
    title: 'Block sliding up a rough ramp',
    intro: 'A block of mass m is launched with speed v₀ up a ramp inclined at angle θ above the horizontal. The coefficient of kinetic friction between the block and the ramp is μ, small enough that the block slides back down after it stops. Air resistance is negligible.',
    reviewed: false,
    parts: [
      {
        id: 'a',
        prompt: 'On paper, draw two free-body diagrams for the block: one while it slides up the ramp and one while it slides down. Draw each force as an arrow starting on the block, and label each force.',
        solution: 'Going up: gravity F_g straight down, normal force F_N perpendicular to the ramp surface, and kinetic friction f pointing down the ramp. Going down: the same gravity and normal force, with friction f now pointing up the ramp.',
        points: [
          { id: 'a1', text: 'Both diagrams show gravity straight down and a normal force perpendicular to the ramp' },
          { id: 'a2', text: 'Friction points down the ramp while the block moves up, and up the ramp while it moves down' },
        ],
      },
      {
        id: 'b',
        prompt: 'Derive expressions for the magnitude of the block\'s acceleration while it slides up and while it slides down, in terms of g, θ and μ. Begin your derivation by writing a fundamental physics principle or an equation from the reference sheet.',
        solution: 'Perpendicular to the ramp the forces balance, so F_N = mg cos θ and f = μmg cos θ. Along the ramp, Newton\'s second law: going up, gravity\'s component and friction both point down the ramp, so a_up = g(sin θ + μ cos θ). Going down, they oppose each other, so a_down = g(sin θ − μ cos θ).',
        points: [
          { id: 'b1', text: 'Uses F_N = mg cos θ to get a friction force of μmg cos θ' },
          { id: 'b2', text: 'Gets a_up = g(sin θ + μ cos θ)' },
          { id: 'b3', text: 'Gets a_down = g(sin θ − μ cos θ)' },
        ],
      },
      {
        id: 'c',
        prompt: 'On paper, sketch a graph of the block\'s velocity as a function of time, from launch until the block returns to its starting point. Take up the ramp as positive.',
        solution: 'A straight line from +v₀ down to zero, then a second straight line continuing below zero with a shallower slope. The second segment lasts longer than the first, and it ends at a negative velocity whose magnitude is less than v₀.',
        points: [
          { id: 'c1', text: 'Two straight-line segments, each with a constant negative slope' },
          { id: 'c2', text: 'The first segment (moving up) is steeper than the second (moving down)' },
          { id: 'c3', text: 'The final speed is less than v₀, and the trip down takes longer than the trip up' },
        ],
      },
      {
        id: 'd',
        prompt: 'Use your expressions from part (b) to explain why the two parts of your graph have different slopes. Then use energy to explain why the block returns with less speed than it started with.',
        solution: 'The slope of a velocity-time graph is the acceleration. From part (b), a_up is larger than a_down because friction adds to gravity\'s component on the way up and subtracts from it on the way down, so the first segment is steeper. Friction does negative work on the block during the whole trip, up and down, so the block-Earth system loses mechanical energy. The block is back at its starting height, so it has less kinetic energy and less speed than at launch.',
        points: [
          { id: 'd1', text: 'Connects the slopes to the accelerations, using a_up > a_down from part (b)' },
          { id: 'd2', text: 'Explains that friction does negative work in both directions, so the block returns with less kinetic energy' },
        ],
      },
    ],
  },
];
