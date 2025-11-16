export interface Iarsip {
    id: string;
    kd: number;
    uraian: string;
    uraianPoint :IuraianPoint;
    uraianPointC:number;
    tgl:string;
    docStatus:string;
    docC:number;
    file:IAfile;
    formAs:string; 
    formNm:string[];
    formVal:string[];
    created_by?: number; // user_id
    created_at?: number; // user_id
    error?: string;

    keterangan:string;
    jenis:string;
    rentang:string;
    retensi:string;
}
export interface IuraianPoint{

}
export interface IAfile{

}

export interface Iops{id:number,value:string,label:string,description:string}

export interface Ibidang {
    id: string;
    nm: string;
    idUser: string;
    idPimpinan :string;
    jabatan:string;
    jab:string;
    img:string;
    idDin:string; 
}

export interface Idashboard{
    total   : number,
    form    : IDitem[],
    kd      : IDitem[],
    status  : IDitem[],
}
export interface IDitem{
    nama:string,
    total:number
}
export interface IPendataanForm {
  idBidang: string;
  kd: string;
  kategori: string;
  jenis: string; // jika ini array, ubah ke string[]
  rentang: string;
  retensi: string;
  keterangan: string; // jika ini array, ubah ke string[]
  uraian: string;
  uraianPoint: string; // jika ini array of object, ubah ke IuraianPoint[]
  uraianPointC: number | string; // tergantung tipe aslinya
  tgl: string | Date; // jika sudah diparse ke Date, ubah ke Date
  docStatus: string;
  docC: string | number; // tergantung tipe aslinya
  file: string; // jika ini file upload, ubah ke File atau IAfile
  status: string;
}
export interface Iaction {
    id: string;
    label: string;
    icon?: React.ReactNode;
    description?: string;
    short?: string;
    end?: string;
    value?: string;
}


// batas 
// ================= USER =================
export interface User {
    id: string;
    fullname: string;
    username: string;
    email: string;
    password: string;
    avatar?: string; // file url
    created_by?: number; // user_id
    edited_by?: number; // user_id
}

// ================= CATEGORY DESTINATION =================
export interface CategoryDestination {
    id: string;
    title: string;
    slug: string;
    created_by?: number; // user_id
    edited_by?: number; // user_id
}

// ================= KECAMATAN =================
export interface Kecamatan {
    id: string;
    nama: string;
    created_by?: number;
    edited_by?: number;
}

// ================= DESA =================
export interface Desa {
    id: string;
    nama: string;
    created_by?: number;
    edited_by?: number;
}

// ================= DESTINATION =================
export interface Destination {
    id: string;
    title: string;
    description: string;
    image?: string; // file url
    url_location?: string;
    latitude?: string;
    longitude?: string;
    views: number;
    ctg_destination_id: string;
    tag_destination_id: string;
    kecamatan_id: number;
    desa_id: number;
    created_by?: number;
    edited_by?: number;
    createdAt?: string;
    updatedAt?: string;
    // Relations
    main_ctg?: {
        id: string;
        title: string;
    };
    tag?: {
        id: string;
        title: string;
    };
    kecamatan?: {
        id: string;
        nama: string;
    };
    desa?: {
        id: string;
        nama: string;
    };
    creator?: {
        id: string;
        name: string;
    };
    editor?: {
        id: string;
        name: string;
    } | null;
}

// ================= TAG DESTINATION =================
export interface TagDestination {
    id: string;
    title: string;
    createdAt: string;
    updatedAt: string;
    destination: Destination[];
    main_ctg: {
        id: string;
        title: string;
    };
    creator: {
        id: string;
        name: string;
    };
    editor: {
        id: string;
        name: string;
    } | null;
    ctg_destination_id?: string;
    created_by?: number;
    edited_by?: number;
}

// ================= GALLERY =================
export interface Gallery {
    id: string;
    title: string;
    description?: string;
    image?: string;
    destination_id: string;
    created_by?: number;
    edited_by?: number;
    createdAt?: string;
    updatedAt?: string;
    // Relations
    destination?: {
        id: string;
        title: string;
    };
    creator?: {
        id: string;
        name: string;
    };
    editor?: {
        id: string;
        name: string;
    } | null;
}

// ================= DESTINATION PATH =================
export interface DestinationPath {
    id: string;
    title: string;
    description?: string;
    destination_id: number;
    created_by?: number;
    edited_by?: number;
}

// ================= SERVICE =================
export interface Service {
    id: string;
    title: string;
    slug: string;
    icon?: string;
    url?: string;
    createdBy: string;
    updatedBy: string;
    createdAt: string;
    updatedAt: string;
    created: {
        id: string;
        name: string;
    };
    updated: {
        id: string;
        name: string;
    };
}

// ================= EVENT =================
export interface Event {
    id: string;
    title: string;
    slug: string;
    description?: string;
    start_date: string;
    end_date?: string;
    url_location?: string;
    banner?: string;
    createdBy: string;
    updatedBy: string;
    createdAt: string;
    updatedAt: string;
    created: {
        id: string;
        name: string;
    };
    updated: {
        id: string;
        name: string;
    };
}

// ================= ANNOUNCEMENT =================
export interface Announcement {
    id: string;
    title: string;
    slug: string;
    description?: string;
    posted_at: string;
    url_location?: string;
    document?: string;
    event_id?: string;
    createdBy: string;
    updatedBy: string;
    createdAt: string;
    updatedAt: string;
    created: {
        id: string;
        name: string;
    };
    updated: {
        id: string;
        name: string;
    };
    event?: {
        id: string;
        title: string;
    };
}

// ================= SETTING =================
export interface Setting {
    id: string;
    banner?: string;
    email?: string;
    facebook?: string;
    instagram?: string;
    tiktok?: string;
    x?: string;
    youtube?: string;
    createdBy: string;
    updatedBy: string;
    createdAt: string;
    updatedAt: string;
    created: {
        id: string;
        name: string;
    };
    updated: {
        id: string;
        name: string;
    };
}

/* =======================================================
   =============== RELATIONSHIP VERSION ==================
   ======================================================= */

export interface DestinationWithRelations extends Destination {
    category?: CategoryDestination;
    kecamatan?: Kecamatan;
    desa?: Desa;
    galleries?: Gallery[];
    paths?: DestinationPath[];
}

export interface GalleryWithRelations extends Gallery {
    destination?: Destination;
}

export interface DestinationPathWithRelations extends DestinationPath {
    destination?: Destination;
}

export interface AnnouncementWithRelations extends Announcement {
    event?: Event;
}

export interface ServiceWithRelations extends Service {
    category?: string; // kalau ada tabel category_service
}

export interface EventWithRelations extends Event {
    announcements?: Announcement[];
}

// ================= API RESPONSE INTERFACES =================

// Generic API response for successful requests with data array
export interface ApiSuccessResponse<T> {
    statusCode: number;
    statusError: boolean;
    statusMessage: string;
    statusText: string;
    data: T[];
}

// Generic API response for successful requests with single data
export interface ApiSuccessSingleResponse<T> {
    statusCode: number;
    statusError: boolean;
    statusMessage: string;
    statusText: string;
    data: T;
}

// ================= SPECIFIC API RESPONSE TYPES =================
// Type aliases for specific data types
export type EventsResponse = ApiSuccessResponse<Event>;
export type UsersResponse = ApiSuccessResponse<User>;
export type DestinationsResponse = ApiSuccessResponse<Destination>;
export type ServicesResponse = ApiSuccessResponse<Service>;
export type AnnouncementsResponse = ApiSuccessResponse<Announcement>;
export type SettingsResponse = ApiSuccessResponse<Setting>;
export type CategoriesResponse = ApiSuccessResponse<CategoryDestination>;
export type KecamatanResponse = ApiSuccessResponse<Kecamatan>;
export type DesaResponse = ApiSuccessResponse<Desa>;
export type GalleryResponse = ApiSuccessResponse<Gallery>;
export type TagDestinationResponse = ApiSuccessResponse<TagDestination>;
export type DestinationPathResponse = ApiSuccessResponse<DestinationPath>;

// ================= API ERROR RESPONSE =================
export interface ApiErrorResponse {
    statusCode: number;
    statusError: boolean;
    statusMessage: string;
    statusText: string;
}

export interface UserWithRelations extends User {
    createdDestinations?: Destination[];
    editedDestinations?: Destination[];
    createdEvents?: Event[];
    editedEvents?: Event[];
}

// ================= FILE MANAGER =================
export interface FileItem {
    id: string;
    name: string;
    uploaded: string;
    lastModified: string;
    fileSize: string;
    type: 'image' | 'document' | 'video' | 'audio' | 'other';
}
