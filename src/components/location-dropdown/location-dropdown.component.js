import { Link } from "react-router-dom";
import "../location-dropdown/location-dropdown.styles.css";

export default function LocationDropDown() {
  const countries = [
    "Everywhere",
    "United State",
    "Canada",
    "Japan",
    "Australia",
    "Germany",
    "United Kingdom",
  ];
  return (
    <div className="location-dropdown-container">
      {countries.map((country, idx) => (
        <Link to="/" className="location-item" key={idx}>
          {country}
        </Link>
      ))}
    </div>
  );
}
