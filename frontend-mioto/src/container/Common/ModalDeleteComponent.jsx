import Modal from 'react-bootstrap/Modal';
import { adminTokenSelector, modalDeleteSelector, modalObjectDeleteSelector, tokenSelector, } from '../../redux/selector';
import { useDispatch, useSelector } from 'react-redux';
import { clearModalDelete, clearModalObjectDelete } from '../../redux/Slice/ModalSlice';
import { useNavigate } from 'react-router-dom';
import { logoutAdmin, logoutUser } from '../../api/authAPI';
import Cookies from 'js-cookie';
import { clearAdminFullname, clearAdminId, clearAdminRole, clearAdminToken, clearAvatarImage, clearAvatarImageAdmin, clearFullname, clearToken, clearUserId } from '../../redux/Slice/CookieSlice';
import { toast } from 'react-toastify';
import { setMenuLeft } from '../../redux/Slice/AppSlice';


function ModalDeleteComponent() {
    const modalDelete = useSelector(modalDeleteSelector);
    const modalObjectDelete = useSelector(modalObjectDeleteSelector);
    const dispatch = useDispatch()

    const handleCloseModalDelete = () => {
        dispatch(clearModalDelete())
    }

    const handleCloseMenuLeft = () => {
        dispatch(setMenuLeft())
    }

    const navigate = useNavigate();
    const adminToken = useSelector(adminTokenSelector)
    const token = useSelector(tokenSelector)

    const handleLogout = async () => {
        try {
            if (modalObjectDelete === "logout-admin") {
                let res = await logoutAdmin(adminToken);
                if (res) {
                    Cookies.remove('adminAccessToken');
                    Cookies.remove('adminId');
                    Cookies.remove('adminFullname');
                    Cookies.remove('adminRole');
                    Cookies.remove('avatarImageAdmin')
                    dispatch(clearAdminToken())
                    dispatch(clearAdminId())
                    dispatch(clearAdminFullname())
                    dispatch(clearAdminRole())
                    dispatch(clearAvatarImageAdmin())
                    dispatch(clearModalDelete())
                    dispatch(clearModalObjectDelete())
                    navigate('/login')
                    toast.success("Hẹn gặp bạn lần sau");
                }
            }
            else if (modalObjectDelete === "logout-user") {
                let res = await logoutUser(token);
                if (res) {
                    Cookies.remove('accessToken');
                    Cookies.remove('userId');
                    Cookies.remove('fullname');
                    Cookies.remove('avatarImage');
                    dispatch(clearToken())
                    dispatch(clearUserId())
                    dispatch(clearFullname())
                    dispatch(clearAvatarImage())
                    dispatch(clearModalDelete())
                    dispatch(clearModalObjectDelete())
                    navigate('/')
                    toast.success("Hẹn gặp bạn lần sau");
                }
            }
            else {
                toast.error("Lỗi hệ thống")
            }
        } catch (error) {
            console.log(error)
            toast.error("Lỗi hệ thống, đăng xuất thất bại")
        }
    }

    const handleLogoutNew = () => {
        handleLogout()
        handleCloseMenuLeft()
    }

    return (
        <Modal
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            show={modalDelete} onHide={handleCloseModalDelete}
        >
            <Modal.Header className='border-none justify-end mt-3 mr-3'>
                <i className="fa-solid fa-xmark fa-2xl cursor-pointer" onClick={() => handleCloseModalDelete()}></i>
            </Modal.Header>
            <Modal.Body className='p-4 flex flex-col justify-center items-center'>
                <h2 className='font-bold sm:text-2xl md:text-3xl lg:text-3xl xl:text-3xl mb-12'>Bạn muốn đăng xuất ?</h2>
                <button className='sm:hidden md:hidden rounded-lg p-3 px-5 bg-main text-white font-semibold' onClick={handleLogout}>Đăng xuất</button>
                <button className='lg:hidden xl:hidden rounded-lg p-3 bg-main text-white font-semibold' onClick={handleLogoutNew}>Đăng xuất</button>
            </Modal.Body>

        </Modal>
    );
}

export default ModalDeleteComponent