import { zodResolver } from '@hookform/resolvers/zod';
import { Suspense } from '@suspensive/react';
import { SuspenseQuery } from '@suspensive/react-query';
import { Controller, FormProvider, useForm } from 'react-hook-form';
import {
  Border,
  colors,
  ListHeader,
  ListRow,
  NavigationBar,
  SelectBottomSheet,
  Spacing,
  Tab,
  TextField,
} from 'tosslib';
import { formatStringWithComma, removeNonNumeric } from 'utils/formatNumberInput';
import { SavingsProducts } from './components/SavingsProducts';
import { savingsProductsQueryOptions } from './queries/savingsCalculator.query';
import { filterSavingsProducts } from './services/filterSavingsProducts';
import { SavingsCalculatorFormSchema, type SavingsCalculatorForm } from './types/savingsCalculatorForm';
import { SAVINGS_CALCULATOR_FORM_DEFAULT_VALUE } from './services/savingsCalculatorFormDefaultValue';
import { useState } from 'react';

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
  });

  const {
    control,
    watch,
    setValue,
    formState: { errors },
  } = formContext;

  return (
    <FormProvider {...formContext}>
      <NavigationBar title="적금 계산기" />

      <Spacing size={16} />

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
              onChange={e => {
                const numericValue = removeNonNumeric(e.target.value);
                field.onChange(numericValue);
              }}
            />
            {errors.targetAmount && <div>{errors.targetAmount.message}</div>}
          </>
        )}
      />
      <Spacing size={16} />
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
              onChange={e => {
                const numericValue = removeNonNumeric(e.target.value);
                field.onChange(numericValue);
                setValue('selectedProductId', SAVINGS_CALCULATOR_FORM_DEFAULT_VALUE.selectedProductId, {
                  shouldValidate: true,
                });
              }}
            />
            {errors.monthlyAmount && <div>{errors.monthlyAmount.message}</div>}
          </>
        )}
      />
      <Spacing size={16} />
      <Controller
        name="term"
        control={control}
        render={({ field }) => (
          <SelectBottomSheet
            label="저축 기간"
            title="저축 기간을 선택해주세요"
            value={field.value}
            onChange={value => {
              field.onChange(value);
              setValue('selectedProductId', SAVINGS_CALCULATOR_FORM_DEFAULT_VALUE.selectedProductId, {
                shouldValidate: true,
              });
            }}
          >
            <SelectBottomSheet.Option value={6}>6개월</SelectBottomSheet.Option>
            <SelectBottomSheet.Option value={12}>12개월</SelectBottomSheet.Option>
            <SelectBottomSheet.Option value={24}>24개월</SelectBottomSheet.Option>
          </SelectBottomSheet>
        )}
      />

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
        <>
          <Spacing size={8} />

          <ListRow
            contents={
              <ListRow.Texts
                type="2RowTypeA"
                top="예상 수익 금액"
                topProps={{ color: colors.grey600 }}
                bottom={`1,000,000원`}
                bottomProps={{ fontWeight: 'bold', color: colors.blue600 }}
              />
            }
          />
          <ListRow
            contents={
              <ListRow.Texts
                type="2RowTypeA"
                top="목표 금액과의 차이"
                topProps={{ color: colors.grey600 }}
                bottom={`-500,000원`}
                bottomProps={{ fontWeight: 'bold', color: colors.blue600 }}
              />
            }
          />
          <ListRow
            contents={
              <ListRow.Texts
                type="2RowTypeA"
                top="추천 월 납입 금액"
                topProps={{ color: colors.grey600 }}
                bottom={`100,000원`}
                bottomProps={{ fontWeight: 'bold', color: colors.blue600 }}
              />
            }
          />

          <Spacing size={8} />
          <Border height={16} />
          <Spacing size={8} />

          <ListHeader title={<ListHeader.TitleParagraph fontWeight="bold">추천 상품 목록</ListHeader.TitleParagraph>} />
          <Spacing size={12} />

          <ListRow
            contents={
              <ListRow.Texts
                type="3RowTypeA"
                top={'기본 정기적금'}
                topProps={{ fontSize: 16, fontWeight: 'bold', color: colors.grey900 }}
                middle={`연 이자율: 3.2%`}
                middleProps={{ fontSize: 14, color: colors.blue600, fontWeight: 'medium' }}
                bottom={`100,000원 ~ 500,000원 | 12개월`}
                bottomProps={{ fontSize: 13, color: colors.grey600 }}
              />
            }
            onClick={() => {}}
          />
          <ListRow
            contents={
              <ListRow.Texts
                type="3RowTypeA"
                top={'고급 정기적금'}
                topProps={{ fontSize: 16, fontWeight: 'bold', color: colors.grey900 }}
                middle={`연 이자율: 2.8%`}
                middleProps={{ fontSize: 14, color: colors.blue600, fontWeight: 'medium' }}
                bottom={`50,000원 ~ 1,000,000원 | 24개월`}
                bottomProps={{ fontSize: 13, color: colors.grey600 }}
              />
            }
            onClick={() => {}}
          />

          <Spacing size={40} />
          {/* 아래는 사용자가 적금 상품을 선택하지 않고 계산 결과 탭을 선택했을 때 출력해주세요. */}
          {/* <ListRow contents={<ListRow.Texts type="1RowTypeA" top="상품을 선택해주세요." />} /> */}
        </>
      )}
    </FormProvider>
  );
}
