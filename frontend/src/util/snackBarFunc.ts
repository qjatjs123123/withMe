import { DELAY_TIME_START } from "@/util/constants"


interface ApiInfo {
    state: boolean;
    message: string;
}

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));


export const delaySetApiInfo = async ( 
  setApiInfo: React.Dispatch<React.SetStateAction<ApiInfo>>, 
  message: string,
  DELAY_TIME_END: number
) => {
  // 메시지를 설정
  setApiInfo((prev: ApiInfo) => ({
      ...prev,
      state: true,
      message: message, 
  }));

  await delay(DELAY_TIME_END); 

  setApiInfo((prev: ApiInfo) => ({
      ...prev,
      state: false, 
  }));
  await delay(DELAY_TIME_START); 
};