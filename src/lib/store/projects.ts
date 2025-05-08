import type { Project } from "$lib/types";
import { persisted } from "svelte-persisted-store";

const projectsState = persisted<Project[]>("projects", []);

export const projectsStore = {
    store: projectsState,
    getByUuid(uuid: string): Project | undefined {
        let proj: Project | undefined = undefined;
        projectsState.update(ps => {
            proj = ps.find(p => p.uuid === uuid);
            return ps;
        })

        return proj;
    },

    append(project: Project) {
        projectsState.update(ps => {
            ps.push(project);
            return ps;
        })
    }

    // getAll(): Project[] {
    //     let projects = 
    // }
}
