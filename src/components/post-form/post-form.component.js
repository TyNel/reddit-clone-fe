import { useState } from "react";
import "../post-form/post-form.styles.css";
import { Post, Images, Link } from "../post-form-tabs/post-form-tabs.component";
import { RiFileList2Line } from "react-icons/ri";
import { RiImageLine } from "react-icons/ri";
import { BsLink45Deg } from "react-icons/bs";

export default function PostForm() {
  const [activeTab, setActiveTab] = useState("post");

  return (
    <div className="post-form">
      <div className="post-form-tabs">
        <ul className="tabs">
          <li
            className={activeTab === "post" ? "active" : ""}
            onClick={() => setActiveTab("post")}
          >
            <RiFileList2Line className="tab-icon" />
            Post
          </li>
          <li
            className={activeTab === "images" ? "active" : ""}
            onClick={() => setActiveTab("images")}
          >
            <RiImageLine className="tab-icon" />
            Images
          </li>
          <li
            className={activeTab === "link" ? "active" : ""}
            onClick={() => setActiveTab("link")}
          >
            <BsLink45Deg className="tab-icon" />
            Link
          </li>
        </ul>
      </div>
      <div className="form-content">
        {activeTab === "post" ? <Post /> : ""}
        {activeTab === "images" ? <Images /> : ""}
        {activeTab === "link" ? <Link /> : ""}
      </div>
    </div>
  );
}
