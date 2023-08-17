import {useState} from "react";
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
      await api.post("/register", {
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
    <div className="register-page">   
      <h1 className="title">Winest</h1>   
      <section className="container">
        <form className="credential-form">
          <input className="credential-input" type="text" placeholder="Name" name="name" onChange={handleChange} />
          <input className="credential-input" type="text" placeholder="Email" name="email" onChange={handleChange} />
          <input className="credential-input" type="password" placeholder="Password" name="password" onChange={handleChange} />
          <input className="credential-input" type="text" placeholder="Birth Date" name="birthdayDate" onChange={handleChange} />
          <input className="credential-input" type="text" placeholder="Phone number" name="phoneNumber" onChange={handleChange} />
          <button className="register-btn" onClick={handleClick}>Sign up</button>
        </form>
        <div className="signin-content">
          <span className="signin-desc">Already have an account? </span>
          <Link className="link" to="/login">
          <span className="signin-btn">Sign in</span>
          </Link>
          </div>
      </section>
    </div >
  );
};

export default Register;
