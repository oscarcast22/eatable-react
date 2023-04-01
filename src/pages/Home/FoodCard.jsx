import styled from '@emotion/styled';
import { RiEditBoxFill, RiDeleteBinFill } from 'react-icons/ri';
import { Link } from 'react-router-dom';

const Image = styled.img`
  width: 130px;
  height: 130px;
  border-radius: 100%;
  position: absolute;
  margin-top: -38px;
  box-shadow: 0px 15px 18px rgba(57, 57, 57, 0.3);
`;

const Container = styled.div`
  background: #ffffff;
  box-shadow: 0px 30px 60px rgba(57, 57, 57, 0.1);
  border-radius: 30px;
  height: 212px;
  width: 156px;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 52px;

  @media (min-width: 320px) {
    height: 250px;
    width: 200px;
  }
`;

const Information = styled.div`
  margin-top: 104px;
  width: 80%;
  gap: 12px;
  display: flex;
  flex-direction: column;
  align-items: center;
  /* SemiBold/L */

  font-style: normal;
  font-weight: 600;
  font-size: 22px;
  line-height: 28px;
`;

const Span = styled.span`
  color: ${(props) => props.color};
  text-align: center;
`;

const Buttons = styled.div`
  display: flex;
  flex-direction: row;
  width: 70%;
  justify-content: space-between;
  padding: 0 2px;
  margin-top: auto;
  margin-bottom: 20px;
`;

const LinkToDish = styled(Link)`
  text-decoration: none;
  display: flex;
  flex-direction: column;
  align-items: center;
`

export default function FoodCard({ dish, getId }) {
  const { id, name, price, picture_url } = dish;

  function capitalizeName(name) {
    const words = name.split(" ");
    for (var i = 0; i < words.length; i++) {
      words[i] = words[i][0].toUpperCase() + words[i].substr(1);
    }
    return words.join(" ");
  }
  
  return (
    <Container key={name}>
      <LinkToDish 
            to = {`/products/${id}`} 
            key={id}
            onClickCapture={() => getId(id)} >
      <Image src={picture_url} alt='food image' />
      <Information>
        <Span color='#333333'>{capitalizeName(name)}</Span>
        <Span color='#FA4A0C'>${price / 100}</Span>
      </Information>
      </LinkToDish>
      <Buttons>
        <Link 
            to = {`/editproduct/${id}`} 
            key={id}
            onClickCapture={() => getId(id)} >
          <RiEditBoxFill color='#FA4A0C'/>
        </Link>
        <RiDeleteBinFill color='#FA4A0C'/>
      </Buttons>
    </Container>
  );
}
