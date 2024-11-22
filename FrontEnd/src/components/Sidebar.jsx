import React from 'react';
import { 
  BarChart2, 
  ShoppingCart, 
  FileText, 
  Users, 
  Star, 
  Coffee, 
  Calendar, 
  MessageCircle, 
  Wallet 
} from 'lucide-react';

const Sidebar = () => {
  return (
    <div className="w-64 bg-white min-h-screen shadow-lg">
      <div className="p-4">
        <div className="flex items-center space-x-2">
          <img 
            src="\src\uploads\logo-FoodKo.png" 
            alt="FoodKo Logo" 
            className="h-20 object-contain"
          />
        </div>
      </div>

      <nav className="mt-8">
        {[
          { icon: BarChart2, text: 'Dashboard', active: true },
          { icon: ShoppingCart, text: 'Order List' },
          { icon: FileText, text: 'Order Detail' },
          { icon: Users, text: 'Customer' },
          { icon: BarChart2, text: 'Analytics' },
          { icon: Star, text: 'Reviews' },
          { icon: Coffee, text: 'Foods' },
          { icon: FileText, text: 'Food Detail' },
          { icon: Users, text: 'Customer Detail' },
          { icon: Calendar, text: 'Calendar' },
          { icon: MessageCircle, text: 'Chat' },
          { icon: Wallet, text: 'Wallet' },
        ].map((item, index) => (
          <div
            key={index}
            className={`flex items-center px-4 py-2 cursor-pointer transition-colors ${
              item.active 
                ? 'bg-green-50 text-green-600' 
                : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            <item.icon className="mr-3" size={20} />
            <span className="text-sm font-medium">{item.text}</span>
          </div>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;
