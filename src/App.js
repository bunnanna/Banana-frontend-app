import { Route, Routes } from "react-router-dom";
import FirstPage from "./components/FirstPage";
import JobsList from "./features/tasks/JobsList";
import NewTask from "./features/tasks/NewTask";
import Layout from "./components/Layout";
import Login from "./components/Login";
import MainPage from "./components/MainPage";
import Prefetch from "./features/auth/Prefetch";
import OutletLayout from "./components/Outlet";
import TaskComponent from "./features/tasks/TaskComponent";
import EditTask from "./features/tasks/EditTask";
import RequireAuth from "./features/auth/RequireAuth";
import Signin from "./features/auth/Signin";
import PersistLogin from "./features/auth/PersistLogin";
import UserPage from "./features/users/UserPage";
import PrefetchA from "./features/auth/PrefetchA";
import ProjectsList from "./features/projects/ProjectList";

function App() {
  return (
    <Routes>
      <Route element={<PrefetchA/>}>
      <Route path="/" element={<Layout/>}>
        <Route path="/" element={<FirstPage/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/signin" element={<Signin/>}/>

        <Route element={<PersistLogin/>}>
        <Route element={<Prefetch/>}>
        <Route element={<RequireAuth allowedRoles={["Employee"]}/>}>
        <Route path="main" element={<MainPage/>}>
          <Route path="joblist" element={<OutletLayout/>}>
            <Route index element={<JobsList/>}/>
            <Route path="new" element={<NewTask/>}/>
            <Route path=":id" element={<OutletLayout/>}>
              <Route index element={<TaskComponent/>}/>
              <Route path="edit" element={<EditTask/>}/>
            </Route>
          </Route>
          <Route path="project" element={<OutletLayout/>}>
          <Route index element={<ProjectsList/>}/>
          </Route>
        </Route>
        <Route path="user" element={<OutletLayout/>}>
          <Route index element={<UserPage/>}/>
        </Route>
        </Route>
        </Route>
        </Route>
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
