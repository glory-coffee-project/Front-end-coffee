import { useRef, useState } from 'react';

import Map_Icon from '../assets/Map_Icon.svg';
import Store_Icon from '../assets/Store_Icon.svg';
import Use_Chart from './Use_Chart';
import { twMerge } from 'tailwind-merge';
import useUsers_Store from '../Store/useUsers_Store';

interface MyStoreProps {
  id: number;
  name: string;
  address?: string;
  isDeleteMode: boolean;
}

const My_Store: React.FC<MyStoreProps> = ({
  id,
  name: initialName,
  address: initialAddress,
  isDeleteMode,
}) => {
  const [name, setName] = useState(initialName);
  const [address, setAddress] = useState(initialAddress);
  const [isEditingName, setIsEditingName] = useState(false);
  const [isEditingAddress, setIsEditingAddress] = useState(false);

  const updateStore = useUsers_Store((state) => state.updateStore);

  const nameInputRef = useRef<HTMLInputElement>(null);
  const addressInputRef = useRef<HTMLInputElement>(null);

  const handleUpdate = (type: 'name' | 'address') => {
    const updatedData = { id, name, address };

    if (type === 'name' && name !== initialName) {
      updateStore({ ...updatedData, address: initialAddress });
    } else if (type === 'address' && address !== initialAddress) {
      updateStore({ ...updatedData, name: initialName });
    }

    if (type === 'name') {
      setIsEditingName(false);
    } else if (type === 'address') {
      setIsEditingAddress(false);
    }
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    type: 'name' | 'address'
  ) => {
    if (e.key === 'Enter') {
      handleUpdate(type);
    }
  };

  const handleEditButtonClick = (type: 'name' | 'address') => {
    if (type === 'name') {
      setIsEditingName(true);
      setTimeout(() => nameInputRef.current?.focus(), 0);
    } else if (type === 'address') {
      setIsEditingAddress(true);
      setTimeout(() => addressInputRef.current?.focus(), 0);
    }
  };

  return (
    <div className='store_box'>
      <div className='border-underline border-b border-opacity-20 p-[20px]'>
        <ul className='flex flex-col gap-6'>
          <li className='flex items-center justify-between'>
            <img src={Store_Icon} alt='상점 아이콘' className='w-[30px]' />
            {isEditingName ? (
              <input
                ref={nameInputRef}
                type='text'
                value={name}
                onChange={(e) => setName(e.target.value)}
                onKeyDown={(e) => handleKeyDown(e, 'name')}
                className='text-main border-b border-gray-300 text-center text-[17px] font-semibold outline-none'
              />
            ) : (
              <span className='text-main w-[200px] truncate text-center text-[17px] font-semibold'>
                {name}
              </span>
            )}
            <button
              className={twMerge(
                'text-[13px] outline-none hover:font-bold',
                isDeleteMode ? 'no_hover' : 'soft_TcolorSet'
              )}
              onClick={() => {
                if (isEditingName) handleUpdate('name');
                else handleEditButtonClick('name');
              }}
              disabled={isDeleteMode}
            >
              {isEditingName ? '완료' : '수정'}
            </button>
          </li>
          <li className='flex items-center justify-between'>
            <img src={Map_Icon} alt='주소 아이콘' className='w-[30px]' />
            {isEditingAddress ? (
              <input
                ref={addressInputRef}
                type='text'
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                onKeyDown={(e) => handleKeyDown(e, 'address')}
                className='text-main border-b border-gray-300 text-center text-[17px] font-semibold outline-none'
              />
            ) : (
              <span className='text-main w-[200px] truncate text-center text-[17px] font-semibold'>
                {address}
              </span>
            )}
            <button
              className={twMerge(
                'text-[13px] outline-none hover:font-bold',
                isDeleteMode ? 'no_hover' : 'soft_TcolorSet'
              )}
              onClick={() => {
                if (isEditingAddress) handleUpdate('address');
                else handleEditButtonClick('address');
              }}
              disabled={isDeleteMode}
            >
              {isEditingAddress ? '완료' : '수정'}
            </button>
          </li>
        </ul>
      </div>
      <Use_Chart id={id} isDeleteMode={isDeleteMode} />
    </div>
  );
};

export default My_Store;
