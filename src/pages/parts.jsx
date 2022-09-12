import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import fetchApi from "../utils/fetchApi";
import { GlobalContext } from "../context/globalContext";
import PartForm from "../components/Part/PartForm";

const PartsPage = () => {
  const { getStoryWithId, onAuthFail, createPart, getPartWithId } =
    useContext(GlobalContext);
  let { id, partId } = useParams();
  const [story, setStory] = useState({});
  const [part, setPart] = useState({});
  const navigate = useNavigate();

  async function getStoryAndPart(){
    setStory(await getStoryWithId(id));
    setPart(await getPartWithId(partId));
  }

  useEffect(() => {
    getStoryAndPart();
  }, [id, partId]);

  const onDeletePart = async (id) => {
    let token = sessionStorage.getItem("__token__");
    let res = await fetchApi.delete(`/parts/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    if (res.data.statusCode === 401) {
      onAuthFail();
    } else if (res.data.statusCode === 200) {
      navigate(`/mystories/${story.id}`);
      window.alert("Part deletion complete");
    } else {
      console.log(res.data.error);
    }
  };

  const editPartWithId = async(value,id, isPublish)=>{
    if(isPublish){
      value.status = part.status ==='published' ? 'draft' : 'published';
      value.isPublished = part.isPublished === true ? false : true;
    }
    let token = sessionStorage.getItem("__token__");
    let res = await fetchApi.put(`/parts/${id}`, value, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    if (res.data.statusCode === 401) {
      onAuthFail();
    } else if (res.data.statusCode === 200) {
      getStoryAndPart();
      window.alert("Part updated successfully");
    } else {
      console.log(res.data.error);
    }
  }

  return (
    <div className="sm:container sm:mx-auto">
      <div className="mt-20 bg-white w-full">
        <PartForm
          part={part}
          story={story}
          editPartWithId={editPartWithId}
          createPart={createPart}
          onDeletePart={onDeletePart}
        ></PartForm>
      </div>
    </div>
  );
};

export default PartsPage;
