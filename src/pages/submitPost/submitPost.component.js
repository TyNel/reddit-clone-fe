import { useState, useContext, useEffect } from "react";
import "../submitPost/submitPost.styles.css";
import PostForm from "../../components/post-form/post-form.component";
import AboutCommunity from "../../components/about-community/about-community.component";
import FooterNav from "../../components/footer-nav/footer-nav.component";
import SubRules from "../../components/sub-rules/rules.component";
import { BsSearch } from "react-icons/bs";
import { SiReddit } from "react-icons/si";
import { MdKeyboardArrowDown } from "react-icons/md";
import { Context } from "../../contexts/store";
import CommunitiesDropdown from "../../components/communities-dropdown/communities-dropdown.component";
import { useParams } from "react-router-dom";
import axios from "axios";

export default function SubmitPost() {
  const [open, setOpen] = useState(false);
  const [filteredData, setFiltiredData] = useState([]);
  const { subName } = useParams();
  const [state, dispatch] = useContext(Context);

  const handleChange = (e) => {
    const query = e.target.value;
    const dataFiltered = state.subNames.filter((sub) => {
      return sub.subName.toUpperCase().includes(query.toUpperCase());
    });

    if (query === "") {
      setFiltiredData([]);
    } else {
      setFiltiredData(dataFiltered);
    }
  };

  useEffect(() => {
    async function GetSubData() {
      try {
        const response = await axios.get(
          "https://localhost:5001/api/reddit/SubReddit",
          {
            params: { subName },
          }
        );
        if (response.status === 200) {
          dispatch({
            type: "SET_SUBREDDIT_DATA",
            payload: [response.data],
          });

          console.log(response);
        }
      } catch (error) {
        console.log(error.response.data.errorMessages);
      }
    }
    GetSubData();
  }, [subName, dispatch]);

  return (
    <div className="container grid--2-cols submit-container">
      <div className="create-post-container">
        <div className="create-post-header">
          <div className="create-post-title">Create a post</div>
          <div className="community-link-container">
            <div className="searchbar-icon-post">
              <BsSearch color="#a4a4a4" />
            </div>
            <input
              type="text"
              className="community-searchbar"
              placeholder="Search a community"
              onChange={handleChange}
              onClick={() => setOpen(true)}
            ></input>
            <div
              className="dropdown-menu-icon community-icon"
              onClick={() => setOpen(!open)}
            >
              {" "}
              <MdKeyboardArrowDown color="#a4a4a4" />
            </div>
            <div className="communities-dropdown-results">
              {open && (
                <CommunitiesDropdown
                  data={filteredData}
                  toggleSearch={setOpen}
                />
              )}
            </div>
          </div>
        </div>
        <div className="create-post-form">
          <PostForm />
        </div>
      </div>
      <div className="post-right-side-container">
        {subName && <AboutCommunity />}
        {subName && <SubRules />}
        <div className="posting-rules-container">
          <div className="posting-rules-title">
            {" "}
            <SiReddit className="rules-title-icon" />
            Posting to Reddit
          </div>
          <ol className="posting-rules">
            <li className="posting-rules-item">Remember the human</li>
            <li className="posting-rules-item">
              Behave like you would in real life
            </li>
            <li className="posting-rules-item">
              Look for the original source of content
            </li>
            <li className="posting-rules-item">
              Search for duplicates before posting
            </li>
            <li className="posting-rules-item">Read the community's rules</li>
          </ol>
        </div>
        <FooterNav />
      </div>
    </div>
  );
}
