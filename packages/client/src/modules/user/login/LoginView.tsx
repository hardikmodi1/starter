import { Button, Form as AntForm, Icon } from 'antd'
import { Field, Form, FormikProps, withFormik } from 'formik'
import * as React from 'react'
import { Link } from 'react-router-dom'
import { LoginMutationMutationVariables } from '../../../generated/graphqlTypes'
import { InputField } from '../../shared/InputField'
import { NormalizedErrorMap } from '../../shared/normalizedErrorMap'

const FormItem = AntForm.Item

interface FormValues {
  usernameOrEmail: string
  password: string
}

interface Props {
  loading: boolean
  onFinish: () => void
  submit: (
    values: LoginMutationMutationVariables
  ) => Promise<NormalizedErrorMap | null>
}

const C: React.FC<FormikProps<FormValues> & Props> = props => {
  return (
    <div style={{ width: 400, margin: 'auto' }}>
      <h1>Login</h1>
      <Form>
        <div>
          <Field
            name="usernameOrEmail"
            prefix={
              <Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} /> as any
            }
            placeholder="Enter Username Or Email"
            component={InputField}
          />
          <Field
            name="password"
            type="password"
            prefix={
              <Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} /> as any
            }
            placeholder="Password"
            component={InputField}
          />
          <FormItem>
            <Button type="primary" htmlType="submit" disabled={props.loading}>
              Login
            </Button>
          </FormItem>
          <FormItem>
            <Link to="/forgot-password">Forgot password</Link>
          </FormItem>
          <FormItem>
            Or <Link to="/register">Register now!</Link>
          </FormItem>
        </div>
      </Form>
    </div>
  )
}

const LoginView = withFormik<Props, FormValues>({
  mapPropsToValues: () => ({ usernameOrEmail: '', password: '' }),
  handleSubmit: async (values, { props, setErrors }) => {
    const errors = await props.submit(values)
    // await props.submit(values);
    if (errors) {
      setErrors(errors)
    } else {
      props.onFinish()
    }
  },
})(C)

export default LoginView
