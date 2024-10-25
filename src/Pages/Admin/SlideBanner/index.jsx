import { PlusOutlined } from "@ant-design/icons"
import { Button, Spin } from "antd"
import { useNavigate } from "react-router-dom"
import BannerItem from "./BannerItem"
import { useGetBannersQuery } from "../../../redux/slice/bannerApiSlice"

const SlideBanner = () => {

  const navigate = useNavigate()

  const {data, isLoading} = useGetBannersQuery()

  if (isLoading) return <div className='flex justify-center items-center pt-10'><Spin size='large' /></div>;

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">Slide Banner</h2>
          <div className="space-x-2">
              <Button icon={<PlusOutlined />} type="primary" onClick={() => navigate('/admin/banners/add')}>Create</Button>
          </div>
      </div>
      <div className="bg-white w-full p-9">
        {
          data?.data?.length > 0 ? data?.data?.map((item, index) => (
            <BannerItem key={index} item={item} />
          )) : <div className="text-gray-500 text-center w-full py-10">You have no banners to display</div>
        }
      </div>
    </div>
  )
}

export default SlideBanner