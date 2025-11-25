
import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import TopBar from './components/TopBar';
import ClusterList from './components/ClusterList';
import Overview from './components/Overview';
import ClusterDetail from './components/ClusterDetail';
import InspectionCenter from './components/InspectionCenter';

export default function App() {
  const [activeView, setActiveView] = useState('cluster-mgmt');
  const [selectedClusterId, setSelectedClusterId] = useState<string | null>(null);
  const [isDarkMode, setIsDarkMode] = useState(true);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  const handleNavigate = (id: string) => {
    setActiveView(id);
    setSelectedClusterId(null); // Reset detail view when changing main navigation
  };

  const handleClusterClick = (id: string) => {
    setSelectedClusterId(id);
    setActiveView('cluster-mgmt'); // Ensure the sidebar highlight stays on clusters or relevant section
  };

  const renderContent = () => {
    if (selectedClusterId) {
      return (
        <ClusterDetail 
          clusterId={selectedClusterId} 
          onBack={() => setSelectedClusterId(null)} 
        />
      );
    }

    switch (activeView) {
      case 'overview':
        return <Overview />;
      case 'cluster-mgmt':
        return <ClusterList onClusterClick={handleClusterClick} />;
      case 'inspections':
        return <InspectionCenter />;
      default:
        // Fallback for other menu items for now
        return <ClusterList onClusterClick={handleClusterClick} />;
    }
  };

  return (
    <div className={`${isDarkMode ? 'dark' : ''} flex min-h-screen bg-[#f8f9fa] dark:bg-slate-950 transition-colors duration-300`}>
      <Sidebar activeId={activeView} onNavigate={handleNavigate} />
      
      <div className="ml-64 flex-1 flex flex-col bg-[#f8f9fa] dark:bg-slate-950 transition-colors duration-300">
        <TopBar isDarkMode={isDarkMode} toggleTheme={toggleTheme} />

        <main className="flex-1 p-8 text-slate-800 dark:text-slate-300">
          {renderContent()}
        </main>
      </div>
    </div>
  );
}
