<script lang="ts">
	import { Button, cn, Dropdown, DropdownItem, Input } from 'flowbite-svelte';
	import { DotsHorizontalOutline, PlusOutline } from 'flowbite-svelte-icons';
	import { nanoid } from 'nanoid';
	import { selectedNodeId } from '$lib/store/selectedNode';
	import type { Writable } from 'svelte/store';
	import type { TableNodeData, TableNodeType } from '$lib/types';
	import TableFieldsTable from './table-fields-table.svelte';

	let { nodes }: { nodes: Writable<TableNodeType[]> } = $props();
	let selectedNode = $state<TableNodeType | undefined>(undefined);
	let isEditingName = $state(false);

	function handleAddTableNode() {
		const tableNode: TableNodeType = {
			id: nanoid(16),
			type: 'table',
			position: { x: 0, y: 0 },
			data: {
				name: 'Таблица 1',
				fields: [
					{
						pk: true,
						type: 'serial',
						nullable: false,
						name: 'id'
					}
				]
			}
		};

		nodes.update((n) => {
			n.push(tableNode);
			return n;
		});
	}

	function handleAddRow() {
		let row: TableNodeData = {
			pk: false,
			name: 'new_row',
			type: 'text',
			nullable: false
		};

		nodes.update((nodes_p) => {
			let goalNodeIdx = nodes_p.findIndex((node) => node.id === $selectedNodeId);
			nodes_p[goalNodeIdx].data.fields = [...nodes_p[goalNodeIdx].data.fields, row];

			return nodes_p;
		});
	}

	function handleDeleteTable() {
		if (selectedNode && selectedNode.id) {
			nodes.update((nodes) => nodes.filter((node) => node.id !== selectedNode!.id));
			selectedNode = undefined;
			$selectedNodeId = undefined;
		}
	}

	function handleNameChange(event: Event) {
		if (selectedNode) {
			const input = event.target as HTMLInputElement;
			if (event instanceof KeyboardEvent && event.key === 'Enter') {
				isEditingName = false;
			}
			selectedNode.data.name = input.value;
		}
	}

	$effect(() => {
		if (selectedNodeId) {
			selectedNode = $nodes.find((n) => n.id === $selectedNodeId);
		}
	});

	$effect(() => {
		if (selectedNode && selectedNode.id) {
			nodes.update((nodes) => {
				const index = nodes.findIndex((n) => n.id === selectedNode!.id);
				if (index !== -1) {
					nodes[index] = selectedNode as TableNodeType;
				}
				return nodes;
			});
		}
	});
</script>

<div class="flex h-full flex-col rounded-lg bg-neutral-100 p-4">
	<div>
		<Button onclick={handleAddTableNode} class="w-full space-x-2 transition" color="light">
			<span> Добавить таблицу </span>
			<PlusOutline class="size-4 " />
		</Button>
		<hr class="my-2 text-neutral-300" />
	</div>
	{#if selectedNode}
		<div>
			<div class="flex items-center justify-between py-2">
				{#if isEditingName}
					<Input
						type="text"
						value={selectedNode.data.name}
						onblur={() => (isEditingName = false)}
						onkeydown={handleNameChange}
						onchange={handleNameChange}
						class="text-xl font-medium"
					/>
				{:else}
					<button
						title="Нажмите, чтобы изменить название"
						class="cursor-pointer text-start text-xl font-medium"
						onclick={() => (isEditingName = true)}
					>
						{selectedNode.data.name}
					</button>
				{/if}
				<div class="flex items-start justify-center">
					<Button size="xs" class="size-8">
						<DotsHorizontalOutline />
					</Button>
					<Dropdown simple class="w-36 px-2">
						<DropdownItem
							class="w-full cursor-pointer justify-start rounded-md text-start"
							onclick={handleDeleteTable}>Delete</DropdownItem
						>
					</Dropdown>
				</div>
			</div>
			<div class="py-2">
				<TableFieldsTable {selectedNode} />
				<div class="mx-auto w-fit py-2">
					<Button onclick={handleAddRow} class="transition" color="light" size="xs">
						<PlusOutline class="mr-2 size-4" /> Добавить поле
					</Button>
				</div>
			</div>
		</div>
	{/if}
</div>
