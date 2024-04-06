// Info Form State
export interface Info {
  name: string;
  age: string;
  gender: string;
  additionalInfo: string;
  personality: {
    [key: string]: boolean;
  };
}
