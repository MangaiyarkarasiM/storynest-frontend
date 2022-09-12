import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { GlobalContext } from "../../context/globalContext";

const catgry = [
  "Thriller",
  "Fantasy",
  "Humor",
  "Adventure",
  "Horror",
  "Fiction",
  "Mystery",
];

const storyFormValidation = Yup.object().shape({
  title: Yup.string().required("Please enter title"),
  coverImage: Yup.string().required("Provide cover image url"),
  desc: Yup.string().required("Please enter description of the story"),
  category: Yup.string().required("Select category"),
  status: Yup.string(),
});

const StoryForm = (props) => {
  let { message, spin, setSpin } = useContext(GlobalContext);
  let navigate = useNavigate();

  const onAddOrUpdateStory = (value) => {
    if(props.id){
      props.editStoryWithId(value, props.id);
    }else{
      props.addStory(value);
    }
  };

  const initialValues = props.id
    ? {
        title: props.story?.title ? props.story?.title : "",
        coverImage: props.story?.coverImage ? props.story?.coverImage : "",
        desc: props.story?.desc ? props.story?.desc : "",
        category: props.story?.category ? props.story?.category : "",
        status: props.story?.status ? props.story?.status : "",
      }
    : {};

  return (
    <>
      <Formik
        initialValues={initialValues}
        onSubmit={(value) => {
          setSpin(true);
          onAddOrUpdateStory(value);
        }}
        validationSchema={storyFormValidation}
        enableReinitialize={true}
      >
        {(prop) => {
          return (
            <Form className="flex flex-col items-center justify-center px-2 ">
              <div className="mb-10 w-3/4 sm:w-72 md:w-96 lg:w-9/12 xl:w-11/12">
                <label className="block mt-10 font-medium">Title</label>
                <Field
                  name="title"
                  type="text"
                  value={prop.values.title}
                  className="block border rounded-md border-gray-300 py-1 w-3/4 sm:w-72 md:w-96 lg:w-9/12 xl:w-11/12"
                  placeholder=" Enter story title"
                />
                <ErrorMessage
                  name="title"
                  render={(msg) => (
                    <small className="block text-red-500">{msg}</small>
                  )}
                />
              </div>
              <div className="mb-10 w-3/4 sm:w-72 md:w-96 lg:w-9/12 xl:w-11/12">
                <label className="block font-medium">Cover Image</label>
                <Field
                  name="coverImage"
                  type="text"
                  value={prop.values.coverImage}
                  className="block border rounded-md border-gray-300 py-1 w-3/4 sm:w-72 md:w-96 lg:w-9/12 xl:w-11/12"
                  placeholder=" Enter story cover image"
                />
                <ErrorMessage
                  name="coverImage"
                  render={(msg) => (
                    <small className="block text-red-500">{msg}</small>
                  )}
                />
              </div>
              <div className="mb-10 w-3/4 sm:w-72 md:w-96 lg:w-9/12 xl:w-11/12">
                <label className="block font-medium">Description</label>
                <Field
                  name="desc"
                  as="textarea"
                  value={prop.values.desc}
                  className="block border rounded-md border-gray-300 py-1 w-3/4 sm:w-72 md:w-96 lg:w-9/12 xl:w-11/12 sm:h-36 md:h-44"
                  placeholder=" Enter story description"
                />
                <ErrorMessage
                  name="desc"
                  render={(msg) => (
                    <small className="block text-red-500">{msg}</small>
                  )}
                />
              </div>
              <div className="mb-10 w-3/4 sm:w-72 md:w-96 lg:w-9/12 xl:w-11/12">
                <label className="block font-medium">Category</label>
                <Field
                  as="select"
                  name="category"
                  className="block border rounded-md border-gray-300 py-1 w-3/4 sm:w-72 md:w-96 lg:w-9/12 xl:w-11/12"
                >
                  <option value="" defaultChecked>
                    Select
                  </option>
                  {catgry?.map((cat) => {
                    return (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    );
                  })}
                </Field>
                <ErrorMessage
                  name="category"
                  render={(msg) => (
                    <small className="block text-red-500">{msg}</small>
                  )}
                />
              </div>
              <div className="mb-10 w-3/4 sm:w-72 md:w-96 lg:w-9/12 xl:w-11/12">
                <label className="block font-medium">Status</label>
                <Field
                  as="select"
                  name="status"
                  className="block border rounded-md border-gray-300 py-1 w-3/4 sm:w-72 md:w-96 lg:w-9/12 xl:w-11/12"
                >
                  <option value="" defaultChecked>
                    Select
                  </option>
                  <option value="ongoing">Ongoing</option>
                  <option value="complete">Complete</option>
                </Field>
                <ErrorMessage
                  name="status"
                  render={(msg) => (
                    <small className="block text-red-500">{msg}</small>
                  )}
                />
              </div>
              <div className="fixed top-0 py-2 bg-gray-100 w-full border-b h-10 md:h-16">
                <div className="flex px-2 md:px-5 pb-2 justify-between items-center">
                  <div className="flex gap-x-2 md:gap-x-4">
                    <button onClick={()=>{navigate('/mystories')}}>
                      <i className="fa fa-caret-left fa-2x md:fa-3x" aria-hidden="true"></i>
                    </button>
                    <div className="flex flex-col text-xs md:text-sm">
                      {props.id ? 
                        (<>
                          <div className="text-gray-600">Edit Story details</div>
                            <div className="font-medium md:text-lg capitalize">{props.story?.title}</div>
                            </>) : 
                        (<>
                        <div className="text-gray-600">Add Story info</div>
                      <div className="font-medium md:text-lg">Untitled Story</div>
                        </>)
                      }
                    </div>
                  </div>
                  <div className="flex gap-x-2">
                    <button
                      type="button"
                      onClick={()=>{navigate('/mystories')}}
                      className="block items-center font-medium text-xs md:text-sm border rounded-md bg-gray-200 px-2 md:px-10 py-1 md:py-2 hover:bg-gray-300"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="inline-flex items-center font-medium text-xs md:text-sm text-white border rounded-md bg-orange-600 px-2 md:px-10 py-1 md:py-2 hover:bg-orange-500"
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
                       props.id ? <span>Save</span> : <span>Submit</span>
                      )}
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
