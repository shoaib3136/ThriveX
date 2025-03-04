export default function SubscriptionCard({ title, price, features, isPopular, onClick }) {
    return (
      <div className={`flex flex-col p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow border ${isPopular ? 'border-zinc-500' : 'border-gray-100'}`}>
        <h3 className="text-xl font-bold text-gray-900 mb-4">{title}</h3>
        <p className="text-3xl font-bold text-gray-900 mb-4">
          {price === 0 ? 'Free' : `$${price}/month`}
        </p>
        <ul className="flex-1 space-y-2 mb-6">
          {features.map((feature, index) => (
            <li key={index} className="flex items-center text-gray-700">
              <svg className="w-4 h-4 mr-2 text-zinc-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              {feature}
            </li>
          ))}
        </ul>
        <button
          onClick={onClick}
          className={`px-4 py-2 rounded-lg font-medium transition-all ${
            isPopular
              ? 'bg-zinc-950 text-white hover:bg-zinc-700'
              : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
          }`}
        >
          {isPopular ? 'Get Started' : 'Choose Plan'}
        </button>
      </div>
    );
  }