export type Project = {
	uuid: string;
	name: string;
	description?: string;
	tables: TableNodeType[];
	createdAt: string;
};

// export type Table = {
// 	uuid: string;
// 	name: string;
// 	description: string;
// 	fields: Field[];
// };

// export type Field = {
// 	uuid: string;
// 	name: string;
// 	type: FieldType;
// };

export type TableNodeData = {
	pk?: boolean;
	type: FieldType;
	name: string;
	nullable?: boolean;
	unique?: boolean;
};

export type TableNodeType = {
	id: string;
	type: 'table';
	position: { x: number; y: number };
	data: {
		name: string;
		fields: TableNodeData[];
	};
};

export type BaseFieldType =
	| 'varchar'
	| `varchar(${number})`
	| 'char'
	| `char(${number})`
	| 'text'
	| 'citext'
	| 'smallint'
	| 'integer'
	| 'bigint'
	| 'decimal'
	| `decimal(${number},${number})`
	| 'numeric'
	| `numeric(${number},${number})`
	| 'real'
	| 'double precision'
	| 'smallserial'
	| 'serial'
	| 'bigserial'
	| 'money'
	| 'bytea'
	| 'timestamp'
	| 'timestampz'
	| 'date'
	| 'time'
	| 'timetz'
	| 'interval'
	| 'boolean'
	| 'enum'
	| 'point'
	| 'line'
	| 'lseg'
	| 'box'
	| 'path'
	| 'polygon'
	| 'circle'
	| 'cidr'
	| 'inet'
	| 'macaddr'
	| 'macaddr8'
	| 'bit'
	| `bit(${number})`
	| 'bit varying'
	| `bit varying(${number})`
	| 'json'
	| 'jsonb'
	| 'uuid'
	| 'xml'
	| 'tsvector'
	| 'tsquery';

export type ArrayFieldType = `${BaseFieldType}[]`;

export type FieldType = BaseFieldType | ArrayFieldType;
