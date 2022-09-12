import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { GlobalContext } from "../../context/globalContext";
import Part from "./Part";

const partFormValidation = Yup.object().shape({
  partName: Yup.string().required("Please enter part name"),
  content: Yup.string().required(),
});

const StoryForm = (props) => {
  let { message, spin } = useContext(GlobalContext);
  let navigate = useNavigate();

  const onUpdatePart = (value) => {
    props.editPartWithId(value, props.part.id, true);
  };

  const onSave = (value) => {
    props.editPartWithId(value, props.part.id, false);
  };

  const initialValues = {
    partName: props.part?.partName ? props.part?.partName : "",
    content: props.part?.content ? props.part?.content : "",
  };

  return (
    <>
      <Formik
        initialValues={initialValues}
        onSubmit={(value) => {
          onUpdatePart(value);
        }}
        validationSchema={partFormValidation}
        enableReinitialize={true}
        validateOnChange={true}
        validateOnMount={true}
      >
        {(prop) => {
          return (
            <Form className="flex flex-col items-center justify-center bg-white px-2 mx-4 md:mx-8">
              <div className="mb-5 w-full">
                <Field
                  name="partName"
                  type="text"
                  value={prop.values.partName}
                  className="block h-14 text-center border-b py-1 w-full focus:outline-none"
                  placeholder=" Enter part name"
                />
                <ErrorMessage
                  name="partName"
                  render={(msg) => (
                    <small className="block text-red-500">{msg}</small>
                  )}
                />
              </div>
              <div className="mb-10 w-full">
                <Field
                  name="content"
                  as="textarea"
                  value={prop.values.content}
                  className="block py-1 w-full min-h-screen focus:outline-none"
                  placeholder=" Type your text"
                />
                {/* <ErrorMessage
                  name="content"
                  render={(msg) => (
                    <small className="block text-red-500">{msg}</small>
                  )}
                /> */}
              </div>
              <div className="fixed top-0 py-2 bg-gray-100 w-full border-b h-20">
                <div className="flex px-2 md:px-5 pb-2 justify-between items-center">
                  <div className="flex items-center gap-x-2 md:gap-x-4">
                    <button
                      onClick={() => {
                        navigate(`/mystories/${props.story.id}`);
                      }}
                    >
                      <i
                        className="fa fa-caret-left fa-2x md:fa-3x"
                        aria-hidden="true"
                      ></i>
                    </button>
                    <div>
                      <img
                        src={props.story.coverImage}
                        alt={props.story.title}
                        className="max-h-8 md:max-h-16"
                      ></img>
                    </div>
                    <Part
                      story={props.story}
                      createPart={props.createPart}
                      childClassName=""
                    >
                      <div className="flex flex-col justify-start text-sm">
                        <div className="flex">
                          <div className="text-gray-600 capitalize">
                            {props.story?.title}
                          </div>
                          <div className="ml-1">
                            <i
                              className="fa fa-caret-down"
                              aria-hidden="true"
                            ></i>
                          </div>
                        </div>
                        <div className="text-left font-medium text-base capitalize">
                          {props.part.partName}
                        </div>
                        <div className="text-left capitalize">
                          {props.part.status}
                        </div>
                      </div>
                    </Part>
                  </div>
                  <div className="flex gap-x-2">
                    <button
                      type="submit"
                      className={
                        prop.isValid
                          ? "block items-center text-white font-medium text-xs md:text-sm border rounded-md bg-orange-600 px-2 md:px-10 py-1 md:py-2 hover:bg-orange-500"
                          : "block items-center text-white font-medium text-xs md:text-sm border rounded-md bg-orange-300 px-2 md:px-10 py-1 md:py-2"
                      }
                      disabled={!prop.isValid}
                    >
                      {props.part.isPublished ? (
                        <span>Unpublish</span>
                      ) : (
                        <span>Publish</span>
                      )}
                    </button>
                    <button
                      type="button"
                      className="inline-flex items-center font-medium text-xs md:text-sm border rounded-md bg-gray-200 px-2 md:px-10 py-1 md:py-2 hover:bg-gray-300"
                      onClick={() => {
                        onSave(prop.values);
                      }}
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
                        <span>Save</span>
                      )}
                    </button>
                    <button
                      className="text-zinc-500"
                      onClick={(e) => {
                        e.preventDefault();
                        let con = window.confirm(
                          `Are you sure to delete ${props.part.partName} part?`
                        );
                        if (con) {
                          props.onDeletePart(props.part.id);
                        }
                      }}
                    >
                      <i
                        style={{ fontSize: "1.4rem" }}
                        className="fa fa-trash"
                        aria-hidden="true"
                      ></i>{" "}
                    </button>
                  </div>
                </div>
              </div>
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
    </>
  );
};

export default StoryForm;
