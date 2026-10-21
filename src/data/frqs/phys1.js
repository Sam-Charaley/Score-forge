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

// Invented lab data. Friction against normal force has a slope of about 0.30
// and passes close to the origin.
const FRICTION_DATA = { type: 'table', caption: 'Block pulled at constant velocity',
  columns: ['Normal force (N)', 'Friction force (N)'],
  rows: [['2.0', '0.62'], ['4.0', '1.18'], ['6.0', '1.85'], ['8.0', '2.38'], ['10.0', '3.05']],
  alt: 'Table of friction data. Normal forces of 2.0, 4.0, 6.0, 8.0 and 10.0 N give friction forces of 0.62, 1.18, 1.85, 2.38 and 3.05 N.' };

// Invented lab data. Scale reading against depth has a slope of about
// −8.1 N/m, which with A = 1.0 × 10⁻³ m² gives a density near 830 kg/m³.
const BUOYANCY_DATA = { type: 'table', caption: 'Cylinder lowered into the liquid',
  columns: ['Depth submerged (m)', 'Scale reading (N)'],
  rows: [['0', '4.00'], ['0.020', '3.84'], ['0.040', '3.66'], ['0.060', '3.52'], ['0.080', '3.35']],
  alt: 'Table of buoyancy data. At submerged depths of 0, 0.020, 0.040, 0.060 and 0.080 m, the spring scale reads 4.00, 3.84, 3.66, 3.52 and 3.35 N.' };

export default [
  {
    id: 'phys1-frq-mathroutines-001',
    type: 'math-routines',
    title: 'Block and hanging mass',
    intro: 'Block A (mass 2.0 kg) sits on a horizontal table. A light string tied to block A runs over a light, frictionless pulley at the table edge to block B (mass 1.0 kg), which hangs freely. The coefficient of kinetic friction between block A and the table is 0.20. The blocks are released from rest and block A slides toward the pulley. Use g = 9.8 m/s².',
    reviewed: true,
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
    reviewed: true,
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
    reviewed: true,
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
    reviewed: true,
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
  {
    id: 'phys1-frq-experimental-001',
    type: 'experimental',
    title: 'Measuring the coefficient of friction',
    intro: 'Students want to find the coefficient of kinetic friction between a wooden block and a long, level board. They have the block, a set of slotted masses that can be stacked on the block, a spring scale, a meterstick, a stopwatch and a balance.',
    reviewed: false,
    parts: [
      {
        id: 'a',
        prompt: 'Describe an experimental procedure the students could use to collect data for finding the coefficient of kinetic friction. Give enough detail that another student could repeat it, including what is measured, which equipment measures it, and how the students would reduce experimental uncertainty.',
        solution: 'Measure the mass of the block with the balance. Attach the spring scale to the block and pull it horizontally along the board so it slides at a steady, constant speed; read the scale, which equals the friction force because the net force is zero. Calculate the normal force as the total weight, mg. Repeat with different numbers of slotted masses stacked on the block, to get at least five different normal forces. Do several pulls for each mass and average the readings.',
        points: [
          { id: 'a1', text: 'Measures the mass on the board with the balance and finds the normal force as mg (or the total weight)' },
          { id: 'a2', text: 'Pulls the block horizontally at constant velocity, so the spring scale reading equals the friction force' },
          { id: 'a3', text: 'Changes the normal force by adding masses to get several data points, and repeats trials to reduce uncertainty' },
        ],
      },
      {
        id: 'b',
        prompt: 'Describe how the students could graph their data to find the coefficient of kinetic friction. State what they should plot on each axis and how they would get μ from the graph.',
        solution: 'Plot friction force on the vertical axis against normal force on the horizontal axis. Since f = μF_N, the graph should be a straight line through the origin, and its slope is μ.',
        points: [
          { id: 'b1', text: 'Plots friction force against normal force (either orientation, if the slope is used correctly)' },
          { id: 'b2', text: 'States that μ is the slope (or 1/slope if the axes are swapped)' },
        ],
      },
      {
        id: 'c',
        prompt: 'The students\' data are shown in the table. On paper, plot the data on labeled axes with scales, and draw a best-fit line. Use your line to calculate the coefficient of kinetic friction.',
        figure: FRICTION_DATA,
        solution: 'The points lie close to a straight line through the origin. Using two points on the best-fit line, such as (0, 0) and (10.0 N, 3.03 N), the slope is about 3.03/10.0 ≈ 0.30. So μ ≈ 0.30.',
        points: [
          { id: 'c1', text: 'Axes are labeled with quantities and units, with linear scales that use most of the grid, and all five points are plotted correctly' },
          { id: 'c2', text: 'Draws a single straight best-fit line with points on both sides, not a dot-to-dot line' },
          { id: 'c3', text: 'Calculates the slope from points on the line (not two data points), getting μ between 0.28 and 0.32' },
        ],
      },
      {
        id: 'd',
        prompt: 'Another group did the same experiment, but their block was speeding up while they read the spring scale. Would their value of μ be too large, too small or about right? Justify your answer.',
        solution: 'Too large. When the block speeds up, the net force on it points forward, so the spring scale force is greater than friction: F_scale − f = ma. The group records the larger scale force as the friction force, so their friction values and their slope are too high.',
        points: [
          { id: 'd1', text: 'States that μ would be too large' },
          { id: 'd2', text: 'Justifies it with Newton\'s second law: an accelerating block needs a pull greater than friction, so the scale reads more than the friction force' },
        ],
      },
    ],
  },
  {
    id: 'phys1-frq-experimental-002',
    type: 'experimental',
    title: 'Density of an unknown liquid',
    intro: 'Students want to find the density of an unknown liquid. They hang a metal cylinder from a spring scale. The cylinder has weight W = 4.00 N, height 0.100 m and cross-sectional area A = 1.0 × 10⁻³ m². They lower it into a beaker of the liquid in steps, keeping it upright, and record the scale reading at each submerged depth d. Use g = 9.8 m/s².',
    reviewed: false,
    parts: [
      {
        id: 'a',
        prompt: 'Derive an expression for the scale reading F in terms of W, the liquid density ρ, A, d and g, while the cylinder is partly submerged and at rest. Begin your derivation by writing a fundamental physics principle or an equation from the reference sheet.',
        solution: 'The cylinder is in equilibrium: the scale force F and the buoyant force F_b point up, and its weight W points down, so F + F_b = W. The buoyant force equals the weight of displaced liquid, F_b = ρVg = ρAdg. So F = W − ρgAd.',
        points: [
          { id: 'a1', text: 'Starts from equilibrium (net force zero) with the scale force and buoyant force up and the weight down' },
          { id: 'a2', text: 'Uses F_b = ρgV with V = Ad to get F = W − ρgAd' },
        ],
      },
      {
        id: 'b',
        prompt: 'Which quantities could the students graph to get a straight line? Explain how they would find ρ from that graph.',
        solution: 'Plot the scale reading F on the vertical axis against the submerged depth d on the horizontal axis. From part (a) this is a straight line with slope −ρgA and vertical intercept W. So ρ = −slope/(gA).',
        points: [
          { id: 'b1', text: 'Plots scale reading (or buoyant force) against submerged depth' },
          { id: 'b2', text: 'Relates the slope to ρ: ρ = −slope/(gA), or slope/(gA) for buoyant force against depth' },
        ],
      },
      {
        id: 'c',
        prompt: 'The students\' data are shown in the table. On paper, plot the data, draw a best-fit line, and use it to calculate the density of the liquid.',
        figure: BUOYANCY_DATA,
        solution: 'The points fall close to a straight line. Taking two points on the line, such as (0, 4.00 N) and (0.080 m, 3.35 N), the slope is about (3.35 − 4.00)/0.080 ≈ −8.1 N/m. Then ρ = 8.1/(9.8 × 1.0 × 10⁻³) ≈ 830 kg/m³.',
        points: [
          { id: 'c1', text: 'Plots all five points correctly on labeled axes with units and sensible linear scales' },
          { id: 'c2', text: 'Draws a straight best-fit line and finds its slope from points on the line' },
          { id: 'c3', text: 'Gets a density between about 780 and 880 kg/m³' },
        ],
      },
      {
        id: 'd',
        prompt: 'A student predicts that if the cylinder were lowered to a depth of 0.150 m, past the point where it is fully submerged, the scale reading would keep decreasing at the same rate. Do you agree? Justify your answer.',
        solution: 'No. The cylinder is only 0.100 m tall, so it is fully submerged by d = 0.100 m. After that, the volume of liquid it displaces stays the same, so the buoyant force stays the same and the scale reading stops changing (at about 4.00 − 8.1 × 0.100 ≈ 3.19 N). Going deeper raises the pressure on both the top and bottom faces by the same amount, so the pressure difference that causes the buoyant force does not change.',
        points: [
          { id: 'd1', text: 'Disagrees, and states that the reading stays constant once the cylinder is fully submerged' },
          { id: 'd2', text: 'Explains that the displaced volume (and so the buoyant force) no longer changes, or that the pressure difference between the top and bottom stays the same' },
        ],
      },
    ],
  },
  {
    id: 'phys1-frq-qualquant-001',
    type: 'qual-quant',
    title: 'Two blocks launched by one spring',
    intro: 'A spring with spring constant k is compressed a distance x and used to launch a block across a frictionless floor. The block then slides onto a rough section of floor where the coefficient of kinetic friction is μ, and it slides until it stops. The experiment is done twice with the same spring and compression: once with block 1 of mass m and once with block 2 of mass 2m.',
    reviewed: false,
    parts: [
      {
        id: 'a',
        prompt: 'Without using equations, explain which block slides farther on the rough section, or whether they slide the same distance. Explain your reasoning in a clear, paragraph-length argument using physics principles.',
        solution: 'Both blocks get the same energy from the spring, because the spring is compressed the same distance each time, so both start across the rough floor with the same kinetic energy. Friction removes that energy by doing negative work as each block slides. The friction force is proportional to the normal force, so the heavier block feels twice the friction force. With twice the force removing the same energy, block 2 stops in half the distance. Block 1, the lighter block, slides farther.',
        points: [
          { id: 'a1', text: 'States that both blocks leave the spring with the same kinetic energy, because the spring stores the same energy' },
          { id: 'a2', text: 'States that the heavier block has a larger friction force, because the normal force is larger' },
          { id: 'a3', text: 'Concludes that the lighter block slides farther, with reasoning that links force, energy and distance' },
        ],
      },
      {
        id: 'b',
        prompt: 'Derive an expression for the distance d a block of mass M slides on the rough section, in terms of k, x, μ, M and g. Begin your derivation by writing a fundamental physics principle or an equation from the reference sheet.',
        solution: 'Energy: all the spring energy is removed by friction. ½kx² = μMg d, so d = kx² / (2μMg).',
        points: [
          { id: 'b1', text: 'Sets the spring energy ½kx² equal to the work done by friction, μMgd' },
          { id: 'b2', text: 'Gets d = kx² / (2μMg)' },
        ],
      },
      {
        id: 'c',
        prompt: 'Explain how your expression from part (b) supports or contradicts your reasoning in part (a).',
        solution: 'The expression shows d is inversely proportional to M, so doubling the mass halves the distance. Block 1 slides twice as far as block 2, which agrees with part (a). The numerator kx² is the same for both blocks, which matches the claim that the spring gives each block the same energy.',
        points: [
          { id: 'c1', text: 'Identifies that d is proportional to 1/M, so block 1 slides twice as far, and states that this agrees with (or corrects) part (a)' },
        ],
      },
    ],
  },
  {
    id: 'phys1-frq-qualquant-002',
    type: 'qual-quant',
    title: 'Rolling race',
    intro: 'A solid cylinder (I = ½MR²) and a thin-walled hollow cylinder (I = MR²) have the same mass M and the same radius R. They are released from rest side by side at the top of the same ramp and roll without slipping down a vertical drop h.',
    reviewed: true,
    parts: [
      {
        id: 'a',
        prompt: 'Without using equations, explain which cylinder reaches the bottom first, or whether they arrive at the same time. Explain your reasoning in a clear, paragraph-length argument using physics principles.',
        solution: 'Both cylinders start with the same gravitational potential energy, since they have the same mass and drop the same height, and both reach the bottom with the same total kinetic energy. That kinetic energy is split between moving forward and spinning. The hollow cylinder has all its mass at the rim, so it has a larger rotational inertia and must put a larger share of its energy into rotation to roll at a given speed. That leaves it less translational kinetic energy, so it moves more slowly at every point on the ramp. The solid cylinder reaches the bottom first.',
        points: [
          { id: 'a1', text: 'States that both cylinders convert the same gravitational potential energy into kinetic energy' },
          { id: 'a2', text: 'States that the hollow cylinder has the larger rotational inertia, so more of its energy goes into rotation' },
          { id: 'a3', text: 'Concludes that the solid cylinder has more translational speed and arrives first' },
        ],
      },
      {
        id: 'b',
        prompt: 'An object with rotational inertia I = βMR² rolls without slipping from rest down the vertical drop h. Derive an expression for its speed at the bottom in terms of β, g and h. Begin your derivation by writing a fundamental physics principle or an equation from the reference sheet.',
        solution: 'Energy is conserved: Mgh = ½Mv² + ½Iω². Rolling without slipping means ω = v/R, so ½Iω² = ½βMR²(v/R)² = ½βMv². Then Mgh = ½(1 + β)Mv², so v = √(2gh / (1 + β)).',
        points: [
          { id: 'b1', text: 'Writes energy conservation with both translational and rotational kinetic energy' },
          { id: 'b2', text: 'Uses v = ωR for rolling without slipping' },
          { id: 'b3', text: 'Gets v = √(2gh / (1 + β))' },
        ],
      },
      {
        id: 'c',
        prompt: 'Explain how your expression from part (b) supports or contradicts your reasoning in part (a). Also state whether a solid cylinder would beat a hollow one if the solid cylinder had a much larger mass and radius.',
        solution: 'The solid cylinder has β = ½ and the hollow one has β = 1. A larger β makes the denominator larger and the speed smaller, so the solid cylinder is faster at the bottom (and at every height), which agrees with part (a). M and R cancel out of the expression, so the result does not depend on them: any solid cylinder beats any thin hollow cylinder on the same ramp.',
        points: [
          { id: 'c1', text: 'Uses the expression to show a larger β gives a smaller speed, and states that this agrees with part (a)' },
          { id: 'c2', text: 'States that M and R cancel, so the solid cylinder still wins regardless of its mass and radius' },
        ],
      },
    ],
  },
];
