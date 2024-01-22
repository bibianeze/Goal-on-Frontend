import Completed from "../components/Completed";
import GoalHeader from "../components/GoalHeader";
import Loading from "../components/Loading";
import { useFetch } from "../Hooks/useFetch";
import Empty from "../components/Empty";
import ErrorFetch from "../components/ErrorFetch";
import Goals from "../data/goals";

const Complete = () => {
  // const completedGoals = Goals.filter((g) => g.progress === 100);
  const url = "https://goalonapibibian.onrender.com/api/goals";
  const {
    isLoading,
    isError,
    data: { goals: Goals },
  } = useFetch(url);

  const completedGoals =
    isLoading || isError ? null : Goals.filter((g) => g.progress === 100);

    if (!isLoading && isError) {
      return <ErrorFetch />;
    }

    if (!isLoading && completedGoals.length < 1) {
      return <Empty />;
    }

  return (
    <div className="container mt-2">
      <GoalHeader heading="Completed" />
      {isLoading && <Loading />}
      <div>
        {Goals &&
          completedGoals.map((g) => {
            return <Completed key={g._id} {...g} />;
          })}
      </div>
    </div>
  );
};

export default Complete;
