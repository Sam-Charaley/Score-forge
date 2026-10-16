// AP Statistics formulas. Everything not marked memorize is printed on the
// College Board exam reference information (2026 edition, for the revised
// course), in the sheet's own notation. The 2026 sheet dropped the
// regression formulas the old one had, so those are memorize now.
// Each var is [symbol, meaning, unit]; tex strings are KaTeX.
const tex = String.raw;

export default {
  subjectId: 'stats',
  sheet: {
    given: true,
    label: 'College Board AP Statistics exam reference information (2026)',
    url: 'https://apcentral.collegeboard.org/media/pdf/ap-statistics-formula-tables-sheet.pdf',
    note: 'You also get the standard normal (z), t and chi-square tables.',
  },
  sections: [
    {
      id: 'descriptive',
      title: 'Describing data',
      formulas: [
        { id: 'mean', name: 'Sample mean', tex: tex`\bar x = \dfrac{1}{n}\sum x_i = \dfrac{\sum x_i}{n}`, vars: [['\\bar x', 'sample mean', ''], ['x_i', 'each data value', ''], ['n', 'sample size', '']], note: 'Not resistant: one outlier can pull it far. The median is resistant.' },
        { id: 'standard-deviation', name: 'Sample standard deviation', tex: tex`s = \sqrt{\dfrac{1}{n-1}\sum(x_i - \bar x)^2} \qquad s = \sqrt{\dfrac{\sum(x_i - \bar x)^2}{n-1}}`, vars: [['s', 'sample standard deviation', '']], note: 'Roughly the typical distance of a value from the mean. Divide by n − 1, not n.' },
        { id: 'z-score', name: 'z-score', tex: tex`z = \dfrac{x - \mu}{\sigma}`, vars: [['z', 'standardized score', ''], ['\\mu', 'mean', ''], ['\\sigma', 'standard deviation', '']], note: 'Not on the sheet. Interpret it as "x is z standard deviations above (or below) the mean."', memorize: true },
        { id: 'iqr-outliers', name: 'IQR and the outlier rule', tex: tex`\text{IQR} = Q_3 - Q_1 \qquad x < Q_1 - 1.5\,\text{IQR} \qquad x > Q_3 + 1.5\,\text{IQR}`, vars: [['Q_1, Q_3', 'first and third quartiles', '']], note: 'Not on the sheet. A value beyond either fence is an outlier.', memorize: true },
      ],
    },
    {
      id: 'regression',
      title: 'Regression',
      formulas: [
        { id: 'regression-line', name: 'Least-squares regression line', tex: tex`\hat y = a + bx`, vars: [['\\hat y', 'predicted response', ''], ['a', 'y-intercept', ''], ['b', 'slope', '']], note: 'Interpret b as "for each 1-unit increase in x, the predicted y changes by b." Always say predicted.' },
        { id: 'slope', name: 'Slope from summary statistics', tex: tex`b = r\dfrac{s_y}{s_x} \qquad a = \bar y - b\bar x`, vars: [['r', 'correlation', ''], ['s_x, s_y', 'standard deviations of x and y', '']], note: 'No longer on the 2026 sheet. The line always passes through (x̄, ȳ).', memorize: true },
        { id: 'residual', name: 'Residual', tex: tex`\text{residual} = y - \hat y`, vars: [], note: 'Not on the sheet. Actual minus predicted: a positive residual means the line underpredicted.', memorize: true },
        { id: 'r-squared', name: 'Coefficient of determination', tex: tex`r^2`, vars: [], note: 'Not on the sheet. Interpret it as the percent of variation in y explained by the linear model with x.', memorize: true },
      ],
    },
    {
      id: 'probability',
      title: 'Probability',
      formulas: [
        { id: 'addition', name: 'Addition rule', tex: tex`P(A\cup B) = P(A) + P(B) - P(A\cap B)`, vars: [], note: 'For mutually exclusive events P(A ∩ B) = 0.' },
        { id: 'conditional', name: 'Conditional probability', tex: tex`P(A\mid B) = \dfrac{P(A\cap B)}{P(B)}`, vars: [], note: 'A and B are independent when P(A | B) = P(A).' },
        { id: 'multiplication', name: 'Multiplication rule', tex: tex`P(A\cap B) = P(A)\,P(B\mid A)`, vars: [], note: 'Not on the sheet as written, but rearranged from conditional probability. For independent events, P(A)P(B).', memorize: true },
      ],
    },
    {
      id: 'random-variables',
      title: 'Random variables',
      formulas: [
        { id: 'discrete-mean', name: 'Mean of a discrete random variable', tex: tex`\mu_X = E(X) = \sum x_i\cdot P(x_i)`, vars: [['\\mu_X', 'expected value', '']] },
        { id: 'discrete-sd', name: 'Standard deviation of a discrete random variable', tex: tex`\sigma_X = \sqrt{\sum(x_i - \mu_X)^2\cdot P(x_i)}`, vars: [] },
        { id: 'binomial', name: 'Binomial probability', tex: tex`P(X = x) = \binom{n}{x}p^x(1-p)^{n-x} \qquad x = 0, 1, 2, \ldots, n`, vars: [['n', 'number of trials', ''], ['p', 'probability of success', '']], note: 'Check the conditions: two outcomes, fixed n, independent trials, same p each trial.' },
        { id: 'binomial-mean-sd', name: 'Binomial mean and standard deviation', tex: tex`\mu_X = np \qquad \sigma_X = \sqrt{np(1-p)}`, vars: [] },
        { id: 'geometric', name: 'Geometric probability', tex: tex`P(X = x) = (1-p)^{x-1}p \qquad \mu_X = \dfrac{1}{p}`, vars: [['x', 'trial of the first success', '']], note: 'Not on the 2026 sheet. Counts trials until the first success.', memorize: true },
        { id: 'combining', name: 'Combining random variables', tex: tex`\mu_{X\pm Y} = \mu_X \pm \mu_Y \qquad \sigma_{X\pm Y} = \sqrt{\sigma_X^2 + \sigma_Y^2}`, vars: [], note: 'Not on the sheet. The SD rule needs X and Y independent, and variances add even when you subtract.', memorize: true },
      ],
    },
    {
      id: 'inference-general',
      title: 'Inference: the general forms',
      formulas: [
        { id: 'test-statistic', name: 'Standardized test statistic', tex: tex`\dfrac{\text{statistic} - \text{parameter}}{\text{standard error of the statistic}}`, vars: [], note: 'The parameter is the value from the null hypothesis.' },
        { id: 'confidence-interval', name: 'Confidence interval', tex: tex`\begin{gathered}\text{statistic} \pm (\text{critical value})\,\times \\ (\text{standard error of the statistic})\end{gathered}`, vars: [], note: 'The margin of error is everything after the ±.' },
        { id: 'chi-square', name: 'Chi-square statistic', tex: tex`\chi^2 = \sum\dfrac{(O - E)^2}{E}`, vars: [['O', 'observed count', ''], ['E', 'expected count', '']], note: 'Use counts, never proportions. Every expected count should be at least 5.' },
        { id: 'chi-square-expected', name: 'Expected counts in a two-way table', tex: tex`\text{expected} = \dfrac{(\text{row total})(\text{column total})}{\text{table total}}`, vars: [], note: 'Not on the sheet. Degrees of freedom: (rows − 1)(columns − 1).', memorize: true },
      ],
    },
    {
      id: 'proportions',
      title: 'Sampling distributions for proportions',
      formulas: [
        { id: 'one-proportion', name: 'One sample proportion', tex: tex`\mu_{\hat p} = p \qquad \sigma_{\hat p} = \sqrt{\dfrac{p(1-p)}{n}} \qquad SE_{\hat p} = \sqrt{\dfrac{\hat p(1-\hat p)}{n}}`, vars: [['p', 'population proportion', ''], ['\\hat p', 'sample proportion', '']], note: 'Large counts: np and n(1 − p) both at least 10. In a test, use p₀ in the standard deviation.' },
        { id: 'two-proportions', name: 'Difference of two proportions', tex: tex`\mu_{\hat p_1-\hat p_2} = p_1 - p_2 \qquad SE_{\hat p_1-\hat p_2} = \sqrt{\dfrac{\hat p_1(1-\hat p_1)}{n_1} + \dfrac{\hat p_2(1-\hat p_2)}{n_2}}`, vars: [], note: 'Use this SE for a confidence interval.' },
        { id: 'two-proportions-sd', name: 'Standard deviation for two proportions', tex: tex`\sigma_{\hat p_1-\hat p_2} = \sqrt{\dfrac{p_1(1-p_1)}{n_1} + \dfrac{p_2(1-p_2)}{n_2}}`, vars: [] },
        { id: 'pooled', name: 'Pooled standard error', tex: tex`SE_{\hat p_1-\hat p_2} = \sqrt{\hat p_c(1-\hat p_c)}\sqrt{\dfrac{1}{n_1} + \dfrac{1}{n_2}} \qquad \hat p_c = \dfrac{n_1\hat p_1 + n_2\hat p_2}{n_1 + n_2}`, vars: [['\\hat p_c', 'combined (pooled) proportion', '']], note: 'Only for a significance test with H₀: p₁ = p₂.' },
      ],
    },
    {
      id: 'means',
      title: 'Sampling distributions for means',
      formulas: [
        { id: 'one-mean', name: 'One sample mean', tex: tex`\mu_{\bar x} = \mu \qquad \sigma_{\bar x} = \dfrac{\sigma}{\sqrt n} \qquad SE_{\bar x} = \dfrac{s}{\sqrt n}`, vars: [['\\mu', 'population mean', ''], ['\\sigma', 'population SD', ''], ['s', 'sample SD', '']], note: 'Normal if the population is normal or n ≥ 30 (Central Limit Theorem). Use t with n − 1 degrees of freedom.' },
        { id: 'two-means', name: 'Difference of two means', tex: tex`\mu_{\bar x_1-\bar x_2} = \mu_1 - \mu_2 \qquad SE_{\bar x_1-\bar x_2} = \sqrt{\dfrac{s_1^2}{n_1} + \dfrac{s_2^2}{n_2}}`, vars: [], note: 'For paired data, take differences first and do a one-sample procedure on them instead.' },
        { id: 'two-means-sd', name: 'Standard deviation for two means', tex: tex`\sigma_{\bar x_1-\bar x_2} = \sqrt{\dfrac{\sigma_1^2}{n_1} + \dfrac{\sigma_2^2}{n_2}}`, vars: [] },
      ],
    },
  ],
};
