import { useState, useEffect } from 'react'
import styled from 'styled-components'
import Announcement from '../components/Announcement'
import Navbar from '../components/Navbar'
import Newsletter from '../components/Newsletter'
import Footer from '../components/Footer'
import { Remove, Add } from '@material-ui/icons'
import { useLocation } from "react-router-dom";
import { publicRequest } from '../requestMethod'
import { addProduct } from '../redux/cartRedux'
import { useDispatch } from 'react-redux'

const Container = styled.div`` 

const Wrapper = styled.div`
   padding: 50px;
   display: flex;
`
const ImageContainer = styled.div`
   flex: 1;
`
const Image = styled.img`
   width: 100%;
   height: 90vh;
   object-fit: cover;
`
const InfoContainer = styled.div`
    flex: 1;
    padding: 0px 50px;
`
const Title = styled.h1`
   font-weight: 200;
`
const Desc = styled.p`
   margin: 20px 0px;
`
const Price = styled.span`
   font-weight: 100;
   font-size: 40px;
`
const FilterContainer = styled.div`
   width: 50%;
   margin: 30px 0px;
   display: flex;
   justify-content: space-between;
`
const Filter = styled.div`
   display: flex;
   align-items: center;
`
const FilterTitle = styled.span`
   font-size: 20px;
   font-weight: 200;
`
const FilterColor = styled.div`
   width: 20px;
   height: 20px;
   border-radius: 50%;
   background-color: ${props=> props.color};
   margin: 0px 5px;
   cursor: pointer;
   transition: 0.5s all ease-in-out;

   :hover {
      border: 1px solid green;
   }
`
const FilterSize = styled.select`
   margin-left: 10px;
   padding: 5px;
`
const FilterSizeOption = styled.option`
   
`
const AddContainer = styled.div`
  width: 50%;
   display: flex;
   align-items: center;
  justify-content: space-between;
`
const AmountContainer = styled.div`
   display: flex;
   align-items: center;
   font-weight: 700;
`
const Amount = styled.span`
   width: 30px;
   height: 30px;
   border-radius: 10px;
   border: 1px solid teal;
    display: flex;
   align-items: center;
    justify-content: center;
    margin: 0px 5px;
`
const Button = styled.button`
   padding: 15px;
   border: 2px solid teal;
   background-color: #fff;
   cursor: pointer;
   font-weight: 600px;

   &:hover {
       background-color: #f8f4f4; 
   }
`



const Product = () => {

     const location = useLocation();
     const id = location.pathname.split("/")[2]

     const [ product, setProduct ] = useState({});
   //   const [loading, setLoading] = useState(false);
    const [ quantity, setQuantity ] = useState(1);
    const [ color, setColor ] = useState("");
    const [ size, setSize ] = useState("");

    const dispatch = useDispatch(); 

     useEffect(() => {
          const getProduct = async () => {
            try{
             const res = await publicRequest.get("/products/find/" + id);
             setProduct(res.data)
            }catch(err) {
              console.log(err);
           }
         //   finally{
         //   setLoading(false);
         //  };
          }
          getProduct()
     }, [id])
   //   if (loading) {
   //     return <p>Data is loading...</p>;
   //    }

        //---------------- function handling increase or decrease ------------------------
        const handleQuantity = (type) => {
           if(type === "decrease") {
            //condition here say.. if quantity is bigger than one
           quantity > 1 && setQuantity(quantity - 1)
           } else {
            setQuantity(quantity + 1)
           }
        }
        // ------------------------ End of Function --------------------------------------

        
        //---------------- function handling Add To Cart ------------------------
        const handleAddToCartClick = () => {
         //product, quantity and price is coming from cartRedux from Redux folder
         // dispatch(addProduct({ product, quantity, price: product.price * quantity }));
          dispatch(addProduct({ ...product, quantity, color, size }));
        }
       // ------------------------ End of Function ------------------------------

     return (

          <Container>
            <Navbar />
            <Announcement />
            <Wrapper> 
                 <ImageContainer>
                      {/* <Image src="https://i.ibb.co/S6qMxwr/jean.jpg" /> */}
                       <Image src={product.img} />
                 </ImageContainer>

                 <InfoContainer>
                     {/* <Title>Denium Jumpsuit</Title> */}
                     <Title>{product.title}</Title>
                      <Desc>{product.desc}</Desc>
                      <Price>$ {product.price}</Price>
                      <FilterContainer>
                         {/* Filter 1 */}
                         <Filter>
                            <FilterTitle>Color</FilterTitle>
                            {product.color?.map((c) => (
                              <FilterColor color={c} key={c} 
                              onClick={ () => setColor(c) } /> 
                            ))}
                            
                            {/* <FilterColor color={product.color} /> */}
                            {/* <FilterColor color="darkblue" />
                             <FilterColor color="gray" />  */}
                         </Filter>

                        <Filter>
                           <FilterTitle>Size</FilterTitle>
                           <FilterSize onChange={(e) => setSize(e.target.value)}>
                            {product.size?.map((s) => (
                               <FilterSizeOption key={s}> {s} </FilterSizeOption>
                              ))} 
                              {/* <FilterSizeOption>S</FilterSizeOption>
                                <FilterSizeOption>M</FilterSizeOption>
                                 <FilterSizeOption>L</FilterSizeOption>
                                  <FilterSizeOption>XL</FilterSizeOption> */}
                           </FilterSize>
                        </Filter>
                      </FilterContainer>

                      <AddContainer>
                          <AmountContainer>
                             <Remove onClick={ () => handleQuantity("decrease") } />
                             {/* <Amount>1</Amount> */}
                             <Amount>{quantity}</Amount>
                             <Add onClick={ () => handleQuantity("increase") }  />
                          </AmountContainer>

                          <Button onClick={handleAddToCartClick}>ADD TO CART</Button>

                      </AddContainer>
                 </InfoContainer>
            </Wrapper>
            <Newsletter />
            <Footer />
          </Container>
     )
}

export default Product