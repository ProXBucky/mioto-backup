import { useState } from "react";
import { setHideLoading, setShowLoading } from "../../redux/Slice/AppSlice";
import { loginAdmin } from "../../api/authAPI";
import { setAdminFullname, setAdminId, setAdminRole, setAdminToken, setAvatarImageAdmin } from "../../redux/Slice/CookieSlice";
import { useDispatch } from "react-redux";
import Cookies from 'js-cookie';
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";


function LoginAdmin() {
    const [formData, setFormData] = useState({
        username: '',
        password: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };
    const [checkPass, setCheckPass] = useState(true);
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleLogin = async (e) => {
        e.preventDefault()
        try {
            dispatch(setShowLoading())
            let res = await loginAdmin(formData);
            if (res) {
                Cookies.set('adminAccessToken', res.token, { expires: 1 / 24 });
                Cookies.set('adminId', res.adminId, { expires: 1 / 24 });
                Cookies.set('adminFullname', res.fullname, { expires: 1 / 24 });
                Cookies.set('adminRole', res.role, { expires: 1 / 24 });
                Cookies.set('avatarImageAdmin', res.avatar, { expires: 1 / 24 });

                dispatch(setAdminToken(res.token))
                dispatch(setAdminId(res.adminId))
                dispatch(setAdminFullname(res.fullname))
                dispatch(setAdminRole(res.role))
                dispatch(setAvatarImageAdmin(res.avatar))
                toast.success('Đăng nhập thành công');
                navigate("/admin/dashboard")
            }
        } catch (error) {
            if (error.response && error.response.status === 409) {
                toast.error('Sai mật khẩu');
            }
            else if (error.response && error.response.status === 404) {
                toast.error('Tài khoản không tồn tại')
            }
            else {
                toast.error('Đã xảy ra lỗi trong quá trình đăng ký. Vui lòng thử lại sau.');
            }
            console.error('Lỗi:', error);
        }
        finally {
            dispatch(setHideLoading())
        }
    };

    return (
        <div className="login-container w-full h-screen relative" style={{ background: `center no-repeat url("/backLogin.png")` }}>
            <div className="absolute h-full sm:w-full md:w-full lg:w-[80%] xl:w-[80%] left-0" style={{ background: `center no-repeat url("/backLoginSVG.svg")` }}>
                <div className="absolute left-[8%] top-[35%] sm:hidden md:hidden">
                    <img loading="lazy" className="h-[70px]" src="/logoWhite.png" />
                    <p className="text-white font-bold text-6xl mt-10">Cùng Bạn Đến</p>
                    <p className="text-white font-bold text-6xl mt-2">Mọi Hành Trình</p>
                </div>
            </div>
            <div className="bg-white sm:w-[80%] md:w-[80%] lg:w-[30%] xl:w-[30%] sm:h-auto md:h-auto lg:h-full xl:h-full absolute sm:rounded-lg md:rounded-lg sm:right-[10%] sm:bottom-[25%]  md:right-[10%] md:bottom-[15%] lg:right-[8%] xl:right-[8%] px-4 py-3">
                <h2 className="text-center text-2xl font-bold sm:mb-5">Đăng nhập</h2>
                <img loading="lazy" className="h-[350px] w-full mb-2 sm:hidden" src="/logoLogin.svg" />
                <form onSubmit={handleLogin}>
                    <div className='' controlId="formBasicUsername">
                        <label className='font-semibold text-gray-500'>Tên đăng nhập</label>
                        <input
                            className="p-2 px-3 border-2 block w-full rounded-md mt-2 outline-none"
                            type="text"
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className='mt-2 relative' controlId="formBasicPassword">
                        <label className='font-semibold text-gray-500'>Mật khẩu</label>
                        <input
                            className="p-2 px-3 border-2 block w-full rounded-md mt-2 outline-none "
                            type={checkPass ? 'password' : 'text'}
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                        />
                        {
                            checkPass ? <i className="absolute top-[60%] right-3 fa-regular cursor-pointer fa-eye-slash" onClick={() => setCheckPass(false)}></i> : <i className="absolute top-[60%] right-3 fa-regular cursor-pointer fa-eye" onClick={() => setCheckPass(true)}></i>
                        }
                    </div>

                    {/* <>
                        <p className='text-right pt-2 text-main font-semibold cursor-pointer' onClick={() => openForget()}>Quên mật khẩu?</p>
                    </> */}

                    <button variant="primary" type="submit" className="mt-4 w-full py-3 text-lg font-semibold border-none rounded-lg text-white bg-main hover:opacity-80">
                        Đăng nhập
                    </button>
                </form>
            </div>
        </div>
    );
}

export default LoginAdmin