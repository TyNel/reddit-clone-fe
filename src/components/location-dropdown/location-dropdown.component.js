import { Link } from "react-router-dom";
import "../location-dropdown/location-dropdown.styles.css";

export default function LocationDropDown() {
  return (
    <div className="location-dropdown-container">
      <Link to="/" className="location-item">
        Everywhere
      </Link>
      <Link to="/US" className="location-item">
        United States
      </Link>
      <Link to="/" className="location-item">
        Canada
      </Link>
      <Link to="/" className="location-item">
        Japan
      </Link>
      <Link to="/" className="location-item">
        Australia
      </Link>
      <Link to="/" className="location-item">
        Germany
      </Link>
      <Link to="/" className="location-item">
        United Kingdom
      </Link>
    </div>
  );
}
