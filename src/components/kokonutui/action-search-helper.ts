import React from 'react';
import { MapPin, Tag, Building, Camera, Calendar } from 'lucide-react';
import { CategoryDestination, Desa, Kecamatan, Destination, TagDestination, Event, Iops } from '@/types';

export interface ActionSearchOption {
    id: string;
    label: string;
    icon?: React.ReactNode;
    description?: string;
    short?: string;
    end?: string;
    value?: string;
}

export function createActionSearchOptions<T>(
    data: T[] | undefined,
    // eslint-disable-next-line no-unused-vars
    getId: (item: T) => string,
    // eslint-disable-next-line no-unused-vars
    getLabel: (item: T) => string,
    // eslint-disable-next-line no-unused-vars
    getDescription?: (item: T) => string,
    icon?: React.ReactNode
): ActionSearchOption[] {
    if (!data) return [];

    return data.map((item) => ({
        id: getId(item),
        label: getLabel(item),
        description: getDescription?.(item),
        value: getId(item),
        icon,
    }));
}

// Helper functions for specific types
export function makeOptions(fdt:Iops[]) {
    // const fdt = [{
    //     id:0,
    //     value:"asli",
    //     label:"asli",
    //     description:"real doc",
    //  }]
    return createActionSearchOptions(
        fdt,
        (v) => v.id.toString(),
        (v) => v.label,
        (v) => v.description,
        React.createElement(Tag, { className: "h-4 w-4 text-blue-500" })
    );
}
export function createSDocOptions() {
    const fdt = [{
        id:0,
        value:"asli",
        label:"asli",
        description:"real doc",
    },{
        id:1,
        value:"salinan",
        label:"salinan",
        description:"potocopy dll",
    // },{
    //     id:2,
    //     val:"file",
    //     nm:"file",
    }]
    return createActionSearchOptions(
        fdt,
        (v) => v.id.toString(),
        (v) => v.label,
        (v) => v.description,
        React.createElement(Tag, { className: "h-4 w-4 text-blue-500" })
    );
}
export function createStatusOptions() {
    const fdt = [{
        id:0,
        value:"Biasa",
        label:"Biasa",
        description:"",
    },{
        id:1,
        value:"Terbatas",
        label:"Terbatas",
        description:"",
    },{
        id:2,
        value:"Rahasia",
        label:"Rahasia",
        description:"",
    },{
        id:3,
        value:"Sangat Rahasia",
        label:"Sangat Rahasia",
        description:"",
    }]
    return createActionSearchOptions(
        fdt,
        (v) => v.id.toString(),
        (v) => v.label,
        (v) => v.description,
        React.createElement(Tag, { className: "h-4 w-4 text-blue-500" })
    );
}
export function createCategoryOptions(categories: CategoryDestination[]) {
    return createActionSearchOptions(
        categories,
        (category: CategoryDestination) => category.id.toString(),
        (category: CategoryDestination) => category.title,
        (category: CategoryDestination) => category.slug,
        React.createElement(Tag, { className: "h-4 w-4 text-blue-500" })
    );
}

export function createKecamatanOptions(kecamatans: Kecamatan[]) {
    return createActionSearchOptions(
        kecamatans,
        (kecamatan: Kecamatan) => kecamatan.id.toString(),
        (kecamatan: Kecamatan) => kecamatan.nama,
        (kecamatan: Kecamatan) => kecamatan.nama,
        React.createElement(Building, { className: "h-4 w-4 text-green-500" })
    );
}

export function createDesaOptions(desas: Desa[]) {
    return createActionSearchOptions(
        desas,
        (desa: Desa) => desa.id.toString(),
        (desa: Desa) => desa.nama,
        (desa: Desa) => desa.nama,
        React.createElement(MapPin, { className: "h-4 w-4 text-orange-500" })
    );
}

export function createDestinationOptions(destinations: Destination[]) {
    return createActionSearchOptions(
        destinations,
        (destination: Destination) => destination.id.toString(),
        (destination: Destination) => destination.title,
        (destination: Destination) => destination.description,
        React.createElement(Camera, { className: "h-4 w-4 text-purple-500" })
    );
}

export function createTagDestinationOptions(tagDestinations: TagDestination[]) {
    return createActionSearchOptions(
        tagDestinations,
        (tagDestination: TagDestination) => tagDestination.id.toString(),
        (tagDestination: TagDestination) => {
            const title = tagDestination.title;
            if (title.length > 20) {
                return `${title.substring(0, 20)}...`;
            }
            return title;
        },
        (tagDestination: TagDestination) => tagDestination.title,
        React.createElement(Tag, { className: "h-4 w-4 text-indigo-500" })
    );
}

export function createEventOptions(events: Event[]) {
    return createActionSearchOptions(
        events,
        (event: Event) => event.id.toString(),
        (event: Event) => event.title,
        undefined,
        React.createElement(Calendar, { className: "h-4 w-4 text-blue-500" })
    );
}
