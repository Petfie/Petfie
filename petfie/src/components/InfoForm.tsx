interface Props {
  info: Info
  changeInfo: (info: Info) => void
}
export default function InfoForm(props: Props) {

  const personality =   {
    "active": "활발함",
    "shy": "소심함",
    "affectionate": "애교쟁이",
    "dog-like": "개냥이",
    "sensitive": "예민함",
    "sleeper": "잠꾸러기",
    "foodie": "먹보",
    "lazy": "베짱이",
    "scaredy": "겁쟁이",
    "independent": "독립적",
    "explorer": "탐험가",
    "bulldozer": "불도저",
    "nocturnal": "야행성",
    "walk-lover": "산책왕"
  };

  return(
    <>
      <h2>정보 입력</h2>
      <form>
        <p>반려동물의 이름</p>
        <input type="text" placeholder="이름을 입력해주세요" required/>
        <p>반려동물의 나이</p>
        <input type="number" placeholder="나이를 입력해주세요" required/>
        <p>반려동물의 성별</p>
        <div>
          <input type="radio" id="radioMale" required/>
          <label htmlFor="radioMale">수컷</label>
          <input type="radio" id="radioFemale" required/>
          <label htmlFor="radioFemale">암컷</label>
          <input type="radio" id="radioSecret" required/>
          <label htmlFor="radioSecret">비밀</label>
        </div>
        <p>추가 정보</p>
        <input type="text" placeholder="정보를 입력해주세요"/>
        <p>성격</p>
        <ul>
          {Object.entries(personality).map(([key, value], idx) => (
            <li key={idx}>
              <input type="checkbox" id={`personality-${key}`} required/>
              <label htmlFor={`personality-${key}`}>{value}</label>
            </li>
          ))}
        </ul>
      </form>
    </>
  )
};
