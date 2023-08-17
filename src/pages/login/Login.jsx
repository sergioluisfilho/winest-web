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
    setInputs(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const { login } = useContext(AuthContext);

  useEffect(() => console.log(inputs), [inputs])

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
        <h1 className="title">Winest</h1>   
      <section className="container">
        <form className="credential-form">
          <input className="credential-input" type="text" placeholder="Email" name="email" onChange={handleChange} />
          </form>
        <form className="credential-form">
          <input className="credential-input" type="password" placeholder="Password" name="password" onChange={handleChange} />
          </form>
        <button className="login-btn" onClick={handleLogin}>Sign In</button>
        <div className="signup-content">
          <span className="signup-desc">Don't have an account?</span>
          <span className="signup-desc"> </span>
          <Link className="link" to="/register">
          <span className="signup-btn">Sign up</span>
          </Link>
        </div>
      </section>
    </div >
  );
};

export default Login;
