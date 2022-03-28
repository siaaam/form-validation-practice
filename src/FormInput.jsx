import React from 'react';
import { Form, Button, Row, Col, Container } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
const schema = yup.object({
  email: yup
    .string()
    .email('invalid email format')
    .required('email is required'),
  password: yup.string().min(6).trim().required('Password is required'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password'), null], 'Passwords must match'),
});
const FormInput = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({ resolver: yupResolver(schema) });
  console.log(errors);

  const submit = (data) => console.log(data);
  return (
    <Container>
      <Form className="mt-5" onSubmit={handleSubmit(submit)}>
        <Form.Group as={Row} className="mb-4">
          <Col sm={3}>
            <Form.Label>Email address</Form.Label>
          </Col>

          <Col sm={9}>
            <Form.Control
              className="shadow-none"
              type="email"
              placeholder="Enter email"
              {...register('email')}
              isInvalid={errors.email}
            />
            <Form.Control.Feedback type="invalid" className="d-block">
              {errors.email?.message}
            </Form.Control.Feedback>
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-4">
          <Col sm={3}>
            <Form.Label>Password</Form.Label>
          </Col>

          <Col sm={9}>
            <Form.Control
              className="shadow-none"
              type="text"
              placeholder="Enter Your Password"
              {...register('password')}
              isInvalid={errors.password}
            />
            <Form.Control.Feedback type="invalid" className="d-block">
              {errors.password?.message}
            </Form.Control.Feedback>
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-4">
          <Col sm={3}>
            <Form.Label>Confirm Your Password</Form.Label>
          </Col>

          <Col sm={9}>
            <Form.Control
              className="shadow-none"
              type="text"
              placeholder="Confirm Password"
              {...register('confirmPassword')}
              isInvalid={errors.confirmPassword}
            />
            <Form.Control.Feedback className="d-block" type="invalid">
              {errors.confirmPassword?.message}
            </Form.Control.Feedback>
          </Col>
        </Form.Group>

        <Button
          className="mt-4"
          disable={isSubmitting}
          variant="primary"
          type="submit"
        >
          Submit
        </Button>
      </Form>
    </Container>
  );
};

export default FormInput;
