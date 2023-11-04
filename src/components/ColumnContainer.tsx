import { Column } from "../types/Column";

interface Props {
	column: Column;
}

const ColumnContainer = ({ column }: Props) => {
	return (
		<div className="bg-colBg w-[350px] h-[500px] max-h-[500px] rounded-md flex flex-col">
			{/* Title */}
			<div className="bg-mainBg text-md h-[60px] cursor-grab rounded-md rounded-b-none p-3 font-bold border-colBg border-4">
				<div className="flex gap-4">
					<div className="flex justify-center items-center bg-colBg px-2 py-1 text-sm rounded-full">
						0
					</div>
					{column.title}
				</div>
			</div>

			{/* Bookmarks */}
			<div className=""></div>

			{/* Footer */}
		</div>
	);
};

export default ColumnContainer;
