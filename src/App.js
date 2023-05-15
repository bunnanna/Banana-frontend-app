import { Route, Routes } from "react-router-dom";
import FirstPage from "./components/FirstPage";
import AssignedList from "./features/tasks/AssignedList";
import NewTask from "./features/tasks/NewTask";
import Layout from "./components/Layout";
import Login from "./components/Login";
import MainPage from "./components/MainPage";
import Prefetch from "./features/auth/Prefetch";
import OutletLayout from "./components/Outlet";
import TaskComponent from "./features/tasks/TaskComponent";
import EditTask from "./features/tasks/EditTask";
import RequireAuth from "./features/auth/RequireAuth";
import SignUp from "./features/users/SignUp";
import PersistLogin from "./features/auth/PersistLogin";
import UserPage from "./features/users/UserPage";
import ProjectsList from "./features/projects/ProjectList";
import NewProject from "./features/projects/NewProject";
import TeamsList from "./features/teams/TeamsList";
import NewTeam from "./features/teams/NewTeam";
import EditProject from "./features/projects/EditProject";
import EditTeam from "./features/teams/EditTeam";
import MainIndex from "./components/MainIndex";
import SkillsList from "./features/skills/SkillsList";
import NewSkill from "./features/skills/NewSkill";
import EditSkill from "./features/skills/EditSkill";
import RolesList from "./features/roles/RolesList";
import NewRole from "./features/roles/NewRole";
import EditRole from "./features/roles/EditRole";
import UserList from "./features/users/UserList";
import EditUser from "./features/users/EditUser";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout/>}>
        <Route path="/" element={<FirstPage/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/signup" element={<SignUp/>}/>

        <Route element={<PersistLogin/>}>
        <Route element={<Prefetch/>}>
        <Route element={<RequireAuth allowedRoles={["Employee"]}/>}>
        <Route path="main" element={<MainPage/>}>
          <Route index element={<MainIndex/>}/>
          <Route path="task" element={<OutletLayout/>}>
            <Route index element={<AssignedList status="assign" />}/>
            <Route path="new" element={<NewTask/>}/>
            <Route path=":id" element={<OutletLayout/>}>
              <Route index element={<TaskComponent/>}/>
              <Route path="edit" element={<EditTask/>}/>
            </Route>
          </Route>
          <Route path="project" element={<OutletLayout/>}>
          <Route index element={<ProjectsList/>}/>
          <Route path="new" element={<NewProject/>}/>
            <Route path=":id" element={<OutletLayout/>}>
              {/* <Route index element={<ProjectComponent/>}/> */}
              <Route path="edit" element={<EditProject/>}/>
            </Route>
            </Route>
          <Route path="team" element={<OutletLayout/>}>
          <Route index element={<TeamsList/>}/>
          <Route path="new" element={<NewTeam/>}/>
            <Route path=":id" element={<OutletLayout/>}>
              {/* <Route index element={<ProjectComponent/>}/> */}
              <Route path="edit" element={<EditTeam/>}/>
            </Route>
        </Route>
          <Route path="skill" element={<OutletLayout/>}>
          <Route index element={<SkillsList/>}/>
          <Route path="new" element={<NewSkill/>}/>
            <Route path=":id" element={<OutletLayout/>}>
              {/* <Route index element={<ProjectComponent/>}/> */}
              <Route path="edit" element={<EditSkill/>}/>
            </Route>
        </Route>
          <Route path="role" element={<OutletLayout/>}>
          <Route index element={<RolesList/>}/>
          <Route path="new" element={<NewRole/>}/>
            <Route path=":id" element={<OutletLayout/>}>
              {/* <Route index element={<ProjectComponent/>}/> */}
              <Route path="edit" element={<EditRole/>}/>
            </Route>
        </Route>


        <Route path="approve" element={<OutletLayout/>}>
            <Route index element={<AssignedList status="Submitted"/>}/>
        </Route>
        <Route path="complete" element={<OutletLayout/>}>
            <Route index element={<AssignedList status="Complete"/>}/>
        </Route>
        </Route>

        <Route path="user" element={<OutletLayout/>}>
          <Route index element={<UserPage/>}/>
          <Route path="list" element={<UserList/>}/>
          <Route path=":id" element={<OutletLayout/>}>
              {/* <Route index element={<ProjectComponent/>}/> */}
              <Route path="edit" element={<EditUser/>}/>
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
