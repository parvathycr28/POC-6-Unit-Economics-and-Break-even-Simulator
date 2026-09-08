export type Product = {
  product_id: string;
  product_name: string;
  segment: string;
  price: number;
  variable_cost: number;
};
export type FredSeriesId =
  | "DGS10"
  | "DFF"
  | "CPIAUCSL"
  | "UNRATE"
  | "GDPC1";

export type FredObservation = {
  date: string;
  value: number;
};

export type FredSeries = {
  id: FredSeriesId;
  title: string;
  unit: string;
  latest: number | null;
  previous: number | null;
  observations: FredObservation[];
};

export type FredDashboardData = {
  treasury10y: FredSeries;
  fedFunds: FredSeries;
  cpi: FredSeries;
  unemployment: FredSeries;
  realGdp: FredSeries;
  fetchedAt: string;
};
export type Customer = {
  customer_id: string;
  segment: string;
  acquisition_channel: string;
  cac: number;
  monthly_revenue: number;
  retention_months: number;
};

export type Cost = {
  cost_id: string;
  cost_category: string;
  cost_name: string;
  monthly_amount: number;
  type: "fixed" | "variable";
};

export type Scenario = {
  product: string;

  price: number;

  variableCost: number;

  fixedCost: number;

  units: number;

  cac: number;

  monthlyRevenue: number;

  grossMarginPercent: number;

  retentionMonths: number;
};

export type SimulationResult = {
  revenue: number;

  variableCostTotal: number;

  contribution: number;

  contributionPerUnit: number;

  contributionMarginPercent: number;

  fixedCost: number;

  operatingProfit: number;

  breakEvenUnits: number | null;

  breakEvenRevenue: number | null;

  safetyUnits: number | null;

  safetyMarginPercent: number | null;

  ltv: number;

  cac: number;

  ltvCacRatio: number | null;
};

export type IntelligenceType =
  | "waterfall"
  | "breakEven"
  | "cacLtv"
  | "sensitivity"
  | null;