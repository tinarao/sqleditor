<script>
	import { writable } from 'svelte/store';
	import { SvelteFlow, Background, Controls } from '@xyflow/svelte';

	import '@xyflow/svelte/dist/style.css';
	import TableNode from '$lib/components/table-node.svelte';

	const nodes = writable([
		{
			id: 'node-1',
			type: 'table',
			position: { x: 0, y: 0 },
			data: { color: writable('#ff4000') }
		}
	]);

	let edges = writable([]);
</script>

<main class="h-full">
	<header class="m-4 rounded-md bg-neutral-100 p-4">penis</header>
	<SvelteFlow nodeTypes={{ table: TableNode }} fitView {nodes} {edges}>
		<Background />
		<Controls />
	</SvelteFlow>
</main>

<style>
	main {
		height: 100vh;
	}
</style>
