<script lang="ts">
	import { onMount } from 'svelte';
	import { projectsStore } from '$lib/store/projects';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
	onMount(() => {
		const project = projectsStore.getByUuid(data.uuid);
	});
</script>

<div>{data.uuid}</div>
