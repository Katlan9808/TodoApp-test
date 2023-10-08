import React, { useContext, useEffect, useRef, useState } from 'react';
import type { InputRef } from 'antd';
import { Button, Form, Input, Popconfirm, Select, Table } from 'antd';
import type { FormInstance } from 'antd/es/form';
import { AnyObject } from 'antd/es/_util/type';
import AddTodo from './addTodo';
import { TodoModel } from '../../domain/models/TodoModel';
import { data, options } from '../../utils/const';
import { TodoController } from '../../infraestructure/controllers/TodoController';
import { SweetAlertError, SweetAlertSuccess } from '../components/alerts';
const { Option } = Select;

const EditableContext = React.createContext<FormInstance<any> | null>(null);

interface TodoItem {
    id: string;
    description: string;
    state: string;
}

interface EditableRowProps {
    index: number;
}

type EditableTableProps = Parameters<typeof Table>[0];

interface DataType {
    key: React.Key;
    description: string;
    state: string;
}

type ColumnTypes = Exclude<EditableTableProps['columns'], undefined>;

export default function ListTodo() {
    const [dataSource, setDataSource] = useState<TodoModel[] | undefined>([]);
    const [isAdding, setIsAdding] = useState<boolean>(false);
    const [refrest, setRefresh] = useState<boolean>(false);

    useEffect(() => {
        // TodoController.get()
        //     .then(res => setDataSource(res?.result?.map(e => ({ id: e.id, description: e.description, state: e.state }))));
    }, [])

    useEffect(() => {
        // TodoController.get()
        //     .then(res => setDataSource(res?.result?.map(e => ({ id: e.id, description: e.description, state: e.state }))));
    }, [isAdding, refrest])


    const handleDelete = (id: React.Key) => {
        //const newData = dataSource?.filter((item) => item.id !== id);
        TodoController.delete(id.toString())
            .then(res => {
                setRefresh(true)
                SweetAlertSuccess()
            })
            .catch(_ => SweetAlertError("Ha ocurrido un error"))
            .finally(() => setRefresh(false));
    };

    const handleSelectChange = (record: TodoModel, value: any) => {
        console.log(`Nuevo valor seleccionado para ${record.description}: ${value}`);
        const obj: TodoModel = {
            id: record.id,
            state: record.state
        }
        TodoController.update(obj)
            .then(res => {
                setRefresh(true)
                SweetAlertSuccess()
            })
            .catch(_ => SweetAlertError("Ha ocurrido un error"))
            .finally(() => setRefresh(false));
    };

    const handleIsAdding = (value: boolean) => {
        setIsAdding(value)
    }

    const defaultColumns: (ColumnTypes[number] & { editable?: boolean; dataIndex: string })[] = [
        {
            title: 'Descripción',
            dataIndex: 'description',
            width: '30%',
        },
        {
            title: 'Estado',
            dataIndex: 'state',
            editable: true,
            render: (text, record: any) => (
                (
                    <Select
                        defaultValue={text}
                        style={{ width: 120 }}
                        onChange={(value) => handleSelectChange(record, value)}
                    >
                        {options.map((value, index) => (
                            <Option key={value.key} value={value.value}>
                                {value.label}
                            </Option>
                        ))}
                    </Select>
                )
            )
        },
        {
            dataIndex: 'operation',
            render: (_, record) =>
                (dataSource ?? []).length >= 1 ? (
                    <Popconfirm title="Sure to delete?" onConfirm={() => handleDelete(record.key)}>
                        <a>Eliminar</a>
                    </Popconfirm>
                ) : null,
        },
    ];

    const columns = defaultColumns.map((col) => {
        if (!col.editable) {
            return col;
        }
        return {
            ...col,
            onCell: (record: DataType) => ({
                record,
                title: col.title,
            }),
        };
    });

    return (
        <>
            <AddTodo isAdding={true} setisAdding={handleIsAdding} />
            <Table
                rowClassName={() => 'editable-row'}
                bordered
                dataSource={dataSource}
                columns={columns as ColumnTypes}
            />
        </>
    );
};
