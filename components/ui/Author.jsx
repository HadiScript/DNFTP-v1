//@ts-nocheck

import moment from "moment";
import { useRouter } from "next/router";
import React, { useContext } from "react";
// import { Avatar, List } from "antd";
import Link from "next/link";
import { UserContext } from "../../context";

const Authors = ({ stu, handleFollow, handleUnfollow }) => {
  const [state] = useContext(UserContext);
  const router = useRouter();
  console.log(stu, "from authors");
  return (
    <>
      {stu.map((x) => (
        <div
          key={x._id}
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div>
            <Link href={`/user/${x.username}`}>
              <a>{x.account[2]}</a>
            </Link>
          </div>
          <div>
            {state && x.followers && x.followers.includes(state.user._id) ? (
              <span
                onClick={() => handleUnfollow(x)}
                className="text-primary cursor"
              >
                {" "}
                Unfollow{" "}
              </span>
            ) : (
              <span
                onClick={() => handleFollow(x)}
                className="text-primary pointer-cursor"
              >
                {" "}
                Follow{" "}
              </span>
            )}
          </div>
        </div>
      ))}
    </>
  );
};

export default Authors;
