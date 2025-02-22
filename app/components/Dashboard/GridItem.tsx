"use client";
import Link from "next/link";
import React from "react";
import { motion } from "framer-motion";

const GridItem = ({ task, isLast }: any) => {
	return (
		<motion.div
			initial={{ opacity: 0, y: 100 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.4 }}
			className="opacity-0"
		>
			<Link
				href={`/dashboard/${task.id}`}
				className={`border rounded-lg overflow-hidden shadow-lg px-4 xl:px-4 py-4 flex flex-col gap-2 items-start border-neutral-700 ${
					task.status.toLowerCase() === "done" ? "opacity-50" : "opacity-100"
				} `}
			>
				<h2 className="text-lg xl:text-xl font-bold text-white jura">
					{task.title}
				</h2>
				<p className="text-neutral-400 text-sm xl:text-base">
					{task.description.length > 40
						? task.description.slice(0, 40) + "..."
						: task.description}
				</p>
				<div className="flex gap-2 flex-wrap mt-auto">
					<span className="text-sm bg-neutral-800 text-white px-2 xl:px-4 py-1 xl:py-2 rounded-full">
						{task.tag}
					</span>
					<span className="text-sm bg-purple-300 text-neutral-900 px-2 xl:px-4 py-1 xl:py-2 rounded-full">
						{task.priority}
					</span>
					<span className="text-sm bg-red-400 text-neutral-900 px-2 xl:px-4 py-1 xl:py-2 rounded-full">
						{task.deadline}
					</span>
					<span className="text-sm bg-blue-300 text-neutral-900 px-2 xl:px-4 py-1 xl:py-2 rounded-full">
						{task.status}
					</span>
				</div>
			</Link>
		</motion.div>
	);
};

export default GridItem;
