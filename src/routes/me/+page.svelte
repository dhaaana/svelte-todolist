<script>
	export let data;
</script>

<main class="w-full h-screen flex items-center justify-center bg-gray-100">
	<section class="shadow-md rounded-lg w-[400px] bg-white p-8">
		<h1 class="text-3xl text-neutral-950 font-bold mb-1 text-center">Profile</h1>
		<p class="text-gray-500 mb-6 text-center">Here is your profile</p>
		<div class="flex flex-col gap-y-3 mb-5">
			<div class="flex flex-col">
				<p class="text-gray-800">First Name</p>
				<p class="text-lg text-neutral-800 font-medium">{data.firstName}</p>
			</div>
			<div class="flex flex-col">
				<p class="text-gray-800">Last Name</p>
				<p class="text-lg text-neutral-800 font-medium">{data.lastName}</p>
			</div>
			<div class="flex flex-col">
				<p class="text-gray-800">Email</p>
				<p class="text-lg text-neutral-800 font-medium">{data.email}</p>
			</div>
		</div>
		<div class="flex flex-col">
			<a
				href="/"
				class="bg-orange-500 mb-2 text-center hover:bg-orange-600 w-full text-lg font-medium text-white rounded-lg py-2 px-4"
				>View Todos</a
			>
			<a
				href="/sign-out"
				class="bg-orange-100 text-center hover:bg-orange-200 w-full text-lg font-medium text-orange-600 rounded-lg py-2 px-4"
				>Logout</a
			>
		</div>
	</section>
</main>
