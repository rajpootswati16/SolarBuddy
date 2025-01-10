import { Divider, Checkbox } from '@mui/material';
import { serverURL } from '../../services/FetchNodeServices';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import Favorite from '@mui/icons-material/Favorite';
import PlusMinusComponent from './PlusMinusComponent';
import { useDispatch,useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

export default function SolarProduct(props) {
  const dispatch = useDispatch();
  var products=useSelector(state=>state.cart)
  var productFromRedux=Object.values(products)
  var navigate = useNavigate();

  const productdetail = props.data;

  const handleChange = (v, item) => {
    if (v >= 1) {
      item['qty'] = v;
      dispatch({ type: 'ADD_CART', payload: [item.productdetailid, item] });
    } else {
      dispatch({ type: 'DELETE_CART', payload: [item.productdetailid] });
    }
    props.setPageRefresh(!props.pageRefresh);
  };

  const handleNextPage = (item) => {
    navigate('/productdetailspage', { state: { product: item } });
  };

  const showProductDetails = () => {
    return productdetail?.map((item) => (
      <div
        key={item.productdetailid}
        style={{
          background: '#fff',
          width: '18%', // Adjust this width to fit 4 items in a row
          margin: '1%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          padding: '1%',
          boxSizing: 'border-box'
        }}
      >
        <div style={{ position: 'relative', width: '100%' }}>
          <p style={{ width: "60px", height: "25px", background: "#f1c40f", clipPath: "polygon(100% 0%, 90% 48%, 100% 100%, 0% 100%, 0% 51%, 0% 0%)", fontWeight: 'bolder', fontSize: "0.8vw", display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            {(((item.price - item.offerprice) / item.price) * 100).toFixed(1)}%
          </p>
          <Checkbox  {...label} icon={<FavoriteBorder />} checkedIcon={<Favorite />} style={{ position: 'absolute', top: 0, right: 0 }} />
        </div>
        <div onClick={() => handleNextPage(item)} style={{cursor: 'pointer' }}>
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '4%' }}>
            <img alt='' src={`${serverURL}/images/${item.icon}`} style={{ width: '70%', height: '10vw' }} />
          </div>
        </div>

         
        <div style={{ width: '100%', display: 'flex', flexDirection: 'column', marginTop: 5 }}>
        <div onClick={() => handleNextPage(item)} style={{cursor: 'pointer' }}> 
          <div style={{ fontWeight: 'bold', fontSize: '0.9vw', whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
            {item.brandname} {item.productname}
          </div>
          <div style={{ fontWeight: 'bold', fontSize: '0.9vw', whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
            {item.productsubname}
          </div>
          <div style={{ display: 'flex', flexDirection: 'row' }}>
            <div style={{ marginRight: '0.5vw', fontSize: '0.9vw', fontWeight: '600' }}>
              ₹{item.offerprice}
            </div>
            <div style={{ textDecorationLine: 'line-through', fontWeight: '600', color: '#7f8c8d', fontSize: '0.9vw' }}>₹{item.price}</div>
          </div>
          <div style={{ fontWeight: 'bold', fontSize: '0.6vw', color: '#16a085' }}>
            You Save: ₹{item.price - item.offerprice}
          </div>
          </div> 
          <Divider style={{ marginBottom: '0.6vw', marginTop: '0.2vw', width: '100%' }} />
        </div>
        <div>
          <PlusMinusComponent onChange={(v) => handleChange(v, item)} />
        </div>
        
      </div>
    ));
  };

  return (
    <div>
      

      <div style={{ display: 'flex', justifyContent:'flex-start', alignItems: 'center', flexDirection: 'row', marginTop: '1%', marginLeft: '2%', flexWrap: 'wrap' }}>
        {showProductDetails()}
      </div>
    </div>
    
  );
}
