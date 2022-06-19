import { useState, useCallback } from 'react';
import axios from 'axios';

const useHttp = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const sendRequest = useCallback(async (requestConfig, applyData) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await axios({
        method: requestConfig.method,
        url: requestConfig.url,
        data: requestConfig.data,
        headers: requestConfig.headers,
      });

      applyData(response.data);
    } catch (err) {
      if (err.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.log(err.response.data);

        if (err.response.data.message.startsWith('Duplicate field email')) {
          const error = {
            ...err,
            message: 'There is already a user with this email registered!',
          };
          setError(error);
        } else if (
          err.response.data.message.startsWith('Duplicate field name')
        ) {
          const error = {
            ...err,
            message: 'You have already a subject with this name!',
          };
          setError(error);
        } else if (
          err.response.data.message.startsWith('Duplicate field question')
        ) {
          const error = {
            ...err,
            message:
              'You have already a flashcard with this question in the corresponding subject !',
          };
          setError(error);
        } else {
          setError(err.response.data);
        }
      } else if (err.request) {
        // The request was made but no response was received
        // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
        // http.ClientRequest in node.js
        setError(err.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        setError(err.message);
      }
    } finally {
      setIsLoading(false);
    }
  }, []);

  return {
    isLoading,
    error,
    sendRequest,
  };
};

export default useHttp;
