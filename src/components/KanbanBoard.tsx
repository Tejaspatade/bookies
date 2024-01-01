import { useState, useMemo } from "react";
import { createPortal } from "react-dom";
import {
	DndContext,
	DragOverlay,
	DragStartEvent,
	DragEndEvent,
	useSensor,
	useSensors,
	PointerSensor,
} from "@dnd-kit/core";
import { SortableContext, arrayMove } from "@dnd-kit/sortable";

import ColumnContainer from "./ColumnContainer";
import AddIcon from "../icons/AddIcon";
import { Column, Id } from "../types/Column";
import { generateId } from "../utils/utils";
import { Bookmark } from "../types/Bookmark";

const KanbanBoard = () => {
	// Component State
	const [cols, setCols] = useState<Column[]>([]);
	const [currentCol, setCurrCol] = useState<Column | null>(null);
	const [bookmarks, setBookmarks] = useState<Bookmark[]>([]);
	const colIds = useMemo(() => cols.map((col) => col.id), [cols]);

	// Component Handler Functions
	function createNewCol() {
		const newCol: Column = {
			id: generateId(),
			title: `Column ${cols.length + 1}`,
		};

		setCols([...cols, newCol]);
	}

	function deleteColumn(id: Id) {
		const filteredColumns = cols.filter((col) => col.id !== id);
		setCols(filteredColumns);
	}

	function updateColumn(id: Id, title: string) {
		const updateCols = cols.map((col) => {
			if (col.id !== id) return col;
			return { ...col, title };
		})

		setCols(updateCols);
	}

	function createBookmark(columnId: Id) {
		const newBookmark: Bookmark = {
			id: generateId(),
			columnId,
			content: `Bookmark ${bookmarks.length + 1}`,
			url: "https://www.google.com", // TODO: Change this to a user input
		}

		setBookmarks([...bookmarks, newBookmark])
	}

	function onDragStart(event: DragStartEvent) {
		if (event.active.data.current?.type === "Column") {
			setCurrCol(event.active.data.current.column);
			return;
		}
	}

	function onDragEnd(event: DragEndEvent) {
		const { active, over } = event;

		if (!over) return;

		const activeId = active.id;
		const overId = over.id;

		if (activeId === overId) return;

		setCols((prev) => {
			const activeIndex = prev.findIndex((col) => col.id === activeId);
			const overIndex = prev.findIndex((col) => col.id === overId);

			return arrayMove(prev, activeIndex, overIndex);
		});
	}

	const sensors = useSensors(
		useSensor(PointerSensor, {
			activationConstraint: {
				distance: 10,
			},
		})
	);

	return (
		<div className="m-auto flex min-h-screen w-full items-center justify-center overflow-x-auto overflow-y-hidden px-[40px]">
			<DndContext
				onDragStart={onDragStart}
				onDragEnd={onDragEnd}
				sensors={sensors}
				
			>
				<div className="m-auto flex gap-4">
					<div className="flex gap-4">
						<SortableContext items={colIds}>
							{cols.map((column) => (
								<ColumnContainer
									key={column.id}
									column={column}
									bookmarks={bookmarks.filter((book) => book.columnId === column.id)}
									deleteColumn={deleteColumn}
									updateColumn={updateColumn}
									createBookmark={createBookmark}
								/>
							))}
						</SortableContext>
					</div>
					<button
						className="h-[60px] w-[350px] min-w-[350px] cursor-pointer rounded-lg bg-mainBg border-2 border-colBg p-4 ring-rose-500 hover:ring-2 flex gap-3"
						onClick={createNewCol}
					>
						<AddIcon />
						<span>Add Category</span>
					</button>
				</div>
				{createPortal(
					<DragOverlay>
						{currentCol && (
							<ColumnContainer
								column={currentCol}
								bookmarks={bookmarks.filter((book) => book.columnId === currentCol.id)}
								updateColumn={updateColumn}
								deleteColumn={deleteColumn}
								createBookmark={createBookmark}
							/>
						)}
					</DragOverlay>,
					document.body
				)}
			</DndContext>
		</div>
	);
};

export default KanbanBoard;
