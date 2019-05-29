import { connect } from 'react-redux';
import { Form, Select, InputNumber, DatePicker, Switch, Slider, Button } from 'antd';

import { NS_HOME } from '@/redux/namespaces/index';
import Action from '@/redux/actions/home';

const FormItem = Form.Item;
const Option = Select.Option;

function Page(props) {
  return (
    <div className="container">
      <style jsx>{`
        .container {
          padding: 0;
          margin: 0;
          background-color: transparent;
        }
      `}</style>
      <Form layout="horizontal">
        <FormItem label="Input Number" labelCol={{ span: 8 }} wrapperCol={{ span: 8 }}>
          <InputNumber size="large" min={1} max={10} defaultValue={3} name="inputNumber" />
          <a href={BASE_URL}>Link</a>
        </FormItem>

        <FormItem label="Switch" labelCol={{ span: 8 }} wrapperCol={{ span: 8 }}>
          <Switch defaultChecked name="switch" />
        </FormItem>

        <FormItem label="Slider" labelCol={{ span: 8 }} wrapperCol={{ span: 8 }}>
          <Slider defaultValue={70} />
        </FormItem>

        <FormItem label="Select" labelCol={{ span: 8 }} wrapperCol={{ span: 8 }}>
          <Select size="large" defaultValue="lucy" name="select">
            <Option value="jack">jack</Option>
            <Option value="lucy">lucy</Option>
            <Option value="disabled" disabled>
              disabled
            </Option>
            <Option value="yiminghe">yiminghe</Option>
          </Select>
        </FormItem>

        <FormItem label="DatePicker" labelCol={{ span: 8 }} wrapperCol={{ span: 8 }}>
          <DatePicker name="startDate" />
        </FormItem>
        <FormItem wrapperCol={{ span: 8, offset: 8 }}>
          <Button size="large" type="primary" htmlType="submit">
            OK
          </Button>
          <Button size="large">Cancel</Button>
        </FormItem>
      </Form>
    </div>
  );
}

// Page.propTypes = {};

// Page.defaultProps = {};

Page.getInitialProps = ({ store }) => {
  store.dispatch(Action.addTodo({ todo: 'Good job!' }, NS_HOME));
  return {};
};

function mapStateToProps(state, ownProps) {
  return {
    loading: state.loading,
    [NS_HOME]: state[NS_HOME],
  };
}

function mapDispatchToProps(dispatch, ownProps) {
  return {
    dispatch,
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Page);
