<script lang="ts">
	import { theme, toggleTheme } from '$lib/store/theme';
	import { MoonOutline, SunOutline } from 'flowbite-svelte-icons';
	import { Button } from 'flowbite-svelte';

	$effect(() => {
		document.documentElement.classList.toggle('dark', $theme === 'dark');
	});
</script>

<Button
	class="border-primary size-12 text-neutral-900 transition"
	onclick={toggleTheme}
	title={$theme === 'light' ? 'Переключить на тёмную тему' : 'Переключить на светлую тему'}
>
	{#if $theme === 'light'}
		<MoonOutline class="text-primary size-5" />
	{:else}
		<SunOutline class="text-primary size-5" />
	{/if}
</Button>
