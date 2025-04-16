/* eslint-disable no-unused-vars */
import React, { useState } from 'react';

const tabs = [
  { label: 'Training', key: 'training' },
  { label: 'Company Info', key: 'company' },
  { label: 'Lead Generation', key: 'leads' },
  { label: 'Whiteboard', key: 'whiteboard' },
  { label: 'Links', key: 'links' },
];

const Tabs = () => {
  const [activeTab, setActiveTab] = useState('training');

  const renderContent = () => {
    switch (activeTab) {
      case 'training':
        return <p className="text-sm">📚 Upcoming training materials will appear here.</p>;
      case 'company':
        return <p className="text-sm">🏢 Company mission, vision & contact info.</p>;
      case 'leads':
        return <p className="text-sm">💼 Submit leads, check referrals & rewards.</p>;
      case 'whiteboard':
        return <p className="text-sm">📝 Daily updates, SOPs, announcements.</p>;
      case 'links':
        return (
          <div className="space-y-1 text-sm">
            <a href="https://www.epfindia.gov.in/" target="_blank" rel="noreferrer" className="text-blue-500 underline">PF Portal</a><br />
            <a href="https://www.esic.in/" target="_blank" rel="noreferrer" className="text-blue-500 underline">ESIC Portal</a><br />
            <a href="https://www.google.com/maps/search/hospital/" target="_blank" rel="noreferrer" className="text-blue-500 underline">Nearest Hospital</a><br />
            <a href="https://www.google.com/maps/search/police+station/" target="_blank" rel="noreferrer" className="text-blue-500 underline">Nearest Police Station</a><br />
            <a href="https://www.google.com/maps/search/restaurant/" target="_blank" rel="noreferrer" className="text-blue-500 underline">Nearby Restaurants</a><br />
            <a href="https://www.google.com/maps/search/POSH+helpline/" target="_blank" rel="noreferrer" className="text-blue-500 underline">POSH Help</a>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="bg-white shadow-md rounded-xl p-4">
      <div className="flex space-x-2 mb-4">
        {tabs.map(tab => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`px-3 py-1 rounded-full text-sm transition ${
              activeTab === tab.key
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="text-gray-800">
        {renderContent()}
      </div>
    </div>
  );
};

export default Tabs;
