export function Card({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-xl bg-white shadow-sm border border-gray-200 p-4">
      {children}
    </div>
  );
}
