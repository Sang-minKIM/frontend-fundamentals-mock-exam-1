import { z } from 'zod';

export const SavingsCalculatorFormSchema = z.object({
  targetAmount: z
    .string()
    .min(1, '목표 금액을 입력해주세요.')
    .refine(val => !isNaN(Number(val)) && Number(val) > 0, '올바른 금액을 입력해주세요.'),
  monthlyAmount: z
    .string()
    .min(1, '월 납입액을 입력해주세요.')
    .refine(val => !isNaN(Number(val)) && Number(val) > 0, '올바른 금액을 입력해주세요.'),
  term: z.number().min(1, '저축 기간을 선택해주세요.'),
  selectedProductId: z.string().min(1, '상품을 선택해주세요.'),
});

export type SavingsCalculatorForm = z.infer<typeof SavingsCalculatorFormSchema>;
