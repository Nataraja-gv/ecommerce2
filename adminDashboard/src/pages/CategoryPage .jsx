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
import CategoryDialog from "../sections/CategoryDiaglog";

const CategoryPage = () => {
  const [categoryList, setCategoryList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null); 

    

  const fetchCategoryLists = async () => {
    try {
      const res = await axios.get(BASE_URL + "/category/all");
      setCategoryList(res?.data?.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategoryLists();
  }, [open]);

  const handleEditClick = (category) => {
    setSelectedCategory(category);
     setOpen(true);
  };
  const handleClickOpen = () => {
    setSelectedCategory(null)
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div style={{ padding: "20px" }}>
      <Typography variant="h4" align="center" gutterBottom>
        Explore Categories
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
          Add Category
        </Button>
      </Stack>

      <Grid container spacing={3} justifyContent="center">
        {loading ? (
          <Grid item xs={12} style={{ textAlign: "center" }}>
            <CircularProgress />
          </Grid>
        ) : categoryList?.length > 0 ? (
          categoryList?.map((category, index) => (
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
                    onClick={() => handleEditClick(category)}
                  >
                    <EditIcon />
                  </IconButton>
                  <img
                    src={
                      category?.category_photo_url?.path ||
                      "https://png.pngtree.com/png-clipart/20240629/original/pngtree-small-round-icon-with-grocery-items-in-its-base-vector-png-image_15441987.png"
                    }
                    alt={category?.category_name || "Category Image"}
                    style={{
                      width: "100%",
                      height: "200px",
                      borderRadius: "8px",
                      marginBottom: "10px",
                    }}
                  />
                  <Typography variant="h6" textAlign="center" color="primary">
                    {category.category_name}
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
        <CategoryDialog
          open={open}
          setOpen={setOpen}
          handleClose={handleClose}
          handleClickOpen={handleClickOpen}
          selectedCategory={selectedCategory}
        />
      )}
    </div>
  );
};

export default CategoryPage;
