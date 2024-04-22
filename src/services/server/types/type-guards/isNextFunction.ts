export const isNextFunction = (next: unknown): next is (error?: any) => void => {
  return typeof next === 'function';
};

