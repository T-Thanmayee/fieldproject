import "./AuthorProfile.css";
import { NavLink, Outlet } from "react-router-dom";
import {useSelector} from 'react-redux';


function AuthorProfile() {
  let {currentUser}=useSelector(state=>state.userAuthoruserAuthorLoginReducer)
 
  return (
    <div className="author-profile p-3 ">
      <ul className="nav  justify-content-around fs-3">
        <li className="nav-item">
          <NavLink
            className="nav-link"
            to={`articles-by-author/${currentUser.username}`}
            style={{ color: "var(--dark-green)" }}
          >
            Feild Of Work
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink
            className="nav-link"
            to="new-article"
            style={{ color: "var(--dark-green)" }}
          >
            Add Profession
          </NavLink>
        </li>
      </ul>
      <Outlet />
    </div>
  );
}

export default AuthorProfile;
