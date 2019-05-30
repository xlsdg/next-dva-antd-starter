import { connect } from 'react-redux';
import { Form, Select, InputNumber, DatePicker, Switch, Slider, Button, List, Table } from 'antd';

import { NS_HOME } from '@/redux/namespaces/index';
import { TYPE_ADD_TODO, TYPE_GET_REPOSITORIES } from '@/redux/types/home';
import Action from '@/redux/actions/home';

import styles from './index.less';

function Page(props) {
  const { todo, repositories } = props[NS_HOME];

  const onSubmit = e => {
    e.preventDefault();
    props.dispatch(Action[TYPE_GET_REPOSITORIES]({ language: 'javascript', since: 'weekly' }, NS_HOME));
  };

  const columns = [
    {
      title: 'author',
      dataIndex: 'author',
      key: 'author',
    },
    {
      title: 'currentPeriodStars',
      dataIndex: 'currentPeriodStars',
      key: 'currentPeriodStars',
    },
    {
      title: 'description',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: 'forks',
      dataIndex: 'forks',
      key: 'forks',
    },
    {
      title: 'language',
      dataIndex: 'language',
      key: 'language',
    },
    {
      title: 'name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'stars',
      dataIndex: 'stars',
      key: 'stars',
    },
    {
      title: 'url',
      dataIndex: 'url',
      key: 'url',
    },
  ];

  return (
    <div className={styles.container}>
      <Form layout="horizontal" onSubmit={onSubmit}>
        <Form.Item label="Input Number" labelCol={{ span: 8 }} wrapperCol={{ span: 8 }}>
          <InputNumber
            className={styles.inputNumber}
            size="large"
            min={1}
            max={10}
            defaultValue={3}
            name="inputNumber"
          />
          <a href={BASE_URL}>Link</a>
        </Form.Item>

        <Form.Item label="Switch" labelCol={{ span: 8 }} wrapperCol={{ span: 8 }}>
          <Switch defaultChecked name="switch" />
        </Form.Item>

        <Form.Item label="Slider" labelCol={{ span: 8 }} wrapperCol={{ span: 8 }}>
          <Slider defaultValue={70} />
        </Form.Item>

        <Form.Item label="Select" labelCol={{ span: 8 }} wrapperCol={{ span: 8 }}>
          <Select className={styles.select} size="large" defaultValue="lucy" name="select">
            <Select.Option value="jack">jack</Select.Option>
            <Select.Option value="lucy">lucy</Select.Option>
            <Select.Option value="disabled" disabled>
              disabled
            </Select.Option>
            <Select.Option value="yiminghe">yiminghe</Select.Option>
          </Select>
        </Form.Item>

        <Form.Item label="DatePicker" labelCol={{ span: 8 }} wrapperCol={{ span: 8 }}>
          <DatePicker name="startDate" />
        </Form.Item>
        <Form.Item wrapperCol={{ span: 8, offset: 8 }}>
          <Button size="large" type="primary" htmlType="submit">
            OK
          </Button>
          <Button className={styles.cancel} size="large">
            Cancel
          </Button>
        </Form.Item>
      </Form>
      <Table dataSource={repositories} columns={columns} />
      <List
        className={styles.todo}
        size="small"
        bordered
        header={<div>Todos</div>}
        dataSource={todo}
        renderItem={item => <List.Item>{item}</List.Item>}
      />
    </div>
  );
}

// Page.propTypes = {};

// Page.defaultProps = {};

Page.getInitialProps = async ({ store }) => {
  await store.dispatch(Action[TYPE_ADD_TODO]({ todo: ['01', '02', '03'] }, NS_HOME));
  // await store.dispatch(Action[TYPE_GET_REPOSITORIES]({ language: 'javascript', since: 'weekly' }, NS_HOME));
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
