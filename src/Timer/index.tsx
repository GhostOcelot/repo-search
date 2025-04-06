import { formatTime } from "./helpers"
import { mergeClasses } from "../helpers"
import { useOutletContext } from "react-router-dom"
import { TimerContext } from "./types"

const Timer = () => {
  const { time, isInitialized, isRunning, start, resume, pause, reset } =
    useOutletContext<TimerContext>()

  const buttonBaseStyle = "w-[80px] px-3 py-2 rounded-full bg-amber-200 cursor-pointer"

  return (
    <div className="flex-grow flex flex-col justify-center items-center gap-4 mt-8">
      <div className="flex items-center gap-4">
        <button
          className={buttonBaseStyle}
          onClick={!isInitialized ? start : isRunning ? pause : resume}
        >
          {!isInitialized ? "start" : isRunning ? "pause" : "resume"}
        </button>
        <button
          className={mergeClasses(
            buttonBaseStyle,
            isInitialized ? "cursor-pointer" : "text-gray-300 bg-amber-100 cursor-default",
          )}
          onClick={reset}
        >
          reset
        </button>
      </div>
      <div className="flex-grow flex justify-center items-center mb-8">
        <p className="text-5xl font-semibold">{formatTime(time)}</p>
      </div>
    </div>
  )
}

export default Timer
