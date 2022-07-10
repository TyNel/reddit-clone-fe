import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { VscClose } from "react-icons/vsc";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import * as yup from "yup";
import axios from "axios";
import "../create-community-modal/create-community.styles.css";

export default function CreateCommunity({ toggleModal }) {
  const state = useSelector((state) => state);
  const navigate = useNavigate();

  const validationSchema = yup.object({
    subName: yup
      .string("Please enter a community name")
      .min(2, "Name must be more than 2 characters or more")
      .max(20, "Name must be 20 characters or less")
      .required("Name is required"),
    subDescription: yup
      .string("Please enter a community description")
      .min(1, "Description must be more than 1 character long")
      .max(100, "Description must be 100 characters or less")
      .required("Description is required"),
    subImage: yup
      .string("Please provide community background image")
      .url("Url is not valid")
      .max(300, "Url link cannot exceed more than 300 characters long")
      .required("Image is required"),
    subIcon: yup
      .string("Please provide community icon image")
      .url("Url is not valid")
      .max(300, "Url link cannot exceed more than 300 characters long")
      .required("Image is required"),
    subCategory: yup
      .string("Please specify community category")
      .max(20, "Category must be 20 characters or less"),
  });

  const initialValues = {
    subName: "",
    subDescription: "",
    subImage: "",
    subIcon: "",
    subCategory: "",
    admin: state.user?.userId,
  };

  const onSubmit = async (values) => {
    if (state.user.length === 0) {
      toast.error("Please log in to create community");
    }
    try {
      const response = await axios.post(
        "https://tysocialappapi.azurewebsites.net/api/reddit/AddSub",
        values
      );
      if (response.status === 200) {
        const data = response.data;
        toggleModal(false);
        navigate(`/r/${data.subId}/${data.subName}`);
      }
    } catch (error) {
      toast.error(
        error.response ? error.response.data.errorMessages[0] : error.message
      );
    }
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  });

  return (
    <div className="modal-container community-modal">
      <div className="modal-content">
        <div
          className="side-image"
          style={{ backgroundImage: `url("https://bit.ly/3iu51iQ")` }}
        ></div>
        <VscClose className="close-icon" onClick={() => toggleModal(false)} />
        <div className="form-container">
          <div className="policy-container">
            <h1 className="title">Create a Community</h1>
          </div>
          <form
            className="user-form login-form"
            onSubmit={formik.handleSubmit}
            id="user-login-form"
          >
            <div className="input-container">
              <input
                type="text"
                id="subName"
                className="user-form-input login-form"
                value={formik.values.subName}
                onChange={formik.handleChange}
                placeholder=" "
              />
              {formik.touched.subName && formik.errors.subName ? (
                <div className="form-error">{formik.errors.subName}</div>
              ) : null}
              <span className="secondary-form-label">Community Name</span>
            </div>
            <div className="input-container">
              <textarea
                type="text"
                id="subDescription"
                className="user-form-input login-form"
                value={formik.values.subDescription}
                onChange={formik.handleChange}
                placeholder=" "
              />
              {formik.touched.subDescription && formik.errors.subDescription ? (
                <div className="form-error">{formik.errors.subDescription}</div>
              ) : null}
              <span className="secondary-form-label">
                Community Description
              </span>
            </div>
            <div className="input-container">
              <input
                type="url"
                id="subImage"
                className="user-form-input login-form"
                value={formik.values.subImage}
                onChange={formik.handleChange}
                placeholder=" "
              />
              {formik.touched.subImage && formik.errors.subImage ? (
                <div className="form-error">{formik.errors.subImage}</div>
              ) : null}
              <span className="secondary-form-label">Community Image</span>
            </div>
            <div className="input-container">
              <input
                type="url"
                id="subIcon"
                className="user-form-input login-form"
                value={formik.values.subIcon}
                onChange={formik.handleChange}
                placeholder=" "
              />
              {formik.touched.subIcon && formik.errors.subIcon ? (
                <div className="form-error">{formik.errors.subIcon}</div>
              ) : null}
              <span className="secondary-form-label">Community Icon</span>
            </div>
            <div className="input-container">
              <input
                type="text"
                id="subCategory"
                className="user-form-input login-form"
                value={formik.values.subCategory}
                onChange={formik.handleChange}
                placeholder=" "
              />
              {formik.touched.subCategory && formik.errors.subCategory ? (
                <div className="form-error">{formik.errors.subCategory}</div>
              ) : null}
              <span className="secondary-form-label">Community Category</span>
            </div>
          </form>
          <div className="community-submit-container">
            <div className="btn-container-community">
              <button
                form="user-login-form"
                type="button"
                className="btn btn--outline"
                onClick={() => toggleModal(false)}
              >
                Cancel
              </button>
              <button
                form="user-login-form"
                type="submit"
                className="btn btn--full"
              >
                Create
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
