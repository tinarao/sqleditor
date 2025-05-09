<script lang="ts">
	import { SvelteFlow, Background, MiniMap } from '@xyflow/svelte';
	import TableNode from '$lib/components/table-node.svelte';
	import ProjectPageSidebar from '$lib/components/project-page-sidebar.svelte';
	import {
		currentNodesStore,
		currentEdgesStore,
		currentProjectStore
	} from '$lib/store/currentProject';
	import type { NodeTypes } from '@xyflow/svelte';
	import '@xyflow/svelte/dist/style.css';

	let nodeTypes: NodeTypes = { table: TableNode as any };
</script>

<div class="grid flex-1 grid-cols-12 gap-x-4 p-4 py-0">
	<aside class="col-span-2 bg-neutral-100">
		{#if $currentProjectStore}
			<search>search by tables</search>
			{#each $currentProjectStore.tables as table}
				<div>{table.data.name}</div>
			{/each}
		{/if}
	</aside>
	<div class="col-span-7">
		<SvelteFlow {nodeTypes} fitView nodes={currentNodesStore} edges={currentEdgesStore}>
			<Background />
			<MiniMap />
		</SvelteFlow>
	</div>
	<aside class="col-span-3">
		<ProjectPageSidebar nodes={currentNodesStore} />
	</aside>
</div>
