//@ts-nocheck
import React, { useContext, useState } from "react";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { BaseLayout } from "../../components";
import CreatePostForm from "../../components/forms/CreatePostForm";
import Search from "../../components/ui/Search";
import { UserContext } from "../../context";

// import UserRoutes from '../../components/routes/UserRoutes';
// import { UserContext } from '../../context'
// import axios from 'axios';

// import { toast } from 'react-toastify'
// import PostList from '../../components/cards/PostList';
// import Students from '../../components/cards/Students';
// import Link from 'next/link';
// import { Modal, Pagination } from 'antd'
// import CommentForm from '../../components/forms/commentForm';
// import Search from '../../components/Search';

const Timeline = () => {
  const [state, setState] = useContext(UserContext);
  const [content, setContent] = useState("");
  const [image, setImage] = useState({});
  const [loadingImage, setLoadingImage] = useState(false);
  const [posts, setPosts] = useState([]);
  const router = useRouter();
  console.log(state, "before follow unfollow event")


  useEffect(()=>{}, [state])

  console.log(state, "after follow unfollow event")


  const postSubmit = async (e) => {
    e.preventDefault();
    console.log("post => ", content)
    console.log("post => ", state.user)

    try {
        const { data } = await axios.post(`http://localhost:8000/api/create-post`, {
            content, image, userID : state.user._id, userAcc : state.user.account
        }, { headers: { "Content-Type": "Application/json" } })
        // console.log(data)

        if (data.error) {
            toast.error(data.error)
        } else {
            // fetchNewsFeed()
            toast.success('Post has been created !!')
            setContent('')
            setImage({})
        }

    } catch (err) {
        console.log(err)
    }
  };
  
  return (
    <BaseLayout>
      <div className="container ">
        <div className="grid grid-flow-row-dense grid-cols-3 grid-rows-3 py-3">
          <div className="col-span-2">
            {
              // state && state.user && state.user.isConfirmed === 'confirmed' &&
              <CreatePostForm
                postSubmit={postSubmit}
                content={content}
                setContent={setContent}
                // handleImage={handleImage}
                loadingImage={loadingImage}
                image={image}
              />
            }
          </div>
          <div className="col-span-1">
            <Search />
            <br />
            {state && state.user&& state.user.following && (
              <Link href={"/user/following"}>
                <a className="h6"> {state.user.following.length} Following</a>
              </Link>
            )}
            {/* <Students handleFollow={handleFollow} stu={people} /> */}
          </div>
        </div>
      </div>
    </BaseLayout>
  );
};

export default Timeline;
