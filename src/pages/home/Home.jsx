import Stories from "../../components/stories/Stories"
import Posts from "../../components/posts/Posts"
import Share from "../../components/share/Share"
import { useState } from "react";
import "./home.scss"

const Home = () => {
  const [reload, setReload] = useState(false);

  const handleReload = () => {
    setReload(!reload); // Inverte o valor de reload para forçar uma atualização
  }

  return (
    <div className="home">
      {/* <Stories/> */}
      <Share onReload={handleReload} />
      <Posts reload={reload}/>
    </div>
  )
}

export default Home