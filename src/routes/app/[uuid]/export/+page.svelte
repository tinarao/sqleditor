<script lang="ts">
	import { currentProjectStore } from '$lib/store/currentProject';
	import { onMount } from 'svelte';

	let tables = $state<string[]>([]);

	onMount(() => {
		if ($currentProjectStore) {
			$currentProjectStore?.tables.forEach((t) => {
				const fieldNames = new Set<string>();
				const hasDuplicateFields = t.data.fields.some((field) => {
					if (fieldNames.has(field.name)) {
						return true;
					}
					fieldNames.add(field.name);
					return false;
				});

				if (hasDuplicateFields) {
					tables.push(`-- Ошибка: таблица "${t.data.name}" содержит дублирующиеся имена полей`);
					return;
				}

				let str = `CREATE TABLE IF NOT EXISTS "${t.data.name}" (\n`;

				const fields = t.data.fields.map((f) => {
					let fieldStr = `\t"${f.name}" ${f.type}`;

					if (f.pk) {
						fieldStr += ' PRIMARY KEY';
					} else if (!f.nullable) {
						fieldStr += ' NOT NULL';
					}

					return fieldStr;
				});

				str += fields.join(',\n');
				str += '\n);';
				tables.push(str);
			});
		}
	});
</script>

<main class="bg-primary text-primary p-4 py-0">
	<div class="rounded-lg p-4">
		{#if $currentProjectStore}
			<div class="space-y-2">
				{#each tables as table}
					<div>
						<pre>{table}</pre>
					</div>
				{/each}
			</div>
		{/if}
	</div>
</main>
