export const clip = (value, min, max) => Math.min(Math.max(value, min), max);

export const transition = (progress, min, max, limit = true) => {
  if (limit) {
    return min + clip(progress, 0, 1) * (max - min);
  } else {
    return min + progress * (max - min);
  }
};

export const progress = (value, min, max) => (value - min) / (max - min);

export const mapping = ({ sourceValue, sourceRange, mappedRange }) => {
  const sourceRangeProgress = progress(
    sourceValue,
    sourceRange[0],
    sourceRange[1]
  );
  return transition(sourceRangeProgress, mappedRange[0], mappedRange[1]);
};
