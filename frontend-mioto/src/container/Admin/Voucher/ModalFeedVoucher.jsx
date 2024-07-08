import Modal from 'react-bootstrap/Modal';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { clearModalFeedVoucher, clearModalVoucherId } from '../../../redux/Slice/ModalSlice';
import { setHideLoading, setShowLoading } from '../../../redux/Slice/AppSlice';
import { adminTokenSelector, modalFeedVoucherSelector, modalVoucherIdSelector } from '../../../redux/selector';
import { feedVoucherToUser } from '../../../api/adminAPI';
import { toast } from 'react-toastify';
import { getAllUserByAdmin } from '../../../api/appAPI';
import { format } from 'date-fns';

function ModalFeedVoucher() {
    const modalFeedVoucher = useSelector(modalFeedVoucherSelector);
    const voucherId = useSelector(modalVoucherIdSelector);
    const adminToken = useSelector(adminTokenSelector);
    const dispatch = useDispatch();

    const [users, setUsers] = useState([]);
    const [selectedUsers, setSelectedUsers] = useState([]);

    const fetchAllUsers = async () => {
        let res = await getAllUserByAdmin(adminToken);
        if (res && res.length > 0) {
            setUsers(res);
        } else {
            setUsers([]);
        }
    };

    useEffect(() => {
        fetchAllUsers();
    }, []);

    const handleRowClick = (id) => {
        if (selectedUsers.includes(id)) {
            setSelectedUsers(selectedUsers.filter((userId) => userId !== id));
        } else {
            setSelectedUsers([...selectedUsers, id]);
        }
    };

    const handleSelectAll = () => {
        setSelectedUsers(users.map(user => user.userId));
    };

    const handleDeselectAll = () => {
        setSelectedUsers([]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            dispatch(setShowLoading());
            if (!selectedUsers || selectedUsers.length === 0) {
                toast.error("Chưa chọn người dùng nào");
                return;
            }
            const res = await feedVoucherToUser(
                voucherId,
                {
                    userIdArray: selectedUsers
                },
                adminToken
            );
            if (res) {
                handleCloseModal();
                toast.success("Phân phát mã giảm giá thành công");
            }
        } catch (error) {
            console.log(error);
            if (error.response) {
                switch (error.response.status) {
                    case 401:
                        toast.error('Bạn chưa được cấp quyền');
                        break;
                    case 403:
                        toast.error('Bạn không có quyền phân phát');
                        break;
                    default:
                        toast.error('Đã xảy ra lỗi. Vui lòng thử lại sau.');
                }
            } else {
                toast.error('Đã xảy ra lỗi. Vui lòng thử lại sau.');
            }
        } finally {
            dispatch(setHideLoading());
        }
    };

    const handleCloseModal = () => {
        dispatch(clearModalVoucherId());
        dispatch(clearModalFeedVoucher());
    };

    return (
        <Modal
            size="xl"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            dialogClassName="custom-modal"
            show={modalFeedVoucher}
        >
            <Modal.Header className='border-none justify-between mt-3 px-5'>
                <h1 className='text-center sm:text-lg md:text-2xl lg:text-2xl xl:text-2xl font-bold'>Phân phát mã giảm giá</h1>
                <i className="fa-solid fa-xmark fa-2xl cursor-pointer" onClick={handleCloseModal}></i>
            </Modal.Header>
            <Modal.Body className='p-4 px-5 flex justify-center items-center flex-col'>
                <h3 className='font-semibold sm:text-sm md:text-lg lg:text-lg xl:text-lg'>Nhấn chọn người dùng để phân phối mã giảm giá</h3>
                <div className="flex gap-3 my-3">
                    <button className='p-2 bg-main text-white rounded-md' onClick={handleSelectAll}>Chọn tất cả</button>
                    <button className='p-2 bg-main text-white rounded-md' onClick={handleDeselectAll}>Xóa chọn tất cả</button>
                </div>
                <table className="min-w-full bg-white mt-3">
                    <thead>
                        <tr className="bg-gray-50 text-gray-500 text-sm leading-normal">
                            <th className="py-3 px-6 text-left">Họ tên</th>
                            <th className="py-3 px-4 text-left sm:hidden md:hidden">Số điện thoại</th>
                            <th className="py-3 px-6 text-left sm:hidden">Ngày sinh</th>
                            <th className="py-3 px-6 text-center sm:hidden md:hidden">Email</th>
                            <th className="py-3 px-6 text-center">Trạng thái</th>
                        </tr>
                    </thead>
                    <tbody className="text-gray-600 text-sm font-normal">
                        {
                            users && users.length > 0 &&
                            users.map((user, index) => {
                                return (
                                    <tr
                                        key={index}
                                        className={`border-b border-gray-200 cursor-pointer ${selectedUsers.includes(user.userId) ? 'bg-green-100' : 'hover:bg-gray-100'}`}
                                        onClick={() => handleRowClick(user.userId)}
                                    >
                                        <td className="py-3 px-6 text-left whitespace-nowrap">
                                            <div className="flex items-center gap-2">
                                                <img loading="lazy" className="h-10 rounded-full border" src={user.avatarImage ? user.avatarImage : "/avaMale.png"} />
                                                <span className="sm:text-sm md:text-base lg:text-basexl:text-base font-medium">{user.fullname}</span>
                                            </div>
                                        </td>
                                        <td className="py-3 px-6 text-left sm:hidden md:hidden">
                                            <span>{user.phone}</span>
                                        </td>
                                        <td className="py-3 px-6 text-left sm:hidden">
                                            <span>{user.dob ? format(user.dob, 'dd/MM/yyyy') : "Không có"}</span>
                                        </td>
                                        <td className="py-3 px-6 text-center sm:hidden md:hidden">
                                            <span className="text-sm">{user.email}</span>
                                        </td>
                                        <td className="py-3 px-2 text-center">
                                            {selectedUsers.includes(user.userId) ? <i className="fa-solid fa-check"></i> : <i className="fa-solid fa-xmark"></i>}
                                        </td>
                                    </tr>
                                );
                            })
                        }
                    </tbody>
                </table>
                <button className='p-3 sm:w-full md:w-1/3 lg:w-1/4 xl:w-1/4 bg-main text-white rounded-md mt-3 hover:opacity-80' onClick={handleSubmit}>Phân phát</button>
            </Modal.Body>
        </Modal>
    );
}

export default ModalFeedVoucher;
