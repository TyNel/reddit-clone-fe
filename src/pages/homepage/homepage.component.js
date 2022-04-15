import { useEffect, useContext } from "react";
import Trending from "../../components/trending/trending.component";
import Posts from "../../components/posts/posts.component";
import axios from "axios";
import { Context } from "../../contexts/store";

export default function HomePage() {
  const [state, dispatch] = useContext(Context);

  useEffect(() => {
    async function GetNames() {
      try {
        const subNames = await axios.get(
          "https://localhost:5001/api/reddit/SubNames"
        );
        if (subNames.status === 200) {
          dispatch({
            type: "SET_SUBNAMES",
            payload: subNames.data,
          });
        }
      } catch (error) {
        console.log(error);
      }
    }
    GetNames();
  }, []);
  return (
    <div className="container homepage">
      <div className="homepage-body">
        <Trending />
        <Posts />
      </div>
    </div>
  );
}
