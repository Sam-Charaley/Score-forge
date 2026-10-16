// AP Calculus BC formulas: the Units 1-8 sections shared with AB (including
// their BC-only formulas), then Unit 9 (parametric, polar, vector) and
// Unit 10 (series).
import { calcSectionsFor, CALC_SHEET } from './_calc.js'

const tex = String.raw;

export default {
  subjectId: 'calcbc',
  sheet: CALC_SHEET,
  sections: [
    ...calcSectionsFor('calcbc'),
    {
      id: 'parametric-vector',
      title: 'Parametric and vector functions',
      formulas: [
        { id: 'parametric-slope', name: 'Slope of a parametric curve', tex: tex`\dfrac{dy}{dx} = \dfrac{dy/dt}{dx/dt}`, vars: [], note: 'Vertical tangent where dx/dt = 0 and dy/dt ≠ 0.' },
        { id: 'parametric-second', name: 'Second derivative of a parametric curve', tex: tex`\dfrac{d^2y}{dx^2} = \dfrac{\frac{d}{dt}\left(\frac{dy}{dx}\right)}{dx/dt}`, vars: [], note: 'Divide by dx/dt again. Forgetting this is the most common mistake.' },
        { id: 'parametric-arc-length', name: 'Arc length of a parametric curve', tex: tex`L = \int_a^b \sqrt{\left(\dfrac{dx}{dt}\right)^2 + \left(\dfrac{dy}{dt}\right)^2}\,dt`, vars: [] },
        { id: 'vector-motion', name: 'Motion in the plane', tex: tex`\vec v(t) = \langle x'(t), y'(t)\rangle \qquad \vec a(t) = \langle x''(t), y''(t)\rangle`, vars: [['\\vec v', 'velocity vector', ''], ['\\vec a', 'acceleration vector', '']] },
        { id: 'speed', name: 'Speed', tex: tex`|\vec v(t)| = \sqrt{\big(x'(t)\big)^2 + \big(y'(t)\big)^2}`, vars: [], note: 'Total distance traveled is the integral of speed.' },
        { id: 'vector-position', name: 'Position from velocity', tex: tex`x(b) = x(a) + \int_a^b x'(t)\,dt`, vars: [], note: 'Do it separately for each component.' },
      ],
    },
    {
      id: 'polar',
      title: 'Polar curves',
      formulas: [
        { id: 'polar-conversion', name: 'Polar to rectangular', tex: tex`x = r\cos\theta \qquad y = r\sin\theta \qquad r^2 = x^2 + y^2`, vars: [['r', 'distance from the pole', ''], ['\\theta', 'angle', '']] },
        { id: 'polar-slope', name: 'Slope of a polar curve', tex: tex`\dfrac{dy}{dx} = \dfrac{dy/d\theta}{dx/d\theta} = \dfrac{r'\sin\theta + r\cos\theta}{r'\cos\theta - r\sin\theta}`, vars: [["r'", 'dr/dθ', '']], note: 'dr/dθ alone is not the slope: it says whether the curve moves toward or away from the pole.' },
        { id: 'polar-area', name: 'Area inside a polar curve', tex: tex`A = \dfrac{1}{2}\int_\alpha^\beta r^2\,d\theta`, vars: [['\\alpha, \\beta', 'angles that trace the region once', '']], note: 'For the area between two curves, use ½∫(R² − r²) dθ.' },
      ],
    },
    {
      id: 'series',
      title: 'Series and convergence tests',
      formulas: [
        { id: 'geometric-series', name: 'Geometric series', tex: tex`\sum_{n=0}^\infty ar^n = \dfrac{a}{1-r} \quad |r| < 1`, vars: [['a', 'first term', ''], ['r', 'common ratio', '']], note: 'Diverges when |r| ≥ 1.' },
        { id: 'nth-term-test', name: 'nth-term test for divergence', tex: tex`\lim_{n\to\infty} a_n \ne 0 \;\Rightarrow\; \sum a_n \text{ diverges}`, vars: [], note: 'It can only prove divergence. Terms going to 0 proves nothing (the harmonic series diverges).' },
        { id: 'p-series', name: 'p-series', tex: tex`\sum_{n=1}^\infty \dfrac{1}{n^p} \text{ converges} \iff p > 1`, vars: [['p', 'the power', '']] },
        { id: 'ratio-test', name: 'Ratio test', tex: tex`L = \lim_{n\to\infty}\left|\dfrac{a_{n+1}}{a_n}\right| \qquad L < 1 \text{ converges} \qquad L > 1 \text{ diverges} \qquad L = 1 \text{ inconclusive}`, vars: [], note: 'The go-to test for factorials and powers. Use it to find a radius of convergence, then test the endpoints separately.' },
        { id: 'alternating-series', name: 'Alternating series test and error bound', tex: tex`|S - S_n| \le |a_{n+1}|`, vars: [['S', 'the sum', ''], ['S_n', 'nth partial sum', ''], ['a_{n+1}', 'first term left out', '']], note: 'The test needs terms decreasing in size with limit 0.' },
        { id: 'comparison-tests', name: 'Comparison tests', tex: tex`0 \le a_n \le b_n,\ \sum b_n \text{ conv.} \Rightarrow \sum a_n \text{ conv.} \qquad \lim \dfrac{a_n}{b_n} = c > 0 \Rightarrow \text{same behavior}`, vars: [], note: 'Compare to a p-series or geometric series you already know.' },
        { id: 'absolute-conditional', name: 'Absolute vs conditional convergence', tex: tex`\sum |a_n| \text{ conv.} \Rightarrow \sum a_n \text{ conv. absolutely}`, vars: [], note: 'If Σ aₙ converges but Σ |aₙ| diverges, the convergence is conditional.' },
      ],
    },
    {
      id: 'taylor',
      title: 'Taylor series',
      formulas: [
        { id: 'taylor-polynomial', name: 'Taylor polynomial', tex: tex`P_n(x) = \sum_{k=0}^{n}\dfrac{f^{(k)}(a)}{k!}(x-a)^k`, vars: [['a', 'center', ''], ['f^{(k)}', 'kth derivative', '']], note: 'With a = 0 it is called a Maclaurin polynomial. Don\'t forget the k! in each coefficient.' },
        { id: 'lagrange-error', name: 'Lagrange error bound', tex: tex`|f(x) - P_n(x)| \le \dfrac{\max|f^{(n+1)}|}{(n+1)!}\,|x-a|^{n+1}`, vars: [['\\max|f^{(n+1)}|', 'the largest |(n+1)th derivative| between a and x', '']], note: 'Uses the next derivative after the polynomial\'s degree.' },
        { id: 'maclaurin-e', name: 'Maclaurin series for eˣ', tex: tex`e^x = \sum_{n=0}^\infty \dfrac{x^n}{n!} \qquad e^x = 1 + x + \dfrac{x^2}{2!} + \dfrac{x^3}{3!} + \cdots`, vars: [], note: 'Converges for all x.' },
        { id: 'maclaurin-sin', name: 'Maclaurin series for sin x', tex: tex`\sin x = \sum_{n=0}^\infty \dfrac{(-1)^n x^{2n+1}}{(2n+1)!} \qquad \sin x = x - \dfrac{x^3}{3!} + \dfrac{x^5}{5!} - \cdots`, vars: [], note: 'Odd powers only. Converges for all x.' },
        { id: 'maclaurin-cos', name: 'Maclaurin series for cos x', tex: tex`\cos x = \sum_{n=0}^\infty \dfrac{(-1)^n x^{2n}}{(2n)!} \qquad \cos x = 1 - \dfrac{x^2}{2!} + \dfrac{x^4}{4!} - \cdots`, vars: [], note: 'Even powers only. Converges for all x.' },
        { id: 'maclaurin-geometric', name: 'Maclaurin series for 1/(1 − x)', tex: tex`\dfrac{1}{1-x} = \sum_{n=0}^\infty x^n \qquad \dfrac{1}{1-x} = 1 + x + x^2 + \cdots \qquad |x| < 1`, vars: [], note: 'Substitute, differentiate or integrate it to build other series.' },
        { id: 'maclaurin-ln', name: 'Maclaurin series for ln(1 + x)', tex: tex`\ln(1+x) = \sum_{n=1}^\infty \dfrac{(-1)^{n+1}x^n}{n} \qquad \ln(1+x) = x - \dfrac{x^2}{2} + \dfrac{x^3}{3} - \cdots \qquad -1 < x \le 1`, vars: [] },
        { id: 'maclaurin-arctan', name: 'Maclaurin series for arctan x', tex: tex`\arctan x = \sum_{n=0}^\infty \dfrac{(-1)^n x^{2n+1}}{2n+1} \qquad \arctan x = x - \dfrac{x^3}{3} + \dfrac{x^5}{5} - \cdots \qquad |x| \le 1`, vars: [] },
      ],
    },
  ],
};
