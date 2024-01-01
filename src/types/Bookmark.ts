import { Id } from "./Column"

export type Bookmark = {
  id: Id,
  columnId: Id,
  content: string,
}