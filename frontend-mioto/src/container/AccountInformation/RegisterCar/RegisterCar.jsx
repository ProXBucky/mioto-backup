import { useNavigate } from "react-router-dom"

function RegisterCar() {
    const navigate = useNavigate()

    const handleOpenModalAddCar = () => {
        navigate('/register-mode/selfdrive')
    }

    return (
        <>

            <div className="h-screen sm:px-5 md:px-5 lg:px-16 xl:px-32 flex items-center justify-center bg-gray-100">
                <div className="flex flex-col justify-center items-center ">
                    <h2 className="font-bold text-4xl">Đăng ký xe</h2>
                    <img loading="lazy" src="/registerCar.svg" />
                    <button className="px-4 py-3 rounded-xl font-semibold bg-main text-white" onClick={() => handleOpenModalAddCar()}>Đăng ký xe tự lái</button>
                </div>
            </div>

        </>
    )
}

export default RegisterCar