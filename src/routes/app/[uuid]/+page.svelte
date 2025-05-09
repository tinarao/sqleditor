<script lang="ts">
	import { SvelteFlow, Background } from '@xyflow/svelte';
	import TableNode from '$lib/components/table-node.svelte';
	import ProjectPageSidebar from '$lib/components/project-page-sidebar.svelte';
	import {
		currentNodesStore,
		currentEdgesStore,
		currentProjectStore
	} from '$lib/store/currentProject';
	import { theme } from '$lib/store/theme';
	import '@xyflow/svelte/dist/style.css';
	import type { NodeTypes } from '@xyflow/svelte';
	import { Button, Input } from 'flowbite-svelte';
	import { setSelectedNodeId } from '$lib/store/selectedNode';

	const nodeTypes: NodeTypes = { table: TableNode as any };
	let searchQuery = $state('');
	let debouncedSearchQuery = $state('');
	let searchTimeout: number;

	let flowBackgroundColor = $derived($theme === 'dark' ? 'oklch(20.5% 0 0)' : 'oklch(98.5% 0 0)');

	function handleSearchInput(value: string) {
		searchQuery = value;
		clearTimeout(searchTimeout);
		searchTimeout = setTimeout(() => {
			debouncedSearchQuery = value.toLowerCase();
		}, 300);
	}

	let searchResults = $derived(
		debouncedSearchQuery
			? $currentNodesStore.filter((table) =>
					table.data.name.toLowerCase().includes(debouncedSearchQuery)
			  )
			: $currentNodesStore
	);

	function handleSelectTable(id: string) {
		setSelectedNodeId(id);
	}

	$effect(() => {
		return () => clearTimeout(searchTimeout);
	});
</script>

<div class="grid flex-1 grid-cols-12 gap-x-4 p-4 py-0">
	<aside class="bg-secondary col-span-2 p-4">
		{#if $currentProjectStore}
			<search>
				<Input
					type="search"
					placeholder="Поиск таблиц..."
					value={searchQuery}
					onchange={(e) => handleSearchInput(e.currentTarget.value)}
					class="mb-2"
				/>
			</search>
			<div class="space-y-2">
				{#each searchResults as table (table.id)}
					<Button color="light" class="w-full" onclick={() => handleSelectTable(table.id)}>
						{table.data.name}
					</Button>
				{/each}
				{#if searchResults.length === 0}
					<div class="text-center text-sm text-neutral-500">Таблицы не найдены</div>
				{/if}
			</div>
		{/if}
	</aside>
	<div class="col-span-7">
		<SvelteFlow {nodeTypes} fitView nodes={currentNodesStore} edges={currentEdgesStore}>
			<Background size={0} bgColor={flowBackgroundColor} />
		</SvelteFlow>
	</div>
	<aside class="col-span-3">
		<ProjectPageSidebar nodes={currentNodesStore} />
	</aside>
</div>
