import React, { useEffect, useState } from "react";
import GoalHeader from "../components/GoalHeader";
import step from "../assets/amico.png";
import { useParams } from "react-router-dom";
import Loading from "../components/Loading";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

const Update = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [progress, setProgress] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const redirect = useNavigate();
  const [update, setUpdate] = useState(false)

  const {goalId} = useParams()
  const url = `https://goalonapibibian.onrender.com/api/goals/${goalId}`;

  const getGoal = async () =>{
    const res = await fetch(url);
    const {goal} = await res.json();
    setIsLoading(false)
    setTitle(goal.title)
    setDescription(goal.description)
    setProgress(goal.progress)
  }

  useEffect(() => {
    getGoal()
  }, [goalId])

  const handleUpdate = async (e) => {
    e.preventDefault()
    setUpdate(true)

    try {
      const res = await fetch(url, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, description, progress }),
      });

      const data = await res.json()

      if (data.success){
        redirect("/all")
      }else{
        toast.error("error occurred while updating, try again")
      }
    } catch (error) {
      console.log(error);
    }
  }

  

  return (
    <>
      <GoalHeader heading="Progress" />
      {isLoading ? (
        <Loading />
      ) : (
        <div className="container d-flex justify-content-between align-items-center mt-3 pb-3 gap-lg-2">
          <div className="main-form py-5 px-1 ps-lg-2 ps-xl-3 pe-xl-3 rounded-2">
            <ToastContainer />
            <form className="create-form" onSubmit={handleUpdate}>
              <div className="mt-2">
                <input
                  type="text"
                  placeholder="Goal Title"
                  className="bg-transparent"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>
              <div className="mt-5">
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  name=""
                  id=""
                  cols="30"
                  rows="10"
                  placeholder="Goal Description"
                  className="bg-transparent"
                ></textarea>
              </div>
              <div>
                <p>Update Progress</p>
                <input
                  value={progress}
                  onChange={(e) => setProgress(e.target.value)}
                  type="number"
                  min="0"
                  max="100"
                  className="bg-transparent mt-2"
                />
              </div>
              <div className="mt-2">
                <button className="blue-bg p-2">{update ? "Updating..." : "Update"}</button>
              </div>
            </form>
          </div>
          <div className="d-none d-lg-block main-img">
            <img src={step} alt="image of a step" />
          </div>
        </div>
      )}
    </>
  );
};

export default Update;
