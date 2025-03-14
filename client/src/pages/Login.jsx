// import React, { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import {
//   loginStart,
//   loginSuccess,
//   loginFailure,
// } from "../redux/user/userSlice.js";
// import { useDispatch, useSelector } from "react-redux";

// const Login = () => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const { loading, error } = useSelector((state) => state.user);
//   const [formData, setFormData] = useState({
//     email: "",
//     password: "",
//   });
//   // console.log(formData);

//   const handleChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.id]: e.target.value,
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       dispatch(loginStart());
//       const res = await fetch(`/api/auth/login`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(formData),
//       });
//       const data = await res.json();
//       if (data?.success) {
//         dispatch(loginSuccess(data?.user));
//         alert(data?.message);
//         navigate("/");
//       } else {
//         dispatch(loginFailure(data?.message));
//         alert(data?.message);
//       }
//     } catch (error) {
//       dispatch(loginFailure(error.message));
//       console.log(error);
//     }
//   };

//   return (
//     <div
//       className="flex justify-center items-center"
//       style={{
//         width: "100%",
//         height: "90vh",
//         background:
//           "linear-gradient(0deg, rgba(2,0,36,1) 0%, rgba(9,9,121,1) 35%, rgba(0,212,255,1) 100%)",
//       }}
//     >
//       <form onSubmit={handleSubmit}>
//         <div className="flex flex-col border border-black rounded-lg p-4 w-72 h-fit gap-5 sm:w-[320px] bg-white bg-opacity-60">
//           <h1 className="text-3xl text-center font-semibold">Login</h1>
//           <div className="flex flex-col">
//             <label htmlFor="email" className="font-semibold">
//               Email:
//             </label>
//             <input
//               type="email"
//               id="email"
//               className="p-3 rounded border border-black bg-white bg-opacity-80"
//               onChange={handleChange}
//             />
//           </div>
//           <div className="flex flex-col">
//             <label htmlFor="password" className="font-semibold">
//               Password:
//             </label>
//             <input
//               type="password"
//               id="password"
//               className="p-3 rounded border border-black bg-white bg-opacity-80"
//               onChange={handleChange}
//             />
//           </div>
//           <p className="text-blue-700 text-sm hover:underline">
//             <Link to={`/signup`}>Dont have an account? Signup</Link>
//           </p>
//           <button
//             disabled={loading}
//             className="p-3 text-white bg-slate-700 rounded hover:opacity-95"
//           >
//             {loading ? "Loading..." : "Login"}
//           </button>
//           {error && <p className="text-sm text-red-600">{error}</p>}
//         </div>
//       </form>
//     </div>
//   );
// };

// export default Login;





import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginStart, loginSuccess, loginFailure } from "../redux/user/userSlice";
import logo from "../assets/images/logo.png";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(loginStart());
      const res = await fetch(`/api/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data?.success) {
        dispatch(loginSuccess(data?.user));
        alert(data?.message);
        navigate("/");
      } else {
        dispatch(loginFailure(data?.message));
        alert(data?.message);
      }
    } catch (error) {
      dispatch(loginFailure(error.message));
      console.log(error);
    }
  };

  return (
    // <div className="min-h-screen flex items-center justify-center bg-gray-100">

    <div
    className="flex justify-center items-center"
    style={{
      width: "100%",
      height: "90vh",
      background:
        "linear-gradient(0deg, rgba(2,0,36,1) 0%, rgba(9,9,121,1) 35%, rgba(0,212,255,1) 100%)",
    }}
  >
     <div className="flex flex-col border border-black rounded-lg p-4 w-72 sm:w-[320px] bg-white bg-opacity-60 items-center">
      {/* <div className="bg-white p-8 rounded-lg shadow-md w-96 text-center"> */}
      
        <img src={logo} alt="Logo" className="mx-auto w-24 h-24 mb-2 rounded-full" />
        <h2 className="text-3xl font-bold text-blue-950">KriThiyagu</h2>
        <h2 className="text-xl font-bold text-blue-950">Travel & Tourism</h2>
   
        <h1 className="text-3xl text-center font-semibold mt-2">Signin</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="p-1 rounded border border-black bg-white bg-opacity-80"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="p-1 rounded border border-black resize-none bg-white bg-opacity-80"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 px-4 bg-slate-700 text-white rounded-lg hover:opacity-95 mt-2 focus:outline-none"
          >
            Login
          </button>
        </form>
        <p className="text-center text-sm mt-4">
          Don't have an account? <Link to="/signup" className="text-blue-700 hover:underline">Register</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
