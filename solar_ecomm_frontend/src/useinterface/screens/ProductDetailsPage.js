import React, { useEffect } from 'react'
import ProductDetailsMultiImages from '../components/ProductDetailsMultiImages'
import ProductDetailsHeader from '../components/ProductDetailsHeader'
import ProductDetailsDescription from '../components/ProductDetailsDescription'
import ShippingComponent from '../components/ShippingComponent'
import FooterComponent from '../components/FooterComponent'
import { useLocation } from 'react-router-dom'
import { useState } from 'react'
// import SolarProduct from '../components/SolarProduct'
// import { postData } from '../../services/FetchNodeServices'



export default function ProductDetailsPage() {
    const [pageRefresh,setPageRefresh]=useState(false)
    // const [offerList, setOfferList] = useState([]);
    var location=useLocation()
    var product=location.state.product

    // const fetchAllOfferProducts = async () => {
    //   let endMonthSaleResult = await postData({ offertype: 'End Month Sale' }, 'userinterface/display_all_productdetail_by_offer');
    //   // let festivalOfferResult = await postData({ offertype: 'Festival Offer' }, 'userinterface/display_all_productdetail_by_offer');
  
    //   // Merge the results
    //   setOfferList([...endMonthSaleResult.data]);
    // };

    // useEffect(function(){
    //   fetchAllOfferProducts()
    // },[])

  return (
    <div >
      <ProductDetailsHeader />

      <div style={{width:'100%',display:'flex',justifyContent:'center',alignItems:'center', marginTop:'1.5vw',flexDirection:'column'}}>
        
          <div style={{width:'70%',display:'flex',justifyContent:'center',alignItems:'center',flexDirection:'row',paddingBottom:'6vw'}}>
            <ProductDetailsMultiImages data={product} />
            <ProductDetailsDescription data={product} pageRefresh={pageRefresh} setPageRefresh={setPageRefresh} />
          </div>

          {/* <div style={{ width: '80%', marginBottom: '5%' }}>
          <div style={{fontWeight:'600',marginBottom:'1vw',fontSize:'1.5vw',letterSpacing:'0.05vw',color:'#222f3e',marginTop: '4%', }}>
            Recommeded Products
          </div>
            <SolarProduct data={offerList} pageRefresh={pageRefresh} setPageRefresh={setPageRefresh} />
          </div> */}

          <div style={{width:'100%',background:'#95a5a6', display:'flex',justifyContent:'center',alignItems:'center',marginTop:'1vw'}}>
            <ShippingComponent />
          </div>
          <div style={{width:'98%',display:'flex',alignItems:'center',justifyContent:'center',marginTop:'1vw'}} >
            <FooterComponent />
          </div>
        
      </div>
      
    </div>
  )
}
