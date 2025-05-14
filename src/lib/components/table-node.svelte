<script lang="ts">
	import { selectedNodeId, setSelectedNodeId } from '$lib/store/selectedNode';
	import type { TableNodeType } from '$lib/types';
	import { Button, cn } from 'flowbite-svelte';
	import { PenOutline } from 'flowbite-svelte-icons';
	import NodeRow from './node-row.svelte';

	let {
		id,
		data
	}: {
		data: TableNodeType['data'];
		id: string;
	} = $props();

	function handleSelect() {
		setSelectedNodeId(id);
	}
</script>

<div class="bg-node group min-w-60 border-2">
	<div
		class={cn(
			'flex items-center justify-between p-2 text-2xl transition',
			$selectedNodeId === id ? 'bg-green-700' : 'bg-green-500'
		)}
	>
		{data.name}
		<Button
			class="aspect-square size-10 bg-transparent transition hover:bg-green-800"
			onclick={handleSelect}
		>
			<PenOutline />
		</Button>
	</div>
	<div class="rounded-b-md border-neutral-500">
		{#each data.fields as field, index}
			<NodeRow {field} {id} {index} />
		{/each}
	</div>
</div>
