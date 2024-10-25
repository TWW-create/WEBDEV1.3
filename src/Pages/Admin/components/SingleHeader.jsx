import { IoIosArrowBack } from "react-icons/io"
import { useNavigate } from "react-router-dom"

const SingleHeader = ({header}) => {

    const navigate = useNavigate()

  return (
    <div className="flex  md:gap-0 flex-row items-center justify-between py-5">
        <h3 className='text-xl md:text-2xl font-bold capitalize'>{header}</h3>
        <div className='flex flex-wrap flex-row gap-2 items-center'>
            <p onClick={() => navigate(-1)} className='flex items-center gap-1 cursor-pointer hover:text-light-secondary whitespace-nowrap'>
            <IoIosArrowBack /> Go Back 
            </p>
        </div>            
    </div>
  )
}

export default SingleHeader