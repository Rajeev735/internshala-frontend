// App.tsx

import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";


import Leads from "./pages/GetLeads";
import CreateSalesUser from "./pages/CreateSalesUser";

import CreateLead from "./pages/CreateLeads";
import Dashboard from "./pages/dashboard";
import SalesUsers from "./pages/salesUsers";

import Login from "./pages/login";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={<Dashboard />}
        />
        <Route
          path="create-sales"
          element={<CreateSalesUser/>}
        />
        <Route
          path="/leads"
          element={<Leads />}
        />

        <Route
          path="/sales-users"
          element={<SalesUsers/>}
        />
        <Route
          path="/create-lead"
          element={<CreateLead/>}
        />
         <Route
          path="/login"
          element={<Login/>}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;