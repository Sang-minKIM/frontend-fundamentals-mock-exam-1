import { queryOptions } from '@tanstack/react-query';
import { SAVINGS_CALCULATOR_ENDPOINT, SAVINGS_CALCULATOR_QUERY_KEY } from './savingsCalculator.model';
import { SavingsProduct } from './savingsCalculator.type';
import { request } from 'utils/request';

export const savingsProductsQueryOptions = () =>
  queryOptions<SavingsProduct[]>({
    queryKey: [SAVINGS_CALCULATOR_QUERY_KEY.SAVINGS_PRODUCTS()],
    queryFn: async () => request(SAVINGS_CALCULATOR_ENDPOINT.SAVINGS_PRODUCTS()),
  });
