import { useSelector } from "react-redux";
import { selectCurrentToken } from "../../redux/features/auth/authSlice";
import { useHistory } from "react-router-dom";

const Home = () => {
  const token = useSelector(selectCurrentToken);
  const history = useHistory();

  console.log("token", token);
  return (
    <div>
      Home
      <div>
        <button onClick={() => history.push("/pricing")}>
          Go to pricing page
        </button>
      </div>
    </div>
  );
};

export default Home;
