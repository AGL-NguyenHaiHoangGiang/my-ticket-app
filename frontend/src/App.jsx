import { Route, Routes} from 'react-router-dom';

import AdminLayout from './pages/admin/app';
import AdminLogin from './pages/admin/login';
import UserLayout from './UserLayout';

function App() {
  return (
    <Routes>
      {/* admin login - no layout */}
      <Route path="/admin/login" element={<AdminLogin />} />

      {/* admin routes - with layout */}
      <Route path="/admin/*" element={<AdminLayout />} />

      {/* user layout */}
      <Route path="/*" element={<UserLayout />} />
    </Routes>
  );
}

export default App;
