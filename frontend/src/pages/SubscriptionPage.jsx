// pages/SubscriptionPage.js
import SubscriptionCard from '../components/SubscriptionCard';
import { useNavigate } from 'react-router-dom';

export default function SubscriptionPage() {
  const navigate = useNavigate();

  const handleSelectPlan = (plan) => {
    const role = localStorage.getItem('role');

    if (plan === 'free') {
      if (role === 'investor') {
        navigate('/investordashboard');
      } else {
        navigate('/entrepreneurdashboard');
      }
    } else {
      navigate(``);
    }
  };

  const plans = [
    {
      title: 'Free',
      price: 0,
      features: [
        'Access to basic features',
        'Limited startup listings',
        'Basic support',
      ],
      isPopular: false,
    },
    {
      title: 'Premium',
      price: 29,
      features: [
        'Access to all features',
        'Unlimited startup listings',
        'Priority support',
        'Advanced analytics',
      ],
      isPopular: true,
    },
    {
      title: 'Epic',
      price: 99,
      features: [
        'All Premium features',
        'Dedicated account manager',
        'Custom reports',
        'Early access to new features',
      ],
      isPopular: false,
    },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <main className="flex-grow px-6 md:px-12 py-8 pt-24 max-w-7xl mx-auto w-full">
        <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">Choose Your Plan</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {plans.map((plan, index) => (
            <SubscriptionCard
              key={index}
              title={plan.title}
              price={plan.price}
              features={plan.features}
              isPopular={plan.isPopular}
              onClick={() => handleSelectPlan(plan.title.toLowerCase())}
            />
          ))}
        </div>
      </main>
    </div>
  );
}