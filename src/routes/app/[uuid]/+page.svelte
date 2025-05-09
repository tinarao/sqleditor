<script lang="ts">
	import { SvelteFlow, Background } from '@xyflow/svelte';
	import TableNode from '$lib/components/table-node.svelte';
	import ProjectPageSidebar from '$lib/components/project-page-sidebar.svelte';
	import {
		currentNodesStore,
		currentEdgesStore
	} from '$lib/store/currentProject';
	import type { NodeTypes } from '@xyflow/svelte';
	import '@xyflow/svelte/dist/style.css';

	let nodeTypes: NodeTypes = { table: TableNode as any };
</script>

<div class="grid flex-1 grid-cols-4 gap-x-4 p-4 py-0">
	<ProjectPageSidebar nodes={currentNodesStore} />
	<div class="col-span-3">
		<SvelteFlow {nodeTypes} fitView nodes={currentNodesStore} edges={currentEdgesStore}>
			<Background />
		</SvelteFlow>
	</div>
</div>
