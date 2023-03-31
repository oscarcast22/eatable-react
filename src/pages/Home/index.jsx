import {React, useState, useEffect} from "react";
import Products from '../../services/products';
import styled from '@emotion/styled';
import { colors, typography } from '../../styles';
import FoodCard from './FoodCard';

const Container = styled.div`
  max-width: 768px;
  margin: auto;
  padding: 0 15px;
`;

const CardContainer = styled.div`
  display: grid;
  gap: 20px;
  margin-bottom: 70px;
  grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
`;

const ProductContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const TitleContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 48px 0;
  margin-bottom: 34px;
  padding: 2px;
  
  h2 {
    color: ${colors.black};
    font-size: ${typography.text.lg};
    font-weight: 600;
    margin: auto;
  }
`
const Button = styled.button`
  ${typography.text.sm}
  border: none;
  background-color: ${colors.orange};
  color: ${colors.white};
  padding: 24px 0;
  border-radius: 30px;
  letter-spacing: 0.5px;
  width: 310px;
  height: 70px;
  font-size: 1.125rem;
  font-weight: 600;
  cursor: pointer;
  &:hover {
    background-color: #ec4910;
  }
`;

const ButtonContainer = styled.nav`
  position: fixed;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  margin: 5px 20px;
  height: 84px;
  background-image: radial-gradient(
    circle,
    ${colors.white} 0%,
    ${colors.gray.light} 100%
  );
  left: 0;
  right: 0;
  margin: auto;
`;

export default function Home({ getId }) {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        Products.get()
          .then((products) => {
              setProducts(products);
          })
          .catch(console.error);
      });
      
    return (
      <>
      <TitleContainer>
        <h2>Products Dashboard</h2>
      </TitleContainer>
      <Container>
        <CardContainer>
          {products.map((product) => (
            <ProductContainer key={product.id}>
              <FoodCard dish={product} getId = {getId} />
            </ProductContainer>
          ))}
        </CardContainer>
      </Container>
      <ButtonContainer>
        <Button>Create Product</Button>
      </ButtonContainer>
      </>
    )
  }