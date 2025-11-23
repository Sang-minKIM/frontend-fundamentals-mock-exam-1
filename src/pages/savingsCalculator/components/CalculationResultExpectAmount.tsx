import { colors, ListRow } from 'tosslib';
import { useFormContext } from 'react-hook-form';
import { SavingsCalculatorForm } from '../types/savingsCalculatorForm';
import { formatNumberWithComma } from 'utils/formatNumberInput';
import { SavingsProduct } from '../queries/savingsCalculator.type';
import { calculateExpectedAmount } from '../services/calculateSavings';

export function CalculationResultExpectAmount({ selectedProduct }: { selectedProduct: SavingsProduct }) {
  const { watch } = useFormContext<SavingsCalculatorForm>();

  const term = watch('term');
  const monthlyAmountNumber = Number(watch('monthlyAmount'));

  const expectedAmount = calculateExpectedAmount({
    monthlyAmount: monthlyAmountNumber,
    term,
    annualRate: selectedProduct.annualRate,
  });
  return (
    <ListRow
      contents={
        <ListRow.Texts
          type="2RowTypeA"
          top="예상 수익 금액"
          topProps={{ color: colors.grey600 }}
          bottom={`${formatNumberWithComma(expectedAmount)}원`}
          bottomProps={{ fontWeight: 'bold', color: colors.blue600 }}
        />
      }
    />
  );
}
