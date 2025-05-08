<script>
	import { CheckOutline, PenOutline } from 'flowbite-svelte-icons';

	let { data } = $props();
	let tableName = $state(data.label || 'Table');
	let fields = [
		{ name: 'id', type: 'INT', pk: true },
		{ name: 'name', type: 'VARCHAR(255)' }
	];
</script>

<div class="min-w-60 rounded-md border-2 border-neutral-500 bg-neutral-100">
	<div class="flex items-center justify-between rounded-t-sm bg-green-500 p-2 text-2xl">
		{tableName}
	</div>
	<div class="rounded-b-sm bg-neutral-100 p-2">
		{#each fields as field}
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
