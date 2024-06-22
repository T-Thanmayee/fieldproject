import "./AddArticle.css";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function AddArticle() {
  let { register, handleSubmit } = useForm();
  let { currentUser } = useSelector(
    (state) => state.userAuthoruserAuthorLoginReducer
  );
  let [err, setErr] = useState("");
  let navigate = useNavigate();
  let token=localStorage.getItem('token')
  //create axios with token
  const axiosWithToken=axios.create({
    headers:{Authorization:`Bearer ${token}`}
  })

  const postNewArticle = async (article) => {
    article.dateOfCreation = new Date();
    article.dateOfModification = new Date();
    article.articleId = Date.now();
    article.username = currentUser.username;
    article.comments = [];
    article.status = true;
   //make HTTP post req
   let res=await axiosWithToken.post('http://localhost:4000/author-api/article',article)
   console.log(res)
   if(res.data.message==='New article created'){
    navigate(`/author-profile/articles-by-author/${currentUser.username}`)
   }else{
    setErr(res.data.message)
   }
  };

  //<p style="white-space: pre-line">multi-line text</p>
  return (
    <div className="container ">
      <div className="row justify-content-center mt-5">
        <div className="col-lg-8 col-md-8 col-sm-10">
          <div className="card shadow">
            <div className="card-title text-center border-bottom">
              <h2 className="p-3">Profession Details</h2>
            </div>
            <div className="card-body bg-light">
              {/* {err.length!==0&&<p className='text-danger fs-5'>{err}</p>} */}
              <form onSubmit={handleSubmit(postNewArticle)}>
                <div className="mb-4">
                  <label htmlFor="title" className="form-label">
                    Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="title"
                    {...register("title")}
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
                  >
                   <option value="construction">Construction</option>
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
                  <label htmlFor="content" className="form-label" >
                    Content
                  </label>
                  <textarea placeholder="(Include location,contact details and describe about your work)"
                    {...register("content")}
                    className="form-control"
                    id="content"
                    rows="10"
                  ></textarea>
                </div>

                <div className="text-end">
                  <button type="submit" className="text-light">
                    Post
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddArticle;
