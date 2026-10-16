import { describe, it, expect } from 'vitest'
import { splitDisplayParts } from './texParts'

describe('splitDisplayParts', () => {
  it('splits at top-level \\qquad', () => {
    expect(splitDisplayParts(String.raw`A = \pi r^2 \qquad C = 2\pi r \qquad s = r\theta`)).toEqual([String.raw`A = \pi r^2`, String.raw`C = 2\pi r`, String.raw`s = r\theta`]);
  });
  it('leaves a single equation whole', () => {
    expect(splitDisplayParts(String.raw`K = \tfrac{1}{2}mv^2`)).toEqual([String.raw`K = \tfrac{1}{2}mv^2`]);
  });
  it('keeps \\qquad inside braces and environments', () => {
    const inBraces = String.raw`\text{a \qquad b} = 1`;
    const inEnv = String.raw`\begin{cases} 0 \qquad x \\ 1 \end{cases}`;
    expect(splitDisplayParts(inBraces)).toEqual([inBraces]);
    expect(splitDisplayParts(inEnv)).toEqual([inEnv]);
  });
  it('does not split on \\quad or longer command names', () => {
    expect(splitDisplayParts(String.raw`a \quad\text{or}\quad b`)).toHaveLength(1);
    expect(splitDisplayParts(String.raw`a \qquadx b`)).toHaveLength(1);
  });
});
