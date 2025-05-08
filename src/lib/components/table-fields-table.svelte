<script lang="ts">
	import {
		Toggle,
		Table,
		TableBody,
		TableBodyCell,
		TableBodyRow,
		TableHead,
		TableHeadCell,
		Label,
		Select,
		Input
	} from 'flowbite-svelte';
	import { ALL_BASE_FIELD_TYPES_SELECT } from '$lib/constants';
	import { slide } from 'svelte/transition';
	import type { FieldType, TableNodeType } from '$lib/types';

	let { selectedNode }: { selectedNode: TableNodeType } = $props();
	let openRow: number | null | undefined = $state();
	let selectedRowIdx = $state(-1);

	function toggleRow(i: number) {
		selectedRowIdx = i;
		openRow = openRow === i ? null : i;
	}
</script>

<Table striped border={false}>
	<TableHead>
		<TableHeadCell>Name</TableHeadCell>
		<TableHeadCell>Type</TableHeadCell>
		<TableHeadCell>Nullable</TableHeadCell>
		<TableHeadCell>PK</TableHeadCell>
	</TableHead>
	<TableBody>
		{#each selectedNode.data.fields as field, idx}
			<TableBodyRow
				class="cursor-pointer transition hover:bg-neutral-200"
				onclick={() => toggleRow(idx)}
			>
				<TableBodyCell>{field.name}</TableBodyCell>
				<TableBodyCell>{field.type}</TableBodyCell>
				<TableBodyCell>{field.nullable}</TableBodyCell>
				<TableBodyCell>{field.pk}</TableBodyCell>
			</TableBodyRow>
			{#if openRow === idx}
				<TableBodyRow>
					<TableBodyCell colspan={4} class="px-4 py-2">
						<div class="px-2 py-3" transition:slide={{ duration: 300, axis: 'y' }}>
							<div class="space-y-2">
								<Label>
									Выберите тип
									<Select
										onchange={(e) => {
											selectedNode.data.fields[selectedRowIdx].type = e.currentTarget
												.value as FieldType;
										}}
										class="mt-2"
										items={ALL_BASE_FIELD_TYPES_SELECT}
									/>
								</Label>
								<Toggle
									onchange={(e) => {
										selectedNode.data.fields[selectedRowIdx].nullable = e.currentTarget.checked;
									}}>Nullable</Toggle
								>
								<div>
									<Label>Название</Label>
									<Input
										type="text"
										placeholder={field.name}
										onchange={(e) => {
											selectedNode.data.fields[selectedRowIdx].name = e.currentTarget.value;
										}}
									/>
								</div>
							</div>
						</div>
					</TableBodyCell>
				</TableBodyRow>
			{/if}
		{/each}
	</TableBody>
</Table>
