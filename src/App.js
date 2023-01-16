import { Route, Routes } from "react-router-dom";
import FirstPage from "./components/FirstPage";
import JobsList from "./features/tasks/JobsList";
import NewTask from "./features/tasks/NewTask";
import Layout from "./components/Layout";
import Login from "./components/Login";
import MainPage from "./components/MainPage";
import Prefetch from "./features/auth/Prefetch";
import OutletLayout from "./components/Outlet";
import EditTask from "./features/tasks/EditTaskForm";


function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout/>}>
        <Route path="/" element={<FirstPage/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route element={<Prefetch/>}>
        <Route path="main" element={<MainPage/>}>
          <Route path="joblist" element={<OutletLayout/>}>
            <Route index element={<JobsList/>}/>
            <Route path="new" element={<NewTask/>}/>
            <Route path=":id" element={<EditTask/>}/>
          </Route>
        </Route>
        </Route>


      </Route>
    </Routes>
  );
}

export default App;
