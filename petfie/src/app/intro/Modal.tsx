import React, { useRef } from 'react';
import Image from "next/image"; 
import { Cross1Icon } from '@radix-ui/react-icons';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose }) => {
  const modalRef = useRef<HTMLDivElement>(null);

  const handleCloseModal = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={handleCloseModal}>
      <div className="modal" ref={modalRef}>
      <div className="modal-header">
        <Cross1Icon className="close" onClick={onClose}/>
        <div className="logo-container">
          <Image
            src="/asset/logo.png"
            alt="Petfie 로고 이미지"
            width={110}
            height={36}
          />
        </div>
        <h1>
          <p>펫피</p>에서 카드를 만드는 방법
        </h1>
      </div>
      <div className='modal-section'>
        <div>
            <h3>
            <Image
               src="/asset/modal1.png"
                alt="모달설명 이미지1"
                width={24}
                height={24}
              />
              사진 업로드 및 템플릿 선택
              </h3>
            <p>
              사랑스러운 반려동물의 사진을 업로드 해주세요!<br />
              그리고 어울리는 템플릿을 골라 보세요.
            </p>
          </div>

          <div>
            <h3>
              <Image
                src="/asset/modal2.png"
                alt="모달설명 이미지2"
                width={24}
                height={24}
              />
              카드에 들어갈 정보 입력</h3>
            <p>
              반려동물의 정보와 성격을 작성해주세요.<br />
              매력을 자랑할 수 있는 문구 한 줄도 적어주면 좋아요!<br />
              소셜미디어 주소도 좋답니다.
            </p>
          </div>

          <div>
            <h3>
              <Image
               src="/asset/modal3.png"
                alt="모달설명 이미지3"
                width={24}
                height={24}
              />
              저장 및 공유</h3>
            <p>
              완성된 카드를 저장하여 간직하세요.<br />
              링크를 공유해서 나만의 카드를 마음껏 자랑해보세요!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
