/**
 * 숫자 문자열에서 숫자가 아닌 문자를 제거하고 숫자만 반환
 */
export function removeNonNumeric(value: string): string {
  return value.replace(/[^0-9]/g, '');
}

/**
 * 숫자 문자열을 콤마가 포함된 문자열로 변환
 */
export function formatStringWithComma(value: string): string {
  const numericValue = removeNonNumeric(value);
  if (!numericValue) {
    return '';
  }
  return formatNumberWithComma(Number(numericValue));
}

export function formatNumberWithComma(number: number): string {
  return number.toLocaleString('ko-KR');
}
