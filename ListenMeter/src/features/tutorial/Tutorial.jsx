import { useNavigate } from 'react-router-dom';
import React, { useEffect } from 'react';
import StartButton from '../components/StartButton';
import { useEmail } from '../../context/EmailContext';

const Tutorial = () => {
    const { email } = useEmail();
    const navigate = useNavigate();

    useEffect(() => {
        if(!email){
            navigate('/');
        }
    },[])

    const onClick = () => {
        navigate('/survey');
    }

    return (
        <div className="h-screen bg-home-background lg:p-20 pt-20 p-10 flex flex-col items-center gap-12">
            <p className="text-center text-white lg:text-2xl text-base font-normal">
                ĐÁNH GIÁ MỨC ĐỘ TRƯỞNG THÀNH VỀ QUẢN TRỊ TRẢI NGHIỆM KHÁCH HÀNG
            </p>
            <div className="bg-gray-500 bg-opacity-50 flex flex-col gap-6 rounded-lg p-4">
                <div className="flex items-center justify-center gap-2">
                    <div className="w-3 h-3 bg-blue-300 rounded-full"></div>
                    <p className="lg:text-lg text-white text-base font-normal">
                        HƯỚNG DẪN TRẢ LỜI
                    </p>
                </div>

                <p className="text-white lg:text-lg text-base font-bold">
                    Hãy dựa vào hướng dẫn sau đây để trả lời các câu hỏi:
                </p>
                <ul className='text-base font-light text-white list-disc ml-6'>
                    <li>
                        Chọn "Có": nếu câu đó phản ánh hiện trạng đang có VÀ được thực hiện một cách nhất quán (ít nhất 80% thời gian)
                    </li>
                    <li>
                        Chọn "Không có": nếu hoàn toàn chưa từng thực hiện
                    </li>
                    <li>
                        Chọn "Không rõ vấn đề này": nếu không chắc chắn đã thực hiện hay chưa
                    </li>
                </ul>
                <div className="flex justify-center mt-6">
                    <StartButton onClick={onClick}/>
                </div>
            </div>
        </div>
    )
}

export default Tutorial
