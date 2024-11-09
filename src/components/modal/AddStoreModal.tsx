import Map_Icon from '../../assets/Map_Icon.svg';
import Store_Icon from '../../assets/Store_Icon.svg';
import { toast } from 'react-toastify';
import { useState } from 'react';
import useUsersStore from '../../store/useUsersStore';

interface AddStoreModalProps {
  onClose: () => void;
}

const AddStoreModal: React.FC<AddStoreModalProps> = ({ onClose }) => {
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');

  const addStore = useUsersStore((state) => state.addStore);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (name.trim() === '') {
      toast.warn('스토어 이름은 필수 입력 요소입니다.', {
        position: 'top-center',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
      });
      return;
    }

    addStore({ name, address });

    setName('');
    setAddress('');

    onClose();
  };

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className='fixed inset-0 z-50 flex items-center justify-center bg-m_background/70'
      onClick={handleBackdropClick}
    >
      <div
        className='w-[520px] rounded-xl bg-white p-[40px] text-center shadow-lg'
        onClick={(e) => e.stopPropagation()}
      >
        <form className='flex flex-col gap-7' onSubmit={handleSubmit}>
          <ul className='flex flex-col gap-4'>
            <li className='flex items-center justify-between'>
              <div className='relative flex items-center gap-2'>
                <img src={Store_Icon} alt='상점 이미지' />
                <label
                  htmlFor='store_name'
                  className='text-xl font-medium text-main'
                >
                  스토어 이름
                </label>
                <span className='absolute -right-1.5 -top-1 text-red'>*</span>
              </div>
              <input
                id='store_name'
                type='text'
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder='이름을 입력해 주세요.'
                className='w-[60%] rounded-lg border px-3 py-2'
              />
            </li>
            <li className='flex items-center justify-between'>
              <div className='flex items-center gap-2'>
                <img src={Map_Icon} alt='주소 이미지' />
                <label
                  htmlFor='store_address'
                  className='text-xl font-medium text-main'
                >
                  주소
                </label>
              </div>
              <input
                id='store_address'
                type='text'
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder='주소를 입력해 주세요.'
                className='w-[60%] rounded-lg border px-3 py-2'
              />
            </li>
          </ul>

          <div className='flex justify-between px-14'>
            <button
              type='button'
              onClick={onClose} // 취소 버튼 클릭 시 onClose 호출
              className='choice_button opacity-70'
            >
              취소
            </button>
            <button type='submit' className='choice_button'>
              완료
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddStoreModal;