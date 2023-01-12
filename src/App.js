import { Route, Routes } from "react-router-dom";
import FirstPage from "./components/FirstPage";
import JobsList from "./components/JobsList";
import Layout from "./components/Layout";
import Login from "./components/Login";
import MainPage from "./components/MainPage";
import Prefetch from "./features/auth/Prefetch";


function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout/>}>
        <Route path="/" element={<FirstPage/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route element={<Prefetch/>}>
        <Route path="main" element={<MainPage/>}>
          <Route path="joblist" element={<JobsList/>}>

          </Route>
        </Route>
        </Route>


      </Route>
    </Routes>
  );
}

export default App;
