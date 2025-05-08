<script lang="ts">
	import { projectsStore } from '$lib/store/projects';
	import { Button, Card } from 'flowbite-svelte';
	import { ArrowRightOutline, PlusOutline } from 'flowbite-svelte-icons';
	import { projectFabric } from '$lib/fabrics';
	import { goto } from '$app/navigation';

	let { store } = projectsStore;

	function handleCreateNew() {
		const newProject = projectFabric('Без названия');
		projectsStore.append(newProject);

		goto('/app/' + newProject.uuid);
	}
</script>

<div class="px-8 py-4">
	<div>
		<h1 class="text-3xl font-bold">Проекты</h1>
		<p>всего: {$store.length}</p>
		<Button class="my-4" onclick={handleCreateNew}>
			Добавить новый <PlusOutline />
		</Button>
	</div>
	<!-- TODO: UI -->
	<div class="grid grid-cols-4">
		{#each $store as project}
			<Card class="p-4 sm:p-6 md:p-8">
				<h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900">
					{project.name}
				</h5>
				{#if project.description}
					<p class="mb-3 leading-tight font-normal text-gray-700">
						{project.description}
					</p>
				{/if}
				<Button href={'/app/' + project.uuid} class="w-fit">
					Перейти
					<ArrowRightOutline class="ms-2 h-6 w-6 text-white" />
				</Button>
			</Card>
		{/each}
	</div>
</div>
