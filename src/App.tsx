import Navbar from "./common/Navbar";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import JobsList from "./jobs/JobsList";
import AddJob from "./jobs/AddJob";
import EditJob from "./jobs/EditJob";
import Sidebar from "./common/Sidebar";

function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <div className="max-w-[90rem] mx-auto px-4 sm:px-6 md:px-8">
          <Sidebar />
          <Routes>
            <Route path="/" element={<JobsList />}></Route>
            <Route path="/create" element={<AddJob />}></Route>
            <Route path="/edit" element={<EditJob />}></Route>
          </Routes>
        </div>
      </BrowserRouter>
    </>
  );
}

export default App;
