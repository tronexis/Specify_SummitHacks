"use client";
import useRegisterModal from "@/app/hooks/useRegisterModal";
import axios from "axios";
import { useState } from "react";
import { FieldValues, useForm, SubmitHandler } from "react-hook-form";
import Modal from "./Modal";
import Heading from "../Heading";
import Input from "../Inputs/Input";
import toast from "react-hot-toast";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import useTaskModal from "@/app/hooks/useTaskModal";

const TaskModal = () => {
	const taskModal = useTaskModal();
	const [isLoading, setIsLoading] = useState(false);
	const router = useRouter();

	const [formData, setFormData] = useState({
		title: "",
		description: "",
		priority: "",
		tag: "",
		deadline: "",
		status: "",
	});

	const handleSubmit = async () => {
		if (
			!formData.title ||
			!formData.priority ||
			!formData.tag ||
			!formData.deadline ||
			!formData.status
		) {
			toast.error("All fields are required");
			return;
		}

		try {
			const response = await axios.post("/api/tasks", formData);
			const data = response.data;

			console.log(data);

			console.log("Task created with ID:", data.id);

			toast.success("Task Created");
			router.push("/dashboard");
			router.refresh();
			taskModal.onClose();
		} catch (error) {
			console.error("Error creating task:", error);
		} finally {
			setFormData({
				title: "",
				description: "",
				priority: "",
				tag: "",
				deadline: "",
				status: "",
			});
		}
	};

	const handleChange = (event: any) => {
		const { name, value } = event.target;
		setFormData((prevData) => ({ ...prevData, [name]: value }));
	};

	const bodyContent = (
		<div className="flex flex-col gap-3 ">
			<Heading title="Task" subtitle="Specify the task data" />
			<div className="flex gap-4">
				<input
					type="text"
					name="title"
					maxLength={30}
					placeholder="Title"
					value={formData.title}
					onChange={handleChange}
					className="w-full p-3 pl-4 font-light bg-neutral-800/75 border-2 border-neutral-800/75 rounded-md outline-none transition disabled:opacity-70 disabled:cursor-not-allowed relative"
				/>
				<select
					name="priority"
					id="priority"
					value={formData.priority}
					onChange={handleChange}
					className="text-white w-full p-3 pl-4 font-light bg-neutral-800/75 border-2 border-neutral-800/75 rounded-md outline-none transition disabled:opacity-70 disabled:cursor-not-allowed relative"
				>
					<option value="">Priority</option>
					<option value="extremely high">Extremely High</option>
					<option value="high">High</option>
					<option value="medium">Medium</option>
					<option value="low">Low</option>
				</select>
			</div>
			<input
				type="text"
				maxLength={500}
				name="description"
				placeholder="Description"
				value={formData.description}
				onChange={handleChange}
				className="w-full p-3 pl-4 font-light bg-neutral-800/75 border-2 border-neutral-800/75 rounded-md outline-none transition disabled:opacity-70 disabled:cursor-not-allowed relative"
			/>

			<div className="flex gap-4">
				<select
					name="tag"
					id="tag"
					value={formData.tag}
					onChange={handleChange}
					className="text-white w-full p-3 pl-4 font-light bg-neutral-800/75 border-2 border-neutral-800/75 rounded-md outline-none transition disabled:opacity-70 disabled:cursor-not-allowed relative"
				>
					<option value="">Tag</option>
					<option value="Work">Work</option>
					<option value="School">School</option>
					<option value="Personal">Personal</option>
					<option value="Social">Social</option>
					<option value="Family">Family</option>
					<option value="Health">Health</option>
					<option value="Other">Other</option>
				</select>
				<input
					type="date"
					name="deadline"
					placeholder="Deadline"
					value={formData.deadline}
					onChange={handleChange}
					className="w-full p-3 pl-4 font-light bg-neutral-800/75 border-2 border-neutral-800/75 rounded-md outline-none transition disabled:opacity-70 disabled:cursor-not-allowed relative"
				/>
			</div>
			<select
				name="status"
				id="status"
				value={formData.status}
				onChange={handleChange}
				className="text-white w-full p-3 pl-4 font-light bg-neutral-800/75 border-2 border-neutral-800/75 rounded-md outline-none transition disabled:opacity-70 disabled:cursor-not-allowed relative"
			>
				<option value="">Status</option>
				<option value="Not Done">Not Done</option>
				<option value="In Progress">In Progress</option>
				<option value="Done">Done</option>
				<option value="Abandoned">Abandoned</option>
			</select>
		</div>
	);

	const footerContent = <p></p>;

	return (
		<Modal
			disabled={isLoading}
			isOpen={taskModal.isOpen}
			title="Create Task"
			actionLabel="Create"
			onClose={taskModal.onClose}
			onSubmit={handleSubmit}
			body={bodyContent}
			footer={footerContent}
		/>
	);
};

export default TaskModal;
