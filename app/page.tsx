// app/page.tsx
"use client";

import { motion, AnimatePresence } from "framer-motion";
import { FiSun, FiMoon } from "react-icons/fi";

// ------------------------------------------------------------------
// Dummy data (unchanged – tweak at will)
// ------------------------------------------------------------------
const kpi = { arr: 42.7, burn: 1.3, cash: 18.4, margin: 78 };
const trend = { arr: [36, 38, 40, 42.7], burn: [1.7, 1.5, 1.4, 1.3] };
const topCustomers = [
  { name: "OpenAl Labs", arr: 12_000_000 },
  { name: "AnthroBotics", arr: 7_500_000 },
  { name: "Cogito Cloud", arr: 4_200_000 },
  { name: "NeuralNest", arr: 3_800_000 },
  { name: "VectorShift", arr: 1_900_000 },
];
const cohorts = [
  { m: 0, churn: 0 },
  { m: 1, churn: 6 },
  { m: 2, churn: 12 },
  { m: 3, churn: 15 },
  { m: 4, churn: 18 },
  { m: 5, churn: 18 },
  { m: 6, churn: 18 },
];

// ------------------------------------------------------------------
// Hook for animated counters
// ------------------------------------------------------------------
function useAnimated(target: number, decimals = 1) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    const t = setInterval(() => {
      setCount((prev) => {
        const next = prev + (target - prev) / 5;
        if (Math.abs(next - target) < 0.01) {
          clearInterval(t);
          return target;
        }
        return next;
      });
    }, 30);
    return () => clearInterval(t);
  }, [target]);
  return count.toFixed(decimals);

  // ------------------------------------------------------------------
  // Sparkline
  // ------------------------------------------------------------------
  const Sparkline = ({ data, color }: { data: number[]; color: string }) => {
    const max = Math.max(...data);
    const min = Math.min(...data);
    const range = max - min || 1;
    const points = data
      .map(
        (v, i) =>
          `${(i / (data.length - 1)) * 100},${100 - ((v - min) / range) * 100}`
      )
      .join(" ");
    return (
      <svg viewBox="0 0 100 100" className="h-16 w-full">
        <polyline
          fill="none"
          stroke={color}
          strokeWidth="2"
          points={points}
          strokeDasharray="0 2"
          className="drop-shadow-[0_0_2px_currentColor]"
        />
      </svg>
    );
  };

  // ------------------------------------------------------------------
          }`}
        >
          {/* Header + dark toggle */}
          <motion.header
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex justify-between items-center mb-8"
          >
            <h1 className="text-3xl md:text-4xl font-bold">
              <span className="bg-gradient-to-r from-fuchsia-400 to-cyan-400 bg-clip-text text-transparent">
                SpinAl Finance
              </span>
            </h1>
            <button
              onClick={() => setDark(!dark)}
              className={`p-2 rounded-full transition ${
                dark ? "hover:bg-slate-800" : "hover:bg-gray-200"
              }`}
            >
              {dark ? (
                <FiSun className="text-amber-300 text-xl" />
              ) : (
                <FiMoon className="text-slate-700 text-xl" />
              )}
            </button>
          </motion.header>

          {/* KPI Cards */}
          <motion.section
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10"
          >
            <KpiCard
              title="ARR"
              value={`$${animatedArr}M`}
              change="+12%"
              color="fuchsia"
              dark={dark}
            />
            <KpiCard
              title="Burn"
              value={`$${animatedBurn}M`}
              change="-15%"
              color="cyan"
              dark={dark}
            />
            <KpiCard
              title="Cash Runway"
              value={`${animatedCash} mo`}
              change="+2 mo"
              color="amber"
              dark={dark}
            />
            <KpiCard
              title="Gross Margin"
              value={`${animatedMargin}%`}
              change="+3pp"
              color="lime"
              dark={dark}
            />
          </motion.section>

          {/* Mini Trends with glow toggle */}
          <motion.section
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="mb-10"
          >
            <div className="flex items-center gap-4 mb-4">
              <h2 className="text-xl font-semibold">Mini Trends</h2>
              <div className="flex rounded-full bg-slate-800 p-1">
                {(["M", "Q", "Y"] as const).map((p) => (
                  <button
                    key={p}
                    onClick={() => setPeriod(p)}
                    className={`px-4 py-1 rounded-full text-xs transition ${
                      period === p
                        ? "bg-fuchsia-600 shadow-[0_0_8px_#d946ef]"
                        : ""
                    }`}
                  >
                    {p}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <MiniChartCard
                metric="ARR"
                value={`$${kpi.arr}M`}
                data={trend.arr}
                color="#d946ef"
                dark={dark}
              />
              <MiniChartCard
                metric="Net Burn"
                value={`$${kpi.burn}M`}
                data={trend.burn}
                color="#06b6d4"
                dark={dark}
              />
            </div>
          </motion.section>

          {/* Bottom row */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-8"
          >
            <div
              className={`rounded-2xl p-6 ${
                dark ? "bg-slate-800/50" : "bg-white shadow-lg"
              }`}
            >
              <h3 className="text-lg font-semibold mb-3 text-lime-400">
                Top Customers (ARR)
              </h3>
              <ul className="space-y-3">
                {topCustomers.map((c, i) => (
                  <motion.li
                    key={c.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                    className="flex justify-between items-center"
                  >
                    <span>{c.name}</span>
                    <span className="font-mono text-lime-300">
                      ${(c.arr / 1_000_000).toFixed(1)}M
                    </span>
                  </motion.li>
                ))}
              </ul>
            </div>

            <div
              className={`rounded-2xl p-6 ${
                dark ? "bg-slate-800/50" : "bg-white shadow-lg"
              }`}
            >
              <h3 className="text-lg font-semibold mb-3 text-amber-400">
                Cohort Retention
              </h3>
              <div className="flex items-end gap-2 h-32">
                {cohorts.map((c, i) => (
                  <motion.div
                    key={c.m}
                    initial={{ height: 0 }}
                    animate={{ height: `${(100 - c.churn) * 2}px` }}
                    transition={{ duration: 0.5, delay: i * 0.1 }}
                    className="flex-1 rounded-t bg-gradient-to-t from-amber-600 to-amber-400 hover:from-amber-500 hover:to-amber-300 transition-colors"
                  />
                ))}
              </div>
              <p className="text-xs text-slate-500 mt-2">
                % retained at month-end
              </p>
            </div>
          </motion.section>

          <footer
            className={`text-center text-sm mt-12 ${
              dark ? "text-slate-600" : "text-gray-400"
            }`}
          >
            Built with ❤️ by SpinAl Finance Team
          </footer>
        </main>
      </div>
    );
  }

  // ------------------------------------------------------------------
  // Card helpers
  // ------------------------------------------------------------------
  function KpiCard({ title, value, change, color, dark }: any) {
    const colorMap: Record<string, string> = {
      fuchsia: "border-fuchsia-500 shadow-fuchsia-500/50",
      cyan: "border-cyan-500 shadow-cyan-500/50",
      amber: "border-amber-500 shadow-amber-500/50",
      lime: "border-lime-500 shadow-lime-500/50",
    };
    return (
      <motion.div
        whileHover={{ scale: 1.03 }}
        className={`rounded-2xl p-5 border-t-4 ${
          colorMap[color]
        } shadow-lg hover:shadow-[0_0_20px_currentColor] transition-all ${
          dark ? "bg-slate-800/50" : "bg-white"
        }`}
      >
        <p className="text-sm opacity-70">{title}</p>
        <p className="text-3xl font-bold mt-1">{value}</p>
        <p
          className={`text-sm mt-1 ${
            change.startsWith("+") ? "text-lime-400" : "text-red-400"
          }`}
        >
          {change}
        </p>
      </motion.div>
    );
  }

  function MiniChartCard({ metric, value, data, color, dark }: any) {
    return (
      <div
        className={`rounded-2xl p-5 ${
          dark ? "bg-slate-800/50" : "bg-white shadow-lg"
        }`}
      >
        <div className="flex justify-between items-start">
          <div>
            <p className="text-sm opacity-70">{metric}</p>
            <p className="text-2xl font-bold">{value}</p>
          </div>
          <span className="text-xs bg-slate-700 px-2 py-1 rounded-full">
            Last 4 periods
          </span>
        </div>
        <Sparkline data={data} color={color} />
      </div>
    );
  }

"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiSun, FiMoon } from "react-icons/fi";
import { format } from "date-fns";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";
import { formatCurrency } from "@/lib/utils";
import SummaryCard from "@/app/components/SummaryCard";
import ChartCard from "@/app/components/ChartCard";
import DateRangePicker from "@/app/components/DateRangePicker";
import { mockMonthly } from "@/data/mockData";
import {
  CalendarIcon,
  CurrencyDollarIcon,
  ChartBarIcon,
  UsersIcon,
  FireIcon,
} from "@heroicons/react/24/outline";

const kpi = { arr: 42.7, burn: 1.3, cash: 18.4, margin: 78 };
const trend = { arr: [36, 38, 40, 42.7], burn: [1.7, 1.5, 1.4, 1.3] };
const topCustomers = [
  { name: "OpenAl Labs", arr: 12_000_000 },
  { name: "AnthroBotics", arr: 7_500_000 },
  { name: "Cogito Cloud", arr: 4_200_000 },
  { name: "NeuralNest", arr: 3_800_000 },
  { name: "VectorShift", arr: 1_900_000 },
];
const cohorts = [
  { m: 0, churn: 0 },
  { m: 1, churn: 6 },
  { m: 2, churn: 12 },
  { m: 3, churn: 15 },
  { m: 4, churn: 18 },
  { m: 5, churn: 18 },
  { m: 6, churn: 18 },
];

type DateRange = { start: Date; end: Date };

function useAnimated(target: number, decimals = 1) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    const t = setInterval(() => {
      setCount((prev: number) => {
        const next = prev + (target - prev) / 5;
        if (Math.abs(next - target) < 0.01) {
          clearInterval(t);
          return target;
        }
        return next;
      });
    }, 30);
    return () => clearInterval(t);
  }, [target]);
  return count.toFixed(decimals);
}

const Sparkline = ({ data, color }: { data: number[]; color: string }) => {
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min || 1;
  const points = data
    .map(
      (v: number, i: number) =>
        `${(i / (data.length - 1)) * 100},${100 - ((v - min) / range) * 100}`
    )
    .join(" ");
  return (
    <svg viewBox="0 0 100 100" className="h-16 w-full">
      <polyline
        fill="none"
        stroke={color}
        strokeWidth="2"
        points={points}
        strokeDasharray="0 2"
        className="drop-shadow-[0_0_2px_currentColor]"
      />
    </svg>
  );
};

function Head({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

function KpiCard({ title, value, change, color, dark }: any) {
  const colorMap: Record<string, string> = {
    fuchsia: "border-fuchsia-500 shadow-fuchsia-500/50",
    cyan: "border-cyan-500 shadow-cyan-500/50",
    amber: "border-amber-500 shadow-amber-500/50",
    lime: "border-lime-500 shadow-lime-500/50",
  };
  return (
    <motion.div
      whileHover={{ scale: 1.03 }}
      className={`rounded-2xl p-5 border-t-4 ${
        colorMap[color]
      } shadow-lg hover:shadow-[0_0_20px_currentColor] transition-all ${
        dark ? "bg-slate-800/50" : "bg-white"
      }`}
    >
      <p className="text-sm opacity-70">{title}</p>
      <p className="text-3xl font-bold mt-1">{value}</p>
      <p
        className={`text-sm mt-1 ${
          change.startsWith("+") ? "text-lime-400" : "text-red-400"
        }`}
      >
        {change}
      </p>
    </motion.div>
  );
}

function MiniChartCard({ metric, value, data, color, dark }: any) {
  return (
    <div
      className={`rounded-2xl p-5 ${
        dark ? "bg-slate-800/50" : "bg-white shadow-lg"
      }`}
    >
      <div className="flex justify-between items-start">
        <div>
          <p className="text-sm opacity-70">{metric}</p>
          <p className="text-2xl font-bold">{value}</p>
        </div>
        <span className="text-xs bg-slate-700 px-2 py-1 rounded-full">
          Last 4 periods
        </span>
      </div>
      <Sparkline data={data} color={color} />
    </div>
  );
}

export default function Dashboard() {
  const [period, setPeriod] = useState<"M" | "Q" | "Y">("M");
  const [dark, setDark] = useState(true);

  // For the summary section
  const [range, setRange] = useState<DateRange>({
    start: new Date(new Date().setMonth(new Date().getMonth() - 12)),
    end: new Date(),
  });
  const [filtered, setFiltered] = useState<typeof mockMonthly>([]);

  useEffect(() => {
    const results = mockMonthly.filter(
      (d: any) => d.month >= range.start && d.month <= range.end
    );
    setFiltered(results);
  }, [range]);

  const totalRevenue = filtered.reduce((sum: number, r: any) => sum + r.revenue, 0);
  const totalExpenses = filtered.reduce((sum: number, r: any) => sum + r.expenses, 0);
  const netIncome = totalRevenue - totalExpenses;
  const cashBalance = 5_200_000; // static for demo
  const monthlyBurn = totalExpenses / (filtered.length || 1);
  const runwayMonths = cashBalance / (monthlyBurn || 1);
  const totalCustomers = filtered.reduce((sum: number, r: any) => sum + r.newCustomers, 0);

  const areaData = filtered.map((d: any) => ({
    month: format(d.month, "MMM yy"),
    Revenue: d.revenue,
    Expenses: d.expenses,
  }));

  const expenseBreakdown = [
    { name: "R&D", value: 0.35 },
    { name: "Marketing", value: 0.25 },
    { name: "G&A", value: 0.2 },
    { name: "Operations", value: 0.15 },
    { name: "Other", value: 0.05 },
  ];

  const COLORS = ["#1E3A8A", "#10B981", "#F59E0B", "#EF4444", "#3B82F6"];

  const animatedArr = useAnimated(kpi.arr);
  const animatedBurn = useAnimated(kpi.burn);
  const animatedCash = useAnimated(kpi.cash / kpi.burn, 1);
  const animatedMargin = useAnimated(kpi.margin, 0);

  return (
    <div
      className={`min-h-screen transition-colors duration-700 ${
        dark ? "bg-slate-950" : "bg-gray-100"
      }`}
    >
      <Head>
        <title>SpinAl Finance – CFO Dashboard</title>
      </Head>

      <main
        className={`font-sans p-4 md:p-8 ${
          dark ? "text-white" : "text-slate-900"
        }`}
      >
        {/* Header + dark toggle */}
        <motion.header
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex justify-between items-center mb-8"
        >
          <h1 className="text-3xl md:text-4xl font-bold">
            <span className="bg-gradient-to-r from-fuchsia-400 to-cyan-400 bg-clip-text text-transparent">
              SpinAl Finance
            </span>
          </h1>
          <button
            onClick={() => setDark(!dark)}
            className={`p-2 rounded-full transition ${
              dark ? "hover:bg-slate-800" : "hover:bg-gray-200"
            }`}
          >
            {dark ? (
              <FiSun className="text-amber-300 text-xl" />
            ) : (
              <FiMoon className="text-slate-700 text-xl" />
            )}
          </button>
        </motion.header>

        {/* KPI Cards */}
        <motion.section
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10"
        >
          <KpiCard
            title="ARR"
            value={`$${animatedArr}M`}
            change="+12%"
            color="fuchsia"
            dark={dark}
          />
          <KpiCard
            title="Burn"
            value={`$${animatedBurn}M`}
            change="-15%"
            color="cyan"
            dark={dark}
          />
          <KpiCard
            title="Cash Runway"
            value={`${animatedCash} mo`}
            change="+2 mo"
            color="amber"
            dark={dark}
          />
          <KpiCard
            title="Gross Margin"
            value={`${animatedMargin}%`}
            change="+3pp"
            color="lime"
            dark={dark}
          />
        </motion.section>

        {/* Mini Trends with glow toggle */}
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mb-10"
        >
          <div className="flex items-center gap-4 mb-4">
            <h2 className="text-xl font-semibold">Mini Trends</h2>
            <div className="flex rounded-full bg-slate-800 p-1">
              {(["M", "Q", "Y"] as const).map((p) => (
                <button
                  key={p}
                  onClick={() => setPeriod(p)}
                  className={`px-4 py-1 rounded-full text-xs transition ${
                    period === p
                      ? "bg-fuchsia-600 shadow-[0_0_8px_#d946ef]"
                      : ""
                  }`}
                >
                  {p}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <MiniChartCard
              metric="ARR"
              value={`$${kpi.arr}M`}
              data={trend.arr}
              color="#d946ef"
              dark={dark}
            />
            <MiniChartCard
              metric="Net Burn"
              value={`$${kpi.burn}M`}
              data={trend.burn}
              color="#06b6d4"
              dark={dark}
            />
          </div>
        </motion.section>

        {/* Bottom row */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-8"
        >
          <div
            className={`rounded-2xl p-6 ${
              dark ? "bg-slate-800/50" : "bg-white shadow-lg"
            }`}
          >
            <h3 className="text-lg font-semibold mb-3 text-lime-400">
              Top Customers (ARR)
            </h3>
            <ul className="space-y-3">
              {topCustomers.map((c, i) => (
                <motion.li
                  key={c.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="flex justify-between items-center"
                >
                  <span>{c.name}</span>
                  <span className="font-mono text-lime-300">
                    ${(c.arr / 1_000_000).toFixed(1)}M
                  </span>
                </motion.li>
              ))}
            </ul>
          </div>

          <div
            className={`rounded-2xl p-6 ${
              dark ? "bg-slate-800/50" : "bg-white shadow-lg"
            }`}
          >
            <h3 className="text-lg font-semibold mb-3 text-amber-400">
              Cohort Retention
            </h3>
            <div className="flex items-end gap-2 h-32">
              {cohorts.map((c, i) => (
                <motion.div
                  key={c.m}
                  initial={{ height: 0 }}
                  animate={{ height: `${(100 - c.churn) * 2}px` }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="flex-1 rounded-t bg-gradient-to-t from-amber-600 to-amber-400 hover:from-amber-500 hover:to-amber-300 transition-colors"
                />
              ))}
            </div>
            <p className="text-xs text-slate-500 mt-2">
              % retained at month-end
            </p>
          </div>
        </motion.section>

        {/* Summary Section */}
        <section className="space-y-8 mt-10">
          {/* Header + Date picker */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <h1 className="text-3xl font-bold text-gray-800">
              Executive Finance Overview
            </h1>
            <DateRangePicker onChange={setRange} />
          </div>

          {/* Summary cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            <SummaryCard
              title="Revenue"
              value={formatCurrency(totalRevenue)}
              icon={<CurrencyDollarIcon className="h-6 w-6" />}
              bgColor="bg-primary"
            />
            <SummaryCard
              title="Expenses"
              value={formatCurrency(totalExpenses)}
              icon={<ChartBarIcon className="h-6 w-6" />}
              bgColor="bg-danger"
            />
            <SummaryCard
              title="Net Income"
              value={formatCurrency(netIncome)}
              icon={<FireIcon className="h-6 w-6" />}
              bgColor="bg-accent"
            />
            <SummaryCard
              title="Cash Runway"
              value={`${runwayMonths.toFixed(1)} mo`}
              icon={<CalendarIcon className="h-6 w-6" />}
              bgColor="bg-warning"
            />
            <SummaryCard
              title="Active Customers"
              value={totalCustomers.toLocaleString()}
              icon={<UsersIcon className="h-6 w-6" />}
              bgColor="bg-info"
            />
            <SummaryCard
              title="Monthly Burn"
              value={formatCurrency(monthlyBurn)}
              icon={<FireIcon className="h-6 w-6" />}
              bgColor="bg-danger"
            />
          </div>

          {/* Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Revenue vs Expenses Area */}
            <ChartCard title="Revenue vs. Expenses">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={areaData}
                  margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                >
                  <defs>
                    <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#1E3A8A" stopOpacity={0.8} />
                      <stop offset="95%" stopColor="#1E3A8A" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="colorExp" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#EF4444" stopOpacity={0.8} />
                      <stop offset="95%" stopColor="#EF4444" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="month" stroke="#6B7280" />
                  <YAxis
                    tickFormatter={(v: number) => `$${(v / 1_000).toFixed(0)}k`}
                    stroke="#6B7280"
                  />
                  <Tooltip
                    formatter={(value: number) => formatCurrency(value)}
                    contentStyle={{ backgroundColor: "#fff", borderRadius: 4 }}
                  />
                  <Area
                    type="monotone"
                    dataKey="Revenue"
                    stroke="#1E3A8A"
                    fillOpacity={1}
                    fill="url(#colorRev)"
                  />
                  <Area
                    type="monotone"
                    dataKey="Expenses"
                    stroke="#EF4444"
                    fillOpacity={1}
                    fill="url(#colorExp)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </ChartCard>

            {/* Expense Breakdown Pie */}
            <ChartCard title="Expense Breakdown">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={expenseBreakdown}
                    dataKey="value"
                    nameKey="name"
                    innerRadius={55}
                    outerRadius={80}
                    paddingAngle={3}
                    label={({ name, percent }: { name: string; percent: number }) =>
                      `${name} ${(percent * 100).toFixed(0)}%`
                    }
                  >
                    {expenseBreakdown.map((_, i) => (
                      <Cell key={`cell-${i}`} fill={COLORS[i % COLORS.length]} />
                    ))}
                  </Pie>
                  <Legend verticalAlign="bottom" height={36} />
                  <Tooltip
                    formatter={(value: number) => `${(value * 100).toFixed(0)}%`}
                    contentStyle={{ backgroundColor: "#fff", borderRadius: 4 }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </ChartCard>
          </div>
        </section>
      </main>
    </div>
  );
}
    { name: "R&D", value: 0.35 },
    { name: "Marketing", value: 0.25 },
    { name: "G&A", value: 0.2 },
    { name: "Operations", value: 0.15 },
    { name: "Other", value: 0.05 },
  ];

  const COLORS = ["#1E3A8A", "#10B981", "#F59E0B", "#EF4444", "#3B82F6"];

  // --------------------------------------------------------------------
  return (
    <section className="space-y-8">
      {/* ----- Header + Date picker ----------------------------------- */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-3xl font-bold text-gray-800">
          Executive Finance Overview
        </h1>
        <DateRangePicker onChange={setRange} />
      </div>

      {/* ----- Summary cards ------------------------------------------- */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <SummaryCard
          title="Revenue"
          value={formatCurrency(totalRevenue)}
          icon={<CurrencyDollarIcon className="h-6 w-6" />}
          bgColor="bg-primary"
        />
        <SummaryCard
          title="Expenses"
          value={formatCurrency(totalExpenses)}
          icon={<ChartBarIcon className="h-6 w-6" />}
          bgColor="bg-danger"
        />
        <SummaryCard
          title="Net Income"
          value={formatCurrency(netIncome)}
          icon={<FireIcon className="h-6 w-6" />}
          bgColor="bg-accent"
        />
        <SummaryCard
          title="Cash Runway"
          value={`${runwayMonths.toFixed(1)} mo`}
          icon={<CalendarIcon className="h-6 w-6" />}
          bgColor="bg-warning"
        />
        <SummaryCard
          title="Active Customers"
          value={totalCustomers.toLocaleString()}
          icon={<UsersIcon className="h-6 w-6" />}
          bgColor="bg-info"
        />
        <SummaryCard
          title="Monthly Burn"
          value={formatCurrency(monthlyBurn)}
          icon={<FireIcon className="h-6 w-6" />}
          bgColor="bg-danger"
        />
      </div>

      {/* ----- Charts -------------------------------------------------- */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue vs Expenses Area */}
        <ChartCard title="Revenue vs. Expenses">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={areaData}
              margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
            >
              <defs>
                <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#1E3A8A" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#1E3A8A" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="colorExp" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#EF4444" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#EF4444" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis dataKey="month" stroke="#6B7280" />
              <YAxis
                tickFormatter={(v: number) => `$${(v / 1_000).toFixed(0)}k`}
                stroke="#6B7280"
              />
              <Tooltip
                formatter={(value: number) => formatCurrency(value)}
                contentStyle={{ backgroundColor: "#fff", borderRadius: 4 }}
              />
              <Area
                type="monotone"
                dataKey="Revenue"
                stroke="#1E3A8A"
                fillOpacity={1}
                fill="url(#colorRev)"
              />
              <Area
                type="monotone"
                dataKey="Expenses"
                stroke="#EF4444"
                fillOpacity={1}
                fill="url(#colorExp)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </ChartCard>

        {/* Expense Breakdown Pie */}
        <ChartCard title="Expense Breakdown">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={expenseBreakdown}
                dataKey="value"
                nameKey="name"
                innerRadius={55}
                outerRadius={80}
                paddingAngle={3}
                label={({ name, percent }: { name: string; percent: number }) =>
                  `${name} ${(percent * 100).toFixed(0)}%`
                }
              >
                {expenseBreakdown.map((_, i) => (
                  <Cell key={`cell-${i}`} fill={COLORS[i % COLORS.length]} />
                ))}
              </Pie>
              <Legend verticalAlign="bottom" height={36} />
              <Tooltip
                formatter={(value: number) => `${(value * 100).toFixed(0)}%`}
                contentStyle={{ backgroundColor: "#fff", borderRadius: 4 }}
              />
            </PieChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>
    </section>
  );
}
