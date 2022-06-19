import { useState, useEffect } from 'react'
import styled from 'styled-components'
import Navbar from '../components/Navbar'
import Announcement from '../components/Announcement'
import Footer from '../components/Footer'
import { Remove, Add } from '@material-ui/icons'
import { useSelector } from "react-redux"
import StripeCheckout from "react-stripe-checkout"
import { userRequest } from '../requestMethod'
import { useNavigate } from 'react-router-dom';


 //--------- Stripe Token Address -----------------
 const KEY = process.env.REACT_APP_STRIPE_KEY;

const Container = styled.div``

const Wrapper = styled.div`
     padding: 20px;
 `
  const Title = styled.h1`
   font-weight: 300;
   text-align: center;
 `
  const Top = styled.div`
     display: flex;
     align-items: center;
     justify-content: space-between;
     padding: 20px;
 `
 const TopButton = styled.button`
  padding: 10px;
  font-weight: 600;
  cursor: pointer;
  border: ${props=> props.type === "filled" && "none" };
  background-color: ${props=> props.type === "filled" ? "black" : "transparent" };
  color: ${props=> props.type === "filled" && "#fff" };
 `
 const TopTexts = styled.div`
      
 `
  const TopText = styled.span`
      text-decoration: underline;
      font-weight: 500;
      margin: 0px 10px;
 `
const Bottom = styled.div`
     display: flex;
     justify-content: space-between;
 `
  const Info = styled.div`
   flex: 3;
 `
 //Product Detail styling ......
 const Product = styled.div`
      display: flex;
      justify-content: space-between;
 `
  const ProductDetail = styled.div`
      flex: 2;
      display: flex;
 `
  const Image = styled.img`
      width: 200px;
 `
  const Details = styled.div`
      padding: 20px;
      display: flex;
      flex-direction: column;
       justify-content: space-around;
 `
  const ProductName = styled.span`
      
 `
  const ProductId = styled.span`
    
 `
  const ProductColor = styled.div`
      width: 20px;
      height: 20px;
      border-radius: 50%;
      background-color: ${props=> props.color};
 `
  const ProductSize = styled.span`
      
 `
  const PriceDetail = styled.div`
      flex: 1;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
 `
 const ProductAmountContainer = styled.div`
   display: flex;
   align-items: center;
     margin-bottom: 20px;
 `
  const ProductAmount = styled.div`
  font-size: 24px;
  margin: 5px;
 `
const ProductPrice = styled.div`
   font-size: 30px;
   font-weight: 200;
`;

//Product Detail End Styling...
const Hr = styled.hr`
 background-color: #eee;
 border: none;
 height: 1px;
`
//Summary styling ....
const Summary = styled.div`
   flex: 1;
   border: 0.5px solid lightgray;
   border-radius: 10px;
   padding: 20px;
   height: 50vh;
 `;

 const SummaryTitle = styled.h1`
   font-weight: 200;
 `;
  const SummaryItem = styled.div`
   margin: 30px 0px;
   display: flex;
   justify-content: space-between;
   font-weight: ${props => props.type === "total" && "500" };
   font-size: ${props => props.type === "total" && "24px" };
 `;
  const SummaryItemText = styled.span`

 `;
  const SummaryItemPrice = styled.span`

 `;
  const SummaryButton = styled.button`
   width: 100%;
   padding: 10px;
   border: none;
   background-color: black;
   color: #fff;
   font-weight: 600;
 `;
 // Summary End Styling.....

const Cart = () => {
 
       //the state.cart here is coming from store.js inside redux folder
     const cart = useSelector(state => state.cart);
     const [ stripeToken, setStripeToken ] = useState(null);
     const navigate = useNavigate();

     // ------ stripe functionality ---------
     const onToken = (token) => {
       setStripeToken(token);
     }
     // console.log(stripeToken)
     useEffect(()=>{
         const makeRequest = async () => {
          try{
            const res = await userRequest.post("/checkout/payment", {
               tokenId: stripeToken.id,
               amount: 500
               //$500
            })
            navigate.push("/success", { data: res.data });
          } catch {}
         }
         //it will exist the payment page
         stripeToken && makeRequest()
     },[stripeToken, cart.total, navigate])
     
     return (
          <Container>
             <Navbar />
             <Announcement />
             <Wrapper>
                  <Title>YOUR BAG</Title>
                  <Top>
                       <TopButton>CONTINUE SHOPPING</TopButton>
                       <TopTexts>
                            <TopText>Shopping Bag(2)</TopText>
                            <TopText>Your Wishlist (0)</TopText>
                       </TopTexts>
                       <TopButton type="filled">CHECKOUT NOW</TopButton>
                  </Top>

                  <Bottom>
                       <Info>
                          { cart.products.map((product) => (
                          <Product>
                                 <ProductDetail>
                                      {/* <Image src="https://images.pexels.com/photos/298864/pexels-photo-298864.jpeg?cs=srgb&dl=pexels-terje-sollie-298864.jpg&fm=jpg"/> */}
                                 <Image src={product.img} />
                                 <Details>
                                      <ProductName><b>Product:</b> {product.title}
                                      </ProductName>
                                       <ProductId><b>Track ID:</b> {product._id}
                                       </ProductId>
                                       <ProductColor color={product.color} />
                                       <ProductSize><b>Size:</b> {product.size}
                                       </ProductSize>
                                 </Details>
                                 </ProductDetail>
                                 <PriceDetail>
                                     <ProductAmountContainer>
                                          <Add />
                                          <ProductAmount>{product.quantity}</ProductAmount>
                                          <Remove />
                                     </ProductAmountContainer>
                                     <ProductPrice>
                                        $ {product.price * product.quantity}
                                     </ProductPrice>
                                 </PriceDetail>
                            </Product> 
                            )) }
                            
                            <Hr />

                            {/* <Product>
                                 <ProductDetail>
                                      <Image src="https://images.pexels.com/photos/5384423/pexels-photo-5384423.jpeg?cs=srgb&dl=pexels-monstera-5384423.jpg&fm=jpg"/>
                                 <Details>
                                      <ProductName>
                                           <b>Product:</b> HAKURA T-SHIRT
                                      </ProductName>
                                       <ProductId>
                                            <b>Track ID:</b> 94813718293 
                                        </ProductId>
                                       <ProductColor color="gray" />
                                       <ProductSize>
                                            <b>Size:</b> M
                                      </ProductSize>
                                 </Details>
                                 </ProductDetail>
                                 <PriceDetail>
                                     <ProductAmountContainer>
                                          <Add />
                                          <ProductAmount>1</ProductAmount>
                                          <Remove />
                                     </ProductAmountContainer>
                                     <ProductPrice>$ 20</ProductPrice>
                                 </PriceDetail>
                            </Product> */}

                       </Info>
                       <Summary>
                            <SummaryTitle>ORDER SUMMARY</SummaryTitle>
                            <SummaryItem>
                                <SummaryItemText>Subtotal</SummaryItemText>
                                <SummaryItemPrice>$ {cart.total}</SummaryItemPrice>  
                            </SummaryItem>
                            <SummaryItem>
                                <SummaryItemText>Estimated Shipping</SummaryItemText>
                                <SummaryItemPrice>$ 5.90</SummaryItemPrice>  
                            </SummaryItem>
                            <SummaryItem>
                                <SummaryItemText>Shipping Discount</SummaryItemText>
                                <SummaryItemPrice>$ -5.90</SummaryItemPrice>  
                            </SummaryItem>
                              <SummaryItem  type="total">
                                <SummaryItemText>Total</SummaryItemText>
                                <SummaryItemPrice>$ {cart.total}</SummaryItemPrice>  
                            </SummaryItem>

                            <StripeCheckout 
                            name="Dice shop"
                            image="https://images.pexels.com/photos/11293719/pexels-photo-11293719.jpeg?cs=srgb&dl=pexels-vietnam-photographer-11293719.jpg&fm=jpg"
                            billingAddress
                            shippingAddress 
                            description={`Your total is $${cart.total}`}
                            amount={cart.total*100}
                            token={onToken}
                            stripekey={KEY}
                            >
                            <SummaryButton>CHECKOUT NOW</SummaryButton>
                            </StripeCheckout> 
                       </Summary>
                  </Bottom>
             </Wrapper>
             <Footer />
          </Container>
     )
}

export default Cart
