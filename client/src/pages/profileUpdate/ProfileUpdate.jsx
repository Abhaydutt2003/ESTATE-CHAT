import "./style.scss";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { customFetch } from "../../api/axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { UploadImage } from "../../components";

const USER_REGEX = /^[a-zA-Z][a-zA-Z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

const ProfileUpdate = () => {
  const [isLoading ,setIsLoading] = useState(false);
  const { currentUser, updateUser } = useContext(AuthContext);
  const [avatar, setAvatar] = useState([]);
  console.log(avatar);
  const navigate = useNavigate();

  const handleSubmit = async(event) => {
    event.preventDefault();
    setIsLoading(true);
    const formData = new FormData(event.target);
    const {username,email,password} = Object.fromEntries(formData);

    const v1 = USER_REGEX.test(username);
    const v2 = PWD_REGEX.test(password);


    if (!v1) {
      toast.error(
        "Username should start with a letter, be 3-23 letters, numbers, hyphens, or underscores."
      );
      setIsLoading(false);
      return;
    } else if ( password !== "" && !v2) {
      toast.error(
        "Strong password required: 8-24 characters, mix uppercase & lowercase letters, numbers, and symbols."
      );
      setIsLoading(false);
      return;
    }

    try{
      const res = await customFetch.put(`/api/user/${currentUser.id}`,{
        username,
        password,
        email,
        avatar:avatar[0]
      });
      //console.log(res);
      updateUser(res.data.userInfo);
      toast.success('User information updated successfully');
      setIsLoading(false);
      navigate('/profile');
    }catch(error){
      setIsLoading(false);
      toast.error('Failed to update the user');
      return;
    }
  };

  return (
    <div className="profileUpdatePage">
      <div className="formContainer">
        <form onSubmit={handleSubmit}>
          <h1>Update Profile</h1>
          <div className="item">
            <label htmlFor="username">Username</label>
            <input
              id="username"
              name="username"
              type="text"
              defaultValue={currentUser.username}
            />
          </div>
          <div className="item">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              defaultValue={currentUser.email}
            />
          </div>
          <div className="item">
            <label htmlFor="password">Password</label>
            <input id="password" name="password" type="password" />
          </div>
          <button>Update</button>
        </form>
      </div>

      <div className="sideContainer">
        <img
          src={avatar[0] || currentUser.avatar || "/noavatar.jpg"}
          alt=""
          className="avatar"
        ></img>
        <UploadImage uwConfig = {{
          cloudName:'dsihfpv6p',
          uploadPreset:"estate-chat",
          multiple:'false',
          maxImageFileSize:3000000,
          folders:'avatars',
        }} setAvatar = {setAvatar}></UploadImage>
      </div>
    </div>
  );
};

export default ProfileUpdate;
