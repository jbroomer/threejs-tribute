export const DENOMINATOR = (slope) => Math.sqrt(1 + slope ** 2);
export const NEXT_X = (slope) => 1 / DENOMINATOR(slope);
export const NEXT_Z = (slope) => slope / DENOMINATOR(slope);

export const DISTANCE = 2.5;
export const SPIRAL_X = (a) =>
  Math.sqrt(a) * Math.cos(((1 + Math.sqrt(5)) / DISTANCE) * Math.PI * a);
export const SPIRAL_Z = (a) =>
  Math.sqrt(a) * Math.sin(((1 + Math.sqrt(5)) / DISTANCE) * Math.PI * a);

export const isInsideCircle = (x, z, radius) => {
  const d = Math.sqrt(((x - 0) ** 2) + ((z - 0) ** 2));
  const tis = d < radius;
  return tis;
};
