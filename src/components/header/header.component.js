import { useState, useContext } from "react";
import { Context } from "../../contexts/store";
import axios from "axios";
import { useNavigate, matchPath, useLocation } from "react-router-dom";
import logo from "../../assests/Reddit_Lockup_OnWhite.svg";
import "../header/header.styles.css";
import { BsSearch } from "react-icons/bs";
import { BsPerson } from "react-icons/bs";
import { MdKeyboardArrowDown } from "react-icons/md";
import { MdAdd } from "react-icons/md";
import { Link } from "react-router-dom";
import Dropdown from "../dropdown/dropdown.component";
import SignUp from "../signup/signup.component";
import Login from "../login/login.component";
import CommunitiesDropdown from "../communities-dropdown/communities-dropdown.component";

export default function Header() {
  const [state, dispatch] = useContext(Context);
  const [open, setOpen] = useState(false);
  const [search, toggleSearch] = useState(false);
  const [signinModal, setSigninOpen] = useState(false);
  const [loginModal, setLoginOpen] = useState(false);
  const [filteredData, setFiltiredData] = useState([]);
  const [query, setQuery] = useState("");
  const user = state.user;

  //check if user is on homepage already
  const { pathname } = useLocation();
  const match = matchPath({ path: "/" }, pathname);

  const navigate = useNavigate();

  const toggleSigninModal = (data) => {
    setSigninOpen(data);
  };

  const toggleLogin = (data) => {
    setLoginOpen(data);
  };

  const handleChange = (e) => {
    const userInput = e.target.value;
    const dataFiltered = state.subNames.filter((sub) => {
      return sub.subName.toUpperCase().includes(userInput.toUpperCase());
    });

    if (userInput === "") {
      setFiltiredData([]);
      setQuery(null);
    } else {
      setFiltiredData(dataFiltered);
    }
    setQuery(userInput);
  };

  const handleSubmit = async (e, query) => {
    e.preventDefault();
    if (query === null) {
      return;
    }
    try {
      const response = await axios.get(
        "https://localhost:5001/api/reddit/SearchPosts",
        {
          params: { query },
        }
      );
      if (response.status === 200) {
        dispatch({
          type: "SET_POSTS",
          payload: response.data,
        });
        navigate(`/r/search/${query}`);
      }
    } catch (error) {
      console.log(error.response.data.errorMessages);
    }
  };

  const keyPressed = (e) => {
    let userInput = query;
    if (e.key === "Enter") {
      if (query === "") {
        alert("Please enter a search term");
        return;
      }
      handleSubmit(e, userInput);
      setQuery("");
    }
  };

  const homePageRedirect = () => {
    if (match === null) {
      dispatch({
        type: "SET_POSTS",
        payload: [],
      });
      navigate("/");
    }
  };

  return (
    <div className="header">
      <div className="homepage-icon-box">
        <div className="homepage-icon" onClick={homePageRedirect}>
          <img src={logo} alt="reddit logo" className="homepage-icon-img" />
        </div>
      </div>
      <form className="navbar-search-container" onSubmit={handleSubmit}>
        <div className="searchbar-icon">
          <BsSearch color="#a4a4a4" />
        </div>
        <input
          required
          placeholder="Search Reddit"
          className="search-bar"
          type="text"
          value={query}
          onChange={handleChange}
          onKeyDown={keyPressed}
          onClick={() => toggleSearch(true)}
        />
        <div className={search === true ? "search-result-container" : "hidden"}>
          {search && (
            <CommunitiesDropdown
              data={filteredData}
              toggleSearch={toggleSearch}
              fromHeader={true}
            />
          )}
        </div>
      </form>
      {user === "" ? (
        <div className="login-signup-container">
          <div
            className="btn btn--outline"
            onClick={() => setLoginOpen(!loginModal)}
          >
            Log In
          </div>
          {loginModal && (
            <Login toggleModal={toggleLogin} toggleSignin={toggleSigninModal} />
          )}
          <div
            className="btn btn--full"
            onClick={() => setSigninOpen(!signinModal)}
          >
            Sign Up
          </div>
          {signinModal && (
            <SignUp toggleModal={toggleSigninModal} toggleLogin={toggleLogin} />
          )}
        </div>
      ) : (
        <Link to="/r/submit" className="create-post-icon">
          <MdAdd color="#a4a4a4" />
        </Link>
      )}
      <div onClick={() => setOpen(!open)} className="dropdown-menu-icon">
        <BsPerson color="#a4a4a4" />
        <span className="userName">{user === "" ? null : user.userName}</span>
        <MdKeyboardArrowDown color="#a4a4a4" />
        {open && <Dropdown toggleLogin={toggleLogin} />}
      </div>
    </div>
  );
}
