import React, { useState } from "react";
import {Card, CardContent,CardMedia,Grid,Typography,IconButton,Divider,Box,} from "@mui/material";
import { serverURL } from "../../services/FetchNodeServices";
import ClearIcon from "@mui/icons-material/Clear";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

export default function CartProductsComponent() {
  const [hoveredProductId, setHoveredProductId] = useState(null);

  const [products, setProducts] = useState([
    {
      id: 1,
      name: "Threadbare Sheila mini shirt dress",
      price: 9.5,
      originalPrice: 19.0,
      color: "Sage Green",
      size: "UK 6",
      quantity: 1,
      icon: "delivery.png",
    },
    {
      id: 2,
      name: "Brave Soul relaxed fit t-shirt",
      price: 7.5,
      size: "UK 5",
      color: "Black",
      quantity: 1,
      icon: "secure.png",
    },
    {
      id: 3,
      name: "Threadbare Sheila mini shirt dress",
      price: 9.5,
      originalPrice: 19.0,
      color: "Sage Green",
      size: "UK 6",
      quantity: 1,
      icon: "delivery.png",
    },
    {
      id: 4,
      name: "Brave Soul relaxed fit t-shirt",
      price: 7.5,
      size: "UK 5",
      color: "Black",
      quantity: 1,
      icon: "secure.png",
    },
  ]);

  const handleRemoveItem = (id) => {
    const filteredProducts = products.filter((item) => item.id !== id);
    setProducts(filteredProducts);
  };

  var showItems = () => {
    return products.map((item) => {
      return (
        <Grid item xs={12} key={item.id}>
          <Card>
            <CardContent>
              <Grid container spacing={2} alignItems="center" style={{display:'flex',flexDirection:'row'}}>
                {/* Image Section */}
                <Grid item xs={4}>
                  <CardMedia
                    component="img"
                    image={`${serverURL}/images/${item.icon}`}
                    alt={item.name}
                    style={{ maxWidth: "10vw" }} // Adjusted image size
                  />
                </Grid>

                {/* Product Info */}
                <Grid item xs={7}>
                  <Typography
                    variant="h6"
                    sx={{
                      color: "#d63031",
                      fontWeight: "bold",
                      fontSize: "1.2vw",
                    }}
                  >
                    ₹{item.price}
                    {item.originalPrice && (
                      <Typography
                        component="span"
                        sx={{
                          textDecoration: "line-through",
                          color: "grey",
                          fontSize: "0.9vw",
                          marginLeft: 1,
                        }}
                      >
                        ₹{item.originalPrice}
                      </Typography>
                    )}
                  </Typography>

                  <Typography
                    variant="body1"
                    sx={{ fontSize: "1vw", fontWeight: 500 }}
                  >
                    {item.name}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      color: "grey",
                      fontSize: "0.9vw",
                      marginTop: 0.5,
                    }}
                  >
                    {item.color} | {item.size}
                  </Typography>

                  {/* Save for Later */}
                  <Box sx={{ border: "1px solid #bdc3c7", display: "flex", alignItems:'center', width: { xs: "37%", sm: "28%" }, marginTop: '5px',
                      padding: 0.5,
                      cursor: "pointer",marginRight:'2px',marginLeft:'2px'
                    }}
                    onMouseEnter={() => setHoveredProductId(item.id)}
                    onMouseLeave={() => setHoveredProductId(null)}
                  >
                    {hoveredProductId === item.id ? (
                      <FavoriteIcon style={{fontSize:"0.9vw"}} />
                    ) : (
                      <FavoriteBorderIcon style={{fontSize:"0.9vw"}} />
                    )}
                    <Typography variant="caption" sx={{ marginLeft: '5px', fontSize: "0.8vw" }}>
                      Save for later
                    </Typography>
                  </Box>
                </Grid>

                {/* Remove Icon */}
                <Grid item xs={1} style={{alignSelf: "flex-start", textAlign: "right"}} >
                  <IconButton onClick={() => handleRemoveItem(item.id)}>
                    <ClearIcon style={{fontSize:'1.4vw',}} />
                  </IconButton>
                </Grid>
              </Grid>
            </CardContent>

            {/* Divider */}
            <Divider sx={{ width: "90%", margin: "auto" }} />
          </Card>
        </Grid>
      );
    });
  };

  return (
    <div style={{ width: "54%" }}>
      {/* MY BAG Section */}
      <div style={{ background: "#ffffff", padding: "1.2rem" }}>
        <Grid container alignItems="center" justifyContent="space-between">
          <Grid item xs={6}>
            <Typography
              style={{
                fontWeight: "bold",
                fontSize: "1.4vw",
                lineHeight: "1.2",
              }}
            >
              MY BAG
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography
              style={{
                fontSize: "0.9vw",
                color: "grey",
                textAlign: "right",
                lineHeight: "1.2",
              }}
            >
              Items reserved for 60 minutes
            </Typography>
          </Grid>
        </Grid>
      </div>

      {/* Product Items */}
      <div style={{ marginTop: "1vw", background: "#ffffff" }}>
        {showItems()}
      </div>
    </div>
  );
}
