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

<main class="flex min-h-screen flex-col py-4">
	<header class="mx-4 mb-4 rounded-lg bg-neutral-100 p-4">penis</header>
	<div class="grid flex-1 grid-cols-5 gap-x-4 p-4 py-0">
		<div class="rounded-lg bg-neutral-100"></div>
		<div class="col-span-4">
			<SvelteFlow nodeTypes={{ table: TableNode }} fitView {nodes} {edges}>
				<Background />
				<Controls />
			</SvelteFlow>
		</div>
	</div>
</main>

<style>
	main {
		height: 100vh;
	}
</style>
