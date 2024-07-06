import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom";

const SRegister = ({ setAuth }) => {
  const [inputs, setInputs] = useState({
    s_name: "",
    s_phone: "",
    s_email: "",
    s_password: "",
    s_address: ""
  });

  const { s_name, s_phone, s_email, s_password, s_address } = inputs;

  const onChange = e =>
    setInputs({ ...inputs, [e.target.name]: e.target.value });

  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        setInputs({
          ...inputs,
          s_address: `Latitude: ${latitude}, Longitude: ${longitude}`
        });
      });
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  };

  const onSubmitForm = async e => {
    e.preventDefault();
    try {
      const body = { s_name, s_phone, s_email, s_password, s_address };
      const response = await fetch(
        "http://localhost:5000/auth/shop-register",
        {
          method: "POST",
          headers: {
            "Content-type": "application/json"
          },
          body: JSON.stringify(body)
        }
      );
      const parseRes = await response.json();

      console.log(parseRes);

      if (parseRes.token) {
        localStorage.setItem("token", parseRes.token);
        setAuth(true);
      } else {
        setAuth(false);
      }
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <Fragment>
      <div className=" container align-item-center justify-content-center w-50">
        <h1 className="mt-5 text-center">Register</h1>
        <form onSubmit={onSubmitForm}>
          <input
            type="text"
            name="s_name"
            placeholder="Shop Name"
            onChange={e => onChange(e)}
            className="form-control my-3"
          />

          <input
            type="phone"
            name="s_phone"
            placeholder="Phone Number"
            onChange={e => onChange(e)}
            className="form-control my-3"
          />

          <input
            type="email"
            name="s_email"
            placeholder="Email (Optional)"
            onChange={e => onChange(e)}
            className="form-control my-3"
          />

          <input
            type="password"
            name="s_password"
            placeholder="Password"
            onChange={e => onChange(e)}
            className="form-control my-3"
          />
          <input
            type="address"
            name="s_address"
            placeholder="Shop Address"
            value={s_address}
            onChange={e => onChange(e)}
            className="form-control my-3"
          />
          <button
            type="button"
            className="btn btn-primary btn-block my-3"
            onClick={getCurrentLocation}
          >
            Get Current Location
          </button>
          <button className="btn btn-primary btn-block my-3">Submit</button>
        </form>
        <p className="text-center">Already have an account?</p>
        <Link className="btn btn-success btn-block my-3" to="/shop-login">
          Login
        </Link>
      </div>
    </Fragment>
  );
};

export default SRegister;
