import { useParams } from "react-router-dom"
import { useGetSubCategoryDetailsQuery } from "../../../redux/slice/categoryApiSlice"
import SingleHeader from "../components/SingleHeader"
import { useState } from "react"
import { Button, Spin, Table } from "antd"
import AddProductType from "./AddProductType"

const SubCategoryInfo = () => {
    const [visible, setVisible] = useState(false)
    
    const params = useParams()
    
    const {data, isLoading} = useGetSubCategoryDetailsQuery(params.id)

    const columns = [
      {
        title: 'Type',
        dataIndex: 'name',
        key: 'name',
        render: (_, record) => <p>{record.name}</p>,
      },
    ];

    if (isLoading) {
        return(
          <div className="flex justify-center items-center h-[70vh]">
            <Spin size='large' />
          </div>
        )
    }
  return (
    <div>
        <SingleHeader header={data?.name} />
        <div className="mt-10 flex justify-between items-center">
            <p className="text-xl font-bold">Product Types</p>
            <Button onClick={() => setVisible(true)} className="bg-transparent">Add Product Type</Button>
        </div>
        <div>
          <Table columns={columns} dataSource={data?.product_types} pagination={false} />
        </div>
        <AddProductType
            visible={visible}
            // onCreate={onCreate}
            onCancel={() => {
            setVisible(false);
            }}
            category={data}
        />
    </div>
  )
}

export default SubCategoryInfo