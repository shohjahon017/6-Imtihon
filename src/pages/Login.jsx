import React, { useRef, useState } from "react";
import http from "../../axios";
import { useNavigate, Link } from "react-router-dom";
import { FadeLoader } from "react-spinners";

function Login() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const navigate = useNavigate();
  const [loader, setLoader] = useState(false);

  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  const validatePassword = (pw) => {
    return /[a-z]/.test(pw) && /[0-9]/.test(pw) && pw.length > 3;
  };

  const validate = () => {
    if (!validateEmail(emailRef.current.value)) {
      alert("Email is not valid");
      emailRef.current.focus();
      return false;
    }

    return true;
  };

  const handleLogin = (event) => {
    event.preventDefault();

    const isValid = validate();
    if (!isValid) {
      return;
    }
    setLoader(true);
    const userLogin = {
      email: emailRef.current.value,
      password: passwordRef.current.value,
    };

    http
      .post("/login", userLogin)
      .then((response) => {
        const data = response.data;
        if (data.message == "User Not found") {
          alert("Parol yoki email noto`g`ri");
        }

        if (data.user) {
          localStorage.setItem("token", data.accessToken);
          localStorage.setItem("user", JSON.stringify(data));
          navigate("/");
        }
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoader(false);
      });
  };

  return (
    <div className="flex items-center justify-center min-h-screen mt-3">
      {loader && (
        <div className="mt-2 justify-center flex ">
          {" "}
          <FadeLoader></FadeLoader>
        </div>
      )}
      <form
        onSubmit={handleLogin}
        className="w-1/3 flex flex-col p-5 gap-4 border rounded-lg shadow-md"
      >
        <input
          ref={emailRef}
          className="p-2 border rounded-md"
          type="text"
          placeholder="Enter Email..."
        />
        <input
          ref={passwordRef}
          className="p-2 border rounded-md"
          type="password"
          placeholder="Enter Password..."
        />

        <button
          disabled={loader}
          type="submit"
          className="bg-green-600 p-3 rounded-lg text-white hover:bg-green-700 transition-all duration-500"
        >
          {loader ? "LOADING..." : "LOGIN"}
        </button>
        <Link to="/register" className="text-blue-500">
          Register ga o'tish
        </Link>
      </form>
    </div>
  );
}

export default Login;
