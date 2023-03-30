import {React, useState, useEffect} from "react";
import Products from '../../services/products';
import styled from '@emotion/styled';
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

export default function Home() {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        Products.get()
          .then((products) => {
              setProducts(products);
          })
          .catch(console.error);
      });
      
    return (
        <Container>
         <CardContainer>
            {products.map((product) => (
              <ProductContainer key={product.id}>
                <FoodCard dish={product} />
              </ProductContainer>
            ))}
        </CardContainer>
      </Container>
    )
  }