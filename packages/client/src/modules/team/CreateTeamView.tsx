import { Button, Form as AntForm, Icon } from 'antd'
import { Field, Form, FormikProps, withFormik } from 'formik'
import * as React from 'react'
import { CreateTeamMutationMutationVariables } from '../../generated/graphqlTypes'
import { InputField } from '../shared/InputField'
import { NormalizedErrorMap } from '../shared/normalizedErrorMap'

const FormItem = AntForm.Item

interface FormValues {
  name: string
}

interface Props {
  loading: boolean
  onFinish: () => void
  submit: (
    values: CreateTeamMutationMutationVariables
  ) => Promise<NormalizedErrorMap | null>
}

const C: React.FC<FormikProps<FormValues> & Props> = props => {
  return (
    <div style={{ width: 400, margin: 'auto' }}>
      <h1>Create a Team</h1>
      <Form>
        <div>
          <Field
            name="name"
            prefix={
              <Icon type="member" style={{ color: 'rgba(0,0,0,.25)' }} /> as any
            }
            placeholder="Enter Team name"
            component={InputField}
          />
          <FormItem>
            <Button type="primary" htmlType="submit" disabled={props.loading}>
              Create
            </Button>
          </FormItem>
        </div>
      </Form>
    </div>
  )
}

const CreateTeamView = withFormik<Props, FormValues>({
  mapPropsToValues: () => ({ name }),
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

export default CreateTeamView
