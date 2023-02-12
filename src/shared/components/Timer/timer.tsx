import dayjs from "dayjs";
import React, { useState, useEffect } from "react";
import { BiTimeFive } from "react-icons/bi";
import styled from "styled-components";

interface TimerProps {
  endDate: string | undefined;
}

const DivTimer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px;
  background-color: #153c7a;
  height: 50px;
`;

const TimeText = styled.h1`
  font-size: 22px;
  font-weight: 500;
  padding-left: 10px;
  color: #ffffff;
`;

const Timer: React.FC<TimerProps> = ({ endDate }) => {
  const [timeLeft, setTimeLeft] = useState({
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const intervalId = setInterval(() => {
      const end = dayjs(endDate);
      const now = dayjs();
      const difference = end.diff(now, "second");
      if (difference >= 0) {
        setTimeLeft({
          hours: Math.floor((difference % (60 * 60 * 24)) / (60 * 60)),
          minutes: Math.floor((difference % (60 * 60)) / 60),
          seconds: difference % 60,
        });
      } else {
        clearInterval(intervalId);
      }
    }, 1000);
    return () => {
      clearInterval(intervalId);
    };
  }, [endDate]);

  return (
    <DivTimer>
      <BiTimeFive size={30} color="#FFFFFF" />
      <TimeText>
        {timeLeft.hours}:{timeLeft.minutes}:{timeLeft.seconds}
      </TimeText>
    </DivTimer>
  );
};

export default Timer;
