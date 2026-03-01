import React, { useState, useEffect, useMemo } from 'react';
import { 
  Calculator, 
  RefreshCcw, 
  Copy, 
  Moon, 
  Sun, 
  TrendingUp, 
  TrendingDown, 
  Info,
  DollarSign,
  Percent,
  ArrowRightLeft,
  Check,
  Package
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { CalculatorState, DEFAULT_STATE } from './types';

export default function App() {
  const [state, setState] = useState<CalculatorState>(() => {
    const saved = localStorage.getItem('dropcalc_state');
    if (saved) {
      try {
        return { ...DEFAULT_STATE, ...JSON.parse(saved) };
      } catch (e) {
        return DEFAULT_STATE;
      }
    }
    return DEFAULT_STATE;
  });

  const [copied, setCopied] = useState(false);

  useEffect(() => {
    localStorage.setItem('dropcalc_state', JSON.stringify(state));
  }, [state]);

  useEffect(() => {
    if (state.darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [state.darkMode]);

  const amazonTaxAmount = useMemo(() => (state.amazonPrice * state.amazonTaxPercent) / 100, [state.amazonPrice, state.amazonTaxPercent]);
  const amazonTotalCost = useMemo(() => state.amazonPrice + amazonTaxAmount, [state.amazonPrice, amazonTaxAmount]);

  const effectiveAmazonCost = state.autoImportAmazon ? amazonTotalCost : state.manualAmazonCost;

  const ebayFeeAmount = useMemo(() => (state.ebaySalePrice * state.ebayFeePercent) / 100, [state.ebaySalePrice, state.ebayFeePercent]);
  const promotedFeeAmount = useMemo(() => state.isPromoted ? (state.ebaySalePrice * state.promotedPercent) / 100 : 0, [state.ebaySalePrice, state.isPromoted, state.promotedPercent]);
  const fixedFee = 0.40;

  const totalFees = useMemo(() => ebayFeeAmount + promotedFeeAmount + fixedFee, [ebayFeeAmount, promotedFeeAmount, fixedFee]);
  const netProfit = useMemo(() => state.ebaySalePrice - effectiveAmazonCost - totalFees, [state.ebaySalePrice, effectiveAmazonCost, totalFees]);
  const profitMargin = useMemo(() => state.ebaySalePrice > 0 ? (netProfit / state.ebaySalePrice) * 100 : 0, [netProfit, state.ebaySalePrice]);

  const handleReset = () => {
    setState({ ...DEFAULT_STATE, darkMode: state.darkMode });
  };

  const handleCopy = () => {
    const text = `Profit: $${netProfit.toFixed(2)} | Margin: ${profitMargin.toFixed(2)}%`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const updateState = (key: keyof CalculatorState, value: any) => {
    setState(prev => ({ ...prev, [key]: value }));
  };

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-950 text-neutral-900 dark:text-neutral-100 transition-colors duration-300 font-sans">
      {/* Header */}
      <header className="border-bottom border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-emerald-500 p-2 rounded-lg">
              <Calculator className="w-5 h-5 text-white" />
            </div>
            <h1 className="font-bold text-xl tracking-tight">DropCalc</h1>
          </div>
          <div className="flex items-center gap-2">
            <button 
              onClick={() => updateState('darkMode', !state.darkMode)}
              className="p-2 rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
            >
              {state.darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
            <button 
              onClick={handleReset}
              className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium rounded-lg border border-neutral-200 dark:border-neutral-700 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
            >
              <RefreshCcw className="w-4 h-4" />
              Reset
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 py-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Inputs */}
        <div className="lg:col-span-7 space-y-8">
          
          {/* Section 1: Amazon */}
          <section className="bg-white dark:bg-neutral-900 rounded-2xl p-6 shadow-sm border border-neutral-200 dark:border-neutral-800">
            <div className="flex items-center gap-2 mb-6">
              <Package className="w-5 h-5 text-emerald-500" />
              <h2 className="text-lg font-semibold">Amazon Sales Tax</h2>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-neutral-500 dark:text-neutral-400">Product Price (USD)</label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
                  <input 
                    type="number" 
                    value={state.amazonPrice || ''} 
                    onChange={(e) => updateState('amazonPrice', parseFloat(e.target.value) || 0)}
                    placeholder="0.00"
                    className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-transparent focus:ring-2 focus:ring-emerald-500 outline-none transition-all"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-neutral-500 dark:text-neutral-400">Sales Tax (%)</label>
                <div className="relative">
                  <Percent className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
                  <input 
                    type="number" 
                    value={state.amazonTaxPercent || ''} 
                    onChange={(e) => updateState('amazonTaxPercent', parseFloat(e.target.value) || 0)}
                    placeholder="8.25"
                    className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-transparent focus:ring-2 focus:ring-emerald-500 outline-none transition-all"
                  />
                </div>
              </div>
            </div>

            <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 bg-neutral-50 dark:bg-neutral-800/50 rounded-xl">
              <div>
                <p className="text-[10px] uppercase tracking-wider font-bold text-neutral-400 mb-1">Price</p>
                <p className="font-mono text-sm">${state.amazonPrice.toFixed(2)}</p>
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-wider font-bold text-neutral-400 mb-1">Tax %</p>
                <p className="font-mono text-sm">{state.amazonTaxPercent}%</p>
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-wider font-bold text-neutral-400 mb-1">Tax Amt</p>
                <p className="font-mono text-sm text-amber-600 dark:text-amber-400">${amazonTaxAmount.toFixed(2)}</p>
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-wider font-bold text-neutral-400 mb-1">Total Cost</p>
                <p className="font-mono text-sm font-bold text-emerald-600 dark:text-emerald-400">${amazonTotalCost.toFixed(2)}</p>
              </div>
            </div>
          </section>

          {/* Section 2: eBay */}
          <section className="bg-white dark:bg-neutral-900 rounded-2xl p-6 shadow-sm border border-neutral-200 dark:border-neutral-800">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-blue-500" />
                <h2 className="text-lg font-semibold">eBay Profit</h2>
              </div>
              <div className="flex items-center gap-2 bg-neutral-100 dark:bg-neutral-800 p-1 rounded-lg">
                <span className="text-xs font-medium px-2 text-neutral-500">Auto Import</span>
                <button 
                  onClick={() => updateState('autoImportAmazon', !state.autoImportAmazon)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none ${state.autoImportAmazon ? 'bg-emerald-500' : 'bg-neutral-300 dark:bg-neutral-600'}`}
                >
                  <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${state.autoImportAmazon ? 'translate-x-6' : 'translate-x-1'}`} />
                </button>
              </div>
            </div>

            <div className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-neutral-500 dark:text-neutral-400">Amazon Cost (USD)</label>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
                    <input 
                      type="number" 
                      disabled={state.autoImportAmazon}
                      value={effectiveAmazonCost || ''} 
                      onChange={(e) => updateState('manualAmazonCost', parseFloat(e.target.value) || 0)}
                      placeholder="0.00"
                      className={`w-full pl-9 pr-4 py-2.5 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-transparent focus:ring-2 focus:ring-blue-500 outline-none transition-all ${state.autoImportAmazon ? 'opacity-60 cursor-not-allowed bg-neutral-50 dark:bg-neutral-800/50' : ''}`}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-neutral-500 dark:text-neutral-400">eBay Sale Price</label>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
                    <input 
                      type="number" 
                      value={state.ebaySalePrice || ''} 
                      onChange={(e) => updateState('ebaySalePrice', parseFloat(e.target.value) || 0)}
                      placeholder="0.00"
                      className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-transparent focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="text-sm font-medium text-neutral-500 dark:text-neutral-400">Final Value Fee (%)</label>
                    <div className="group relative">
                      <Info className="w-3.5 h-3.5 text-neutral-400 cursor-help" />
                      <div className="absolute bottom-full right-0 mb-2 w-48 p-2 bg-neutral-900 text-white text-[10px] rounded shadow-lg opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity z-20">
                        Standard eBay fee is approximately 13.6%
                      </div>
                    </div>
                  </div>
                  <div className="relative">
                    <Percent className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
                    <input 
                      type="number" 
                      value={state.ebayFeePercent || ''} 
                      onChange={(e) => updateState('ebayFeePercent', parseFloat(e.target.value) || 0)}
                      placeholder="13.6"
                      className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-transparent focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-neutral-500 dark:text-neutral-400">Promoted Listing</label>
                  <select 
                    value={state.isPromoted ? 'yes' : 'no'}
                    onChange={(e) => updateState('isPromoted', e.target.value === 'yes')}
                    className="w-full px-4 py-2.5 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-transparent focus:ring-2 focus:ring-blue-500 outline-none transition-all appearance-none"
                  >
                    <option value="no">No</option>
                    <option value="yes">Yes</option>
                  </select>
                </div>
              </div>

              <AnimatePresence>
                {state.isPromoted && (
                  <motion.div 
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="space-y-2 pt-2">
                      <label className="text-sm font-medium text-neutral-500 dark:text-neutral-400">Promoted Percentage (%)</label>
                      <div className="relative">
                        <Percent className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
                        <input 
                          type="number" 
                          value={state.promotedPercent || ''} 
                          onChange={(e) => updateState('promotedPercent', parseFloat(e.target.value) || 0)}
                          placeholder="2"
                          className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-transparent focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                        />
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="flex items-center gap-3 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl border border-blue-100 dark:border-blue-800">
                <div className="bg-blue-500 p-1.5 rounded-lg">
                  <DollarSign className="w-4 h-4 text-white" />
                </div>
                <div>
                  <p className="text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider">Fixed Fee</p>
                  <p className="text-sm font-mono font-semibold">$0.40 per sale</p>
                </div>
              </div>
            </div>
          </section>
        </div>

        {/* Right Column: Summary */}
        <div className="lg:col-span-5">
          <div className="sticky top-24 space-y-6">
            <section className="bg-white dark:bg-neutral-900 rounded-2xl shadow-xl border border-neutral-200 dark:border-neutral-800 overflow-hidden">
              <div className="p-6 border-b border-neutral-100 dark:border-neutral-800 flex items-center justify-between">
                <h2 className="font-bold text-lg">Calculation Summary</h2>
                <button 
                  onClick={handleCopy}
                  className={`flex items-center gap-2 px-3 py-1.5 text-xs font-bold rounded-full transition-all ${copied ? 'bg-emerald-500 text-white' : 'bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700'}`}
                >
                  {copied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                  {copied ? 'Copied!' : 'Copy Profit'}
                </button>
              </div>

              <div className="p-6 space-y-4">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-neutral-500">Amazon Cost</span>
                  <span className="font-mono font-medium">${effectiveAmazonCost.toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-neutral-500">eBay Sale Price</span>
                  <span className="font-mono font-medium">${state.ebaySalePrice.toFixed(2)}</span>
                </div>
                
                <div className="h-px bg-neutral-100 dark:bg-neutral-800 my-2" />
                
                <div className="space-y-3">
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-neutral-500">eBay Fee ({state.ebayFeePercent}%)</span>
                    <span className="font-mono text-neutral-600 dark:text-neutral-400">-${ebayFeeAmount.toFixed(2)}</span>
                  </div>
                  {state.isPromoted && (
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-neutral-500">Promoted Fee ({state.promotedPercent}%)</span>
                      <span className="font-mono text-neutral-600 dark:text-neutral-400">-${promotedFeeAmount.toFixed(2)}</span>
                    </div>
                  )}
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-neutral-500">Fixed Fee</span>
                    <span className="font-mono text-neutral-600 dark:text-neutral-400">-$0.40</span>
                  </div>
                  <div className="flex justify-between items-center text-sm font-bold">
                    <span className="text-neutral-500">Total Fees</span>
                    <span className="font-mono text-amber-600 dark:text-amber-400">-${totalFees.toFixed(2)}</span>
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t border-neutral-100 dark:border-neutral-800">
                  <div className="flex flex-col gap-1 mb-6">
                    <span className="text-xs font-bold text-neutral-400 uppercase tracking-widest">Net Profit</span>
                    <div className="flex items-baseline gap-2">
                      <span className={`text-4xl font-black tracking-tighter ${netProfit >= 0 ? 'text-emerald-500' : 'text-rose-500'}`}>
                        ${netProfit.toFixed(2)}
                      </span>
                      <span className={`text-sm font-bold ${netProfit >= 0 ? 'text-emerald-500/60' : 'text-rose-500/60'}`}>
                        {netProfit >= 0 ? <TrendingUp className="w-4 h-4 inline" /> : <TrendingDown className="w-4 h-4 inline" />}
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className={`p-4 rounded-xl border ${netProfit >= 0 ? 'bg-emerald-50 dark:bg-emerald-900/20 border-emerald-100 dark:border-emerald-800' : 'bg-rose-50 dark:bg-rose-900/20 border-rose-100 dark:border-rose-800'}`}>
                      <p className="text-[10px] font-bold uppercase tracking-wider text-neutral-400 mb-1">Profit Margin</p>
                      <p className={`text-xl font-black ${netProfit >= 0 ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-600 dark:text-rose-400'}`}>
                        {profitMargin.toFixed(2)}%
                      </p>
                    </div>
                    <div className="p-4 rounded-xl bg-neutral-50 dark:bg-neutral-800 border border-neutral-100 dark:border-neutral-700">
                      <p className="text-[10px] font-bold uppercase tracking-wider text-neutral-400 mb-1">ROI</p>
                      <p className="text-xl font-black">
                        {effectiveAmazonCost > 0 ? ((netProfit / effectiveAmazonCost) * 100).toFixed(2) : '0.00'}%
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <div className="p-4 bg-amber-50 dark:bg-amber-900/20 rounded-xl border border-amber-100 dark:border-amber-800 flex gap-3">
              <Info className="w-5 h-5 text-amber-500 shrink-0" />
              <p className="text-xs text-amber-800 dark:text-amber-200 leading-relaxed">
                <strong>Pro Tip:</strong> Always account for potential returns and shipping adjustments. This calculator assumes standard eBay categories.
              </p>
            </div>
          </div>
        </div>
      </main>

      <footer className="max-w-5xl mx-auto px-4 py-12 text-center">
        <p className="text-sm text-neutral-400">
          Professional Dropshipping Calculator &copy; {new Date().getFullYear()}
        </p>
      </footer>
    </div>
  );
}
