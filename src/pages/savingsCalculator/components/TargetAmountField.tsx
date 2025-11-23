import { Controller, useFormContext } from 'react-hook-form';
import { SavingsCalculatorForm } from '../types/savingsCalculatorForm';
import { TextField } from 'tosslib';
import { formatStringWithComma, removeNonNumeric } from 'utils/formatNumberInput';

export function TargetAmountField() {
  const {
    control,
    formState: { errors },
  } = useFormContext<SavingsCalculatorForm>();

  const handleTargetAmountChange = (value: string, onChange: (value: string) => void) => {
    const numericValue = removeNonNumeric(value);
    onChange(numericValue);
  };

  return (
    <Controller
      name="targetAmount"
      control={control}
      render={({ field }) => (
        <>
          <TextField
            label="목표 금액"
            placeholder="목표 금액을 입력하세요"
            suffix="원"
            value={formatStringWithComma(field.value)}
            onChange={e => handleTargetAmountChange(e.target.value, field.onChange)}
          />
          {errors.targetAmount && <div>{errors.targetAmount.message}</div>}
        </>
      )}
    />
  );
}
