import { delaySetApiInfo } from '@/util/snackBarFunc';
import { useSnackBarState } from '../../_components/SnackBarProvider';
import { MESSAGE, DELAY_TIME_START, DELAY_TIME_END } from '@/util/constants';

const useErrorHandler = () => {
  const { useApiState } = useSnackBarState();

  const handlerRefetch = async (apiFunc, callFunc) => {
    await delaySetApiInfo(useApiState, `${MESSAGE.SYNC_START}`, DELAY_TIME_START);
    const result = await apiFunc();
    const result1 = await callFunc();
    if (result.isSuccess) await delaySetApiInfo(useApiState, `${MESSAGE.SYNC_SUCCESS}`, DELAY_TIME_END);
    if (result.isError) await delaySetApiInfo(useApiState, `${MESSAGE.API_ERROR}`, DELAY_TIME_END);
  };

  const handlerAxios = async (apiFunc, callBackFunc, createMessage, successMessage) => {
    try {
      await delaySetApiInfo(useApiState, `${createMessage}`, DELAY_TIME_START);
      const result = await apiFunc();
      callBackFunc();
      await delaySetApiInfo(useApiState, `${successMessage}`, DELAY_TIME_END);
      return result;
    } catch (err) {
      await delaySetApiInfo(useApiState, `${MESSAGE.API_ERROR}`, DELAY_TIME_END);
      return Promise.reject(err);
    }
  };

  const handlerMessage = async (message) => {
    await delaySetApiInfo(useApiState, `${message}`, DELAY_TIME_END);
  };

  return {
    handlerRefetch,
    handlerAxios,
    handlerMessage,
  };
};

export default useErrorHandler;
