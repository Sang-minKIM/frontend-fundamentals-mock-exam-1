import { useFormContext } from 'react-hook-form';
import { Border, Spacing } from 'tosslib';
import { SavingsProduct } from '../queries/savingsCalculator.type';
import { SavingsCalculatorForm } from '../types/savingsCalculatorForm';
import { CalculationResultEmptyProduct } from './CalculationResultEmptyProduct';
import { CalculationResultExpectAmount } from './CalculationResultExpectAmount';
import { CalculationResultGapFromTarget } from './CalculationResultGapFromTarget';
import { CalculationResultRecommendedMonthlyAmount } from './CalculationResultRecommendedMonthlyAmount';
import { CalculationResultRecommendedProducts } from './CalculationResultRecommendedProducts';

interface CalculationResultProps {
  savingsProducts: SavingsProduct[];
}

export function CalculationResult({ savingsProducts }: CalculationResultProps) {
  const { watch } = useFormContext<SavingsCalculatorForm>();

  const selectedProduct = savingsProducts.find((product: SavingsProduct) => product.id === watch('selectedProductId'));

  return (
    <>
      <Spacing size={8} />

      {!selectedProduct ? (
        <CalculationResultEmptyProduct />
      ) : (
        <>
          <CalculationResultExpectAmount selectedProduct={selectedProduct} />
          <CalculationResultGapFromTarget selectedProduct={selectedProduct} />
          <CalculationResultRecommendedMonthlyAmount selectedProduct={selectedProduct} />
        </>
      )}

      <Spacing size={8} />
      <Border height={16} />
      <Spacing size={8} />

      <CalculationResultRecommendedProducts savingsProducts={savingsProducts} />

      <Spacing size={40} />
    </>
  );
}
