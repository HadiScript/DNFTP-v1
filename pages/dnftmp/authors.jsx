import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { BaseLayout } from "../../components";
import { UserContext } from "../../context";

const AllAuthors = () => {
  const [state] = useContext(UserContext)
  const [users, setUsers] = useState([]);
  const [topSellers, setTopSellers] = useState([]);
  const [sellerLoading, setSellerLoading] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchingTopSellers();
    fetchingAllUsers();
  }, []);

  const fetchingTopSellers = async () => {
    try {
      setSellerLoading(true);
      const { data } = await axios.get(`http://localhost:8000/api/top-sellers`);
      // console.log(data, "from requested users");
      setSellerLoading(false);
      setTopSellers(data);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  const fetchingAllUsers = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`http://localhost:8000/api/all-users`);
      // console.log(data, "from requested users");
      setLoading(false);
      setUsers(data);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  console.log(state, "checking state from authors page")

  return (
    <BaseLayout>
      <h4>Total Users {users.length}</h4>
      <br />
      <h3>All users</h3>
      {loading ? (
        <p>loading...</p>
      ) : (
        users.map((x) => (
          <div key={x.account}>
            {" "}
            <p>
              <Link href={`/users/${x.account}`}>
                <a>{x.account}</a>
              </Link>
            </p>{" "}
          </div>
        ))
      )}

      <br />
      <br />
      <h3>top sellers</h3>
      {sellerLoading ? (
        <p>loading...</p>
      ) : !topSellers ? (
        <p>no top sellers</p>
      ) : (
        topSellers.map((x) => (
          <div key={x.account}>
            {" "}
            <p>{x.account}</p>{" "}
          </div>
        ))
      )}
    </BaseLayout>
  );
};

export default AllAuthors;
