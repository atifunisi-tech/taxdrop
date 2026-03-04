export type EbayStoreType = 'none' | 'starter' | 'basic' | 'premium' | 'anchor' | 'enterprise';

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
  isAutoBreakeven: boolean;
  isForecastExpanded: boolean;
  isMarginForecastExpanded: boolean;
  selectedState: string;
  hasEbayStore: boolean;
  ebayStoreType: EbayStoreType;
  receiptTheme: boolean;
  tripleMarsTheme: boolean;
  zapTheme: boolean;
}

export const DEFAULT_STATE: CalculatorState = {
  amazonPrice: 0,
  amazonTaxPercent: 0,
  ebaySalePrice: 0,
  ebayFeePercent: 13.25,
  isPromoted: false,
  promotedPercent: 2,
  autoImportAmazon: true,
  manualAmazonCost: 0,
  darkMode: false,
  isManualSalePrice: false,
  isAutoBreakeven: true,
  isForecastExpanded: true,
  isMarginForecastExpanded: true,
  selectedState: '',
  hasEbayStore: false,
  ebayStoreType: 'none',
  receiptTheme: false,
  tripleMarsTheme: false,
  zapTheme: true,
};
