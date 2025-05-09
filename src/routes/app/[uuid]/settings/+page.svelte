<script lang="ts">
	import { projectsStore } from '$lib/store/projects';
	import { Button } from 'flowbite-svelte';
	import type { PageData } from './$types';
	import { goto } from '$app/navigation';

	let { data }: { data: PageData } = $props();

	function handleDeleteProject() {
		projectsStore.removeByUuid(data.uuid);
		goto('/app');
	}
</script>

<div>
	<Button onclick={handleDeleteProject} size="xl">Удалить проект</Button>
</div>
