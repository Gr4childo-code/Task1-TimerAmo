import { useState, useEffect, useRef } from 'react';

const formatTimer = (time) => {
  let hour = Math.floor(time / (60 * 60)),
    resultMinutes = time % (60 * 60),
    minute = Math.floor(resultMinutes / 60),
    resultSeconds = resultMinutes % 60,
    second = Math.ceil(resultSeconds),
    fullTime;

  if (second === 60) {
    second = 0;
    minute = minute + 1;
  }
  if (second < 10) {
    second = '0' + second;
  }
  if (minute === 60) {
    minute = 0;
    hour = hour + 1;
  }
  if (minute < 10) {
    minute = '0' + minute;
  }
  if (hour < 10) {
    hour = '0' + hour;
  }

  fullTime = hour + ' час ' + ' : ' + minute + ' минут ' + ' : ' + second + ' секунд ';

  return fullTime;
};

const App = () => {
  const inputRef = useRef();
  const [timer, setTimer] = useState();
  const timerIntervalId = useRef();

  useEffect(() => {
    timerIntervalId.current = setInterval(() => {
      setTimer(timer - 1);
    }, 1000);
    return () => clearInterval(timerIntervalId.current);
  }, [timer]);

  useEffect(() => {
    if (timer <= 0) {
      clearInterval(timerIntervalId.current);
    }
  }, [timer]);

  const handlerClick = (number) => {
    if (number > 0 && Number.isInteger(Number(number))) {
      setTimer(number);
    } else {
      alert('Время должно быть больше 0 или целое число');
    }
  };
  return (
    <>
      <input placeholder='Seconds' type='text' ref={inputRef} />

      <button onClick={() => handlerClick(inputRef.current.value)}>Start</button>

      <br />
      <br />

      <span>{timer ? formatTimer(timer) : 'hh:mm:ss'}</span>
    </>
  );
};

export default App;
