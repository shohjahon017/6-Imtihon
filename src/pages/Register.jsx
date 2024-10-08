import React, { useRef, useState } from "react";
import http from "../../axios";
import { useNavigate, Link } from "react-router-dom";
import { FadeLoader } from "react-spinners";

function Register() {
  const firstNameRef = useRef();
  const lastNameRef = useRef();
  const ageRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const repasswordRef = useRef();
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

    if (firstNameRef.current.value.length < 1) {
      alert("First name is not valid");
      firstNameRef.current.focus();
      return false;
    }

    if (lastNameRef.current.value.length < 1) {
      alert("Last name is not valid");
      lastNameRef.current.focus();
      return false;
    }

    if (!validatePassword(passwordRef.current.value)) {
      alert("Password is not valid");
      passwordRef.current.focus();
      return false;
    }

    if (passwordRef.current.value !== repasswordRef.current.value) {
      alert("Passwords do not match");
      repasswordRef.current.focus();
      return false;
    }

    return true;
  };

  const handleRegister = async (event) => {
    event.preventDefault();

    const isValid = validate();
    if (!isValid) {
      return;
    }
    setLoader(true);
    const user = {
      firstName: firstNameRef.current.value,
      lastName: lastNameRef.current.value,
      age: ageRef.current.value,
      email: emailRef.current.value,
      password: passwordRef.current.value,
      confirmPassword: repasswordRef.current.value,
    };

    http
      .post("/register", user, {
        headers: {
          "Content-type": "application/json",
        },
      })
      .then((data) => {
        navigate("/login");
        if (data.message === "Foydalanuvchi muvaffaqiyatli ro'yxatdan o'tdi") {
          navigate("/login");
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
        <div className="mx-auto mt-3">
          {" "}
          <FadeLoader></FadeLoader>
        </div>
      )}
      <form
        onSubmit={handleRegister}
        className="w-1/3 flex flex-col p-5 gap-4 border rounded-lg shadow-md"
      >
        <input
          ref={firstNameRef}
          className="p-2 border rounded-md"
          type="text"
          placeholder="Enter name..."
        />
        <input
          ref={lastNameRef}
          className="p-2 border rounded-md"
          type="text"
          placeholder="Enter surname..."
        />
        <input
          ref={ageRef}
          className="p-2 border rounded-md"
          type="number"
          placeholder="Enter Age..."
        />
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
        <input
          ref={repasswordRef}
          className="p-2 border rounded-md"
          type="password"
          placeholder="Re-enter Password..."
        />
        <button
          disabled={loader}
          type="submit"
          className="bg-green-600 p-3 rounded-lg text-white hover:bg-green-700 transition-all duration-500"
        >
          {loader ? "LOADING..." : "REGISTER"}
        </button>
        <Link to="/login" className="text-blue-500">
          Login ga o'tish
        </Link>
      </form>
    </div>
  );
}

export default Register;
