import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { adminTokenSelector, modalObjectSelector, modalUserIdSelector, modalViewUserSelector } from "../../../redux/selector";
import { ModalBody } from "react-bootstrap";
import Modal from 'react-bootstrap/Modal';
import { clearModalUserId, clearModalViewUser, setModalObject } from "../../../redux/Slice/ModalSlice";
import { getAllVoucherByUserId, getInformationUserById } from "../../../api/appAPI";
import { format } from "date-fns";
import { findInformationAdminById } from "../../../api/adminAPI";
import { getAllAddressByUserId, getInformationLicenseById } from "../../../api/userAPI";
import { compareDay } from "../../../utils/compareDay";

function ModalViewUser() {
    const dispatch = useDispatch()
    const token = useSelector(adminTokenSelector)
    const userId = useSelector(modalUserIdSelector);
    const modalViewUser = useSelector(modalViewUserSelector)
    const modalObject = useSelector(modalObjectSelector)

    const [userInfo, setUserInfo] = useState({})
    const [imageLicense, setImageLicense] = useState('')
    const [licenseNumber, setLicenseNumber] = useState('')
    const [allAddress, setAllAddress] = useState([])

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


    const fetchDataUser = async () => {
        if (userId && token) {
            if (modalObject === "user") {
                let res = await getInformationUserById(userId, token)
                if (res) {
                    setUserInfo(res)
                } else {
                    setUserInfo({})
                }
            }
            else if (modalObject === "admin") {
                let res = await findInformationAdminById(userId, token)
                if (res) {
                    setUserInfo(res)
                } else {
                    setUserInfo({})
                }
            }
        }
    }

    const fetchDataLicense = async () => {
        if (userId && token) {
            if (modalObject === "user") {
                let ress = await getInformationLicenseById(userId, token)
                setLicenseNumber(ress.licenseNumber)
                setImageLicense(ress.fileUpload)
            }
        }
    }

    const fetchAllAddressById = async () => {
        let res = await getAllAddressByUserId(userId, token)
        if (res) {
            setAllAddress(res)
        }
    }


    const handleCloseModal = () => {
        dispatch(clearModalUserId())
        dispatch(clearModalViewUser())
        dispatch(setModalObject(null))
    }

    useEffect(() => {
        fetchDataUser()
        fetchDataLicense()
        fetchAllAddressById()
        fetchAllVoucherByUserId()
    }, [])

    return (
        <Modal
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            show={modalViewUser}
        >
            <Modal.Header className='border-none justify-between mt-3 px-10'>
                <h2 className="text-2xl font-bold">Thông tin tài khoản</h2>
                <i className="fa-solid fa-xmark fa-2xl cursor-pointer" onClick={handleCloseModal}></i>
            </Modal.Header>
            <ModalBody>
                <div className="bg-white rounded-2xl py-2 px-4" >
                    <div className="flex sm:flex-col md:flex-col lg:flex-row xl:flex-row items-center">
                        <div className="sm:w-full md:w-full lg:w-1/3 xl:w-1/3 flex justify-center flex-col gap-2 items-center px-3">
                            <div className="rounded-full overflow-hidden border-2">
                                <img loading="lazy" className="h-48" src={userInfo && userInfo.avatarImage ? userInfo.avatarImage : '/avaMale.png'} />
                            </div>
                            <h2 className="sm:text-xl md:text-xl lg:text-lg xl:text-lg font-semibold">{userInfo && userInfo.fullname && userInfo.fullname}</h2>
                            {
                                modalObject === "user" &&
                                <p className="text-sm">Tham gia: {userInfo && userInfo.joinDate && format(userInfo.joinDate, 'dd/MM/yyyy')}</p>
                            }
                        </div>
                        <div className="sm:w-full md:w-full lg:w-2/3 xl:w-2/3 text-gray-500 sm:mt-4 md:mt-5 lg:pl-5 xl:pl-5">
                            <div className="bg-gray-100 rounded-lg p-3 flex flex-col gap-3">
                                <div className="flex flex-row justify-between">
                                    <p className="text-sm">Tên đăng nhập</p>
                                    <span className="text-black text-base font-semibold">{userInfo && userInfo.username && userInfo.username}</span>
                                </div>
                                <div className="flex flex-row justify-between">
                                    <p className="text-sm">Ngày sinh</p>
                                    <span className="text-black text-base font-semibold">{userInfo && userInfo.dob ? format(userInfo.dob, 'dd-MM-yyyy') : '----/----/--------'}</span>
                                </div>

                                <div className="flex flex-row justify-between">
                                    <p className="text-sm">Giới tính</p>
                                    <span className="text-black text-base font-semibold">{userInfo && userInfo.gender ? userInfo.gender : 'Chưa cập nhật'}</span>
                                </div>

                                <div className="flex flex-row justify-between">
                                    <p className="text-sm">Số điện thoại</p>
                                    <span className="text-black text-base font-semibold">{userInfo && userInfo.phone ? userInfo.phone : 'Chưa cập nhật'}</span>
                                </div>

                                <div className="flex flex-row justify-between">
                                    <p className="text-sm">Email</p>
                                    <span className="text-black text-base font-semibold">{userInfo && userInfo.email ? userInfo.email : 'Chưa cập nhật'}</span>
                                </div>

                                {
                                    modalObject === "admin" &&
                                    <div className="flex flex-row justify-between">
                                        <p className="text-sm">Chức vụ</p>
                                        {
                                            userInfo && userInfo.role === "staff" ?
                                                <span className="text-black text-base font-semibold">Nhân viên</span>
                                                :
                                                <span className="text-black text-base font-semibold">Quản trị viên</span>
                                        }
                                    </div>
                                }
                            </div>
                        </div>
                    </div>

                    {
                        modalObject === "user" &&
                        <>

                            <>
                                <h1 className="text-xl font-semibold mt-4">Giấy phép lái xe</h1>
                                <div className="flex flex-row mt-2">
                                    {
                                        licenseNumber ?
                                            <div className="w-full flex justify-center items-center">
                                                <div className="w-1/2 flex justify-center flex-col gap-3 pr-5">
                                                    <div>
                                                        <label className="font-semibold text-gray-500 text-md w-full">Số GPLX</label>
                                                        <p className="outline-none w-full p-2 mt-2 rounded-lg bg-white border">
                                                            {licenseNumber ? licenseNumber : "---------------------"}
                                                        </p>
                                                    </div>
                                                    <div>
                                                        <label className="font-semibold text-gray-500 text-md w-full">Họ và tên</label>
                                                        <p className="outline-none w-full p-2 mt-2 rounded-lg bg-white border">
                                                            {userInfo && userInfo.fullname && userInfo.fullname}
                                                        </p>
                                                    </div>
                                                    <div>
                                                        <label className="font-semibold text-gray-500 text-md w-full">Ngày sinh</label>
                                                        <p className="outline-none w-full p-2 mt-2 rounded-lg bg-white border" >
                                                            {userInfo && userInfo.dob ? format(userInfo.dob, 'dd-MM-yyyy') : "----/----/--------"}
                                                        </p>
                                                    </div>
                                                </div>
                                                <div className="w-1/2">
                                                    <div className="border-2 border-dashed rounded-xl w-full relative p-2 mt-4">
                                                        <div className="flex flex-col items-center justify-center w-full h-full">
                                                            <img loading="lazy" src={imageLicense && imageLicense} />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            :
                                            <div className="text-center w-full flex flex-col justify-center items-center">
                                                <img loading="lazy" className="h-44" src="/noAddress.svg" />
                                                <h3 className="font-bold text-xl text-gray-500">Bạn chưa đăng ký giấy phép lái xe</h3>
                                            </div>


                                    }
                                </div>
                            </>

                            <div className="rounded-xl mt-4 bg-white">
                                <div className="flex justify-between">
                                    <h1 className="text-xl font-semibold">Địa chỉ đã lưu</h1>
                                </div>

                                <div className="flex w-full flex-col justify-center items-center mt-2">
                                    {
                                        allAddress.length == 0 ?
                                            <div className="text-center">
                                                <img loading="lazy" className="h-44" src="/noAddress.svg" />
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
                                                                    <p className="text-sm text-gray-500 font-semibold">{item.streetAddress} - {item.ward} - {item.district} - {item.city}</p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    })
                                                }
                                            </>
                                    }
                                </div>
                            </div>

                            <>
                                <h1 className="text-xl font-semibold mb-4">Quà tặng của tôi</h1>
                                <div className="bg-white rounded-lg">
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
                                                                <h4 className='text-base'>{item.voucher.description}</h4>
                                                                <h5 className='text-sm'>Hạn sử dụng: {format(item.voucher.expireDate, "dd/MM/yyy")}</h5>
                                                            </div>
                                                            <div className="w-1/4">
                                                                {
                                                                    isExpired && item.status === "NotUsed" ?
                                                                        <p className={`rounded-md p-2 text-center font-bold text-white bg-main`}>Chưa sử dụng</p>
                                                                        :
                                                                        <p className='rounded-md p-2 text-center font-bold text-gray-500 bg-gray-200'>Đã hết</p>
                                                                }
                                                            </div>
                                                        </div>
                                                    </div>
                                                )
                                            })
                                            :
                                            <div className="flex w-full flex-col justify-center items-center mt-10">
                                                <img loading="lazy" className="h-48" src="/noVoucher.svg" />
                                                <h3 className="font-bold text-xl text-gray-500">Không có quà nào dành cho bạn</h3>
                                            </div>
                                    }
                                </div>
                            </>
                        </>
                    }
                </div >
            </ModalBody>
        </Modal >
    )

}

export default ModalViewUser