import { Modal, Tab, Tabs } from "react-bootstrap";
import UserInfo from "./UserInfo";
import Password from "./Password";
import History from "./History";

const Profile = (props) => {
  const { show, setShow } = props;
  const handleClose = () => {
    setShow(false);
  };
  return (
    <>
      <Modal
        show={show}
        onHide={handleClose}
        size="xl"
        backdrop="static"
        className="modal-profile"
      >
        <Modal.Header closeButton>
          <Modal.Title>Profile</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Tabs
            defaultActiveKey="profile"
            id="uncontrolled-tab-example"
            className="mb-3"
          >
            <Tab eventKey="home" title="Info">
              <UserInfo />
            </Tab>
            <Tab eventKey="profile" title="Pass">
              <Password />
            </Tab>
            <Tab eventKey="history" title="History">
              <History />
            </Tab>
          </Tabs>
        </Modal.Body>
      </Modal>
    </>
  );
};
export default Profile;
