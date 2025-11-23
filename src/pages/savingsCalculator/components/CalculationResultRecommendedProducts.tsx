import { Assets, colors, ListHeader, ListRow, Spacing } from 'tosslib';
import { formatNumberWithComma } from 'utils/formatNumberInput';
import { useFormContext } from 'react-hook-form';
import { SavingsCalculatorForm } from '../types/savingsCalculatorForm';
import { SavingsProduct } from '../queries/savingsCalculator.type';

interface CalculationResultRecommendedProductsProps {
  savingsProducts: SavingsProduct[];
}

export function CalculationResultRecommendedProducts({ savingsProducts }: CalculationResultRecommendedProductsProps) {
  const { setValue, watch } = useFormContext<SavingsCalculatorForm>();
  const recommendedProducts = [...savingsProducts].sort((a, b) => b.annualRate - a.annualRate).slice(0, 2);
  return (
    <>
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
    </>
  );
}
