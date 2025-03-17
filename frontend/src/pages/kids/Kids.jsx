import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { getAllBanner } from "../../services/getAllBanner";
import Carousel from "../../components/carousel";

const Womens = () => {
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

   

  const KidsBanner = bannerData.filter(
    (images) => images.category?.category_name === "kids"
  );

  return (
    <div>
      <div className=" mt-[20px]">
        <Carousel images={KidsBanner} />
      </div>
    </div>
  );
};

export default Womens;
