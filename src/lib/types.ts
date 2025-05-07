export type Table = {
    uuid: string
    name: string
    description: string
    fields: Field[]
}

export type Field = {
    uuid: string
    name: string
    type: FieldType
}

export type FieldType = "varchar(255)" | "text" | "int"
