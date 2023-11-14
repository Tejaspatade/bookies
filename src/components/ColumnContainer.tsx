import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

import DeleteIcon from "../icons/DeleteIcon";
import { Column, Id } from "../types/Column";
import { useState } from "react";

interface Props {
	column: Column;
	deleteColumn: (id: Id) => void;
	updateColumn: (id: Id, title: string) => void;
}

const ColumnContainer = ({ column, deleteColumn, updateColumn }: Props) => {
	// Component State
	const [editMode, setEditMode] = useState(false);

	// DnD Custom Hook
	const {
		setNodeRef,
		transform,
		transition,
		attributes,
		listeners,
		isDragging,
	} = useSortable({
		id: column.id,
		data: {
			type: "Column",
			column,
		},
		disabled: editMode
	});

	// Local State
	const style = {
		transition,
		transform: CSS.Transform.toString(transform),
	};

	// Conditional Render
	if (isDragging) {
		return (
			<div
				ref={setNodeRef}
				style={style}
				className="bg-colBg w-[350px] h-[500px] max-h-[500px] rounded-md flex flex-co opacity-40 border-2 border-rose-500"
			></div>
		);
	}

	return (
		<div
			ref={setNodeRef}
			style={style}
			className="bg-colBg w-[350px] h-[500px] max-h-[500px] rounded-md flex flex-col"
		>
			{/* Title */}
			<div
				className="bg-mainBg text-md h-[60px] cursor-grab rounded-md rounded-b-none p-3 font-bold border-colBg border-4 flex items-center justify-between"
				{...attributes}
				{...listeners}
				onClick={() => setEditMode(true)}
			>
				<div className="flex gap-4">
					<div className="flex justify-center items-center bg-colBg px-2 py-1 text-sm rounded-full">
						0
					</div>
					{!editMode && column.title}
					{editMode && (
						<input
						className="bg-black focus:border-rose-500 border rounded outline-none px-2 py-2"
							value={column.title}
							onChange={(e) =>
								updateColumn(column.id, e.target.value)
							}
							autoFocus
							onBlur={() => setEditMode(false)}
							onKeyDown={(e) => {
								if (e.key === "Enter") setEditMode(false);
							}}
						></input>
					)}
				</div>
				<button
					className="stroke-gray-500 hover:stroke-white hover:bg-colBg rounded px-2 py-2"
					onClick={() => {
						deleteColumn(column.id);
					}}
				>
					<DeleteIcon />
				</button>
			</div>

			{/* Bookmarks */}
			<div className=""></div>

			{/* Footer */}
		</div>
	);
};

export default ColumnContainer;
