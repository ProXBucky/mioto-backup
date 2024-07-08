import { useSelector } from "react-redux"
import IncomeSum from "./IncomeSum"
import RegisterBanner from "./RegisterBanner"
import WhyChoose from "./WhyChoose"
import { userIdSelector } from "../../redux/selector"
import { useNavigate } from "react-router-dom"

function CarRegist({ handleOpenLoginModal }) {
    const userId = useSelector(userIdSelector)
    const navigate = useNavigate()

    const handleRegistCar = () => {
        if (!userId) {
            handleOpenLoginModal()
        }
        else {
            navigate('/car-register')
        }
    }

    return (
        <>
            <RegisterBanner handleRegistCar={handleRegistCar} />
            <WhyChoose />
            <IncomeSum />
        </>
    )
}

export default CarRegist