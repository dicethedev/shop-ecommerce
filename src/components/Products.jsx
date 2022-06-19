import { useState, useEffect } from 'react'
import styled from 'styled-components'
// import { popularProducts } from '../data'
import Product from './Product'
import axios from 'axios';

const Container = styled.div`
   padding: 20px;
   display: flex;
   flex-wrap: wrap;
   justify-content: space-between;
`
//the props here is coming from ProductList
const Products = ({cat, filters, sort }) => {
   // console.log(category, filters, sort);

   const [ products, setProducts ] = useState([]);
   const [ filteredProducts, setFilteredProducts ] = useState([]);
     
   // --------------- useEffect to fetch the REST API -----------------
   useEffect(() => {
         const getProducts = async () => {
            try {
              const res = await axios.get( cat 
               ? `http://localhost:5000/api/products?category=${cat}`
               : "http://localhost:5000/api/products" )
            //   console.log(res)
            setProducts(res.data);
            }catch {}
         }
         getProducts()
   }, [cat])

       // --------------- useEffect to set the filter function -----------------
      useEffect(() => {
       cat && 
       setFilteredProducts(
         products.filter(item => Object.entries(filters).every(([key, value]) => 
            item[key].includes(value)
          )
         )
       )
      }, [products, cat, filters])


       // --------------- useEffect to se sort function -----------------
      useEffect(() => {
       if((sort === "newest")){
         setFilteredProducts(prev =>
            [...prev].sort((a,b)=> a.createdAt - b.createAt)
         );
       } else if ((sort === "asc")){
         setFilteredProducts(prev =>
            [...prev].sort((a,b)=> a.price - b.price)
         );
       } else {
         setFilteredProducts(prev =>
            [...prev].sort((a,b)=> b.price - a.price)
         );
       }
      }, [sort])

    return (
         <Container>
            {/* fake data */}
            {/* {popularProducts.map(item=>(
                 <Product item={item} key={item.id} />
            ))} */}
            
            {/* real data */}
                { cat
                ? filteredProducts.map((item) => <Product item={item} key={item.id} /> )
                : products.slice(0, 5).map((item) => <Product item={item} key={item.id} />
                )}
         </Container>
    )
}

export default Products