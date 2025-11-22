interface CalculateExpectedAmountParams {
  monthlyAmount: number;
  term: number;
  annualRate: number; // 백분율 (예: 3.2%)
}

/**
 * 예상 수익 금액 계산
 * 공식: 최종 금액 = 월 납입액 * 저축 기간 * (1 + 연이자율 * 0.5)
 *
 * @param monthlyAmount 월 납입액 (원)
 * @param term 저축 기간 (개월)
 * @param annualRate 연이자율 백분율 (예: 3.2%)
 * @returns 예상 수익 금액 (원)
 */
export function calculateExpectedAmount({ monthlyAmount, term, annualRate }: CalculateExpectedAmountParams): number {
  const annualRateDecimal = annualRate / 100; // 백분율을 소수로 변환 (예: 3.2% -> 0.032)
  return monthlyAmount * term * (1 + annualRateDecimal * 0.5);
}

interface CalculateGapFromTargetParams {
  targetAmount: number;
  expectedAmount: number;
}

/**
 * 목표 금액과의 차이 계산
 * 공식: 목표 금액과의 차이 = 목표 금액 - 예상 수익 금액
 *
 * @param targetAmount 목표 금액 (원)
 * @param expectedAmount 예상 수익 금액 (원)
 * @returns 목표 금액과의 차이 (원)
 */
export function calculateGapFromTarget({ targetAmount, expectedAmount }: CalculateGapFromTargetParams): number {
  return targetAmount - expectedAmount;
}

interface CalculateRecommendedMonthlyAmountParams {
  targetAmount: number;
  term: number;
  annualRate: number; // 백분율 (예: 3.2%)
}

/**
 * 추천 월 납입 금액 계산
 * 공식: 월 납입액 = 목표 금액 ÷ (저축 기간 * (1 + 연이자율 * 0.5))
 * 1,000원 단위로 반올림
 *
 * @param targetAmount 목표 금액 (원)
 * @param term 저축 기간 (개월)
 * @param annualRate 연이자율 백분율 (예: 3.2%)
 * @returns 추천 월 납입 금액 (원, 1,000원 단위로 반올림)
 */
export function calculateRecommendedMonthlyAmount({
  targetAmount,
  term,
  annualRate,
}: CalculateRecommendedMonthlyAmountParams): number {
  const annualRateDecimal = annualRate / 100; // 백분율을 소수로 변환 (예: 3.2% -> 0.032)
  const monthlyAmount = targetAmount / (term * (1 + annualRateDecimal * 0.5));
  // 1,000원 단위로 반올림
  return Math.round(monthlyAmount / 1000) * 1000;
}
