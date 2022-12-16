import axios from "axios";
import React, { useEffect, useState } from "react";
import { BaseLayout } from "../components";

const StatsDashboard = () => {
  const [totalTrans, setTotalTrans] = useState([]);
  const [createdTrans, setCreatedTrans] = useState([]);

  const fetchingAllTrans = async () => {
    try {
      const totalTransRes = await axios.get(
        `http://localhost:8000/api/transections`
      );
      setTotalTrans(totalTransRes.data);
      const createdTransRes = await axios.get(
        `http://localhost:8000/api/created-transections`
      );
      setCreatedTrans(createdTransRes.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchingAllTrans();
  }, []);

  return (
    <BaseLayout>
      {JSON.stringify(totalTrans)}
      {JSON.stringify(createdTrans)}
    </BaseLayout>
  );
};

export default StatsDashboard;
