import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { getAllBanner } from "../../services/getAllBanner";
import Carousel from "../../components/carousel";

const Home = () => {
  const [bannerData, setBannerData] = useState([]);

  const fetchBanner = async () => {
    try {
      const res = await getAllBanner();
      setBannerData(res?.data);
    } catch (error) {
      toast.error(error?.message || error);
    }
  };

  useEffect(() => {
    fetchBanner();
  }, []);

  return (
    <div>
      <div className="mt-[20px]">
        <Carousel images={bannerData} />
      </div>
    </div>
  );
};

export default Home;