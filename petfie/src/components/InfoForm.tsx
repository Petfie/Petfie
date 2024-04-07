import { Info } from "@/components/InfoForm.types";

interface Props {
  info: Info;
  changeInfo: (info: Info) => void;
}
export default function InfoForm({ info, changeInfo }: Props) {
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
  };

  const changeAge = (e: React.ChangeEvent<HTMLInputElement>) => {
    changeInfo({ ...info, age: e.target.value });
  };

  const selectGender = (e: React.MouseEvent<HTMLDivElement>) => {
    const target = e.target as HTMLInputElement;
    changeInfo({ ...info, gender: target.value });
  };

  const changeAdditionalInfo = (e: React.ChangeEvent<HTMLInputElement>) => {
    changeInfo({ ...info, additionalInfo: e.target.value });
  };

  const selectPersonality = (e: React.MouseEvent<HTMLDivElement>) => {
    const target = e.target as HTMLInputElement;
    console.log("target", target.id);
    changeInfo({
      ...info,
      personality: { ...info.personality, [target.id]: target.checked },
    });
  };

  return (
    <>
      <form>
        <p>반려동물의 이름</p>
        <input
          name="name"
          type="text"
          placeholder="이름을 입력해주세요"
          required
          onChange={changeName}
        />
        <p>반려동물의 나이</p>
        <input
          name="age"
          type="number"
          placeholder="나이를 입력해주세요"
          required
          onChange={changeAge}
        />
        <p>반려동물의 성별</p>
        <div onClick={selectGender}>
          <input
            type="radio"
            id="radioMale"
            name="gender"
            value="수컷"
            required
          />
          <label htmlFor="radioMale">수컷</label>
          <input
            type="radio"
            id="radioFemale"
            name="gender"
            value="암컷"
            required
          />
          <label htmlFor="radioFemale">암컷</label>
          <input
            type="radio"
            id="radioSecret"
            name="gender"
            value="비밀"
            required
          />
          <label htmlFor="radioSecret">비밀</label>
        </div>
        <p>추가 정보</p>
        <input
          type="text"
          placeholder="정보를 입력해주세요"
          name="additionalInfo"
          onChange={changeAdditionalInfo}
        />
        <p>성격</p>
        <ul>
          {Object.entries(personality).map(([key, value], idx) => (
            <li key={idx}>
              <input
                type="checkbox"
                id={value}
                required
                onClick={selectPersonality}
              />
              <label htmlFor={value}>{value}</label>
            </li>
          ))}
        </ul>
      </form>
    </>
  );
}
