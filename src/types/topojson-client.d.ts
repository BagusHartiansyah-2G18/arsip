/* eslint-disable no-unused-vars */
declare module 'topojson-client' {
    import type { Feature, FeatureCollection, Geometry } from 'geojson';
    // Minimal signature we need
    export function feature(
        topology: unknown,
        object: unknown
    ): FeatureCollection<Geometry> | Feature<Geometry>;
    export function merge(topology: unknown, objects: unknown[]): Geometry;
}


