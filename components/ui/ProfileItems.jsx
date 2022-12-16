
//@ts-nocheck
import axios from "axios";
import React, { useContext } from "react";
import { UserContext } from "../../context";

const ProfileItems = ({
  creator,
  creatorNfts,
  currentAcc,
  currentUser,
  Follow,
  UnFollow,
}) => {
  const [state] = useContext(UserContext);

  const linkOrNot = creator.buyers.find((x) => x.buyer === currentAcc);
  let followOrunFollow;

  if (linkOrNot !== undefined) {
    followOrunFollow =
      creator.followers && creator.followers.includes(state._id);
  }

  // console.log(creator, "creator ");
  // console.log(currentAcc, "current account");
  // console.log(state, "its state");

  return (
    <>
      <div>UserOne</div>
      <br />
      Name: Hadi
      <br />
      _id : {creator._id}
      <br />
      <br />
      join : {creator.createdAt}
      <br />
      <br />
      {linkOrNot !== undefined && !followOrunFollow ? (
        <button
          onClick={Follow}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Link
        </button>
      ) : (
        ""
      )}
      {linkOrNot !== undefined && followOrunFollow ? (
        <button
          onClick={UnFollow}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          UnLink
        </button>
      ) : (
        ""
      )}
      <br />
      Account : {creator.account}
      <br />
      <br />
      Total Nfts that he created:{" "}
      {creatorNfts.length > 0 ? creatorNfts.length : "He havnt create any nft"}
      <br />
      <br />
      Total Nfts that he owned: {creator.ownedNfts.length}
      <br />
      <br />
      Number of buyers that he have:{" "}
      {creator.buyers.length > 0 && creator.buyers.length}
    </>
  );
};

export default ProfileItems;
