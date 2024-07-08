import { useEffect, useState } from "react"
import { deleteAddress, getAllAddressByUserId } from "../../../api/userAPI"
import { toast } from "react-toastify"
import { useDispatch, useSelector } from "react-redux";
import { componentLoadSelector, tokenSelector, userIdSelector } from "../../../redux/selector";
import { setHideLoading, setShowLoading } from "../../../redux/Slice/AppSlice";

function MyAddress({ handleOpenModalAddress }) {
    const dispatch = useDispatch()
    const token = useSelector(tokenSelector)
    const userId = useSelector(userIdSelector);
    const [allAddress, setAllAddress] = useState([])
    const load = useSelector(componentLoadSelector)

    const fetchAllAddressById = async () => {
        let res = await getAllAddressByUserId(userId, token)
        if (res) {
            setAllAddress(res)
        }
    }

    useEffect(() => {
        fetchAllAddressById()
    }, [])

    useEffect(() => {
        fetchAllAddressById()
    }, [load])

    const hanldeDeleteAddress = async (addressId) => {
        try {
            dispatch(setShowLoading())
            if (window.confirm("Bạn có chắc chắn muốn xóa địa chỉ này không?")) {
                let res = await deleteAddress(addressId, token);
                if (res) {
                    toast.success("Xóa địa chỉ thành công");
                }
            }
        } catch (error) {
            if (error.response && error.response.status === 400) {
                toast.error('Lỗi hệ thống.');
            } else if (error.response && error.response.status === 404) {
                toast.error('Không thấy người dùng để xóa.');
            } else {
                toast.error('An error occurred.');
            }
        } finally {
            dispatch(setHideLoading())
        }
    }

    return (
        <>
            <h1 className="sm:text-xl md:text-3xl lg:text-4xl xl:text-4xl font-bold">Địa chỉ của tôi</h1>
            <div className="rounded-xl mt-4 bg-white p-4">
                <div className="flex sm:flex-col md:flex-row lg:flex-row xl:flex-row sm:gap-2 justify-between">
                    <div className="sm:text-center p-2 px-3 cursor-pointer rounded-lg font-bold text-md border border-black" onClick={() => handleOpenModalAddress()}>
                        Thêm địa chỉ mới
                    </div>
                </div>

                <div className="flex w-full flex-col justify-center items-center mt-10">
                    {
                        allAddress.length == 0 ?
                            <div className="text-center">
                                <img loading="lazy" src="/noAddress.svg" />
                                <h3 className="font-bold text-xl text-gray-500">Bạn chưa có địa chỉ</h3>
                            </div>
                            :
                            <>
                                {
                                    allAddress.map((item, index) => {
                                        return <div className="border p-4 rounded-lg w-full mb-3 flex flex-row justify-between items-center" key={index}>
                                            <div className="flex flex-row gap-4 items-center">
                                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M14.7797 21.2503H9.21973V15.3003C9.21973 14.7503 9.66973 14.3003 10.2197 14.3003H13.7797C14.3297 14.3003 14.7797 14.7503 14.7797 15.3003V21.2503V21.2503Z" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path><path d="M21.25 11.3901V18.1001C21.25 19.8401 19.91 21.2501 18.25 21.2501H5.75C4.09 21.2501 2.75 19.8401 2.75 18.1001V11.3901C2.75 10.4501 3.14 9.57012 3.83 8.97012L10.08 3.48012C11.19 2.50012 12.81 2.50012 13.92 3.48012L20.17 8.97012C20.86 9.57012 21.25 10.4501 21.25 11.3901Z" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path></svg>
                                                <div>
                                                    <h2 className="text-lg font-semibold">{item.streetAddress}</h2>
                                                    <p className="text-sm text-gray-500 font-semibold">{item.streetAddress} -- {item.ward} -- {item.district} -- {item.city}</p>
                                                </div>
                                            </div>
                                            <div className="flex flex-row gap-2">
                                                <div className="cursor-pointer" onClick={() => hanldeDeleteAddress(item.addressId)}>
                                                    <i className="fa-regular fa-trash-can fa-lg"></i>
                                                </div>
                                            </div>
                                        </div>
                                    })
                                }
                            </>
                    }
                </div>
            </div>
        </>
    )
}

export default MyAddress