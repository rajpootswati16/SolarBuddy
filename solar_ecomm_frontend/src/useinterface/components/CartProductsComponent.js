import React, {useState} from 'react'
import { Card, CardContent, CardMedia, Grid,Typography,TextField } from '@mui/material'
import { serverURL } from '../../services/FetchNodeServices'
import PlusMinusComponent from './PlusMinusComponent'

export default function CartProductsComponent() {
    const [cartProducts, setCartProducts] = useState([])

    var products=[
    {id: 1,name: 'Threadbare Sheila mini shirt dress',price: 9.50,originalPrice: 19.00,color: 'sage green',size: 'UK 6',quantity: 1,icon:'delivery.png'},
    {id: 2,name: 'Brave Soul relaxed fit t-shirt',price: 7.50,color: 'black',quantity: 1,icon:'secure.png'}]


    var showItems=()=>{
        return products.map((item)=>{
            return <Grid item xs={12} key={item.id}>
                <Card >
                    <CardContent >
                        <Grid container spacing={2}>
                            <Grid item xs={4} md={3}>
                                <CardMedia component="img" image={`${serverURL}/images/${item.icon}`} alt={item.name} />
                            </Grid>

                            <Grid item xs={12} md={9}>
                            <Typography variant="subtitle1" gutterBottom>
                    {item.name}
                  </Typography>
                  <Typography variant="body2" gutterBottom>
                    {item.originalPrice && (
                      <>
                        <span style={{ textDecoration: 'line-through' }}>
                          {item.originalPrice}
                        </span>{' '}
                      </>
                    )}
                    {item.price}
                  </Typography>
                            
                            </Grid>
                            <Grid container spacing={1} style={{alignItems:'center'}}>
                                <Grid item xs={12} md={6}>
                                    
                                </Grid>
                            </Grid>
                        </Grid>
                    </CardContent>
                </Card>
            </Grid>
        })
        
    }
    
  return (
    <div style={{width:'54%'}} >
        <div style={{background:'#ffffff',height:'4vw'}}>
        <Grid container spacing={2}>
            <Grid item xs={12} style={{marginLeft:'3vw',paddingBottom:'0.8vw',fontWeight:'bold'}}>
                <Typography variant='inherit'>
                    MY BAG
                </Typography>
            </Grid>
            
        </Grid>
        </div>
        
        <div style={{marginTop:'1vw',background:'#ffffff'}}>
            {showItems()}
        </div>
        
      
    </div>
  )
}
