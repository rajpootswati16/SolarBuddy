import ProductDetailsHeader from '../components/ProductDetailsHeader';
import CartProductsComponent from '../components/CartProductsComponent';
import ShippingComponent from '../components/ShippingComponent';
import FooterComponent from '../components/FooterComponent';
import PaymentDetailsComponent from '../components/PaymentDetailsComponent'


export default function Cart(){
  return(
    <div >
      <ProductDetailsHeader />
      <div style={{display:'flex',justifyContent:'center',alignItems: 'center',width:'100%',background:'#ced6e0',flexDirection: 'column'}}>
        <div style={{display:'flex', width:'80%',marginTop:'3.5vw',borderRadius:'1vw', marginBottom:'5vw',flexDirection: 'row'}}>
          <CartProductsComponent />
          <PaymentDetailsComponent />
        </div>

        <div style={{ width: '99%', background: '#95a5a6', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <ShippingComponent />
        </div>

        <div style={{ width: '98%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <FooterComponent />
        </div>

      </div>
    </div>
  )
}