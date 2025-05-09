import type { Project } from '$lib/types';
import { persisted } from 'svelte-persisted-store';
import { get } from 'svelte/store';

const projectsState = persisted<Project[]>('projects', []);

export const projectsStore = {
	store: projectsState,
	getByUuid(uuid: string): Project | undefined {
		return get(projectsState).find((p: Project) => p.uuid === uuid);
	},

	append(project: Project) {
		projectsState.update((ps) => {
			ps.push(project);
			return ps;
		});
	},

	updateByUuid(project: Project) {
		projectsState.update((ps) => {
			const idx = ps.findIndex((p) => p.uuid === project.uuid);
			if (idx === -1) return ps;
			ps[idx] = { ...project };
			return ps;
		});
	},

	removeByUuid(uuid: string) {
		projectsState.update((ps) => ps.filter((p) => p.uuid !== uuid));
	}
};
