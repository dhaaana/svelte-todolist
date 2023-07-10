<script lang="ts">
	import { enhance } from '$app/forms';

	export let form;
</script>

<main class="w-full h-screen flex items-center justify-center bg-gray-100 p-5">
	<form class="shadow-md rounded-lg w-[400px] bg-white p-8" method="POST">
		<h1 class="text-3xl text-neutral-950 font-bold mb-1 text-center">Sign In</h1>
		<p class="text-gray-500 mb-6 text-center">Please enter your details to sign in.</p>
		{#if form?.incorrect}
			<h4 class="text-red-600 font-light text-md text-center bg-red-100 rounded-lg mb-4 p-2">
				{form.incorrect}
			</h4>
		{/if}
		{#if form?.missing}
			<h4 class="text-red-600 font-light text-md text-center bg-red-100 rounded-lg mb-4 p-2">
				{form.missing}
			</h4>
		{/if}
		<div class="mb-2">
			<label for="email" class="block font-medium text-sm text-neutral-800 mb-1">Email</label>
			<input
				type="email"
				id="email"
				name="email"
				placeholder="Email"
				class="bg-gray-50 border-gray-300 border-2 text-gray-700 rounded-lg w-full p-2 focus:border-orange-500 focus:outline-none"
			/>
		</div>
		<div class="mb-6">
			<label for="password" class="block font-medium text-sm text-neutral-800 mb-1">Password</label>
			<input
				type="password"
				id="password"
				name="password"
				placeholder="Password"
				class="bg-gray-50 border-gray-300 border-2 text-gray-700 rounded-lg w-full p-2 focus:border-orange-500 focus:outline-none"
			/>
		</div>

		<button
			type="submit"
			class="bg-orange-500 hover:bg-orange-600 w-full text-lg font-medium text-white rounded-lg py-2 px-4"
			>Sign In</button
		>
		<div class="flex items-center justify-center mt-4">
			<p class="text-sm">
				Doesn't have an account,
				<a href="/sign-up" class="text-orange-500 hover:text-orange-600 font-medium ml-0.5"
					>Sign Up</a
				>
			</p>
		</div>
	</form>
</main>
