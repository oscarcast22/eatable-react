import {
  React,
  useState,
  useEffect
}  from 'react';
import {
  Formik,
  Form,
  Field,
  ErrorMessage
} from "formik";
import Products from '../../services/products';
import styled from '@emotion/styled';
import {
  colors,
  typography
} from '../../styles';

const TitleContainer = styled.div `
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
const Button = styled.button `
  ${typography.text.sm}
  border: none;
  background-color: ${colors.orange};
  color: ${colors.white};
  margin-bottom: 12px;
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

const FormContainer = styled.div `
form {
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
}
`
const EditForm = styled.div`
  input {
    width: 350px;
    background: none;
    border: none;
    border-bottom: 1px solid;
  }

  textarea {
    width: 350px;
    background: none;
    border: none;
    border-bottom: 1px solid;
  }
  
  label {
    font-family: 'Lato';
    font-style: normal;
    font-weight: 700;
    font-size: 14px;
    line-height: 17px;
    color: #B8B8BB;
  }
`
const Input = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 16px;
`

const EditProduct = ({
    ProductId
  }) => {
    const [dish, setDish] = useState({});

    useEffect(() => {
      Products.getProduct(ProductId).then((prod) => {
        setDish({
          ...dish,
          name: prod.name,
          price: prod.price,
          category: prod.category,
          description: prod.description,
          picture_url: prod.picture_url,
        });
      });
    }, []);

    function validate(values) {
      const errors = {};
      if (values.name === "") errors.name = "Can't be blanck";
      if (values.price === "") {
        errors.price = "Can't be blanck";
      } else if (!/^\d+$/.test(values.price)) {
        errors.price = "Must be a number";
      }
      if (values.description === "") errors.description = "Can't be blanck";
      if (values.category === "") errors.category = "Can't be blanck";
      if (values.picture_url === "") {
        errors.picture_url = "Can't be blanck";
      } else if (!/^(ftp|http|https):\/\/[^ "]+$/.test(values.picture_url)) {
        errors.picture_url = "Invalid url";
      }
      return errors;
    }

    const {
      name,
      price,
      category,
      description,
      picture_url
    } = dish;

    const initialValues = {
      name: name,
      price: price,
      category: category,
      description: description,
      picture_url: picture_url,
    };

    function handleFormSubmit(values) {
      Products.updateProduct(values, ProductId);
    }
    
  return (  
    <>
      <Formik initialValues={initialValues} enableReinitialize onSubmit={handleFormSubmit} validate={validate}>
        {({
        handleSubmit,
        isValid,
        }) => (
        <FormContainer>
          <Form onSubmit={handleSubmit}>
            <div>
              <TitleContainer>
                <h2>Edit Product</h2>
              </TitleContainer>
              <div>
                <EditForm>
                  <Input>
                    <label>Name</label>
                    <Field name="name" />
                    <ErrorMessage name="name" className="form-error" component="p" />
                  </Input>
                  <Input>
                    <label>Price</label>
                    <Field name="price" />
                    <ErrorMessage name="price" className="form-error" component="p" />
                  </Input>
                  <Input>
                    <label>Description</label>
                    <Field name="description" component="textarea" rows="6" />
                    <ErrorMessage name="description" className="form-error" component="p" />
                  </Input>
                  <Input>
                    <label>Category</label>
                    <Field name="category" />
                    <ErrorMessage name="category" className="form-error" component="p" />
                  </Input>
                  <Input>
                  <label>Picture URL</label>
                    <Field name="picture_url" component="textarea" rows="2" />
                    <ErrorMessage name="picture_url" className="form-error" component="p" />
                  </Input>
                </EditForm>
              </div>
            </div>
            <div>
              <Button type='submit' disabled={!isValid}>Save</Button>
            </div>
          </Form>
        </FormContainer>
        )}
      </Formik>
    </>
  );
}

export default EditProduct;