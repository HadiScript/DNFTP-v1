//@ts-nocheck

import axios from "axios";
import { useRouter } from "next/router";
import React, { useContext, useEffect, useState } from "react";
import { BaseLayout } from "../../components";
import ProfileItems from "../../components/ui/ProfileItems";
import { UserContext } from "../../context";
import { useAccount } from "../../hooks/web3";

const UserOne = () => {
  const router = useRouter();
  const _id = router.query.creator;
  const { account } = useAccount();
  const [state, setState] = useContext(UserContext);

  const [currentUser, setCurrentUser] = useState({});

  const [creator, setCreator] = useState({
    ownedNfts: [],
    buyers: [],
  });
  const [loading, setloading] = useState(false);
  const [creatorNfts, setCreatorNfts] = useState({});

  // console.log(creator, "from creators");

  useEffect(() => {
    if (_id) {
      fetchingCreator();
      fetchingCurrentUser();
      fetchingCreatorNfts();
    }
  }, [_id]);

  const fetchingCurrentUser = async () => {
    try {
      const { data } = await axios.post(
        `http://localhost:8000/api/currentUser`,
        { account: account.data }
      );
      setCurrentUser(data);
    } catch (error) {
      console.log(error);
      setloading(false);
    }
  };

  const fetchingCreator = async () => {
    try {
      setloading(true);
      const { data } = await axios.get(
        `http://localhost:8000/api/creator/${_id}`
      );
      setCreator(data);
      setloading(false);
    } catch (error) {
      console.log(error);
      setloading(false);
    }
  };

  // user-nfts

  const fetchingCreatorNfts = async () => {
    try {
      const { data } = await axios.post(`http://localhost:8000/api/user-nfts`, {
        creator: _id,
      });
      setCreatorNfts(data);
    } catch (error) {
      console.log(error);
    }
  };

  const Follow = async () => {
    try {
      const { data } = await axios.put(
        `http://localhost:8000/api/user-follow`,
        {
          _id: creator._id,
          account: state.user._id,
        }
      );
      console.log(data, "handle follow response");

      // update localstrorage, keep toeken, update user
      let auths = JSON.parse(window.localStorage.getItem("auth"));
      console.log(auths, "from applicatio  localstorage")
      auths = data;

      localStorage.setItem("auth", JSON.stringify(auths));

      // update state,
      setState({ ...state, user: data });

      // update stuudents state,
      // let filtered = people.filter((i) => i._id !== user._id);
      // setPeople(filtered);

      // re render the postt in news feed
      fetchingCurrentUser();
      // toast.success(`following ${user.name}`);
    } catch (error) {
      console.log(error);
    }
  };

  const removeFollowHandle = async () => {
    try {
      const { data } = await axios.put(
        `http://localhost:8000/api/user-unfollow`,
        { _id: creator._id, account: state.user._id }
      );
      // update localstrorage, keep toeken, update user
      let auths = JSON.parse(window.localStorage.getItem("auth"));
      auths = data;

      localStorage.setItem("auth", JSON.stringify(auths));

      // update state,
      setState({ ...state, user: data });

      // update stuudents state,
      // let filtered = people.filter((i) => i._id !== user._id);
      // setPeople(filtered);

      // re render the postt in news feed
      fetchingCurrentUser();
      // toast.success(`unfollowed ${user.name}`);
    } catch (error) {
      console.log(error);
    }
  };

  return loading ? (
    <p>loading...</p>
  ) : (
    <BaseLayout>
      <ProfileItems
        currentAcc={account.data}
        currentUser={currentUser}
        creator={creator}
        creatorNfts={creatorNfts}
        Follow={Follow}
        UnFollow={removeFollowHandle}
      />
    </BaseLayout>
  );
};

export default UserOne;
