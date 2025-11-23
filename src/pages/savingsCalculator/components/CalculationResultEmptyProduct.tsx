import { useFormContext } from 'react-hook-form';
import { ListRow } from 'tosslib';
import { SavingsCalculatorForm } from '../types/savingsCalculatorForm';

export function CalculationResultEmptyProduct() {
  const {
    formState: { errors },
  } = useFormContext<SavingsCalculatorForm>();
  return (
    <ListRow
      contents={
        <ListRow.Texts type="1RowTypeA" top={errors.selectedProductId?.message ?? '선택된 상품을 찾을 수 없습니다.'} />
      }
    />
  );
}
