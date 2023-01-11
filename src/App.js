import { Route, Routes } from "react-router-dom";
import FirstPage from "./components/FirstPage";
import JobsList from "./components/JobsList";
import Layout from "./components/Layout";
import Login from "./components/Login";
import MainPage from "./components/MainPage";


function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout/>}>
        <Route element={<FirstPage/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="main" element={<MainPage/>}>
          <Route path="joblist" element={<JobsList/>}>

          </Route>
        </Route>


      </Route>
    </Routes>
  );
}

export default App;
