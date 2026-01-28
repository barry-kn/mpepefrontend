import React from "react";
import styles from "./UserInfo.module.css";
import pic from "../../assets/Pinterest Frames Aesthetic.jpeg";

const UserInfo = ({ userInfo }) => {
  return (
    <div className="row mb-4">
      {/* Profile Card */}
      <div className={`col-md-3 py-3 card text-center ${styles.textCenter}`}>
        <img
          src={pic}
          alt="User Profile"
          className={`img-fluid rounded-circle mb-3 mx-auto ${styles.profileImage}`}
        />
        <h4>
          {`${userInfo.first_name || ''} ${userInfo.last_name || ''}`.trim() || 'User'}
        </h4>
        <p className="text-muted">{userInfo.email || "No email provided"}</p>
        <button
          className="btn mt-2"
          style={{ backgroundColor: "#6050DC", color: "white" }}
        >
          Edit Profile
        </button>
      </div>

      {/* Account Overview Card */}
      <div className="col-md-9">
        <div className="card">
          <div
            className="card-header"
            style={{ backgroundColor: "#6050DC", color: "white" }}
          >
            <h5>Account Overview</h5>
          </div>
          <div className="card-body">
            <div className="row">
              <div className="col-md-6">
                <p><strong>Full Name:</strong> {`${userInfo.first_name || ''} ${userInfo.last_name || ''}`.trim() || 'N/A'}</p>
                <p><strong>Email:</strong> {userInfo.email || 'N/A'}</p>
                <p><strong>Phone:</strong> {userInfo.phone || 'Not provided'}</p>
              </div>
              <div className="col-md-6">
                <p><strong>City:</strong> {userInfo.city || 'Not specified'}</p>
                <p><strong>Country:</strong> {userInfo.state || 'Not specified'}</p>
                <p><strong>Username:</strong> {userInfo.username || 'N/A'}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserInfo;
