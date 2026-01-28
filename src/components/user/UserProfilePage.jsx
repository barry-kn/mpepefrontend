import React, { useEffect, useState } from 'react';
import UserInfo from './UserInfo';
import OrderHistoryItemContainer from './OrderHistoryItemContainer';
import Spinner from "../ui/Spinner";
import api from "../../api";

const UserProfilePage = () => {
  const [userInfo, setUserInfo] = useState({});
  const [orderitems, setOrderitems] = useState([]);    // lowercase consistent name
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);

    api.get("/user_info/")
      .then((res) => {
        setUserInfo(res.data);
        setOrderitems(res.data.items || []);   // fallback to empty array
        setError(null);
      })
      .catch((err) => {
        console.error("Error fetching user info:", err.message);
        setError("Failed to load user information");
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <Spinner loading={loading} />;
  }

  return (
    <div className="container my-5">
      {error && <div className="alert alert-danger">{error}</div>}

      {!error && <UserInfo userInfo={userInfo} />}

      <OrderHistoryItemContainer orderitems={orderitems} />
    </div>
  );
};

export default UserProfilePage;
