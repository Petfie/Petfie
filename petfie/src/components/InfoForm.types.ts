// Info Form State
export interface Info {
  name: string;
  age: string;
  gender?: "수컷" | "암컷" | "비밀";
  additionalInfo: string;
  personality: {
    [key: string]: boolean;
  };
}
