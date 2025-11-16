export interface TopoTransform {
    scale: [number, number];
    translate: [number, number];
}

export interface TopoProperties {
    country_code: string;
    country: string;
    province_code: string;
    province: string;
    regency_code: string;
    regency: string;
    district_code: string;
    district: string;
    village_code: string;
    village: string;
    source: string;
    date: string;
    valid_on: string;
}

export interface TopoGeometryPolygon {
    type: 'Polygon';
    arcs: number[][]; // array of linear rings (each ring is array of arc indexes)
    properties: TopoProperties;
}

export interface TopoGeometryMultiPolygon {
    type: 'MultiPolygon';
    arcs: number[][][]; // array of polygons -> rings -> arc indexes
    properties: TopoProperties;
}

export type TopoGeometry = TopoGeometryPolygon | TopoGeometryMultiPolygon;

export interface TopoGeometryCollection {
    type: 'GeometryCollection';
    geometries: TopoGeometry[];
}

// Specific to id5207_sumbawa_barat (Sumbawa Barat) dataset structure
export interface SumbawaBaratTopology {
    type: 'Topology';
    arcs: number[][][]; // shared arc coordinates
    transform: TopoTransform;
    objects: {
        id5207_sumbawa_barat: TopoGeometryCollection;
        // Other named objects are not expected in this dataset
    };
}


