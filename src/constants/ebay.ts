import { EbayStoreType } from '../types';

export interface EbayStoreConfig {
  name: string;
  fixedFee: number;
  defaultFeePercent: number;
}

export const EBAY_STORES: Record<EbayStoreType, EbayStoreConfig> = {
  none: { name: 'No Store', fixedFee: 0.40, defaultFeePercent: 13.25 },
  starter: { name: 'Starter Store', fixedFee: 0.30, defaultFeePercent: 13.25 },
  basic: { name: 'Basic Store', fixedFee: 0.30, defaultFeePercent: 12.35 },
  premium: { name: 'Premium Store', fixedFee: 0.30, defaultFeePercent: 12.35 },
  anchor: { name: 'Anchor Store', fixedFee: 0.30, defaultFeePercent: 12.35 },
  enterprise: { name: 'Enterprise Store', fixedFee: 0.30, defaultFeePercent: 12.35 },
};
