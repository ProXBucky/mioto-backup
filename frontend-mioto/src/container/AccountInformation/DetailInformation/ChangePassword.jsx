import { useState } from "react";
import { changePasswordUserById } from "../../../api/userAPI";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { tokenSelector, userIdSelector } from "../../../redux/selector";
import { setHideLoading, setShowLoading } from "../../../redux/Slice/AppSlice";

function ChangePassword() {
    const dispatch = useDispatch()
    const token = useSelector(tokenSelector)
    const userId = useSelector(userIdSelector);
    const [formData, setFormData] = useState({
        password: '',
        newPassword: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const changePassSubmit = async () => {
        try {
            dispatch(setShowLoading())
            let res = await changePasswordUserById(userId, formData, token)
            if (res) {
                toast.success('Thay đổi mật khẩu thành công')
                setFormData({
                    password: '',
                    newPassword: ''
                })
            }
        } catch (error) {
            if (error.response && error.response.status === 400) {
                toast.error('Mật khẩu hiện tại không đúng.');
            } else if (error.response && error.response.status === 404) {
                toast.error('Không thấy người dùng.');
            } else {
                toast.error('Lỗi hệ thống.');
            }
        } finally {
            dispatch(setHideLoading())
        }

    }
    return (
        <>
            <h1 className="sm:text-xl md:text-3xl lg:text-4xl xl:text-4xl font-bold">Đổi mật khẩu</h1>
            <p className="text-sm py-2">Vui lòng nhập mật khẩu hiện tại của bạn để thay đổi mật khẩu</p>
            <div className="flex w-full flex-col gap-2 mt-2 bg-white py-3 px-4 rounded-xl">
                <h1 className="text-2xl font-bold mb-4">Nhập mật khẩu</h1>
                <div>
                    <label className="font-semibold text-gray-500 text-md w-full">Mật khẩu hiện tại</label>
                    <input className="border outline-none w-full p-2 mt-2 rounded-lg" name="password" value={formData.password} onChange={handleChange} />
                </div>
                <div>
                    <label className="font-semibold text-gray-500 text-md w-full">Mật khẩu mới</label>
                    <input className="border outline-none w-full p-2 mt-2 rounded-lg" name="newPassword" value={formData.newPassword} onChange={handleChange} />
                </div>
                <div className="w-full flex justify-end">
                    <button className="p-2 py-3 bg-main rounded-md mt-2 sm:w-full md:w-1/6 lg:w-1/6 xl:w-1/6 font-bold text-white" onClick={() => changePassSubmit()}>Xác nhận</button>
                </div>
            </div>
        </>
    )
}

export default ChangePassword