import { useState } from "react";
import { changePass } from "../../services/apiService";
import { toast } from "react-toastify";

const Password = () => {
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const handleChangePass = async (current_password, new_password) => {
    const data = await changePass(current_password, new_password);
    if (data && data.EC === 0) {
      toast.success(data.EM);
      setPassword("");
      setNewPassword("");
    }
    if (data && data.EC !== 0) {
      toast.error(data.EM);
    }
  };
  return (
    <div className="form-group pass-group">
      <label>Password (*)</label>
      <input
        type="text"
        className="form-control"
        value={password}
        onChange={(event) => setPassword(event.target.value)}
      />
      <label>New Password (*)</label>
      <input
        type="text"
        className="form-control"
        value={newPassword}
        onChange={(event) => setNewPassword(event.target.value)}
      />
      <div className="mt-3">
        <button
          className="btn btn-warning"
          onClick={() => {
            handleChangePass(password, newPassword);
          }}
        >
          Update
        </button>
      </div>
    </div>
  );
};
export default Password;
