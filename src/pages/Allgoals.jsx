import React from "react";
import GoalHeader from "../components/GoalHeader";

import Goal from "../components/Goal";
import Loading from "../components/Loading";
import { useFetch } from "../Hooks/useFetch";
import Empty from "../components/Empty";
import ErrorFetch from "../components/ErrorFetch";
import Goals from "../data/goals";

const Allgoals = () => {
  const url = "https://goalonapibibian.onrender.com/api/goals";
  const { isLoading, isError, data:{goals : Goals} } = useFetch(url);
  // if error statement
  if(!isLoading && isError){
    return <ErrorFetch />
  }
  //if goals < 1
  if(!isLoading && Goals.length < 1){
    return <Empty />
  }
  return (
    <div className="container pb-3">
      <GoalHeader heading="All Goals" />
        <div>
          {isLoading && <Loading/>}
        </div>
      <div>
        <div>
          {Goals &&
            Goals.map((g) => {
              return <Goal key={g._id} {...g} />;
            })}
        </div>
      </div>
    </div>
  );
};

export default Allgoals;
