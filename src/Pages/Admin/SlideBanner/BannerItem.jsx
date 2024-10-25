import { DeleteOutlined, EditOutlined } from "@ant-design/icons"
import { Button } from "antd"
import { useNavigate } from "react-router-dom"
import DeleteBanner from "./DeleteBanner"
import { useState } from "react"

const BannerItem = ({item}) => {
    const [deleteVisible, setDeleteVisible] = useState(false)

    const navigate = useNavigate()
  return (
    <div className="flex gap-6 w-full bg-[#000]/90 text-white h-[267px] rounded mb-5">
        <img src={item.image_url} alt="banner" className="w-80 object-center object-cover rounded-l" />
        <div className="p-5 w-full">
            <div className="flex justify-end items-center space-x-2 mb-5">
                <Button icon={<EditOutlined />} className='!text-[#000000] p-2 cursor-pointer' onClick={() => navigate(`/admin/banners/${item.id}`)} />
                <Button icon={<DeleteOutlined />} className='!text-[#000000] p-2 cursor-pointer' onClick={() => setDeleteVisible(true)}   />
            </div>
            <div>
                <p className="text-4xl">{item?.title}</p>
                {item?.description && <p className="mt-2">{item?.description}</p>}
                {(item?.location) && <p className="mb-2 mt-2"><span className="font-medium">Location:</span> {item?.location}</p>}
                {item.hyperlink && <p><span className="font-medium">Link:</span> {item.hyperlink}</p>}
            </div>
        </div>
        <DeleteBanner setDeleteVisible={setDeleteVisible} deleteVisible={deleteVisible} id={item.id} />
    </div>
  )
}

export default BannerItem