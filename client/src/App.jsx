import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from "./pages/landing/Landing";
import Gethelp from "./pages/gethelp/Gethelp";
import Businessupdates from "./pages/businessupdates/Businessupdates";
import { ModalProvider } from "./components/modalProvider/Modalprovider";
import TicketHistory from "./pages/ticketHistory/TicketHistory";
import Admin from "./pages/admin/Admin";
import TicketRequests from "./pages/ticketrequests/Ticketrequests";
function App() {
  return (
    <div className="App">
      <ModalProvider>

      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />}></Route>
          <Route path="/get-help" element={<Gethelp />}></Route>
          <Route path="/business-updates" element={<Businessupdates />}></Route>
          <Route path="/forgot-password" element={<Businessupdates />}></Route>
          <Route path="/ticket-history" element={<TicketHistory/>}></Route>
          <Route path="/admin/business-strategy" element={<Admin cat="BUSINESS STRATEGY"/>}></Route>
          <Route path="/admin/marketing" element={<Admin cat="MARKETING"/>}></Route>
          <Route path="/admin/financial-management" element={<Admin cat="FINANCIAL MANAGEMENT"/>}></Route>
          <Route path="/admin/technical-support" element={<Admin cat="TECHNICAL SUPPORT"/>}></Route>
          <Route path="/admin/operation&logistics" element={<Admin cat="OPERATION & LOGISTICS"/>}></Route>
          <Route path="/admin/others" element={<Admin cat="OTHERS"/>}></Route>
          <Route path="/admin/new-product-launch"element={<Admin cat="NEW PRODUCT LAUNCH"/>}></Route>
          <Route path="/admin/expansion-of-business"element={<Admin cat="EXPANSION OF BUSINESS"/>}></Route>
          <Route path="/admin/revenue"element={<Admin cat="REVENUE"/>}></Route>
          <Route path="/admin/requests"element={<Admin recent={true}/>}></Route>
          <Route path="/ticket-history/requests" element={<TicketRequests/>}></Route>
        </Routes>
      </BrowserRouter>
      </ModalProvider>
    </div>
  );
}

export default App;
