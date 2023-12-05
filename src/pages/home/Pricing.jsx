import { useHistory } from "react-router-dom";

const Pricing = () => {
  const history = useHistory();
  return (
    <div>
      Pricing
      <div>
        <button onClick={() => history.push("/")}>Go to home</button>
      </div>
    </div>
  );
};

export default Pricing;
