"use client";

import { Info } from "@/components/InfoForm.types";
import { forwardRef, useState } from "react";

interface Props {
  info: Info;
  changeInfo: (info: Info) => void;
}
const InfoForm = forwardRef<HTMLFormElement, Props>(
  ({ info, changeInfo }, ref) => {
    const personality = {
      active: "활발함",
      shy: "소심함",
      affectionate: "애교쟁이",
      "dog-like": "개냥이",
      sensitive: "예민함",
      sleeper: "잠꾸러기",
      foodie: "먹보",
      lazy: "베짱이",
      scaredy: "겁쟁이",
      independent: "독립적",
      explorer: "탐험가",
      bulldozer: "불도저",
      nocturnal: "야행성",
      "walk-lover": "산책왕",
    };

    const changeName = (e: React.ChangeEvent<HTMLInputElement>) => {
      changeInfo({ ...info, name: e.target.value });
      if (e.target.validity.valid) {
        setIsNameValid(true);
      }
    };

    const changeAge = (e: React.ChangeEvent<HTMLInputElement>) => {
      changeInfo({ ...info, age: e.target.value });
      if (e.target.validity.valid) {
        setIsAgeValid(true);
      }
    };

    const selectGender = (e: React.MouseEvent<HTMLDivElement>) => {
      const target = e.target as HTMLInputElement;
      changeInfo({ ...info, gender: target.value as "수컷" | "암컷" | "비밀" });

      setIsGenderValid(true);
    };

    const changeAdditionalInfo = (e: React.ChangeEvent<HTMLInputElement>) => {
      changeInfo({ ...info, additionalInfo: e.target.value });
    };

    const selectPersonality = (e: React.MouseEvent<HTMLDivElement>) => {
      const target = e.target as HTMLInputElement;
      changeInfo({
        ...info,
        personality: { ...info.personality, [target.id]: target.checked },
      });
    };

    // test validation
    const [isNameValid, setIsNameValid] = useState(true);
    const validateName = () => {
      setIsNameValid(false);
    };

    const [isAgeValid, setIsAgeValid] = useState(true);
    const validateAge = () => {
      setIsAgeValid(false);
    };

    const [isGenderValid, setIsGenderValid] = useState(true);
    const validateGender = () => {
      setIsGenderValid(false);
    };

    return (
      <div className="w-full bg-[#fff] p-5 border border-solid border-[#e5e5e5] flex justify-start items-center rounded-lg mb-6">
        <form className="flex flex-col gap-y-6" ref={ref} id="info-form">
          <div className="flex flex-col gap-y-1.5 relative">
            <p>반려동물의 이름</p>
            <input
              className="border border-solid border-[#e5e5e5] p-2 rounded-lg w-full"
              name="name"
              type="text"
              placeholder="이름을 입력해주세요"
              required
              onChange={changeName}
              onInvalid={validateName}
            />
            {!isNameValid && (
              <p className="text-orange-600 absolute left-0 -bottom-6">
                이름을 입력해주세요
              </p>
            )}
          </div>
          <div className="flex flex-col gap-y-1.5 relative">
            <p>반려동물의 나이</p>
            <input
              className="border border-solid border-[#e5e5e5] p-2 rounded-lg w-full"
              name="age"
              type="number"
              placeholder="나이를 입력해주세요"
              required
              onChange={changeAge}
              onInvalid={validateAge}
            />
            {!isAgeValid && (
              <p className="text-orange-600 absolute left-0 -bottom-6">
                나이를 입력해주세요
              </p>
            )}
          </div>
          <div className="flex flex-col gap-y-1.5 relative">
            <p>반려동물의 성별</p>
            <div className="flex gap-x-4" onClick={selectGender}>
              <div className="flex gap-x-1">
                <input
                  type="radio"
                  id="radioMale"
                  name="gender"
                  value="수컷"
                  required
                  onInvalid={validateGender}
                />
                <label htmlFor="radioMale">수컷</label>
              </div>
              <div className="flex gap-x-1">
                <input
                  type="radio"
                  id="radioFemale"
                  name="gender"
                  value="암컷"
                  required
                  onInvalid={validateGender}
                />
                <label htmlFor="radioFemale">암컷</label>
              </div>
              <div className="flex gap-x-1">
                <input
                  type="radio"
                  id="radioSecret"
                  name="gender"
                  value="비밀"
                  required
                  onInvalid={validateGender}
                />
                <label htmlFor="radioSecret">비밀</label>
              </div>
            </div>
            {!isGenderValid && (
              <p className="text-orange-600 absolute left-0 -bottom-6">
                성별을 선택해주세요
              </p>
            )}
          </div>
          <div className="flex flex-col gap-y-1.5">
            <p>소개</p>
            <input
              className="border border-solid border-[#e5e5e5] p-2 rounded-lg w-full"
              type="text"
              placeholder="한 줄 소개를 작성해주세요. 인스타 계정도 좋아요."
              name="additionalInfo"
              maxLength={30}
              onChange={changeAdditionalInfo}
            />
          </div>
          <div className="flex flex-col gap-y-1.5">
            <p>성격</p>
            <ul className="flex flex-wrap gap-x-7 gap-y-5">
              {Object.entries(personality).map(([_, value], idx) => (
                <li key={idx} className="flex gap-x-2 items-center">
                  <label htmlFor={value} className="personality_checkbox">
                    <input
                      type="checkbox"
                      id={value}
                      onClick={selectPersonality}
                      hidden
                    />
                    <span className="checkmark"></span>
                      {value}
                  </label>
                </li>
              ))}
            </ul>
          </div>
        </form>
      </div>
    );
  }
);
InfoForm.displayName = "InfoForm";

export default InfoForm;
