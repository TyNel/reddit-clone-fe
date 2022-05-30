import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { BsSearch } from "react-icons/bs";
import { SiReddit } from "react-icons/si";
import { MdKeyboardArrowDown } from "react-icons/md";
import { useParams } from "react-router-dom";
import { setSubNames } from "../../features/subNames/subNamesSlice";
import { setSubData } from "../../features/subRedditData/subRedditDataSlice";
import CommunitiesDropdown from "../../components/communities-dropdown/communities-dropdown.component";
import PostForm from "../../components/post-form/post-form.component";
import AboutCommunity from "../../components/about-community/about-community.component";
import FooterNav from "../../components/footer-nav/footer-nav.component";
import SubRules from "../../components/sub-rules/rules.component";
import axios from "axios";
import "../submitPost/submitPost.styles.css";

export default function SubmitPost() {
  const [open, setOpen] = useState(false);
  const [filteredData, setFiltiredData] = useState([]);
  const { subName } = useParams();
  const dispatch = useDispatch();
  const [query, setQuery] = useState("");

  const handleChange = (e) => {
    const userInput = e.target.value;
    if (userInput === "") {
      setQuery(null);
    } else {
      setQuery(userInput);
    }
  };

  useEffect(() => {
    let controller = new AbortController();
    async function searchSubNames() {
      try {
        const response = await axios.get(
          "https://tysocialappapi.azurewebsites.net/api/reddit/SearchSubNames",
          {
            params: { query },
            signal: controller.signal,
          }
        );
        if (response.status === 200) {
          setFiltiredData(response.data);
          dispatch(setSubNames(response.data));
        }
      } catch (error) {
        if (axios.isCancel(error)) {
          return;
        } else {
          console.log(error);
        }
      }
    }
    searchSubNames();
    return () => {
      controller.abort();
    };
  }, [query, dispatch]);

  useEffect(() => {
    async function GetSubData() {
      try {
        const response = await axios.get(
          "https://tysocialappapi.azurewebsites.net/api/reddit/SubReddit",
          {
            params: { subName },
          }
        );
        if (response.status === 200) {
          dispatch(setSubData(response.data));
        }
      } catch (error) {
        console.log(error.response.errors.errorMessages);
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
              value={query}
            ></input>
            {subName ? <div className="community-btn">{subName}</div> : null}
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
                  resetQuery={setQuery}
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
