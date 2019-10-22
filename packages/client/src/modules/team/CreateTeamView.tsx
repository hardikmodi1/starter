import { Layout, Button, Input, Row, Col } from "antd";
import { FormikProps, withFormik } from "formik";
import * as React from "react";
import { CreateTeamMutationMutationVariables } from "../../generated/graphqlTypes";
import { NormalizedErrorMap } from "../shared/normalizedErrorMap";

const { Header } = Layout;
const { Search } = Input;

interface FormValues {
  name: string;
}

interface Props {
  loading: boolean;
  onFinish: () => void;
  submit: (
    values: CreateTeamMutationMutationVariables
  ) => Promise<NormalizedErrorMap | null>;
}

const C: React.FC<FormikProps<FormValues> & Props> = props => {
  return (
    <div>
      <Layout>
        <Header style={{ backgroundColor: "#4675b8", color: "#FFFFFF" }}>
          <Button className="btn_nav">Menu 1</Button>
          <Button className="btn_nav">Menu 2</Button>
          <Button className="btn_nav">Menu 3</Button>
          <Search
            placeholder="Search a course"
            style={{ width: "20%", float: "right", margin: "1%" }}
            onSearch={value => console.log(value)}
            enterButton={true}
          />
        </Header>
      </Layout>
      <Row type="flex" justify="space-around" align="middle">
        <Col span={18} style={{ border: 20 }}>
          <div style={{ marginLeft: "40%", marginTop: "2%" }}>
            <h1>Suggested Courses</h1>
          </div>
        </Col>
        <Col span={6}>
          <div style={{ marginLeft: "20%" }}>
            <h3>Related Articles</h3>
          </div>
        </Col>
      </Row>
    </div>
  );
};

const CreateTeamView = withFormik<Props, FormValues>({
  mapPropsToValues: () => ({ name }),
  handleSubmit: async (values, { props, setErrors }) => {
    const errors = await props.submit(values);
    // await props.submit(values);
    if (errors) {
      setErrors(errors);
    } else {
      props.onFinish();
    }
  }
})(C);

export default CreateTeamView;
