import React, { useState, useContext } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { FormError, FormButton } from "./components";
import { instance, PASSWORD } from "../config/api";
import { redirect } from "../util/util";
import { StoreContext } from "../util/contextreducer";

const UpdatePasswordForm = () => {
  const [serverError, setServerError] = useState(false);
  const [authError, setAuthError] = useState(false);
  const { state } = useContext(StoreContext);

  const updatePassword = (currPassword, newPassword) => {
    instance
      .patch(PASSWORD, {
        password: currPassword,
        newPassword: newPassword,
      })
      .then((res) => {
        if (res.data.message === "success") redirect("/home");
        else setAuthError(res.data.message);
      })
      .catch((error) => {
        console.error(error);
        setServerError(true);
      });
  };

  return (
    <>
      <Formik
        initialValues={{ currPassword: "", newPassword: "", rePassword: "" }}
        validate={(values) => {
          const errors = {};
          if (!values.currPassword) {
            errors.currPassword = "Please enter your current password.";
          }

          if (values.currPassword === values.newPassword) {
            errors.newPassword =
              "Please use a different password from your old password.";
          }
          if (values.newPassword === state.username) {
            errors.newPassword =
              "Please do not use your username as your password.";
          }
          if (!values.newPassword) {
            errors.newPassword = "Required";
          }
          if (values.newPassword.length < 6) {
            errors.newPassword =
              "Please create a password of at least 6 characters.";
          }

          if (values.newPassword !== values.rePassword) {
            errors.rePassword = "Passwords do not match.";
          }
          return errors;
        }}
        onSubmit={(values, { setSubmitting }) => {
          updatePassword(values.currPassword, values.newPassword);
          setSubmitting(false);
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <Field
              className="form-field"
              type="password"
              name="currPassword"
              placeholder="Current Password"
              maxlength={64}
            />
            <ErrorMessage
              className="form-error"
              name="currPassword"
              component="div"
            />

            <Field
              className="form-field"
              type="password"
              name="newPassword"
              placeholder="New Password"
              maxlength={64}
            />
            <ErrorMessage
              className="form-error"
              name="newPassword"
              component="div"
            />

            <Field
              className="form-field"
              type="password"
              name="rePassword"
              placeholder="Confirm New Password"
              maxlength={64}
            />
            <ErrorMessage
              className="form-error"
              name="rePassword"
              component="div"
            />

            <FormButton
              classname="form-button"
              type="submit"
              disabled={isSubmitting}
            >
              Submit
            </FormButton>
          </Form>
        )}
      </Formik>

      {serverError && (
        <FormError className="form-bottom-error">
          A server error has occured, please try again later.
        </FormError>
      )}
      {authError && (
        <FormError className="form-bottom-error">{authError}</FormError>
      )}
    </>
  );
};

export default UpdatePasswordForm;
