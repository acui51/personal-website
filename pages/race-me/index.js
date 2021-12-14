import React, { useState, useEffect } from "react";
import useKeyPress from "../../hooks/useKeyPress";
import ToggleButton from "components/ToggleButton";
import { useRouter } from "next/router";

const INITIAL_WORDS =
  "Serious inside else memory if six. Whose group through despite cause. Sense peace economy travel. Total financial role together range line beyond its. Policy daughter need kind miss artist truth trouble. Rest human station property. Partner stock four. Region as true develop sound central. Language ball floor meet usually board necessary. Natural sport music white."; // get from BE later

const generate = () => {
  return "I like ";
};

const currentTime = () => new Date().getTime();

const Start = ({ startTime }) => {
  return (
    <div
      className={"flex-col justify-center " + (startTime && "hidden-animate")}
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

  const router = useRouter();

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
        console.log(newWpmArray);
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
    }
  });

  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  return (
    <div className="flex items-center justify-center h-screen">
      <ToggleButton />
      <div className="font-mono text-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-6 w-6 mb-2 cursor-pointer hover:bg-[#FF990080] rounded-md"
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
        <h3 className="hover:bg-[#FF990080] text-left w-max cursor-default">
          Race me
        </h3>
        <h3 className="text-left">WPM: {wpm}</h3>
        <h3 className="text-left">Time: {seconds}</h3>
        <p className="whitespace-pre">
          <span className="text-zinc-500">
            {(leftPadding + outgoingChars).slice(-30)}
          </span>
          <span className={incorrectChar ? "bg-red-400" : "bg-[#FF990080]"}>
            {currentChar}
          </span>
          <span>{incomingChars.substr(0, 30)}</span>
        </p>
        <Start startTime={startTime} />
      </div>
    </div>
  );
};

export default RaceMe;
