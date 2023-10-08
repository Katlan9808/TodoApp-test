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
import { RequestResultModel } from '../../domain/models/RequestResultModel';
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
    const [isDeleting, setIsDeleting] = useState<boolean>(false);
    const [refresh, setRefresh] = useState<boolean>(false);

    function get(): Promise<TodoModel[] | void> {
        return TodoController.get().then(res => res).then(res => setDataSource(res.result));
    }

    const handleData = (data?: any) => {
        let key = 0;
        setDataSource(data.result.result.map((item: TodoModel) => ({ key: key++, id: item.id, description: item.description, state: item.state })))
    }

    useEffect(() => {
        TodoController.get()
            .then((res: any) => {
                if (res)
                    handleData(res);
            });
    }, [])



    useEffect(() => {
        TodoController.get()
            .then((res: any) => {
                if (res)
                    handleData(res);
            });
    }, [isAdding, refresh, isDeleting])


    const handleDelete = (record: TodoModel) => {
        TodoController.delete(record?.id ?? '')
            .then(res => {
                const newData = dataSource?.filter(item => item.id !== record.id);
                setDataSource(newData);
                setIsDeleting(true);
                SweetAlertSuccess(`Tarea ${record.description} eliminada satisfactoriamente!`)
            })
            .catch(_ => SweetAlertError("Ha ocurrido un error"))
            .finally(() => setIsDeleting(false));
    };

    const handleSelectChange = (record: TodoModel, value: any) => {
        const obj: TodoModel = {
            id: record.id,
            description: record.description,
            state: options.find(item => item.value == value)?.label
        }
        TodoController.update(obj)
            .then(res => {
                setRefresh(true)
                SweetAlertSuccess(`Tarea ${obj.description} actualizada correctamente`)
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
            render: (_, record: TodoModel) =>
                (dataSource ?? []).length >= 1 ? (
                    <Popconfirm title="¿Esta seguro que desea eliminar la tarea? "
                        onConfirm={() => handleDelete(record)}>
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
