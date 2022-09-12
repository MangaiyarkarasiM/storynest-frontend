import "./App.css";
import { useEffect, useState } from "react";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import { GlobalProvider } from "./context/globalContext";
import fetchApi from "./utils/fetchApi";
import HomePage from "./pages/home";
import LoginPage from "./pages/login";
import SignupPage from "./pages/signup";
import Navbar from "./components/Navbar/Navbar";
import ProfilePage from "./pages/profile";
import StoriesPage from "./pages/stories";
import SearchPage from "./pages/search";
import MystoriesPage from "./pages/mystories";
import NewStoryPage from "./pages/newstory";
import StoryPage from "./pages/story";
import PartsPage from "./pages/parts";
import ViewStoryPage from "./pages/viewstory";
import Footer from "./components/Footer/Footer";
import ViewPartPage from "./pages/viewpart";

const exclusionArray = ['/', '/login', '/signup', '/mystories/'];
const footerExclusionArray = ['/', '/login', '/signup'];

function App() {
  let [message, setMessage] = useState("");
  const [user, setUser] = useState({});
  const [spin, setSpin] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    let user_id = sessionStorage.getItem("__user_id__");
    let token = sessionStorage.getItem("__token__");
    let role = sessionStorage.getItem("__role__");
    user_id === null || token === null || role === null
      ? navigate("/login")
      : setUser({ user_id, token, role });
  }, []);

  const onLogin = async (value) => {
    let res = await fetchApi.post("/users/login", { ...value });
    if (res.data.statusCode === 200) {
      sessionStorage.setItem("__user_id__", res.data.user_id);
      sessionStorage.setItem("__token__", res.data.token);
      sessionStorage.setItem("__role__", res.data.role);
      setUser({
        user_id: res.data.user_id,
        token: res.data.token,
        role: res.data.role,
      });
      setMessage("");
      setSpin(false);
      navigate("/home");
    } else {
      setSpin(false);
      setMessage(res.data.message);
    }
  };

  const getUserWithUserId = async (id)=>{
    let res = await fetchApi.get(`/users/${id}`);
    if (res.data.statusCode === 200) {
      setMessage("");
      setSpin(false);
      return res.data.user;
    } else {
      setSpin(false);
      setMessage(res.data.message);
    }
  }

  const onSignOut = ()=>{
    sessionStorage.clear();
    navigate('/login');
  }

  const onAuthFail =()=>{
    window.alert('Your session has ended. Please login again to authenticate');
    setSpin(false);
    navigate('/login');
  }

  const onEditProfile = async(value,id)=>{
    let res = await fetchApi.put(`/users/${id}`,value, {
      headers: {
        "Authorization" : `Bearer ${user.token}`,
        'Content-Type': 'application/json'
      }
    });
    if(res.data.statusCode === 401){
      onAuthFail();
    }else if (res.data.statusCode === 200) {
      setMessage("");
      window.alert('Profile details updated successfully');
    } else {
      setMessage(res.data.message);
    }
    setSpin(false);
  }

  const editStoryWithId = async(value,id)=>{
    let res = await fetchApi.put(`/stories/${id}`,value, {
      headers: {
        "Authorization" : `Bearer ${user.token}`,
        'Content-Type': 'application/json'
      }
    });
    if(res.data.statusCode === 401){
      onAuthFail();
    }else if (res.data.statusCode === 200) {
      setMessage("");
      window.alert('Story details updated successfully');
    } else {
      setMessage(res.data.message);
    }
    setSpin(false);
  }

  const addStory = async(value)=>{
    let data = {...value};
    data.author = user.user_id;
    let res = await fetchApi.post('stories/create',data, {
      headers: {
        "Authorization" : `Bearer ${user.token}`,
        'Content-Type': 'application/json'
      }
    });
    if(res.data.statusCode === 401){
      onAuthFail();
    }else if (res.data.statusCode === 200) {
      setMessage("");
      window.alert('Story created successfully');
      navigate('/mystories');
    } else {
      setMessage(res.data.message);
    }
    setSpin(false);
  }

  const getAllStories = async()=>{
    let token = sessionStorage.getItem("__token__");
    let res = await fetchApi.get('/stories', {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    if (res.data.statusCode === 401) {
      onAuthFail();
    } else if (res.data.statusCode === 200) {
      return res.data.stories;
    } else {
      console.log(res.data.error);
    }
  }

  async function getStoryWithId(id) {
    let token = sessionStorage.getItem("__token__");
    let res = await fetchApi.get(`/stories/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    if (res.data.statusCode === 401) {
      onAuthFail();
    } else if (res.data.statusCode === 200) {
      return res.data.story;
    } else {
      console.log(res.data.error);
    }
  }

  const createPart = async(story)=>{
    let data = {
      partName: `Untitled Part ${story.parts.length+1}`,
      story_id: story.id
    }
    let res = await fetchApi.post('/parts/create',data,{
      headers: {
        "Authorization" : `Bearer ${user.token}`,
        'Content-Type': 'application/json'
      }
    });
    if(res.data.statusCode === 401){
      onAuthFail();
    }else if (res.data.statusCode === 200) {
      navigate(`/mystories/${story.id}/write/${res.data.part.id}`);
    } else {
      console.log(res.data);
      setMessage(res.data.message);
    }
  }

  async function getPartWithId(partId) {
    let token = sessionStorage.getItem("__token__");
    let res = await fetchApi.get(`/parts/${partId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    if (res.data.statusCode === 401) {
      onAuthFail();
    } else if (res.data.statusCode === 200) {
      return res.data.part;
    } else {
      console.log(res.data.error);
    }
  }
  
  const onDeletePart = async (id) => {
    //console.log(id);
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
      getStoryWithId();
      window.alert("Part deletion complete");
    } else {
      console.log(res.data.error);
    }
  };

  return (
    <GlobalProvider value={{ user, onAuthFail, message, setMessage, onLogin, onSignOut, addStory, editStoryWithId, getAllStories, getStoryWithId, createPart, getPartWithId, onDeletePart, getUserWithUserId, onEditProfile, spin, setSpin }}>
      {exclusionArray.indexOf(location.pathname.slice(0,11)) < 0 && <Navbar/>}
      <Routes>
        <Route path="/login" element={<LoginPage />}></Route>
        <Route path="/signup" element={<SignupPage />}></Route>
        <Route path="/home" element={<HomePage />}></Route>
        <Route path="/mystories" element={<MystoriesPage />}></Route>
        <Route path="/mystories/new" element={<NewStoryPage />}></Route>
        <Route path="/mystories/:id" element={<StoryPage />}></Route>
        <Route path="/mystories/:id/write/:partId" element={<PartsPage />}></Route>
        <Route path="/stories/:category" element={<StoriesPage/>}></Route>
        <Route path="/story/:id" element={<ViewStoryPage/>}></Route>
        <Route path="/viewstory/:id" element={<ViewPartPage/>}></Route>
        <Route path="/search/:searchString" element={<SearchPage/>}></Route>
        <Route path="/user/:id" element={<ProfilePage/>}></Route>
        <Route path="/" element={<LoginPage />}></Route>
      </Routes>
      {footerExclusionArray.indexOf(location.pathname) < 0 && <Footer/>}
    </GlobalProvider>
  );
}

export default App;
