import React, { useEffect, useState } from "react";
import axios from "axios";
import BASE_URL from "../config";
import { Card, CardContent, Typography, Grid, CircularProgress, Grid2, IconButton, ThemeProvider, createTheme } from "@mui/material";
import { makeStyles } from "@mui/styles";
import EditIcon from "@mui/icons-material/Edit"; // Importing the Edit icon

// Custom styles
const useStyles = makeStyles((theme) => ({
  card: {
    borderRadius: "12px",
    boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
    transition: "transform 0.3s ease, box-shadow 0.3s ease",
    "&:hover": {
      transform: "scale(1.05)",
      boxShadow: "0 8px 12px rgba(0,0,0,0.2)",
    },
    position: "relative",
  },
  cardContent: {
    padding: "16px",
    textAlign: "center",
  },
  categoryImage: {
    width: "100px",
    height: "100px",
    objectFit: "contain",
    borderRadius: "50%",
    marginBottom: "12px",
  },
  categoryName: {
    fontWeight: "bold",
    color: "blueviolet",
  },
  editIcon: {
    position: "absolute",
    top: "10px",
    right: "10px",
    color: "blue", // Set color to blue
  },
}));

// Create a custom theme
const theme = createTheme({
  palette: {
    primary: {
      main: "#0000FF", // Blue color
    },
  },
});

const CategoryPage = () => {
  const classes = useStyles();
  const [categoryList, setCategoryList] = useState([]);
  const [loading, setLoading] = useState(true);

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
  }, []);

  const handleEditClick = (category) => {
    // Logic to handle editing, you can open a modal or navigate to an edit page
    console.log("Edit clicked for category:", category);
  };

  return (
    <ThemeProvider theme={theme}>
      <div style={{ padding: "20px" }}>
        <Typography variant="h4" gutterBottom align="center">
          Category List
        </Typography>
        <Grid2 container spacing={3} justifyContent="center">
          {loading ? (
            <Grid2 item xs={12} style={{ textAlign: "center" }}>
              <CircularProgress />
            </Grid2>
          ) : categoryList?.length > 0 ? (
            categoryList?.map((category, index) => (
              <Grid2 item xs={12} sm={6} md={4} key={index}>
                <Card className={classes.card}>
                  <CardContent className={classes.cardContent}>
                    <IconButton
                      className={classes.editIcon}
                      onClick={() => handleEditClick(category)} // Handling edit click
                    >
                      <EditIcon />
                    </IconButton>
                    <img
                      src={category?.category_photo_url?.path}
                      alt={category?.category_name}
                      className={classes.categoryImage}
                    />
                    <Typography variant="h6" className={classes.categoryName}>
                      {category.category_name}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid2>
            ))
          ) : (
            <Grid2 item xs={12}>
              <Typography variant="body1" color="textSecondary" align="center">
                No categories available.
              </Typography>
            </Grid2>
          )}
        </Grid2>
      </div>
    </ThemeProvider>
  );
};

export default CategoryPage;
