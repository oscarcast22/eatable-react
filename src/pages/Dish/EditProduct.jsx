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
        category: prod.category,
        description: prod.description,
        price: prod.price,
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

  const { description, name, category, picture_url, price } = dish;

  const initialValues = {
    description: description,
    name: name,
    price: price,
    category: category,
    picture_url: picture_url,
  };

  function handleFormSubmit(values) {
    console.log(values);
  }
  console.log(initialValues);
  return (
    <Formik
      initialValues={initialValues}
      enableReinitialize
      onSubmit={handleFormSubmit}
      validate={validate}
    >
      {({
        values,
        errors,
        touched,
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
              type="textarea"
            />
            <ErrorMessage name="description" className="form-error" component="p" />
          </div>
          <div>
            <Field
              name="picture_url"
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
