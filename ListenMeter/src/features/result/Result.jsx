import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import emailjs from 'emailjs-com';
import assessment from '../../../public/assessment.json';

const Result = () => {
  const location = useLocation();
  const { totalScore } = location.state || {};
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEmailModalOpen, setIsEmailModalOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [isSending, setIsSending] = useState(false);

  useEffect(()=> {
    if (totalScore === undefined || totalScore === null) {
        navigate('/');
    }
  })

  const getResult = (score) => {
    const resultLevel = assessment.results.find(result => score >= result.range[0] && score <= result.range[1]);
    return resultLevel;
  };

  const result = getResult(totalScore);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const toggleEmailModal = () => {
    setIsEmailModalOpen(!isEmailModalOpen);
  };

  const handleEmailSubmit = (e) => {
    e.preventDefault();
    setIsSending(true);
  
    const imageUrl = `https://github.com/itsnam/ListenMeter/blob/main/level${result.level}.jpg?raw=true`;
  
    const templateParams = {
      to_email: email,
      image_url: imageUrl,
    };
  
    emailjs.send(
      'service_7fddjmm',   
      'template_lzed94m',
      templateParams,      
      'LF-nRG8bcNpHkJ71A' 
    ).then(() => {
      alert('Đã gửi kết quả qua email');
      setIsSending(false);
      toggleEmailModal();
    }).catch((error) => {
      console.error('Error sending email:', error);
      setIsSending(false);
    });
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text)
      .then(() => {
        alert('Đã sao chép đường dẫn đến trang kết quả!');
      })
      .catch((err) => {
        console.error('Lỗi khi sao chép: ', err);
        alert('Không thể sao chép liên kết đường dẫn đến trang kết quả');
      });
  };
  
  return (
    <div className="min-h-screen bg-home-background lg:p-20 pt-20 p-10 flex flex-col items-center gap-12">
      <p className="text-center text-white lg:text-2xl text-base font-normal">
        ĐÁNH GIÁ MỨC ĐỘ TRƯỞNG THÀNH VỀ QUẢN TRỊ TRẢI NGHIỆM KHÁCH HÀNG
      </p>

      {result && (
        <div className="max-w-6xl bg-gray-400 bg-opacity-50 flex flex-col gap-6 rounded-lg p-4">
            <div className='flex gap-2'>
            <div className="size-12 md:size-16 bg-white rounded-full flex justify-center items-center">
                <img src={result.icon} alt={result.name} className="size-7 md:size-10" />
            </div>
            <div className="flex flex-col justify-between">
                <p className="text-white text-xs md:text-xl font-light"> VOICE OF THE CUSTOMER - CẤP ĐỘ {result.level}</p>
                <p className="text-white text-2xl font-bold uppercase">{result.name}</p>
            </div>
            </div>

            <p className="text-white">{result.description.text}</p>

            <div className="mt-4">
            <h3 className="text-white font-semibold">Các hành động cần thực hiện:</h3>
            <ul className="list-disc ml-6 text-white">
                {result.key_actions.map((action, index) => (
                <li key={index}>{action.text}</li>
                ))}
            </ul>
            </div>

            <img src={`https://github.com/itsnam/ListenMeter/blob/main/level${result.level}.jpg?raw=true`} alt="Result" />
            <h3 className="text-white font-semibold">Thang đánh giá mức độ trưởng thành:</h3>
            <div className="flex flex-col gap-3">
              {assessment.results.map((levelData, index) => (
                <div key={index} className="relative">
                  <div className="flex items-center gap-4">
                    <div className={`w-16 text-right text-sm ${result.level === levelData.level ? 'text-white font-bold' : 'text-gray-300'}`}>
                      Level {levelData.level}
                    </div>
                    <div className="flex-1">
                      <div className={`h-8 rounded-lg relative ${result.level === levelData.level ? 'bg-blue-300' : 'bg-gray-600'}`}>
                        <div className={`absolute inset-0 flex items-center px-4 ${result.level === levelData.level ? 'text-white font-bold' : 'text-gray-300'}`}>
                          {levelData.name}
                        </div>
                      </div>
                    </div>
                    <div className={`w-20 text-sm ${result.level === levelData.level ? 'text-white font-bold' : 'text-gray-300'}`}>
                      {levelData.range[0]}-{levelData.range[1]} điểm
                    </div>
                  </div>
                  {result.level === levelData.level && (
                    <div className="absolute -left-2 top-1/2 transform -translate-y-1/2">
                      <div className="animate-pulse">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 text-white">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                        </svg>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className="fixed -right-6 top-1/2 transform -translate-y-1/2 flex flex-col items-center gap-4">
                <button
                    className="bg-blue-300 text-white p-3 flex gap-2 justify-center items-center transform -rotate-90"
                    onClick={toggleModal}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                    </svg>
                    Chia sẻ
                </button>
                <a 
                    href={`https://github.com/itsnam/ListenMeter/blob/main/level${result.level}.jpg?raw=true`} 
                    download={`level${result.level}.jpg`}
                    className="bg-white text-blue-300 p-3 flex justify-center items-center shadow-lg mt-6"
                    target="_blank"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3" />
                    </svg>
                </a>

                <button 
                className="bg-white text-blue-300 p-3 flex justify-center items-center shadow-lg"
                onClick={() => {
                    navigate('/');
                }}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
                    </svg>
                </button>
            </div>
        </div>
        )}


      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg w-96">
            <h3 className="text-center text-lg font-semibold mb-4">Chia sẻ kết quả</h3>
            <p className='mb-4'>Đây là một số cách bạn có thể chia sẻ với bạn bè và đồng nghiệp của mình</p>
            <button
                className="w-full bg-sky-100 text-blue-300 font-semibold p-2 rounded mb-4 hover:bg-blue-300 hover:text-white"
                onClick={() => {
                    const imageUrl = `https://github.com/itsnam/ListenMeter/blob/main/level${result.level}.jpg?raw=true`;
                    const shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(imageUrl)}`;
                    window.open(shareUrl, '_blank');
                }}
                >
                Chia sẻ qua Facebook
            </button>

            <button
                className="w-full bg-sky-100 text-blue-300 font-semibold p-2 rounded mb-4 hover:bg-blue-300 hover:text-white"
                onClick={toggleEmailModal}
            >
                Chia sẻ qua Email
            </button>
            <button
                className="w-full bg-sky-100 text-blue-300 font-semibold p-2 rounded mb-4 hover:bg-blue-300 hover:text-white"
                onClick={() => {
                    const imageUrl = `https://github.com/itsnam/ListenMeter/blob/main/level${result.level}.jpg?raw=true`;
                    copyToClipboard(imageUrl);
                }}
                >
                Sao chép đường dẫn đến trang kết quả
            </button>
    
            <div className="text-center">
              <button
                className="w-full text-blue-300 font-semibold p-2 rounded mb-4 hover:bg-blue-300 hover:text-white"
                onClick={toggleModal}
              >
                Đóng
              </button>
            </div>
          </div>
        </div>
      )}

      {isEmailModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="flex flex-col gap-4 bg-white p-6 rounded-lg w-96">
            <h3 className="text-center text-lg font-semibold">Chia sẻ qua email</h3>
            <p>Vui lòng cung cấp địa chỉ email mà bạn muốn chia sẻ kết quả:</p>
            <form onSubmit={handleEmailSubmit}>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-2 mb-2 border border-gray-300 rounded"
                placeholder="Địa chỉ email nhận kết quả"
                required
              />
              <p className='text-gray-400 text-sm'>Ấn enter sau mỗi email để xác nhận</p>
              <div className="flex mt-4 gap-6">
                <button
                  type="button"
                  className="w-full bg-sky-100 text-blue-300 font-semibold p-2 rounded"
                  onClick={toggleEmailModal}
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  className="w-full bg-blue-300 text-white font-semibold p-2 rounded"
                  disabled={isSending}
                >
                  {isSending ? 'Đang gửi...' : 'Gửi Email'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Result;
