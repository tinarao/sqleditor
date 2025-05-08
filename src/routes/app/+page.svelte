<script lang="ts">
	import { projectsStore } from '$lib/store/projects';
	import type { Project } from '$lib/types';
	import { Button } from 'flowbite-svelte';
	import { PlusOutline } from 'flowbite-svelte-icons';
	import { nanoid } from 'nanoid';
	import { projectFabric } from '$lib/fabrics';

	let { store } = projectsStore;

	function handleCreateNew() {
		const newProject = projectFabric('Без названия');
		projectsStore.append(newProject);
	}
</script>

<div>
	<h1>your projects</h1>
	<p>всего: {$store.length}</p>
	<Button onclick={handleCreateNew}>
		Добавить новый <PlusOutline />
	</Button>
	{#each $store as project}
		<div>
			{project.name}
		</div>
	{/each}
</div>
