import Goal from "../components/Goal";
import GoalHeader from "../components/GoalHeader";
import Loading from "../components/Loading";
import { useFetch } from "../Hooks/useFetch";
import Empty from "../components/Empty";
import ErrorFetch from "../components/ErrorFetch";
import Goals from "../data/goals";
const Ongoing = () => {
  const url = "https://goalonapibibian.onrender.com/api/goals";
  const {
    isLoading,
    isError,
    data: { goals: Goals },
  } = useFetch(url);
  const ongoingGoals =
    isLoading || isError ? null : Goals.filter((g) => g.progress < 100);
  if (!isLoading && isError) {
    return <ErrorFetch />;
  }

  if (!isLoading && ongoingGoals.length < 1) {
    return <Empty />;
  }
  return (
    <div className="container mt-2">
      <GoalHeader heading="Ongoing" />
      {isLoading && <Loading />}
      <div>
        {Goals &&
          ongoingGoals.map((g) => {
            return <Goal key={g._id} {...g} />;
          })}
      </div>
    </div>
  );
};

export default Ongoing;
