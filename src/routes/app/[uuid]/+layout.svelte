<script>
	import { goto } from '$app/navigation';
	import { projectsStore } from '$lib/store/projects';
	import { Button, Input, Kbd } from 'flowbite-svelte';
	import {
		ArrowLeftOutline,
		CogSolid,
		FloppyDiskAltOutline,
		UndoOutline
	} from 'flowbite-svelte-icons';
	import { onMount } from 'svelte';
	import { currentProjectStore, currentNodesStore } from '$lib/store/currentProject';
	import { page } from '$app/stores';

	let { children, data } = $props();

	const handleSaveProject = () => {
		if ($currentProjectStore) {
			projectsStore.updateByUuid($currentProjectStore);
		}
	};

	let isEditing = $state(false);

	onMount(() => {
		$currentProjectStore = projectsStore.getByUuid(data.uuid);
		if (!$currentProjectStore) {
			return goto('/app');
		}

		currentNodesStore.set($currentProjectStore.tables);
	});

	$effect(() => {
		if ($currentProjectStore) {
			$currentProjectStore.tables = $currentNodesStore;
		}
	});
</script>

<main class="flex min-h-screen flex-col py-4">
	<header class="mx-4 mb-4 flex items-center justify-between rounded-lg bg-neutral-50 p-4">
		{#if isEditing && $currentProjectStore}
			<div class="flex items-center gap-x-2">
				<Input
					autofocus
					type="text"
					bind:value={$currentProjectStore.name}
					onblur={() => {
						isEditing = false;
						handleSaveProject();
					}}
					onkeydown={(e) => {
						if (e.key === 'Enter' || e.key === 'Escape') {
							isEditing = false;
							handleSaveProject();
						}
					}}
					class="w-fit rounded-none border-0 bg-transparent px-0 py-1 text-2xl font-bold ring-0 outline-none focus:border-b-2"
				/>
				<Button class="bg-transparent p-2! text-neutral-900 transition hover:bg-neutral-200">
					<UndoOutline />
				</Button>
			</div>
		{:else}
			<button
				title="Нажмите, чтобы изменить название проекта"
				onclick={() => {
					isEditing = true;
				}}
				class="cursor-pointer text-start text-2xl font-bold"
			>
				{$currentProjectStore?.name}
			</button>
		{/if}
		<div class="flex items-center gap-x-4">
			<Button
				onclick={handleSaveProject}
				class="h-12 gap-x-2 border-neutral-300 text-neutral-900 transition"
				outline
				size="sm"
			>
				<Kbd>Ctrl+S</Kbd>
				<FloppyDiskAltOutline />
			</Button>
			{#if $page.url.pathname.endsWith('/settings')}
				<Button
					href={'/app/' + data.uuid}
					size="sm"
					class="h-12 w-12 border-neutral-300 text-neutral-900 transition"
					outline
				>
					<ArrowLeftOutline />
				</Button>
			{:else}
				<Button
					href={'/app/' + data.uuid + '/settings'}
					size="sm"
					class="h-12 w-12 border-neutral-300 text-neutral-900 transition"
					outline
				>
					<CogSolid />
				</Button>
			{/if}
		</div>
	</header>
	{@render children()}
</main>
