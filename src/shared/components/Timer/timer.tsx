/* eslint-disable @typescript-eslint/no-empty-function */
import dayjs from "dayjs";
import React, { useState, useEffect } from "react";
import { BiTimeFive } from "react-icons/bi";
import styled from "styled-components";
import duration from "dayjs/plugin/duration";
import { useNavigate } from "react-router-dom";
dayjs.extend(duration);

interface Props {
  endTime: string;
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

const Timer: React.FC<Props> = ({ endTime }) => {
  const [timeLeft, setTimeLeft] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const intervalId = setInterval(() => {
      const now = dayjs();
      const duration = dayjs(endTime).diff(now);
      if (duration <= 0) {
        clearInterval(intervalId);
        navigate("/experimentos");
      } else {
        const durationInSeconds = duration / 1000;
        const durationInHhMmSs = dayjs
          .duration(durationInSeconds, "seconds")
          .format("mm:ss");
        setTimeLeft(durationInHhMmSs);
      }
    }, 1000);
    return () => clearInterval(intervalId);
  }, [endTime]);

  return (
    <DivTimer>
      <BiTimeFive size={30} color="#FFFFFF" />
      <TimeText>{timeLeft}</TimeText>
    </DivTimer>
  );
};

export default Timer;
