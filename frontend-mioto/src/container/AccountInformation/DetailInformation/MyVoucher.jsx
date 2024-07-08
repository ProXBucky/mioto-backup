import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { tokenSelector, userIdSelector } from "../../../redux/selector";
import { getAllVoucherByUserId } from "../../../api/appAPI";
import { compareDay } from "../../../utils/compareDay";
import { format } from "date-fns";

function MyVoucher() {
    const userId = useSelector(userIdSelector)
    const token = useSelector(tokenSelector)
    const today = new Date()
    const [allVoucher, setAllVoucher] = useState('');

    const fetchAllVoucherByUserId = async () => {
        if (userId) {
            const res = await getAllVoucherByUserId(userId, token);
            if (res && res.length > 0) {
                setAllVoucher(res)
            } else {
                setAllVoucher([])
            }
        }
    }

    useEffect(() => {
        if (userId) {
            fetchAllVoucherByUserId()
        }
    }, [])

    return (
        <>
            <h1 className="sm:text-xl md:text-3xl lg:text-4xl xl:text-4xl font-bold mb-4">Quà tặng của tôi</h1>
            <div className="bg-white p-3 rounded-lg">
                {
                    allVoucher && allVoucher.length > 0 ?
                        allVoucher.map((item, index) => {
                            const isExpired = compareDay(format(today, 'dd/MM/yyyy'), format(item.voucher.expireDate, "dd/MM/yyy"));
                            return (
                                <div key={index} className='flex justify-between items-center w-full relative mb-4'>
                                    <div className='flex flex-row w-full justify-center items-center'>
                                        <div className="">
                                            {
                                                isExpired && item.status === "NotUsed" ?
                                                    <svg width="42" height="42" viewBox="0 0 42 42" fill="none" xmlns="http://www.w3.org/2000/svg"><path opacity="0.4" d="M6.98057 25.6522L4.32059 22.9924C3.23559 21.9074 3.23559 20.1224 4.32059 19.0374L6.98057 16.3772C7.43557 15.9222 7.80307 15.0297 7.80307 14.3997V10.6373C7.80307 9.0973 9.06307 7.83725 10.6031 7.83725H14.3656C14.9956 7.83725 15.8881 7.4698 16.3431 7.0148L19.0031 4.35477C20.0881 3.26977 21.8731 3.26977 22.9581 4.35477L25.6181 7.0148C26.0731 7.4698 26.9656 7.83725 27.5956 7.83725H31.3581C32.8981 7.83725 34.1581 9.0973 34.1581 10.6373V14.3997C34.1581 15.0297 34.5256 15.9222 34.9806 16.3772L37.6406 19.0374C38.7256 20.1224 38.7256 21.9074 37.6406 22.9924L34.9806 25.6522C34.5256 26.1072 34.1581 26.9997 34.1581 27.6297V31.3922C34.1581 32.9322 32.8981 34.1922 31.3581 34.1922H27.5956C26.9656 34.1922 26.0731 34.5599 25.6181 35.0149L22.9581 37.6749C21.8731 38.7599 20.0881 38.7599 19.0031 37.6749L16.3431 35.0149C15.8881 34.5599 14.9956 34.1922 14.3656 34.1922H10.6031C9.06307 34.1922 7.80307 32.9322 7.80307 31.3922V27.6297C7.80307 26.9822 7.43557 26.0897 6.98057 25.6522Z" fill="#68C187"></path><path d="M26.247 28C25.267 28 24.4795 27.2125 24.4795 26.25C24.4795 25.2875 25.267 24.5 26.2295 24.5C27.192 24.5 27.9795 25.2875 27.9795 26.25C27.9795 27.2125 27.2095 28 26.247 28Z" fill="#68C187"></path><path d="M15.7675 17.5C14.7875 17.5 14 16.7125 14 15.75C14 14.7875 14.7875 14 15.75 14C16.7125 14 17.5 14.7875 17.5 15.75C17.5 16.7125 16.73 17.5 15.7675 17.5Z" fill="#68C187"></path><path d="M15.7525 27.5659C15.42 27.5659 15.0875 27.4436 14.825 27.1811C14.3175 26.6736 14.3175 25.8334 14.825 25.3259L25.3249 14.8259C25.8324 14.3184 26.6724 14.3184 27.1799 14.8259C27.6874 15.3334 27.6874 16.1735 27.1799 16.681L16.6799 27.1811C16.4174 27.4436 16.0849 27.5659 15.7525 27.5659Z" fill="#68C187"></path></svg>
                                                    :
                                                    <svg width="42" height="42" viewBox="0 0 42 42" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M6.98057 25.6522L4.32059 22.9924C3.23559 21.9074 3.23559 20.1224 4.32059 19.0374L6.98057 16.3772C7.43557 15.9222 7.80307 15.0297 7.80307 14.3997V10.6373C7.80307 9.0973 9.06307 7.83725 10.6031 7.83725H14.3656C14.9956 7.83725 15.8881 7.4698 16.3431 7.0148L19.0031 4.35477C20.0881 3.26977 21.8731 3.26977 22.9581 4.35477L25.6181 7.0148C26.0731 7.4698 26.9656 7.83725 27.5956 7.83725H31.3581C32.8981 7.83725 34.1581 9.0973 34.1581 10.6373V14.3997C34.1581 15.0297 34.5256 15.9222 34.9806 16.3772L37.6406 19.0374C38.7256 20.1224 38.7256 21.9074 37.6406 22.9924L34.9806 25.6522C34.5256 26.1072 34.1581 26.9997 34.1581 27.6297V31.3922C34.1581 32.9322 32.8981 34.1922 31.3581 34.1922H27.5956C26.9656 34.1922 26.0731 34.5599 25.6181 35.0149L22.9581 37.6749C21.8731 38.7599 20.0881 38.7599 19.0031 37.6749L16.3431 35.0149C15.8881 34.5599 14.9956 34.1922 14.3656 34.1922H10.6031C9.06307 34.1922 7.80307 32.9322 7.80307 31.3922V27.6297C7.80307 26.9822 7.43557 26.0897 6.98057 25.6522Z" fill="#E0E0E0"></path><path d="M26.247 28C25.267 28 24.4795 27.2125 24.4795 26.25C24.4795 25.2875 25.267 24.5 26.2295 24.5C27.192 24.5 27.9795 25.2875 27.9795 26.25C27.9795 27.2125 27.2095 28 26.247 28Z" fill="#AAAAAA"></path><path d="M15.7675 17.5C14.7875 17.5 14 16.7125 14 15.75C14 14.7875 14.7875 14 15.75 14C16.7125 14 17.5 14.7875 17.5 15.75C17.5 16.7125 16.73 17.5 15.7675 17.5Z" fill="#AAAAAA"></path><path d="M15.7525 27.5649C15.42 27.5649 15.0875 27.4426 14.825 27.1801C14.3175 26.6726 14.3175 25.8324 14.825 25.3249L25.3249 14.825C25.8324 14.3175 26.6724 14.3175 27.1799 14.825C27.6874 15.3325 27.6874 16.1725 27.1799 16.68L16.6799 27.1801C16.4174 27.4426 16.0849 27.5649 15.7525 27.5649Z" fill="#AAAAAA"></path></svg>
                                            }
                                        </div>
                                        <div className={`w-2/3 flex flex-col px-4 ${isExpired && item.status === "NotUsed" ? "" : "text-gray-400"}`}>
                                            <h2 className='font-bold text-lg'>{item.voucher.voucherCode}</h2>
                                            <h4 className='text-sm'>{item.voucher.description}</h4>
                                            <h5 className='text-sm'>Hạn sử dụng: {format(item.voucher.expireDate, "dd/MM/yyy")}</h5>
                                        </div>
                                        <div className="w-1/4">
                                            {
                                                isExpired && item.status === "NotUsed" ?
                                                    <p className={`rounded-md p-2 text-center font-semibold text-white bg-main`}>Chưa sử dụng</p>
                                                    :
                                                    <p className='rounded-md p-2 text-center font-semibold text-gray-500 bg-gray-200'>Đã hết</p>
                                            }
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                        :
                        <div className="flex w-full flex-col justify-center items-center mt-10">
                            <img loading="lazy" src="/noVoucher.svg" />
                            <h3 className="font-bold text-xl text-gray-500">Không có quà nào dành cho bạn</h3>
                        </div>
                }
            </div>
        </>
    )
}

export default MyVoucher