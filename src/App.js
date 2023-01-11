import { Route, Routes } from "react-router-dom";
import FirstPage from "./components/FirstPage";
import Layout from "./components/Layout";
import Login from "./components/Login";
import MainPage from "./components/MainPage";


function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout/>}>
        <Route index element={<FirstPage/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/main" element={<MainPage/>}/>

      </Route>
    </Routes>
  );
}

export default App;
