import { useNavigate, useParams } from "react-router-dom"
import ChooseSelector from "../../../features/search/ChooseSelector"
import "./RegisterSelfDrive.css"
import AddressSelector from "../../../features/search/AdressSelector"
import { useEffect, useState } from "react"
import { getAllCarFeature } from "../../../api/appAPI"
import { editCar, getDetailCar, postNewCar } from "../../../api/carAPI"
import { useDispatch, useSelector } from "react-redux"
import { tokenSelector, userIdSelector } from "../../../redux/selector"
import { toast } from "react-toastify"
import { setHideLoading, setShowLoading } from "../../../redux/Slice/AppSlice"

function RegisterSelfDrive({ type }) {
    const token = useSelector(tokenSelector)
    const dispatch = useDispatch()
    const { carId } = useParams()
    const navigate = useNavigate()
    const userId = useSelector(userIdSelector)
    const [featureArray, setFeatureArray] = useState([])
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
        // setSelectedImages([...selectedImages, ...imagesArray]);
        setSelectedImages(prevImages => [...prevImages, ...imagesArray]);
    };


    const handleAddCar = async () => {
        try {
            dispatch(setShowLoading())
            let res = await postNewCar(userId, {
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
            }, token)
            if (res) {
                navigate('/account/mycar')
                toast.success('Đăng ký xe thành công')
            }
        }
        catch (error) {
            if (error.response && error.response.status === 409) {
                toast.error('Lỗi hệ thống');
            }
            else if (error.response && error.response.status === 400) {
                toast.error('Lỗi ảnh')
            }
            else {
                toast.error('Đã xảy ra lỗi trong quá trình đăng ký Xe. Vui lòng thử lại sau.');
            }
            console.error('Error:', error);
        } finally {
            dispatch(setHideLoading())
        }
    }

    const handleEditCar = async () => {
        try {
            dispatch(setShowLoading())
            if (!formData.bienSo || !formData.giaThue || !valueAddress.streetAddress || !valueAddress.district || !valueAddress.city || !selectedImages) {
                toast.error("Thiếu dữ liệu, vui lòng nhập đầy đủ")
            }
            else {
                let res = await editCar(carId, {
                    plateNumber: formData.bienSo,
                    mortgage: formData.giaCoc,
                    pricePerDay: formData.giaThue,
                    streetAddress: valueAddress.streetAddress,
                    ward: valueAddress.ward,
                    district: valueAddress.district,
                    city: valueAddress.city,
                    location: valueAddress.location,
                    arrayImageCar: selectedImages
                }, token)
                if (res) {
                    navigate('/account/mycar')
                    toast.success('Cập nhật xe thành công')
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

    const backto = () => {
        navigate('/account/mycar')
    }

    useEffect(() => {
        const fetchAllFeature = async () => {
            try {
                const res = await getAllCarFeature()
                if (res && res.length > 0) {
                    setFeatureArray(res)
                }
            } catch (err) {
                console.log(err)
            }
        }

        const fetchDetailCar = async (carId) => {
            try {
                const res = await getDetailCar(carId);
                if (res) {
                    const formDataPromise = new Promise((resolve, reject) => {
                        setFormData({
                            bienSo: res.plateNumber,
                            giaCoc: res.mortgage,
                            giaThue: res.pricePerDay,
                            loaiNhienLieu: res.fuelType,
                            moTa: res.description,
                            namSanXuat: res.modelYear,
                            soGhe: res.capacity,
                            truyenDong: res.transmission
                        });
                        setFormData1({
                            hangXe: res.brand,
                            mauXe: res.model
                        });
                        resolve();
                    });

                    const valueAddressPromise = new Promise((resolve, reject) => {
                        setValueAddress({
                            location: res.location,
                            city: res.city,
                            district: res.district,
                            ward: res.ward,
                            streetAddress: res.streetAddress
                        });
                        resolve();
                    });

                    const imagesPromise = new Promise((resolve, reject) => {
                        let imagesUrl = [];
                        res.images && res.images.length > 0 && res.images.map((item) => {
                            imagesUrl.push(item.imageLink);
                        });
                        setSelectedImages(imagesUrl);
                        resolve();
                    });

                    const featurePromise = new Promise((resolve, reject) => {
                        let featureUrl = [];
                        res.carFeatures && res.carFeatures && res.carFeatures.map(item => {
                            featureUrl.push({
                                featureName: item.feature.featureName,
                                featureIcon: item.feature.featureIcon,
                            });
                        });
                        setFeatureArray(featureUrl);
                        resolve();
                    });

                    await Promise.all([formDataPromise, valueAddressPromise, imagesPromise, featurePromise]);
                }
            } catch (err) {
                console.log(err);
            }
        };



        const fetchDataEdit = async (carId) => {
            try {
                const res = await getDetailCar(carId);
                if (res) {
                    const formDataPromise = new Promise((resolve, reject) => {
                        setFormData({
                            bienSo: res.plateNumber,
                            giaCoc: res.mortgage,
                            giaThue: res.pricePerDay,
                        });
                        resolve();
                    });
                    await Promise.all([formDataPromise]);
                }
            } catch (err) {
                console.log(err);
            }
        };

        if (type == "create") {
            fetchAllFeature()
        }
        else if (type == "view") {
            fetchDetailCar(carId)
        }
        else {
            fetchDataEdit(carId)
        }

    }, [])

    return (
        <div className={`${type == "create" ? "sm:px-5 md:px-5 lg:px-10 xl:px-32" : ""} bg-gray-100 border-t-2`} >
            <div className='border-none justify-start mt-3 flex flex-row items-center gap-2 cursor-pointer font-bold' onClick={() => backto()}>
                <i className="fa-solid fa-chevron-left fa-xl"></i>
                <p>Quay lại</p>
            </div>
            <div className='sm:p-0 md:p-4 lg:p-4 xl:p-4 pt-2 flex flex-col items-center gap-4' >
                <h1 className='text-center sm:text-xl md:text-2xl lg:text-3xl xl:text-3xl font-bold'>
                    {
                        type == "create" && <p>Đăng ký xe</p>
                    }
                    {
                        type == "view" && <p>Thông tin xe</p>
                    }
                    {
                        type == "edit" && <p>Sửa thông tin xe</p>
                    }

                </h1>
                <div className={`${type == "create" ? "sm:w-full md:w-full lg:w-2/3 xl:w-2/3" : "w-full"} rounded-lg border-2 bg-white sm:p-5 md:p-5 lg:p-5 xl:p-5`} >
                    <div className=''>
                        <div className="flex flex-col gap-3 sm:w-full md:w-1/2 lg:w-1/2 xl:w-1/2">
                            <label className='font-bold text-xl'>Biển số xe</label>
                            {
                                type == "create" &&
                                <>
                                    <input
                                        className="p-2 px-3 border rounded-md outline-none" type="text" name="bienSo"
                                        value={formData.bienSo}
                                        onChange={handleChange}
                                        placeholder="99G99999"
                                        required
                                    />
                                </>
                            }
                            {
                                type == "edit" &&
                                <>
                                    <input
                                        className="p-2 px-3 border rounded-md outline-none" type="text" name="bienSo"
                                        value={formData.bienSo}
                                        onChange={handleChange}
                                        required
                                    />
                                </>
                            }
                            {
                                type == "view" && <span className="text-xl font-semibold">{formData.bienSo}</span>
                            }
                        </div>
                    </div>

                    {
                        type == "create" &&
                        <div className='mt-5'>
                            <div className="flex flex-col gap-3 w-full">
                                <label className='font-bold text-xl'>Thông tin cơ bản</label>
                                {
                                    type == "create" && <p className="text-red-500 text-sm">Lưu ý: Các thông tin cơ bản sẽ không thể thay đổi sau khi đăng kí.</p>
                                }
                                <div className="flex flex-wrap sm:gap-5 md:gap-14 lg:gap-14 xl:gap-14">
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
                    }

                    {
                        type == "view" &&
                        <div className='mt-5'>
                            <div className="flex flex-col gap-3 w-full">
                                <label className='font-bold text-xl'>Thông tin cơ bản</label>
                                {
                                    type == "create" && <p className="text-red-500 text-sm">Lưu ý: Các thông tin cơ bản sẽ không thể thay đổi sau khi đăng kí.</p>
                                }
                                <div className="flex flex-wrap gap-14">
                                    <div className="flex-col flex sm:w-full md:w-[calc(50%-30px)] lg:w-[calc(50%-30px)] xl:w-[calc(50%-30px)]">
                                        <label htmlFor="brand">Hãng xe</label>
                                        <span className="text-xl font-semibold">{formData1.hangXe}</span>
                                    </div>

                                    <div className="flex-col flex sm:w-full md:w-[calc(50%-30px)] lg:w-[calc(50%-30px)] xl:w-[calc(50%-30px)]">
                                        <label htmlFor="model">Mẫu xe</label>
                                        <span className="text-xl font-semibold">{formData1.mauXe}</span>
                                    </div>
                                    <div className="flex-col flex sm:w-full md:w-[calc(50%-30px)] lg:w-[calc(50%-30px)] xl:w-[calc(50%-30px)]">
                                        <label htmlFor="year">Năm sản xuất</label>
                                        <span className="text-xl font-semibold">{formData.namSanXuat}</span>
                                    </div>


                                    <div className="flex-col flex sm:w-full md:w-[calc(50%-30px)] lg:w-[calc(50%-30px)] xl:w-[calc(50%-30px)]">
                                        <label>Truyền động</label>
                                        <span className="text-xl font-semibold">{formData.truyenDong}</span>
                                    </div>

                                    <div className="flex-col flex sm:w-full md:w-[calc(50%-30px)] lg:w-[calc(50%-30px)] xl:w-[calc(50%-30px)]">
                                        <label>Loại nhiên liệu</label>
                                        <span className="text-xl font-semibold">{formData.loaiNhienLieu}</span>
                                    </div>

                                    <div className="flex-col flex sm:w-full md:w-[calc(50%-30px)] lg:w-[calc(50%-30px)] xl:w-[calc(50%-30px)]">
                                        <label htmlFor="capacity">Số ghế</label>
                                        <span className="text-xl font-semibold">{formData.soGhe}</span>
                                    </div>


                                </div>

                            </div>
                        </div>
                    }
                    {
                        type == "create" &&
                        <div className='mt-5'>
                            <div className="flex flex-col gap-3 w-full">
                                <label className='font-bold text-xl'>Mô tả</label>
                                <textarea className="textarea outline-0 p-2 border h-32" name="moTa" value={formData.moTa} onChange={handleChange}
                                    placeholder="Huyndai Elantra số tự động đăng kí tháng 06/2018. Xe gia đình mới đẹp, nội thất nguyên bản, sạch sẽ, bảo dưỡng thường xuyên, rửa xe miễn phí cho khách. Xe rộng rãi, an toàn, tiện nghi, phù hợp cho gia đình du lịch. Xe trang bị hệ thống cảm biến lùi, gạt mưa tự động, đèn pha tự động, camera hành trình, hệ thống giải trí AV cùng nhiều tiện nghi khác..."></textarea>
                            </div>
                        </div>
                    }
                    {
                        type == "view" &&
                        <div className='mt-5'>
                            <div className="flex flex-col gap-3 w-full">
                                <label className='font-bold text-xl'>Mô tả</label>
                                <textarea className="textarea outline-0 p-2 border h-32" name="moTa" value={formData.moTa} onChange={handleChange}
                                    placeholder="Huyndai Elantra số tự động đăng kí tháng 06/2018. Xe gia đình mới đẹp, nội thất nguyên bản, sạch sẽ, bảo dưỡng thường xuyên, rửa xe miễn phí cho khách. Xe rộng rãi, an toàn, tiện nghi, phù hợp cho gia đình du lịch. Xe trang bị hệ thống cảm biến lùi, gạt mưa tự động, đèn pha tự động, camera hành trình, hệ thống giải trí AV cùng nhiều tiện nghi khác..."></textarea>
                            </div>
                        </div>
                    }

                    {
                        type == "create" &&
                        <div className='mt-5'>
                            <div className="flex flex-col gap-3 w-full">
                                <label className='font-bold text-xl'>Tính năng</label>
                                <div className="mt-3 flex flex-wrap gap-5">
                                    <div className="list-feature flex flex-wrap gap-3">
                                        {
                                            featureArray && featureArray.length > 0 &&
                                            featureArray.map((item, index) => {
                                                return (
                                                    <div className="squaredThree have-label cursor-pointer border sm:w-[calc(50%-10px)]  md:w-[calc(33%-10px)] lg:w-[calc(33%-10px)] xl:w-[calc(33%-10px)]" key={index}>
                                                        <input id={item.featureCode} type="checkbox"
                                                            className="hidden" name="filter-car-feature" value={item.featureCode}
                                                            onChange={handleCheckboxChange}
                                                            checked={selectedFeatures.includes(item.featureCode)} />
                                                        <label className="description w-full cursor-pointer" htmlFor={item.featureCode}>
                                                            <div className="thumbnail flex flex-col items-center justify-center py-2">
                                                                <img loading="lazy" className="img-fluid h-7" src={item.featureIcon}
                                                                    alt={item.featureName} />
                                                                <span>{item.featureName}</span>
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
                    }

                    {
                        type == "view" &&
                        <div className='mt-5'>
                            <div className="flex flex-col gap-3 w-full">
                                <label className='font-bold text-xl'>Tính năng</label>
                                <div className="mt-3 flex flex-wrap gap-5">
                                    <div className="list-feature flex flex-wrap gap-3">
                                        {
                                            featureArray && featureArray.length > 0 &&
                                            featureArray.map((item, index) => {
                                                return (
                                                    <div className="squaredThree have-label cursor-pointer border sm:w-[calc(50%-10px)]  md:w-[calc(33%-10px)] lg:w-[calc(33%-10px)] xl:w-[calc(33%-10px)]" key={index}>
                                                        <div className="thumbnail flex flex-col items-center justify-center py-2">
                                                            <img loading="lazy" className="img-fluid h-7" src={item.featureIcon}
                                                                alt={item.featureName} />
                                                            <span>{item.featureName}</span>
                                                        </div>
                                                    </div>
                                                )
                                            })
                                        }
                                    </div>
                                </div >

                            </div >
                        </div >
                    }


                    {
                        type == "create" &&
                        <>
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
                        </>
                    }

                    {
                        type == "edit" &&
                        <>
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
                        </>
                    }

                    {
                        type == "view" &&
                        <>
                            <div className='mt-5'>
                                <div className="flex flex-col gap-3 w-full">
                                    <label className='font-bold text-xl'>Đơn giá thuê mặc định</label>
                                    <p className="text-sm text-gray-600">Đơn giá áp dụng cho tất cả các ngày. Bạn có thuể tuỳ chỉnh giá khác cho các ngày đặc biệt (cuối tuần, lễ, tết...) trong mục quản lý xe sau khi đăng kí.</p>
                                    <div className="flex flex-row items-center gap-2">
                                        <span className="text-xl font-semibold">{formData.giaThue}</span>
                                        <label>K(VND)</label>
                                    </div>
                                </div>
                            </div>

                            <div className='mt-5'>
                                <div className="flex flex-col gap-3 w-full">
                                    <label className='font-bold text-xl'>Giá cọc khi thuê xe</label>
                                    <p className="text-sm text-gray-600">Nếu không cần cọc thì để trống.</p>
                                    <div className="flex flex-row items-center gap-2">
                                        <span className="text-xl font-semibold">{formData.giaCoc ? formData.giaCoc : "Không cần cọc"}</span>
                                        {!formData.giaCoc ? formData.giaCoc : <label>K(VND)</label>}
                                    </div>
                                </div>
                            </div>
                        </>
                    }

                    {
                        type == "view" &&
                        <div className='mt-5'>
                            <label className='font-bold text-xl mb-2'>Địa chỉ giao xe</label>
                            <span className="sm:text-lg md:text-xl lg:text-xl xl:text-xl block font-normal">{valueAddress.streetAddress} - {valueAddress.ward} - {valueAddress.district} - {valueAddress.city}</span>
                        </div>

                    }

                    {
                        type == "create" &&
                        <div className='mt-5'>
                            <label className='font-bold text-xl mb-2'>Địa chỉ giao xe</label>
                            <AddressSelector handleChangeAddress={handleChangeAddress} />
                        </div>

                    }

                    {
                        type == "edit" &&
                        <div className='mt-5'>
                            <label className='font-bold text-xl mb-2'>Địa chỉ giao xe</label>
                            <AddressSelector handleChangeAddress={handleChangeAddress} />
                        </div>

                    }




                    <div className='mt-5'>
                        <label className='font-bold text-xl mb-2 block'>Hình ảnh xe</label>
                        {
                            type == "create" &&
                            <div className="w-full flex justify-between">
                                <label htmlFor="ip" className="p-3 border rounded-md bg-main text-white font-bold cursor-pointer">Chọn ảnh</label>
                                {
                                    selectedImages.length > 0 &&
                                    <button className="p-3 bg-main text-white rounded-md font-bold" onClick={() => handleDeleteAllImages()}>Xóa tất cả ảnh</button>
                                }
                            </div>
                        }
                        {
                            type == "edit" &&
                            <div className="w-full flex justify-between">
                                <label htmlFor="ip" className="p-3 border rounded-md bg-main text-white font-bold cursor-pointer">Chọn ảnh</label>
                                {
                                    selectedImages.length > 0 &&
                                    <button className="p-3 bg-main text-white rounded-md font-bold" onClick={() => handleDeleteAllImages()}>Xóa tất cả ảnh</button>
                                }
                            </div>
                        }
                        <input
                            id="ip"
                            type="file"
                            accept="image/*"
                            multiple
                            onChange={handleImageChange}
                            className="hidden"
                        />

                        <div className="flex flex-wrap gap-2">
                            {
                                type == "create" &&
                                selectedImages.map((imageUrl, index) => {
                                    return (
                                        <img loading="lazy"
                                            className="cursor-pointer rounded-md"
                                            key={index}
                                            src={imageUrl}
                                            alt={`Image ${index}`}
                                            style={{ maxWidth: '200px', maxHeight: '200px', margin: '15px' }}
                                        />
                                    )
                                })
                            }
                            {
                                type == "edit" &&
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
                            {
                                type == "view" &&
                                selectedImages.map((imageUrl, index) => {
                                    return (
                                        <img loading="lazy"
                                            className="cursor-pointer rounded-md"
                                            key={index}
                                            src={imageUrl}
                                            alt={`Image ${index}`}
                                            style={{ maxWidth: '200px', maxHeight: '150px', margin: '10px' }}
                                        />
                                    )
                                })
                            }
                        </div>
                    </div>
                    {
                        type == "create" &&
                        <div className="flex justify-around">
                            <button className="mt-4 w-1/3 py-3 text-lg font-semibold rounded-md text-white bg-gray-400 hover:opacity-80" onClick={() => backto()}>
                                Hủy bỏ
                            </button>
                            <button className="mt-4 w-1/3 py-3 text-lg font-semibold border-none rounded-md text-white bg-main hover:opacity-80" onClick={() => handleAddCar()}>
                                Đăng ký
                            </button>
                        </div>
                    }
                    {
                        type == "edit" &&
                        <div className="flex justify-around">
                            <button className="mt-4 w-1/3 py-3 text-lg font-semibold rounded-md text-white bg-gray-400 hover:opacity-80" onClick={() => backto()}>
                                Hủy bỏ
                            </button>
                            <button className="mt-4 w-1/3 py-3 text-lg font-semibold border-none rounded-md text-white bg-main hover:opacity-80" onClick={() => handleEditCar()}>
                                Cập nhật
                            </button>
                        </div>
                    }
                    {
                        type == "view" &&
                        <div className="flex justify-center">
                            <button className="mt-4 w-1/3 py-3 text-lg font-semibold border-none rounded-md text-white bg-main hover:opacity-80" onClick={() => backto()}>
                                Quay lại
                            </button>
                        </div>
                    }
                </div >
            </div >
        </div >
    )
}

export default RegisterSelfDrive


