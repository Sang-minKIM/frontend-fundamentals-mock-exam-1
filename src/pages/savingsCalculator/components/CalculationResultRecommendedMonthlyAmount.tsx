import { colors, ListRow } from 'tosslib';
import { useFormContext } from 'react-hook-form';
import { SavingsCalculatorForm } from '../types/savingsCalculatorForm';
import { formatNumberWithComma } from 'utils/formatNumberInput';
import { SavingsProduct } from '../queries/savingsCalculator.type';
import { calculateRecommendedMonthlyAmount } from '../services/calculateSavings';

export function CalculationResultRecommendedMonthlyAmount({ selectedProduct }: { selectedProduct: SavingsProduct }) {
  const { watch } = useFormContext<SavingsCalculatorForm>();

  const term = watch('term');
  const targetAmountNumber = Number(watch('targetAmount'));

  const recommendedMonthlyAmount = calculateRecommendedMonthlyAmount({
    targetAmount: targetAmountNumber,
    term,
    annualRate: selectedProduct.annualRate,
  });

  return (
    <ListRow
      contents={
        <ListRow.Texts
          type="2RowTypeA"
          top="추천 월 납입 금액"
          topProps={{ color: colors.grey600 }}
          bottom={`${formatNumberWithComma(recommendedMonthlyAmount)}원`}
          bottomProps={{ fontWeight: 'bold', color: colors.blue600 }}
        />
      }
    />
  );
}
