import Navbar from "./common/Navbar";
import WrapperContainer from "./post/WrapperContainer";
import { BrowserRouter, Route } from "react-router-dom";
import DetailPostContainer from "./post/DetailPostContainer";

function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Route path="/" element={<WrapperContainer />} />
        <Route path="/posts/:id" element={<DetailPostContainer />} />
      </BrowserRouter>
    </>
  );
}

export default App;
