import React, {useEffect} from "react";
import { Link , useLocation} from "react-router-dom";
import { useHistory } from "react-router-dom";
const Navbar = () => {


  const history= useHistory();
  let location = useLocation();
  useEffect(() => {
    // console.log(location)
  }, [location]);

  const handleLogout=()=>{
    localStorage.removeItem('token');
    history.push('login');
  }

  return (

    <nav className="navbar navbar-dark bg-dark navbar-expand-lg">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          NotePAD
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className={`nav-link if(${location.pathname==='/'? "active": ""})`} aria-current="page" to="/">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className={`nav-link if(${location.pathname==='/about'? "active": ""})`} to="/about">
                About
              </Link>
            </li>
            <li className="nav-item">
              <Link className={`nav-link if(${location.pathname==='/newnote'? "active": ""})`} to="/newnote">
                Add Note
              </Link>
            </li>
          </ul>
          {!localStorage.getItem('token')?<form className="d-flex">
            <Link className="btn btn-info mx-1 btn-sm" to="/login" role="button">Login</Link>
            <Link className="btn btn-info mx-1 btn-sm" to="/register" role="button">Register</Link>
          </form>:<form className="d-flex">
            <button onClick={handleLogout} className="d-flex btn btn-info btn-sm">Logout</button>
          </form>}
          
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
