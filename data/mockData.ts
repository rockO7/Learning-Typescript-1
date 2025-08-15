import { subMonths, addMonths, format } from "date-fns";

type Monthly = {
  month: Date;
  revenue: number;
  expenses: number;
  newCustomers: number;
};

export const generateMockMonthlyData = (monthsBack: number = 12): Monthly[] => {
  const now = new Date();
  const data: Monthly[] = [];

  for (let i = monthsBack - 1; i >= 0; i--) {
    const month = subMonths(now, i);
    // Random but plausible numbers for a Series‑D startup
    const revenue = 850_000 + Math.round(Math.random() * 150_000);
    const expenses = 600_000 + Math.round(Math.random() * 100_000);
    const newCustomers = 45 + Math.round(Math.random() * 20);
    data.push({ month, revenue, expenses, newCustomers });
  }
  return data;
};

export const mockMonthly = generateMockMonthlyData(18);
