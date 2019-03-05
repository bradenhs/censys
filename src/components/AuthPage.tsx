import React from "react";
import { observer } from "mobx-react-lite";
import {
  H3,
  Divider,
  Classes,
  FormGroup,
  InputGroup,
  Button,
  Intent
} from "@blueprintjs/core";
import { style, classes, media } from "typestyle";
import { useWindowSize } from "react-use";
import { TransitionIn } from "./TransitionIn";
import { Formik, FormikProps, FormikActions } from "formik";
import { authenticate } from "../actions/authenticate";
import { useAppModel } from "../utils/useAppModel";
import { SMALL_FORM_MAX_WIDTH } from "../constants/layout";

type FormValues = {
  apiID: string;
  secret: string;
};

const inputsContainerClassName = style(
  {
    display: "flex"
  },
  media({ maxWidth: `${SMALL_FORM_MAX_WIDTH}px` }, { display: "block" })
);

const formGroupItemClassName = style({
  flexGrow: 1
});

const apiIDFormGroupItemClassName = classes(
  formGroupItemClassName,
  style(
    {
      marginRight: "10px"
    },
    media({ maxWidth: `${SMALL_FORM_MAX_WIDTH}px` }, { marginRight: "0px" })
  )
);

const passwordFormGroupItemClassName = classes(
  formGroupItemClassName,
  style(
    {
      marginLeft: "10px"
    },
    media({ maxWidth: `${SMALL_FORM_MAX_WIDTH}px` }, { marginLeft: "0px" })
  )
);

const formClassName = style({
  marginTop: "30px"
});

const dividerClassName = style({
  marginBottom: "20px",
  marginTop: "20px"
});

const signInButtonClassName = style({
  float: "right",
  marginTop: "10px"
});

export const AuthPage = observer(() => {
  const { width } = useWindowSize();
  const appModel = useAppModel();

  return (
    <div>
      <TransitionIn type="slide">
        <H3>Authenticate</H3>
      </TransitionIn>
      <TransitionIn delay={100} type="slide">
        {width > SMALL_FORM_MAX_WIDTH && (
          <Divider className={dividerClassName} />
        )}
        <p className={Classes.TEXT_MUTED}>
          <a href="https://censys.io/login">Sign in</a> to your Censys account
          then copy your API ID and secret (found on the{" "}
          <a href="https://censys.io/account/api">account api page</a>) into the
          fields below.
        </p>
      </TransitionIn>
      <Formik<FormValues>
        initialValues={{ secret: "", apiID: "" }}
        onSubmit={handleSubmit}
        validate={validate}
      >
        {renderForm}
      </Formik>
    </div>
  );

  function renderForm(form: FormikProps<FormValues>) {
    const apiIDIntent =
      form.touched.apiID && form.errors.apiID ? Intent.DANGER : undefined;
    const secretIntent =
      form.touched.secret && form.errors.secret ? Intent.DANGER : undefined;

    return (
      <form className={formClassName} onSubmit={form.handleSubmit}>
        <TransitionIn delay={200} type="slide">
          <div className={inputsContainerClassName}>
            <FormGroup
              label="API ID"
              labelFor="apiID"
              className={apiIDFormGroupItemClassName}
              intent={apiIDIntent}
              helperText={form.touched.apiID && form.errors.apiID}
            >
              <InputGroup
                placeholder="API ID"
                leftIcon="id-number"
                large
                disabled={form.isSubmitting}
                value={form.values.apiID}
                intent={apiIDIntent}
                name="apiID"
                onChange={form.handleChange}
              />
            </FormGroup>
            <FormGroup
              label="Secret"
              labelFor="secret"
              className={passwordFormGroupItemClassName}
              helperText={form.touched.secret && form.errors.secret}
              intent={secretIntent}
            >
              <InputGroup
                name="secret"
                placeholder="Secret"
                large
                intent={secretIntent}
                disabled={form.isSubmitting}
                value={form.values.secret}
                onChange={form.handleChange}
                leftIcon="key"
              />
            </FormGroup>
          </div>
        </TransitionIn>
        <TransitionIn delay={300} type="slide">
          <Button
            className={signInButtonClassName}
            type="submit"
            large
            intent={Intent.PRIMARY}
            loading={form.isSubmitting}
          >
            Authenticate
          </Button>
        </TransitionIn>
      </form>
    );
  }

  function validate({ apiID, secret }: FormValues) {
    const errors: Partial<FormValues> = {};

    if (apiID.trim().length === 0) {
      errors.apiID = "Required";
    }

    if (secret.trim().length === 0) {
      errors.secret = "Required";
    }

    return errors;
  }

  async function handleSubmit(
    { apiID, secret }: FormValues,
    { setSubmitting }: FormikActions<FormValues>
  ) {
    await authenticate(appModel, { apiID, secret });
    setSubmitting(false);
  }
});
