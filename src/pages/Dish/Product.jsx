import React, { useEffect, useState } from 'react';
import { IoIosArrowBack } from 'react-icons/io';
import { Link, useNavigate } from 'react-router-dom';
import Products from '../../services/products';
import { colors, typography } from '../../styles';
import styled from '@emotion/styled';

const FoodContainer = styled.div`
  height: 80vh;
  box-shadow: 0px 30px 60px rgba(57, 57, 57, 0.1);
  border-radius: 30px;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 52px;
  padding: 0 30px;
`;

const Image = styled.img`
  width: 250px;
  height: 250px;
  border-radius: 100%;
  position: absolute;
  margin-top: -50px;
`;

const Information = styled.div`
  margin-top: 250px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 15px;
`;

const Info = styled.p`
  color: ${(props) => props.color};
  text-align: justify;
  margin: 4px 0;
  padding: 0 2px;

  :nth-of-type(3n + 1),
  :nth-of-type(3n + 2) {
    font-weight: 600;
    font-size: 28px;
    line-height: 35px;
  }

  :nth-of-type(3n + 3) {
    font-weight: 400;
    ${typography.text.xl}
  }
`;

const Back = styled.div`
  a svg {
    width: 20px;
    height: 20px;
  }
`;

const Product = ({ ProductId }) => {
  const navigate = useNavigate();

  const [dish, setDish] = useState({
    name: '',
    price: 0,
    description: '',
    picture_url: '',
  });
  const { description, name, picture_url, price } = dish;

  useEffect(() => {
    Products.getProduct(ProductId).then((prod) => {
      setDish({
        ...dish,
        name: prod.name,
        description: prod.description,
        price: prod.price,
        picture_url: prod.picture_url,
      });
    });
  }, []);

  return (
    <div>
      <Back>
        <Link onClick={() => navigate(-1)}>
          <IoIosArrowBack />
        </Link>
      </Back>
      <FoodContainer>
        <Image src={picture_url} alt={name} />
        <Information>
          <Info color={`${colors.black}`}>{name}</Info>
          <Info color={`${colors.orange}`}>${price / 100}</Info>
          <h3>Description</h3>
          <Info>{description}</Info>
        </Information>
      </FoodContainer>
    </div>
  );
};

export default Product;
