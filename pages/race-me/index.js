import React, { useState, useEffect, useRef } from "react";
import useKeyPress from "../../hooks/useKeyPress";
import ToggleButton from "components/ToggleButton";
import { useRouter } from "next/router";
import MyResponsiveLine from "components/LineGraph";
import { useTheme } from "next-themes";
import { db } from "../../firebase";
import { doc, getDoc, updateDoc, onSnapshot } from "firebase/firestore";
import { useIsSm } from "../../hooks/useMediaQuery";
import Filter from "bad-words";
import Loader from "react-loader-spinner";

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
  const isSm = useIsSm();
  const inputEl = useRef(null);
  const [corpus, setCorpus] = useState("");
  const [leftPadding, setLeftPadding] = useState(
    new Array(isSm ? 25 : 30).fill(" ").join("")
  ); // initial 50 spaces to keep current char at center
  const [outgoingChars, setOutgoingChars] = useState(""); // characters just typed
  const [currentChar, setCurrentChar] = useState(corpus.charAt(0));
  const [incomingChars, setIncomingChars] = useState(corpus.substr(1)); // next chars to type
  const [startTime, setStartTime] = useState(null);
  const [wordCount, setWordCount] = useState(0);
  const [charCount, setCharCount] = useState(0);
  const [wpm, setWpm] = useState(0);
  const [seconds, setTime] = useState(30);
  const [wpmArray, setWpmArray] = useState([]);
  const [incorrectChar, setIncorrectChar] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [errorCount, setErrorCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [alixWpm, setAlixWpm] = useState([]);
  const [leaderboard, setLeaderboard] = useState([]);
  const [profanityDetected, setProfanityDetected] = useState(false);
  const [showLeaderboardSubmission, setShowLeaderboardSubmission] =
    useState(true);
  const [submitLeaderboardLoading, setSubmitLeaderboardLoading] =
    useState(false);
  const [corpusId, _setCorpusId] = useState(Math.floor(Math.random() * 3) + 1);

  const router = useRouter();
  const { theme } = useTheme();

  const resetState = () => {
    setLeftPadding(new Array(isSm ? 25 : 30).fill(" ").join(""));
    setOutgoingChars("");
    setCurrentChar(corpus.charAt(0));
    setIncomingChars(corpus.substr(1));
    setStartTime(null);
    setWordCount(0);
    setCharCount(0);
    setWpm(0);
    setTime(30);
    setWpmArray([]);
    setIncorrectChar(false);
    setShowLeaderboardSubmission(true);
    setSubmitLeaderboardLoading(false);
    setProfanityDetected(false);
  };

  const postLeaderboard = async () => {
    let filter = new Filter();
    filter.addWords("gay");
    if (filter.isProfane(inputEl.current.value)) {
      setProfanityDetected(true);
      return;
    }

    setSubmitLeaderboardLoading(true);
    const newLeaderboard = leaderboard;
    newLeaderboard.push({
      adjusted_wpm: parseFloat(wpm),
      user: inputEl.current.value
    });
    newLeaderboard.sort((a, b) => {
      if (a.adjusted_wpm > b.adjusted_wpm) {
        return -1;
      } else {
        return 1;
      }
    });
    await updateDoc(doc(db, "corpus", `corpus-${corpusId}`), {
      leaderboard: newLeaderboard.slice(0, 5)
    });
    setSubmitLeaderboardLoading(true);
    setShowLeaderboardSubmission(false);
  };

  // Fetch corpus
  useEffect(() => {
    const fetchCorpus = async () => {
      const docRef = doc(db, "corpus", `corpus-${corpusId}`);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const words = docSnap.data().words;
        setCorpus(words);
        setCurrentChar(words.charAt(0));
        setIncomingChars(words.substr(1));
        setAlixWpm(docSnap.data().alix_wpm);
      } else {
        console.error("Error");
      }
    };

    fetchCorpus();
  }, []);

  // Snapshot the leaderboard
  useEffect(() => {
    const docRef = doc(db, "corpus", `corpus-${corpusId}`);
    return onSnapshot(docRef, (doc) => {
      setLeaderboard(doc.data().leaderboard);
      setLoading(false);
    });
  }, [db]);

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
    if (seconds === 0 || loading) {
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

  return (
    <>
      <ToggleButton />
      <div className="flex items-center justify-center relative h-screen">
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
          {loading ? (
            <p className="whitespace-pre width-race-me-text">
              {" "}
              <span className="text-gray-400">
                {Array(16).fill(" ").join("").slice(-30)}
              </span>
              Loading corpus...
            </p>
          ) : (
            <>
              <p className="whitespace-pre width-race-me-text">
                <span className="text-gray-400">
                  {(leftPadding + outgoingChars).slice(isSm ? -25 : -30)}
                </span>
                <span
                  className={incorrectChar ? "bg-red-400" : "bg-[#FF990080]"}
                >
                  {currentChar}
                </span>
                <span>{incomingChars.substr(0, isSm ? 25 : 30)}</span>
              </p>
            </>
          )}
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
            <div className="font-mono px-4 sm:px-0">
              <div className="h-64">
                <MyResponsiveLine
                  data={[
                    {
                      id: "Alix",
                      color: "hsl(359, 70%, 50%)",
                      data: alixWpm.map((e, i) => ({ x: i + 1, y: e }))
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
              <div className="flex justify-between">
                <h3 className="you-text-decoration underline decoration-3">
                  Your WPM: {wpm}
                </h3>
                <h3 className="alix-text-decoration underline decoration-3">
                  Alix's WPM: {alixWpm[alixWpm.length - 1]}
                </h3>
              </div>
              <div className="flex justify-between mb-8">
                <h3 className="you-text-decoration underline decoration-3">
                  Your accuracy:{" "}
                  {((corpus.length - errorCount) / corpus.length).toFixed(2)}
                </h3>
                <h3 className="alix-text-decoration underline decoration-3">
                  Alix's accuracy: 1.00
                </h3>
              </div>
              <div>
                <h3>Leaderboard</h3>
                {leaderboard.map((user, i) => {
                  return (
                    <h3 className="text-left" key={i}>
                      {i + 1}. {user.user}: {user.adjusted_wpm} WPM
                    </h3>
                  );
                })}
                {(wpm > leaderboard.at(-1).adjusted_wpm ||
                  leaderboard.length < 5) &&
                showLeaderboardSubmission ? (
                  <div className="flex flex-col items-center">
                    <div className="mt-4 mb-2">
                      Enter your name to be put on the leaderboard
                    </div>
                    <input
                      className="width-5ch border border-black dark:border-white text-center mb-2"
                      ref={inputEl}
                      maxLength="4"
                    ></input>
                    {profanityDetected && (
                      <p className="text-red-500 dark:text-red-300">
                        Profanity detected
                      </p>
                    )}
                    <button className="mb-2" onClick={() => postLeaderboard()}>
                      Submit
                    </button>
                    {submitLeaderboardLoading && (
                      <Loader
                        type="TailSpin"
                        color={theme === "dark" ? "#fff" : "#000"}
                        height={16}
                        width={16}
                      />
                    )}
                  </div>
                ) : null}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default RaceMe;
