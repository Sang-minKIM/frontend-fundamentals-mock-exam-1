import { SavingsProduct } from '../queries/savingsCalculator.type';

interface FilterSavingsProductsParams {
  products: SavingsProduct[];
  monthlyAmount: string;
  term: number;
}

export function filterSavingsProducts({
  products,
  monthlyAmount,
  term,
}: FilterSavingsProductsParams): SavingsProduct[] {
  return products.filter(product => {
    const isTermValid = product.availableTerms === term;
    if (!isTermValid) {
      return false;
    }

    // 월 납입액 필터링: 값이 있을 때만 적용
    const isEmptyMonthlyAmount = monthlyAmount === '';
    if (isEmptyMonthlyAmount) {
      return true;
    }

    const monthlyAmountNumber = Number(monthlyAmount);
    if (isNaN(monthlyAmountNumber)) {
      return false;
    }

    const isLessThanMinMonthlyAmount = monthlyAmountNumber < product.minMonthlyAmount;
    if (isLessThanMinMonthlyAmount) {
      return false;
    }

    const isGreaterThanMaxMonthlyAmount = monthlyAmountNumber > product.maxMonthlyAmount;
    if (isGreaterThanMaxMonthlyAmount) {
      return false;
    }

    return true;
  });
}
