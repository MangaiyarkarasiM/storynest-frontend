import React, { useContext, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { GlobalContext } from "../context/globalContext";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const profileFormValidation = Yup.object().shape({
  firstName: Yup.string().required("Enter name"),
  lastName: Yup.string(),
  email: Yup.string().email("Enter valid email").required("Enter email"),
  mobile: Yup.string(),
  gender: Yup.string(),
  dob: Yup.date(),
  addressLine1: Yup.string(),
  addressLine2: Yup.string(),
  city: Yup.string(),
  state: Yup.string(),
  pincode: Yup.number(),
  country: Yup.string(),
});

const ProfilePage = () => {
  let { id } = useParams();
  const [user, setUser] = useState({});
  let { spin, setSpin, getUserWithUserId, onEditProfile } =
    useContext(GlobalContext);

  async function getUserDetails() {
    setUser(await getUserWithUserId(id));
  }

  useEffect(() => {
    getUserDetails();
  }, [id]);

  const onSave = (value) => {
    onEditProfile(value, user.id);
    getUserDetails();
  };

  return (
    <>
      <div className="sm:container sm:mx-auto">
        <div className="border w-3/4 mx-auto sm:w-2/4 my-4 p-3 shadow">
          <Formik
            initialValues={{
              firstName: user?.firstName ? user.firstName : "",
              lastName: user?.lastName ? user.lastName : "",
              gender: user?.gender ? user?.gender : "",
              email: user?.email ? user.email : "",
              mobile: user?.mobile ? user.mobile : "",
              addressLine1: user?.addressLine1 ? user.addressLine1 : "",
              addressLine2: user?.addressLine2 ? user.addressLine2 : "",
              city: user?.city ? user.city : "",
              state: user?.state ? user.state : "",
              pincode: user?.pincode > 0 ? user.pincode : "",
              country: user?.country ? user.country : "",
            }}
            onSubmit={(value) => {
              setSpin(true);
              onSave(value);
            }}
            validationSchema={profileFormValidation}
            enableReinitialize={true}
          >
            {(prop) => {
              return (
                <Form className="flex flex-col justify-center mx-5 text-sm sm:text-base">
                  <div className="mb-4 mx-5">
                    <div className="flex flex-col sm:flex-row">
                      <label className="block font-medium sm:text-right mx-2 w-3/4 sm:w-2/4">
                        First Name
                      </label>
                      <Field
                        name="firstName"
                        type="text"
                        value={prop.values.firstName}
                        className="block border rounded-md border-gray-300 py-1 w-3/4 sm:w-2/4 sm:text-left mx-2"
                        placeholder="First Name"
                      />
                    </div>
                    <ErrorMessage
                      name="firstName"
                      render={(msg) => (
                        <small className="block text-center text-red-500">
                          {msg}
                        </small>
                      )}
                    />
                  </div>
                  <div className="mb-4 mx-5">
                    <div className="flex flex-col sm:flex-row">
                      <label className="block font-medium sm:text-right mx-2 w-3/4 sm:w-2/4">
                        Last Name
                      </label>
                      <Field
                        name="lastName"
                        type="text"
                        value={prop.values.lastName}
                        className="block border rounded-md border-gray-300 py-1 w-3/4 sm:w-2/4 sm:text-left mx-2"
                        placeholder="Last name"
                      />
                    </div>
                    <ErrorMessage
                      name="lastName"
                      render={(msg) => (
                        <small className="block text-center text-red-500">
                          {msg}
                        </small>
                      )}
                    />
                  </div>
                  <div className="mb-4 mx-5">
                    <div className="flex flex-col sm:flex-row">
                      <label className="block font-medium sm:text-right mx-2 w-3/4 sm:w-2/4">
                        Gender
                      </label>
                      <Field
                        as="select"
                        name="gender"
                        className="block border rounded-md border-gray-300 py-1 w-3/4 sm:w-2/4 sm:text-left mx-2"
                      >
                        <option value="" defaultChecked>
                          Select
                        </option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                      </Field>
                    </div>
                    <ErrorMessage
                      name="gender"
                      render={(msg) => (
                        <small className="block text-center text-red-500">
                          {msg}
                        </small>
                      )}
                    />
                  </div>
                  <div className="mb-4 mx-5">
                    <div className="flex flex-col sm:flex-row">
                      <label className="block font-medium sm:text-right mx-2 w-3/4 sm:w-2/4">
                        Email
                      </label>
                      <Field
                        name="email"
                        type="email"
                        value={prop.values.email}
                        className="block border rounded-md border-gray-300 py-1 w-3/4 sm:w-2/4 sm:text-left mx-2"
                        placeholder="Email"
                      />
                    </div>
                    <ErrorMessage
                      name="email"
                      render={(msg) => (
                        <small className="block text-center text-red-500">
                          {msg}
                        </small>
                      )}
                    />
                  </div>
                  <div className="mb-4 mx-5">
                    <div className="flex flex-col sm:flex-row">
                      <label className="block font-medium sm:text-right mx-2 w-3/4 sm:w-2/4">
                        Mobile
                      </label>
                      <Field
                        name="mobile"
                        type="text"
                        value={prop.values.mobile}
                        className="block border rounded-md border-gray-300 py-1 w-3/4 sm:w-2/4 sm:text-left mx-2"
                        placeholder="Mobile"
                      />
                    </div>
                    <ErrorMessage
                      name="mobile"
                      render={(msg) => (
                        <small className="block text-center text-red-500">
                          {msg}
                        </small>
                      )}
                    />
                  </div>
                  <div className="mb-4 mx-5">
                    <div className="flex flex-col sm:flex-row">
                      <label className="block font-medium sm:text-right mx-2 w-3/4 sm:w-2/4">
                        Address Line1
                      </label>
                      <Field
                        name="addressLine1"
                        type="text"
                        value={prop.values.addressLine1}
                        className="block border rounded-md border-gray-300 py-1 w-3/4 sm:w-2/4 sm:text-left mx-2"
                        placeholder="Address"
                      />
                    </div>
                    <ErrorMessage
                      name="addressLine1"
                      render={(msg) => (
                        <small className="block text-center text-red-500">
                          {msg}
                        </small>
                      )}
                    />
                  </div>
                  <div className="mb-4 mx-5">
                    <div className="flex flex-col sm:flex-row">
                      <label className="block font-medium sm:text-right mx-2 w-3/4 sm:w-2/4">
                        Address Line2
                      </label>
                      <Field
                        name="addressLine2"
                        type="text"
                        value={prop.values.addressLine2}
                        className="block border rounded-md border-gray-300 py-1 w-3/4 sm:w-2/4 sm:text-left mx-2"
                        placeholder="Address"
                      />
                    </div>
                    <ErrorMessage
                      name="addressLine2"
                      render={(msg) => (
                        <small className="block text-center text-red-500">
                          {msg}
                        </small>
                      )}
                    />
                  </div>
                  <div className="mb-4 mx-5">
                    <div className="flex flex-col sm:flex-row">
                      <label className="block font-medium sm:text-right mx-2 w-3/4 sm:w-2/4">
                        City
                      </label>
                      <Field
                        name="city"
                        type="text"
                        value={prop.values.city}
                        className="block border rounded-md border-gray-300 py-1 w-3/4 sm:w-2/4 sm:text-left mx-2"
                        placeholder="City"
                      />
                    </div>
                    <ErrorMessage
                      name="city"
                      render={(msg) => (
                        <small className="block text-center text-red-500">
                          {msg}
                        </small>
                      )}
                    />
                  </div>
                  <div className="mb-4 mx-5">
                    <div className="flex flex-col sm:flex-row">
                      <label className="block font-medium sm:text-right mx-2 w-3/4 sm:w-2/4">
                        State
                      </label>
                      <Field
                        name="state"
                        type="text"
                        value={prop.values.state}
                        className="block border rounded-md border-gray-300 py-1 w-3/4 sm:w-2/4 sm:text-left mx-2"
                        placeholder="State"
                      />
                    </div>
                    <ErrorMessage
                      name="state"
                      render={(msg) => (
                        <small className="block text-center text-red-500">
                          {msg}
                        </small>
                      )}
                    />
                  </div>
                  <div className="mb-4 mx-5">
                    <div className="flex flex-col sm:flex-row">
                      <label className="block font-medium sm:text-right mx-2 w-3/4 sm:w-2/4">
                        Pin Code
                      </label>
                      <Field
                        name="pincode"
                        type="text"
                        value={prop.values.pincode}
                        maxLength="6"
                        minLength="6"
                        className="block border rounded-md border-gray-300 py-1 w-3/4 sm:w-2/4 sm:text-left mx-2"
                        placeholder="Pin Code"
                      />
                    </div>
                    <ErrorMessage
                      name="pincode"
                      render={(msg) => (
                        <small className="block text-center text-red-500">
                          {msg}
                        </small>
                      )}
                    />
                  </div>
                  <div className="mb-4 mx-5">
                    <div className="flex flex-col sm:flex-row">
                      <label className="block font-medium sm:text-right mx-2 w-3/4 sm:w-2/4">
                        Country
                      </label>
                      <Field
                        name="country"
                        type="text"
                        value={prop.values.country}
                        maxLength="6"
                        minLength="6"
                        className="block border rounded-md border-gray-300 py-1 w-3/4 sm:w-2/4 sm:text-left mx-2"
                        placeholder="Country"
                      />
                    </div>
                    <ErrorMessage
                      name="country"
                      render={(msg) => (
                        <small className="block text-center text-red-500">
                          {msg}
                        </small>
                      )}
                    />
                  </div>
                  <div className="flex justify-center items-center mr-5">
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
                          <span>Submitting...</span>
                        </>
                      ) : (
                        <span className="">Submit</span>
                      )}
                    </button>
                  </div>
                </Form>
              );
            }}
          </Formik>
        </div>
      </div>
    </>
  );
};

export default ProfilePage;
