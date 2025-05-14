<script lang="ts">
	import { Handle, Position } from '@xyflow/svelte';
	import type { TableNodeData } from '$lib/types';

	let { field, id, index }: { field: TableNodeData; id: string; index: number } = $props();
</script>

<div class="group relative flex justify-between border-t p-2 py-1">
	<Handle
		type="target"
		position={Position.Left}
		class="absolute top-1/2 left-0 -translate-x-1/2 -translate-y-1/2 !bg-blue-500 opacity-0 transition-opacity group-hover:opacity-100 hover:!bg-blue-600"
		id={`${id}-field-${index}-target`}
	/>
	<div class="flex items-center gap-2">
		<span>{field.name}</span>
		<span class="rounded bg-green-100 px-1 text-xs text-green-800">
			{field.type}
		</span>
		{#if !field.nullable}
			<span class="rounded bg-indigo-100 px-1 text-xs text-indigo-800">not null</span>
		{/if}
		{#if field.pk}
			<span class="rounded bg-blue-100 px-1 text-xs text-blue-800">pk</span>
		{/if}
		{#if field.unique}
			<span class="rounded bg-red-100 px-1 text-xs text-red-800">unique</span>
		{/if}
	</div>
	<Handle
		type="source"
		position={Position.Right}
		class="absolute top-1/2 right-0 translate-x-1/2 -translate-y-1/2 !bg-red-500 opacity-0 transition-opacity group-hover:opacity-100 hover:!bg-red-600"
		id={`${id}-field-${index}-source`}
	/>
</div>
