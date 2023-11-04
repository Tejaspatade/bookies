import { useState } from "react";

import ColumnContainer from "./ColumnContainer";
import PlusIcon from "../icons/PlusIcon";
import { Column } from "../types/Column";
import { generateId } from "../utils/utils";

const KanbanBoard = () => {
	// Component State
	const [cols, setCols] = useState<Column[]>([]);

	// Component Handler Functions
	function createNewCol() {
		const newCol: Column = {
			id: generateId(),
			title: `Column ${cols.length + 1}`,
		};

		setCols([...cols, newCol]);
	}

	return (
		<div className="m-auto flex min-h-screen w-full items-center justify-center overflow-x-auto overflow-y-hidden px-[40px]">
			<div className="m-auto flex gap-4">
				<div className="flex gap-4">
					{cols.map((column) => (
						<ColumnContainer column={column} key={column.id} />
					))}
				</div>
				<button
					className="h-[60px] w-[350px] min-w-[350px] cursor-pointer rounded-lg bg-mainBg border-2 border-colBg p-4 ring-rose-500 hover:ring-2 flex gap-3"
					onClick={createNewCol}
				>
					<PlusIcon />
					<span>Add Column</span>
				</button>
			</div>
		</div>
	);
};

export default KanbanBoard;