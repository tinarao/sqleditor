<script lang="ts">
	import { projectsStore } from '$lib/store/projects';
	import { Button } from 'flowbite-svelte';
	import { PlusOutline } from 'flowbite-svelte-icons';
	import { projectFabric } from '$lib/fabrics';
	import { goto } from '$app/navigation';

	let { store } = projectsStore;

	function handleCreateNew() {
		const newProject = projectFabric('Без названия');
		projectsStore.append(newProject);

		goto('/app/' + newProject.uuid);
	}
</script>

<div>
	<h1>your projects</h1>
	<p>всего: {$store.length}</p>
	<Button onclick={handleCreateNew}>
		Добавить новый <PlusOutline />
	</Button>
	{#each $store as project}
		<Button href={'/app/' + project.uuid}>
			{project.name}
		</Button>
	{/each}
</div>
