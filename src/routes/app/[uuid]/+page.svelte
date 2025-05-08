<script lang="ts">
	import { writable } from 'svelte/store';
	import { SvelteFlow, Background } from '@xyflow/svelte';
	import { onMount } from 'svelte';
	import { projectsStore } from '$lib/store/projects';
	import { goto } from '$app/navigation';
	import { Button } from 'flowbite-svelte';
	import { FloppyDiskAltOutline } from 'flowbite-svelte-icons';
	import TableNode from '$lib/components/table-node.svelte';
	import ProjectPageSidebar from '$lib/components/project-page-sidebar.svelte';
	import type { PageData } from './$types';
	import type { Project, TableNodeType } from '$lib/types';
	import type { NodeTypes } from '@xyflow/svelte';
	import '@xyflow/svelte/dist/style.css';

	let { data }: { data: PageData } = $props();
	let project = $state<Project | undefined>();

	let nodes = writable<TableNodeType[]>([]);
	let edges = writable([]);
	let nodeTypes: NodeTypes = { table: TableNode as any };
	let isEditing = $state(false);
	const handleSaveProject = () => {
		projectsStore.store.update((projects) => {
			const index = projects.findIndex((p) => p.uuid === project?.uuid);
			if (index !== -1) {
				projects[index].tables = $nodes;
				projects[index].name = project!.name;
			}
			return projects;
		});
	};

	onMount(() => {
		project = projectsStore.getByUuid(data.uuid);
		if (!project) {
			return goto('/app');
		}

		nodes.set(project.tables);
	});
</script>

{#if project}
	<main class="flex min-h-screen flex-col py-4">
		<header class="mx-4 mb-4 flex items-center justify-between rounded-lg bg-neutral-100 p-4">
			{#if isEditing}
				<input
					type="text"
					bind:value={project.name}
					onblur={() => {
						isEditing = false;
						handleSaveProject();
					}}
					onkeydown={(e) => {
						if (e.key === 'Enter') {
							isEditing = false;
							handleSaveProject();
						}
					}}
					class="bg-transparent text-2xl font-bold outline-none"
				/>
			{:else}
				<button
					onclick={() => (isEditing = true)}
					class="cursor-pointer text-2xl font-bold text-start"
				>
					{project.name}
				</button>
			{/if}
			<div class="flex items-center gap-x-4">
				<span>Всего таблиц: {$nodes.length}</span>
				<Button onclick={handleSaveProject} class="aspect-square size-8 transition" size="xs">
					<FloppyDiskAltOutline />
				</Button>
			</div>
		</header>
		<div class="grid flex-1 grid-cols-4 gap-x-4 p-4 py-0">
			<ProjectPageSidebar {nodes} />
			<div class="col-span-3">
				<SvelteFlow {nodeTypes} fitView {nodes} {edges}>
					<Background />
				</SvelteFlow>
			</div>
		</div>
	</main>
{/if}
