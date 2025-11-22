import { useFormContext } from 'react-hook-form';
import { Assets, Border, colors, ListHeader, ListRow, Spacing } from 'tosslib';
import { formatNumberWithComma } from 'utils/formatNumberInput';
import { SavingsProduct } from '../queries/savingsCalculator.type';
import { SavingsCalculatorForm } from '../types/savingsCalculatorForm';
import {
  calculateExpectedAmount,
  calculateGapFromTarget,
  calculateRecommendedMonthlyAmount,
} from '../services/calculateSavings';

interface CalculationResultProps {
  savingsProducts: SavingsProduct[];
}

export function CalculationResult({ savingsProducts }: CalculationResultProps) {
  const { watch, setValue } = useFormContext<SavingsCalculatorForm>();

  const selectedProduct = savingsProducts.find((product: SavingsProduct) => product.id === watch('selectedProductId'));

  if (!selectedProduct) {
    return <ListRow contents={<ListRow.Texts type="1RowTypeA" top="상품을 선택해주세요." />} />;
  }

  const term = watch('term');
  const targetAmountNumber = Number(watch('targetAmount'));
  const monthlyAmountNumber = Number(watch('monthlyAmount'));

  const recommendedProducts = [...savingsProducts].sort((a, b) => b.annualRate - a.annualRate).slice(0, 2);

  const expectedAmount = calculateExpectedAmount({
    monthlyAmount: monthlyAmountNumber,
    term,
    annualRate: selectedProduct.annualRate,
  });

  const gapFromTarget = calculateGapFromTarget({
    targetAmount: targetAmountNumber,
    expectedAmount,
  });

  const recommendedMonthlyAmount = calculateRecommendedMonthlyAmount({
    targetAmount: targetAmountNumber,
    term,
    annualRate: selectedProduct.annualRate,
  });

  return (
    <>
      <Spacing size={8} />

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

      <Spacing size={8} />
      <Border height={16} />
      <Spacing size={8} />

      <ListHeader title={<ListHeader.TitleParagraph fontWeight="bold">추천 상품 목록</ListHeader.TitleParagraph>} />
      <Spacing size={12} />

      {recommendedProducts.map(({ id, name, annualRate, minMonthlyAmount, maxMonthlyAmount, availableTerms }) => (
        <ListRow
          key={id}
          contents={
            <ListRow.Texts
              type="3RowTypeA"
              top={name}
              topProps={{ fontSize: 16, fontWeight: 'bold', color: colors.grey900 }}
              middle={`연 이자율: ${annualRate}%`}
              middleProps={{ fontSize: 14, color: colors.blue600, fontWeight: 'medium' }}
              bottom={`${formatNumberWithComma(minMonthlyAmount)}원 ~ ${formatNumberWithComma(maxMonthlyAmount)}원 | ${availableTerms}개월`}
              bottomProps={{ fontSize: 13, color: colors.grey600 }}
            />
          }
          right={watch('selectedProductId') === id ? <Assets.Icon name="icon-check-circle-green" /> : undefined}
          onClick={() => setValue('selectedProductId', id, { shouldValidate: true })}
        />
      ))}

      <Spacing size={40} />
    </>
  );
}
