// AP Biology formulas. Everything not marked memorize is printed on the
// College Board equations and formulas sheet (2025 edition), in the sheet's
// own notation. Each var is [symbol, meaning, unit]; tex strings are KaTeX.
const tex = String.raw;

export default {
  subjectId: 'bio',
  sheet: {
    given: true,
    label: 'College Board AP Biology equations and formulas (2025)',
    url: 'https://apcentral.collegeboard.org/media/pdf/ap-biology-equations-and-formulas-sheet.pdf',
    note: 'The sheet also has a chi-square critical value table for p = 0.05 and 0.01.',
  },
  sections: [
    {
      id: 'statistics',
      title: 'Statistics',
      formulas: [
        { id: 'mean', name: 'Mean', tex: tex`\bar x = \dfrac{1}{n}\sum_{i=1}^n x_i`, vars: [['\\bar x', 'sample mean', ''], ['n', 'sample size', '']] },
        { id: 'standard-deviation', name: 'Standard deviation', tex: tex`s = \sqrt{\dfrac{\sum(x_i - \bar x)^2}{n-1}}`, vars: [['s', 'sample standard deviation', '']] },
        { id: 'standard-error', name: 'Standard error of the mean', tex: tex`SE_{\bar x} = \dfrac{s}{\sqrt n}`, vars: [], note: 'Error bars are usually ±2 SE. If two groups\' error bars overlap, the difference is probably not significant.' },
        { id: 'chi-square', name: 'Chi-square', tex: tex`\chi^2 = \sum\dfrac{(o - e)^2}{e}`, vars: [['o', 'observed results', ''], ['e', 'expected results', '']], note: 'Degrees of freedom = number of outcome categories − 1. If χ² is above the critical value, reject the null hypothesis.' },
        { id: 'summary-terms', name: 'Mode, median and range', tex: tex`\text{range} = \text{maximum} - \text{minimum}`, vars: [], note: 'The sheet defines these in words: mode is the most frequent value, median the middle value.' },
      ],
    },
    {
      id: 'probability',
      title: 'Probability and genetics',
      formulas: [
        { id: 'or-rule', name: 'Mutually exclusive events (or)', tex: tex`P(\text{A or B}) = P(\text{A}) + P(\text{B})`, vars: [], note: 'Example: the chance of a heterozygote from Aa × Aa, Aa or aA, is 1/4 + 1/4.' },
        { id: 'and-rule', name: 'Independent events (and)', tex: tex`P(\text{A and B}) = P(\text{A})\times P(\text{B})`, vars: [], note: 'Use it for genes on different chromosomes: multiply each gene\'s probability.' },
        { id: 'hardy-weinberg', name: 'Hardy-Weinberg equations', tex: tex`p^2 + 2pq + q^2 = 1 \qquad p + q = 1`, vars: [['p', 'frequency of allele 1', ''], ['q', 'frequency of allele 2', ''], ['q^2', 'frequency of the homozygous recessive genotype', '']], note: 'Start from q² (the recessive phenotype you can count), take its square root for q, then p = 1 − q.' },
      ],
    },
    {
      id: 'rates-growth',
      title: 'Rates and population growth',
      formulas: [
        { id: 'rate', name: 'Rate', tex: tex`\dfrac{dY}{dt}`, vars: [['dY', 'amount of change', ''], ['dt', 'change in time', '']], note: 'From a graph, the slope. Include units, like mg per minute.' },
        { id: 'population-growth', name: 'Population growth', tex: tex`\dfrac{dN}{dt} = B - D`, vars: [['N', 'population size', ''], ['B', 'birth rate', ''], ['D', 'death rate', '']] },
        { id: 'exponential-growth', name: 'Exponential growth', tex: tex`\dfrac{dN}{dt} = r_{\max}N`, vars: [['r_{\\max}', 'maximum per capita growth rate', '']], note: 'J-shaped curve: unlimited resources.' },
        { id: 'logistic-growth', name: 'Logistic growth', tex: tex`\dfrac{dN}{dt} = r_{\max}N\left(\dfrac{K - N}{K}\right)`, vars: [['K', 'carrying capacity', '']], note: 'S-shaped curve: growth slows as N approaches K, and is fastest at N = K/2.' },
        { id: 'simpsons', name: 'Simpson\'s Diversity Index', tex: tex`\text{Diversity Index} = 1 - \sum\left(\dfrac{n}{N}\right)^2`, vars: [['n', 'organisms of one species', ''], ['N', 'organisms of all species', '']], note: 'Ranges from 0 to 1. Closer to 1 means more diverse.' },
      ],
    },
    {
      id: 'water-potential',
      title: 'Water potential',
      formulas: [
        { id: 'water-potential', name: 'Water potential', tex: tex`\Psi = \Psi_P + \Psi_S`, vars: [['\\Psi_P', 'pressure potential', 'bars'], ['\\Psi_S', 'solute potential', 'bars']], note: 'Water moves from higher to lower water potential. In an open container Ψ_P = 0, so Ψ = Ψ_S.' },
        { id: 'solute-potential', name: 'Solute potential', tex: tex`\Psi_S = -iCRT`, vars: [['i', 'ionization constant (1.0 for sucrose)', ''], ['C', 'molar concentration', 'mol/L'], ['R', 'pressure constant, 0.0831', 'L·bar/(mol·K)'], ['T', 'temperature', 'K']], note: 'NaCl has i = 2 because it splits into two ions. Kelvin = °C + 273.' },
      ],
    },
    {
      id: 'surface-volume',
      title: 'Surface area and volume',
      formulas: [
        { id: 'sphere', name: 'Sphere', tex: tex`SA = 4\pi r^2 \qquad V = \tfrac{4}{3}\pi r^3`, vars: [['r', 'radius', '']] },
        { id: 'rectangular-solid', name: 'Rectangular solid', tex: tex`SA = 2lh + 2lw + 2wh \qquad V = lwh`, vars: [['l, w, h', 'length, width, height', '']] },
        { id: 'cylinder', name: 'Cylinder', tex: tex`SA = 2\pi rh + 2\pi r^2 \qquad V = \pi r^2h`, vars: [] },
        { id: 'cube', name: 'Cube', tex: tex`SA = 6s^2 \qquad V = s^3`, vars: [['s', 'side length', '']], note: 'As a cell grows, volume outpaces surface area, so SA/V falls. That limits cell size.' },
      ],
    },
    {
      id: 'memorize',
      title: 'Also worth knowing',
      formulas: [
        { id: 'primary-productivity', name: 'Net primary productivity', tex: tex`\text{NPP} = \text{GPP} - R`, vars: [['\\text{GPP}', 'gross primary productivity', ''], ['R', 'energy used in respiration', '']], note: 'Not on the sheet. Measured with light and dark bottles of dissolved oxygen.', memorize: true },
        { id: 'ten-percent', name: 'Ten percent rule', tex: tex`\text{energy to next level} \approx 10\%`, vars: [], note: 'Not on the sheet. About 90% of energy is lost as heat at each trophic level.', memorize: true },
        { id: 'magnification', name: 'Magnification', tex: tex`\text{actual size} = \dfrac{\text{image size}}{\text{magnification}}`, vars: [], note: 'Not on the sheet. Convert units first: 1 mm = 1000 µm.', memorize: true },
      ],
    },
  ],
};
