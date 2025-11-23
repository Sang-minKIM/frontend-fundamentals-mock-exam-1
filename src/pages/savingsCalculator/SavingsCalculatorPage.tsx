import { zodResolver } from '@hookform/resolvers/zod';
import { Suspense } from '@suspensive/react';
import { SuspenseQuery } from '@suspensive/react-query';
import { FormProvider, useForm } from 'react-hook-form';
import { Border, NavigationBar, Spacing, Tab } from 'tosslib';
import { SavingsProducts } from './components/SavingsProducts';
import { savingsProductsQueryOptions } from './queries/savingsCalculator.query';
import { filterSavingsProducts } from './services/filterSavingsProducts';
import { SavingsCalculatorFormSchema, type SavingsCalculatorForm } from './types/savingsCalculatorForm';
import { SAVINGS_CALCULATOR_FORM_DEFAULT_VALUE } from './services/savingsCalculatorFormDefaultValue';
import { useState } from 'react';
import { CalculationResult } from './components/CalculationResult';
import { TargetAmountField } from './components/TargetAmountField';
import { MonthlyAmountField } from './components/MonthlyAmountField';
import { SavingsTermField } from './components/SavingsTermField';

type SelectedTab = 'products' | 'results';

export function SavingsCalculatorPage() {
  const [selectedTab, setSelectedTab] = useState<SelectedTab>('products');

  const formContext = useForm<SavingsCalculatorForm>({
    resolver: zodResolver(SavingsCalculatorFormSchema),
    defaultValues: {
      targetAmount: SAVINGS_CALCULATOR_FORM_DEFAULT_VALUE.targetAmount,
      monthlyAmount: SAVINGS_CALCULATOR_FORM_DEFAULT_VALUE.monthlyAmount,
      term: SAVINGS_CALCULATOR_FORM_DEFAULT_VALUE.term,
      selectedProductId: SAVINGS_CALCULATOR_FORM_DEFAULT_VALUE.selectedProductId,
    },
    mode: 'onChange',
  });

  const { watch } = formContext;

  return (
    <FormProvider {...formContext}>
      <NavigationBar title="적금 계산기" />

      <Spacing size={16} />

      <TargetAmountField />
      <Spacing size={16} />
      <MonthlyAmountField />
      <Spacing size={16} />
      <SavingsTermField />

      <Spacing size={24} />
      <Border height={16} />
      <Spacing size={8} />

      <Tab onChange={value => setSelectedTab(value as SelectedTab)}>
        <Tab.Item value="products" selected={selectedTab === 'products'}>
          적금 상품
        </Tab.Item>
        <Tab.Item value="results" selected={selectedTab === 'results'}>
          계산 결과
        </Tab.Item>
      </Tab>

      {selectedTab === 'products' && (
        <Suspense fallback={'loading...'}>
          <SuspenseQuery
            {...savingsProductsQueryOptions()}
            select={data =>
              filterSavingsProducts({
                products: data,
                monthlyAmount: watch('monthlyAmount'),
                term: watch('term'),
              })
            }
          >
            {({ data: savingsProducts }) => <SavingsProducts savingsProducts={savingsProducts} />}
          </SuspenseQuery>
        </Suspense>
      )}

      {selectedTab === 'results' && (
        <Suspense fallback={'loading...'}>
          <SuspenseQuery
            {...savingsProductsQueryOptions()}
            select={data =>
              filterSavingsProducts({
                products: data,
                monthlyAmount: watch('monthlyAmount'),
                term: watch('term'),
              })
            }
          >
            {({ data: savingsProducts }) => <CalculationResult savingsProducts={savingsProducts} />}
          </SuspenseQuery>
        </Suspense>
      )}
    </FormProvider>
  );
}
