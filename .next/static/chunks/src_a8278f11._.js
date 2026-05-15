(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/src/lib/utils/date.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * Date utility functions for formatting and calculating dates
 */ /**
 * Format date to Indonesian locale with short format
 * Example: "6 Okt 2025"
 */ __turbopack_context__.s([
    "formatDate",
    ()=>formatDate,
    "formatDateLong",
    ()=>formatDateLong,
    "formatDateMedium",
    ()=>formatDateMedium,
    "formatDateShort",
    ()=>formatDateShort,
    "getDateString",
    ()=>getDateString,
    "getEventDuration",
    ()=>getEventDuration,
    "getRelativeTime",
    ()=>getRelativeTime,
    "isDateInRange",
    ()=>isDateInRange,
    "isFutureDate",
    ()=>isFutureDate,
    "isPastDate",
    ()=>isPastDate,
    "isToday",
    ()=>isToday,
    "isWeekend",
    ()=>isWeekend
]);
const formatDateShort = (dateString)=>{
    try {
        return new Date(dateString).toLocaleDateString('id-ID', {
            day: 'numeric',
            month: 'short',
            year: 'numeric'
        });
    } catch (e) {
        return typeof dateString === 'string' ? dateString : 'Invalid Date';
    }
};
const formatDateLong = (dateString)=>{
    try {
        return new Date(dateString).toLocaleDateString('id-ID', {
            day: 'numeric',
            month: 'long',
            year: 'numeric'
        });
    } catch (e) {
        return typeof dateString === 'string' ? dateString : 'Invalid Date';
    }
};
const formatDateMedium = (dateString)=>{
    try {
        return new Date(dateString).toLocaleDateString('id-ID', {
            dateStyle: 'medium'
        });
    } catch (e) {
        return typeof dateString === 'string' ? dateString : 'Invalid Date';
    }
};
const formatDate = (dateString, options)=>{
    try {
        const defaultOptions = {
            dateStyle: 'medium'
        };
        return new Date(dateString).toLocaleDateString('id-ID', options || defaultOptions);
    } catch (e) {
        return typeof dateString === 'string' ? dateString : 'Invalid Date';
    }
};
const getEventDuration = (startDate, endDate)=>{
    if (!endDate || !startDate) {
        return '1 Day';
    }
    try {
        const start = new Date(startDate);
        const end = new Date(endDate);
        // Reset time to midnight for accurate day calculation
        start.setHours(0, 0, 0, 0);
        end.setHours(0, 0, 0, 0);
        const diffTime = end.getTime() - start.getTime();
        const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
        // If same day or duration is 0, it's 1 day event
        // Otherwise, add 1 to include both start and end dates (inclusive)
        const totalDays = diffDays === 0 ? 1 : diffDays + 1;
        return totalDays === 1 ? '1 Day' : "".concat(totalDays, " Days");
    } catch (e) {
        return '1 Day';
    }
};
const isToday = (date)=>{
    try {
        const today = new Date();
        const checkDate = new Date(date);
        today.setHours(0, 0, 0, 0);
        checkDate.setHours(0, 0, 0, 0);
        return today.getTime() === checkDate.getTime();
    } catch (e) {
        return false;
    }
};
const isPastDate = (date)=>{
    try {
        const today = new Date();
        const checkDate = new Date(date);
        today.setHours(0, 0, 0, 0);
        checkDate.setHours(0, 0, 0, 0);
        return checkDate.getTime() < today.getTime();
    } catch (e) {
        return false;
    }
};
const isFutureDate = (date)=>{
    try {
        const today = new Date();
        const checkDate = new Date(date);
        today.setHours(0, 0, 0, 0);
        checkDate.setHours(0, 0, 0, 0);
        return checkDate.getTime() > today.getTime();
    } catch (e) {
        return false;
    }
};
const getRelativeTime = (date)=>{
    try {
        const now = new Date();
        const checkDate = new Date(date);
        now.setHours(0, 0, 0, 0);
        checkDate.setHours(0, 0, 0, 0);
        const diffTime = checkDate.getTime() - now.getTime();
        const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
        if (diffDays === 0) return 'Today';
        if (diffDays === 1) return 'Tomorrow';
        if (diffDays === -1) return 'Yesterday';
        if (diffDays > 0) return "in ".concat(diffDays, " days");
        return "".concat(Math.abs(diffDays), " days ago");
    } catch (e) {
        return 'Unknown';
    }
};
const getDateString = (input)=>{
    let date;
    if (input instanceof Date) {
        // If it's already a Date object, we need to format it properly
        // to ensure we're comparing dates only, not including time
        date = new Date(input.getFullYear(), input.getMonth(), input.getDate());
    } else {
        // If it's an ISO string, create a Date object and extract just the date part
        const tempDate = new Date(input);
        date = new Date(tempDate.getFullYear(), tempDate.getMonth(), tempDate.getDate());
    }
    // Format to YYYY-MM-DD string
    return "".concat(date.getFullYear(), "-").concat(String(date.getMonth() + 1).padStart(2, '0'), "-").concat(String(date.getDate()).padStart(2, '0'));
};
const isWeekend = (date)=>{
    try {
        const dateObj = date instanceof Date ? date : new Date(date);
        const day = dateObj.getDay();
        return day === 0 || day === 6; // 0 = Sunday, 6 = Saturday
    } catch (e) {
        return false;
    }
};
const isDateInRange = (date, startDate, endDate)=>{
    try {
        const dateStr = getDateString(date);
        const startStr = getDateString(startDate);
        const endStr = endDate ? getDateString(endDate) : startStr;
        // Handle invalid ranges
        if (endStr < startStr) {
            return dateStr === startStr;
        }
        return dateStr >= startStr && dateStr <= endStr;
    } catch (e) {
        return false;
    }
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/lib/utils/classnames.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "cn",
    ()=>cn
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/clsx/dist/clsx.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tailwind$2d$merge$2f$dist$2f$bundle$2d$mjs$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/tailwind-merge/dist/bundle-mjs.mjs [app-client] (ecmascript)");
;
;
function cn() {
    for(var _len = arguments.length, inputs = new Array(_len), _key = 0; _key < _len; _key++){
        inputs[_key] = arguments[_key];
    }
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tailwind$2d$merge$2f$dist$2f$bundle$2d$mjs$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["twMerge"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["clsx"])(inputs));
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/lib/utils/crypto.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * Simple hash function for key encryption
 * Converts a string into a hash value
 * @param str - String to hash
 * @returns Hashed string in base36 format
 */ __turbopack_context__.s([
    "hashString",
    ()=>hashString
]);
function hashString(str) {
    let hash = 0;
    if (str.length === 0) return hash.toString();
    for(let i = 0; i < str.length; i++){
        const char = str.charCodeAt(i);
        hash = (hash << 5) - hash + char;
        hash = hash & hash; // Convert to 32bit integer
    }
    return Math.abs(hash).toString(36);
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/lib/utils/string.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * Generate initials from user name
 * Takes the first letter of each word (max 2)
 * @param name - Full name of the user
 * @returns Uppercase initials (max 2 characters)
 * @example
 * getUserInitials("John Doe") // Returns "JD"
 * getUserInitials("John Smith Doe") // Returns "JS"
 */ __turbopack_context__.s([
    "capitalize",
    ()=>capitalize,
    "formatNumber",
    ()=>formatNumber,
    "getUserInitials",
    ()=>getUserInitials,
    "slugify",
    ()=>slugify,
    "truncate",
    ()=>truncate
]);
function getUserInitials(name) {
    return name.split(' ').map((word)=>word.charAt(0)).join('').toUpperCase().slice(0, 2);
}
function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}
function truncate(str, maxLength) {
    let suffix = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : '...';
    if (str.length <= maxLength) return str;
    return str.slice(0, maxLength) + suffix;
}
function slugify(str) {
    return str.toLowerCase().trim().replace(/[^\w\s-]/g, '').replace(/[\s_-]+/g, '-').replace(/^-+|-+$/g, '');
}
function formatNumber(num) {
    return num.toLocaleString();
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/lib/utils/data.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "__duser",
    ()=>__duser,
    "_duser",
    ()=>_duser,
    "readDataArsip",
    ()=>readDataArsip,
    "safeDate",
    ()=>safeDate
]);
function readDataArsip(data) {
    return data.map((item)=>{
        const parseJSON = (v)=>{
            try {
                return typeof v === "string" ? JSON.parse(v) : v;
            } catch (e) {
                return v;
            }
        };
        const formatArrayOfObject = (arr)=>{
            return arr.map((obj)=>{
                var _obj_nama;
                const nama = Array.isArray(obj.nama) ? obj.nama.join(" ") : (_obj_nama = obj.nama) !== null && _obj_nama !== void 0 ? _obj_nama : "";
                var _obj_value;
                const value = (_obj_value = obj.value) !== null && _obj_value !== void 0 ? _obj_value : "";
                return "".concat(nama, " ").concat(value).trim();
            }).join(", ");
        };
        const stringify = (value)=>{
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
                return Object.entries(value).map((param)=>{
                    let [k, v] = param;
                    return "".concat(k, ": ").concat(stringify(v));
                }).join("; ");
            }
            return String(value);
        };
        // parsing yang kemungkinan JSON
        const fixed = {
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
        const formattedForms = [];
        if (Array.isArray(fixed.formNm) && Array.isArray(fixed.formVal)) {
            fixed.formNm.forEach((nm, i)=>{
                var _fixed_formVal_i;
                formattedForms.push("".concat(nm, ": ").concat((_fixed_formVal_i = fixed.formVal[i]) !== null && _fixed_formVal_i !== void 0 ? _fixed_formVal_i : ""));
            });
        }
        fixed.formDetail = formattedForms.join(", ");
        return Object.entries(fixed).map((param)=>{
            let [key, value] = param;
            return {
                valueNames: key,
                values: stringify(value)
            };
        });
    })[0];
}
function _duser(value) {
    let key = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : "user";
    try {
        const json = JSON.stringify(value);
        localStorage.setItem(key, json);
        return true;
    } catch (err) {
        console.error("LocalStorage Save Error:", err);
        return false;
    }
}
function __duser() {
    let key = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : "user";
    try {
        const raw = localStorage.getItem(key);
        if (!raw) return null;
        return JSON.parse(raw);
    } catch (err) {
        console.error("LocalStorage Read Error:", err);
        return null;
    }
}
function safeDate(value) {
    if (!value || value === "null") return undefined;
    const d = new Date(value);
    return isNaN(d.getTime()) ? undefined : d;
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/lib/utils/index.ts [app-client] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

// Export all utility functions
__turbopack_context__.s([]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2f$date$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/utils/date.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2f$classnames$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/utils/classnames.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2f$crypto$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/utils/crypto.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2f$string$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/utils/string.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2f$data$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/utils/data.ts [app-client] (ecmascript)");
;
;
;
;
;
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/ui/tooltip.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Tooltip",
    ()=>Tooltip,
    "TooltipContent",
    ()=>TooltipContent,
    "TooltipProvider",
    ()=>TooltipProvider,
    "TooltipTrigger",
    ()=>TooltipTrigger
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$tooltip$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@radix-ui/react-tooltip/dist/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/src/lib/utils/index.ts [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2f$classnames$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/utils/classnames.ts [app-client] (ecmascript)");
"use client";
;
;
;
;
const TooltipProvider = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$tooltip$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Provider"];
const Tooltip = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$tooltip$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Root"];
const TooltipTrigger = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$tooltip$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Trigger"];
const TooltipContent = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["forwardRef"](_c = (param, ref)=>{
    let { className, sideOffset = 4, ...props } = param;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$tooltip$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Portal"], {
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$tooltip$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Content"], {
            ref: ref,
            sideOffset: sideOffset,
            className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2f$classnames$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("z-50 overflow-hidden rounded-md bg-primary px-3 py-1.5 text-xs text-primary-foreground animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 origin-[--radix-tooltip-content-transform-origin]", className),
            ...props
        }, void 0, false, {
            fileName: "[project]/src/components/ui/tooltip.tsx",
            lineNumber: 19,
            columnNumber: 5
        }, ("TURBOPACK compile-time value", void 0))
    }, void 0, false, {
        fileName: "[project]/src/components/ui/tooltip.tsx",
        lineNumber: 18,
        columnNumber: 3
    }, ("TURBOPACK compile-time value", void 0));
});
_c1 = TooltipContent;
TooltipContent.displayName = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$tooltip$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Content"].displayName;
;
var _c, _c1;
__turbopack_context__.k.register(_c, "TooltipContent$React.forwardRef");
__turbopack_context__.k.register(_c1, "TooltipContent");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/layout/sidebar/constants.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "allNavigationItems",
    ()=>allNavigationItems,
    "navigationData",
    ()=>navigationData
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$house$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Home$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/house.js [app-client] (ecmascript) <export default as Home>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$map$2d$pin$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__MapPin$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/map-pin.js [app-client] (ecmascript) <export default as MapPin>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$shield$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Shield$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/shield.js [app-client] (ecmascript) <export default as Shield>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$folder$2d$tree$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__FolderTree$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/folder-tree.js [app-client] (ecmascript) <export default as FolderTree>");
;
const navigationData = [
    {
        section: 'Main',
        items: [
            {
                id: 'dashboard',
                title: 'Dashboard',
                icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$house$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Home$3e$__["Home"]
            }
        ]
    },
    {
        section: 'Manajemen Arsip',
        items: [
            {
                id: 'pendataan',
                title: 'Pendataan',
                icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$map$2d$pin$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__MapPin$3e$__["MapPin"]
            }
        ]
    },
    {
        section: 'Analisis Data',
        items: [
            {
                id: 'sumber',
                title: 'Sumber Data',
                icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$folder$2d$tree$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__FolderTree$3e$__["FolderTree"]
            },
            {
                //     id: 'jenis',
                //     title: 'Jenis Dokumen',
                //     icon: Calendar
                // },{
                id: 'form',
                title: 'Form Tambahan',
                icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$folder$2d$tree$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__FolderTree$3e$__["FolderTree"]
            }
        ]
    },
    {
        section: 'System',
        items: [
            // {
            //     id: 'settings',
            //     title: 'Settings',
            //     icon: Settings
            // },
            {
                id: 'auth',
                title: 'Authentication',
                icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$shield$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Shield$3e$__["Shield"]
            }
        ]
    }
];
const allNavigationItems = navigationData.flatMap((section)=>section.items);
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/layout/sidebar/Badge.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
;
const Badge = (param)=>{
    let { value, tone = 'green' } = param;
    const toneMap = {
        green: 'bg-emerald-100 text-emerald-700',
        orange: 'bg-orange-100 text-orange-700'
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
        className: "text-xs px-2 py-0.5 rounded-full ".concat(toneMap[tone]),
        children: value
    }, void 0, false, {
        fileName: "[project]/src/components/layout/sidebar/Badge.tsx",
        lineNumber: 13,
        columnNumber: 12
    }, ("TURBOPACK compile-time value", void 0));
};
_c = Badge;
const __TURBOPACK__default__export__ = Badge;
var _c;
__turbopack_context__.k.register(_c, "Badge");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/layout/sidebar/Sidebar.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$down$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronDown$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/chevron-down.js [app-client] (ecmascript) <export default as ChevronDown>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$log$2d$out$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__LogOut$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/log-out.js [app-client] (ecmascript) <export default as LogOut>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$panel$2d$left$2d$close$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__PanelLeftClose$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/panel-left-close.js [app-client] (ecmascript) <export default as PanelLeftClose>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$panel$2d$right$2d$open$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__PanelRightOpen$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/panel-right-open.js [app-client] (ecmascript) <export default as PanelRightOpen>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/components/AnimatePresence/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$tooltip$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/tooltip.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$layout$2f$sidebar$2f$constants$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/layout/sidebar/constants.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$layout$2f$sidebar$2f$Badge$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/layout/sidebar/Badge.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$auth$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/src/hooks/auth/index.ts [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$auth$2f$use$2d$auth$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/hooks/auth/use-auth.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/src/lib/utils/index.ts [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2f$string$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/utils/string.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
;
;
;
;
;
const Sidebar = (param)=>{
    let { activeId, onChange, collapsed, onToggleCollapse } = param;
    _s();
    const [openGroups, setOpenGroups] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({});
    const [persistentGroups, setPersistentGroups] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({});
    const [isMobile, setIsMobile] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [prevActiveId, setPrevActiveId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(activeId);
    const sidebarScrollRef = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].useRef(null);
    const collapsedScrollRef = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].useRef(null);
    // Use auth hook for user data
    const { user, logout, isLoading } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$auth$2f$use$2d$auth$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAuth"])();
    const handleLogout = async ()=>{
        try {
            await logout();
        } catch (error) {
            console.log('Logout failed:', error);
        }
    };
    // Mobile detection
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Sidebar.useEffect": ()=>{
            const checkMobile = {
                "Sidebar.useEffect.checkMobile": ()=>{
                    setIsMobile(window.innerWidth < 768);
                }
            }["Sidebar.useEffect.checkMobile"];
            checkMobile();
            window.addEventListener('resize', checkMobile);
            return ({
                "Sidebar.useEffect": ()=>window.removeEventListener('resize', checkMobile)
            })["Sidebar.useEffect"];
        }
    }["Sidebar.useEffect"], []);
    // Auto-close sidebar on mobile when navigating
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Sidebar.useEffect": ()=>{
            if (isMobile && !collapsed && activeId !== prevActiveId) {
                onToggleCollapse();
            }
            setPrevActiveId(activeId);
        }
    }["Sidebar.useEffect"], [
        activeId,
        isMobile,
        collapsed,
        onToggleCollapse,
        prevActiveId
    ]);
    const toggle = (groupId)=>{
        setOpenGroups((s)=>({
                ...s,
                [groupId]: !s[groupId]
            }));
        // Remember the group state persistently
        setPersistentGroups((p)=>({
                ...p,
                [groupId]: !openGroups[groupId]
            }));
    };
    // Auto-open groups containing active items, but respect persistent state
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Sidebar.useEffect": ()=>{
            __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$layout$2f$sidebar$2f$constants$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["allNavigationItems"].forEach({
                "Sidebar.useEffect": (group)=>{
                    if (group.items) {
                        const hasActiveItem = group.items.some({
                            "Sidebar.useEffect.hasActiveItem": (item)=>item.id === activeId
                        }["Sidebar.useEffect.hasActiveItem"]);
                        const wasManuallyOpened = persistentGroups[group.id];
                        if (hasActiveItem || wasManuallyOpened) {
                            setOpenGroups({
                                "Sidebar.useEffect": (prev)=>({
                                        ...prev,
                                        [group.id]: true
                                    })
                            }["Sidebar.useEffect"]);
                        }
                    }
                }
            }["Sidebar.useEffect"]);
        }
    }["Sidebar.useEffect"], [
        activeId,
        persistentGroups
    ]);
    // When sidebar is expanded, restore groups that were opened
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Sidebar.useEffect": ()=>{
            if (!collapsed) {
                setOpenGroups({
                    "Sidebar.useEffect": (prev)=>({
                            ...prev,
                            ...persistentGroups
                        })
                }["Sidebar.useEffect"]);
            }
        }
    }["Sidebar.useEffect"], [
        collapsed,
        persistentGroups
    ]);
    // Styles
    const baseBtn = 'w-full flex items-center justify-between px-4 py-3 text-left rounded-md transition-all duration-200 ease-in-out cursor-pointer';
    const neutral = 'text-gray-700 hover:bg-gray-100 hover:text-gray-900';
    const active = 'bg-emerald-100 text-emerald-700';
    const submenuActive = 'bg-emerald-100 text-emerald-700';
    const submenuNeutral = 'text-gray-600 hover:bg-gray-100 hover:text-gray-800';
    // Render menu button
    const renderMenuButton = (item, isActive, hasSubmenu, isOpen)=>{
        const handleClick = ()=>{
            if (hasSubmenu) {
                toggle(item.id);
            } else {
                onChange(item.id);
            }
        };
        const className = "".concat(baseBtn, " ").concat(isActive ? active : neutral, " ").concat(hasSubmenu ? '' : 'hover:');
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
            className: className,
            onClick: handleClick,
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                    className: "inline-flex items-center gap-3 min-w-0 flex-1",
                    children: [
                        item.icon && /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].createElement(item.icon, {
                            className: "w-5 h-5 ".concat(isActive ? 'text-emerald-700' : 'text-gray-500')
                        }),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "text-sm font-medium truncate",
                            children: item.title
                        }, void 0, false, {
                            fileName: "[project]/src/components/layout/sidebar/Sidebar.tsx",
                            lineNumber: 110,
                            columnNumber: 21
                        }, ("TURBOPACK compile-time value", void 0))
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/layout/sidebar/Sidebar.tsx",
                    lineNumber: 106,
                    columnNumber: 17
                }, ("TURBOPACK compile-time value", void 0)),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex items-center gap-2",
                    children: [
                        item.badge && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "text-gray-500",
                            children: typeof item.badge === 'number' ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$layout$2f$sidebar$2f$Badge$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                value: item.badge
                            }, void 0, false, {
                                fileName: "[project]/src/components/layout/sidebar/Sidebar.tsx",
                                lineNumber: 116,
                                columnNumber: 33
                            }, ("TURBOPACK compile-time value", void 0)) : item.badge
                        }, void 0, false, {
                            fileName: "[project]/src/components/layout/sidebar/Sidebar.tsx",
                            lineNumber: 114,
                            columnNumber: 25
                        }, ("TURBOPACK compile-time value", void 0)),
                        hasSubmenu && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "text-gray-500 transition-transform duration-200 ease-in-out",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                                animate: {
                                    rotate: isOpen ? 180 : 0
                                },
                                transition: {
                                    duration: 0.2
                                },
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$down$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronDown$3e$__["ChevronDown"], {
                                    className: "w-4 h-4"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/layout/sidebar/Sidebar.tsx",
                                    lineNumber: 128,
                                    columnNumber: 33
                                }, ("TURBOPACK compile-time value", void 0))
                            }, void 0, false, {
                                fileName: "[project]/src/components/layout/sidebar/Sidebar.tsx",
                                lineNumber: 124,
                                columnNumber: 29
                            }, ("TURBOPACK compile-time value", void 0))
                        }, void 0, false, {
                            fileName: "[project]/src/components/layout/sidebar/Sidebar.tsx",
                            lineNumber: 123,
                            columnNumber: 25
                        }, ("TURBOPACK compile-time value", void 0))
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/layout/sidebar/Sidebar.tsx",
                    lineNumber: 112,
                    columnNumber: 17
                }, ("TURBOPACK compile-time value", void 0))
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/layout/sidebar/Sidebar.tsx",
            lineNumber: 105,
            columnNumber: 13
        }, ("TURBOPACK compile-time value", void 0));
    };
    // Render submenu item
    const renderSubmenuItem = (item, index, totalItems, isActive)=>{
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "relative",
            children: [
                index !== totalItems - 1 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "absolute left-0 top-0 bottom-0 w-px bg-gray-300"
                }, void 0, false, {
                    fileName: "[project]/src/components/layout/sidebar/Sidebar.tsx",
                    lineNumber: 143,
                    columnNumber: 21
                }, ("TURBOPACK compile-time value", void 0)),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                    className: "absolute left-0 top-1/2 -translate-y-1/2 text-gray-300 pointer-events-none",
                    width: "12",
                    height: "24",
                    viewBox: "0 0 12 24",
                    fill: "none",
                    xmlns: "http://www.w3.org/2000/svg",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                        d: "M1 0 C1 12, 1 12, 12 12",
                        stroke: "currentColor",
                        strokeWidth: "1",
                        fill: "none"
                    }, void 0, false, {
                        fileName: "[project]/src/components/layout/sidebar/Sidebar.tsx",
                        lineNumber: 155,
                        columnNumber: 21
                    }, ("TURBOPACK compile-time value", void 0))
                }, void 0, false, {
                    fileName: "[project]/src/components/layout/sidebar/Sidebar.tsx",
                    lineNumber: 147,
                    columnNumber: 17
                }, ("TURBOPACK compile-time value", void 0)),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                    className: "w-full flex items-center justify-between px-4 py-2 text-left rounded-md transition-all duration-200 ease-in-out cursor-pointer ".concat(isActive ? submenuActive : submenuNeutral, " ml-3 transition-transform duration-150 ease-in-out hover:translate-x-1 overflow-hidden"),
                    onClick: ()=>onChange(item.id),
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "inline-flex items-center gap-2 min-w-0 flex-1",
                            children: [
                                item.icon && /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].createElement(item.icon, {
                                    className: "w-4 h-4 ".concat(isActive ? 'text-emerald-700' : 'text-gray-500')
                                }),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "text-xs truncate",
                                    children: item.title
                                }, void 0, false, {
                                    fileName: "[project]/src/components/layout/sidebar/Sidebar.tsx",
                                    lineNumber: 172,
                                    columnNumber: 25
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/layout/sidebar/Sidebar.tsx",
                            lineNumber: 168,
                            columnNumber: 21
                        }, ("TURBOPACK compile-time value", void 0)),
                        item.badge && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "text-gray-500",
                            children: typeof item.badge === 'number' ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$layout$2f$sidebar$2f$Badge$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                value: item.badge,
                                tone: item.title === 'Drafts' ? 'orange' : 'green'
                            }, void 0, false, {
                                fileName: "[project]/src/components/layout/sidebar/Sidebar.tsx",
                                lineNumber: 177,
                                columnNumber: 33
                            }, ("TURBOPACK compile-time value", void 0)) : item.badge
                        }, void 0, false, {
                            fileName: "[project]/src/components/layout/sidebar/Sidebar.tsx",
                            lineNumber: 175,
                            columnNumber: 25
                        }, ("TURBOPACK compile-time value", void 0))
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/layout/sidebar/Sidebar.tsx",
                    lineNumber: 164,
                    columnNumber: 17
                }, ("TURBOPACK compile-time value", void 0))
            ]
        }, item.id, true, {
            fileName: "[project]/src/components/layout/sidebar/Sidebar.tsx",
            lineNumber: 140,
            columnNumber: 13
        }, ("TURBOPACK compile-time value", void 0));
    };
    // Render submenu group
    const renderSubmenuGroup = (item, isOpen)=>{
        if (!item.items) return null;
        const items = item.items;
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "relative ml-6 mt-1 space-y-1 pl-3 transition-all duration-300 ease-in-out overflow-hidden ".concat(isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'),
            children: items.map((item, index)=>renderSubmenuItem(item, index, items.length, activeId === item.id))
        }, void 0, false, {
            fileName: "[project]/src/components/layout/sidebar/Sidebar.tsx",
            lineNumber: 196,
            columnNumber: 13
        }, ("TURBOPACK compile-time value", void 0));
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            !collapsed && isMobile && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                initial: {
                    opacity: 0
                },
                animate: {
                    opacity: 1
                },
                exit: {
                    opacity: 0
                },
                transition: {
                    duration: 0.3
                },
                className: "fixed inset-0 bg-white/20 backdrop-blur-xs z-40",
                onClick: onToggleCollapse
            }, void 0, false, {
                fileName: "[project]/src/components/layout/sidebar/Sidebar.tsx",
                lineNumber: 209,
                columnNumber: 17
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].aside, {
                initial: false,
                animate: {
                    width: isMobile ? collapsed ? 0 : 256 : collapsed ? 80 : 256,
                    x: isMobile ? collapsed ? -256 : 0 : 0
                },
                transition: {
                    duration: 0.3,
                    ease: "easeInOut",
                    type: "tween"
                },
                className: "shrink-0 flex flex-col h-screen bg-gray-50 border-r border-gray-200 shadow-lg overflow-hidden fixed inset-y-0 left-0 z-50",
                style: {
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    height: '100vh',
                    overscrollBehavior: 'none',
                    overscrollBehaviorY: 'none',
                    touchAction: 'pan-y pinch-zoom'
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "px-4 py-2 border-b border-gray-200",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex items-center justify-between min-h-[44px]",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AnimatePresence"], {
                                    mode: "wait",
                                    children: !collapsed ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                                        initial: {
                                            opacity: 0,
                                            x: -20
                                        },
                                        animate: {
                                            opacity: 1,
                                            x: 0
                                        },
                                        exit: {
                                            opacity: 0,
                                            x: -20
                                        },
                                        transition: {
                                            duration: 0.2
                                        },
                                        className: "flex items-center gap-3",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                                                initial: {
                                                    scale: 0.8
                                                },
                                                animate: {
                                                    scale: 1
                                                },
                                                transition: {
                                                    delay: 0.1,
                                                    duration: 0.2
                                                },
                                                className: "w-8 h-8 rounded-md bg-emerald-100 text-emerald-700 flex items-center justify-center",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("b", {
                                                    style: {
                                                        color: "green"
                                                    },
                                                    children: " V1"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/layout/sidebar/Sidebar.tsx",
                                                    lineNumber: 262,
                                                    columnNumber: 41
                                                }, ("TURBOPACK compile-time value", void 0))
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/layout/sidebar/Sidebar.tsx",
                                                lineNumber: 255,
                                                columnNumber: 37
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                                                initial: {
                                                    opacity: 0
                                                },
                                                animate: {
                                                    opacity: 1
                                                },
                                                transition: {
                                                    delay: 0.2,
                                                    duration: 0.2
                                                },
                                                className: "text-sm font-semibold text-gray-900",
                                                children: "SI ARSIP"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/layout/sidebar/Sidebar.tsx",
                                                lineNumber: 264,
                                                columnNumber: 37
                                            }, ("TURBOPACK compile-time value", void 0))
                                        ]
                                    }, "expanded", true, {
                                        fileName: "[project]/src/components/layout/sidebar/Sidebar.tsx",
                                        lineNumber: 247,
                                        columnNumber: 33
                                    }, ("TURBOPACK compile-time value", void 0)) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                                        initial: {
                                            opacity: 0
                                        },
                                        animate: {
                                            opacity: 1
                                        },
                                        exit: {
                                            opacity: 0
                                        },
                                        transition: {
                                            duration: 0.2
                                        },
                                        className: "w-0"
                                    }, "collapsed", false, {
                                        fileName: "[project]/src/components/layout/sidebar/Sidebar.tsx",
                                        lineNumber: 274,
                                        columnNumber: 33
                                    }, ("TURBOPACK compile-time value", void 0))
                                }, void 0, false, {
                                    fileName: "[project]/src/components/layout/sidebar/Sidebar.tsx",
                                    lineNumber: 245,
                                    columnNumber: 25
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].button, {
                                    onClick: onToggleCollapse,
                                    whileHover: {
                                        scale: 1.05
                                    },
                                    whileTap: {
                                        scale: 0.95
                                    },
                                    className: "h-8 w-8 p-0 hover:bg-gray-100 rounded-md transition-colors",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                                        initial: false,
                                        animate: {
                                            rotate: collapsed ? 0 : 180,
                                            scale: 1
                                        },
                                        transition: {
                                            duration: 0.3,
                                            ease: "easeInOut"
                                        },
                                        children: collapsed ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$panel$2d$left$2d$close$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__PanelLeftClose$3e$__["PanelLeftClose"], {
                                            className: "w-4 h-4 text-gray-600"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/layout/sidebar/Sidebar.tsx",
                                            lineNumber: 299,
                                            columnNumber: 37
                                        }, ("TURBOPACK compile-time value", void 0)) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$panel$2d$right$2d$open$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__PanelRightOpen$3e$__["PanelRightOpen"], {
                                            className: "w-4 h-4 text-gray-600"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/layout/sidebar/Sidebar.tsx",
                                            lineNumber: 301,
                                            columnNumber: 37
                                        }, ("TURBOPACK compile-time value", void 0))
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/layout/sidebar/Sidebar.tsx",
                                        lineNumber: 290,
                                        columnNumber: 29
                                    }, ("TURBOPACK compile-time value", void 0))
                                }, void 0, false, {
                                    fileName: "[project]/src/components/layout/sidebar/Sidebar.tsx",
                                    lineNumber: 284,
                                    columnNumber: 25
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/layout/sidebar/Sidebar.tsx",
                            lineNumber: 244,
                            columnNumber: 21
                        }, ("TURBOPACK compile-time value", void 0))
                    }, void 0, false, {
                        fileName: "[project]/src/components/layout/sidebar/Sidebar.tsx",
                        lineNumber: 243,
                        columnNumber: 17
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AnimatePresence"], {
                        children: !collapsed && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                            ref: sidebarScrollRef,
                            initial: {
                                opacity: 0,
                                x: -20
                            },
                            animate: {
                                opacity: 1,
                                x: 0
                            },
                            exit: {
                                opacity: 0,
                                x: -20
                            },
                            transition: {
                                duration: 0.3,
                                delay: 0.1
                            },
                            className: "flex-1 overflow-y-scroll overscroll-none px-4 py-2",
                            style: {
                                overscrollBehavior: 'none',
                                overscrollBehaviorY: 'none',
                                WebkitOverflowScrolling: 'auto',
                                touchAction: 'pan-y',
                                scrollBehavior: 'smooth',
                                msOverflowStyle: 'none',
                                scrollbarWidth: 'thin'
                            },
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("nav", {
                                className: "space-y-6",
                                children: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$layout$2f$sidebar$2f$constants$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["navigationData"].map((sectionData, sectionIndex)=>{
                                    // Calculate global index for sequential animation
                                    let globalIndex = 0;
                                    for(let i = 0; i < sectionIndex; i++){
                                        globalIndex += __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$layout$2f$sidebar$2f$constants$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["navigationData"][i].items.length;
                                        if (i < __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$layout$2f$sidebar$2f$constants$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["navigationData"].length - 1) globalIndex += 1; // Add separator
                                    }
                                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                                        initial: {
                                            opacity: 0,
                                            y: 20
                                        },
                                        animate: {
                                            opacity: 1,
                                            y: 0
                                        },
                                        transition: {
                                            delay: 0.2 + sectionIndex * 0.1,
                                            duration: 0.3
                                        },
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                                                initial: {
                                                    opacity: 0
                                                },
                                                animate: {
                                                    opacity: 1
                                                },
                                                transition: {
                                                    delay: 0.3 + sectionIndex * 0.1,
                                                    duration: 0.2
                                                },
                                                className: "px-4 py-2",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                    className: "text-xs font-medium text-gray-500 uppercase tracking-wider",
                                                    children: sectionData.section
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/layout/sidebar/Sidebar.tsx",
                                                    lineNumber: 350,
                                                    columnNumber: 49
                                                }, ("TURBOPACK compile-time value", void 0))
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/layout/sidebar/Sidebar.tsx",
                                                lineNumber: 344,
                                                columnNumber: 45
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "space-y-1",
                                                children: sectionData.items.map((item, itemIndex)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                                                        initial: {
                                                            opacity: 0,
                                                            x: -20
                                                        },
                                                        animate: {
                                                            opacity: 1,
                                                            x: 0
                                                        },
                                                        transition: {
                                                            delay: 0.4 + (globalIndex + itemIndex) * 0.05,
                                                            duration: 0.3,
                                                            type: "spring",
                                                            stiffness: 200,
                                                            damping: 20
                                                        },
                                                        children: [
                                                            renderMenuButton(item, activeId === item.id, Boolean('items' in item && item.items), openGroups[item.id] || false),
                                                            'items' in item && item.items ? renderSubmenuGroup(item, openGroups[item.id] || false) : null
                                                        ]
                                                    }, item.id, true, {
                                                        fileName: "[project]/src/components/layout/sidebar/Sidebar.tsx",
                                                        lineNumber: 356,
                                                        columnNumber: 53
                                                    }, ("TURBOPACK compile-time value", void 0)))
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/layout/sidebar/Sidebar.tsx",
                                                lineNumber: 354,
                                                columnNumber: 45
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            sectionIndex < __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$layout$2f$sidebar$2f$constants$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["navigationData"].length - 1 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                                                initial: {
                                                    opacity: 0,
                                                    x: -20
                                                },
                                                animate: {
                                                    opacity: 1,
                                                    x: 0
                                                },
                                                transition: {
                                                    delay: 0.4 + (globalIndex + sectionData.items.length) * 0.05,
                                                    duration: 0.3,
                                                    type: "spring",
                                                    stiffness: 200,
                                                    damping: 20
                                                },
                                                className: "mx-4 my-4 border-t border-gray-200"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/layout/sidebar/Sidebar.tsx",
                                                lineNumber: 380,
                                                columnNumber: 49
                                            }, ("TURBOPACK compile-time value", void 0))
                                        ]
                                    }, sectionData.section, true, {
                                        fileName: "[project]/src/components/layout/sidebar/Sidebar.tsx",
                                        lineNumber: 338,
                                        columnNumber: 41
                                    }, ("TURBOPACK compile-time value", void 0));
                                })
                            }, void 0, false, {
                                fileName: "[project]/src/components/layout/sidebar/Sidebar.tsx",
                                lineNumber: 328,
                                columnNumber: 29
                            }, ("TURBOPACK compile-time value", void 0))
                        }, void 0, false, {
                            fileName: "[project]/src/components/layout/sidebar/Sidebar.tsx",
                            lineNumber: 311,
                            columnNumber: 25
                        }, ("TURBOPACK compile-time value", void 0))
                    }, void 0, false, {
                        fileName: "[project]/src/components/layout/sidebar/Sidebar.tsx",
                        lineNumber: 309,
                        columnNumber: 17
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AnimatePresence"], {
                        children: collapsed && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                            ref: collapsedScrollRef,
                            initial: {
                                opacity: 0,
                                scale: 0.9
                            },
                            animate: {
                                opacity: 1,
                                scale: 1
                            },
                            exit: {
                                opacity: 0,
                                scale: 0.9
                            },
                            transition: {
                                duration: 0.3,
                                delay: 0.1
                            },
                            className: "flex-1 overflow-y-scroll overscroll-none px-2 py-2 custom-scrollbar",
                            style: {
                                overscrollBehavior: 'none',
                                overscrollBehaviorY: 'none',
                                WebkitOverflowScrolling: 'auto',
                                touchAction: 'pan-y',
                                scrollBehavior: 'smooth',
                                msOverflowStyle: 'none',
                                scrollbarWidth: 'thin'
                            },
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("nav", {
                                className: "space-y-2",
                                children: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$layout$2f$sidebar$2f$constants$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["navigationData"].map((sectionData, sectionIndex)=>{
                                    // Calculate global index for sequential animation
                                    let globalIndex = 0;
                                    for(let i = 0; i < sectionIndex; i++){
                                        globalIndex += __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$layout$2f$sidebar$2f$constants$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["navigationData"][i].items.length;
                                        if (i < __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$layout$2f$sidebar$2f$constants$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["navigationData"].length - 1) globalIndex += 1; // Add separator
                                    }
                                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: [
                                            sectionData.items.map((item, itemIndex)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$tooltip$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TooltipProvider"], {
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$tooltip$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Tooltip"], {
                                                        delayDuration: 300,
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$tooltip$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TooltipTrigger"], {
                                                                asChild: true,
                                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].button, {
                                                                    initial: {
                                                                        opacity: 0,
                                                                        x: -20
                                                                    },
                                                                    animate: {
                                                                        opacity: 1,
                                                                        x: 0
                                                                    },
                                                                    transition: {
                                                                        delay: 0.2 + (globalIndex + itemIndex) * 0.05,
                                                                        duration: 0.3,
                                                                        type: "spring",
                                                                        stiffness: 200,
                                                                        damping: 20
                                                                    },
                                                                    whileHover: {
                                                                        scale: 1.1
                                                                    },
                                                                    whileTap: {
                                                                        scale: 0.95
                                                                    },
                                                                    className: "w-full p-2 rounded-md transition-all duration-200 ease-in-out cursor-pointer flex items-center justify-center ".concat(activeId === item.id ? 'bg-emerald-100 text-emerald-700' : 'hover:bg-gray-100'),
                                                                    onClick: ()=>onChange(item.id),
                                                                    children: item.icon && /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].createElement(item.icon, {
                                                                        className: "w-5 h-5 ".concat(activeId === item.id ? 'text-emerald-700' : 'text-gray-500')
                                                                    })
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/components/layout/sidebar/Sidebar.tsx",
                                                                    lineNumber: 437,
                                                                    columnNumber: 61
                                                                }, ("TURBOPACK compile-time value", void 0))
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/layout/sidebar/Sidebar.tsx",
                                                                lineNumber: 436,
                                                                columnNumber: 57
                                                            }, ("TURBOPACK compile-time value", void 0)),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$tooltip$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TooltipContent"], {
                                                                side: "right",
                                                                sideOffset: 8,
                                                                className: "bg-emerald-500/90 backdrop-blur-md text-white text-sm font-medium px-3 py-2 shadow-lg border border-emerald-400/50 rounded-full",
                                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AnimatePresence"], {
                                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                                                                        initial: {
                                                                            opacity: 0,
                                                                            x: -20,
                                                                            scale: 0.8
                                                                        },
                                                                        animate: {
                                                                            opacity: 1,
                                                                            x: 0,
                                                                            scale: 1
                                                                        },
                                                                        exit: {
                                                                            opacity: 0,
                                                                            x: -20,
                                                                            scale: 0.8
                                                                        },
                                                                        transition: {
                                                                            duration: 0.3,
                                                                            ease: [
                                                                                0.4,
                                                                                0.0,
                                                                                0.2,
                                                                                1
                                                                            ]
                                                                        },
                                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                            children: item.title
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/src/components/layout/sidebar/Sidebar.tsx",
                                                                            lineNumber: 475,
                                                                            columnNumber: 69
                                                                        }, ("TURBOPACK compile-time value", void 0))
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/components/layout/sidebar/Sidebar.tsx",
                                                                        lineNumber: 466,
                                                                        columnNumber: 65
                                                                    }, ("TURBOPACK compile-time value", void 0))
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/components/layout/sidebar/Sidebar.tsx",
                                                                    lineNumber: 465,
                                                                    columnNumber: 61
                                                                }, ("TURBOPACK compile-time value", void 0))
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/layout/sidebar/Sidebar.tsx",
                                                                lineNumber: 460,
                                                                columnNumber: 57
                                                            }, ("TURBOPACK compile-time value", void 0))
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/components/layout/sidebar/Sidebar.tsx",
                                                        lineNumber: 435,
                                                        columnNumber: 53
                                                    }, ("TURBOPACK compile-time value", void 0))
                                                }, item.id, false, {
                                                    fileName: "[project]/src/components/layout/sidebar/Sidebar.tsx",
                                                    lineNumber: 434,
                                                    columnNumber: 49
                                                }, ("TURBOPACK compile-time value", void 0))),
                                            sectionIndex < __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$layout$2f$sidebar$2f$constants$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["navigationData"].length - 1 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                                                initial: {
                                                    opacity: 0,
                                                    x: -20
                                                },
                                                animate: {
                                                    opacity: 1,
                                                    x: 0
                                                },
                                                transition: {
                                                    delay: 0.2 + (globalIndex + sectionData.items.length) * 0.05,
                                                    duration: 0.3,
                                                    type: "spring",
                                                    stiffness: 200,
                                                    damping: 20
                                                },
                                                className: "mx-2 my-2 border-t border-gray-200"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/layout/sidebar/Sidebar.tsx",
                                                lineNumber: 484,
                                                columnNumber: 49
                                            }, ("TURBOPACK compile-time value", void 0))
                                        ]
                                    }, sectionData.section, true, {
                                        fileName: "[project]/src/components/layout/sidebar/Sidebar.tsx",
                                        lineNumber: 432,
                                        columnNumber: 41
                                    }, ("TURBOPACK compile-time value", void 0));
                                })
                            }, void 0, false, {
                                fileName: "[project]/src/components/layout/sidebar/Sidebar.tsx",
                                lineNumber: 421,
                                columnNumber: 29
                            }, ("TURBOPACK compile-time value", void 0))
                        }, void 0, false, {
                            fileName: "[project]/src/components/layout/sidebar/Sidebar.tsx",
                            lineNumber: 404,
                            columnNumber: 25
                        }, ("TURBOPACK compile-time value", void 0))
                    }, void 0, false, {
                        fileName: "[project]/src/components/layout/sidebar/Sidebar.tsx",
                        lineNumber: 402,
                        columnNumber: 17
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "".concat(collapsed ? 'p-2' : 'px-4 py-2'),
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AnimatePresence"], {
                            mode: "wait",
                            children: collapsed ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                                initial: {
                                    opacity: 0,
                                    scale: 0.8
                                },
                                animate: {
                                    opacity: 1,
                                    scale: 1
                                },
                                exit: {
                                    opacity: 0,
                                    scale: 0.8
                                },
                                transition: {
                                    duration: 0.2
                                },
                                className: "flex flex-col items-center gap-2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                                        whileHover: {
                                            scale: 1.1
                                        },
                                        whileTap: {
                                            scale: 0.9
                                        },
                                        className: "w-8 h-8 rounded-full bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center text-white font-semibold text-sm cursor-pointer",
                                        children: (user === null || user === void 0 ? void 0 : user.name) ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2f$string$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getUserInitials"])(user.name) : 'U'
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/layout/sidebar/Sidebar.tsx",
                                        lineNumber: 518,
                                        columnNumber: 33
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$tooltip$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TooltipProvider"], {
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$tooltip$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Tooltip"], {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$tooltip$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TooltipTrigger"], {
                                                    asChild: true,
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].button, {
                                                        onClick: handleLogout,
                                                        disabled: isLoading,
                                                        whileHover: {
                                                            scale: 1.1,
                                                            backgroundColor: 'rgba(239, 68, 68, 0.1)'
                                                        },
                                                        whileTap: {
                                                            scale: 0.9
                                                        },
                                                        className: "h-6 w-6 p-0 rounded-md flex items-center justify-center text-gray-500 hover:text-red-600 hover:bg-red-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed",
                                                        children: isLoading ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "w-3 h-3 border border-gray-400 border-t-transparent rounded-full animate-pulse"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/layout/sidebar/Sidebar.tsx",
                                                            lineNumber: 538,
                                                            columnNumber: 53
                                                        }, ("TURBOPACK compile-time value", void 0)) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$log$2d$out$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__LogOut$3e$__["LogOut"], {
                                                            className: "w-3 h-3"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/layout/sidebar/Sidebar.tsx",
                                                            lineNumber: 540,
                                                            columnNumber: 53
                                                        }, ("TURBOPACK compile-time value", void 0))
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/layout/sidebar/Sidebar.tsx",
                                                        lineNumber: 530,
                                                        columnNumber: 45
                                                    }, ("TURBOPACK compile-time value", void 0))
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/layout/sidebar/Sidebar.tsx",
                                                    lineNumber: 529,
                                                    columnNumber: 41
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$tooltip$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TooltipContent"], {
                                                    side: "right",
                                                    className: "bg-emerald-600 text-white text-sm font-medium px-3 py-2 shadow-lg border border-emerald-500",
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        children: "Logout"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/layout/sidebar/Sidebar.tsx",
                                                        lineNumber: 545,
                                                        columnNumber: 45
                                                    }, ("TURBOPACK compile-time value", void 0))
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/layout/sidebar/Sidebar.tsx",
                                                    lineNumber: 544,
                                                    columnNumber: 41
                                                }, ("TURBOPACK compile-time value", void 0))
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/layout/sidebar/Sidebar.tsx",
                                            lineNumber: 528,
                                            columnNumber: 37
                                        }, ("TURBOPACK compile-time value", void 0))
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/layout/sidebar/Sidebar.tsx",
                                        lineNumber: 527,
                                        columnNumber: 33
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, "collapsed-profile", true, {
                                fileName: "[project]/src/components/layout/sidebar/Sidebar.tsx",
                                lineNumber: 509,
                                columnNumber: 29
                            }, ("TURBOPACK compile-time value", void 0)) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                                initial: {
                                    opacity: 0,
                                    y: 20
                                },
                                animate: {
                                    opacity: 1,
                                    y: 0
                                },
                                exit: {
                                    opacity: 0,
                                    y: 20
                                },
                                transition: {
                                    duration: 0.3,
                                    delay: 0.1
                                },
                                className: "bg-white rounded-lg border border-gray-200  p-3",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex items-center justify-between",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex items-center gap-3",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                                                    initial: {
                                                        scale: 0
                                                    },
                                                    animate: {
                                                        scale: 1
                                                    },
                                                    transition: {
                                                        delay: 0.2,
                                                        duration: 0.3,
                                                        type: "spring",
                                                        stiffness: 200
                                                    },
                                                    whileHover: {
                                                        scale: 1.05
                                                    },
                                                    whileTap: {
                                                        scale: 0.95
                                                    },
                                                    className: "w-10 h-10 rounded-full bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center text-white font-semibold text-sm cursor-pointer",
                                                    children: (user === null || user === void 0 ? void 0 : user.name) ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2f$string$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getUserInitials"])(user.name) : 'U'
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/layout/sidebar/Sidebar.tsx",
                                                    lineNumber: 563,
                                                    columnNumber: 41
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                                                    initial: {
                                                        opacity: 0,
                                                        x: -10
                                                    },
                                                    animate: {
                                                        opacity: 1,
                                                        x: 0
                                                    },
                                                    transition: {
                                                        delay: 0.3,
                                                        duration: 0.2
                                                    },
                                                    className: "flex flex-col",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "text-xs text-gray-500",
                                                            children: "Welcome Back"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/layout/sidebar/Sidebar.tsx",
                                                            lineNumber: 581,
                                                            columnNumber: 45
                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "text-sm font-medium text-gray-900",
                                                            children: [
                                                                (user === null || user === void 0 ? void 0 : user.name) || 'User',
                                                                " 👋"
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/components/layout/sidebar/Sidebar.tsx",
                                                            lineNumber: 582,
                                                            columnNumber: 45
                                                        }, ("TURBOPACK compile-time value", void 0))
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/layout/sidebar/Sidebar.tsx",
                                                    lineNumber: 575,
                                                    columnNumber: 41
                                                }, ("TURBOPACK compile-time value", void 0))
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/layout/sidebar/Sidebar.tsx",
                                            lineNumber: 561,
                                            columnNumber: 37
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                                            initial: {
                                                opacity: 0,
                                                scale: 0.8
                                            },
                                            animate: {
                                                opacity: 1,
                                                scale: 1
                                            },
                                            transition: {
                                                delay: 0.4,
                                                duration: 0.2
                                            },
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$tooltip$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TooltipProvider"], {
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$tooltip$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Tooltip"], {
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$tooltip$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TooltipTrigger"], {
                                                            asChild: true,
                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].button, {
                                                                onClick: handleLogout,
                                                                disabled: isLoading,
                                                                whileHover: {
                                                                    scale: 1.1,
                                                                    backgroundColor: 'rgba(239, 68, 68, 0.1)'
                                                                },
                                                                whileTap: {
                                                                    scale: 0.9
                                                                },
                                                                className: "h-8 w-8 p-0 rounded-md flex items-center justify-center text-gray-500 hover:text-red-600 hover:bg-red-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed",
                                                                children: isLoading ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "w-4 h-4 border border-gray-400 border-t-transparent rounded-full animate-pulse"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/components/layout/sidebar/Sidebar.tsx",
                                                                    lineNumber: 603,
                                                                    columnNumber: 61
                                                                }, ("TURBOPACK compile-time value", void 0)) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$log$2d$out$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__LogOut$3e$__["LogOut"], {
                                                                    className: "w-4 h-4"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/components/layout/sidebar/Sidebar.tsx",
                                                                    lineNumber: 605,
                                                                    columnNumber: 61
                                                                }, ("TURBOPACK compile-time value", void 0))
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/layout/sidebar/Sidebar.tsx",
                                                                lineNumber: 595,
                                                                columnNumber: 53
                                                            }, ("TURBOPACK compile-time value", void 0))
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/layout/sidebar/Sidebar.tsx",
                                                            lineNumber: 594,
                                                            columnNumber: 49
                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$tooltip$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TooltipContent"], {
                                                            side: "top",
                                                            className: "bg-emerald-600 text-white text-sm font-medium px-3 py-2 shadow-lg border border-emerald-500",
                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                children: "Logout"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/layout/sidebar/Sidebar.tsx",
                                                                lineNumber: 610,
                                                                columnNumber: 53
                                                            }, ("TURBOPACK compile-time value", void 0))
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/layout/sidebar/Sidebar.tsx",
                                                            lineNumber: 609,
                                                            columnNumber: 49
                                                        }, ("TURBOPACK compile-time value", void 0))
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/layout/sidebar/Sidebar.tsx",
                                                    lineNumber: 593,
                                                    columnNumber: 45
                                                }, ("TURBOPACK compile-time value", void 0))
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/layout/sidebar/Sidebar.tsx",
                                                lineNumber: 592,
                                                columnNumber: 41
                                            }, ("TURBOPACK compile-time value", void 0))
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/layout/sidebar/Sidebar.tsx",
                                            lineNumber: 587,
                                            columnNumber: 37
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/layout/sidebar/Sidebar.tsx",
                                    lineNumber: 560,
                                    columnNumber: 33
                                }, ("TURBOPACK compile-time value", void 0))
                            }, "expanded-profile", false, {
                                fileName: "[project]/src/components/layout/sidebar/Sidebar.tsx",
                                lineNumber: 551,
                                columnNumber: 29
                            }, ("TURBOPACK compile-time value", void 0))
                        }, void 0, false, {
                            fileName: "[project]/src/components/layout/sidebar/Sidebar.tsx",
                            lineNumber: 507,
                            columnNumber: 21
                        }, ("TURBOPACK compile-time value", void 0))
                    }, void 0, false, {
                        fileName: "[project]/src/components/layout/sidebar/Sidebar.tsx",
                        lineNumber: 506,
                        columnNumber: 17
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/layout/sidebar/Sidebar.tsx",
                lineNumber: 220,
                columnNumber: 13
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true);
};
_s(Sidebar, "MSVD26DiPizE56RZtQRdmgw3fXk=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$auth$2f$use$2d$auth$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAuth"]
    ];
});
_c = Sidebar;
const __TURBOPACK__default__export__ = Sidebar;
var _c;
__turbopack_context__.k.register(_c, "Sidebar");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/hooks/navigation/use-active-route.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useActiveRoute",
    ()=>useActiveRoute
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-client] (ecmascript)");
var _s = __turbopack_context__.k.signature();
'use client';
;
const useActiveRoute = ()=>{
    _s();
    const pathname = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePathname"])();
    const getActiveId = ()=>{
        // Map URL paths ke sidebar IDs
        switch(pathname){
            case '/':
            case '/dashboard':
                return 'dashboard';
            case '/pendataan':
            case '/pendataan/add':
                return 'pendataan';
            case '/sumber':
                return 'sumber';
            case '/jenis':
                return 'jenis';
            case '/form':
                return 'form';
            case '/klasifikasi':
                return 'klasifikasi';
            // case '/flows':
            // case '/flows/add':
            //     return 'flows';
            // case '/galleries':
            // case '/galleries/add':
            //     return 'galleries';
            // case '/events':
            // case '/events/add':
            //     return 'events';
            // case '/announcements':
            // case '/announcements/add':
            //     return 'announcements';
            // case '/services':
            // case '/services/add':
            //     return 'services';
            // case '/settings':
            //     return 'settings';
            case '/auth':
                return 'auth';
            default:
                // Handle dynamic routes like /destinations/edit/[id], /events/edit/[id], etc.
                if (pathname.startsWith('/destinations/')) return 'destinations';
                if (pathname.startsWith('/categories/')) return 'categories';
                if (pathname.startsWith('/tag-destinations/')) return 'tag-destinations';
                if (pathname.startsWith('/flows/')) return 'flows';
                if (pathname.startsWith('/galleries/')) return 'galleries';
                if (pathname.startsWith('/events/')) return 'events';
                if (pathname.startsWith('/announcements/')) return 'announcements';
                if (pathname.startsWith('/services/')) return 'services';
                if (pathname.startsWith('/settings/')) return 'settings';
                if (pathname.startsWith('/auth/')) return 'auth';
                return 'dashboard';
        }
    };
    const getParentGroupId = (activeId)=>{
        // Cari parent group untuk auto-open groups yang berisi active item
        const managementGroups = [
            'destinations',
            'categories',
            'tag-destinations',
            'flows',
            'galleries',
            'events',
            'announcements',
            'services'
        ];
        if (managementGroups.includes(activeId)) {
            return 'management';
        }
        return null;
    };
    const getBreadcrumbs = ()=>{
        const activeId = getActiveId();
        // Base breadcrumbs for each section
        const baseBreadcrumbs = {
            dashboard: [
                {
                    label: 'Dashboard'
                }
            ],
            destinations: [
                {
                    label: 'Dashboard',
                    href: '/'
                },
                {
                    label: 'Destinasi'
                }
            ],
            categories: [
                {
                    label: 'Dashboard',
                    href: '/'
                },
                {
                    label: 'Kategori Destinasi'
                }
            ],
            'tag-destinations': [
                {
                    label: 'Dashboard',
                    href: '/'
                },
                {
                    label: 'Tag Destinasi'
                }
            ],
            flows: [
                {
                    label: 'Dashboard',
                    href: '/'
                },
                {
                    label: 'Alur Destinasi'
                }
            ],
            galleries: [
                {
                    label: 'Dashboard',
                    href: '/'
                },
                {
                    label: 'Galeri'
                }
            ],
            events: [
                {
                    label: 'Dashboard',
                    href: '/'
                },
                {
                    label: 'Event'
                }
            ],
            announcements: [
                {
                    label: 'Dashboard',
                    href: '/'
                },
                {
                    label: 'Pengumuman'
                }
            ],
            services: [
                {
                    label: 'Dashboard',
                    href: '/'
                },
                {
                    label: 'Services'
                }
            ],
            settings: [
                {
                    label: 'Dashboard',
                    href: '/'
                },
                {
                    label: 'Settings'
                }
            ],
            auth: [
                {
                    label: 'Dashboard',
                    href: '/'
                },
                {
                    label: 'Authentication'
                }
            ]
        };
        let breadcrumbs = baseBreadcrumbs[activeId] || baseBreadcrumbs.dashboard;
        // Add specific breadcrumb for add/edit pages
        if (pathname.includes('/add')) {
            let actionLabel;
            switch(activeId){
                case 'destinations':
                    actionLabel = 'Tambah Destinasi';
                    break;
                case 'categories':
                    actionLabel = 'Tambah Kategori';
                    break;
                case 'tag-destinations':
                    actionLabel = 'Tambah Tag Destinasi';
                    break;
                case 'flows':
                    actionLabel = 'Tambah Alur';
                    break;
                case 'galleries':
                    actionLabel = 'Tambah Galeri';
                    break;
                case 'events':
                    actionLabel = 'Tambah Event';
                    break;
                case 'announcements':
                    actionLabel = 'Tambah Pengumuman';
                    break;
                case 'services':
                    actionLabel = 'Tambah Layanan';
                    break;
                default:
                    actionLabel = 'Tambah';
                    break;
            }
            breadcrumbs = [
                ...breadcrumbs.slice(0, -1),
                {
                    label: breadcrumbs[breadcrumbs.length - 1].label,
                    href: "/".concat(activeId)
                },
                {
                    label: actionLabel
                }
            ];
        } else if (pathname.includes('/edit/')) {
            let actionLabel;
            switch(activeId){
                case 'destinations':
                    actionLabel = 'Edit Destinasi';
                    break;
                case 'categories':
                    actionLabel = 'Edit Kategori';
                    break;
                case 'tag-destinations':
                    actionLabel = 'Edit Tag Destinasi';
                    break;
                case 'flows':
                    actionLabel = 'Edit Alur';
                    break;
                case 'galleries':
                    actionLabel = 'Edit Galeri';
                    break;
                case 'events':
                    actionLabel = 'Edit Event';
                    break;
                case 'announcements':
                    actionLabel = 'Edit Pengumuman';
                    break;
                case 'services':
                    actionLabel = 'Edit Layanan';
                    break;
                default:
                    actionLabel = 'Edit';
                    break;
            }
            breadcrumbs = [
                ...breadcrumbs.slice(0, -1),
                {
                    label: breadcrumbs[breadcrumbs.length - 1].label,
                    href: "/".concat(activeId)
                },
                {
                    label: actionLabel
                }
            ];
        }
        return breadcrumbs;
    };
    return {
        activeId: getActiveId(),
        parentGroupId: getParentGroupId(getActiveId()),
        breadcrumbs: getBreadcrumbs(),
        pathname
    };
};
_s(useActiveRoute, "xbyQPtUVMO7MNj7WjJlpdWqRcTo=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePathname"]
    ];
});
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/lib/constants/routes.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * API Routes Configuration
 * Based on Bruno API collection structure
 * 
 * This file contains all API endpoint routes to prevent typos
 * and ensure consistency across the application.
 */ // Main API Routes
__turbopack_context__.s([
    "API_ROUTES",
    ()=>API_ROUTES,
    "DEFAULT_VALUES",
    ()=>DEFAULT_VALUES,
    "QUERY_PARAMS",
    ()=>QUERY_PARAMS,
    "buildRouteWithId",
    ()=>buildRouteWithId,
    "buildRouteWithQuery",
    ()=>buildRouteWithQuery,
    "getAuthRoute",
    ()=>getAuthRoute,
    "getRoute",
    ()=>getRoute
]);
const API_ROUTES = {
    arsip: {
        pendataan: 'pendataan',
        bidang: 'bidang',
        pendataanEdit: 'pendataan/edit',
        opsForm: 'namaform',
        analisis: {
            sumber: "analisis/sumber",
            form: "analisis/form"
        }
    },
    // Dashboard
    DASHBOARD: 'dashboard',
    // [BTS DELETE]
    // Core Resources
    DESTINATION: 'destination',
    EVENT: 'events',
    ANNOUNCEMENT: 'announcements',
    SERVICE: 'services',
    SETTING: 'setting',
    USER: 'user',
    // Category & Flow Destinations
    CATEGORY_DESTINATION: 'ctg-destination',
    FLOW_DESTINATION: 'flow-destination',
    TAG_DESTINATION: 'tag-destination',
    GALLERY: 'gallery',
    // Wilayah (Geographic)
    KECAMATAN: 'kecamatan',
    DESA: 'desa',
    // Authentication
    AUTH: {
        LOGIN: 'auth/login',
        REGISTER: 'auth/register',
        VERIFY: 'auth/verify',
        LOGOUT: 'auth/logout',
        REFRESH: 'auth/refresh'
    },
    // File Uploads
    UPLOADS: 'uploads'
};
const getRoute = (key)=>{
    return API_ROUTES[key];
};
const getAuthRoute = (key)=>{
    return API_ROUTES.AUTH[key];
};
const buildRouteWithId = (route, id)=>{
    return "".concat(route, "/").concat(id);
};
const buildRouteWithQuery = (route, params)=>{
    const queryString = new URLSearchParams();
    Object.entries(params).forEach((param)=>{
        let [key, value] = param;
        if (value !== undefined && value !== null) {
            queryString.append(key, String(value));
        }
    });
    return queryString.toString() ? "".concat(route, "?").concat(queryString.toString()) : route;
};
const QUERY_PARAMS = {
    ALL: 'all',
    PAGE: 'page',
    LIMIT: 'limit',
    SEARCH: 'search',
    ID: 'id',
    SLUG: 'slug',
    SORT: 'sort',
    ORDER: 'order'
};
const DEFAULT_VALUES = {
    PAGE: 1,
    LIMIT: 20,
    ORDER: 'desc'
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/hooks/navigation/use-navigation-handler.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ROUTES",
    ()=>ROUTES,
    "useNavigationHandler",
    ()=>useNavigationHandler
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$constants$2f$routes$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/constants/routes.ts [app-client] (ecmascript)");
var _s = __turbopack_context__.k.signature();
'use client';
;
;
const ROUTES = {
    HOME: '/',
    DASHBOARD: '/dashboard',
    PENDATAAN: '/pendataan',
    JENIS: '/jenis',
    SUMBER: '/sumber',
    FORM: '/form',
    SETTINGS: '/settings',
    AUTH: '/auth',
    KLASIFIKASI: '/klasifikasi'
};
const useNavigationHandler = ()=>{
    _s();
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"])();
    const normalizeRouteKey = (route)=>{
        if (typeof route !== 'string') return route;
        const upper = route.toUpperCase();
        if (upper in ROUTES) return upper;
        const map = {
            home: 'HOME',
            dashboard: 'DASHBOARD',
            pendataan: 'PENDATAAN',
            jenis: 'JENIS',
            sumber: 'SUMBER',
            form: 'FORM',
            klasifikasi: "KLASIFIKASI",
            settings: 'SETTINGS',
            auth: 'AUTH'
        };
        const key = map[route.toLowerCase()];
        return key !== null && key !== void 0 ? key : 'HOME';
    };
    const navigateTo = (route)=>{
        const key = normalizeRouteKey(route);
        router.push(ROUTES[key]);
    };
    const navigateToRoute = (routeKey)=>{
        router.push(ROUTES[routeKey]);
    };
    const navigateToDynamicRoute = (template, params)=>{
        let route = template;
        Object.entries(params).forEach((param)=>{
            let [key, value] = param;
            route = route.replace(new RegExp("\\[".concat(key, "\\]"), 'g'), String(value));
        });
        router.push(route);
    };
    const navigateWithParams = (route, params)=>{
        const url = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$constants$2f$routes$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["buildRouteWithQuery"])(route, params);
        router.push(url);
    };
    const navigateToAdd = (resource)=>{
        router.push("/".concat(resource, "/add"));
    };
    const navigateToEdit = (resource, id)=>{
        router.push("/".concat(resource, "/edit/").concat(id));
    };
    const navigateBack = ()=>{
        router.back();
    };
    const navigateForward = ()=>{
        router.forward();
    };
    const replaceRoute = (route)=>{
        router.replace(route);
    };
    const redirectTo = (url)=>{
        window.location.href = url;
    };
    const redirectToRoute = (route)=>{
        window.location.href = ROUTES[route];
    };
    const redirectToDynamicRoute = (template, params)=>{
        let route = template;
        Object.entries(params).forEach((param)=>{
            let [key, value] = param;
            route = route.replace(new RegExp("\\[".concat(key, "\\]"), 'g'), String(value));
        });
        window.location.href = route;
    };
    const redirectWithParams = (route, params)=>{
        const url = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$constants$2f$routes$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["buildRouteWithQuery"])(route, params);
        window.location.href = url;
    };
    const redirectToExternal = (url)=>{
        const fullUrl = url.startsWith('http') ? url : "https://".concat(url);
        window.location.href = fullUrl;
    };
    const redirectToAdd = (resource)=>{
        window.location.href = "/".concat(resource, "/add");
    };
    const redirectToEdit = (resource, id)=>{
        window.location.href = "/".concat(resource, "/edit/").concat(id);
    };
    const goTo = {
        home: ()=>router.push(ROUTES.HOME),
        dashboard: ()=>router.push(ROUTES.DASHBOARD),
        // destinations: () => router.push(ROUTES.DESTINATIONS),
        // categories: () => router.push(ROUTES.CATEGORIES),
        // tagDestinations: () => router.push(ROUTES.TAG_DESTINATIONS),
        // flows: () => router.push(ROUTES.FLOWS),
        // galleries: () => router.push(ROUTES.GALLERIES),
        // events: () => router.push(ROUTES.EVENTS),
        // announcements: () => router.push(ROUTES.ANNOUNCEMENTS),
        // services: () => router.push(ROUTES.SERVICES),
        // settings: () => router.push(ROUTES.SETTINGS),
        auth: ()=>router.push(ROUTES.AUTH)
    };
    const redirect = {
        home: ()=>window.location.href = ROUTES.HOME,
        dashboard: ()=>window.location.href = ROUTES.DASHBOARD,
        // destinations: () => window.location.href = ROUTES.DESTINATIONS,
        // categories: () => window.location.href = ROUTES.CATEGORIES,
        // tagDestinations: () => window.location.href = ROUTES.TAG_DESTINATIONS,
        // flows: () => window.location.href = ROUTES.FLOWS,
        // galleries: () => window.location.href = ROUTES.GALLERIES,
        // events: () => window.location.href = ROUTES.EVENTS,
        // announcements: () => window.location.href = ROUTES.ANNOUNCEMENTS,
        // services: () => window.location.href = ROUTES.SERVICES,
        settings: ()=>window.location.href = ROUTES.SETTINGS,
        auth: ()=>window.location.href = ROUTES.AUTH
    };
    return {
        navigateTo,
        navigateToRoute,
        navigateToDynamicRoute,
        navigateWithParams,
        navigateToAdd,
        navigateToEdit,
        navigateBack,
        navigateForward,
        replaceRoute,
        redirectTo,
        redirectToRoute,
        redirectToDynamicRoute,
        redirectWithParams,
        redirectToExternal,
        redirectToAdd,
        redirectToEdit,
        goTo,
        redirect,
        ROUTES
    };
};
_s(useNavigationHandler, "fN7XvhJ+p5oE6+Xlo0NJmXpxjC8=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"]
    ];
});
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/hooks/navigation/index.ts [app-client] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$navigation$2f$use$2d$active$2d$route$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/hooks/navigation/use-active-route.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$navigation$2f$use$2d$navigation$2d$handler$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/hooks/navigation/use-navigation-handler.ts [app-client] (ecmascript)");
;
;
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/layout/sidebar/types.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([]);
;
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/layout/sidebar/index.ts [app-client] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$layout$2f$sidebar$2f$Sidebar$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/layout/sidebar/Sidebar.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$layout$2f$sidebar$2f$Badge$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/layout/sidebar/Badge.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$navigation$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/src/hooks/navigation/index.ts [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$layout$2f$sidebar$2f$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/layout/sidebar/types.ts [app-client] (ecmascript)");
;
;
;
;
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/layout/sidebar/Sidebar.tsx [app-client] (ecmascript) <export default as Sidebar>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Sidebar",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$layout$2f$sidebar$2f$Sidebar$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$layout$2f$sidebar$2f$Sidebar$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/layout/sidebar/Sidebar.tsx [app-client] (ecmascript)");
}),
"[project]/src/features/dashboard/components/DashboardHeader.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$settings$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Settings$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/settings.js [app-client] (ecmascript) <export default as Settings>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$bell$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Bell$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/bell.js [app-client] (ecmascript) <export default as Bell>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$down$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronDown$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/chevron-down.js [app-client] (ecmascript) <export default as ChevronDown>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$user$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__User$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/user.js [app-client] (ecmascript) <export default as User>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$log$2d$out$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__LogOut$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/log-out.js [app-client] (ecmascript) <export default as LogOut>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$mail$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Mail$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/mail.js [app-client] (ecmascript) <export default as Mail>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$phone$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Phone$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/phone.js [app-client] (ecmascript) <export default as Phone>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$map$2d$pin$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__MapPin$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/map-pin.js [app-client] (ecmascript) <export default as MapPin>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$right$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronRight$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/chevron-right.js [app-client] (ecmascript) <export default as ChevronRight>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$house$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Home$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/house.js [app-client] (ecmascript) <export default as Home>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$panel$2d$left$2d$close$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__PanelLeftClose$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/panel-left-close.js [app-client] (ecmascript) <export default as PanelLeftClose>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/components/AnimatePresence/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$auth$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/src/hooks/auth/index.ts [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$auth$2f$use$2d$auth$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/hooks/auth/use-auth.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/src/lib/utils/index.ts [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2f$string$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/utils/string.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
;
;
;
const DashboardHeader = (param)=>{
    let { breadcrumbs = [
        {
            label: "Dashboard",
            href: "/"
        }
    ], onToggleSidebar, sidebarCollapsed = false } = param;
    _s();
    const [showNotifications, setShowNotifications] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [showAccountMenu, setShowAccountMenu] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [isMobile, setIsMobile] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const notificationsRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const accountMenuRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    // Use auth hook for user data
    const { user, logout, isLoading } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$auth$2f$use$2d$auth$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAuth"])();
    // Mock notifications
    const notifications = [
        {
            id: '1',
            title: 'SI ARSIP',
            message: 'Lounch 15 11 2025',
            time: '-',
            unread: true,
            type: 'success'
        }
    ];
    const unreadCount = notifications.filter((n)=>n.unread).length;
    // Mobile detection
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "DashboardHeader.useEffect": ()=>{
            const checkMobile = {
                "DashboardHeader.useEffect.checkMobile": ()=>{
                    setIsMobile(window.innerWidth < 768);
                }
            }["DashboardHeader.useEffect.checkMobile"];
            checkMobile();
            window.addEventListener('resize', checkMobile);
            return ({
                "DashboardHeader.useEffect": ()=>window.removeEventListener('resize', checkMobile)
            })["DashboardHeader.useEffect"];
        }
    }["DashboardHeader.useEffect"], []);
    // Close dropdowns when clicking outside
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "DashboardHeader.useEffect": ()=>{
            const handleClickOutside = {
                "DashboardHeader.useEffect.handleClickOutside": (event)=>{
                    if (notificationsRef.current && !notificationsRef.current.contains(event.target)) {
                        setShowNotifications(false);
                    }
                    if (accountMenuRef.current && !accountMenuRef.current.contains(event.target)) {
                        setShowAccountMenu(false);
                    }
                }
            }["DashboardHeader.useEffect.handleClickOutside"];
            document.addEventListener('mousedown', handleClickOutside);
            return ({
                "DashboardHeader.useEffect": ()=>{
                    document.removeEventListener('mousedown', handleClickOutside);
                }
            })["DashboardHeader.useEffect"];
        }
    }["DashboardHeader.useEffect"], []);
    const getNotificationIcon = (type)=>{
        switch(type){
            case 'success':
                return '✅';
            case 'warning':
                return '⚠️';
            case 'error':
                return '❌';
            default:
                return 'ℹ️';
        }
    };
    const handleLogout = async ()=>{
        try {
            await logout();
            setShowAccountMenu(false);
        } catch (error) {
            console.log('Logout failed:', error);
        }
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("header", {
        className: "bg-white border-b border-gray-200 px-6 fixed top-0 right-0 z-40 transition-all duration-300 ease-in-out",
        style: {
            paddingTop: '2px',
            paddingBottom: '2px',
            left: isMobile ? '0px' : sidebarCollapsed ? '64px' : '256px',
            height: '60px'
        },
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex items-center justify-between",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex items-center space-x-4",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center space-x-2 text-sm",
                        children: [
                            onToggleSidebar && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].button, {
                                onClick: onToggleSidebar,
                                whileHover: {
                                    scale: 1.05
                                },
                                whileTap: {
                                    scale: 0.95
                                },
                                className: "md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$panel$2d$left$2d$close$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__PanelLeftClose$3e$__["PanelLeftClose"], {
                                    className: "w-5 h-5 text-gray-600"
                                }, void 0, false, {
                                    fileName: "[project]/src/features/dashboard/components/DashboardHeader.tsx",
                                    lineNumber: 156,
                                    columnNumber: 33
                                }, ("TURBOPACK compile-time value", void 0))
                            }, void 0, false, {
                                fileName: "[project]/src/features/dashboard/components/DashboardHeader.tsx",
                                lineNumber: 150,
                                columnNumber: 29
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$house$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Home$3e$__["Home"], {
                                className: "w-4 h-4 text-gray-400"
                            }, void 0, false, {
                                fileName: "[project]/src/features/dashboard/components/DashboardHeader.tsx",
                                lineNumber: 161,
                                columnNumber: 25
                            }, ("TURBOPACK compile-time value", void 0)),
                            breadcrumbs.map((breadcrumb, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].Fragment, {
                                    children: [
                                        index > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$right$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronRight$3e$__["ChevronRight"], {
                                            className: "w-3 h-3 text-gray-300"
                                        }, void 0, false, {
                                            fileName: "[project]/src/features/dashboard/components/DashboardHeader.tsx",
                                            lineNumber: 166,
                                            columnNumber: 47
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        breadcrumb.href ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                            href: breadcrumb.href,
                                            className: "text-gray-600 hover:text-gray-900 transition-colors",
                                            children: breadcrumb.label
                                        }, void 0, false, {
                                            fileName: "[project]/src/features/dashboard/components/DashboardHeader.tsx",
                                            lineNumber: 168,
                                            columnNumber: 37
                                        }, ("TURBOPACK compile-time value", void 0)) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: index === breadcrumbs.length - 1 ? "text-gray-900 font-medium" : "text-gray-600",
                                            children: breadcrumb.label
                                        }, void 0, false, {
                                            fileName: "[project]/src/features/dashboard/components/DashboardHeader.tsx",
                                            lineNumber: 175,
                                            columnNumber: 37
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, index, true, {
                                    fileName: "[project]/src/features/dashboard/components/DashboardHeader.tsx",
                                    lineNumber: 165,
                                    columnNumber: 29
                                }, ("TURBOPACK compile-time value", void 0)))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/features/dashboard/components/DashboardHeader.tsx",
                        lineNumber: 147,
                        columnNumber: 21
                    }, ("TURBOPACK compile-time value", void 0))
                }, void 0, false, {
                    fileName: "[project]/src/features/dashboard/components/DashboardHeader.tsx",
                    lineNumber: 145,
                    columnNumber: 17
                }, ("TURBOPACK compile-time value", void 0)),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex items-center space-x-4",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            onClick: ()=>{},
                            className: "hidden md:block p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors",
                            title: "Settings",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$settings$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Settings$3e$__["Settings"], {
                                className: "w-5 h-5"
                            }, void 0, false, {
                                fileName: "[project]/src/features/dashboard/components/DashboardHeader.tsx",
                                lineNumber: 192,
                                columnNumber: 25
                            }, ("TURBOPACK compile-time value", void 0))
                        }, void 0, false, {
                            fileName: "[project]/src/features/dashboard/components/DashboardHeader.tsx",
                            lineNumber: 187,
                            columnNumber: 21
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "relative",
                            ref: notificationsRef,
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: ()=>setShowNotifications(!showNotifications),
                                    className: "relative p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors",
                                    title: "Notifications",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$bell$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Bell$3e$__["Bell"], {
                                            className: "w-5 h-5"
                                        }, void 0, false, {
                                            fileName: "[project]/src/features/dashboard/components/DashboardHeader.tsx",
                                            lineNumber: 202,
                                            columnNumber: 29
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        unreadCount > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center",
                                            children: unreadCount
                                        }, void 0, false, {
                                            fileName: "[project]/src/features/dashboard/components/DashboardHeader.tsx",
                                            lineNumber: 204,
                                            columnNumber: 33
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/features/dashboard/components/DashboardHeader.tsx",
                                    lineNumber: 197,
                                    columnNumber: 25
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AnimatePresence"], {
                                    children: showNotifications && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                                        initial: {
                                            opacity: 0,
                                            y: -10,
                                            scale: 0.95
                                        },
                                        animate: {
                                            opacity: 1,
                                            y: 0,
                                            scale: 1
                                        },
                                        exit: {
                                            opacity: 0,
                                            y: -10,
                                            scale: 0.95
                                        },
                                        transition: {
                                            duration: 0.2,
                                            ease: "easeOut"
                                        },
                                        className: "absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg border border-gray-200 z-50",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "p-4 border-b border-gray-200",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                    className: "text-sm font-medium text-gray-900",
                                                    children: "Notifications"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/features/dashboard/components/DashboardHeader.tsx",
                                                    lineNumber: 221,
                                                    columnNumber: 41
                                                }, ("TURBOPACK compile-time value", void 0))
                                            }, void 0, false, {
                                                fileName: "[project]/src/features/dashboard/components/DashboardHeader.tsx",
                                                lineNumber: 220,
                                                columnNumber: 37
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "max-h-96 overflow-y-auto",
                                                children: notifications.map((notification, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                                                        initial: {
                                                            opacity: 0,
                                                            x: -20
                                                        },
                                                        animate: {
                                                            opacity: 1,
                                                            x: 0
                                                        },
                                                        transition: {
                                                            delay: index * 0.05,
                                                            duration: 0.2
                                                        },
                                                        className: "p-4 border-b border-gray-100 hover:bg-gray-50 cursor-pointer ".concat(notification.unread ? 'bg-blue-50' : ''),
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "flex items-start space-x-3",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    className: "text-lg",
                                                                    children: getNotificationIcon(notification.type)
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/features/dashboard/components/DashboardHeader.tsx",
                                                                    lineNumber: 234,
                                                                    columnNumber: 53
                                                                }, ("TURBOPACK compile-time value", void 0)),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "flex-1 min-w-0",
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                            className: "text-xs font-medium text-gray-900",
                                                                            children: notification.title
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/src/features/dashboard/components/DashboardHeader.tsx",
                                                                            lineNumber: 236,
                                                                            columnNumber: 57
                                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                            className: "text-xs text-gray-600 mt-1",
                                                                            children: notification.message
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/src/features/dashboard/components/DashboardHeader.tsx",
                                                                            lineNumber: 237,
                                                                            columnNumber: 57
                                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                            className: "text-xs text-gray-500 mt-1",
                                                                            children: notification.time
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/src/features/dashboard/components/DashboardHeader.tsx",
                                                                            lineNumber: 238,
                                                                            columnNumber: 57
                                                                        }, ("TURBOPACK compile-time value", void 0))
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/src/features/dashboard/components/DashboardHeader.tsx",
                                                                    lineNumber: 235,
                                                                    columnNumber: 53
                                                                }, ("TURBOPACK compile-time value", void 0)),
                                                                notification.unread && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "w-2 h-2 bg-blue-500 rounded-full mt-2"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/features/dashboard/components/DashboardHeader.tsx",
                                                                    lineNumber: 241,
                                                                    columnNumber: 57
                                                                }, ("TURBOPACK compile-time value", void 0))
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/features/dashboard/components/DashboardHeader.tsx",
                                                            lineNumber: 233,
                                                            columnNumber: 49
                                                        }, ("TURBOPACK compile-time value", void 0))
                                                    }, notification.id, false, {
                                                        fileName: "[project]/src/features/dashboard/components/DashboardHeader.tsx",
                                                        lineNumber: 225,
                                                        columnNumber: 45
                                                    }, ("TURBOPACK compile-time value", void 0)))
                                            }, void 0, false, {
                                                fileName: "[project]/src/features/dashboard/components/DashboardHeader.tsx",
                                                lineNumber: 223,
                                                columnNumber: 37
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "p-4 border-t border-gray-200",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    className: "w-full text-center text-xs text-blue-600 hover:text-blue-700 font-medium",
                                                    children: "View all notifications"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/features/dashboard/components/DashboardHeader.tsx",
                                                    lineNumber: 248,
                                                    columnNumber: 41
                                                }, ("TURBOPACK compile-time value", void 0))
                                            }, void 0, false, {
                                                fileName: "[project]/src/features/dashboard/components/DashboardHeader.tsx",
                                                lineNumber: 247,
                                                columnNumber: 37
                                            }, ("TURBOPACK compile-time value", void 0))
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/features/dashboard/components/DashboardHeader.tsx",
                                        lineNumber: 213,
                                        columnNumber: 33
                                    }, ("TURBOPACK compile-time value", void 0))
                                }, void 0, false, {
                                    fileName: "[project]/src/features/dashboard/components/DashboardHeader.tsx",
                                    lineNumber: 211,
                                    columnNumber: 25
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/features/dashboard/components/DashboardHeader.tsx",
                            lineNumber: 196,
                            columnNumber: 21
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "relative",
                            ref: accountMenuRef,
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: ()=>setShowAccountMenu(!showAccountMenu),
                                    className: "flex items-center space-x-3 p-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "w-10 h-10 rounded-full bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center text-white font-semibold",
                                            children: (user === null || user === void 0 ? void 0 : user.name) ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2f$string$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getUserInitials"])(user.name) : 'U'
                                        }, void 0, false, {
                                            fileName: "[project]/src/features/dashboard/components/DashboardHeader.tsx",
                                            lineNumber: 264,
                                            columnNumber: 29
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "hidden md:block text-left",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "text-xs font-medium text-gray-900",
                                                    children: (user === null || user === void 0 ? void 0 : user.name) || 'User'
                                                }, void 0, false, {
                                                    fileName: "[project]/src/features/dashboard/components/DashboardHeader.tsx",
                                                    lineNumber: 270,
                                                    columnNumber: 33
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "text-xs text-gray-500",
                                                    children: (user === null || user === void 0 ? void 0 : user.email) || 'user@example.com'
                                                }, void 0, false, {
                                                    fileName: "[project]/src/features/dashboard/components/DashboardHeader.tsx",
                                                    lineNumber: 271,
                                                    columnNumber: 33
                                                }, ("TURBOPACK compile-time value", void 0))
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/features/dashboard/components/DashboardHeader.tsx",
                                            lineNumber: 269,
                                            columnNumber: 29
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$down$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronDown$3e$__["ChevronDown"], {
                                            className: "hidden md:block w-4 h-4 text-gray-500"
                                        }, void 0, false, {
                                            fileName: "[project]/src/features/dashboard/components/DashboardHeader.tsx",
                                            lineNumber: 274,
                                            columnNumber: 29
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/features/dashboard/components/DashboardHeader.tsx",
                                    lineNumber: 259,
                                    columnNumber: 25
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AnimatePresence"], {
                                    children: showAccountMenu && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                                        initial: {
                                            opacity: 0,
                                            y: -10,
                                            scale: 0.95
                                        },
                                        animate: {
                                            opacity: 1,
                                            y: 0,
                                            scale: 1
                                        },
                                        exit: {
                                            opacity: 0,
                                            y: -10,
                                            scale: 0.95
                                        },
                                        transition: {
                                            duration: 0.2,
                                            ease: "easeOut"
                                        },
                                        className: "absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg border border-gray-200 z-50",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                                                initial: {
                                                    opacity: 0,
                                                    y: -10
                                                },
                                                animate: {
                                                    opacity: 1,
                                                    y: 0
                                                },
                                                transition: {
                                                    delay: 0.1,
                                                    duration: 0.2
                                                },
                                                className: "p-4 border-b border-gray-200",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex items-center space-x-3",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                                                            initial: {
                                                                scale: 0
                                                            },
                                                            animate: {
                                                                scale: 1
                                                            },
                                                            transition: {
                                                                delay: 0.2,
                                                                duration: 0.3,
                                                                type: "spring",
                                                                stiffness: 200
                                                            },
                                                            className: "w-12 h-12 rounded-full bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center text-white font-semibold text-lg",
                                                            children: (user === null || user === void 0 ? void 0 : user.name) ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2f$string$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getUserInitials"])(user.name) : 'U'
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/features/dashboard/components/DashboardHeader.tsx",
                                                            lineNumber: 295,
                                                            columnNumber: 45
                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                    className: "text-sm font-medium text-gray-900",
                                                                    children: (user === null || user === void 0 ? void 0 : user.name) || 'User'
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/features/dashboard/components/DashboardHeader.tsx",
                                                                    lineNumber: 304,
                                                                    columnNumber: 49
                                                                }, ("TURBOPACK compile-time value", void 0)),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                    className: "text-xs text-gray-500",
                                                                    children: (user === null || user === void 0 ? void 0 : user.username) || 'User'
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/features/dashboard/components/DashboardHeader.tsx",
                                                                    lineNumber: 305,
                                                                    columnNumber: 49
                                                                }, ("TURBOPACK compile-time value", void 0))
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/features/dashboard/components/DashboardHeader.tsx",
                                                            lineNumber: 303,
                                                            columnNumber: 45
                                                        }, ("TURBOPACK compile-time value", void 0))
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/features/dashboard/components/DashboardHeader.tsx",
                                                    lineNumber: 294,
                                                    columnNumber: 41
                                                }, ("TURBOPACK compile-time value", void 0))
                                            }, void 0, false, {
                                                fileName: "[project]/src/features/dashboard/components/DashboardHeader.tsx",
                                                lineNumber: 288,
                                                columnNumber: 37
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "py-2",
                                                children: [
                                                    {
                                                        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$user$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__User$3e$__["User"],
                                                        label: 'Profile Settings',
                                                        active: true
                                                    },
                                                    {
                                                        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$mail$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Mail$3e$__["Mail"],
                                                        label: 'Messages'
                                                    },
                                                    {
                                                        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$phone$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Phone$3e$__["Phone"],
                                                        label: 'Support'
                                                    },
                                                    {
                                                        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$map$2d$pin$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__MapPin$3e$__["MapPin"],
                                                        label: 'Location'
                                                    }
                                                ].map((item, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].button, {
                                                        initial: {
                                                            opacity: 0,
                                                            x: -20
                                                        },
                                                        animate: {
                                                            opacity: 1,
                                                            x: 0
                                                        },
                                                        transition: {
                                                            delay: 0.3 + index * 0.05,
                                                            duration: 0.2
                                                        },
                                                        whileHover: {
                                                            x: 4,
                                                            backgroundColor: 'rgba(243, 244, 246, 0.5)'
                                                        },
                                                        whileTap: {
                                                            scale: 0.98
                                                        },
                                                        className: "w-full flex items-center space-x-3 px-4 py-2 text-xs text-gray-700 hover:bg-gray-100 transition-colors ".concat(item.active ? 'bg-gray-50' : ''),
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(item.icon, {
                                                                className: "w-4 h-4"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/features/dashboard/components/DashboardHeader.tsx",
                                                                lineNumber: 328,
                                                                columnNumber: 49
                                                            }, ("TURBOPACK compile-time value", void 0)),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                children: item.label
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/features/dashboard/components/DashboardHeader.tsx",
                                                                lineNumber: 329,
                                                                columnNumber: 49
                                                            }, ("TURBOPACK compile-time value", void 0))
                                                        ]
                                                    }, item.label, true, {
                                                        fileName: "[project]/src/features/dashboard/components/DashboardHeader.tsx",
                                                        lineNumber: 318,
                                                        columnNumber: 45
                                                    }, ("TURBOPACK compile-time value", void 0)))
                                            }, void 0, false, {
                                                fileName: "[project]/src/features/dashboard/components/DashboardHeader.tsx",
                                                lineNumber: 311,
                                                columnNumber: 37
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                                                initial: {
                                                    opacity: 0
                                                },
                                                animate: {
                                                    opacity: 1
                                                },
                                                transition: {
                                                    delay: 0.5,
                                                    duration: 0.2
                                                },
                                                className: "border-t border-gray-200 py-2",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].button, {
                                                    onClick: handleLogout,
                                                    disabled: isLoading,
                                                    whileHover: {
                                                        x: 4,
                                                        backgroundColor: 'rgba(254, 226, 226, 0.5)'
                                                    },
                                                    whileTap: {
                                                        scale: 0.98
                                                    },
                                                    className: "w-full flex items-center space-x-3 px-4 py-2 text-xs text-red-600 hover:bg-red-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed",
                                                    children: [
                                                        isLoading ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "w-4 h-4 border border-red-400 border-t-transparent rounded-full animate-pulse"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/features/dashboard/components/DashboardHeader.tsx",
                                                            lineNumber: 349,
                                                            columnNumber: 49
                                                        }, ("TURBOPACK compile-time value", void 0)) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$log$2d$out$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__LogOut$3e$__["LogOut"], {
                                                            className: "w-4 h-4"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/features/dashboard/components/DashboardHeader.tsx",
                                                            lineNumber: 351,
                                                            columnNumber: 49
                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            children: isLoading ? 'Signing out...' : 'Sign out'
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/features/dashboard/components/DashboardHeader.tsx",
                                                            lineNumber: 353,
                                                            columnNumber: 45
                                                        }, ("TURBOPACK compile-time value", void 0))
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/features/dashboard/components/DashboardHeader.tsx",
                                                    lineNumber: 341,
                                                    columnNumber: 41
                                                }, ("TURBOPACK compile-time value", void 0))
                                            }, void 0, false, {
                                                fileName: "[project]/src/features/dashboard/components/DashboardHeader.tsx",
                                                lineNumber: 335,
                                                columnNumber: 37
                                            }, ("TURBOPACK compile-time value", void 0))
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/features/dashboard/components/DashboardHeader.tsx",
                                        lineNumber: 280,
                                        columnNumber: 33
                                    }, ("TURBOPACK compile-time value", void 0))
                                }, void 0, false, {
                                    fileName: "[project]/src/features/dashboard/components/DashboardHeader.tsx",
                                    lineNumber: 278,
                                    columnNumber: 25
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/features/dashboard/components/DashboardHeader.tsx",
                            lineNumber: 258,
                            columnNumber: 21
                        }, ("TURBOPACK compile-time value", void 0))
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/features/dashboard/components/DashboardHeader.tsx",
                    lineNumber: 185,
                    columnNumber: 17
                }, ("TURBOPACK compile-time value", void 0))
            ]
        }, void 0, true, {
            fileName: "[project]/src/features/dashboard/components/DashboardHeader.tsx",
            lineNumber: 143,
            columnNumber: 13
        }, ("TURBOPACK compile-time value", void 0))
    }, void 0, false, {
        fileName: "[project]/src/features/dashboard/components/DashboardHeader.tsx",
        lineNumber: 134,
        columnNumber: 9
    }, ("TURBOPACK compile-time value", void 0));
};
_s(DashboardHeader, "hHm68voZoebJstqAEF9RjveocgI=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$auth$2f$use$2d$auth$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAuth"]
    ];
});
_c = DashboardHeader;
const __TURBOPACK__default__export__ = DashboardHeader;
var _c;
__turbopack_context__.k.register(_c, "DashboardHeader");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/layout/DashboardLayout.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>DashboardLayout
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$layout$2f$sidebar$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/src/components/layout/sidebar/index.ts [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$layout$2f$sidebar$2f$Sidebar$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Sidebar$3e$__ = __turbopack_context__.i("[project]/src/components/layout/sidebar/Sidebar.tsx [app-client] (ecmascript) <export default as Sidebar>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$navigation$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/src/hooks/navigation/index.ts [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$navigation$2f$use$2d$navigation$2d$handler$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/hooks/navigation/use-navigation-handler.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$navigation$2f$use$2d$active$2d$route$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/hooks/navigation/use-active-route.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$dashboard$2f$components$2f$DashboardHeader$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/features/dashboard/components/DashboardHeader.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
;
;
function DashboardLayout(param) {
    let { children, activeId: manualActiveId } = param;
    _s();
    const [sidebarCollapsed, setSidebarCollapsed] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const { navigateTo } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$navigation$2f$use$2d$navigation$2d$handler$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useNavigationHandler"])();
    const { activeId: detectedActiveId, parentGroupId, breadcrumbs } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$navigation$2f$use$2d$active$2d$route$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useActiveRoute"])();
    const activeId = manualActiveId || detectedActiveId;
    const handleNavigation = (id)=>{
        navigateTo(id);
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "min-h-screen bg-gray-50 text-gray-900",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$layout$2f$sidebar$2f$Sidebar$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Sidebar$3e$__["Sidebar"], {
                activeId: activeId,
                onChange: handleNavigation,
                collapsed: sidebarCollapsed,
                onToggleCollapse: ()=>setSidebarCollapsed(!sidebarCollapsed),
                parentGroupId: parentGroupId
            }, void 0, false, {
                fileName: "[project]/src/components/layout/DashboardLayout.tsx",
                lineNumber: 27,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex flex-col min-h-screen transition-all duration-300 ease-in-out ".concat(sidebarCollapsed ? 'md:ml-20 ml-0' : 'md:ml-64 ml-0'),
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$dashboard$2f$components$2f$DashboardHeader$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                        breadcrumbs: breadcrumbs,
                        onToggleSidebar: ()=>setSidebarCollapsed(!sidebarCollapsed),
                        sidebarCollapsed: sidebarCollapsed
                    }, void 0, false, {
                        fileName: "[project]/src/components/layout/DashboardLayout.tsx",
                        lineNumber: 40,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
                        className: "flex-1 bg-gray-50 p-3 md:p-6 pt-16 md:pt-20",
                        children: children
                    }, void 0, false, {
                        fileName: "[project]/src/components/layout/DashboardLayout.tsx",
                        lineNumber: 45,
                        columnNumber: 17
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/layout/DashboardLayout.tsx",
                lineNumber: 34,
                columnNumber: 13
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/layout/DashboardLayout.tsx",
        lineNumber: 26,
        columnNumber: 9
    }, this);
}
_s(DashboardLayout, "IGkyLOuS60BtmRUhUV4Berb+i2I=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$navigation$2f$use$2d$navigation$2d$handler$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useNavigationHandler"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$navigation$2f$use$2d$active$2d$route$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useActiveRoute"]
    ];
});
_c = DashboardLayout;
var _c;
__turbopack_context__.k.register(_c, "DashboardLayout");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/features/auth/components/ProtectedRoute.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>ProtectedRoute
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$contexts$2f$AuthContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/contexts/AuthContext.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
function ProtectedRoute(param) {
    let { children, fallback } = param;
    _s();
    const { isAuthenticated, isLoading } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$contexts$2f$AuthContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAuthContext"])();
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "ProtectedRoute.useEffect": ()=>{
            if (!isLoading && !isAuthenticated) {
                window.location.href = '/login';
            }
        }
    }["ProtectedRoute.useEffect"], [
        isAuthenticated,
        isLoading
    ]);
    // Show loading skeleton while checking authentication
    if (isLoading) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "min-h-screen flex items-center justify-center bg-gray-50",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "text-center",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "w-8 h-8 border-2 border-emerald-600 border-t-transparent rounded-full mx-auto mb-4 animate-pulse"
                    }, void 0, false, {
                        fileName: "[project]/src/features/auth/components/ProtectedRoute.tsx",
                        lineNumber: 26,
                        columnNumber: 21
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-gray-600",
                        children: "Loading..."
                    }, void 0, false, {
                        fileName: "[project]/src/features/auth/components/ProtectedRoute.tsx",
                        lineNumber: 27,
                        columnNumber: 21
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/features/auth/components/ProtectedRoute.tsx",
                lineNumber: 25,
                columnNumber: 17
            }, this)
        }, void 0, false, {
            fileName: "[project]/src/features/auth/components/ProtectedRoute.tsx",
            lineNumber: 24,
            columnNumber: 13
        }, this);
    }
    // Show fallback or redirect if not authenticated
    if (!isAuthenticated) {
        return fallback || /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "min-h-screen flex items-center justify-center bg-gray-50",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "text-center",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    className: "text-gray-600",
                    children: "Redirecting to login..."
                }, void 0, false, {
                    fileName: "[project]/src/features/auth/components/ProtectedRoute.tsx",
                    lineNumber: 38,
                    columnNumber: 21
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/features/auth/components/ProtectedRoute.tsx",
                lineNumber: 37,
                columnNumber: 17
            }, this)
        }, void 0, false, {
            fileName: "[project]/src/features/auth/components/ProtectedRoute.tsx",
            lineNumber: 36,
            columnNumber: 13
        }, this);
    }
    // Render protected content
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
        children: children
    }, void 0, false);
}
_s(ProtectedRoute, "GhOK0ksQk1/f/z2fWaELMWP0hd8=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$contexts$2f$AuthContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAuthContext"]
    ];
});
_c = ProtectedRoute;
var _c;
__turbopack_context__.k.register(_c, "ProtectedRoute");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=src_a8278f11._.js.map