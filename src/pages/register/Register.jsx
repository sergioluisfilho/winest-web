import {useState, useEffect} from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../../api/axios";
import "./register.scss";

const Register = () => {
  const [inputs, setInputs] = useState({
    name: "",
    email: "",
    password: "",
    birthdayDate: "",
    phoneNumber: "",
  })

  const [error, setError] = useState(null);
  const navigate = useNavigate()

  const handleChange = e => {
    setInputs(prev =>({...prev, [e.target.name]: e.target.value  }))
  }

  const handleClick = async e => {
    e.preventDefault();
    try {
      const response = await api.post("/register", {
        name: inputs.name,
        email: inputs.email,
        password: inputs.password,
        birthday: inputs.birthdayDate,
        phone: inputs.phoneNumber,
       })
       navigate("/login")
    } catch (error) {
      console.error(error);
      setError(error);
    }
  }

  return (
    <div className="register">   
        <h1 className="title">Winest</h1>   
      <section className="container">
        <form className="credential-form">
          <input className="credential-input" type="text" placeholder="Name" name="name" onChange={handleChange} />
          </form>
          <form className="credential-form">
          <input className="credential-input" type="text" placeholder="Email" name="email" onChange={handleChange} />
          </form>
        <form className="credential-form">
          <input className="credential-input" type="password" placeholder="Password" name="password" onChange={handleChange} />
          </form>
          <form className="credential-form">
          <input className="credential-input" type="text" placeholder="Date of Birth" name="birthdayDate" onChange={handleChange} />
          </form>
        <form className="credential-form">
          <input className="credential-input" type="text" placeholder="Phone number" name="phoneNumber" onChange={handleChange} />
          </form>
          <button className="register-btn" onClick={handleClick}>Sign up</button>
        <div className="signin-content">
          <span className="signin-desc">Already have an account?</span>
          <span className="signin-desc"> </span>
          <Link className="link" to="/login">
          <span className="signin-btn">Sign in</span>
          </Link>
        </div>
      </section>
    </div >
  );
};

export default Register;
