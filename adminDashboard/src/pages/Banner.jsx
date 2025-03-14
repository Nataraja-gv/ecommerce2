import React, { useEffect, useState } from "react";
import axios from "axios";
import BASE_URL from "../config";
import {
  Card,
  CardContent,
  Typography,
  Grid,
  CircularProgress,
  IconButton,
  Stack,
  Button,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { useDispatch, useSelector } from "react-redux";
import BannerDialog from "../sections/bannerDiaglog";

const BannerPage = () => {
  const [BannerList, setBannerList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [selectedBanner, setBannerCategory] = useState(null);
  const admin = useSelector((store) => store?.admin);

  const fetchBannerLists = async () => {
    try {
      const res = await axios.get(BASE_URL + "/banner/all", {
        withCredentials: true,
      });
      setBannerList(res?.data?.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      if (error.response && error.response.status === 401) {
        console.log("login");
      }
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBannerLists();
  }, [open, admin]);

  const handleEditClick = (banner) => {
    setBannerCategory(banner);
    setOpen(true);
  };
  const handleClickOpen = () => {
    setBannerCategory(null);
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  
  return (
    <div style={{ padding: "20px" }}>
      <Typography variant="h4" align="center" gutterBottom>
        Explore Banner
      </Typography>

      {/* Add Category Button */}
      <Stack
        direction="row"
        justifyContent="flex-end"
        mb={2}
        onClick={handleClickOpen}
      >
        <Button
          variant="contained"
          color="primary"
          sx={{ padding: "10px 20px" }}
        >
          Add Banner
        </Button>
      </Stack>

      <Grid container spacing={3} justifyContent="center">
        {loading ? (
          <Grid item xs={12} style={{ textAlign: "center" }}>
            <CircularProgress />
          </Grid>
        ) : BannerList?.length > 0 ? (
          BannerList?.map((banner, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card sx={{ borderRadius: 3, boxShadow: 2, overflow: "hidden" }}>
                <CardContent sx={{ position: "relative", padding: 2 }}>
                  <IconButton
                    sx={{
                      position: "absolute",
                      top: 8,
                      right: 8,
                      background: "white",
                    }}
                    onClick={() => handleEditClick(banner)}
                  >
                    <EditIcon />
                  </IconButton>
                  <img
                    src={
                      banner?.banner_images?.path ||
                      "https://png.pngtree.com/png-clipart/20240629/original/pngtree-small-round-icon-with-grocery-items-in-its-base-vector-png-image_15441987.png"
                    }
                    alt={"Banner Image"}
                    style={{
                      width: "100%",
                      height: "200px",
                      borderRadius: "8px",
                      marginBottom: "10px",
                    }}
                  />
                  <Typography variant="h6" textAlign="center" color="primary">
                    {banner?.category?.category_name}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))
        ) : (
          <Grid item xs={12}>
            <Typography variant="body1" color="textSecondary" align="center">
              No categories available.
            </Typography>
          </Grid>
        )}
      </Grid>

      {open && (
        <BannerDialog
          open={open}
          setOpen={setOpen}
          handleClose={handleClose}
          handleClickOpen={handleClickOpen}
          selectedBanner={selectedBanner}
        />
      )}
    </div>
  );
};

export default BannerPage;
