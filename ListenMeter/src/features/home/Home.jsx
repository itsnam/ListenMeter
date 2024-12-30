import { useState } from 'react';
import StartButton from '../components/StartButton';
import { useNavigate } from 'react-router-dom';
import { useEmail } from '../../context/EmailContext';

const Home = () => {
  const { email, setEmail } = useEmail();
  const [emailError, setEmailError] = useState('');
  const navigate = useNavigate();

  const validateEmail = (email) => {
    const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return regex.test(email);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (email === '') {
      setEmailError('Vui lòng nhập email.');
    } else if (!validateEmail(email)) {
      setEmailError('Email không hợp lệ. Vui lòng nhập lại.');
    } else {
      setEmailError('');
      navigate('/tutorial', { state: { email } });
    }
  };


  return (
    <div className="h-screen bg-home-background lg:p-20 pt-20 p-10 flex flex-col items-center gap-12">
      <p className="text-center text-white lg:text-2xl text-base font-normal">
        ĐÁNH GIÁ MỨC ĐỘ TRƯỞNG THÀNH VỀ QUẢN TRỊ TRẢI NGHIỆM KHÁCH HÀNG
      </p>
      <p className="text-center text-white lg:text-4xl text-2xl font-medium">
        Công ty bạn trưởng thành như thế nào trong việc lắng nghe khách hàng?
      </p>
      <p className="text-center text-white lg:text-xl text-base font-normal">
        Đánh giá khả năng của bạn trong việc lắng nghe, hiểu và đáp ứng các tín hiệu từ khách hàng
      </p>
      <form onSubmit={handleSubmit}>
        <div className='flex flex-col w-full items-center gap-6'>
          <div className="w-full shadow-lg flex gap-2 items-center bg-white p-2 hover:shadow-xl duration-300 hover:border-2 border-gray-400 group delay-200 rounded-md">
            <svg
              className="group-hover:rotate-[360deg] duration-300"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              height="1em"
              width="1em"
            >
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
              <path d="M22 6l-10 7L2 6"></path>
            </svg>
            <input
              type="email"
              name="email"
              className="md:w-96 focus:outline-none"
              placeholder="Địa chỉ email của bạn"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          {emailError && (
            <p className="text-red-500 text-sm">{emailError}</p>
          )}

          <StartButton />
        </div>
      </form>

    </div>
  );
};

export default Home;
