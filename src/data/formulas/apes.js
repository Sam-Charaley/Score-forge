// AP Environmental Science formulas and calculation patterns. The exam
// gives no formula sheet (a calculator is allowed), so everything is
// memorize. Each var is [symbol, meaning, unit]; tex strings are KaTeX.
const tex = String.raw;

export default {
  subjectId: 'apes',
  sheet: {
    given: false,
    label: 'No formula sheet: memorize all of these (a calculator is allowed)',
  },
  sections: [
    {
      id: 'math-skills',
      title: 'Math skills',
      formulas: [
        { id: 'percent-change', name: 'Percent change', tex: tex`\%\ \text{change} = \dfrac{\text{new} - \text{old}}{\text{old}}\times100\%`, vars: [], note: 'Divide by the old value, not the new one. A negative result is a decrease.' },
        { id: 'percent', name: 'Percent of a total', tex: tex`\% = \dfrac{\text{part}}{\text{whole}}\times100\%`, vars: [] },
        { id: 'scientific-notation', name: 'Scientific notation', tex: tex`(a\times10^m)(b\times10^n) = ab\times10^{m+n} \qquad \dfrac{a\times10^m}{b\times10^n} = \dfrac{a}{b}\times10^{m-n}`, vars: [] },
        { id: 'dimensional-analysis', name: 'Dimensional analysis', tex: tex`\text{given}\times\dfrac{\text{new unit}}{\text{old unit}}\times\cdots = \text{answer}`, vars: [], note: 'Write every unit and cancel as you go. FRQs give credit for the setup, so show it.' },
        { id: 'per-capita', name: 'Per capita', tex: tex`\text{per capita} = \dfrac{\text{total}}{\text{population}}`, vars: [] },
      ],
    },
    {
      id: 'populations',
      title: 'Populations',
      formulas: [
        { id: 'growth-rate', name: 'Population growth rate', tex: tex`r = \dfrac{(B + I) - (D + E)}{N}`, vars: [['B, D', 'births and deaths', ''], ['I, E', 'immigration and emigration', ''], ['N', 'population size', '']], note: 'Multiply by 100 for a percent.' },
        { id: 'crude-rates', name: 'Crude birth and death rates', tex: tex`\text{growth rate (\%)} = \dfrac{\text{CBR} - \text{CDR}}{10}`, vars: [['\\text{CBR, CDR}', 'births and deaths per 1000 people per year', '']], note: 'Dividing by 10 converts "per 1000" into a percent.' },
        { id: 'rule-of-70', name: 'Rule of 70 (doubling time)', tex: tex`\text{doubling time} = \dfrac{70}{\text{growth rate (\%)}}`, vars: [], note: 'Use the percent, not the decimal: 2% growth doubles in 35 years.' },
        { id: 'exponential', name: 'Exponential and logistic growth', tex: tex`\dfrac{dN}{dt} = rN \qquad \dfrac{dN}{dt} = rN\left(\dfrac{K - N}{K}\right)`, vars: [['N', 'population size', ''], ['K', 'carrying capacity', '']], note: 'J curve with unlimited resources, S curve leveling at K.' },
        { id: 'total-fertility', name: 'Replacement-level fertility', tex: tex`\text{TFR} \approx 2.1`, vars: [], note: 'About 2.1 children per woman keeps a population stable in developed countries (higher where child mortality is high).' },
      ],
    },
    {
      id: 'energy-ecology',
      title: 'Energy and ecosystems',
      formulas: [
        { id: 'ten-percent', name: 'Ten percent rule', tex: tex`E_{\text{next level}} \approx 0.10\times E_{\text{level below}}`, vars: [], note: 'About 90% is lost as heat at each trophic level, which is why food chains are short.' },
        { id: 'npp', name: 'Net primary productivity', tex: tex`\text{NPP} = \text{GPP} - R`, vars: [['\\text{GPP}', 'gross primary productivity', ''], ['R', 'respiration by producers', '']] },
        { id: 'efficiency', name: 'Energy efficiency', tex: tex`\text{efficiency} = \dfrac{\text{useful energy out}}{\text{energy in}}\times100\%`, vars: [], note: 'For a power plant, usually about 30 to 40%.' },
        { id: 'power-energy', name: 'Power and energy', tex: tex`\text{energy (kWh)} = \text{power (kW)}\times\text{time (h)}`, vars: [], note: '1 kW = 1000 W. Cost = kWh × price per kWh.' },
        { id: 'half-life', name: 'Half-life', tex: tex`\text{amount left} = \text{initial}\times\left(\tfrac{1}{2}\right)^{n}`, vars: [['n', 'number of half-lives (time ÷ half-life)', '']], note: 'Often easiest as a table: halve the amount once per half-life.' },
      ],
    },
    {
      id: 'pollution',
      title: 'Pollution and resources',
      formulas: [
        { id: 'ppm', name: 'Parts per million', tex: tex`\text{ppm} = \dfrac{\text{part}}{\text{whole}}\times10^6`, vars: [], note: '1 ppm is about 1 mg per liter of water.' },
        { id: 'ld50', name: 'LD₅₀', tex: tex`\text{LD}_{50} = \text{dose lethal to } 50\%`, vars: [], note: 'The dose that kills half of a test population. A lower LD₅₀ means a more toxic substance.' },
        { id: 'biomagnification', name: 'Biomagnification', tex: tex`C_{\text{level } n+1} > C_{\text{level } n}`, vars: [['C', 'concentration of a persistent toxin', '']], note: 'Persistent, fat-soluble toxins like DDT and mercury concentrate in top predators.' },
        { id: 'usage-calculations', name: 'Usage and cost calculations', tex: tex`\text{total} = \text{rate}\times\text{time}\times\text{count}`, vars: [], note: 'Most FRQ calculations are a chain like this: gallons per day × days × households. Label every step.' },
      ],
    },
  ],
};
