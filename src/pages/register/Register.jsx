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
       console.log(response);
       navigate("/login")
    } catch (error) {
      console.error(error);
      setError(error);
    }
  }

  return (
    <div className="register">
      <div className="card">
        <div className="left">
          <h1>Lama Social.</h1>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero cum,
            alias totam numquam ipsa exercitationem dignissimos, error nam,
            consequatur.
          </p>
          <span>Do you have an account?</span>
          <Link to="/login">
          <button>Login</button>
          </Link>
        </div>
        <div className="right">
          <h1>Register</h1>
          <form>
            <input type="text" placeholder="Name" name="name" onChange={handleChange}/>
            <input type="email" placeholder="Email" name="email" onChange={handleChange}/>
            <input type="password" placeholder="Password" name="password" onChange={handleChange}/>
            <input type="date" placeholder="Birthday date" name="birthdayDate" onChange={handleChange}/>
            <input type="tel" placeholder="Phone number" name="phoneNumber" onChange={handleChange}/>
            {error &&  "Ocorreu um erro, tente novamente"}
            <button onClick={handleClick}>Register</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
