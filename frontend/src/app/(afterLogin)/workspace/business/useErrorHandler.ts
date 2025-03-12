import { delaySetApiInfo } from '@/util/snackBarFunc';

import { MESSAGE, DELAY_TIME_START, DELAY_TIME_END } from '@/util/constants';
import { useQueryClient } from '@tanstack/react-query';

const useErrorHandler = () => {
  const queryClient = useQueryClient();

  const handlerRefetch = async (apiFunc, callFunc) => {
    const tmp = (data) => queryClient.setQueryData(["apiMessage"], data);

    await delaySetApiInfo(tmp, `${MESSAGE.SYNC_START}`, DELAY_TIME_START);
    const result = await apiFunc();
    const result1 = await callFunc();
    if (result.isSuccess) await delaySetApiInfo(tmp, `${MESSAGE.SYNC_SUCCESS}`, DELAY_TIME_END);
    if (result.isError) await delaySetApiInfo(tmp, `${MESSAGE.API_ERROR}`, DELAY_TIME_END);
  };

  const handlerAxios = async (apiFunc, callBackFunc, createMessage, successMessage) => {
    const tmp = (data) => queryClient.setQueryData(["apiMessage"], data);
    try {
      
      await delaySetApiInfo(tmp, `${createMessage}`, DELAY_TIME_START);
      const result = await apiFunc();
      callBackFunc();
      await delaySetApiInfo(tmp, `${successMessage}`, DELAY_TIME_END);
      return result;
    } catch (err) {
      await delaySetApiInfo(tmp, `${MESSAGE.API_ERROR}`, DELAY_TIME_END);
      return Promise.reject(err);
    }
  };

  const handlerMessage = async (message) => {
    const tmp = (data) => queryClient.setQueryData(["apiMessage"], data);
    await delaySetApiInfo(tmp, `${message}`, DELAY_TIME_END);
  };

  return {
    handlerRefetch,
    handlerAxios,
    handlerMessage,
  };
};

export default useErrorHandler;
