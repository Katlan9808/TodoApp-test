import Table from "antd/es/table";

export interface ICardActions {
    dataSource?: any
    columns?: any
}

export default function TableApp({ dataSource, columns }: ICardActions) {
    return (
        <>
            <Table dataSource={dataSource} columns={columns} />
        </>
    )

}