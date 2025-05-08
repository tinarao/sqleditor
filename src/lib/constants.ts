export const ALL_BASE_FIELD_TYPES = [
    "varchar", "varchar(255)", "char", "char(1)", "text", "citext",

    "smallint", "integer", "bigint",
    "decimal", "decimal(10,2)", "numeric", "numeric(10,2)",
    "real", "double precision",
    "smallserial", "serial", "bigserial", "money",

    "bytea",

    "timestamp", "timestampz", "date", "time", "timetz", "interval",

    "boolean",

    "enum",

    "point", "line", "lseg", "box", "path", "polygon", "circle",

    "cidr", "inet", "macaddr", "macaddr8",

    "bit", "bit(8)", "bit varying", "bit varying(16)",

    "json", "jsonb",

    "uuid",

    "xml", "tsvector", "tsquery"
] as const;

export const ALL_BASE_FIELD_TYPES_SELECT = [
    { value: "varchar", name: "varchar" },
    { value: "varchar(255)", name: "varchar(255)" },
    { value: "char", name: "char" },
    { value: "char(1)", name: "char(1)" },
    { value: "text", name: "text" },
    { value: "citext", name: "citext" },

    { value: "smallint", name: "smallint" },
    { value: "integer", name: "integer" },
    { value: "bigint", name: "bigint" },
    { value: "decimal", name: "decimal" },
    { value: "decimal(10,2)", name: "decimal(10,2)" },
    { value: "numeric", name: "numeric" },
    { value: "numeric(10,2)", name: "numeric(10,2)" },
    { value: "real", name: "real" },
    { value: "double precision", name: "double precision" },
    { value: "smallserial", name: "smallserial" },
    { value: "serial", name: "serial" },
    { value: "bigserial", name: "bigserial" },
    { value: "money", name: "money" },

    { value: "bytea", name: "bytea" },

    { value: "timestamp", name: "timestamp" },
    { value: "timestampz", name: "timestampz" },
    { value: "date", name: "date" },
    { value: "time", name: "time" },
    { value: "timetz", name: "timetz" },
    { value: "interval", name: "interval" },

    { value: "boolean", name: "boolean" },

    { value: "enum", name: "enum" },

    { value: "point", name: "point" },
    { value: "line", name: "line" },
    { value: "lseg", name: "lseg" },
    { value: "box", name: "box" },
    { value: "path", name: "path" },
    { value: "polygon", name: "polygon" },
    { value: "circle", name: "circle" },

    { value: "cidr", name: "cidr" },
    { value: "inet", name: "inet" },
    { value: "macaddr", name: "macaddr" },
    { value: "macaddr8", name: "macaddr8" },

    { value: "bit", name: "bit" },
    { value: "bit(8)", name: "bit(8)" },
    { value: "bit varying", name: "bit varying" },
    { value: "bit varying(16)", name: "bit varying(16)" },

    { value: "json", name: "json" },
    { value: "jsonb", name: "jsonb" },

    { value: "uuid", name: "uuid" },

    { value: "xml", name: "xml" },
    { value: "tsvector", name: "tsvector" },
    { value: "tsquery", name: "tsquery" }
] 
