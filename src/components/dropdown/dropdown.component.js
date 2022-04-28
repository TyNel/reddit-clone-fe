import { useContext } from "react";
import { Context } from "../../contexts/store";
import { Link } from "react-router-dom";
import "../dropdown/dropdown.styles.css";
import { HiOutlineMoon } from "react-icons/hi";
import { GiTwoCoins } from "react-icons/gi";
import { GrShield } from "react-icons/gr";
import { BsLightning } from "react-icons/bs";
import { GrEmptyCircle } from "react-icons/gr";
import { RiGlobeLine } from "react-icons/ri";
import { IoIosHelpCircleOutline } from "react-icons/io";
import { MdLogin } from "react-icons/md";

export default function Dropdown(props) {
  const [state, dispatch] = useContext(Context);
  const user = state.user;
  const toggleLogin = props.toggleLogin;
  const userLogin = () => {
    toggleLogin(true);
  };
  const userLogOut = () => {
    dispatch({
      type: "SET_USER_POST_VOTES",
      payload: [],
    });
    dispatch({
      type: "SET_USER",
      payload: [],
    });
    localStorage.clear();
    toggleLogin(true);
  };

  return (
    <div className="dropdown-container">
      <h3 className="dropdown-subheader">View Options</h3>
      <div className="dropdown-item">
        <HiOutlineMoon className="dropdown-icon" />
        <div className="dropdown-text">Dark Mode</div>
        <div className="switch">
          <input type="checkbox" />
          <span className="slider round"></span>
        </div>
      </div>
      <h3 className="dropdown-subheader">More Stuff</h3>
      <Link to="/" className="dropdown-item">
        <GiTwoCoins className="dropdown-icon" />
        <div className="dropdown-text">Coins</div>
        <div className="dropdown-subtext">0 coins</div>
      </Link>
      <Link to="/" className="dropdown-item">
        <GrShield className="dropdown-icon" />
        <div className="dropdown-text">Premium</div>
      </Link>
      <Link to="/" className="dropdown-item">
        <BsLightning className="dropdown-icon" />
        <div className="dropdown-text">Powerups</div>
      </Link>
      <Link to="/" className="dropdown-item">
        <GrEmptyCircle className="dropdown-icon" />
        <div className="dropdown-text">Talk</div>
      </Link>
      <Link to="/" className="dropdown-item">
        <RiGlobeLine className="dropdown-icon" />
        <div className="dropdown-text">Predictions</div>
      </Link>
      <Link to="/" className="dropdown-item">
        <IoIosHelpCircleOutline className="dropdown-icon" />
        <div className="dropdown-text">Help Center</div>
      </Link>
      <Link
        to="/"
        className="dropdown-item"
        onClick={user.length === 0 ? () => userLogin() : () => userLogOut()}
      >
        <MdLogin className="dropdown-icon" />
        {user.length === 0 ? (
          <div className="dropdown-text">Log In / Sign Up</div>
        ) : (
          <div className="dropdown-text">Log Out</div>
        )}
      </Link>
    </div>
  );
}
