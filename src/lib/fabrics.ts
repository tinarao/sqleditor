import { nanoid } from "nanoid"
import type { Project } from "./types"

export function projectFabric(name: string, description?: string): Project {
    const project: Project = {
        uuid: nanoid(32),
        createdAt: new Date().toISOString(),
        name,
        tables: [],
        description
    }

    return project
}
