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
  Package,
  ChevronDown,
  ChevronUp,
  Receipt,
  PieChart as PieIcon,
  Zap
} from 'lucide-react';
import { 
  PieChart, 
  Pie, 
  Cell, 
  ResponsiveContainer, 
  Tooltip, 
  Legend,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid
} from 'recharts';
import { motion, AnimatePresence } from 'motion/react';
import { CalculatorState, DEFAULT_STATE, EbayStoreType } from './types';
import { US_STATES } from './constants/states';
import { EBAY_STORES } from './constants/ebay';

const ReceiptCard = ({ children, title, icon: Icon, iconColor, expanded, onToggle, zapTheme, tripleMarsTheme, receiptTheme }: { children: React.ReactNode, title: string, icon: any, iconColor: string, expanded?: boolean, onToggle?: () => void, zapTheme: boolean, tripleMarsTheme: boolean, receiptTheme: boolean }) => {
  if (zapTheme) {
    return (
      <motion.section 
        initial={{ y: 10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="bg-white border border-neutral-200 rounded-2xl p-8 shadow-[0_2px_4px_rgba(0,0,0,0.04),0_8px_16px_rgba(0,0,0,0.04)] hover:shadow-[0_4px_8px_rgba(0,0,0,0.06),0_12px_24px_rgba(0,0,0,0.06)] transition-all duration-300"
      >
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-zap-orange/10 rounded-xl">
              <Icon className="w-6 h-6 text-zap-orange" />
            </div>
            <h2 className="text-xl font-bold text-zap-black tracking-tight">{title}</h2>
          </div>
          {onToggle && (
            <button 
              onClick={onToggle}
              className="p-2 rounded-lg hover:bg-neutral-100 text-neutral-400 hover:text-zap-black transition-all"
            >
              {expanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
            </button>
          )}
        </div>
        <div className="text-neutral-700">
          {children}
        </div>
      </motion.section>
    );
  }

  if (tripleMarsTheme) {
    return (
      <motion.section 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="bg-white border border-[#00d2ff]/30 rounded-2xl p-6 shadow-[0_10px_40px_rgba(0,210,255,0.08)] hover:shadow-[0_15px_50px_rgba(0,210,255,0.12)] transition-all duration-500 group relative overflow-hidden"
      >
        {/* Subtle background glow */}
        <div className="absolute -top-24 -right-24 w-48 h-48 bg-[#00d2ff]/5 rounded-full blur-3xl group-hover:bg-[#00d2ff]/10 transition-colors duration-500" />
        
        <div className="flex items-center justify-between mb-6 relative z-10">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-gradient-to-br from-[#00d2ff] to-[#0080ff] rounded-xl shadow-[0_4px_12px_rgba(0,210,255,0.3)] group-hover:scale-110 transition-transform duration-300">
              <Icon className={`w-5 h-5 text-white`} />
            </div>
            <h2 className="text-lg font-bold text-slate-900 tracking-tight">{title}</h2>
          </div>
          <div className="absolute top-0 right-0 opacity-[0.03] pointer-events-none select-none">
            <span className="text-6xl font-black tracking-tighter">DCal</span>
          </div>
          {onToggle && (
            <button 
              onClick={onToggle}
              className="p-1.5 rounded-lg bg-slate-100 hover:bg-[#00d2ff]/10 text-slate-400 hover:text-[#00d2ff] transition-all"
            >
              {expanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>
          )}
        </div>
        <div className="text-slate-600 relative z-10">
          {children}
        </div>
      </motion.section>
    );
  }

  if (!receiptTheme) {
    return (
      <section className="bg-white dark:bg-neutral-900 rounded-2xl p-6 shadow-sm border border-neutral-200 dark:border-neutral-800">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <Icon className={`w-5 h-5 ${iconColor}`} />
            <h2 className="text-lg font-semibold">{title}</h2>
          </div>
          {onToggle && (
            <button 
              onClick={onToggle}
              className="p-1.5 rounded-lg bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-colors"
            >
              {expanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>
          )}
        </div>
        {children}
      </section>
    );
  }

  return (
    <section className="bg-[#fdfdfd] dark:bg-neutral-900 rounded-sm shadow-xl border-t-4 border-neutral-400 dark:border-neutral-600 overflow-hidden font-mono text-neutral-800 dark:text-neutral-200">
      <div className="p-6 pb-2 text-center border-b border-dashed border-neutral-300 dark:border-neutral-700">
        <div className="flex justify-center mb-2">
          <Icon className={`w-4 h-4 ${iconColor} opacity-50`} />
        </div>
        <h2 className="font-black text-sm tracking-tighter uppercase">{title}</h2>
        <div className="flex justify-between text-[8px] opacity-40 mt-2">
          <span>DEPT: {title.split(' ')[0].toUpperCase()}</span>
          {onToggle && (
            <button onClick={onToggle} className="hover:opacity-100">
              [{expanded ? 'COLLAPSE' : 'EXPAND'}]
            </button>
          )}
        </div>
      </div>
      <div className="p-6">
        {children}
      </div>
      <div className="px-6 pb-4 text-center">
        <div className="w-full h-4 bg-neutral-900 dark:bg-neutral-100 opacity-5 flex gap-[1px] overflow-hidden mb-2">
          {Array.from({ length: 20 }).map((_, i) => (
            <div key={i} className="h-full bg-black dark:bg-white" style={{ width: `${Math.random() * 3 + 1}px` }} />
          ))}
        </div>
        <span className="text-[8px] tracking-[0.5em] opacity-40">01234567890123</span>
      </div>
    </section>
  );
};

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

  const currentFixedFee = useMemo(() => {
    if (!state.hasEbayStore) return 0.40;
    return EBAY_STORES[state.ebayStoreType].fixedFee;
  }, [state.hasEbayStore, state.ebayStoreType]);

  const effectiveAmazonCost = useMemo(() => {
    const rawCost = state.autoImportAmazon ? amazonTotalCost : state.manualAmazonCost;
    return Math.round((rawCost + Number.EPSILON) * 100) / 100;
  }, [state.autoImportAmazon, amazonTotalCost, state.manualAmazonCost]);

  const ebayDiscountAmount = useMemo(() => (state.ebaySalePrice * state.ebayDiscountPercent) / 100, [state.ebaySalePrice, state.ebayDiscountPercent]);
  const effectiveSalePrice = useMemo(() => state.ebaySalePrice - ebayDiscountAmount, [state.ebaySalePrice, ebayDiscountAmount]);

  // Breakeven Calculation
  const calculateBreakeven = () => {
    const cost = effectiveAmazonCost;
    const fixedFee = currentFixedFee;
    const totalFeePercent = state.ebayFeePercent + (state.isPromoted ? state.promotedPercent : 0);
    
    if (totalFeePercent >= 100) return 0;
    
    const breakeven = (cost + fixedFee) / (1 - totalFeePercent / 100);
    return Math.max(0, breakeven);
  };

  // Auto-update eBay Sale Price to Breakeven when Amazon Price or Fees change
  useEffect(() => {
    if (!state.isAutoBreakeven || state.isManualSalePrice) return;
    
    const breakeven = calculateBreakeven();
    if (breakeven > 0) {
      setState(prev => ({ ...prev, ebaySalePrice: parseFloat(breakeven.toFixed(2)) }));
    }
  }, [
    state.amazonPrice, 
    state.amazonTaxPercent, 
    state.autoImportAmazon, 
    state.manualAmazonCost, 
    state.ebayFeePercent, 
    state.isPromoted, 
    state.promotedPercent,
    state.isManualSalePrice,
    state.isAutoBreakeven
  ]);

  const ebayFeeAmount = useMemo(() => (effectiveSalePrice * state.ebayFeePercent) / 100, [effectiveSalePrice, state.ebayFeePercent]);
  const promotedFeeAmount = useMemo(() => state.isPromoted ? (effectiveSalePrice * state.promotedPercent) / 100 : 0, [effectiveSalePrice, state.isPromoted, state.promotedPercent]);
  const actualFixedFee = effectiveSalePrice > 0 ? currentFixedFee : 0;
  const totalFees = useMemo(() => ebayFeeAmount + promotedFeeAmount + actualFixedFee, [ebayFeeAmount, promotedFeeAmount, actualFixedFee]);
  const netProfit = useMemo(() => effectiveSalePrice > 0 ? effectiveSalePrice - effectiveAmazonCost - totalFees : 0, [effectiveSalePrice, effectiveAmazonCost, totalFees]);
  const profitMargin = useMemo(() => effectiveSalePrice > 0 ? (netProfit / effectiveSalePrice) * 100 : 0, [netProfit, effectiveSalePrice]);

  const promotionForecast = useMemo(() => {
    const percentages = Array.from({ length: 13 }, (_, i) => i + 1);
    return percentages.map(percent => {
      const pFee = (effectiveSalePrice * percent) / 100;
      const tFees = ebayFeeAmount + pFee + actualFixedFee;
      const nProfit = effectiveSalePrice > 0 ? effectiveSalePrice - effectiveAmazonCost - tFees : 0;
      const pMargin = effectiveSalePrice > 0 ? (nProfit / effectiveSalePrice) * 100 : 0;
      return {
        percent,
        totalFees: tFees,
        netProfit: nProfit,
        profitMargin: pMargin
      };
    });
  }, [effectiveSalePrice, state.ebayFeePercent, effectiveAmazonCost, ebayFeeAmount, actualFixedFee]);

  const marginForecast = useMemo(() => {
    const margins = [5, 10, 15, 20, 30, 40, 50];
    const cost = effectiveAmazonCost;
    const fixedFee = currentFixedFee;
    const variableFeePercent = state.ebayFeePercent + (state.isPromoted ? state.promotedPercent : 0);

    return margins.map(targetMargin => {
      // Formula: S = (Cost + FixedFee) / (1 - VariableFee% - TargetMargin%)
      const denominator = 1 - (variableFeePercent / 100) - (targetMargin / 100);
      
      if (denominator <= 0) return { margin: targetMargin, salePrice: 0, profit: 0 };
      
      const salePrice = (cost + fixedFee) / denominator;
      const profit = salePrice * (targetMargin / 100);
      
      return {
        margin: targetMargin,
        salePrice,
        profit
      };
    });
  }, [effectiveAmazonCost, state.ebayFeePercent, state.isPromoted, state.promotedPercent]);

  const chartData = useMemo(() => {
    return [
      { name: 'Net Profit', value: Math.max(0, netProfit), color: '#3b82f6', category: 'Profit' }, // blue-500
      { name: 'Amazon Cost', value: effectiveAmazonCost, color: '#10b981', category: 'Cost' }, // emerald-500
      { name: 'eBay FVF', value: ebayFeeAmount, color: '#f59e0b', category: 'Fees' }, // amber-500
      { name: 'Promoted Fee', value: promotedFeeAmount, color: '#f97316', category: 'Fees' }, // orange-500
      { name: 'Fixed Fee', value: actualFixedFee, color: '#fbbf24', category: 'Fees' }, // amber-400
      { name: 'Discount', value: ebayDiscountAmount, color: '#ef4444', category: 'Discount' }, // red-500
    ].filter(item => item.value > 0);
  }, [effectiveAmazonCost, ebayFeeAmount, promotedFeeAmount, actualFixedFee, netProfit, ebayDiscountAmount]);

  const handleReset = () => {
    setState({ ...DEFAULT_STATE, darkMode: state.darkMode });
  };

  const handleCopy = () => {
    const receiptText = `
=== ${state.zapTheme ? 'ZAP PROFIT SUMMARY' : state.tripleMarsTheme ? 'TRIPLEMARS DROPSHIP' : 'EBAY DROPSHIP CO.'} ===
DATE: ${new Date().toLocaleDateString()}
TIME: ${new Date().toLocaleTimeString()}
--------------------------
AMAZON COST:    $${effectiveAmazonCost.toFixed(2)}
EBAY SALE PRICE: $${state.ebaySalePrice.toFixed(2)}
${state.ebayDiscountPercent > 0 ? `DISCOUNT:       -$${ebayDiscountAmount.toFixed(2)} (${state.ebayDiscountPercent}%)` : ''}
${state.ebayDiscountPercent > 0 ? `FINAL PRICE:    $${effectiveSalePrice.toFixed(2)}` : ''}
--------------------------
EBAY FVF:       -$${ebayFeeAmount.toFixed(2)} (${state.ebayFeePercent}%)
${state.isPromoted ? `PROMOTED FEE:  -$${promotedFeeAmount.toFixed(2)} (${state.promotedPercent}%)` : ''}
FIXED FEE:      -$${actualFixedFee.toFixed(2)}
--------------------------
TOTAL FEES:     -$${totalFees.toFixed(2)}
NET PROFIT:      $${netProfit.toFixed(2)}
MARGIN:          ${profitMargin.toFixed(2)}%
ROI:             ${effectiveAmazonCost > 0 ? ((netProfit / effectiveAmazonCost) * 100).toFixed(2) : '0.00'}%
--------------------------
*** THANK YOU ***
`.trim();

    navigator.clipboard.writeText(receiptText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const updateState = (key: keyof CalculatorState, value: any) => {
    setState(prev => ({ ...prev, [key]: value }));
  };

  const commonCardProps = {
    zapTheme: state.zapTheme,
    tripleMarsTheme: state.tripleMarsTheme,
    receiptTheme: state.receiptTheme
  };

  return (
    <div className={`min-h-screen transition-all duration-500 font-sans relative ${state.zapTheme ? 'bg-neutral-50 text-zap-black' : state.tripleMarsTheme ? 'bg-slate-50 text-slate-900' : 'bg-neutral-50 dark:bg-neutral-950 text-neutral-900 dark:text-neutral-100'}`}>
      {/* Zap Grid Background */}
      {state.zapTheme && (
        <div className="absolute inset-0 pointer-events-none opacity-[0.02]" style={{ backgroundImage: 'radial-gradient(#ff4f00 0.5px, transparent 0.5px)', backgroundSize: '24px 24px' }} />
      )}
      
      {/* Header */}
      <header className={`border-b sticky top-0 z-20 transition-all duration-500 ${state.zapTheme ? 'bg-white border-neutral-200 shadow-sm' : state.tripleMarsTheme ? 'bg-white/70 backdrop-blur-xl border-slate-200' : 'border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900'}`}>
        <div className="max-w-5xl mx-auto px-4 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className={`p-2.5 rounded-xl transition-all duration-500 ${state.zapTheme ? 'bg-zap-orange' : state.tripleMarsTheme ? 'bg-gradient-to-br from-[#00d2ff] to-[#0080ff]' : 'bg-emerald-500'}`}>
              <Calculator className="w-6 h-6 text-white" />
            </div>
            <h1 className={`font-black text-2xl tracking-tighter transition-colors duration-500 ${state.zapTheme ? 'text-zap-black' : state.tripleMarsTheme ? 'text-slate-900' : ''}`}>DropCalc</h1>
          </div>
          <div className="flex items-center gap-2">
            <button 
              onClick={() => setState(prev => ({ ...prev, zapTheme: !prev.zapTheme, tripleMarsTheme: false, receiptTheme: false }))}
              className={`p-2 rounded-full transition-all duration-300 ${state.zapTheme ? 'bg-zap-orange text-white shadow-[0_0_15px_rgba(255,79,0,0.4)]' : 'hover:bg-neutral-100 dark:hover:bg-neutral-800'}`}
              title="Zap Theme"
            >
              <Zap className={`w-5 h-5 ${state.zapTheme ? 'animate-pulse' : ''}`} />
            </button>
            <button 
              onClick={() => setState(prev => ({ ...prev, tripleMarsTheme: !prev.tripleMarsTheme, receiptTheme: false, zapTheme: false }))}
              className={`p-2 rounded-full transition-all duration-300 ${state.tripleMarsTheme ? 'bg-[#00d2ff] text-white shadow-[0_0_15px_rgba(0,210,255,0.4)]' : 'hover:bg-neutral-100 dark:hover:bg-neutral-800'}`}
              title="TripleMars Theme"
            >
              <Zap className={`w-5 h-5 ${state.tripleMarsTheme ? 'animate-pulse' : ''}`} />
            </button>
            <button 
              onClick={() => setState(prev => ({ ...prev, receiptTheme: !prev.receiptTheme, tripleMarsTheme: false }))}
              className={`p-2 rounded-full transition-colors ${state.receiptTheme ? 'bg-blue-100 text-blue-600 dark:bg-blue-900/40 dark:text-blue-400' : 'hover:bg-neutral-100 dark:hover:bg-neutral-800'}`}
              title="Receipt Theme"
            >
              <Receipt className="w-5 h-5" />
            </button>
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
          <ReceiptCard 
            title="Amazon Sales Tax" 
            icon={Package} 
            iconColor="text-emerald-500"
            expanded={state.isAmazonExpanded}
            onToggle={() => updateState('isAmazonExpanded', !state.isAmazonExpanded)}
            {...commonCardProps}
          >
            <AnimatePresence>
              {state.isAmazonExpanded && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="overflow-hidden"
                >
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-neutral-500 dark:text-neutral-400">Product Price (USD)</label>
                      <div className="relative">
                        <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
                        <input 
                          type="number" 
                          value={state.amazonPrice || ''} 
                          onChange={(e) => {
                            const val = parseFloat(e.target.value) || 0;
                            setState(prev => ({ ...prev, amazonPrice: val, isManualSalePrice: false }));
                          }}
                          placeholder="0.00"
                          className={`w-full pl-9 pr-4 py-2.5 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-transparent outline-none transition-all ${state.zapTheme ? 'focus:ring-2 focus:ring-zap-orange border-neutral-200 bg-white' : state.tripleMarsTheme ? 'focus:ring-2 focus:ring-[#00d2ff] border-slate-200 bg-white/50' : 'focus:ring-2 focus:ring-emerald-500'}`}
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-neutral-500 dark:text-neutral-400">State Filter</label>
                      <select 
                        value={state.selectedState}
                        onChange={(e) => {
                          const stateName = e.target.value;
                          const selected = US_STATES.find(s => s.name === stateName);
                          if (selected) {
                            setState(prev => ({ 
                              ...prev, 
                              selectedState: stateName, 
                              amazonTaxPercent: selected.rate 
                            }));
                          } else {
                            updateState('selectedState', '');
                          }
                        }}
                        className={`w-full px-4 py-2.5 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-transparent outline-none transition-all appearance-none ${state.zapTheme ? 'focus:ring-2 focus:ring-zap-orange border-neutral-200 bg-white' : state.tripleMarsTheme ? 'focus:ring-2 focus:ring-[#00d2ff] border-slate-200 bg-white/50' : 'focus:ring-2 focus:ring-emerald-500'}`}
                      >
                        <option value="">Select State</option>
                        {US_STATES.map(s => (
                          <option key={s.name} value={s.name}>{s.name} ({s.rate}%)</option>
                        ))}
                      </select>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-neutral-500 dark:text-neutral-400">Sales Tax (%)</label>
                      <div className="relative">
                        <Percent className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
                        <input 
                          type="number" 
                          value={state.amazonTaxPercent || ''} 
                          onChange={(e) => {
                            const val = parseFloat(e.target.value) || 0;
                            setState(prev => ({ ...prev, amazonTaxPercent: val, selectedState: '' }));
                          }}
                          placeholder="8.25"
                          className={`w-full pl-9 pr-4 py-2.5 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-transparent outline-none transition-all ${state.zapTheme ? 'focus:ring-2 focus:ring-zap-orange border-neutral-200 bg-white' : state.tripleMarsTheme ? 'focus:ring-2 focus:ring-[#00d2ff] border-slate-200 bg-white/50' : 'focus:ring-2 focus:ring-emerald-500'}`}
                        />
                      </div>
                    </div>
                  </div>

                  <div className={`mt-8 grid grid-cols-2 sm:grid-cols-4 gap-4 p-6 rounded-2xl ${state.receiptTheme ? 'border border-dashed border-neutral-300 dark:border-neutral-700' : state.zapTheme ? 'bg-neutral-50 border border-neutral-100' : state.tripleMarsTheme ? 'bg-[#00d2ff]/5 border border-[#00d2ff]/20' : 'bg-neutral-50 dark:bg-neutral-800/50'}`}>
                    <div>
                      <p className={`text-[10px] uppercase tracking-wider font-bold mb-1 ${state.zapTheme ? 'text-neutral-400' : state.tripleMarsTheme ? 'text-[#00d2ff]/60' : 'text-neutral-400'}`}>Price</p>
                      <p className={`font-mono text-sm ${state.zapTheme ? 'text-zap-black font-bold' : state.tripleMarsTheme ? 'text-slate-900' : ''}`}>${state.amazonPrice.toFixed(2)}</p>
                    </div>
                    <div>
                      <p className={`text-[10px] uppercase tracking-wider font-bold mb-1 ${state.zapTheme ? 'text-neutral-400' : state.tripleMarsTheme ? 'text-[#00d2ff]/60' : 'text-neutral-400'}`}>Tax %</p>
                      <p className={`font-mono text-sm ${state.zapTheme ? 'text-zap-black font-bold' : state.tripleMarsTheme ? 'text-slate-900' : ''}`}>{state.amazonTaxPercent}%</p>
                    </div>
                    <div>
                      <p className={`text-[10px] uppercase tracking-wider font-bold mb-1 ${state.zapTheme ? 'text-neutral-400' : state.tripleMarsTheme ? 'text-[#00d2ff]/60' : 'text-neutral-400'}`}>Tax Amt</p>
                      <p className={`font-mono text-sm ${state.zapTheme ? 'text-zap-orange font-bold' : state.tripleMarsTheme ? 'text-[#00d2ff] font-bold' : 'text-amber-600 dark:text-amber-400'}`}>${amazonTaxAmount.toFixed(2)}</p>
                    </div>
                    <div>
                      <p className={`text-[10px] uppercase tracking-wider font-bold mb-1 ${state.zapTheme ? 'text-neutral-400' : state.tripleMarsTheme ? 'text-[#00d2ff]/60' : 'text-neutral-400'}`}>Total Cost</p>
                      <p className={`font-mono text-sm font-bold ${state.zapTheme ? 'text-zap-orange' : state.tripleMarsTheme ? 'text-[#00d2ff]' : 'text-emerald-600 dark:text-emerald-400'}`}>${amazonTotalCost.toFixed(2)}</p>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </ReceiptCard>

          {/* Section 2: eBay */}
          <ReceiptCard 
            title="eBay Profit" 
            icon={TrendingUp} 
            iconColor="text-blue-500"
            {...commonCardProps}
          >
            <div className="flex items-center justify-end gap-3 mb-4">
              <div className="flex items-center gap-2 bg-neutral-100 dark:bg-neutral-800 p-1 rounded-lg">
                <span className="text-xs font-medium px-2 text-neutral-500">Auto Breakeven</span>
                <button 
                  onClick={() => {
                    const newVal = !state.isAutoBreakeven;
                    setState(prev => ({ ...prev, isAutoBreakeven: newVal, isManualSalePrice: newVal ? false : prev.isManualSalePrice }));
                  }}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none ${state.isAutoBreakeven ? 'bg-blue-500' : 'bg-neutral-300 dark:bg-neutral-600'}`}
                >
                  <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${state.isAutoBreakeven ? 'translate-x-6' : 'translate-x-1'}`} />
                </button>
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
                      className={`w-full pl-9 pr-4 py-2.5 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-transparent outline-none transition-all ${state.autoImportAmazon ? 'opacity-60 cursor-not-allowed bg-neutral-50 dark:bg-neutral-800/50' : ''} ${state.zapTheme ? 'focus:ring-2 focus:ring-zap-orange border-neutral-200 bg-white' : state.tripleMarsTheme ? 'focus:ring-2 focus:ring-[#00d2ff] border-slate-200 bg-white/50' : 'focus:ring-2 focus:ring-blue-500'}`}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="text-sm font-medium text-neutral-500 dark:text-neutral-400">eBay Sale Price</label>
                    {!state.receiptTheme && state.isAutoBreakeven && <span className="text-[10px] font-bold text-blue-500 uppercase tracking-wider">Breakeven Auto-Calc</span>}
                  </div>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
                    <input 
                      type="number" 
                      value={state.ebaySalePrice || ''} 
                      onChange={(e) => {
                        const val = parseFloat(e.target.value) || 0;
                        setState(prev => ({ ...prev, ebaySalePrice: val, isManualSalePrice: true, isAutoBreakeven: false }));
                      }}
                      placeholder="0.00"
                      className={`w-full pl-9 pr-4 py-2.5 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-transparent outline-none transition-all ${state.zapTheme ? 'focus:ring-2 focus:ring-zap-orange border-neutral-200 bg-white' : state.tripleMarsTheme ? 'focus:ring-2 focus:ring-[#00d2ff] border-slate-200 bg-white/50' : 'focus:ring-2 focus:ring-blue-500'}`}
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="text-sm font-medium text-neutral-500 dark:text-neutral-400">Final Value Fee (%)</label>
                    {!state.receiptTheme && (
                      <div className="group relative">
                        <Info className="w-3.5 h-3.5 text-neutral-400 cursor-help" />
                        <div className="absolute bottom-full right-0 mb-2 w-48 p-2 bg-neutral-900 text-white text-[10px] rounded shadow-lg opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity z-20">
                          Standard eBay fee is approximately 13.25%
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="relative">
                    <Percent className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
                    <input 
                      type="number" 
                      value={state.ebayFeePercent || ''} 
                      onChange={(e) => updateState('ebayFeePercent', parseFloat(e.target.value) || 0)}
                      placeholder="13.25"
                      className={`w-full pl-9 pr-4 py-2.5 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-transparent outline-none transition-all ${state.zapTheme ? 'focus:ring-2 focus:ring-zap-orange border-neutral-200 bg-white' : state.tripleMarsTheme ? 'focus:ring-2 focus:ring-[#00d2ff] border-slate-200 bg-white/50' : 'focus:ring-2 focus:ring-blue-500'}`}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-neutral-500 dark:text-neutral-400">eBay Store</label>
                  <select 
                    value={state.hasEbayStore ? 'yes' : 'no'}
                    onChange={(e) => {
                      const hasStore = e.target.value === 'yes';
                      const storeType: EbayStoreType = hasStore ? 'basic' : 'none';
                      setState(prev => ({ 
                        ...prev, 
                        hasEbayStore: hasStore, 
                        ebayStoreType: storeType,
                        ebayFeePercent: EBAY_STORES[storeType].defaultFeePercent
                      }));
                    }}
                    className={`w-full px-4 py-2.5 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-transparent outline-none transition-all appearance-none ${state.zapTheme ? 'focus:ring-2 focus:ring-zap-orange border-neutral-200 bg-white' : state.tripleMarsTheme ? 'focus:ring-2 focus:ring-[#00d2ff] border-slate-200 bg-white/50' : 'focus:ring-2 focus:ring-blue-500'}`}
                  >
                    <option value="no">No</option>
                    <option value="yes">Yes</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-neutral-500 dark:text-neutral-400">Promoted Listing</label>
                  <select 
                    value={state.isPromoted ? 'yes' : 'no'}
                    onChange={(e) => updateState('isPromoted', e.target.value === 'yes')}
                    className={`w-full px-4 py-2.5 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-transparent outline-none transition-all appearance-none ${state.zapTheme ? 'focus:ring-2 focus:ring-zap-orange border-neutral-200 bg-white' : state.tripleMarsTheme ? 'focus:ring-2 focus:ring-[#00d2ff] border-slate-200 bg-white/50' : 'focus:ring-2 focus:ring-blue-500'}`}
                  >
                    <option value="no">No</option>
                    <option value="yes">Yes</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-neutral-500 dark:text-neutral-400">Discount (%)</label>
                  <div className="relative">
                    <Percent className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
                    <input 
                      type="number" 
                      value={state.ebayDiscountPercent || ''} 
                      onChange={(e) => updateState('ebayDiscountPercent', parseFloat(e.target.value) || 0)}
                      placeholder="0"
                      className={`w-full pl-9 pr-4 py-2.5 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-transparent outline-none transition-all ${state.zapTheme ? 'focus:ring-2 focus:ring-zap-orange border-neutral-200 bg-white' : state.tripleMarsTheme ? 'focus:ring-2 focus:ring-[#00d2ff] border-slate-200 bg-white/50' : 'focus:ring-2 focus:ring-blue-500'}`}
                    />
                  </div>
                </div>
              </div>

              <AnimatePresence mode="wait">
                {state.hasEbayStore && (
                  <motion.div 
                    key="store-sub"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden"
                      >
                        <label className="text-sm font-medium text-neutral-500 dark:text-neutral-400">Store Subscription</label>
                        <select 
                          value={state.ebayStoreType}
                          onChange={(e) => {
                            const type = e.target.value as EbayStoreType;
                            setState(prev => ({ 
                              ...prev, 
                              ebayStoreType: type,
                              ebayFeePercent: EBAY_STORES[type].defaultFeePercent
                            }));
                          }}
                          className={`w-full px-4 py-2.5 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-transparent outline-none transition-all appearance-none ${state.tripleMarsTheme ? 'focus:ring-2 focus:ring-[#00d2ff] border-slate-200 bg-white/50' : 'focus:ring-2 focus:ring-blue-500'}`}
                        >
                          {Object.entries(EBAY_STORES).filter(([key]) => key !== 'none').map(([key, config]) => (
                            <option key={key} value={key}>{config.name}</option>
                          ))}
                        </select>
                      </motion.div>
                    )}
                  </AnimatePresence>

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
                              className={`w-full pl-9 pr-4 py-2.5 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-transparent outline-none transition-all ${state.zapTheme ? 'focus:ring-2 focus:ring-zap-orange border-neutral-200 bg-white' : state.tripleMarsTheme ? 'focus:ring-2 focus:ring-[#00d2ff] border-slate-200 bg-white/50' : 'focus:ring-2 focus:ring-blue-500'}`}
                            />
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <div className={`flex items-center gap-3 p-4 rounded-xl border ${state.receiptTheme ? 'border-dashed border-neutral-300 dark:border-neutral-700' : state.zapTheme ? 'bg-neutral-50 border-neutral-100' : state.tripleMarsTheme ? 'bg-[#00d2ff]/5 border-[#00d2ff]/30' : 'bg-blue-50 dark:bg-blue-900/20 border-blue-100 dark:border-blue-800'}`}>
                    <div className={`p-1.5 rounded-lg ${state.zapTheme ? 'bg-zap-orange' : state.tripleMarsTheme ? 'bg-gradient-to-br from-[#00d2ff] to-[#0080ff]' : 'bg-blue-500'}`}>
                      <DollarSign className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <p className={`text-xs font-bold uppercase tracking-wider ${state.zapTheme ? 'text-zap-orange' : state.tripleMarsTheme ? 'text-[#00d2ff]' : 'text-blue-600 dark:text-blue-400'}`}>Fixed Fee</p>
                      <p className={`text-sm font-mono font-semibold ${state.zapTheme ? 'text-zap-black' : state.tripleMarsTheme ? 'text-slate-900' : ''}`}>${currentFixedFee.toFixed(2)} per sale</p>
                    </div>
                  </div>
                </div>
          </ReceiptCard>

          {/* Promotion Forecast Section */}
          <ReceiptCard 
            title="Promotion Forecast" 
            icon={TrendingUp} 
            iconColor="text-indigo-500"
            expanded={state.isForecastExpanded}
            onToggle={() => updateState('isForecastExpanded', !state.isForecastExpanded)}
            {...commonCardProps}
          >
            <AnimatePresence>
              {state.isForecastExpanded && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="overflow-hidden"
                >
                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="border-b border-neutral-100 dark:border-neutral-800">
                          <th className="py-3 px-2 text-[10px] uppercase tracking-wider font-bold text-neutral-400">Rate</th>
                          <th className="py-3 px-2 text-[10px] uppercase tracking-wider font-bold text-neutral-400">Total Fees</th>
                          <th className="py-3 px-2 text-[10px] uppercase tracking-wider font-bold text-neutral-400">Net Profit</th>
                          <th className="py-3 px-2 text-[10px] uppercase tracking-wider font-bold text-neutral-400">Margin</th>
                          <th className="py-3 px-2 text-[10px] uppercase tracking-wider font-bold text-neutral-400">Action</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-neutral-50 dark:divide-neutral-800/50">
                        {promotionForecast.map((item) => (
                          <tr key={item.percent} className="hover:bg-neutral-50 dark:hover:bg-neutral-800/50 transition-colors group">
                            <td className="py-3 px-2 font-mono text-sm font-bold text-indigo-600 dark:text-indigo-400">{item.percent}%</td>
                            <td className="py-3 px-2 font-mono text-sm text-neutral-500">${item.totalFees.toFixed(2)}</td>
                            <td className={`py-3 px-2 font-mono text-sm font-bold ${item.netProfit >= 0 ? 'text-emerald-500' : 'text-rose-500'}`}>
                              ${item.netProfit.toFixed(2)}
                            </td>
                            <td className={`py-3 px-2 font-mono text-sm ${item.netProfit >= 0 ? 'text-emerald-600/60' : 'text-rose-600/60'}`}>
                              {item.profitMargin.toFixed(2)}%
                            </td>
                            <td className="py-3 px-2">
                              <button 
                                onClick={() => setState(prev => ({ ...prev, isPromoted: true, promotedPercent: item.percent, isForecastExpanded: false }))}
                                className={`opacity-0 group-hover:opacity-100 text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded transition-all ${state.zapTheme ? 'bg-zap-orange text-white hover:bg-zap-orange/90' : 'bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-100 dark:hover:bg-indigo-900/50'}`}
                              >
                                Apply
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </ReceiptCard>

          {/* Target Margin Forecast Section */}
          <ReceiptCard 
            title="Target Margin Forecast" 
            icon={TrendingUp} 
            iconColor="text-emerald-500"
            expanded={state.isMarginForecastExpanded}
            onToggle={() => updateState('isMarginForecastExpanded', !state.isMarginForecastExpanded)}
            {...commonCardProps}
          >
            <AnimatePresence>
              {state.isMarginForecastExpanded && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="overflow-hidden"
                >
                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="border-b border-neutral-100 dark:border-neutral-800">
                          <th className="py-3 px-2 text-[10px] uppercase tracking-wider font-bold text-neutral-400">Target Margin</th>
                          <th className="py-3 px-2 text-[10px] uppercase tracking-wider font-bold text-neutral-400">Required Sale Price</th>
                          <th className="py-3 px-2 text-[10px] uppercase tracking-wider font-bold text-neutral-400">Net Profit</th>
                          <th className="py-3 px-2 text-[10px] uppercase tracking-wider font-bold text-neutral-400">Action</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-neutral-50 dark:divide-neutral-800/50">
                        {marginForecast.map((item) => (
                          <tr key={item.margin} className="hover:bg-neutral-50 dark:hover:bg-neutral-800/50 transition-colors group">
                            <td className="py-3 px-2 font-mono text-sm font-bold text-emerald-600 dark:text-emerald-400">{item.margin}%</td>
                            <td className="py-3 px-2 font-mono text-sm font-bold text-neutral-900 dark:text-neutral-100">
                              {item.salePrice > 0 ? `$${item.salePrice.toFixed(2)}` : 'N/A'}
                            </td>
                            <td className="py-3 px-2 font-mono text-sm text-emerald-500">
                              {item.profit > 0 ? `$${item.profit.toFixed(2)}` : 'N/A'}
                            </td>
                            <td className="py-3 px-2">
                              <button 
                                disabled={item.salePrice <= 0}
                                onClick={() => setState(prev => ({ ...prev, ebaySalePrice: parseFloat(item.salePrice.toFixed(2)), isManualSalePrice: true, isAutoBreakeven: false, isMarginForecastExpanded: false }))}
                                className={`opacity-0 group-hover:opacity-100 text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded transition-all disabled:opacity-0 ${state.zapTheme ? 'bg-zap-orange text-white hover:bg-zap-orange/90' : 'bg-emerald-50 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-100 dark:hover:bg-emerald-900/50'}`}
                              >
                                Apply Price
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </ReceiptCard>

          {/* Graphical Breakdown */}
          <ReceiptCard 
            title="Visual Breakdown" 
            icon={PieIcon} 
            iconColor="text-purple-500"
            expanded={state.isVisualExpanded}
            onToggle={() => updateState('isVisualExpanded', !state.isVisualExpanded)}
            {...commonCardProps}
          >
            <AnimatePresence>
              {state.isVisualExpanded && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="overflow-hidden"
                >
                  <div className="h-[240px] w-full relative">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={chartData}
                          cx="50%"
                          cy="50%"
                          innerRadius={60}
                          outerRadius={85}
                          paddingAngle={2}
                          dataKey="value"
                          animationBegin={0}
                          animationDuration={1200}
                          animationEasing="ease-out"
                          stroke="none"
                        >
                          {chartData.map((entry, index) => (
                            <Cell 
                              key={`cell-${index}`} 
                              fill={entry.color} 
                              className="hover:opacity-80 transition-opacity cursor-pointer"
                            />
                          ))}
                        </Pie>
                        <Tooltip 
                          content={({ active, payload }) => {
                            if (active && payload && payload.length) {
                              const data = payload[0].payload;
                              const percentage = ((data.value / (state.ebaySalePrice || 1)) * 100).toFixed(1);
                              return (
                                <div className={`p-4 rounded-2xl shadow-2xl border font-mono text-[10px] ${state.zapTheme ? 'bg-white border-neutral-100 text-zap-black' : 'bg-white dark:bg-neutral-900 border-neutral-100 dark:border-neutral-800'}`}>
                                  <p className="font-black uppercase tracking-tighter mb-2" style={{ color: state.zapTheme && data.name.includes('Profit') ? '#ff4f00' : data.color }}>{data.name}</p>
                                  <div className="flex justify-between gap-6 opacity-60 mb-1">
                                    <span>AMOUNT:</span>
                                    <span className="font-bold">${data.value.toFixed(2)}</span>
                                  </div>
                                  <div className="flex justify-between gap-6 opacity-60">
                                    <span>PERCENT:</span>
                                    <span className="font-bold">{percentage}%</span>
                                  </div>
                                </div>
                              );
                            }
                            return null;
                          }}
                        />
                      </PieChart>
                    </ResponsiveContainer>
                    
                    {/* Center Label: Profit focus */}
                    <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                      <span className={`text-[9px] font-bold uppercase tracking-widest ${state.zapTheme ? 'text-zap-orange' : state.tripleMarsTheme ? 'text-[#00d2ff]' : 'opacity-30'}`}>Profit</span>
                      <span className={`text-sm font-black tracking-tighter ${state.zapTheme ? 'text-zap-black' : state.tripleMarsTheme ? 'text-[#00d2ff]' : netProfit >= 0 ? 'text-blue-600 dark:text-blue-400' : 'text-rose-600 dark:text-rose-400'}`}>
                        ${netProfit.toFixed(2)}
                      </span>
                    </div>
                  </div>
                  
                  <div className="mt-4 grid grid-cols-1 gap-1">
                    {chartData.map((item, idx) => (
                      <div key={idx} className={`flex items-center justify-between text-[10px] font-mono py-1 border-b border-dashed last:border-0 transition-opacity ${state.zapTheme ? 'border-neutral-100 text-neutral-500 hover:text-zap-black' : state.tripleMarsTheme ? 'border-[#00d2ff]/20 text-slate-600 hover:text-slate-900' : 'border-neutral-200 dark:border-neutral-800 opacity-70 hover:opacity-100'}`}>
                        <div className="flex items-center gap-2">
                          <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: state.zapTheme && item.name.includes('Profit') ? '#ff4f00' : item.color }} />
                          <span className="uppercase">{item.name}</span>
                        </div>
                        <div className="flex gap-3">
                          <span>${item.value.toFixed(2)}</span>
                          <span className={`w-10 text-right ${state.tripleMarsTheme ? 'text-[#00d2ff]' : 'opacity-40'}`}>{((item.value / (state.ebaySalePrice || 1)) * 100).toFixed(1)}%</span>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  {netProfit < 0 && (
                    <div className="mt-4 p-3 bg-rose-50 dark:bg-rose-900/20 border border-rose-100 dark:border-rose-800 rounded-xl text-center">
                      <p className="text-[10px] font-bold text-rose-600 dark:text-rose-400 uppercase tracking-widest">
                        Loss of ${Math.abs(netProfit).toFixed(2)} not shown
                      </p>
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </ReceiptCard>
        </div>

        {/* Right Column: Summary */}
        <div className="lg:col-span-5">
          <div className="sticky top-24 space-y-6">
            <div className="relative">
              {/* Receipt Container */}
              <section className={`rounded-2xl shadow-2xl overflow-hidden transition-all duration-500 ${state.zapTheme ? 'bg-white border border-neutral-200 text-zap-black' : state.tripleMarsTheme ? 'bg-white border-t-8 border-[#00d2ff] text-slate-800 font-mono' : 'bg-[#fdfdfd] dark:bg-neutral-900 border-t-8 border-blue-500 dark:border-blue-600 text-neutral-800 dark:text-neutral-200 font-mono'}`}>
                {/* Receipt Header */}
                <div className={`p-8 pb-6 text-center space-y-2 ${state.zapTheme ? 'bg-neutral-50/50 border-b border-neutral-100' : ''}`}>
                  <h2 className={`font-black text-xl tracking-tighter uppercase ${state.zapTheme ? 'text-zap-black' : state.tripleMarsTheme ? 'text-[#00d2ff]' : ''}`}>{state.zapTheme ? 'Profit Summary' : state.tripleMarsTheme ? 'TripleMars Dropship' : 'eBay Dropship Co.'}</h2>
                  <p className={`text-[10px] uppercase tracking-widest ${state.zapTheme ? 'text-neutral-400' : state.tripleMarsTheme ? 'text-slate-400' : 'opacity-60'}`}>Calculated for: {state.amazonUrl ? 'AMZN Import' : 'Manual Entry'}</p>
                  {!state.zapTheme && (
                    <>
                      <div className={`pt-4 flex justify-between text-[10px] ${state.tripleMarsTheme ? 'text-slate-300' : 'opacity-60'}`}>
                        <span>REG: 01</span>
                        <span>TRX: #8824</span>
                      </div>
                      <div className={`flex justify-between text-[10px] ${state.tripleMarsTheme ? 'text-slate-300' : 'opacity-60'}`}>
                        <span>DATE: ${new Date().toLocaleDateString()}</span>
                        <span>TIME: ${new Date().toLocaleTimeString()}</span>
                      </div>
                    </>
                  )}
                </div>

                {/* Receipt Content */}
                <div className={`px-8 py-8 space-y-6 ${state.zapTheme ? 'font-sans' : 'font-mono'}`}>
                  <div className={`border-b border-dashed pb-6 space-y-3 ${state.zapTheme ? 'border-neutral-100' : state.tripleMarsTheme ? 'border-slate-100' : 'border-neutral-300 dark:border-neutral-700'}`}>
                    <div className="flex justify-between items-center text-sm">
                      <span className={state.zapTheme ? 'text-neutral-500 font-medium' : state.tripleMarsTheme ? 'text-slate-500' : ''}>AMAZON COST</span>
                      <span className={state.zapTheme ? 'text-zap-black font-bold' : state.tripleMarsTheme ? 'text-slate-900 font-bold' : ''}>${effectiveAmazonCost.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                      <span className={state.zapTheme ? 'text-neutral-500 font-medium' : state.tripleMarsTheme ? 'text-slate-500' : ''}>EBAY SALE PRICE</span>
                      <span className={state.zapTheme ? 'text-zap-black font-bold' : state.tripleMarsTheme ? 'text-slate-900 font-bold' : ''}>${state.ebaySalePrice.toFixed(2)}</span>
                    </div>
                    {state.ebayDiscountPercent > 0 && (
                      <div className="flex justify-between items-center text-sm">
                        <span className={state.zapTheme ? 'text-rose-500 font-medium' : 'text-rose-500'}>DISCOUNT ({state.ebayDiscountPercent}%)</span>
                        <span className={state.zapTheme ? 'text-rose-500 font-bold' : 'text-rose-500'}>-${ebayDiscountAmount.toFixed(2)}</span>
                      </div>
                    )}
                    {state.ebayDiscountPercent > 0 && (
                      <div className="flex justify-between items-center text-sm pt-1 border-t border-dashed border-neutral-100">
                        <span className={state.zapTheme ? 'text-zap-black font-bold' : 'font-bold'}>FINAL PRICE</span>
                        <span className={state.zapTheme ? 'text-zap-black font-bold' : 'font-bold'}>${effectiveSalePrice.toFixed(2)}</span>
                      </div>
                    )}
                  </div>
                  
                  <div className={`space-y-3 text-sm border-b border-dashed pb-6 ${state.zapTheme ? 'border-neutral-100' : state.tripleMarsTheme ? 'border-slate-100' : 'border-neutral-300 dark:border-neutral-700'}`}>
                    <div className="flex justify-between items-center">
                      <span className={state.zapTheme ? 'text-neutral-500' : state.tripleMarsTheme ? 'text-slate-500' : ''}>EBAY FVF ({state.ebayFeePercent}%)</span>
                      <span className={state.zapTheme ? 'text-zap-black font-medium' : state.tripleMarsTheme ? 'text-slate-900' : ''}>-${ebayFeeAmount.toFixed(2)}</span>
                    </div>
                    {state.isPromoted && (
                      <div className="flex justify-between items-center">
                        <span className={state.zapTheme ? 'text-neutral-500' : state.tripleMarsTheme ? 'text-slate-500' : ''}>PROMOTED ({state.promotedPercent}%)</span>
                        <span className={state.zapTheme ? 'text-zap-black font-medium' : state.tripleMarsTheme ? 'text-slate-900' : ''}>-${promotedFeeAmount.toFixed(2)}</span>
                      </div>
                    )}
                    <div className="flex justify-between items-center">
                      <span className={state.zapTheme ? 'text-neutral-500' : state.tripleMarsTheme ? 'text-slate-500' : ''}>FIXED FEE</span>
                      <span className={state.zapTheme ? 'text-zap-black font-medium' : state.tripleMarsTheme ? 'text-slate-900' : ''}>-${actualFixedFee.toFixed(2)}</span>
                    </div>
                  </div>

                  <div className={`border-b border-dashed pb-6 ${state.zapTheme ? 'border-neutral-100' : state.tripleMarsTheme ? 'border-slate-100' : 'border-neutral-300 dark:border-neutral-700'}`}>
                    <div className="flex justify-between items-center font-bold text-base">
                      <span className={state.zapTheme ? 'text-neutral-500' : state.tripleMarsTheme ? 'text-slate-500' : ''}>TOTAL FEES</span>
                      <span className={state.zapTheme ? 'text-zap-orange' : state.tripleMarsTheme ? 'text-[#00d2ff]' : 'text-amber-600 dark:text-amber-400'}>-${totalFees.toFixed(2)}</span>
                    </div>
                  </div>

                  <div className="pt-4 pb-4">
                    <div className="flex flex-col items-center gap-3">
                      <span className={`text-[10px] font-bold uppercase tracking-[0.3em] ${state.zapTheme ? 'text-zap-orange' : state.tripleMarsTheme ? 'text-slate-400' : 'opacity-40'}`}>Net Profit</span>
                      <div className={`text-6xl font-black tracking-tighter ${state.zapTheme ? 'text-zap-black' : state.tripleMarsTheme ? 'text-[#00d2ff]' : netProfit >= 0 ? 'text-emerald-600' : 'text-rose-600'}`}>
                        ${netProfit.toFixed(2)}
                      </div>
                      <div className={`text-xs font-bold px-4 py-1.5 rounded-full ${state.zapTheme ? 'bg-zap-orange text-white' : state.tripleMarsTheme ? 'bg-[#00d2ff]/10 text-[#00d2ff]' : netProfit >= 0 ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400' : 'bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-400'}`}>
                        {netProfit >= 0 ? 'PROFITABLE' : 'LOSS DETECTED'}
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-6 text-center pb-4">
                    <div className="space-y-1">
                      <p className={`text-[8px] font-bold uppercase tracking-widest ${state.zapTheme ? 'text-neutral-400' : state.tripleMarsTheme ? 'text-slate-400' : 'opacity-40'}`}>Margin</p>
                      <p className={`text-lg font-black ${state.zapTheme ? 'text-zap-orange' : state.tripleMarsTheme ? 'text-[#00d2ff]' : netProfit >= 0 ? 'text-emerald-600' : 'text-rose-600'}`}>{profitMargin.toFixed(2)}%</p>
                    </div>
                    <div className="space-y-1">
                      <p className={`text-[8px] font-bold uppercase tracking-widest ${state.zapTheme ? 'text-neutral-400' : state.tripleMarsTheme ? 'text-slate-400' : 'opacity-40'}`}>ROI</p>
                      <p className={`text-lg font-black ${state.zapTheme ? 'text-zap-black' : state.tripleMarsTheme ? 'text-slate-900' : ''}`}>{effectiveAmazonCost > 0 ? ((netProfit / effectiveAmazonCost) * 100).toFixed(2) : '0.00'}%</p>
                    </div>
                  </div>

                  {state.zapTheme ? (
                    <div className="pt-6">
                      <button 
                        onClick={handleCopy}
                        className="w-full py-4 bg-zap-black text-white rounded-xl font-bold text-sm tracking-tight hover:bg-zap-black/90 transition-all shadow-lg flex items-center justify-center gap-2"
                      >
                        {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                        {copied ? 'COPIED TO CLIPS' : 'COPY SUMMARY'}
                      </button>
                    </div>
                  ) : (
                    <div className={`border-t border-dashed pt-6 text-center space-y-4 ${state.tripleMarsTheme ? 'border-slate-100' : 'border-neutral-300 dark:border-neutral-700'}`}>
                      <div className="flex flex-col items-center gap-1">
                        <div className={`w-full h-12 flex gap-[1px] overflow-hidden ${state.tripleMarsTheme ? 'bg-[#00d2ff]/5' : 'bg-neutral-900 dark:bg-neutral-100 opacity-10'}`}>
                          {Array.from({ length: 40 }).map((_, i) => (
                            <div key={i} className={`h-full ${state.tripleMarsTheme ? 'bg-[#00d2ff]' : 'bg-black dark:bg-white'}`} style={{ width: `${Math.random() * 4 + 1}px` }} />
                          ))}
                        </div>
                        <span className={`text-[8px] tracking-[0.5em] ${state.tripleMarsTheme ? 'text-slate-300' : 'opacity-40'}`}>01234567890123</span>
                      </div>
                      <p className={`text-[10px] font-bold uppercase ${state.tripleMarsTheme ? 'text-slate-400' : 'opacity-60'}`}>*** Thank you for using {state.tripleMarsTheme ? 'TripleMars' : 'eBay Calc'} ***</p>
                    </div>
                  )}
                </div>

                {/* Jagged Bottom Edge */}
                {!state.zapTheme && (
                  <div className={`h-4 w-full bg-repeat-x ${state.tripleMarsTheme ? 'bg-white' : 'bg-[#fdfdfd]'}`} style={{ 
                    backgroundImage: `radial-gradient(circle at 50% 100%, transparent 5px, ${state.tripleMarsTheme ? '#ffffff' : '#fdfdfd'} 5px)`,
                    backgroundSize: '10px 10px',
                    backgroundPosition: '0 -5px'
                  }} />
                )}
              </section>

              {/* Copy Button Overlay */}
              {!state.zapTheme && (
                <div className="absolute top-4 right-4 z-10">
                  <button 
                    onClick={handleCopy}
                    className={`flex items-center gap-2 px-3 py-1.5 text-[10px] font-bold rounded-full transition-all shadow-sm ${copied ? 'bg-emerald-500 text-white' : 'bg-white/80 dark:bg-neutral-800/80 backdrop-blur-sm hover:bg-white dark:hover:bg-neutral-800 border border-neutral-200 dark:border-neutral-700'}`}
                  >
                    {copied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                    {copied ? 'COPIED' : 'COPY RECEIPT'}
                  </button>
                </div>
              )}
            </div>

            <div className={`p-6 rounded-2xl border flex gap-4 transition-all duration-500 ${state.zapTheme ? 'bg-white border-neutral-200 shadow-sm' : 'bg-amber-50 dark:bg-amber-900/20 border-amber-100 dark:border-amber-800'}`}>
              <Info className={`w-6 h-6 shrink-0 ${state.zapTheme ? 'text-zap-orange' : 'text-amber-500'}`} />
              <p className={`text-sm leading-relaxed ${state.zapTheme ? 'text-neutral-600' : 'text-amber-800 dark:text-amber-200'}`}>
                <strong>Pro Tip:</strong> Always account for potential returns and shipping adjustments. This calculator assumes standard eBay categories.
              </p>
            </div>
          </div>
        </div>
      </main>

      <footer className={`max-w-5xl mx-auto px-4 py-16 text-center transition-all duration-500 ${state.zapTheme ? 'border-t border-neutral-100' : ''}`}>
        <p className={`text-sm ${state.zapTheme ? 'text-neutral-400 font-medium' : 'text-neutral-400'}`}>
          Professional Dropshipping Calculator &copy; {new Date().getFullYear()}
        </p>
      </footer>
    </div>
  );
}
