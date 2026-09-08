import {
  Cost,
  Customer,
  Product,
  Scenario
} from "./types";

export const products: Product[] = [
  {
    product_id: "P001",
    product_name: "Core Platform",
    segment: "SMB",
    price: 2500,
    variable_cost: 850
  },

  {
    product_id: "P002",
    product_name: "Pro Platform",
    segment: "Mid-Market",
    price: 7500,
    variable_cost: 2400
  },

  {
    product_id: "P003",
    product_name: "Enterprise Platform",
    segment: "Enterprise",
    price: 25000,
    variable_cost: 7200
  }
];

export const customers: Customer[] = [
  {
    customer_id: "C001",
    segment: "SMB",
    acquisition_channel: "Paid Search",
    cac: 780,
    monthly_revenue: 2500,
    retention_months: 18
  },

  {
    customer_id: "C002",
    segment: "SMB",
    acquisition_channel: "Partner",
    cac: 520,
    monthly_revenue: 2500,
    retention_months: 27
  },

  {
    customer_id: "C003",
    segment: "Mid-Market",
    acquisition_channel: "Outbound",
    cac: 1850,
    monthly_revenue: 7500,
    retention_months: 31
  },

  {
    customer_id: "C004",
    segment: "Enterprise",
    acquisition_channel: "Enterprise Partner",
    cac: 6200,
    monthly_revenue: 25000,
    retention_months: 42
  }
];

export const costs: Cost[] = [
  {
    cost_id: "FC001",
    cost_category: "People",
    cost_name: "Engineering",
    monthly_amount: 2200000,
    type: "fixed"
  },

  {
    cost_id: "FC002",
    cost_category: "People",
    cost_name: "Sales",
    monthly_amount: 900000,
    type: "fixed"
  },

  {
    cost_id: "FC003",
    cost_category: "Infrastructure",
    cost_name: "Cloud",
    monthly_amount: 480000,
    type: "variable"
  },

  {
    cost_id: "FC004",
    cost_category: "Operations",
    cost_name: "Support",
    monthly_amount: 1100000,
    type: "fixed"
  }
];

export const defaultScenario: Scenario = {
  product: "Core Platform",

  price: 2500,

  variableCost: 850,

  fixedCost: 4200000,

  units: 18200,

  cac: 780,

  monthlyRevenue: 2500,

  grossMarginPercent: 0.66,

  retentionMonths: 24
};