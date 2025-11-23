import { colors, ListRow } from 'tosslib';
import { useFormContext } from 'react-hook-form';
import { SavingsCalculatorForm } from '../types/savingsCalculatorForm';
import { formatNumberWithComma } from 'utils/formatNumberInput';
import { SavingsProduct } from '../queries/savingsCalculator.type';
import { calculateExpectedAmount, calculateGapFromTarget } from '../services/calculateSavings';

export function CalculationResultGapFromTarget({ selectedProduct }: { selectedProduct: SavingsProduct }) {
  const { watch } = useFormContext<SavingsCalculatorForm>();

  const term = watch('term');
  const targetAmountNumber = Number(watch('targetAmount'));
  const monthlyAmountNumber = Number(watch('monthlyAmount'));

  const expectedAmount = calculateExpectedAmount({
    monthlyAmount: monthlyAmountNumber,
    term,
    annualRate: selectedProduct.annualRate,
  });

  const gapFromTarget = calculateGapFromTarget({
    targetAmount: targetAmountNumber,
    expectedAmount,
  });

  return (
    <ListRow
      contents={
        <ListRow.Texts
          type="2RowTypeA"
          top="목표 금액과의 차이"
          topProps={{ color: colors.grey600 }}
          bottom={`${formatNumberWithComma(gapFromTarget)}원`}
          bottomProps={{ fontWeight: 'bold', color: colors.blue600 }}
        />
      }
    />
  );
}
