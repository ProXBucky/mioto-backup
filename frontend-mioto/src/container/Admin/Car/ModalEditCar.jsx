import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { adminTokenSelector, modalCarIdSelector, modalEditCarSelector } from "../../../redux/selector";
import { ModalBody } from "react-bootstrap"
import Modal from 'react-bootstrap/Modal';
import { clearModalCarId, clearModalEditCar } from "../../../redux/Slice/ModalSlice";
import { editCarByAdmin, getDetailCar } from "../../../api/carAPI";
import { setConponentLoad, setHideLoading, setShowLoading } from "../../../redux/Slice/AppSlice";
import { toast } from "react-toastify";
import AddressSelector from "../../../features/search/AdressSelector";
import ChooseSelector from "../../../features/search/ChooseSelector";

function ModalEditCar() {
    const dispatch = useDispatch()
    const carId = useSelector(modalCarIdSelector);
    const modalEditCar = useSelector(modalEditCarSelector)

    const handleCloseModal = () => {
        dispatch(clearModalCarId())
        dispatch(clearModalEditCar())
    }

    const adminToken = useSelector(adminTokenSelector)
    const [valueAddress, setValueAddress] = useState({
        location: '',
        city: '',
        district: '',
        ward: '',
        streetAddress: ''
    })

    const handleChangeAddress = (name, value) => {
        setValueAddress(prevState => ({
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

    const [selectedImages, setSelectedImages] = useState([]);

    const handleDeleteAllImages = () => {
        setSelectedImages([])
    }

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


    const handleEditCar = async () => {
        try {
            dispatch(setShowLoading())
            if (!formData.bienSo || !formData.giaThue || !formData.moTa || !formData.namSanXuat || !formData.truyenDong || !formData.loaiNhienLieu || !formData.soGhe
                || !valueAddress.streetAddress || !valueAddress.district || !valueAddress.city || !selectedImages) {
                toast.error("Thiếu dữ liệu, vui lòng nhập đầy đủ")
            }
            else {
                let res = await editCarByAdmin(carId, {
                    plateNumber: formData.bienSo,
                    mortgage: formData.giaCoc,
                    pricePerDay: formData.giaThue,
                    description: formData.moTa,
                    modelYear: formData.namSanXuat,
                    transmission: formData.truyenDong,
                    fuelType: formData.loaiNhienLieu,
                    capacity: formData.soGhe,
                    streetAddress: valueAddress.streetAddress,
                    ward: valueAddress.ward,
                    district: valueAddress.district,
                    city: valueAddress.city,
                    location: valueAddress.location,
                    arrayImageCar: selectedImages
                }, adminToken)
                if (res) {
                    handleCloseModal()
                    toast.success('Cập nhật xe thành công')
                    dispatch(setConponentLoad())
                }
            }
        }
        catch (error) {
            if (error.response && error.response.status === 409) {
                toast.error('Lỗi hệ thống');
            }
            else {
                toast.error('Đã xảy ra lỗi trong quá trình đăng ký Xe. Vui lòng thử lại sau.');
            }
            console.error('Error:', error);
        } finally {
            dispatch(setHideLoading())
        }
    }


    const fetchDataEdit = async (carId) => {
        try {
            const res = await getDetailCar(carId);
            if (res) {
                const formDataPromise = new Promise((resolve, reject) => {
                    setFormData({
                        bienSo: res.plateNumber,
                        giaCoc: res.mortgage,
                        giaThue: res.pricePerDay,
                        moTa: res.description,
                        namSanXuat: res.modelYear,
                        truyenDong: res.transmission,
                        loaiNhienLieu: res.fuelType,
                        soGhe: res.capacity
                    });
                    resolve();
                });
                await Promise.all([formDataPromise]);
            }
        } catch (err) {
            console.log(err);
        }
    };


    useEffect(() => {
        fetchDataEdit(carId)
    }, [])

    return (
        <Modal
            size="xl"
            aria-labelledby="contained-modal-title-vcenter"
            dialogClassName="custom-modal"
            centered
            show={modalEditCar}
        >
            <Modal.Header className='border-none justify-between mt-3 px-10'>
                <h2 className="sm:text-xl md:text-2xl lg:text-2xl xl:text-2xl font-bold">Sửa thông tin xe</h2>
                <i className="fa-solid fa-xmark fa-2xl cursor-pointer" onClick={handleCloseModal}></i>
            </Modal.Header>
            <ModalBody>
                <div>
                    <div className='pt-2 flex flex-col items-center gap-4' >
                        <div className={`w-full bg-white p-4`} >
                            <div className=''>
                                <div className="flex flex-col gap-3 sm:w-full md:w-1/2 lg:w-1/2 xl:w-1/2">
                                    <label className='font-bold text-xl'>Biển số xe</label>
                                    <input
                                        className="p-2 px-3 border rounded-md outline-none" type="text" name="bienSo"
                                        value={formData.bienSo}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                            </div>

                            <div className='mt-3'>
                                <div className="flex flex-col gap-3 w-full">
                                    <label className='font-bold text-xl'>Thông tin cơ bản</label>
                                    <div className="flex flex-wrap sm:gap-5 md:gap-10 lg:gap-10 xl:gap-10">
                                        <div className="flex-col flex sm:w-full md:w-[calc(50%-30px)] lg:w-[calc(50%-30px)] xl:w-[calc(50%-30px)]">
                                            <label htmlFor="year">Năm sản xuất</label>
                                            <select id="year" className='p-2 border mt-2 rounded-md cursor-pointer' name="namSanXuat" value={formData.namSanXuat} onChange={handleChange}>
                                                <option value="">Chọn năm</option>
                                                {Array.from({ length: 20 }, (_, i) => i + 2005).map((year) => (
                                                    <option className="cursor-pointer" key={year} value={year}>{year}</option>
                                                ))}
                                            </select>
                                        </div>


                                        <div className="flex-col flex sm:w-full md:w-[calc(50%-30px)] lg:w-[calc(50%-30px)] xl:w-[calc(50%-30px)]">
                                            <label>Truyền động</label>
                                            <select id="transition" className='p-2 border mt-2 rounded-md cursor-pointer' name="truyenDong" value={formData.truyenDong} onChange={handleChange}>
                                                <option className="cursor-pointer" value="">Chọn truyền động</option>
                                                <option className="cursor-pointer" value="Số tự động">Số tự động</option>
                                                <option className="cursor-pointer" value="Số sàn">Số sàn</option>
                                            </select>
                                        </div>

                                        <div className="flex-col flex sm:w-full md:w-[calc(50%-30px)] lg:w-[calc(50%-30px)] xl:w-[calc(50%-30px)]">
                                            <label>Loại nhiên liệu</label>
                                            <select id="fuelType" className='p-2 border mt-2 rounded-md cursor-pointer' name="loaiNhienLieu" value={formData.loaiNhienLieu} onChange={handleChange}>
                                                <option className="cursor-pointer" value="">Chọn nhiên liệu</option>
                                                <option className="cursor-pointer" value="Xăng">Xăng</option>
                                                <option className="cursor-pointer" value="Dầu diesel">Dầu diesel</option>
                                                <option className="cursor-pointer" value="Điện">Điện</option>
                                            </select>
                                        </div>

                                        <div className="flex-col flex sm:w-full md:w-[calc(50%-30px)] lg:w-[calc(50%-30px)] xl:w-[calc(50%-30px)]">
                                            <label htmlFor="capacity">Số ghế</label>
                                            <select id="capacity" className='p-2 border mt-2 rounded-md cursor-pointer' name="soGhe" value={formData.soGhe} onChange={handleChange}>
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

                            <div className='mt-5'>
                                <div className="flex flex-col gap-3 w-full">
                                    <label className='font-bold text-xl'>Đơn giá thuê mặc định</label>
                                    <p className="text-sm text-gray-600">Đơn giá áp dụng cho tất cả các ngày. Bạn có thuể tuỳ chỉnh giá khác cho các ngày đặc biệt (cuối tuần, lễ, tết...) trong mục quản lý xe sau khi đăng kí.</p>
                                    <div className="flex flex-row items-center gap-2">
                                        <input
                                            className="p-2 px-3 border rounded-md outline-none w-1/2" type="number" name="giaThue" placeholder="Giá tiền/ngày K(VND)"
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
                                            className="p-2 px-3 border rounded-md outline-none w-1/2" type="number" name="giaCoc" placeholder="Giá cọc K(VND)"
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

                                <div className="flex flex-wrap gap-2 justify-center">
                                    {
                                        selectedImages.map((imageUrl, index) => {
                                            return (
                                                <img loading="lazy"
                                                    className="cursor-pointer rounded-md"
                                                    key={index}
                                                    src={imageUrl}
                                                    alt={`Image ${index}`}
                                                    style={{ maxWidth: '200px', maxHeight: '200px', margin: '10px' }}
                                                />
                                            )
                                        })
                                    }
                                </div>
                            </div>

                            <div className="flex justify-around">
                                <button className="mt-4 w-1/3 py-3 text-lg font-semibold rounded-md text-white bg-gray-400 hover:opacity-80" onClick={handleCloseModal}>
                                    Hủy bỏ
                                </button>
                                <button className="mt-4 w-1/3 py-3 text-lg font-semibold border-none rounded-md text-white bg-main hover:opacity-80" onClick={handleEditCar}>
                                    Cập nhật
                                </button>
                            </div>
                        </div >
                    </div >
                </div >
            </ModalBody>
        </Modal>
    )

}

export default ModalEditCar