import { Form, Input, Select, Button, Row, Col, FormInstance } from 'antd';
import React, { useRef } from 'react';
import { options } from '../../utils/const';
import { TodoController } from '../../infraestructure/controllers/TodoController';
import { TodoModel } from '../../domain/models/TodoModel';
import { SweetAlertError, SweetAlertSuccess } from '../components/alerts';
const { Option } = Select;

export interface ICardActions {
    isAdding?: boolean,
    setisAdding: (e: any) => void
}

export default function AddTodo({ isAdding, setisAdding }: ICardActions) {

    const [form] = Form.useForm();
    const descriptionRef = useRef();
    const formRef = useRef<FormInstance>(null);

    const handleOnChange = (e: any, values: any) => {
        console.log(e);
        console.log(values);
    }

    const handleSubmit = (e: any) => {
        e.preventDefault();

        setisAdding(true)

        const values = formRef?.current?.getFieldsValue();
        console.log('Valores del formulario:', values);

        const obj: TodoModel = {
            state: values.state,
            description: values.description
        }

        TodoController.create(obj)
            .then(res => {
                setisAdding(true)
                SweetAlertSuccess(`Tarea ${obj.description} creada satisfactoriamente!`)
            })
            .catch(_ => SweetAlertError("Ha ocurrido un error"))
            .finally(() => setisAdding(false));

        form.resetFields();
    };

    const initialValues = { description: '', state: 'pen' }
    return (
        <>
            <Row style={{ backgroundColor: '#fff', color: '#000000', marginBottom: '10px', padding: '10px', borderRadius: '10px' }}>
                <Col span={24}>
                    <Form form={form} layout="inline" onSubmitCapture={(e) => handleSubmit(e)} initialValues={initialValues} ref={formRef}>
                        <Form.Item name="description" label="Descripcion" >
                            <Input
                                style={{ width: '100%', marginRight: '3%' }}
                            />
                        </Form.Item>
                        <Form.Item name='state' label="Estado">
                            <Select onChange={(e, values) => handleOnChange(e, values)} >
                                {options.map((value, index) => (
                                    <Option key={value.key} value={value.value}>
                                        {value.label}
                                    </Option>
                                ))}
                            </Select>
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" htmlType="submit">
                                Agregar
                            </Button>
                        </Form.Item>
                    </Form >
                </Col>
            </Row>

        </>
    );
}