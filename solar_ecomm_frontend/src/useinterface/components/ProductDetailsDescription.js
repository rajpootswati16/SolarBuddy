import { Divider } from '@mui/material'
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import ButtonComponent from './ButtonComponent' 
import { useDispatch } from 'react-redux';


export default function ProductDetailsDescription(props) {
    console.log(props.data)
  var dispatch=useDispatch()
  
    var items=props.data

    const handleChange=(v,item)=>{
      if(v>=1){
        item['qty']=v
        dispatch({type:'ADD_CART',payload:[item.productdetailid,item]})
      }
      else{
        dispatch({type:'DELETE_CART',payload:[item.productdetailid]})
      }
      props.setPageRefresh(!props.pageRefresh)
    }

  

    var productDetail=()=>{
            return <div >
                <div style={{display:'flex',justifyContent:'center',alignItems:'center',fontWeight:'600',fontSize:'1.4vw'}}>
                {items?.brandname} {items?.productname}
                </div>
                <Divider style={{marginTop:'1vw'}}/>
                <div style={{display:'flex',alignItems:'center',fontSize:'0.9vw',marginTop:'0.5vw',color:'#636e72',fontWeight:'600'}}>MRP: <div style={{fontSize:'0.9vw',textDecorationLine: 'line-through',marginLeft:'0.3vw'}}>&#8377;{items?.price}</div></div>
                <div style={{display:'flex',alignItems:'center',fontSize:'1.3vw',color:'#2d3436',marginTop:'0.5vw',fontWeight:'600'}}>Price : <CurrencyRupeeIcon style={{fontSize:'0.9vw',marginLeft:'0.3vw'}}/> {items?.offerprice}</div>
                <div style={{display:'flex',alignItems:'center',fontSize:'0.9vw'}}>You Save : <CurrencyRupeeIcon style={{fontSize:'0.8vw'}}/>{items?.price-items?.offerprice}</div>
                <div style={{display:'flex',alignItems:'center',fontSize:'0.8vw',color:'#16a085',fontWeight:'bold'}}>(Inclusive of all taxes)</div>
              
              <div style={{display:'flex',fontSize:'1.5vw',margin:'3%'}}>
              
                <div >
                <ButtonComponent onChange={(v)=>handleChange(v,items)} />
                </div>
       
              </div>

              <Divider/>
              <div style={{display:'flex',alignItems:'center',fontSize:'1.2vw',margin:'2%'}}><LocalOfferIcon style={{fontSize:'small',marginRight:'0.2vw'}}/> Offer available for you</div>
              <div style={{display:'flex',alignItems:'center',fontSize:'0.9vw',marginBottom:'1%'}}>{items?.OA}</div>
              <Divider/>
              <div style={{display:'flex',alignItems:'center',fontSize:'0.7vw',marginTop:'2%'}}>Brand : {items?.brandname}</div>
              <div style={{display:'flex',alignItems:'center',fontSize:'0.7vw'}}>Product Code : {items?.productdetailid}</div>
              <div style={{display:'flex',alignItems:'center',fontSize:'0.7vw'}}>Seller: PS-SOFTECH Corporation</div>

            </div>
        
    }
  return (
    <div style={{width:'60%', display:'flex',justifyContent:'center',alignItems:'center'}}>
      {productDetail()}
    </div>
  )
}
