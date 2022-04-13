export const convertPriceFormat = (
  price: string,
  minimumFractionDigits: number = 0
): string => {
  return new Intl.NumberFormat('en-US', { minimumFractionDigits }).format(
    Number(price)
  );
};
