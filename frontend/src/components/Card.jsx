export default function Card({ children }) {
  return (
    <div className="bg-white shadow-sm rounded-lg p-6 border border-gray-200 hover:border-gray-300 transition-colors">
      {children}
    </div>
  );
}