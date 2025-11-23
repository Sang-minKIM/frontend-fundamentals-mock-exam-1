import { Controller, useFormContext } from 'react-hook-form';
import { SelectBottomSheet } from 'tosslib';
import { SavingsCalculatorForm } from '../types/savingsCalculatorForm';
import { SAVINGS_CALCULATOR_FORM_DEFAULT_VALUE } from '../services/savingsCalculatorFormDefaultValue';

export function SavingsTermField() {
  const { control, setValue } = useFormContext<SavingsCalculatorForm>();

  const handleChange = (value: number, onChange: (value: number) => void) => {
    onChange(value);
    setValue('selectedProductId', SAVINGS_CALCULATOR_FORM_DEFAULT_VALUE.selectedProductId, {
      shouldValidate: true,
    });
  };

  return (
    <Controller
      name="term"
      control={control}
      render={({ field }) => (
        <SelectBottomSheet
          label="저축 기간"
          title="저축 기간을 선택해주세요"
          value={field.value}
          onChange={value => handleChange(value as number, field.onChange)}
        >
          <SelectBottomSheet.Option value={6}>6개월</SelectBottomSheet.Option>
          <SelectBottomSheet.Option value={12}>12개월</SelectBottomSheet.Option>
          <SelectBottomSheet.Option value={24}>24개월</SelectBottomSheet.Option>
        </SelectBottomSheet>
      )}
    />
  );
}
