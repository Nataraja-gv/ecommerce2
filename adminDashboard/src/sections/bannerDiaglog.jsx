import * as React from "react";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";  
import FormControl from "@mui/material/FormControl";  
import InputLabel from "@mui/material/InputLabel";  
import Select from "@mui/material/Select"; // Added import
import MenuItem from "@mui/material/MenuItem"; // Added import
import { useState, useEffect } from "react";
import axios from "axios";
import BASE_URL from "../config";
import { useSelector } from "react-redux";
import Radio from "@mui/material/Radio";  // Import Radio
import RadioGroup from "@mui/material/RadioGroup";  // Import RadioGroup
import FormControlLabel from "@mui/material/FormControlLabel";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
    height: "300px",
    overflowY: "auto",
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
  "& .MuiDialog-paper": {
    width: "600px",
    maxWidth: "600px",
  },
}));

export default function BannerDialog({ open, handleClose, selectedBanner }) {
  const [bannerData, setBannerData] = useState({
    banner_images: null,
    category: "",
    status: true,
  });

   
  
  const [categoryList, setCategoryList] = useState([]);
  const admin = useSelector((store) => store?.admin);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setBannerData((prevState) => ({
        ...prevState,
        banner_images: file,
      }));
    }
  };

  const fetchCategoryLists = async () => {
    try {
      const res = await axios.get(BASE_URL + "/category/all", {
        withCredentials: true,
      });
      setCategoryList(res?.data?.data);
    } catch (error) {
      console.log(error);
      if (error.response && error.response.status === 401) {
        console.log("login");
      }
    }
  };

  useEffect(() => {
    if (selectedBanner) {
      setBannerData({
        banner_images: selectedBanner?.banner_images,
        category: selectedBanner?.category?._id,
        status: selectedBanner?.status,
      });
    } else {
      setBannerData({
        banner_images: null,
        category: "",
        status: true,
      });
    }
    fetchCategoryLists();
  }, [open, selectedBanner]);

  const handleSave = async () => {
    try {
      const formData = new FormData();
      formData.append("category", bannerData?.category);
      formData.append("status", bannerData?.status); 

      if (bannerData?.banner_images instanceof File) {
        formData.append("banner_images", bannerData?.banner_images);
      } else if (typeof bannerData?.banner_images === "string") {
        formData.append(
          "banner_images",
          JSON.stringify(bannerData?.banner_images)
        );
      }
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
        params:{_id:selectedBanner?._id}
      };

      if(selectedBanner){
        await axios.patch(BASE_URL + "/banner/edit", formData,config);
      }
      else {
        await axios.post(BASE_URL + "/banner/new", formData,config);
      }

      handleClose();
    } catch (error) {}
  };

  return (
    <React.Fragment>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
          {selectedBanner ? "Edit Banner" : "Add Banner"}
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={(theme) => ({
            position: "absolute",
            right: 8,
            top: 8,
            color: theme.palette.grey[500],
          })}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent dividers>
          <Button variant="contained" component="label" fullWidth>
            Upload Banner Image
            <input
              type="file"
              hidden
              accept="image/*"
              onChange={handleImageChange}
            />
          </Button>
          {bannerData?.banner_images && (
            <img
              src={
                typeof bannerData?.banner_images?.path === "string"
                  ? bannerData?.banner_images?.path
                  : URL.createObjectURL(bannerData?.banner_images)
              }
              alt="Banner Preview"
              style={{
                marginTop: 16,
                width: "100%",
                height: "200px",
                objectFit: "cover",
              }}
            />
          )}

          <Box sx={{ minWidth: 120, marginTop: "15px" }}>
            <FormControl fullWidth>
              <InputLabel id="category-select-label">
                Banner category
              </InputLabel>
              <Select
                labelId="category-select-label"
                id="category-select"
                value={bannerData?.category}
                label="Category"
                onChange={(e) =>
                  setBannerData({ ...bannerData, category: e.target.value })
                }
              >
                {categoryList?.map((list, index) => (
                  <MenuItem key={index} value={list?._id}>
                    {list?.category_name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
          {selectedBanner && (
            <Box sx={{ marginTop: "20px" }}>
              <Typography>Status</Typography>
              <FormControl component="fieldset">
                <RadioGroup
                  row
                  value={bannerData.status.toString()}
                  onChange={(e) => setBannerData({ ...bannerData, status: e.target.value === "true" })}
                >
                  <FormControlLabel
                    value="true"
                    control={<Radio />}
                    label="Active"
                  />
                  <FormControlLabel
                    value="false"
                    control={<Radio />}
                    label="Inactive"
                  />
                </RadioGroup>
              </FormControl>
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose}>
            Cancel
          </Button>
          <Button autoFocus onClick={handleSave}>
            {selectedBanner ? "Save" : "Add"}
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </React.Fragment>
  );
}
