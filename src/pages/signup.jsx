import React, { useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { GlobalContext } from "../context/globalContext";
import fetchApi from "../utils/fetchApi";

const signupFormValidation = Yup.object().shape({
  user_id: Yup.string().required("Please enter user id"),
  firstName: Yup.string().required("Enter first name"),
  lastName: Yup.string(),
  email: Yup.string().email("Enter valid email").required("Enter email"),
  password: Yup.string().required("Enter password"),
  mobile: Yup.string(),
});

function SignupPage() {
  const { message, setMessage, spin, setSpin } = useContext(GlobalContext);
  const navigate = useNavigate();

  const onSignup = async (value) => {
    //console.log(value);
    let res = await fetchApi.post("/users/register", {
      ...value,
      role: "user",
    });
    if (res.data.statusCode === 200) {
      setSpin(false);
      setMessage('');
      navigate("/login");
    } else {
      setSpin(false);
      setMessage(res.data.message);
    }
  };

  return (
    <div className="my-20 flex flex-col">
      <h3 className="text-orange-600 text-center italic text-2xl font-medium mb-5">
        The Storynest
      </h3>
      <div className="mt-5 flex flex-col bg-white border rounded-md shadow w-3/4 md:w-1/2 mx-auto">
        <Formik
          initialValues={{}}
          onSubmit={(value)=>{
            setSpin(true);
            onSignup(value)
          }}
          validationSchema={signupFormValidation}
        >
          {() => {
            return (
              <Form className="flex flex-col items-center justify-center px-2">
                <div className="mb-10">
                  <label className="block mt-10 font-medium">User ID</label>
                  <Field
                    name="user_id"
                    type="text"
                    className="block border rounded-md border-gray-300 py-1 w-3/4 sm:w-72 md:w-96"
                    placeholder=" Enter User ID"
                  />
                  <ErrorMessage
                    name="user_id"
                    render={(msg) => (
                      <small className="block text-red-500">{msg}</small>
                    )}
                  />
                </div>
                <div className="mb-10">
                  <label className="block font-medium">First Name</label>
                  <Field
                    name="firstName"
                    type="text"
                    className="block border rounded-md border-gray-300 py-1 w-3/4 sm:w-72 md:w-96"
                    placeholder=" Enter your first name"
                  />
                  <ErrorMessage
                    name="firstName"
                    render={(msg) => (
                      <small className="block text-red-500">{msg}</small>
                    )}
                  />
                </div>
                <div className="mb-10">
                  <label className="block font-medium">Last Name</label>
                  <Field
                    name="lastName"
                    type="text"
                    className="block border rounded-md border-gray-300 py-1 w-3/4 sm:w-72 md:w-96"
                    placeholder=" Enter your last name"
                  />
                  <ErrorMessage
                    name="lastName"
                    render={(msg) => (
                      <small className="block text-red-500">{msg}</small>
                    )}
                  />
                </div>
                <div className="mb-10">
                  <label className="block font-medium">Email</label>
                  <Field
                    name="email"
                    type="email"
                    className="block border rounded-md border-gray-300 py-1 w-3/4 sm:w-72 md:w-96"
                    placeholder=" Enter your email"
                  />
                  <ErrorMessage
                    name="email"
                    render={(msg) => (
                      <small className="block text-red-500">{msg}</small>
                    )}
                  />
                </div>
                <div className="mb-10">
                  <label className="block font-medium">Mobile</label>
                  <Field
                    name="mobile"
                    type="text"
                    className="block border rounded-md border-gray-300 py-1 w-3/4 sm:w-72 md:w-96"
                    placeholder=" Enter your mobile"
                  />
                  <ErrorMessage
                    name="mobile"
                    render={(msg) => (
                      <small className="block text-red-500">{msg}</small>
                    )}
                  />
                </div>
                <div className="mb-10">
                  <label className="block font-medium">Password</label>
                  <Field
                    name="password"
                    type="password"
                    className="block border rounded-md border-gray-300 py-1 w-3/4 sm:w-72 md:w-96"
                    placeholder=" Password"
                  />
                  <ErrorMessage
                    name="password"
                    render={(msg) => (
                      <small className="block text-red-500">{msg}</small>
                    )}
                  />
                </div>
                <button
                  type="submit"
                  className="inline-flex items-center text-white border rounded-md bg-orange-600 mb-5 px-10 py-2 hover:bg-orange-500"
                >
                  {spin ? (
                    <>
                      <svg
                        className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      <span>Processing...</span>
                    </>
                  ) : (
                    <span className="font-medium">Sign up</span>
                  )}
                </button>
              </Form>
            );
          }}
        </Formik>
        {message ? (
          <>
            <div className="block text-center text-red-500 mb-5">{message}</div>
          </>
        ) : (
          <></>
        )}
        <div className="text-center text-xs mb-5">
          <p>
            Already have an account?{" "}
            <Link className="italic text-orange-500" to="/login">
              Login
            </Link>{" "}
            here
          </p>
        </div>
      </div>
    </div>
  );
}

export default SignupPage;
