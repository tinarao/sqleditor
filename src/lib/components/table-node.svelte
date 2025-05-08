<script lang="ts">
	import { selectedNodeId } from '$lib/store/selectedNode';
	import type { TableNodeType } from '$lib/types';
	import { Button, cn } from 'flowbite-svelte';
	import { PenOutline } from 'flowbite-svelte-icons';

	let {
		id,
		data
	}: {
		data: TableNodeType['data'];
		id: string;
	} = $props();
</script>

<div class="min-w-60 rounded-md border-2 border-neutral-500 bg-neutral-100">
	<div
		class={cn(
			'flex items-center justify-between rounded-t-sm p-2 text-2xl transition',
			$selectedNodeId === id ? 'bg-green-700' : 'bg-green-500'
		)}
	>
		{data.name}
		<Button
			class="aspect-square size-10 bg-transparent transition hover:bg-green-800"
			onclick={() => ($selectedNodeId = id)}
		>
			<PenOutline />
		</Button>
	</div>
	<div class="rounded-b-sm bg-neutral-100 p-2">
		{#each data.fields as field}
			<div class="flex justify-between">
				<span>{field.name}</span>
				<span>{field.type}</span>
				{#if field.pk}
					<span>PK</span>
				{/if}
			</div>
		{/each}
	</div>
</div>
