import { Iarsip } from "@/types";

export function readDataArsip(data: Iarsip[]) {
    return data.map((item) => {

        const parseJSON = (v: any) => {
            try {
                return typeof v === "string" ? JSON.parse(v) : v;
            } catch {
                return v;
            }
        };

        const formatArrayOfObject = (arr: any[]) => {
            return arr
                .map((obj) => {
                    const nama = Array.isArray(obj.nama)
                        ? obj.nama.join(" ")
                        : obj.nama ?? "";

                    const value = obj.value ?? "";
                    return `${nama} ${value}`.trim();
                })
                .join(", ");
        };

        const stringify = (value: any): string => {
            if (value === null || value === undefined) return "";

            if (typeof value === "string") return value;

            // array
            if (Array.isArray(value)) {
                if (value.length > 0 && typeof value[0] === "object") {
                    return formatArrayOfObject(value);
                }
                return value.join(", ");
            }

            // object
            if (typeof value === "object") {
                return Object.entries(value)
                    .map(([k, v]) => `${k}: ${stringify(v)}`)
                    .join("; ");
            }

            return String(value);
        };

        // parsing yang kemungkinan JSON
        const fixed: any = {
            // ...item,
            jenis: parseJSON(item.jenis),
            rentang: parseJSON(item.rentang),
            retensi: parseJSON(item.retensi),
            keterangan: parseJSON(item.keterangan),
            uraianPoint: parseJSON(item.uraianPoint),
            formNm: parseJSON(item.formNm),
            formVal: parseJSON(item.formVal),
            file: parseJSON(item.file)
        };

        // formNm + formVal → gabung seperti "Nama : John"
        const formattedForms: string[] = [];
        if (Array.isArray(fixed.formNm) && Array.isArray(fixed.formVal)) {
            fixed.formNm.forEach((nm: string, i: number) => {
                formattedForms.push(`${nm}: ${fixed.formVal[i] ?? ""}`);
            });
        }
        fixed.formDetail = formattedForms.join(", ");

        return Object.entries(fixed).map(([key, value]) => ({
            valueNames: key,
            values: stringify(value)
        }));
    })[0];
}


export function _duser<T = any>(value: T, key: string = "user") {
    try {
        const json = JSON.stringify(value);
        localStorage.setItem(key, json);
        return true;
    } catch (err) {
        console.error("LocalStorage Save Error:", err);
        return false;
    }
}

export function __duser<T = any>(key: string = "user"): T | null {
    try {
        const raw = localStorage.getItem(key);
        if (!raw) return null;

        return JSON.parse(raw) as T;
    } catch (err) {
        console.error("LocalStorage Read Error:", err);
        return null;
    }
}

export function safeDate(value: any): Date | undefined {
    if (!value || value === "null") return undefined;

    const d = new Date(value);
    return isNaN(d.getTime()) ? undefined : d;
}