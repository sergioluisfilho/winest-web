import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/authContext";
import "./login.scss";

const Login = () => {
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  })

  const [error, setError] = useState(null);

  const navigate = useNavigate()

  const handleChange = e => {
    setInputs(prev =>({...prev, [e.target.name]: e.target.value  }))
  }

  const { login } = useContext(AuthContext);

  useEffect(()=> console.log(inputs),[inputs])

  const handleLogin = async (e) => {
    e.preventDefault()
    try {
      await login(inputs);
      navigate("/")
    } catch (e) {
      alert(JSON.stringify(e));
      // setError(e.response.data)
    }
  };

  return (
    <div className="login">
      <div className="card">
        <div className="left">
          <h1>Hello World.</h1>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero cum,
            alias totam numquam ipsa exercitationem dignissimos, error nam,
            consequatur.
          </p>
          <span>Don't you have an account?</span>
          <Link to="/register">
            <button>Register</button>
          </Link>
        </div>
        <div className="right">
          <h1>Login</h1>
          <form>
            <input type="text" placeholder="Username" name="email"onChange={handleChange}/>
            <input type="password" placeholder="Password" name="password"onChange={handleChange}/>
            <button onClick={handleLogin}>Login</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
