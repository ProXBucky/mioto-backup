import { useDispatch, useSelector } from "react-redux";
import { adminTokenSelector, modalAddCarSelector } from "../../../redux/selector";
import { ModalBody } from "react-bootstrap";
import Modal from 'react-bootstrap/Modal';
import { clearModalAddCar } from "../../../redux/Slice/ModalSlice";
import { useEffect, useRef, useState } from "react";
import ChooseSelector from "../../../features/search/ChooseSelector";
import AddressSelector from "../../../features/search/AdressSelector";
import { getAllCarFeature, getAllUser, getAllUserByAdmin } from "../../../api/appAPI";
import "../../AccountInformation/DetailInformation/RegisterSelfDrive.css"
import { format } from "date-fns";
import { toast } from "react-toastify";
import { setConponentLoad, setHideLoading, setShowLoading } from "../../../redux/Slice/AppSlice";
import { postNewCarByAdmin } from "../../../api/carAPI";

function ModalAddCar() {
    const dispatch = useDispatch();
    const modalAddCar = useSelector(modalAddCarSelector);
    const fileInputRef = useRef(null);  // Thêm tham chiếu cho input file

    const handleCloseModal = () => {
        dispatch(clearModalAddCar());
    };

    const adminToken = useSelector(adminTokenSelector);
    const [featureArray, setFeatureArray] = useState([]);
    const [valueAddress, setValueAddress] = useState({
        location: '',
        city: '',
        district: '',
        ward: '',
        streetAddress: ''
    });

    const handleChangeAddress = (name, value) => {
        setValueAddress(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const [formData1, setFormData1] = useState({
        hangXe: '',
        mauXe: ''
    });

    const handleChange1 = (name, value) => {
        setFormData1(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const [formData, setFormData] = useState({
        bienSo: '',
        moTa: '',
        giaThue: '',
        giaCoc: '',
        namSanXuat: '',
        truyenDong: '',
        loaiNhienLieu: '',
        soGhe: ''
    });

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const [selectedFeatures, setSelectedFeatures] = useState([]);

    const handleCheckboxChange = (event) => {
        const featureCode = event.target.value;
        if (event.target.checked) {
            setSelectedFeatures([...selectedFeatures, featureCode]);
        } else {
            setSelectedFeatures(selectedFeatures.filter(code => code !== featureCode));
        }
    };

    const [selectedImages, setSelectedImages] = useState([]);

    const handleDeleteAllImages = () => {
        setSelectedImages([]);
        if (fileInputRef.current) {
            fileInputRef.current.value = "";  // Đặt lại giá trị của input file
        }
    };

    const handleImageChange = async (event) => {
        const files = event.target.files;
        const imagesArray = [];
        for (let i = 0; i < files.length; i++) {
            const file = files[i];
            const reader = new FileReader();
            const promise = new Promise((resolve) => {
                reader.onload = (e) => {
                    resolve(e.target.result);
                };
            });
            reader.readAsDataURL(file);
            const imageDataUrl = await promise;
            imagesArray.push(imageDataUrl);
        }
        setSelectedImages(prevImages => [...prevImages, ...imagesArray]);
    };

    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState('');

    const handleChangeUser = (event) => {
        setSelectedUser(event.target.value);
    };

    const handleAddCar = async () => {
        try {
            dispatch(setShowLoading());
            let res = await postNewCarByAdmin(+selectedUser, {
                brand: formData1.hangXe,
                model: formData1.mauXe,
                modelYear: +formData.namSanXuat,
                capacity: +formData.soGhe,
                plateNumber: formData.bienSo,
                transmission: formData.truyenDong,
                fuelType: formData.loaiNhienLieu,
                mortgage: +formData.giaCoc,
                pricePerDay: +formData.giaThue,
                description: formData.moTa,
                streetAddress: valueAddress.streetAddress,
                ward: valueAddress.ward,
                district: valueAddress.district,
                city: valueAddress.city,
                location: valueAddress.location,
                arrayFeatureCode: selectedFeatures,
                arrayImageCar: selectedImages
            }, adminToken);
            if (res) {
                handleCloseModal();
                dispatch(setConponentLoad())
                toast.success('Đăng ký xe thành công');
            }
        } catch (error) {
            if (error.response && error.response.status === 409) {
                toast.error('Lỗi hệ thống');
            } else if (error.response && error.response.status === 400) {
                toast.error('Lỗi ảnh');
            } else {
                toast.error('Đã xảy ra lỗi trong quá trình đăng ký Xe. Vui lòng thử lại sau.');
            }
            console.error('Error:', error);
        } finally {
            dispatch(setHideLoading());
        }
    };

    const fetchAllFeature = async () => {
        try {
            const res = await getAllCarFeature();
            if (res && res.length > 0) {
                setFeatureArray(res);
            }
        } catch (err) {
            console.log(err);
        }
    };

    const fetchData = async () => {
        const res = await getAllUserByAdmin(adminToken);
        if (res) {
            setUsers(res);
        }
    };

    useEffect(() => {
        fetchAllFeature();
        fetchData();
    }, []);


    return (
        <Modal
            size="xl"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            dialogClassName="custom-modal"
            show={modalAddCar}
        >
            <Modal.Header className='border-none justify-between mt-3 px-10'>
                <h2 className="text-2xl font-bold">Thêm phương tiện</h2>
                <i className="fa-solid fa-xmark fa-2xl cursor-pointer" onClick={handleCloseModal}></i>
            </Modal.Header>
            <ModalBody>
                <div>
                    <div className='p-3 pt-2 flex flex-col items-center gap-4' >
                        <div className={`w-full bg-white`} >
                            <div className=''>
                                <div className="flex flex-col gap-3 sm:w-full md:w-1/2 lg:w-1/2 xl:w-1/2">
                                    <label className='font-bold text-xl'>Chủ phương tiện</label>
                                    <div>
                                        <select value={selectedUser} onChange={handleChangeUser} className="w-full p-2 border rounded-md">
                                            <option className="border-2 w-1/3" value="" disabled>Hãy chọn thông tin chủ xe</option>
                                            {users && users.length > 0 &&
                                                users.map(user => (
                                                    <option className="border-2 flex items-center" key={user.userId} value={user.userId}>
                                                        {user.fullname} | {user.dob ? format(user.dob, "dd/MM/yyyy") : "Chưa cập nhật"}
                                                    </option>
                                                ))}
                                        </select>
                                    </div>
                                </div>
                            </div>

                            <div className='mt-3'>
                                <div className="flex flex-col gap-3 sm:w-full md:w-1/2 lg:w-1/2 xl:w-1/2">
                                    <label className='font-bold text-xl'>Biển số xe</label>
                                    <input
                                        className="p-2 px-3 border rounded-md outline-none" type="text" name="bienSo"
                                        value={formData.bienSo}
                                        onChange={handleChange}
                                        placeholder="99G99999"
                                        required
                                    />
                                </div>
                            </div>

                            <div className='mt-3'>
                                <div className="flex flex-col gap-3 w-full">
                                    <label className='font-bold text-xl'>Thông tin cơ bản</label>
                                    <div className="flex flex-wrap sm:gap-5 md:gap-10 lg:gap-10 xl:gap-10">
                                        <ChooseSelector handleChange1={handleChange1} />
                                        <div className="flex-col flex sm:w-full md:w-[calc(50%-30px)] lg:w-[calc(50%-30px)] xl:w-[calc(50%-30px)]">
                                            <label htmlFor="year">Năm sản xuất</label>
                                            <select id="year" className='p-2 border mt-2 rounded-md cursor-pointer' name="namSanXuat" onChange={handleChange}>
                                                <option value="">Chọn năm</option>
                                                {Array.from({ length: 20 }, (_, i) => i + 2005).map((year) => (
                                                    <option className="cursor-pointer" key={year} value={year}>{year}</option>
                                                ))}
                                            </select>
                                        </div>


                                        <div className="flex-col flex sm:w-full md:w-[calc(50%-30px)] lg:w-[calc(50%-30px)] xl:w-[calc(50%-30px)]">
                                            <label>Truyền động</label>
                                            <select id="transition" className='p-2 border mt-2 rounded-md cursor-pointer' name="truyenDong" onChange={handleChange}>
                                                <option className="cursor-pointer" value="">Chọn truyền động</option>
                                                <option className="cursor-pointer" value="Số tự động">Số tự động</option>
                                                <option className="cursor-pointer" value="Số sàn">Số sàn</option>
                                            </select>
                                        </div>

                                        <div className="flex-col flex sm:w-full md:w-[calc(50%-30px)] lg:w-[calc(50%-30px)] xl:w-[calc(50%-30px)]">
                                            <label>Loại nhiên liệu</label>
                                            <select id="fuelType" className='p-2 border mt-2 rounded-md cursor-pointer' name="loaiNhienLieu" onChange={handleChange}>
                                                <option className="cursor-pointer" value="">Chọn nhiên liệu</option>
                                                <option className="cursor-pointer" value="Xăng">Xăng</option>
                                                <option className="cursor-pointer" value="Dầu diesel">Dầu diesel</option>
                                                <option className="cursor-pointer" value="Điện">Điện</option>
                                            </select>
                                        </div>

                                        <div className="flex-col flex sm:w-full md:w-[calc(50%-30px)] lg:w-[calc(50%-30px)] xl:w-[calc(50%-30px)]">
                                            <label htmlFor="capacity">Số ghế</label>
                                            <select id="capacity" className='p-2 border mt-2 rounded-md cursor-pointer' name="soGhe" onChange={handleChange}>
                                                <option value="">Chọn số ghế</option>
                                                {Array.from({ length: 17 }, (_, i) => i + 4).map((number) => (
                                                    <option className="cursor-pointer" key={number} value={number}>{number}</option>
                                                ))}
                                            </select>
                                        </div>


                                    </div>

                                </div>
                            </div>



                            <div className='mt-3'>
                                <div className="flex flex-col gap-3 w-full">
                                    <label className='font-bold text-xl'>Mô tả</label>
                                    <textarea className="textarea outline-0 p-2 border h-32" name="moTa" value={formData.moTa} onChange={handleChange}
                                        placeholder="Huyndai Elantra số tự động đăng kí tháng 06/2018. Xe gia đình mới đẹp, nội thất nguyên bản, sạch sẽ, bảo dưỡng thường xuyên, rửa xe miễn phí cho khách. Xe rộng rãi, an toàn, tiện nghi, phù hợp cho gia đình du lịch. Xe trang bị hệ thống cảm biến lùi, gạt mưa tự động, đèn pha tự động, camera hành trình, hệ thống giải trí AV cùng nhiều tiện nghi khác..."></textarea>
                                </div>
                            </div>




                            <div className='mt-3'>
                                <div className="flex flex-col gap-3 w-full">
                                    <label className='font-bold text-xl'>Tính năng</label>
                                    <div className="mt-3 flex flex-wrap gap-5">
                                        <div className="list-feature flex flex-wrap gap-3">
                                            {
                                                featureArray && featureArray.length > 0 &&
                                                featureArray.map((item, index) => {
                                                    return (
                                                        <div className="squaredThree have-label cursor-pointer border sm:w-[calc(50%-10px)] md:w-[calc(32%-10px)] lg:w-[calc(24%-10px)] xl:w-[calc(24%-10px)]" key={index}>
                                                            <input id={item.featureCode} type="checkbox"
                                                                className="hidden" name="filter-car-feature" value={item.featureCode}
                                                                onChange={handleCheckboxChange}
                                                                checked={selectedFeatures.includes(item.featureCode)} />
                                                            <label className="description w-full cursor-pointer" htmlFor={item.featureCode}>
                                                                <div className="thumbnail flex flex-col items-center justify-center py-2">
                                                                    <img loading="lazy" className="img-fluid h-7" src={item.featureIcon}
                                                                        alt={item.featureName} />
                                                                    <span className="sm:text-sm">{item.featureName}</span>
                                                                </div>
                                                            </label>
                                                        </div>
                                                    )
                                                })
                                            }
                                        </div>
                                    </div >

                                </div >
                            </div >


                            <div className='mt-5'>
                                <div className="flex flex-col gap-3 w-full">
                                    <label className='font-bold text-xl'>Đơn giá thuê mặc định</label>
                                    <p className="text-sm text-gray-600">Đơn giá áp dụng cho tất cả các ngày. Bạn có thuể tuỳ chỉnh giá khác cho các ngày đặc biệt (cuối tuần, lễ, tết...) trong mục quản lý xe sau khi đăng kí.</p>
                                    <div className="flex flex-row items-center gap-2">
                                        <input
                                            className="p-2 px-3 border rounded-md outline-none sm:w-2/3 md:w-1/2 lg:w-1/2 xl:w-1/2" type="number" name="giaThue" placeholder="Giá tiền/ngày K(VND)"
                                            value={formData.giaThue}
                                            onChange={handleChange}
                                            required
                                        />
                                        <label>K(VND)</label>
                                    </div>
                                </div>
                            </div>

                            <div className='mt-5'>
                                <div className="flex flex-col gap-3 w-full">
                                    <label className='font-bold text-xl'>Giá cọc khi thuê xe</label>
                                    <p className="text-sm text-gray-600">Nếu không cần cọc thì để trống.</p>
                                    <div className="flex flex-row items-center gap-2">
                                        <input
                                            className="p-2 px-3 border rounded-md outline-none sm:w-2/3 md:w-1/2 lg:w-1/2 xl:w-1/2" type="number" name="giaCoc" placeholder="Giá cọc K(VND)"
                                            value={formData.giaCoc}
                                            onChange={handleChange}
                                        />
                                        <label>K(VND)</label>
                                    </div>
                                </div>
                            </div>


                            <div className='mt-5'>
                                <label className='font-bold text-xl mb-2'>Địa chỉ giao xe</label>
                                <AddressSelector handleChangeAddress={handleChangeAddress} />
                            </div>


                            <div className='mt-5'>
                                <label className='font-bold text-xl mb-2 block'>Hình ảnh xe</label>

                                <div className="w-full flex justify-between">
                                    <label htmlFor="ip" className="p-3 border rounded-md bg-main text-white font-bold cursor-pointer">Chọn ảnh</label>
                                    {
                                        selectedImages.length > 0 &&
                                        <button className="p-3 bg-main text-white rounded-md font-bold" onClick={() => handleDeleteAllImages()}>Xóa tất cả ảnh</button>
                                    }
                                </div>

                                <input
                                    id="ip"
                                    type="file"
                                    accept="image/*"
                                    multiple
                                    onChange={handleImageChange}
                                    className="hidden"
                                />

                                <div className="flex flex-wrap gap-2 mt-3 justify-center">
                                    {
                                        selectedImages.map((imageUrl, index) => {
                                            return (
                                                <img loading="lazy"
                                                    className="cursor-pointer rounded-md"
                                                    key={index}
                                                    src={imageUrl}
                                                    alt={`Image ${index}`}
                                                    style={{ maxWidth: '200px', maxHeight: '200px', marginRight: '50px', marginBottom: '20px' }}
                                                />
                                            )
                                        })
                                    }
                                </div>
                            </div>

                            <div className="flex justify-around mt-3">
                                <button className="mt-4 w-1/3 py-3 text-lg font-semibold rounded-md text-white bg-gray-400 hover:opacity-80" onClick={handleCloseModal}>
                                    Hủy bỏ
                                </button>
                                <button className="mt-4 w-1/3 py-3 text-lg font-semibold border-none rounded-md text-white bg-main hover:opacity-80" onClick={handleAddCar}>
                                    Tạo mới
                                </button>
                            </div>
                        </div >
                    </div >
                </div >
            </ModalBody>
        </Modal>
    )

}

export default ModalAddCar