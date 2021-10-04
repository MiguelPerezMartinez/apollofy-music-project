import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router";

import withAuth from "../../hoc/withAuth";
import BarsAndModal from "../../hoc/BarsAndModal";

// List types
const MY_TRACKS = "/my-tracks";
const FAVOURITE_TRACKS = "/favourite-tracks";

function ElementsList() {
  // To check the current page
  const { location } = useHistory();
  const { pathname } = location;

  // To check the userId
  const userData = useSelector((state) => state.userReducer);
  console.log(userData);
  const [listType, setListType] = useState("");

  useEffect(() => {
    if (pathname === MY_TRACKS) setListType(MY_TRACKS);
    else if (pathname === FAVOURITE_TRACKS) setListType(FAVOURITE_TRACKS);
  }, [pathname]);

  return (
    <main className="">
      {listType === MY_TRACKS && <h1>My tracks</h1>}
      {listType === FAVOURITE_TRACKS && <h1>Favourite tracks</h1>}
    </main>
  );
}

export default withAuth(BarsAndModal(ElementsList));
