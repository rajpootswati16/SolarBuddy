import React from "react";
import {
  Box,
  Typography,
  Button,
  Divider,
  Grid,
  Tooltip,
} from "@mui/material";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import { serverURL } from "../../services/FetchNodeServices";

export default function PaymentDetailsComponent() {
  return (
    <Box
      sx={{
        width: "23%",
        border: "1px solid #e0e0e0",
        height:'22%',
        padding: "2vw",
        backgroundColor: "#fff",
        marginLeft:'2vw'
      }}
    >
      {/* Total Section */}
      <Typography
        variant="h6"
        sx={{ fontWeight: "bold", fontSize:'1.5vw',marginBottom:'0.5vw' }}
      >
        TOTAL
      </Typography>
      <Divider style={{marginBottom:'1vw'}} />
      {/* Sub-total & Delivery */}
      <Grid container justifyContent="space-between" sx={{ marginBottom: "1vw" }}>
        <Typography
          variant="body1"
          sx={{ fontWeight: "bold", fontSize: "1vw" }}
        >
          Sub-total
        </Typography>
        <Typography
          variant="body1"
          sx={{ fontWeight: "bold", fontSize: "1vw" }}
        >
          £17.00
        </Typography>
      </Grid>

      <Grid container justifyContent="space-between" alignItems="center">
        <Typography
          variant="body1"
          sx={{ fontWeight: "bold", fontSize: "1vw" }}
        >
          Delivery
        </Typography>
        <Tooltip title="Delivery charges will apply as per location.">
          <InfoOutlinedIcon fontSize="small" color="disabled" />
        </Tooltip>
      </Grid>

      {/* Divider */}
      <Divider sx={{ my: "1.5vw" }} />

      {/* Checkout Button */}
      <Button
        variant="contained"
        fullWidth
        sx={{
          backgroundColor: "#007f3b",
          color: "#fff",
          fontWeight: "bold",
          "&:hover": { backgroundColor: "#005f2a" },
          fontSize:'1vw'
        }}
      >
        CHECKOUT
      </Button>

      {/* Accepted Payment Methods */}
      <Box sx={{ marginTop: "2vw",width:'30vw',height:'3vw' }}>
        <Typography
          variant="body1"
          sx={{ fontWeight: "bold", marginBottom: "0.5vw",fontSize:'0.9vw' }}
        >
          WE ACCEPT:
        </Typography>

        {/* Payment Logos */}
        <div style={{ display: 'flex',justifyContent:'flex-start', }}>
          <img alt='' src={`${serverURL}/images/payment.png`} style={{width:'55%', height:'1.3vw'}}/>
        </div>
      </Box>

      {/* Discount Code */}
      <Typography
        variant="body2"
        sx={{ marginTop: "1vw", textAlign: "left", color: "grey",fontWeight:'300',fontSize:'0.9vw' }}
      >
        Got a discount code? Add it in the next step.
      </Typography>
    </Box>
  );
}
