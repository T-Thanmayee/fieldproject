import "./Article.css";
import { useLocation } from "react-router-dom";
import { Fragment, useEffect, useState } from "react";
import { axiosWithToken } from "../../axiosWithToken";
import { useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import axios from "axios";
import { FcClock } from "react-icons/fc";
import { CiEdit } from "react-icons/ci";
import { MdDelete } from "react-icons/md";
import { FcCalendar } from "react-icons/fc";
import { FcComments } from "react-icons/fc";
import { FcPortraitMode } from "react-icons/fc";
import { BiCommentAdd } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import { MdRestore } from "react-icons/md";

function Article() {
  const { state } = useLocation();
  let { currentUser } = useSelector(
    (state) => state.userAuthoruserAuthorLoginReducer
  );

  let { register, handleSubmit } = useForm();
  let [comment, setComment] = useState("");
  let navigate = useNavigate();
  let [articleEditStatus, setArticleEditStatus] = useState(false);
  let [currentArticle, setCurrentArticle] = useState(state);

  const deleteArticle = async() => {
    let art={...currentArticle};
    delete art._id;
    let res=await axiosWithToken.put(`http://localhost:4000/author-api/article/${currentArticle.articleId}`,art)
    if(res.data.message==='article deleted'){
      setCurrentArticle({...currentArticle,status:res.data.payload})
    }
  };

  const restoreArticle =async () => {
    let art={...currentArticle};
    delete art._id;
    let res=await axiosWithToken.put(`http://localhost:4000/author-api/article/${currentArticle.articleId}`,art)
    if(res.data.message==='article restored'){
      setCurrentArticle({...currentArticle,status:res.data.payload})
    }
  };

  //add comment top an article by user
  const writeComment = async (commentObj) => {
    commentObj.username = currentUser.username;
    let res = await axiosWithToken.post(
      `http://localhost:4000/user-api/comment/${state.articleId}`,
      commentObj
    );
    if (res.data.message === "Comment posted") {
      setComment(res.data.message);
    }
  };

  //enable edit state
  const enableEditState = () => {
    setArticleEditStatus(true);
  };

  //disable edit state
  const saveModifiedArticle = async (editedArticle) => {
    let modifiedArticle = { ...state, ...editedArticle };
    //change date of modification
    modifiedArticle.dateOfModification = new Date();
    //remove _id
    delete modifiedArticle._id;

    //make http put req to save modified article in db
    let res = await axiosWithToken.put(
      "http://localhost:4000/author-api/article",
      modifiedArticle
    );
    if (res.data.message === "Article modified") {
      setArticleEditStatus(false);
      navigate(`/author-profile/article/${modifiedArticle.articleId}`, {
        state: res.data.article,
      });
    }
  };

  //convert ISO date to UTC data
  function ISOtoUTC(iso) {
    let date = new Date(iso).getUTCDate();
    let day = new Date(iso).getUTCDay();
    let year = new Date(iso).getUTCFullYear();
    return `${date}/${day}/${year}`;
  }

  return (
    <div>
      {articleEditStatus === false ? (
        <>
          <div className="d-flex justify-content-between">
            <div>
              <p className="display-3 me-4">{state.title}</p>
              <span className="py-3">
                <small className=" text-secondary me-4">
                  <FcCalendar className="fs-4" />
                  Created on:{ISOtoUTC(state.dateOfCreation)}
                </small>
                <small className=" text-secondary">
                  <FcClock className="fs-4" />
                  Modified on: {ISOtoUTC(state.dateOfModification)}
                </small>
              </span>
            </div>
            <div>
              {currentUser.userType === "author" && (
                <>
                 
                  <button
                    className="me-2 btn btn-warning "
                    onClick={enableEditState}
                  >
                    <CiEdit className="fs-2" />
                  </button>
                  {currentArticle.status === true ? (
                    <button
                      className="me-2 btn btn-danger"
                      onClick={deleteArticle}
                    >
                      <MdDelete className="fs-2" />
                    </button>
                  ) : (
                    <button
                      className="me-2 btn btn-info"
                      onClick={restoreArticle}
                    >
                      <MdRestore className="fs-2" />
                    </button>
                  )}
                </>
              )}
            </div>
          </div>
          <p className="lead mt-3" style={{ whiteSpace: "pre-line" }}>
            {state.content}
          </p>
          {/* user comments */}
          <div>
            {/* read existing comments */}
            <div className="comments my-4">
              {state.comments.length === 0 ? (
                <p className="display-3">No comments yet...</p>
              ) : (
                state.comments.map((commentObj, ind) => {
                  return (
                    <div key={ind} className="bg-light  p-3">
                      <p
                        className="fs-4"
                        style={{
                          color: "dodgerblue",
                          textTransform: "capitalize",
                        }}
                      >
                        <FcPortraitMode className="fs-2 me-2" />
                        {commentObj.username}
                      </p>

                      <p
                        style={{
                          fontFamily: "fantasy",
                          color: "lightseagreen",
                        }}
                        className="ps-4"
                      >
                        <FcComments className="me-2" />
                        {commentObj.comment}
                      </p>
                    </div>
                  );
                })
              )}
            </div>

            <h1>{comment}</h1>
            {/* write comment by user */}
            {currentUser.userType === "user" && (
              <form onSubmit={handleSubmit(writeComment)}>
                <input
                  type="text"
                  {...register("comment")}
                  className="form-control mb-4 "
                  placeholder="Write comment here...."
                />
                <button type="submit" className="btn btn-success">
                  Add a Comment <BiCommentAdd className="fs-3" />
                </button>
              </form>
            )}
          </div>
        </>
      ) : (
        <form onSubmit={handleSubmit(saveModifiedArticle)}>
          <div className="mb-4">
            <label htmlFor="title" className="form-label">
              Name
            </label>
            <input
              type="text"
              className="form-control"
              id="title"
              {...register("title")}
              defaultValue={state.title}
            />
          </div>

          <div className="mb-4">
            <label htmlFor="category" className="form-label">
              Select a category
            </label>
            <select
              {...register("category")}
              id="category"
              className="form-select"
              defaultValue={state.category}
            >
             <option value="cleaning">Cleaning</option>
<option value="landscaping">Landscaping</option>
<option value="catering">Catering</option>
<option value="maintenance">Maintenance</option>
<option value="childcare">Childcare</option>
<option value="delivery">Delivery</option>
<option value="retail">Retail</option>
<option value="hospitality">Hospitality</option>
<option value="personal_care">Personal Care</option>
<option value="transportation">Transportation</option>
<option value="artisan">Artisan</option>
<option value="handyman">Handyman</option>
<option value="security">Security</option>
<option value="warehouse">Warehouse</option>
<option value="housemaid">Housemaid</option>
<option value="plumber">Plumber</option>
<option value="nurse">Nurse</option>
<option value="agriculture">Agriculture</option>
<option value="industrial_worker">Industrial Worker</option>
<option value="driver">Driver</option>
<option value="fishing">Fishing</option>
<option value="tailoring">Tailoring</option>
<option value="factory_worker">Factory Worker</option>
<option value="janitorial">Janitorial</option>
<option value="construction_laborer">Construction Laborer</option>
<option value="domestic_worker">Domestic Worker</option>
<option value="healthcare_assistant">Healthcare Assistant</option>
<option value="farm_worker">Farm Worker</option>
<option value="food_service">Food Service</option>
<option value="recycling_worker">Recycling Worker</option>
<option value="street_vendor">Street Vendor</option>
<option value="garbage_collector">Garbage Collector</option>
<option value="dock_worker">Dock Worker</option>
<option value="painter">Painter</option>
<option value="electrician">Electrician</option>
<option value="gardener">Gardener</option>
<option value="carpenter">Carpenter</option>
<option value="roofer">Roofer</option>
<option value="seamstress">Seamstress</option>
<option value="baker">Baker</option>
<option value="butcher">Butcher</option>
<option value="dishwasher">Dishwasher</option>
<option value="laundry_worker">Laundry Worker</option>
<option value="porter">Porter</option>
<option value="street_cleaner">Street Cleaner</option>
<option value="shoemaker">Shoemaker</option>
<option value="bus_driver">Bus Driver</option>
<option value="taxi_driver">Taxi Driver</option>
<option value="sanitation_worker">Sanitation Worker</option>
<option value="others">others</option>
            </select>
          </div>
          <div className="mb-4">
            <label htmlFor="content" className="form-label">
              Content
            </label>
            <textarea placeholder="(Include location,contact details and describe about your work)"
              {...register("content")}
              className="form-control"
              id="content"
              rows="10"
              defaultValue={state.content}
            ></textarea>
          </div>

          <div className="text-end">
            <button type="submit" className="btn btn-success">
              Save
            </button>
          </div>
        </form>
      )}
    </div>
  );
}

export default Article;
