import React from 'react';
import { Link } from 'react-router-dom';
import {
  Gem,
  ScrollText,
  Star,
  Layers,
  ChevronRight,
  BarChart2,
  QrCode,
  Users,
  User,
  ImageDown
} from "lucide-react";

const DashboardCard = ({ title, description, icon: Icon, to }) => (
  <Link
    to={to}
    className="group flex flex-col h-full bg-gradient-to-br from-gray-50 to-white rounded-xl border border-gray-200 overflow-hidden transition-all duration-300 hover:shadow-lg"
  >
    <div className="p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-white shadow-sm border border-gray-100">
          <Icon className="w-6 h-6 text-gray-700 group-hover:text-orange-600 transition-colors" />
        </div>
        <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-orange-500 transform group-hover:translate-x-1 transition-all" />
      </div>
      <div>
        <h3 className="font-semibold text-gray-900 mb-2 text-lg">{title}</h3>
        <p className="text-gray-600 text-sm leading-relaxed">{description}</p>
      </div>
    </div>
    <div className="h-1 w-full bg-gradient-to-r from-orange-400 to-orange-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
  </Link>
);


const Dashboard = () => {
  const permissions = JSON.parse(localStorage.getItem('permissions')) || [];
  
  const dashboardItems = [
    {
      title: "Add Deity",
      description: "Create and configure new deity profiles",
      icon: Gem,
      to: "/admin/manage/deity"
    },
    {
      title: "Manage Master Sevas",
      description: "Configure and update primary seva offerings",
      icon: ScrollText,
      to: "/admin/manage/master-sevas"
    },
    {
      title: "Manage Special Sevas",
      description: "Handle special occasions and festival sevas",
      icon: Star,
      to: "/admin/manage/special-sevas"
    },
    {
      title: "Manage Sub-Sevas",
      description: "Configure subsidiary and related seva services",
      icon: Layers,
      to: "/admin/manage/sub-sevas"
    },
    {
      title: "Statistics",
      description: "View and analyze comprehensive statistics",
      icon: BarChart2,
      to: "/admin/manage/statistics"
    },
    {
      title: "Seva Scanner",
      description: "View and analyze comprehensive statistics",
      icon: QrCode,
      to: "/admin/manage/scanner"
    },
    {
      title: "Roles",
      description: "Add Roles And Page Access",
      icon: Users,
      to: "/admin/manage/roles"
    },
    {
      title: "Users",
      description: "Add Users",
      icon: User,
      to: "/admin/manage/users"
    },
    {
      title: "Images",
      description: "Add Images",
      icon:ImageDown,
      to: "/admin/manage/image"
    }
  ];

  const authorizedItems = dashboardItems.filter(item => 
    permissions.some(permission => permission.url === item.to)
  );

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-7xl mx-auto p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {authorizedItems.map((item, index) => (
            <DashboardCard
              key={index}
              title={item.title}
              description={item.description}
              icon={item.icon}
              to={item.to}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;


