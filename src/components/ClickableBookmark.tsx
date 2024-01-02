import { useState } from "react"

import DeleteIcon from "../icons/DeleteIcon"
import { Bookmark } from "../types/Bookmark"

type Props = {
  bmark: Bookmark
}

const ClickableBookmark = ({ bmark }: Props) => {
  const [mouseIsOver, setMouseIsOver] = useState<boolean>(false)

  return (
    <div className="bg-mainBg relative p-3 rounded-xl hover:ring-1 hover:ring-inset hover:ring-rose-500 cursor-grab" onMouseEnter={() => {setMouseIsOver(true)}} onMouseLeave={() => {setMouseIsOver(false)}}>
      {bmark.content}
      {
        mouseIsOver && (
          <button className="stroke-white text-xs bg-colBg absolute top-1/2 right-4 -translate-y-1/2">
            <DeleteIcon />
          </button>
        )
      }
    </div>
  )
}

export default ClickableBookmark
