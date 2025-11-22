import { Assets, colors, ListRow } from 'tosslib';
import { SavingsProduct } from '../queries/savingsCalculator.type';
import { formatNumberWithComma } from 'utils/formatNumberInput';
import { useFormContext } from 'react-hook-form';

interface SavingsProductProps {
  savingsProducts: SavingsProduct[];
}

export function SavingsProducts({ savingsProducts }: SavingsProductProps) {
  const { watch, setValue } = useFormContext();

  if (savingsProducts.length === 0) {
    return <div>조건에 맞는 적금 상품이 없어요.</div>;
  }

  return (
    <ul>
      {savingsProducts.map(({ id, name, annualRate, minMonthlyAmount, maxMonthlyAmount, availableTerms }) => (
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
    </ul>
  );
}
