import { describe, it, expect } from 'vitest'
import { valueAt, slopeAt, areaUnder, absoluteAreaUnder, netForce } from './figureMath'

const TRIP = [[0, 0], [4, 8], [8, 8], [10, 0]];
const CROSSING = [[0, 6], [6, -6]];

describe('figureMath', () => {
  it('reads values between points', () => {
    expect(valueAt(TRIP, 2)).toBe(4);
    expect(valueAt(TRIP, 9)).toBe(4);
  });
  it('reads slopes inside a segment and refuses corners', () => {
    expect(slopeAt(TRIP, 1)).toBe(2);
    expect(slopeAt(TRIP, 9)).toBe(-4);
    expect(() => slopeAt(TRIP, 4)).toThrow(/corner/);
  });
  it('gives signed and absolute areas, splitting a segment at the axis', () => {
    expect(areaUnder(TRIP, 0, 10)).toBe(56);
    expect(areaUnder(TRIP, 2, 6)).toBe(28);
    expect(areaUnder(CROSSING, 0, 6)).toBeCloseTo(0);
    expect(absoluteAreaUnder(CROSSING, 0, 6)).toBeCloseTo(18);
  });
  it('skips vertical segments without dividing by zero', () => {
    const step = [[0, 3], [4, 3], [4, 0], [5, 0]];
    expect(areaUnder(step, 0, 5)).toBe(12);
    expect(areaUnder(step, 3, 5)).toBe(3);
    expect(absoluteAreaUnder([[0, -2], [2, -2], [2, 4], [3, 4]], 0, 3)).toBe(8);
  });
  it('refuses x outside the graph', () => {
    expect(() => valueAt(TRIP, 11)).toThrow(RangeError);
  });
  it('adds forces as vectors', () => {
    const net = netForce([{ value: 30, angle: 0 }, { value: 10, angle: 180 }, { value: 49, angle: 90 }, { value: 49, angle: 270 }]);
    expect(net.x).toBeCloseTo(20);
    expect(net.y).toBe(0);
    expect(net.magnitude).toBeCloseTo(20);
    expect(netForce([{ value: 20, angle: 30 }]).x).toBeCloseTo(17.32, 2);
  });
});
