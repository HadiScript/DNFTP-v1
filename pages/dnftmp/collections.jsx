//@ts-nocheck
import axios from "axios";
import React, { useEffect, useState } from "react";
import { BaseLayout } from "../../components";

const Collections = () => {
  const [NftCollections, setNftCollections] = useState([]);

  const fetchingAllNfts = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:8000/api/users-collections`
      );
      setNftCollections(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {fetchingAllNfts();}, [])

  return (
    <BaseLayout>
      <div>{JSON.stringify(NftCollections)}</div>
    </BaseLayout>
  );
};

export default Collections;
