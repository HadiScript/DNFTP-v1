//@ts-nocheck
import axios from "axios";
import React, { useEffect, useState } from "react";
import { BaseLayout } from "../../components";
import { useAccount } from "../../hooks/web3";

const MyProfile = () => {
  const { account } = useAccount();
  const [myProfile, setmyProfile] = useState({});

  useEffect(() => {
    if (account && account.data) {
      fetecingMyProfile();
    }
  }, [account && account.data]);

  const fetecingMyProfile = async () => {
    try {
      const { data } = await axios.post(`http://localhost:8000/api/my-profile`, {
        account: account.data,
      });
      setmyProfile(data);
    } catch (error) {
      console.log(error);
    }
  };

  return <BaseLayout>{JSON.stringify(myProfile)}</BaseLayout>;
};

export default MyProfile;
