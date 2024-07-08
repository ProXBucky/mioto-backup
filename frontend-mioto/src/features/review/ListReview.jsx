import { format } from "date-fns"
import Rating from "react-rating"

function ListReview({ allReview, handleRatingChange, userId, handleDeleteReview }) {
    return (
        <div className="flex flex-col gap-3 mt-3">
            {
                allReview && allReview.length > 0 ?
                    allReview.map((item, index) => {
                        return (
                            <div className="rounded-lg border border-gray-500 p-4 flex justify-between" key={index}>
                                <div className="sm:w-full md:w-5/6 lg:w-5/6 xl:w-5/6">
                                    <div className="flex flex-row gap-4">
                                        <img loading="lazy" src={item.user && item.user.avatarImage ? item.user.avatarImage : "/avaMale.png"} className="rounded-full h-20 border" />
                                        <div className="flex flex-col justify-center gap-2">
                                            <h2 className="sm:text-lg md:text-xl lg:text-xl xl:text-xl font-semibold">{item.user && item.user.fullname}</h2>
                                            <div>
                                                <Rating
                                                    initialRating={item.reviewScore && item.reviewScore}
                                                    onChange={handleRatingChange}
                                                    fractions={2}
                                                    emptySymbol={<i className="fas fa-star" style={{ color: '#dcdcdc', fontSize: '16px' }}></i>}
                                                    fullSymbol={<i className="fas fa-star" style={{ color: '#ffd700', fontSize: '16px' }}></i>}
                                                    readonly={true}
                                                    direction="ltr"
                                                />
                                                <div className="md:hidden lg:hidden xl:hidden w-full text-gray-500 text-md flex justify-between items-center">
                                                    <span>{format(item.reviewDate && item.reviewDate, 'dd/MM/yyyy')}</span>
                                                    {
                                                        item.user.userId === parseInt(userId) &&
                                                        <i className="fa-solid fa-xmark fa-xl text-red-500 cursor-pointer" onClick={() => handleDeleteReview(item.reviewId)}></i>
                                                    }
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="mt-3 text-gray-500">
                                        {item.content && item.content}
                                    </div>
                                </div>
                                <div className="sm:hidden w-1/6 flex gap-2 items-center justify-end text-gray-500 text-md">
                                    <span>{format(item.reviewDate && item.reviewDate, 'dd/MM')}</span>
                                    {
                                        item.user.userId === parseInt(userId) &&
                                        <i className="fa-solid fa-xmark fa-xl text-red-500 cursor-pointer" onClick={() => handleDeleteReview(item.reviewId)}></i>
                                    }
                                </div>

                            </div>
                        )
                    })
                    :
                    <div className="flex justify-center">
                        <p className="font-semibold text-xl text-gray-500">Chưa có đánh giá</p>
                    </div>
            }
        </div>
    )
}

export default ListReview