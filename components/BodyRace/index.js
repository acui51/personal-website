import React, { useEffect, useRef, useState } from "react";

const VISIBILITY_THRESHOLD = 0.8;
const STRAIGHT_LIMB_MARGIN = 20;
const EXTENDED_LIMB_MARGIN = 0.8;

function dist(x1, y1, x2, y2) {
  const dx = x2 - x1;
  const dy = y2 - y1;
  return Math.sqrt(dx * dx + dy * dy);
}

function get_angle(a, b, c) {
  const ang =
    (Math.atan2(c.y - b.y, c.x - b.x) - Math.atan2(a.y - b.y, a.x - b.x)) *
    (180 / Math.PI);
  return ang < 0 ? ang + 360 : ang;
}

function is_missing(part) {
  return part.some((joint) => joint.visibility < VISIBILITY_THRESHOLD);
}

function is_limb_pointing(upper, mid, lower) {
  if (is_missing([upper, mid, lower])) {
    return false;
  }
  const limb_angle = get_angle(upper, mid, lower);
  const is_in_line = Math.abs(180 - limb_angle) < STRAIGHT_LIMB_MARGIN;
  if (is_in_line) {
    const upper_length = dist(upper.x, upper.y, mid.x, mid.y);
    const lower_length = dist(lower.x, lower.y, mid.x, mid.y);
    const is_extended = lower_length > EXTENDED_LIMB_MARGIN * upper_length;
    return is_extended;
  }
  return false;
}

// Define SemaphoreGestures Class here
class SemaphoreGestures {
  constructor(callback) {
    this.currentSemaphore = "";
    this.lastSemaphore = "";
    this.callback = callback;
  }

  output(semaphore) {
    this.callback(semaphore);
    this.lastSemaphore = semaphore;
  }

  get_angle(a, b, c) {
    const ang =
      (Math.atan2(c.y - b.y, c.x - b.x) - Math.atan2(a.y - b.y, a.x - b.x)) *
      (180 / Math.PI);
    return ang < 0 ? ang + 360 : ang;
  }

  getLimbDirection(arm, closestDegrees = 45) {
    // Should also use Math.atan2 but I don't want to do more math
    const dy = arm[2]["y"] - arm[0]["y"]; // wrist -> shoulder
    const dx = arm[2]["x"] - arm[0]["x"];
    let angle = (Math.atan(dy / dx) * 180) / Math.PI;

    if (dx < 0) {
      angle += 180;
    } // Collapse to nearest closestDegrees; 45 for semaphore

    const modClose = angle % closestDegrees;
    angle -= modClose;

    if (modClose > closestDegrees / 2) {
      angle += closestDegrees;
    }

    angle = parseInt(angle, 10);

    if (angle === 270) {
      angle = -90;
    }

    return angle;
  }

  typeSemaphore(armL_angle, armR_angle) {
    // You can define your semaphore dictionary here (based on Python code)
    const SEMAPHORES = {
      "45,90": { a: "a", n: "1" },
      "0,90": { a: "b", n: "2" },
      "-45,90": { a: "c", n: "3" },
      "-90,90": { a: "d", n: "4" },
      "90,225": { a: "e", n: "5" },
      "90,180": { a: "f", n: "6" },
      "90,135": { a: "g", n: "7" },
      "0,45": { a: "h", n: "8" },
      "-45,45": { a: "i", n: "9" },
      "-90,180": { a: "j", n: "capslock" },
      "45,-90": { a: "k", n: "0" },
      "45,225": { a: "l", n: "\\" },
      "45,180": { a: "m", n: "[" },
      "45,135": { a: "n", n: "]" },
      "0,-45": { a: "o", n: "," },
      "0,-90": { a: "p", n: ";" },
      "0,225": { a: "q", n: "=" },
      "0,180": { a: "r", n: "-" },
      "0,135": { a: "s", n: "." },
      "-45,-90": { a: "t", n: "`" },
      "-45,225": { a: "u", n: "/" },
      "-90,135": { a: "v", n: '"' },
      "225,180": { a: "w" },
      "225,135": { a: "x" }, // Clear last signal - Set a custom value or keep it empty in JavaScript
      "-45,180": { a: "y" },
      "135,180": { a: "z" },
      "90,90": { a: "space", n: "enter" },
      "135,90": { a: "tab" }, // Custom "numerals" replacement
      "225,45": { a: "escape" }, // Custom "cancel" replacement
    };
    const key = `${armL_angle},${armR_angle}`;

    const arm_match = SEMAPHORES[key];

    if (arm_match) {
      const current_semaphore = arm_match; // modify this assignment if necessary depending on your semaphore dictionary structure
      return current_semaphore;
    }
  }
}

const BodyRace = ({ setCurrBodyRaceChar }) => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const landmarkContainerRef = useRef(null);

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const videoElement = videoRef.current;
    const canvasElement = canvasRef.current;
    const canvasCtx = canvasElement.getContext("2d");
    const landmarkContainer = landmarkContainerRef.current;

    const grid = new LandmarkGrid(landmarkContainer);

    const semaphoreGestures = new SemaphoreGestures(setCurrBodyRaceChar);
    function onResults(results) {
      if (!results.poseLandmarks) {
        grid.updateLandmarks([]);
        return;
      }

      canvasCtx.save();
      canvasCtx.clearRect(0, 0, canvasElement.width, canvasElement.height);
      canvasCtx.drawImage(
        results.segmentationMask,
        0,
        0,
        canvasElement.width,
        canvasElement.height
      );

      canvasCtx.globalCompositeOperation = "source-in";
      canvasCtx.fillStyle = "#00FF00";
      canvasCtx.fillRect(0, 0, canvasElement.width, canvasElement.height);

      canvasCtx.globalCompositeOperation = "destination-atop";
      canvasCtx.drawImage(
        results.image,
        0,
        0,
        canvasElement.width,
        canvasElement.height
      );

      canvasCtx.globalCompositeOperation = "source-over";
      drawConnectors(canvasCtx, results.poseLandmarks, POSE_CONNECTIONS, {
        color: "#00FF00",
        lineWidth: 4,
      });
      drawLandmarks(canvasCtx, results.poseLandmarks, {
        color: "#FF0000",
        lineWidth: 2,
      });
      canvasCtx.restore();

      grid.updateLandmarks(results.poseWorldLandmarks); // Include the pose check from Python code

      const [upperPointL, midPointL, lowerPointL] = [
        results.poseLandmarks[11],
        results.poseLandmarks[13],
        results.poseLandmarks[15],
      ];
      const [upperPointR, midPointR, lowerPointR] = [
        results.poseLandmarks[12],
        results.poseLandmarks[14],
        results.poseLandmarks[16],
      ];

      if (
        is_limb_pointing(upperPointL, midPointL, lowerPointL) ||
        is_limb_pointing(upperPointR, midPointR, lowerPointR)
      ) {
        const shoulderL = results.poseLandmarks[11];
        const elbowL = results.poseLandmarks[13];
        const wristL = results.poseLandmarks[15];
        const armL = [shoulderL, elbowL, wristL];

        const shoulderR = results.poseLandmarks[12];
        const elbowR = results.poseLandmarks[14];
        const wristR = results.poseLandmarks[16];
        const armR = [shoulderR, elbowR, wristR]; // const armL_angle = semaphoreGestures.calculateAngles(armL); // const armR_angle = semaphoreGestures.calculateAngles(armR);

        const armLAngle = semaphoreGestures.getLimbDirection(armL);
        const armRAngle = semaphoreGestures.getLimbDirection(armR);

        const currentSemaphore = semaphoreGestures.typeSemaphore(
          armLAngle,
          armRAngle
        );
        if (currentSemaphore) {
          const currentKey = currentSemaphore["a"];
          if (currentKey !== semaphoreGestures.lastSemaphore) {
            semaphoreGestures.output(currentKey === "space" ? " " : currentKey);
          }
        }
      } else {
        if (semaphoreGestures.lastSemaphore !== "") {
          semaphoreGestures.output("");
        }
      }
    }

    const pose = new Pose({
      locateFile: (file) => {
        return `https://cdn.jsdelivr.net/npm/@mediapipe/pose/${file}`;
      },
    });
    pose.setOptions({
      modelComplexity: 1,
      smoothLandmarks: true,
      enableSegmentation: true,
      smoothSegmentation: true,
      minDetectionConfidence: 0.5,
      minTrackingConfidence: 0.5,
    });
    pose.onResults(onResults);

    const camera = new Camera(videoElement, {
      onFrame: async () => {
        await pose.send({ image: videoElement });
      },
      width: 640,
      height: 480,
    });
    camera.start();
    const resizeCanvas = () => {
      canvasElement.width = videoElement.videoWidth;
      canvasElement.height = videoElement.videoHeight;
    };
    window.addEventListener("resize", resizeCanvas);
    resizeCanvas();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      camera.stop();
    };
  }, []);

  return (
    <div className="container">
      {isLoading && <div>Loading camera...</div>}
      <video
        className="input_video"
        playsInline
        ref={videoRef}
        onLoadStart={() => setIsLoading(true)}
        onLoadedData={() => setIsLoading(false)}
        style={{ transform: `rotateY(180deg)` }}
      ></video>
      <canvas
        className="output_canvas"
        width="1280px"
        height="720px"
        style={{ display: "none" }}
        ref={canvasRef}
      ></canvas>
      <div
        className="landmark-grid-container"
        ref={landmarkContainerRef}
        style={{ display: "none" }}
      ></div>
    </div>
  );
};

export default BodyRace;
