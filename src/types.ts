export interface CalculatorState {
  amazonPrice: number;
  amazonTaxPercent: number;
  ebaySalePrice: number;
  ebayFeePercent: number;
  isPromoted: boolean;
  promotedPercent: number;
  autoImportAmazon: boolean;
  manualAmazonCost: number;
  darkMode: boolean;
  isManualSalePrice: boolean;
  isForecastExpanded: boolean;
  isMarginForecastExpanded: boolean;
}

export const DEFAULT_STATE: CalculatorState = {
  amazonPrice: 0,
  amazonTaxPercent: 8.25,
  ebaySalePrice: 0,
  ebayFeePercent: 13.6,
  isPromoted: false,
  promotedPercent: 2,
  autoImportAmazon: true,
  manualAmazonCost: 0,
  darkMode: false,
  isManualSalePrice: false,
  isForecastExpanded: true,
  isMarginForecastExpanded: true,
};
