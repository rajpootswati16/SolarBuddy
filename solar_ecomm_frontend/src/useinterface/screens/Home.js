import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import CategoryComponent from '../components/CategoryComponent';
import FooterComponent from '../components/FooterComponent';
import PopularBrands from '../components/PopularBrands';
import ShippingComponent from '../components/ShippingComponent';
// import { useStyles } from '../css/UserInterfaceCss';
import SliderComponent from '../components/SliderComponent';
import { getData, postData } from '../../services/FetchNodeServices';
import SolarProduct from '../components/SolarProduct';

export default function Home() {
  // const classes=useStyles()
  const [categoryList, setCategoryList] = useState([]);
  const [brandList, setBrandList] = useState([]);
  const [offerList, setOfferList] = useState([]);
  const [banners, setBanners] = useState([]);
  const [pageRefresh, setPageRefresh] = useState(false);

  const fetchAllCategoryByBrands = async (bname) => {
    var result = await postData({ brandname: bname }, 'userinterface/display_all_category_by_brands');
    setCategoryList(result.data);
  };

  const fetchAllBrands = async () => {
    var result = await getData('userinterface/fetch_all_brands');
    setBrandList(result.data);
  };

  const fetchAllBanners = async () => {
    var result = await getData('userinterface/fetch_all_banners');
    var images = result.data[0].picture.split(',');
    setBanners(images);
  };

  const fetchAllOfferProducts = async () => {
    let endMonthSaleResult = await postData({ offertype: 'End Month Sale' }, 'userinterface/display_all_productdetail_by_offer');
    let festivalOfferResult = await postData({ offertype: 'Festival Offer' }, 'userinterface/display_all_productdetail_by_offer');

    // Merge the results
    setOfferList([...endMonthSaleResult.data, ...festivalOfferResult.data]);
  };

  useEffect(function () {
    fetchAllCategoryByBrands('WAAREE');
    fetchAllBrands();
    fetchAllBanners();
    fetchAllOfferProducts();
  }, []);

  return (
    <div>
      <Header />
      <div style={{ width: '99.3%', display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '1.5vw', flexDirection: 'column' }}>
        <div style={{ width: "98%", marginBottom: '4%' }}>
          <SliderComponent images={banners} />
        </div>

        <div style={{ width: '75%', marginBottom: '4%' }}>
          <CategoryComponent data={categoryList} title="WAAREE" />
        </div>

        <div style={{ width: '80%', marginBottom: '5%' }}>
        <div style={{fontWeight:'600',marginBottom:'1vw',fontSize:'1.5vw',letterSpacing:'0.05vw',color:'#222f3e',marginTop: '4%', }}>
          All Products
        </div>
          <SolarProduct data={offerList} pageRefresh={pageRefresh} setPageRefresh={setPageRefresh} />
        </div>

        <div style={{ width: '80%', marginBottom: '8%' }}>
          <PopularBrands data={brandList} title="Popular Brands" />
        </div>

        <div style={{ width: '99%', background: '#95a5a6', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <ShippingComponent />
        </div>

        <div style={{ width: '98%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <FooterComponent />
        </div>
      </div>
    </div>
  );
}
