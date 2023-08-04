// eslint-disable-next-line no-unused-vars
import React, { useContext } from "react";
import { Context } from "../main";
import Loader from "../components/Loader";

function Profile() {
  const { isAuthenticated, loading, user } = useContext(Context);

  return loading ? (
    <Loader />
  ) : (
    <div>
      <h1>{user?.name}</h1>
      <h2>{user?.email}</h2>
    </div>
  );
}

export default Profile;
