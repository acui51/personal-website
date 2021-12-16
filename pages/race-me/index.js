import React, { useState, useEffect } from "react";
import useKeyPress from "../../hooks/useKeyPress";
import ToggleButton from "components/ToggleButton";
import { useRouter } from "next/router";
import MyResponsiveLine from "components/LineGraph";
import { useTheme } from "next-themes";

const INITIAL_WORDS =
  "Serious inside else memory if six. Whose group through despite cause. Sense peace economy travel. Total financial role together range line beyond its. Policy daughter need kind miss artist truth trouble. Rest human station property. Partner stock four. Region as true develop sound central. Language ball floor meet usually board necessary. Natural sport music white."; // get from BE later

const generate = () => {
  return "I like ";
};

const currentTime = () => new Date().getTime();

const Start = ({ startTime }) => {
  return (
    <div
      className={
        "flex-col justify-center mb-4 " + (startTime && "hidden-animate")
      }
    >
      <span>^</span>
      <p>Start typing</p>
    </div>
  );
};

const RaceMe = () => {
  const [leftPadding, setLeftPadding] = useState(
    new Array(30).fill(" ").join("")
  ); // initial 50 spaces to keep current char at center
  const [outgoingChars, setOutgoingChars] = useState(""); // characters just typed
  const [currentChar, setCurrentChar] = useState(INITIAL_WORDS.charAt(0));
  const [incomingChars, setIncomingChars] = useState(INITIAL_WORDS.substr(1)); // next chars to type
  const [startTime, setStartTime] = useState(null);
  const [wordCount, setWordCount] = useState(0);
  const [charCount, setCharCount] = useState(0);
  const [wpm, setWpm] = useState(0);
  const [seconds, setTime] = useState(30);
  const [wpmArray, setWpmArray] = useState([]);
  const [incorrectChar, setIncorrectChar] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [errorCount, setErrorCount] = useState(0);
  const router = useRouter();
  const { theme } = useTheme();

  const resetState = () => {
    setLeftPadding(new Array(30).fill(" ").join(""));
    setOutgoingChars("");
    setCurrentChar(INITIAL_WORDS.charAt(0));
    setIncomingChars(INITIAL_WORDS.substr(1));
    setStartTime(null);
    setWordCount(0);
    setCharCount(0);
    setWpm(0);
    setTime(30);
    setWpmArray([]);
    setIncorrectChar(false);
  };

  useEffect(() => {
    const timeoutId =
      seconds > 0 &&
      startTime &&
      setTimeout(() => {
        setTime(seconds - 1);
        const durationInMinutes = (currentTime() - startTime) / 60000.0;
        const newWpm = (charCount / 5 / durationInMinutes).toFixed(2);
        setWpm(newWpm);
        const newWpmArray = wpmArray;
        newWpmArray.push(newWpm);
        setWpmArray(newWpmArray);
      }, 1000);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [seconds, startTime]);

  useKeyPress((key) => {
    // Start the timer
    if (!startTime) {
      setStartTime(currentTime);
    }

    // Don't register any keypresses after time is up
    if (seconds === 0) {
      return;
    }

    let updatedOutgoingChars = outgoingChars;
    let updatedIncomingChars = incomingChars;

    if (key === currentChar) {
      setIncorrectChar(false);
      // For the first 20 characters, move leftPadding forward
      if (leftPadding.length > 0) {
        setLeftPadding(leftPadding.substring(1));
      }

      // Current char is now in outgoing chars
      updatedOutgoingChars += currentChar;
      setOutgoingChars(updatedOutgoingChars);

      // Current char is now the next letter
      setCurrentChar(incomingChars.charAt(0));

      updatedIncomingChars = incomingChars.substring(1);
      if (updatedIncomingChars.split(" ").length < 10) {
        updatedIncomingChars += " " + generate();
      }
      setIncomingChars(updatedIncomingChars);

      setCharCount(charCount + 1);

      if (incomingChars.charAt(0) === " ") {
        setWordCount(wordCount + 1);
      }
    } else {
      setIncorrectChar(true);
      setErrorCount(errorCount + 1);
    }
  });

  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  const alix = [
    "0.00",
    "77.65",
    "103.41",
    "104.50",
    "114.74",
    "121.45",
    "121.18",
    "118.01",
    "116.88",
    "113.58",
    "106.52",
    "108.62",
    "110.37",
    "111.89",
    "115.60",
    "114.36",
    "116.08",
    "116.95",
    "117.70",
    "117.81",
    "117.88",
    "117.96",
    "120.10",
    "118.10",
    "119.12",
    "119.58",
    "119.58",
    "119.57",
    "119.57",
    "118.37"
  ];

  return (
    <>
      <ToggleButton />
      <div className="flex-col relative h-screen">
        {/* <div className="flex items-center justify-center relative h-screen"> */}
        <div className={"absolute top-1/2 left-1/2 transform-center "}>
          <div className="font-mono text-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 mb-2 cursor-pointer hover:bg-[#FF990080] sm:mr-auto sm:relative absolute top-4 left-4 sm:top-0 sm:left-0"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              onClick={() => router.push("/")}
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
            <h3 className="hover:bg-[#FF990080] text-center sm:text-left sm:w-max cursor-default">
              Race me
            </h3>
            <h3 className="text-center sm:text-left">WPM: {wpm}</h3>
            <h3 className="text-center sm:text-left">Time: {seconds}</h3>
            <p className="whitespace-pre">
              <span className="text-gray-400">
                {(leftPadding + outgoingChars).slice(-30)}
              </span>
              <span className={incorrectChar ? "bg-red-400" : "bg-[#FF990080]"}>
                {currentChar}
              </span>
              <span>{incomingChars.substr(0, 30)}</span>
            </p>
            <Start startTime={startTime} />
            <span
              className={"" + (startTime && "cursor-pointer")}
              onClick={() => resetState()}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class={
                  "h-5 w-5 ml-auto mr-auto mb-4 " +
                  (!startTime && "text-gray-400")
                }
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                />
              </svg>
            </span>
            {seconds === 0 && (
              <div className="font-mono">
                <div className="h-64">
                  <MyResponsiveLine
                    data={[
                      {
                        id: "Alix",
                        color: "hsl(359, 70%, 50%)",
                        data: alix.map((e, i) => ({ x: i + 1, y: e }))
                      },
                      {
                        id: "You",
                        data: wpmArray.map((e, i) => ({ x: i + 1, y: e }))
                      }
                    ]}
                    axisLeftName="WPM"
                    axisBottomName="time"
                    theme={theme}
                  />
                </div>
                <h3 className="text-left">Your WPM: {wpm}</h3>
                <h3 className="text-left">
                  Your accuracy:{" "}
                  {(
                    (INITIAL_WORDS.length - errorCount) /
                    INITIAL_WORDS.length
                  ).toFixed(2)}
                </h3>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default RaceMe;
