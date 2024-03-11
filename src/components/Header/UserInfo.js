import _ from "lodash";
import { useEffect, useState } from "react";
import { FcPlus } from "react-icons/fc";
import { useDispatch, useSelector } from "react-redux";
import { updateProfile } from "../../services/apiService";
import { toast } from "react-toastify";
import { doUpdate } from "../../redux/action/userActons";

const UserInfo = () => {
  const account = useSelector((state) => state.user.account);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [role, setRole] = useState("USER");
  const [image, setImage] = useState("");
  const [previewImage, setPreviewImage] = useState("");

  const dispatch = useDispatch();

  useEffect(() => {
    if (account && !_.isEmpty(account)) {
      setEmail(account.email);
      setUsername(account.username);
      setRole(account.role);
      setImage("");
      if (account.image) {
        setPreviewImage(`data:image/jpeg;base64,${account.image}`);
      }
    }
  }, [account]);
  const handleUploadImage = (event) => {
    if (event.target && event.target.files && event.target.files[0]) {
      setPreviewImage(URL.createObjectURL(event.target.files[0]));
      setImage(event.target.files[0]);
    } else {
    }
  };
  const handleUpdate = async (username, userImage) => {
    const data = await updateProfile(username, userImage);
    if (data && data.EC === 0) {
      toast.success(data.EM);
      //   dispatch(doUpdate({ username, userImage }));
      //   localStorage.removeItem("access_token");
    }
    if (data && data.EC !== 0) {
      toast.error(data.EM);
    }
  };
  return (
    <div className="user-infor-container">
      <div className="row g-3">
        <div className="col-md-4">
          <label className="form-label">Username</label>
          <input
            type="text"
            className="form-control"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="col-md-4">
          <label className="form-label">Email</label>
          <input
            disabled
            type="email"
            className="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="col-md-4">
          <label className="form-label">Role</label>
          <select
            disabled
            className="form-select"
            value={role}
            onChange={(e) => setRole(e.target.value)}
          >
            <option value="USER">USER</option>
            <option value="ADMIN">ADMIN</option>
          </select>
        </div>
        <div className="col-md-12">
          <label className="form-label label-upload" htmlFor="labelUpload">
            <FcPlus />
            Upload File Image
          </label>
          <input
            type="file"
            id="labelUpload"
            hidden
            onChange={(event) => handleUploadImage(event)}
          />
        </div>
        <div className="col-md-12 img-preview">
          {previewImage ? (
            <img src={previewImage} />
          ) : (
            <span>Preview Image</span>
          )}
        </div>
        <div className="mt-3">
          <button
            className="btn btn-warning"
            onClick={() => {
              handleUpdate(username, image);
            }}
          >
            Update
          </button>
        </div>
      </div>
    </div>
  );
};
export default UserInfo;
