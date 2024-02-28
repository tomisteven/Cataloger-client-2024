import "./App.css";
import { WebRoutes, ClientWebRoutes, AdminRoutes } from "./router";
import { AuthProvider } from "./context/AuthProvider";
import { HashRouter } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <AuthProvider>
      <HashRouter>
        <AdminRoutes />
        <ClientWebRoutes />
        <WebRoutes />
      </HashRouter>
    </AuthProvider>
  );
}

export default App;
