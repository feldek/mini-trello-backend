import React from 'react';
import { useDispatch } from 'react-redux';
import { Form, Input, Button } from 'antd';
import s from './NewTask.module.css';
import { createTask } from '../../../Redux/Task/TaskActions';

const NewTask = ({ uuid, listId }) => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const handleCreate = (elem) => {
    dispatch(createTask({ name: elem[uuid], listId }));
    onReset();
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  const onReset = () => {
    form.resetFields();
  };

  return (
    <Form
      form={form}
      layout="horizontal"
      onFinish={handleCreate}
      onFinishFailed={onFinishFailed}
    >
      <Form.Item
        layout="horizontal"
        name={uuid}
        rules={[
          {
            required: true,
            message: 'Please input task name!',
          },
        ]}
      >
        <label className={s.newTaskLabel}>
          <Input placeholder="Create new Task" />
          <Button type="primary" htmlType="submit" className={s.button}>
            Add
          </Button>
        </label>
      </Form.Item>
    </Form>
  );
};

export default NewTask;
