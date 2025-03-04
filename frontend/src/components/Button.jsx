export default function Button({ children, onClick, className = '' }) {
    return (
      <button
        onClick={onClick}
        className={`bg-black text-white px-4 py-2 rounded-md hover:bg-gray-800 transition-colors ${className}`}
      >
        {children}
      </button>
    );
  }