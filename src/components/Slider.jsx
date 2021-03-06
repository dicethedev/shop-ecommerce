import { useState } from 'react'
import styled from 'styled-components'
import { ArrowLeftOutlined, ArrowRightOutlined } from '@material-ui/icons'
import { sliderItems } from '../data';
import { mobile } from "../responsive"
 
const Container = styled.div`
      width: 100%;
      height: 100vh;
      display: flex;
      /* background-color: coral; */
      position: relative;
      overflow: hidden;

      ${mobile({ display: "none" })}
`;

const Arrow = styled.div`
     width: 50px;
     height: 50px;
     background-color: #fff7f7;
     border-radius: 50%;
     display: flex;
     align-items: center;
     justify-content: center;
     position: absolute;
     top: 0;
     bottom: 0;
     left: ${props=> props.direction === "left" && "10px" };
     right: ${props=> props.direction === "right" && "10px" };
     margin: auto;
     cursor: pointer;
     opacity: 0.5;
     z-index: 2;
`
const Wrapper = styled.div`
   height: 100%;
   display: flex;
   transition: all 1.5s ease;
   transform: translateX( ${props=> props.slideIndex * -100}vw );
`
const Slide = styled.div`
     width: 100vw;
     height: 100vh;
     display: flex;
     align-items: center;
     background-color: #${props=> props.bg};
`
const ImageContainer = styled.div`
     height: 100%;
     flex: 1;
`
const Image = styled.img`
  height: 80%;     
`
const InfoContainer = styled.div`
     flex: 1;
     padding: 50px;
`
const Title = styled.h1`
     font-size: 70px;
`
const Description = styled.p`
     margin: 50px 0px;
     font-size: 20px;
     font-weight: 500;
     letter-spacing: 3px;
`
const Button = styled.button`
     padding: 10px;
     font-size: 20px;
     border: none;
     border-radius: 10px;
     background: rgb(238,174,202);
     background: linear-gradient(90deg, rgba(238,174,202,1) 0%, rgba(148,187,233,1) 100%); 
     color: #ffff;
     cursor: pointer;
     transition: all 0.5s ease-in-out;

     :hover {
         background: rgb(238,174,202);
     }
`

const Slider = () => {

     const [ slideIndex, setSlideIndex ] = useState(0);

     const handleClick = (direction) => {
          if(direction ==="left") {
               setSlideIndex(slideIndex > 0 ? slideIndex - 1 : 2)
          } else {
               setSlideIndex(slideIndex < 2 ? slideIndex + 1 : 0)
          }
     };

     return ( 
          <Container>
               {/* passing a prop */}
             <Arrow direction="left" onClick={()=>handleClick("left")}>
                  <ArrowLeftOutlined />
             </Arrow>
             <Wrapper slideIndex={slideIndex}>
                    {sliderItems.map(item=>(
                  <Slide bg={item.bg} key={item.id}>
                 <ImageContainer>
                    <Image src={item.image}
                     alt="sliderimg" />
                 </ImageContainer>
                 <InfoContainer>
                      <Title>{item.title}</Title>
                      <Description>{item.description}
                      </Description>
                      <Button>SHOW NOW</Button>
                 </InfoContainer>
                   </Slide>
                     ))}
             </Wrapper>
              <Arrow direction="right" onClick={()=>handleClick("right")}>
                  <ArrowRightOutlined />
             </Arrow>
          </Container>
     )
}

export default Slider