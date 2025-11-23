import { Controller, useFormContext } from 'react-hook-form';
import { TextField } from 'tosslib';
import { formatStringWithComma, removeNonNumeric } from 'utils/formatNumberInput';
import { SavingsCalculatorForm } from '../types/savingsCalculatorForm';
import { SAVINGS_CALCULATOR_FORM_DEFAULT_VALUE } from '../services/savingsCalculatorFormDefaultValue';

export function MonthlyAmountField() {
  const {
    control,
    setValue,
    formState: { errors },
  } = useFormContext<SavingsCalculatorForm>();

  const handleMonthlyAmountChange = (value: string, onChange: (value: string) => void) => {
    const numericValue = removeNonNumeric(value);
    onChange(numericValue);
    setValue('selectedProductId', SAVINGS_CALCULATOR_FORM_DEFAULT_VALUE.selectedProductId, {
      shouldValidate: true,
    });
  };

  return (
    <Controller
      name="monthlyAmount"
      control={control}
      render={({ field }) => (
        <>
          <TextField
            label="월 납입액"
            placeholder="희망 월 납입액을 입력하세요"
            suffix="원"
            value={formatStringWithComma(field.value)}
            onChange={e => handleMonthlyAmountChange(e.target.value, field.onChange)}
          />
          {errors.monthlyAmount && <div>{errors.monthlyAmount.message}</div>}
        </>
      )}
    />
  );
}
