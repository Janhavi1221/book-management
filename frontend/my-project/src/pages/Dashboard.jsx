import { Link } from 'react-router-dom';
import { FiBookOpen, FiPlusCircle, FiTrendingUp, FiCalendar, FiGrid } from 'react-icons/fi';
import { useState, useEffect } from 'react';
import { bookAPI } from '../services/api';
import AdvancedDashboard from '../components/AdvancedDashboard';

const Dashboard = () => {
  return <AdvancedDashboard />;
};

export default Dashboard;