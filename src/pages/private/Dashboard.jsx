import { useEffect, useState } from 'react';
import api from '../../utils/axios';

const Dashboard = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get('/dashboard/data');
        setData(response.data);
      } catch (error) {
        console.error('Failed to fetch dashboard data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="container mt-4">
      <h1>Dashboard</h1>
      <div className="row">
        <div className="col-12">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Welcome to your Dashboard</h5>
              <p className="card-text">This is a protected route that requires authentication.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;