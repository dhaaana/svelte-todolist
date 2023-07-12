<script lang="ts">
	import { enhance } from '$app/forms';
	import { onMount } from 'svelte';
	import { fly, scale, slide } from 'svelte/transition';

	export let data;
	let element: HTMLElement;
	let deleting: number[] = [];
	let creating = false;
	let isDropdownOpen = false;

	const handleDropdownFocusLoss = ({ relatedTarget, currentTarget }: FocusEvent) => {
		// use "focusout" event to ensure that we can close the dropdown when clicking outside or when we leave the dropdown with the "Tab" button
		if (
			relatedTarget instanceof HTMLElement &&
			(currentTarget as HTMLElement).contains(relatedTarget)
		)
			return;
		// check if the new focus target doesn't present in the dropdown tree (exclude ul\li padding area because relatedTarget, in this case, will be null)
		isDropdownOpen = false;
	};

	const scrollToBottom = async (node: HTMLElement) => {
		node.scroll({ top: node.scrollHeight, behavior: 'smooth' });
	};
</script>

<svelte:head>
	<title>{data.user.firstName}'s Todolist</title>
	<meta name="description" content="a todolist app" />
</svelte:head>

<main class="w-full h-screen overflow-y-auto bg-gray-100 p-5 sm:p-10" bind:this={element}>
	<div class="fixed z-50 bottom-0 w-full grid grid-cols-12 inset-x-0">
		<form
			method="POST"
			action="?/create"
			class="col-start-1 col-end-13 sm:col-start-5 sm:col-end-9 bg-white p-3 rounded-lg shadow-md border flex xl:flex-row flex-col gap-2"
			use:enhance={() => {
				creating = true;

				return async ({ update }) => {
					await update();
					creating = false;
					scrollToBottom(element);
				};
			}}
		>
			<div class="w-full flex flex-col gap-y-2">
				<input
					type="text"
					class="bg-gray-50 border-gray-300 border-2 text-gray-700 rounded-lg p-2 focus:border-orange-500 focus:outline-none"
					placeholder="Title"
					name="title"
				/>
				<input
					type="text"
					class="bg-gray-50 border-gray-300 border-2 text-gray-700 rounded-lg p-2 focus:border-orange-500 focus:outline-none"
					placeholder="Description"
					name="description"
				/>
			</div>
			<button
				class="bg-orange-500 min-w-[100px] flex justify-center items-center hover:bg-orange-600 disabled:bg-orange-600 disabled:cursor-not-allowed text-lg font-medium text-white rounded-lg py-2 px-4"
				type="submit"
				disabled={creating}
			>
				{#if creating}
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="30"
						height="30"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						stroke-width="2"
						stroke-linecap="round"
						stroke-linejoin="round"
						class="lucide lucide-loader-2 animate-spin"
						><path d="M21 12a9 9 0 1 1-6.219-8.56" /></svg
					>
				{:else}
					Add Todo
				{/if}
			</button>
		</form>
	</div>
	<div class="grid grid-cols-12">
		<div
			class="col-span-12 mb-5 flex justify-end gap-x-2 sm:px-6"
			on:focusout={handleDropdownFocusLoss}
		>
			{#if data.user}
				<p class="text-sm sm:text-lg">{data.user.email}</p>
				<button class="" on:click={() => (isDropdownOpen = !isDropdownOpen)}>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						stroke-width="2"
						stroke-linecap="round"
						stroke-linejoin="round"
						class="lucide lucide-chevron-down h-5 w-5"><path d="m6 9 6 6 6-6" /></svg
					>
				</button>
				{#if isDropdownOpen}
					<div
						class="absolute dropdown top-0 mt-10 sm:mt-20 bg-white rounded-lg shadow-md flex flex-col py-1"
					>
						<a href="/me" class="px-6 py-1.5 hover:bg-orange-100">Profile</a>
						<a href="/sign-out" class="px-6 py-1.5 hover:bg-orange-100">Sign Out</a>
					</div>
				{/if}
			{/if}
		</div>
		<h1 class="text-3xl font-bold text-center col-span-12 mb-8">
			{data.user.firstName}'s To-Do List
		</h1>

		<div class="col-start-1 col-end-13 sm:col-start-5 sm:col-end-9 grid grid-cols-1 gap-2 pb-24">
			{#each data.todos.filter((todo) => !deleting.includes(todo.id)) as todo (todo.id)}
				<div
					class="flex bg-white rounded-lg flex items-center justify-between p-4 shadow-md"
					in:fly={{ y: -20 }}
					out:slide
				>
					<div class="flex items-center">
						<form
							method="POST"
							action="?/complete"
							use:enhance={() => {
								data.todos = data.todos.map((t) => {
									if (t.id === todo.id) {
										t.completed = !t.completed;
									}
									return t;
								});
								return async ({ update }) => {
									await update({ reset: false });
								};
							}}
						>
							<input class="hidden" name="id" value={todo.id} />
							<input class="hidden" name="completed" value={todo.completed} />
							<button
								class="w-10 h-10 rounded-full bg-gray-300 flex justify-center items-center mr-4"
							>
								{#if todo.completed}
									<div
										class="bg-green-500 h-8 w-8 flex justify-center items-center rounded-full text-white"
										in:scale
										out:scale
									>
										<svg
											xmlns="http://www.w3.org/2000/svg"
											width="18"
											height="18"
											viewBox="0 0 24 24"
											fill="none"
											stroke="currentColor"
											stroke-width="4	"
											stroke-linecap="round"
											stroke-linejoin="round"
											class="lucide lucide-check"><polyline points="20 6 9 17 4 12" /></svg
										>
									</div>
								{/if}
							</button>
						</form>
						<div>
							<h3 class="font-bold text-xl {todo.completed && 'line-through'}">
								{todo.title}
							</h3>
							<p class="text-gray-600 {todo.completed && 'line-through'}">
								{todo.description}
							</p>
						</div>
					</div>
					<div class="flex flex-row justify-end gap-x-4">
						<form
							method="POST"
							action="?/delete"
							use:enhance={() => {
								deleting = [...deleting, todo.id];
								return async ({ update }) => {
									await update();
									deleting = deleting.filter((id) => id !== todo.id);
								};
							}}
						>
							<input class="hidden" name="id" value={todo.id} />
							<button class="p-2 bg-red-500 hover:bg-red-600 rounded-lg text-white" type="submit">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									width="20"
									height="20"
									viewBox="0 0 24 24"
									fill="none"
									stroke="currentColor"
									stroke-width="2"
									stroke-linecap="round"
									stroke-linejoin="round"
									class="lucide lucide-trash-2"
									><path d="M3 6h18" /><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" /><path
										d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"
									/><line x1="10" x2="10" y1="11" y2="17" /><line
										x1="14"
										x2="14"
										y1="11"
										y2="17"
									/></svg
								></button
							>
						</form>
					</div>
				</div>
			{/each}
		</div>
	</div>
</main>
