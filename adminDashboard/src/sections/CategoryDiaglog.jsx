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
import { useState, useEffect } from "react";
import axios from "axios";
import BASE_URL from "../config";
import { useSelector } from "react-redux";

// Custom styled dialog
const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

export default function CategoryDialog({
  open,
  handleClose,
  selectedCategory,
}) {
  const [categoryName, setCategoryName] = useState("");
  const [categoryPhoto, setCategoryPhoto] = useState(null);
  const admin = useSelector((store) => store?.admin);

  useEffect(() => {
    if (selectedCategory) {
      setCategoryName(selectedCategory.category_name || "");
      setCategoryPhoto(selectedCategory.category_photo_url || null);
    }
  }, [selectedCategory]);

  const handleCategoryNameChange = (event) => {
    setCategoryName(event.target.value);
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setCategoryPhoto(file);
    }
  };

  const handleSave = async () => {
    try {
      const formData = new FormData();
      formData.append("category_name", categoryName);

      if (categoryPhoto instanceof File) {
        formData.append("category_photo_url", categoryPhoto);
      } else if (typeof categoryPhoto === "string" || categoryPhoto?.path) {
        formData.append("category_photo_url", JSON.stringify(categoryPhoto));
      }

      const endpoint = selectedCategory
        ? `/category/edit?_id=${selectedCategory._id}`
        : "/category/new";

      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      };
      if (selectedCategory) {
        await axios.patch(BASE_URL + endpoint, formData, config);
      } else {
        await axios.post(BASE_URL + endpoint, formData, config);
      }

      handleClose();
    } catch (error) {
      console.error("Error uploading category:", error);
    }
  };

  return (
    <React.Fragment>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
          {selectedCategory ? "Edit Category" : "Add Category"}
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
          <Typography gutterBottom>
            Please enter the category details below.
          </Typography>

          {/* Category Name TextField */}
          <TextField
            label="Category Name"
            fullWidth
            value={categoryName}
            onChange={handleCategoryNameChange}
            sx={{ marginBottom: 2 }}
          />

          <Button variant="contained" component="label" fullWidth>
            Upload Category Image
            <input
              type="file"
              hidden
              accept="image/*"
              onChange={handleImageChange}
            />
          </Button>

          {categoryPhoto && (
            <img
              src={
                typeof categoryPhoto?.path === "string"
                  ? categoryPhoto?.path
                  : URL.createObjectURL(categoryPhoto)
              }
              alt="Category Preview"
              style={{
                marginTop: 16,
                width: "100%",
                height: "200px",
                objectFit: "cover",
              }}
            />
          )}
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose}>
            Cancel
          </Button>
          <Button autoFocus onClick={handleSave}>
            {selectedCategory ? "Save" : "Add"}
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </React.Fragment>
  );
}
