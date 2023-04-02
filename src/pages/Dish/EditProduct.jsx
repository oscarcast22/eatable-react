import { React, useState, useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage } from "formik";
import Products from '../../services/products';

const EditProduct = ({ProductId}) => {
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

  const { name, price, category, description, picture_url } = dish;

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
    <Formik
      initialValues={initialValues}
      enableReinitialize
      onSubmit={handleFormSubmit}
      validate={validate}
    >
      {({
        handleSubmit,
        isValid,
      }) => (
        <Form className="form" onSubmit={handleSubmit}>
          <div>
            <Field
              name="name"
            />
            <ErrorMessage name="name" className="form-error" component="p" />
          </div>
          <div>
            <Field
              name="price"
            />
            <ErrorMessage
              name="price" className="form-error" component="p"
            />
          </div>
          <div>
            <Field
              name="description"
              component="textarea"
              rows = "6"
            />
            <ErrorMessage name="description" className="form-error" component="p" />
          </div>
          <div>
            <Field
              name="category"
            />
            <ErrorMessage name="category" className="form-error" component="p" />
          </div>
          <div>
            <Field
              name="picture_url"
              component="textarea"
              rows="2"
            />
            <ErrorMessage name="picture_url" className="form-error" component="p" />
          </div>
          <button type='submit' disabled={!isValid}>Register</button>
        </Form>
      )}
    </Formik>
  );
}

export default EditProduct;
