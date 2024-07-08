import { useParams } from "react-router-dom"
import CarList from "../../features/car/carList"
import { useEffect, useState } from "react"
import { findCarUsingParam } from "../../api/carAPI"
import { useDispatch, useSelector } from "react-redux"
import { beginDateSelector, endDateSelector, locationCodeSelector, locationSelector, userIdSelector } from "../../redux/selector"
import { clearModalFilterBrand, clearModalFilterFuel, clearModalFilterTrans, setModalFilterBrand, setModalFilterFuel, setModalFilterTrans } from "../../redux/Slice/ModalSlice"
import ModalFilterBrand from "./ModalFilterBrand"
import ModalFilterTrans from "./ModalFilterTrans"
import ModalFilterFuel from "./ModalFilterFuel"

function CarMenu({ handleOpenDateModal, handleOpenLocationModal }) {
    const dispatch = useDispatch()
    const [carArray, setCarArray] = useState([])
    const userId = useSelector(userIdSelector)
    const location = useSelector(locationSelector)
    const city = useSelector(locationCodeSelector)
    const beginDate = useSelector(beginDateSelector)
    const endDate = useSelector(endDateSelector)

    const handleOpenModalBrand = () => {
        dispatch(setModalFilterBrand())
    }

    const handleOpenModalTrans = () => {
        dispatch(setModalFilterTrans())
    }

    const handleOpenModalFuel = () => {
        dispatch(setModalFilterFuel())
    }

    const [selectedBrand, setSelectedBrand] = useState('Tất cả');

    const handleRadioChange = (event) => {
        setSelectedBrand(event.target.value);
    };

    const handleApplyFilter = () => {
        dispatch(clearModalFilterBrand())

    };

    const [selectedTrans, setSelectedTrans] = useState('Tất cả');

    const handleRadioChangeTrans = (event) => {
        setSelectedTrans(event.target.value);
    };

    const handleApplyFilterTrans = () => {
        dispatch(clearModalFilterTrans())

    };

    const [selectedFuel, setSelectedFuel] = useState('Tất cả');

    const handleRadioChangeFuel = (event) => {
        setSelectedFuel(event.target.value);
    };

    const handleApplyFilterFuel = () => {
        dispatch(clearModalFilterFuel())

    };

    const fetchFindCar = async () => {
        let res = await findCarUsingParam({
            city: city,
            userId: userId,
            beginDate: beginDate,
            endDate: endDate,
            brand: selectedBrand,
            transmission: selectedTrans,
            fuelType: selectedFuel
        })
        if (res && res.length > 0) {
            setCarArray(res)
        } else {
            setCarArray([])
        }
    }

    useEffect(() => {
        fetchFindCar()
    }, [])

    useEffect(() => {
        fetchFindCar()
    }, [location, city, beginDate, endDate, userId, selectedBrand, selectedFuel, selectedTrans])


    return (
        <>
            <ModalFilterBrand selectedBrand={selectedBrand} handleRadioChange={handleRadioChange} handleApplyFilter={handleApplyFilter} />
            <ModalFilterTrans selectedTrans={selectedTrans} handleRadioChangeTrans={handleRadioChangeTrans} handleApplyFilterTrans={handleApplyFilterTrans} />
            <ModalFilterFuel selectedFuel={selectedFuel} handleRadioChangeFuel={handleRadioChangeFuel} handleApplyFilterFuel={handleApplyFilterFuel} />
            <div className="border-t-2 p-2">
                <div className="bg-white shadow-xl sm:px-5 md:px-5 lg:px-16 xl:px-32 py-2">
                    <div className="flex sm:flex-col md:flex-row lg:flex-row xl:flex-row justify-center items-center sm:gap-4 md:gap-10 lg:gap-10 xl:gap-10">
                        <div className="flex flex-row items-center gap-1 cursor-pointer" onClick={() => handleOpenLocationModal()}>
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 2.75C8.31 2.75 5.3 5.76 5.3 9.45C5.3 14.03 11.3 20.77 11.55 21.05C11.79 21.32 12.21 21.32 12.45 21.05C12.71 20.77 18.7 14.03 18.7 9.45C18.7 5.76 15.69 2.75 12 2.75Z" stroke="#767676" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path><path d="M12.3849 11.7852C13.6776 11.5795 14.5587 10.3647 14.3529 9.07204C14.1472 7.77936 12.9325 6.89824 11.6398 7.104C10.3471 7.30976 9.46597 8.52449 9.67173 9.81717C9.87749 11.1099 11.0922 11.991 12.3849 11.7852Z" stroke="#767676" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path></svg>
                            <p className="text-lg">{location}</p>
                        </div>
                        <div className="flex flex-row items-center gap-1 cursor-pointer" onClick={() => handleOpenDateModal()}>
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M6.86 4.81V2.75" stroke="#767676" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path><path d="M17.14 4.81V2.75" stroke="#767676" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path><path d="M18.05 3.78003H5.95C4.18 3.78003 2.75 5.21003 2.75 6.98003V18.06C2.75 19.83 4.18 21.26 5.95 21.26H18.06C19.83 21.26 21.26 19.83 21.26 18.06V6.98003C21.25 5.21003 19.82 3.78003 18.05 3.78003Z" stroke="#767676" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path><path d="M2.75 7.8999H21.25" stroke="#767676" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path><path d="M18 12C18.5523 12 19 11.5523 19 11C19 10.4477 18.5523 10 18 10C17.4477 10 17 10.4477 17 11C17 11.5523 17.4477 12 18 12Z" fill="#767676"></path><path d="M14 12C14.5523 12 15 11.5523 15 11C15 10.4477 14.5523 10 14 10C13.4477 10 13 10.4477 13 11C13 11.5523 13.4477 12 14 12Z" fill="#767676"></path><path d="M10 12C10.5523 12 11 11.5523 11 11C11 10.4477 10.5523 10 10 10C9.44772 10 9 10.4477 9 11C9 11.5523 9.44772 12 10 12Z" fill="#767676"></path><path d="M6 12C6.55228 12 7 11.5523 7 11C7 10.4477 6.55228 10 6 10C5.44772 10 5 10.4477 5 11C5 11.5523 5.44772 12 6 12Z" fill="#767676"></path><path d="M18 15.49C18.5523 15.49 19 15.0423 19 14.49C19 13.9377 18.5523 13.49 18 13.49C17.4477 13.49 17 13.9377 17 14.49C17 15.0423 17.4477 15.49 18 15.49Z" fill="#767676"></path><path d="M14 15.49C14.5523 15.49 15 15.0423 15 14.49C15 13.9377 14.5523 13.49 14 13.49C13.4477 13.49 13 13.9377 13 14.49C13 15.0423 13.4477 15.49 14 15.49Z" fill="#767676"></path><path d="M10 15.49C10.5523 15.49 11 15.0423 11 14.49C11 13.9377 10.5523 13.49 10 13.49C9.44772 13.49 9 13.9377 9 14.49C9 15.0423 9.44772 15.49 10 15.49Z" fill="#767676"></path><path d="M6 15.49C6.55228 15.49 7 15.0423 7 14.49C7 13.9377 6.55228 13.49 6 13.49C5.44772 13.49 5 13.9377 5 14.49C5 15.0423 5.44772 15.49 6 15.49Z" fill="#767676"></path><path d="M14 18.97C14.5523 18.97 15 18.5223 15 17.97C15 17.4177 14.5523 16.97 14 16.97C13.4477 16.97 13 17.4177 13 17.97C13 18.5223 13.4477 18.97 14 18.97Z" fill="#767676"></path><path d="M10 18.97C10.5523 18.97 11 18.5223 11 17.97C11 17.4177 10.5523 16.97 10 16.97C9.44772 16.97 9 17.4177 9 17.97C9 18.5223 9.44772 18.97 10 18.97Z" fill="#767676"></path><path d="M6 18.97C6.55228 18.97 7 18.5223 7 17.97C7 17.4177 6.55228 16.97 6 16.97C5.44772 16.97 5 17.4177 5 17.97C5 18.5223 5.44772 18.97 6 18.97Z" fill="#767676"></path></svg>
                            <p className="text-lg">{beginDate} - {endDate}</p>
                        </div>
                    </div>

                    <div className="flex justify-center sm:gap-6 md:gap-2 lg:gap-2 xl:gap-2 mt-3">
                        <div className={`rounded-full flex flex-row gap-1 border border-[#aaa] py-1 px-3 cursor-pointer ${selectedBrand === "Tất cả" ? "" : "border-[#5fcf86] bg-[#dff5e7]"}`} onClick={handleOpenModalBrand}>
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M19.15 15.7199H19.6C20.51 15.7199 21.24 14.8599 21.24 13.8399V12.4499C21.24 11.7199 20.86 11.0399 20.27 10.7399L18.79 9.96995L17.47 7.59994C17.09 6.90994 16.42 6.49994 15.71 6.50994H10.12C9.47 6.50994 8.86 6.84995 8.47 7.42995L6.77 9.93994L3.96 10.7999C3.24 11.0199 2.75 11.7599 2.75 12.5999V13.8299C2.75 14.8499 3.48 15.7099 4.39 15.7099H4.63" stroke="black" strokeLinecap="round" strokeLinejoin="round"></path><path d="M8.87 15.7197H14.77" stroke="black" strokeLinecap="round" strokeLinejoin="round"></path><path d="M6.69 17.4598C7.83322 17.4598 8.76 16.5331 8.76 15.3898C8.76 14.2466 7.83322 13.3198 6.69 13.3198C5.54677 13.3198 4.62 14.2466 4.62 15.3898C4.62 16.5331 5.54677 17.4598 6.69 17.4598Z" stroke="black" strokeLinecap="round" strokeLinejoin="round"></path><path d="M17.08 17.4598C18.2232 17.4598 19.15 16.5331 19.15 15.3898C19.15 14.2466 18.2232 13.3198 17.08 13.3198C15.9368 13.3198 15.01 14.2466 15.01 15.3898C15.01 16.5331 15.9368 17.4598 17.08 17.4598Z" stroke="black" strokeLinecap="round" strokeLinejoin="round"></path></svg>
                            <p className="sm:hidden">Hãng xe</p>
                        </div>

                        <div className={`rounded-full flex flex-row gap-1 border border-[#aaa] py-1 px-3 cursor-pointer ${selectedTrans === "Tất cả" ? "" : "border-[#5fcf86] bg-[#dff5e7]"}`} onClick={handleOpenModalTrans}>
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="18" cy="6" r="1.5" stroke="black"></circle><circle cx="18" cy="18" r="1.5" stroke="black"></circle><circle cx="12" cy="6" r="1.5" stroke="black"></circle><circle cx="12" cy="18" r="1.5" stroke="black"></circle><circle cx="6" cy="6" r="1.5" stroke="black"></circle><path d="M7.57715 20V16H5.99902C5.69694 16 5.43913 16.054 5.22559 16.1621C5.01074 16.2689 4.84733 16.4206 4.73535 16.6172C4.62207 16.8125 4.56543 17.0423 4.56543 17.3066C4.56543 17.5723 4.62272 17.8008 4.7373 17.9922C4.85189 18.1823 5.0179 18.3281 5.23535 18.4297C5.4515 18.5312 5.71322 18.582 6.02051 18.582H7.07715V17.9023H6.15723C5.99577 17.9023 5.86165 17.8802 5.75488 17.8359C5.64811 17.7917 5.56868 17.7253 5.5166 17.6367C5.46322 17.5482 5.43652 17.4382 5.43652 17.3066C5.43652 17.1738 5.46322 17.0618 5.5166 16.9707C5.56868 16.8796 5.64876 16.8105 5.75684 16.7637C5.86361 16.7155 5.99837 16.6914 6.16113 16.6914H6.73145V20H7.57715ZM5.41699 18.1797L4.42285 20H5.35645L6.3291 18.1797H5.41699Z" fill="black"></path><path d="M18 8V12M18 16V12M12 8V16M6 8V11.5C6 11.7761 6.22386 12 6.5 12H18" stroke="black" stroke-linecap="round"></path></svg>
                            <p className="sm:hidden">Truyền động</p>
                        </div>

                        <div className={`rounded-full flex flex-row gap-1 border border-[#aaa] py-1 px-3 cursor-pointer ${selectedFuel === "Tất cả" ? "" : "border-[#5fcf86] bg-[#dff5e7]"}`} onClick={handleOpenModalFuel}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M19.15 19.7199H19.6C20.51 19.7199 21.24 18.8599 21.24 17.8399V16.4499C21.24 15.7199 20.86 15.0399 20.27 14.7399L18.79 13.9699L17.47 11.5999C17.09 10.9099 16.42 10.4999 15.71 10.5099H10.12C9.47 10.5099 8.86 10.8499 8.47 11.4299L6.77 13.9399L3.96 14.7999C3.24 15.0199 2.75 15.7599 2.75 16.5999V17.8299C2.75 18.8499 3.48 19.7099 4.39 19.7099H4.63" stroke="black" stroke-linecap="round" stroke-linejoin="round"></path><path d="M8.87012 19.72H14.7701" stroke="black" stroke-linecap="round" stroke-linejoin="round"></path><path d="M6.69012 21.4598C7.83335 21.4598 8.76012 20.5331 8.76012 19.3898C8.76012 18.2466 7.83335 17.3198 6.69012 17.3198C5.54689 17.3198 4.62012 18.2466 4.62012 19.3898C4.62012 20.5331 5.54689 21.4598 6.69012 21.4598Z" stroke="black" stroke-linecap="round" stroke-linejoin="round"></path><path d="M17.0798 21.4598C18.223 21.4598 19.1498 20.5331 19.1498 19.3898C19.1498 18.2466 18.223 17.3198 17.0798 17.3198C15.9365 17.3198 15.0098 18.2466 15.0098 19.3898C15.0098 20.5331 15.9365 21.4598 17.0798 21.4598Z" stroke="black" stroke-linecap="round" stroke-linejoin="round"></path><path d="M8 7.5H5.5V2.5H8C9.38068 2.5 10.5 3.61932 10.5 5C10.5 6.38068 9.38068 7.5 8 7.5Z" stroke="black"></path><path d="M5.5 3.5H3" stroke="black" stroke-linecap="round"></path><path d="M5.5 6.5H3" stroke="black" stroke-linecap="round"></path><path d="M20 10V5H11" stroke="black" stroke-linecap="round" stroke-linejoin="round"></path><path d="M12 13L11 15H13L12 17" stroke="black" stroke-linecap="round" stroke-linejoin="round"></path></svg>
                            <p className="sm:hidden">Loại nhiên liệu</p>
                        </div>
                    </div>
                </div>
            </div>

            <CarList ava={true} isHiddenTitle={true} carArray={carArray} menu={true} />
        </>
    )
}

export default CarMenu