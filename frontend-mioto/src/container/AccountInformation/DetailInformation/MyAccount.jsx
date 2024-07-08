import { useEffect, useState } from "react"
import { getInformationLicenseById, postInformationLicenseById } from "../../../api/userAPI"
import AvatarEditor from 'react-avatar-editor';
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { tokenSelector, userIdSelector } from "../../../redux/selector";
import { format } from "date-fns";
import { setHideLoading, setShowLoading } from "../../../redux/Slice/AppSlice";
import { countTrip, getInformationUserById } from "../../../api/appAPI";
import { useNavigate } from "react-router-dom";
import { getListCar } from "../../../api/carAPI";



function MyAccount({ handleOpenEdit, showModalEdit }) {
    const dispatch = useDispatch()
    const token = useSelector(tokenSelector)
    const userId = useSelector(userIdSelector);
    const [userInfo, setUserInfo] = useState({})
    const [selectedFile, setSelectedFile] = useState(null);
    const [editor, setEditor] = useState(null);
    const [editLicense, setEditLicense] = useState(false)
    const [imageLicense, setImageLicense] = useState('')
    const [scale, setScale] = useState(1)
    const [formData, setFormData] = useState({
        licenseNumber: '',
    });
    const [listMyCar, setListMyCar] = useState([])
    const [tripCnt, setTripCnt] = useState(0)

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value || '',
        }));
    };

    const handleFileChange = (e) => {
        setSelectedFile(e.target.files[0]);
    };

    const handleScaleChange = (e) => {
        const newScale = parseFloat(e.target.value);
        setScale(newScale);
    };

    const fetchCountTrip = async () => {
        if (userId && token) {
            let res = await countTrip(userId)
            setTripCnt(res)
        }
    }

    const fetchDataUser = async () => {
        if (userId && token) {
            let res = await getInformationUserById(userId, token)
            setUserInfo(res)
        }
    }

    const fetchDataLicense = async () => {
        if (userId && token) {
            let ress = await getInformationLicenseById(userId, token)
            setFormData({
                'licenseNumber': ress.licenseNumber
            })
            setImageLicense(ress.fileUpload)
        }
    }

    const fetchListMyCar = async () => {
        try {
            let res = await getListCar(userId)
            if (res) {
                setListMyCar(res)
            } else {
                setListMyCar([])
            }
        } catch (error) {
            if (error.response && error.response.status === 500) {
                toast.error('Lỗi hệ thống');
            }
            console.error('Error:', error);
        }
    }


    useEffect(() => {
        fetchDataUser()
        fetchDataLicense()
        fetchListMyCar()
        fetchCountTrip()
    }, [])

    useEffect(() => {
        fetchDataUser()
    }, [showModalEdit])



    const closeEditLicense = () => {
        setEditLicense(false)
        setSelectedFile('')
    }

    const postInformationLicense = async () => {
        if (userId) {
            try {
                dispatch(setShowLoading())
                if (!formData.licenseNumber) {
                    toast.error("Thiếu dữ liệu")
                    return
                }
                if (editor) {
                    const canvas = editor.getImageScaledToCanvas();
                    const dataURL = canvas.toDataURL();
                    formData['fileUpload'] = dataURL;
                }
                let res = await postInformationLicenseById(userId, formData, token)
                if (res) {
                    toast.success('Cập nhật thành công')
                    setEditLicense(false)
                    fetchDataLicense()
                }
            } catch (error) {
                toast.error('Đã xảy ra lỗi. Vui lòng thử lại sau.');
            } finally {
                dispatch(setHideLoading())
            }
        }
    }

    return (
        <div className="flex flex-col gap-4">
            <div className="bg-white rounded-2xl sm:py-3 md:py-5 lg:py-5 xl:py-5 sm:px-5 md:px-4 lg:px-4 xl:px-4" >
                <div className="flex sm:flex-col md:flex-row lg:flex-row xl:flex-row justify-between pb-3">
                    <div className="flex flex-row gap-2 items-center">
                        <h2 className="sm:text-lg md:text-xl lg:text-2xl xl:text-2xl font-bold">
                            Thông tin tài khoản
                        </h2>
                        <div className="cursor-pointer w-7 h-7 p-1 border rounded-full" onClick={() => handleOpenEdit()}><svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M4.30732 14.1607L14.1673 4.30065L11.7007 1.83398L1.84065 11.694L1.83398 14.1673L4.30732 14.1607Z" stroke="black" strokeLinecap="round" strokeLinejoin="round"></path><path d="M10.2344 4.08789L11.9144 5.76788" stroke="black" strokeLinecap="round" strokeLinejoin="round"></path></svg></div>
                    </div>
                    <div className="border border-gray-300 rounded-lg flex flex-row items-center gap-1 sm:p-2 md:p-3 lg:p-3 xl:p-3 sm:mt-2 sm:w-1/2">
                        <svg className="sm:hidden" width="40" height="41" viewBox="0 0 60 61" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M8.11719 55.5V52.3883" stroke="#5FCF86" strokeWidth="4" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"></path><path d="M40.2734 55.5V52.3883" stroke="#5FCF86" strokeWidth="4" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"></path><path d="M11.2188 52.3884V28.5931" stroke="#5FCF86" strokeWidth="4" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"></path><path d="M25.9484 21.0604H18.8959C17.5209 21.0604 16.4062 22.1751 16.4062 23.5501V28.5933" stroke="#5FCF86" strokeWidth="4" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"></path><path d="M25.9531 28.5931H7.07471C5.92895 28.5931 5 29.522 5 30.6678V50.3137C5 51.4596 5.92895 52.3884 7.07471 52.3884H28.0278" stroke="#5FCF86" strokeWidth="4" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"></path><path d="M52.9282 18.2196H28.0317C26.8859 18.2196 25.957 19.1484 25.957 20.2943V50.3137C25.957 51.4596 26.8859 52.3884 28.0317 52.3884H52.9282C54.0741 52.3884 55.0029 51.4596 55.0029 50.3137V20.2943C55.0029 19.1484 54.0741 18.2196 52.9282 18.2196Z" stroke="#5FCF86" strokeWidth="4" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"></path><path d="M32.1797 52.3884V18.2196" stroke="#5FCF86" strokeWidth="4" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"></path><path d="M48.7695 18.2196V52.3884" stroke="#5FCF86" strokeWidth="4" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"></path><path d="M29.0625 55.5V52.3883" stroke="#5FCF86" strokeWidth="4" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"></path><path d="M51.8828 55.5V52.3883" stroke="#5FCF86" strokeWidth="4" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"></path><path d="M35.293 18.2197V7.98977C35.293 6.61486 36.4076 5.50013 37.7826 5.50013H43.1768C44.5519 5.50013 45.6665 6.61486 45.6665 7.98977V18.2197" stroke="#5FCF86" strokeWidth="4" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"></path></svg>
                        <svg className="md:hidden lg:hidden xl:hidden" width="20" height="21" viewBox="0 0 60 61" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M8.11719 55.5V52.3883" stroke="#5FCF86" strokeWidth="4" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"></path><path d="M40.2734 55.5V52.3883" stroke="#5FCF86" strokeWidth="4" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"></path><path d="M11.2188 52.3884V28.5931" stroke="#5FCF86" strokeWidth="4" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"></path><path d="M25.9484 21.0604H18.8959C17.5209 21.0604 16.4062 22.1751 16.4062 23.5501V28.5933" stroke="#5FCF86" strokeWidth="4" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"></path><path d="M25.9531 28.5931H7.07471C5.92895 28.5931 5 29.522 5 30.6678V50.3137C5 51.4596 5.92895 52.3884 7.07471 52.3884H28.0278" stroke="#5FCF86" strokeWidth="4" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"></path><path d="M52.9282 18.2196H28.0317C26.8859 18.2196 25.957 19.1484 25.957 20.2943V50.3137C25.957 51.4596 26.8859 52.3884 28.0317 52.3884H52.9282C54.0741 52.3884 55.0029 51.4596 55.0029 50.3137V20.2943C55.0029 19.1484 54.0741 18.2196 52.9282 18.2196Z" stroke="#5FCF86" strokeWidth="4" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"></path><path d="M32.1797 52.3884V18.2196" stroke="#5FCF86" strokeWidth="4" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"></path><path d="M48.7695 18.2196V52.3884" stroke="#5FCF86" strokeWidth="4" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"></path><path d="M29.0625 55.5V52.3883" stroke="#5FCF86" strokeWidth="4" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"></path><path d="M51.8828 55.5V52.3883" stroke="#5FCF86" strokeWidth="4" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"></path><path d="M35.293 18.2197V7.98977C35.293 6.61486 36.4076 5.50013 37.7826 5.50013H43.1768C44.5519 5.50013 45.6665 6.61486 45.6665 7.98977V18.2197" stroke="#5FCF86" strokeWidth="4" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"></path></svg>
                        <span className="text-main sm:text-2xl md:text-4xl lg:text-4xl xl:text-4xl font-bold">
                            {tripCnt}
                        </span>
                        <p>chuyến</p>
                    </div>
                </div>
                <div className="flex sm:flex-col md:flex-row lg:flex-row xl:flex-row items-center">
                    <div className="sm:w-full md:w-1/3 lg:w-1/3 xl:w-1/3 flex justify-center flex-col gap-3 items-center px-3">
                        <div className="rounded-full overflow-hidden border-2">
                            <img loading="lazy" className="sm:h-32" src={userInfo && userInfo.avatarImage ? userInfo.avatarImage : '/avaMale.png'} />
                        </div>
                        <h2 className="text-lg font-semibold">{userInfo && userInfo.fullname && userInfo.fullname}</h2>
                        <p className="text-sm">Tham gia: {userInfo && userInfo.joinDate && format(userInfo.joinDate, "dd/MM/yyyy")}</p>
                    </div>
                    <div className="sm:w-full md:w-2/3 lg:w-2/3 xl:w-2/3 text-gray-500 sm:pt-5 md:pl-5 lg:pl-5 xl:pl-5">
                        <div className="bg-gray-100 rounded-lg p-3 flex flex-col gap-3">
                            <div className="flex flex-row justify-between">
                                <p className="text-sm">Ngày sinh</p>
                                <span className="text-black sm:text-sm text-base font-semibold">{userInfo && userInfo.dob ? format(userInfo.dob, 'dd-MM-yyyy') : '----/----/--------'}</span>
                            </div>

                            <div className="flex flex-row justify-between">
                                <p className="text-sm">Giới tính</p>
                                <span className="text-black sm:text-sm text-base font-semibold">{userInfo && userInfo.gender ? userInfo.gender : 'Chưa cập nhật'}</span>
                            </div>

                            <div className="flex flex-row justify-between">
                                <p className="text-sm">Số điện thoại</p>
                                <span className="text-black sm:text-sm text-base font-semibold">{userInfo && userInfo.phone ? userInfo.phone : 'Chưa cập nhật'}</span>
                            </div>

                            <div className="flex flex-row justify-between">
                                <p className="text-sm">Email</p>
                                <span className="text-black sm:text-sm text-base font-semibold">{userInfo && userInfo.email ? userInfo.email : 'Chưa cập nhật'}</span>
                            </div>

                        </div>

                    </div>
                </div>
            </div >

            <div className="bg-white rounded-2xl py-5 px-4" >
                <h2 className="text-xl font-bold mb-3">
                    Giấy phép lái xe
                </h2>
                <div className="flex sm:gap-2 sm:flex-col md:flex-row lg:flex-row xl:flex-row items-center justify-between pb-3">
                    {
                        !editLicense ?
                            <div className="border border-black rounded-lg flex flex-row items-center gap-1 p-2 px-3 cursor-pointer" onClick={() => setEditLicense(true)}>
                                <p className="font-semibold text-sm">Chỉnh sửa</p>
                                <div><svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M4.30732 14.1607L14.1673 4.30065L11.7007 1.83398L1.84065 11.694L1.83398 14.1673L4.30732 14.1607Z" stroke="black" strokeLinecap="round" strokeLinejoin="round"></path><path d="M10.2344 4.08789L11.9144 5.76788" stroke="black" strokeLinecap="round" strokeLinejoin="round"></path></svg></div>
                            </div>
                            :
                            <div className="flex gap-4">
                                <div className="border border-black rounded-lg flex flex-row items-center gap-1 p-2 px-3 cursor-pointer" onClick={() => closeEditLicense()}>
                                    Hủy bỏ
                                </div>
                                <div className="border rounded-lg flex flex-row items-center gap-1 p-2 px-3 bg-main text-white cursor-pointer" onClick={() => postInformationLicense()}>
                                    Lưu
                                </div>
                            </div>
                    }

                </div>
                <div className="flex sm:flex-col-reverse md:flex-row lg:flex-row xl:flex-row">
                    <div className="sm:w-full md:w-1/2 lg:w-1/2 xl:w-1/2 flex justify-center flex-col gap-3 pr-5">
                        <h3 className="mb-1 sm:mt-4 font-semibold text-lg">Thông tin chung</h3>
                        <div>
                            <label className="font-semibold text-gray-500 text-md w-full">Số GPLX</label>
                            <input className="outline-none w-full p-2 mt-2 rounded-lg bg-white border disabled:opacity-50" disabled={!editLicense} placeholder="Nhập số GPLX đã cấp" name="licenseNumber" onChange={handleChange} value={formData.licenseNumber || ''} />
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
                    <div className="sm:w-full md:w-1/2 lg:w-1/2 xl:w-1/2">
                        <div className="flex flex-row gap-2 items-center justify-center">
                            <h3 className="font-semibold text-lg">Hình ảnh</h3>
                            {
                                editLicense ?
                                    <div>
                                        <label htmlFor="avatarInput" className="cursor-pointer">
                                            <svg width="45" height="46" viewBox="0 0 45 46" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M29.2498 36.7042H32.7748C36.8623 36.7042 39.8436 32.0659 39.8436 28.1559C39.8183 26.8801 39.5373 25.6232 39.0181 24.4628C38.4989 23.3024 37.7524 22.2631 36.8248 21.4092C35.3633 20.1219 33.4613 19.4807 31.5373 19.6267C31.3697 19.6453 31.2002 19.6297 31.0386 19.5808C30.8769 19.5319 30.7263 19.4508 30.5956 19.3421C30.4648 19.2333 30.3564 19.0992 30.2767 18.9473C30.1969 18.7955 30.1475 18.629 30.1311 18.4575C29.3623 5.96087 11.0623 6.13337 10.7811 18.975C10.7766 19.2372 10.6981 19.4924 10.555 19.71C10.412 19.9276 10.2105 20.0984 9.97484 20.2017C8.24176 21.0791 6.84492 22.523 6.00592 24.3042C5.16693 26.0855 4.93382 28.1021 5.34359 30.0342C5.57802 31.2377 6.05826 32.377 6.75292 33.3777C7.44758 34.3785 8.34102 35.2181 9.37484 35.8417C10.6707 36.5604 12.1426 36.8799 13.6123 36.7617H15.9561" stroke="#5FCF86" strokeWidth="2.44717" strokeLinecap="round" strokeLinejoin="round"></path><path d="M22.5 36.7808V23.4983" stroke="#5FCF86" strokeWidth="2.44717" strokeLinecap="round" strokeLinejoin="round"></path><path d="M18.4307 27.3316L22.4994 23.1917L26.5682 27.3316" stroke="#5FCF86" strokeWidth="2.44717" strokeLinecap="round" strokeLinejoin="round"></path></svg>
                                        </label>
                                        <input type="file" id="avatarInput" style={{ display: 'none' }} onChange={handleFileChange} />
                                    </div>
                                    :
                                    <div className="invisible">
                                        <label htmlFor="avatarInput" className="cursor-pointer">
                                            <svg width="45" height="46" viewBox="0 0 45 46" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M29.2498 36.7042H32.7748C36.8623 36.7042 39.8436 32.0659 39.8436 28.1559C39.8183 26.8801 39.5373 25.6232 39.0181 24.4628C38.4989 23.3024 37.7524 22.2631 36.8248 21.4092C35.3633 20.1219 33.4613 19.4807 31.5373 19.6267C31.3697 19.6453 31.2002 19.6297 31.0386 19.5808C30.8769 19.5319 30.7263 19.4508 30.5956 19.3421C30.4648 19.2333 30.3564 19.0992 30.2767 18.9473C30.1969 18.7955 30.1475 18.629 30.1311 18.4575C29.3623 5.96087 11.0623 6.13337 10.7811 18.975C10.7766 19.2372 10.6981 19.4924 10.555 19.71C10.412 19.9276 10.2105 20.0984 9.97484 20.2017C8.24176 21.0791 6.84492 22.523 6.00592 24.3042C5.16693 26.0855 4.93382 28.1021 5.34359 30.0342C5.57802 31.2377 6.05826 32.377 6.75292 33.3777C7.44758 34.3785 8.34102 35.2181 9.37484 35.8417C10.6707 36.5604 12.1426 36.8799 13.6123 36.7617H15.9561" stroke="#5FCF86" strokeWidth="2.44717" strokeLinecap="round" strokeLinejoin="round"></path><path d="M22.5 36.7808V23.4983" stroke="#5FCF86" strokeWidth="2.44717" strokeLinecap="round" strokeLinejoin="round"></path><path d="M18.4307 27.3316L22.4994 23.1917L26.5682 27.3316" stroke="#5FCF86" strokeWidth="2.44717" strokeLinecap="round" strokeLinejoin="round"></path></svg>
                                        </label>
                                        <input type="file" id="avatarInput" style={{ display: 'none' }} onChange={handleFileChange} />
                                    </div>
                            }
                        </div>
                        <div className="border-2 border-dashed rounded-xl w-full h-[300px] relative">
                            <div className="flex flex-col items-center justify-center w-full h-full">
                                {
                                    editLicense ?
                                        <>
                                            {selectedFile && (
                                                <div className="flex justify-center flex-col">
                                                    <AvatarEditor
                                                        ref={(ref) => setEditor(ref)}
                                                        image={selectedFile}
                                                        width={250}
                                                        height={150}
                                                        border={50}
                                                        color={[0, 0, 0, 0.5]}
                                                        scale={scale}
                                                        rotate={0}
                                                    />
                                                    <input
                                                        type="range"
                                                        min="1"
                                                        max="2"
                                                        step="0.01"
                                                        value={scale}
                                                        onChange={handleScaleChange}
                                                    />
                                                </div>
                                            )}
                                        </>
                                        :
                                        <img loading="lazy" src={imageLicense} />
                                }
                            </div>

                        </div>
                    </div>
                </div>
            </div >

            <div className="bg-white rounded-2xl py-5 sm:px-4 md:px-4 lg:px-4 xl:px-4" >
                <div className="flex flex-col pb-3">
                    <h2 className="text-xl font-bold">
                        Danh sách xe
                    </h2>
                    <div className="flex w-full flex-col justify-center items-center mt-10">
                        {
                            listMyCar && listMyCar.length > 0 ?
                                listMyCar.map((item, index) => {
                                    return (
                                        <div className="flex sm:flex-col md:flex-row lg:flex-row xl:flex-row w-full bg-white sm:p-2 md:p-4 lg:p-4 xl:p-4 rounded-xl mb-5" key={index}>
                                            <div className="sm:w-full md:w-2/3 lg:w-2/3 xl:w-2/3 flex flex-col justify-center items-center sm:border-none border-r-2 sm:pr-0 pr-8">
                                                <h3 className="text-xl font-semibold">{item.brand}</h3>
                                                <h2 className="sm:text-base text-2xl font-bold">{item.model} {item.modelYear}</h2>
                                                <h3 className="text-xl font-semibold">{item.plateNumber}</h3>
                                                <div className="w-full flex justify-evenly mt-4">
                                                    <div className="flex sm:flex-col md:flex-row lg:flex-row xl:flex-row justify-center items-center gap-1">
                                                        <div className="">
                                                            <svg width="24" height="24" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M10.914 23.3289C10.9148 23.3284 10.9156 23.3279 10.9163 23.3274C10.9155 23.3279 10.9148 23.3284 10.914 23.3289ZM10.914 23.3289C10.914 23.3289 10.914 23.3289 10.914 23.3289L11.3128 23.9114M10.914 23.3289L11.3128 23.9114M11.3128 23.9114L10.9807 23.2882L20.6697 23.9458C20.6682 23.9484 20.6656 23.9496 20.6631 23.9479C20.655 23.9424 20.6343 23.9284 20.6014 23.9074C20.6014 23.9073 20.6014 23.9073 20.6013 23.9073C20.5141 23.8516 20.3413 23.7468 20.0921 23.6208C20.0919 23.6207 20.0918 23.6206 20.0917 23.6206C19.3397 23.2404 17.8926 22.6674 16.0003 22.6674C14.1715 22.6674 12.7584 23.2026 11.9869 23.5817L11.9929 23.5929M11.3128 23.9114L11.331 23.9456C11.3324 23.9483 11.3352 23.9495 11.3377 23.9478C11.3444 23.9432 11.3592 23.9332 11.3821 23.9184L11.9929 23.5929L11.9929 23.5929M11.9929 23.5929C11.9909 23.5892 11.9889 23.5855 11.9868 23.5818C11.6767 23.7342 11.4702 23.8614 11.3821 23.9184L11.9929 23.5929ZM10.6691 24.2983L10.6691 24.2983C10.7406 24.4324 10.8728 24.5792 11.0793 24.6538C11.3072 24.7361 11.5609 24.7039 11.7614 24.5667L11.7614 24.5667C11.7978 24.5418 13.4597 23.4174 16.0003 23.4174C18.5426 23.4174 20.205 24.5432 20.2393 24.5667L20.2393 24.5667C20.4389 24.7034 20.6938 24.7372 20.9245 24.6528C21.1293 24.5779 21.2557 24.4338 21.3233 24.3136L22.4886 22.2427L24.3242 23.0447L21.6934 28.584H9.99882L7.65051 23.0635L9.57427 22.2435L10.6691 24.2983ZM24.4348 22.8117L24.4345 22.8124L24.4348 22.8117Z" stroke="#5FCF86" strokeWidth="1.5"></path><path d="M12.75 4.66675C12.75 3.97639 13.3096 3.41675 14 3.41675H18C18.6904 3.41675 19.25 3.97639 19.25 4.66675V7.00008C19.25 7.13815 19.1381 7.25008 19 7.25008H13C12.8619 7.25008 12.75 7.13815 12.75 7.00008V4.66675Z" stroke="#5FCF86" strokeWidth="1.5"></path><path d="M9.33398 22.6668L9.90564 11.2336C9.95887 10.1692 10.8374 9.3335 11.9031 9.3335H20.0982C21.1639 9.3335 22.0424 10.1692 22.0957 11.2336L22.6673 22.6668" stroke="#5FCF86" strokeWidth="1.5"></path><path d="M14.667 7.35815V9.8901" stroke="#5FCF86" strokeWidth="1.5"></path><path d="M17.334 7.35815V9.8901" stroke="#5FCF86" strokeWidth="1.5"></path></svg>
                                                        </div>
                                                        <div className="">
                                                            <span className="font-semibold text-lg">{item.capacity} chỗ</span>
                                                        </div>
                                                    </div>

                                                    <div className="flex sm:flex-col md:flex-row lg:flex-row xl:flex-row justify-center items-center gap-1">
                                                        <div className="">
                                                            <svg width="24" height="24" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M25.9163 7.99992C25.9163 9.05846 25.0582 9.91659 23.9997 9.91659C22.9411 9.91659 22.083 9.05846 22.083 7.99992C22.083 6.94137 22.9411 6.08325 23.9997 6.08325C25.0582 6.08325 25.9163 6.94137 25.9163 7.99992Z" stroke="#5FCF86" strokeWidth="1.5"></path><circle cx="23.9997" cy="23.9999" r="1.91667" stroke="#5FCF86" strokeWidth="1.5"></circle><path d="M17.9163 7.99992C17.9163 9.05846 17.0582 9.91659 15.9997 9.91659C14.9411 9.91659 14.083 9.05846 14.083 7.99992C14.083 6.94137 14.9411 6.08325 15.9997 6.08325C17.0582 6.08325 17.9163 6.94137 17.9163 7.99992Z" stroke="#5FCF86" strokeWidth="1.5"></path><path d="M17.9163 23.9999C17.9163 25.0585 17.0582 25.9166 15.9997 25.9166C14.9411 25.9166 14.083 25.0585 14.083 23.9999C14.083 22.9414 14.9411 22.0833 15.9997 22.0833C17.0582 22.0833 17.9163 22.9414 17.9163 23.9999Z" stroke="#5FCF86" strokeWidth="1.5"></path><circle cx="7.99967" cy="7.99992" r="1.91667" stroke="#5FCF86" strokeWidth="1.5"></circle><path d="M10.1025 26.6666V21.3333H7.99837C7.59559 21.3333 7.25184 21.4053 6.96712 21.5494C6.68066 21.6918 6.46278 21.894 6.31348 22.1562C6.16244 22.4166 6.08691 22.723 6.08691 23.0754C6.08691 23.4296 6.1633 23.7343 6.31608 23.9895C6.46886 24.243 6.69021 24.4374 6.98014 24.5728C7.26834 24.7083 7.6173 24.776 8.02702 24.776H9.43587V23.8697H8.20931C7.99403 23.8697 7.81521 23.8402 7.67285 23.7812C7.53049 23.7221 7.42459 23.6336 7.35514 23.5155C7.28396 23.3975 7.24837 23.2508 7.24837 23.0754C7.24837 22.8984 7.28396 22.7491 7.35514 22.6275C7.42459 22.506 7.53136 22.414 7.67546 22.3515C7.81782 22.2872 7.9975 22.2551 8.21452 22.2551H8.97493V26.6666H10.1025ZM7.22233 24.2395L5.89681 26.6666H7.1416L8.43848 24.2395H7.22233Z" fill="#5FCF86"></path><path d="M24 10.6665V15.9998M24 21.3332V15.9998M16 10.6665V21.3332M8 10.6665V15.4998C8 15.776 8.22386 15.9998 8.5 15.9998H24" stroke="#5FCF86" strokeWidth="1.5" strokeLinecap="round"></path></svg>
                                                        </div>
                                                        <div className="">
                                                            <span className="font-semibold text-lg">{item.transmission}</span>
                                                        </div>

                                                    </div>

                                                    <div className="flex sm:flex-col md:flex-row lg:flex-row xl:flex-row justify-center items-center gap-1">
                                                        <div className="">
                                                            <svg width="24" height="24" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M24.3337 27.2499H7.66699C7.52892 27.2499 7.41699 27.138 7.41699 26.9999V12.4599C7.41699 12.3869 7.44888 12.3175 7.5043 12.27L14.652 6.14344L14.1639 5.574L14.652 6.14344C14.6973 6.1046 14.755 6.08325 14.8147 6.08325H24.3337C24.4717 6.08325 24.5837 6.19518 24.5837 6.33325V26.9999C24.5837 27.138 24.4717 27.2499 24.3337 27.2499Z" stroke="#5FCF86" strokeWidth="1.5" strokeLinecap="round"></path><path d="M12.0001 5.33325L7.42285 9.46712" stroke="#5FCF86" strokeWidth="1.5" strokeLinecap="round"></path><path d="M17.888 19.5212L16.7708 15.93C16.5378 15.1812 15.4785 15.1798 15.2436 15.928L14.1172 19.5164C13.7178 20.7889 14.6682 22.0833 16.0019 22.0833C17.3335 22.0833 18.2836 20.7927 17.888 19.5212Z" stroke="#5FCF86" strokeWidth="1.5" strokeLinecap="round"></path><path d="M23.2503 3.66675V5.66675C23.2503 5.80482 23.1384 5.91675 23.0003 5.91675H14.667C14.5827 5.91675 14.5365 5.8916 14.5072 5.86702C14.4721 5.83755 14.44 5.78953 14.4245 5.72738C14.4089 5.66524 14.4147 5.60775 14.4318 5.56523C14.4461 5.52975 14.4749 5.48584 14.5493 5.44616L18.2993 3.44616C18.3356 3.42685 18.376 3.41675 18.417 3.41675H23.0003C23.1384 3.41675 23.2503 3.52868 23.2503 3.66675Z" stroke="#5FCF86" strokeWidth="1.5" strokeLinecap="round"></path></svg>
                                                        </div>
                                                        <div className="">
                                                            <span className="font-semibold text-lg">{item.fuelType}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="w-full mt-3 font-semibold flex justify-evenly">
                                                    <div className="flex flex-col justify-center sm:text-sm items-center gap-1">
                                                        <h3>Giá thuê</h3>
                                                        <span>{item.pricePerDay} K (VNĐ)</span>
                                                    </div>
                                                    <div className="flex flex-col justify-center sm:text-sm items-center gap-1">
                                                        <h3>Giá cọc</h3>
                                                        <span>{item.mortgage ? <>{item.mortgage} K (VND)</> : "Không cần cọc"}</span>
                                                    </div>
                                                    <div className="flex flex-col justify-center sm:text-sm items-center gap-1">
                                                        <h3>Trạng thái</h3>
                                                        <span>{item.status === 'Approving' ? 'Đang duyệt' : 'Đã duyệt'}</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="sm:mt-5 m:w-full md:w-1/3 lg:w-1/3 xl:w-1/3 sm:pl-0 md:pl-8 lg:pl-8  xl:pl-8 flex justify-center items-center">
                                                <img loading="lazy" className="rounded-lg" src={item.images && item.images.length > 0 && item.images[0].imageLink} />
                                            </div>
                                        </div>
                                    )
                                })

                                :

                                <div className="flex items-center flex-col">
                                    <img loading="lazy" src="/nocar.svg" />
                                    <h3 className="font-bold text-xl text-gray-500">Không tìm thấy xe nào</h3>
                                </div>
                        }
                    </div>

                </div >
            </div>
        </div>
    )
}

export default MyAccount