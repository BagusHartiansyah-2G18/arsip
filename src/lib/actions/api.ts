'use server';

import { API_ENDPOINT } from "../api/config";
import { API_ROUTES } from "../constants/routes";



export async function fetchData<T>(endpoint: string, token: string): Promise<T> {
    const url = `${API_ENDPOINT}/${endpoint}`;
    const method = 'GET';

    try {
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': "Bearer " + token?.replace(/"/g, ''),
        };

        // console.log('🔍 [FETCH DATA] Request Details:', {
        //     url,
        //     method,
        //     headers: {
        //         'Content-Type': headers['Content-Type'],
        //         'Authorization': headers['Authorization'] ? 'Bearer [TOKEN_PROVIDED]' : 'No token'
        //     },
        //     cache: 'no-store',
        //     timestamp: new Date().toISOString()
        // });
       
        const response = await fetch(url, {
            headers,
            cache: 'no-store',
            credentials: "include",
        }); 
        
        console.log('📥 [FETCH DATA] Response Details:', {
            url,
            method,
            status: response.status,
            statusText: response.statusText,
            ok: response.ok,
            headers: Object.fromEntries(response.headers.entries()),
            timestamp: new Date().toISOString()
        });

        const data = await response.json();
        
        // Check if response contains error
        if ((data && typeof data === 'object' && 'statusError' in data && data.statusError )|| data.error) {
            console.log('🚨 [FETCH DATA] Server Error Response:', data);
             
            // console.log('🚨 [FETCH DATA] Server Error Response:', {
            //     url,
            //     method,
            //     statusCode: data.statusCode,
            //     statusError: data.statusError,
            //     statusMessage: data.statusMessage,
            //     statusText: data.statusText,
            //     timestamp: new Date().toISOString()
            // });
        } else {
            
            console.log('✅ [FETCH DATA] Success:', {
                url,
                method,
                dataLength: Array.isArray(data) ? data.length : 'Not an array',
                timestamp: new Date().toISOString()
            });
        }

        return data;
    } catch (error) {
        console.log('❌ [FETCH DATA] Error:', {
            url,
            method,
            error: error instanceof Error ? error.message : error,
            timestamp: new Date().toISOString()
        });
        throw error;
    }
}

export async function fetchDataWithCookies<T>(endpoint: string, token: string, cookie:string): Promise<T> {
    const url = `${API_ENDPOINT}/${endpoint}`;
    
    // Ambil cookie dari request
    // const cookie = req.headers.get('cookie') || '';

    const headers = {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token?.replace(/"/g, ''),
        'cookie': cookie, // kirim cookie ke API
    };

    const response = await fetch(url, {
        method: 'GET',
        headers,
        cache: 'no-store',
    });

    const data = await response.json();
    return data;
}
export async function authLogin(formData: FormData): Promise<{
    statusCode: number;
    statusError: boolean; 
    statusText: string;
    data: string;
}> {
    const url = `${API_ENDPOINT}/${API_ROUTES.AUTH.LOGIN}`;
    const method = 'POST';
     
    try {
        // Log form data entries (without sensitive data like passwords)
        const formDataEntries: Record<string, string> = {};
        for (const [key, value] of formData.entries()) {
            if (key.toLowerCase().includes('password')) {
                formDataEntries[key] = '[PASSWORD_HIDDEN]';
            } else {
                formDataEntries[key] = typeof value === 'string' ? value : `[FILE: ${value.name}, ${value.size} bytes, ${value.type}]`;
            }
        }

        console.log('🔍 [AUTH LOGIN] Request Details:', {
            url,
            method,
            body: formDataEntries,
            timestamp: new Date().toISOString()
        }); 
          
        const response = await fetch(url, {
            method,
            body: JSON.stringify(Object.fromEntries(formData)),
        });  
        console.log('📥 [AUTH LOGIN] Response Details:', {
            url,
            method,
            status: response.status,
            statusText: response.statusText,
            ok: response.ok,
            headers: Object.fromEntries(response.headers.entries()),
            timestamp: new Date().toISOString()
        });

        console.log(response);
        
        const data = await response.json(); 
        
        // Check if response contains error
        if (data && typeof data === 'object' && 'statusError' in data && data.statusError) {
            console.log('🚨 [AUTH LOGIN] Server Error Response:', {
                url,
                method,
                statusCode: data.statusCode,
                statusError: data.statusError,
                statusMessage: data.statusMessage,
                statusText: data.statusText,
                timestamp: new Date().toISOString()
            });
        } else {
            console.log('✅ [AUTH LOGIN] Success:', {
                url,
                method,
                statusCode: data.statusCode,
                statusError: data.statusError,
                statusMessage: data.statusMessage,
                hasToken: !!data.data,
                timestamp: new Date().toISOString()
            });
        }

        return {
            statusCode: response.status,
            statusError: !response.ok,
            statusText: response.statusText,
            data: data,
        };
    } catch (error) {
        console.log('❌ [AUTH LOGIN] Error:', {
            url,
            method,
            error: error instanceof Error ? error.message : error,
            timestamp: new Date().toISOString()
        });
        throw error;
    }
}
export async function createItem<T>(endpoint: string, formData: FormData, token: string): Promise<T> {
    const url = `${API_ENDPOINT}/${endpoint}`;
    const method = 'POST';

    try {
        const headers = {
            'Authorization': "Bearer " + token?.replace(/"/g, ''),
        };

        // Log form data entries (without sensitive data)
        const formDataEntries: Record<string, string> = {};
        for (const [key, value] of formData.entries()) {
            if (value instanceof File) {
                formDataEntries[key] = `[FILE: ${value.name}, ${value.size} bytes, ${value.type}]`;
            } else {
                formDataEntries[key] = value;
            }
        }

        console.log('🔍 [CREATE ITEM] Request Details:', {
            url,
            method,
            headers: {
                'Authorization': headers['Authorization'] ? 'Bearer [TOKEN_PROVIDED]' : 'No token'
            },
            body: formDataEntries,
            timestamp: new Date().toISOString()
        });

        const response = await fetch(url, {
            method,
            headers,
            body:JSON.stringify(formDataEntries),
        });

        console.log('📥 [CREATE ITEM] Response Details:', {
            url,
            method,
            status: response.status,
            statusText: response.statusText,
            ok: response.ok,
            headers: Object.fromEntries(response.headers.entries()),
            timestamp: new Date().toISOString()
        });

        const data = await response.json(); 
        if(data.success === false || data.error!=undefined){
            throw new Error(data.error || 'Failed to create item');
        }
        // Check if response contains error
        if (data && typeof data === 'object' && 'statusError' in data && data.statusError) {
            console.log('🚨 [CREATE ITEM] Server Error Response:', {
                url,
                method,
                statusCode: data.statusCode,
                statusError: data.statusError,
                statusMessage: data.statusMessage,
                statusText: data.statusText,
                timestamp: new Date().toISOString()
            });
        } else {
            console.log('✅ [CREATE ITEM] Success:', {
                url,
                method,
                responseData: data,
                timestamp: new Date().toISOString()
            });
        }

        return data;
    } catch (error) {
        console.log('❌ [CREATE ITEM] Error:', {
            url,
            method,
            error: error instanceof Error ? error.message : error,
            timestamp: new Date().toISOString()
        });
        throw error;
    }
}

export async function updateItem<T>(endpoint: string, id: string | number, formData: FormData, token: string): Promise<T> {
    const url = `${API_ENDPOINT}/${endpoint}/${id}`;
    const method = 'PUT';

    try {
        const headers = {
            'Authorization': "Bearer " + token?.replace(/"/g, ''),
        };  
        
        // Log form data entries (without sensitive data)
        const formDataEntries: Record<string, string> = {};
        for (const [key, value] of formData.entries()) {
            if (value instanceof File) {
                formDataEntries[key] = `[FILE: ${value.name}, ${value.size} bytes, ${value.type}]`;
            } else {
                formDataEntries[key] = value;
            }
        }

        console.log('🔍 [UPDATE ITEM] Request Details:', {
            url,
            method,
            id,
            headers: {
                'Authorization': headers['Authorization'] ? 'Bearer [TOKEN_PROVIDED]' : 'No token'
            },
            body: formDataEntries,
            timestamp: new Date().toISOString()
        });

        const response = await fetch(url, {
            method,
            headers,
            body: formData,
        });

        console.log('📥 [UPDATE ITEM] Response Details:', {
            url,
            method,
            id,
            status: response.status,
            statusText: response.statusText,
            ok: response.ok,
            headers: Object.fromEntries(response.headers.entries()),
            timestamp: new Date().toISOString()
        });

        const data = await response.json();
        if(data.success === false || data.error!=undefined){
            throw new Error(data.error || 'Failed to create item');
        }
        // Check if response contains error
        if (data && typeof data === 'object' && 'statusError' in data && data.statusError) {
            console.log('🚨 [UPDATE ITEM] Server Error Response:', {
                url,
                method,
                id,
                statusCode: data.statusCode,
                statusError: data.statusError,
                statusMessage: data.statusMessage,
                statusText: data.statusText,
                timestamp: new Date().toISOString()
            });
        } else {
            console.log('✅ [UPDATE ITEM] Success:', {
                url,
                method,
                id,
                responseData: data,
                timestamp: new Date().toISOString()
            });
        }

        return data;
    } catch (error) {
        console.log('❌ [UPDATE ITEM] Error:', {
            url,
            method,
            id,
            error: error instanceof Error ? error.message : error,
            timestamp: new Date().toISOString()
        });
        throw error;
    }
}

export async function deleteItem(endpoint: string, id: string | number, token: string): Promise<void> {
    const url = `${API_ENDPOINT}/${endpoint}/${id}`;
    const method = 'DELETE';

    try {
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': "Bearer " + token?.replace(/"/g, ''),
        };

        console.log('🔍 [DELETE ITEM] Request Details:', {
            url,
            method,
            id,
            headers: {
                'Content-Type': headers['Content-Type'],
                'Authorization': headers['Authorization'] ? 'Bearer [TOKEN_PROVIDED]' : 'No token'
            },
            timestamp: new Date().toISOString()
        });

        const response = await fetch(url, {
            method,
            headers,
        });

        console.log('📥 [DELETE ITEM] Response Details:', {
            url,
            method,
            id,
            status: response.status,
            statusText: response.statusText,
            ok: response.ok,
            headers: Object.fromEntries(response.headers.entries()),
            timestamp: new Date().toISOString()
        });

        try {
            const responseData = await response.json();

            // Check if response contains error
            if (responseData && typeof responseData === 'object' && 'statusError' in responseData && responseData.statusError) {
                console.log('🚨 [DELETE ITEM] Server Error Response:', {
                    url,
                    method,
                    id,
                    statusCode: responseData.statusCode,
                    statusError: responseData.statusError,
                    statusMessage: responseData.statusMessage,
                    statusText: responseData.statusText,
                    timestamp: new Date().toISOString()
                });
            } else {
                console.log('✅ [DELETE ITEM] Success:', {
                    url,
                    method,
                    id,
                    responseData,
                    timestamp: new Date().toISOString()
                });
            }
        } catch {
            console.log('✅ [DELETE ITEM] Success (no response body):', {
                url,
                method,
                id,
                timestamp: new Date().toISOString()
            });
        }
    } catch (error) {
        console.log('❌ [DELETE ITEM] Error:', {
            url,
            method,
            id,
            error: error instanceof Error ? error.message : error,
            timestamp: new Date().toISOString()
        });
        throw error;
    }
}

// Authentication-specific server actions
// export async function authLogin(formData: FormData): Promise<{
//     statusCode: number;
//     statusError: boolean;
//     statusMessage: string;
//     statusText: string;
//     data: string;
// }> {
//     const url = `${API_ENDPOINT}/${API_ROUTES.AUTH.LOGIN}`;
//     const method = 'POST';

//     try {
//         // Log form data entries (without sensitive data like passwords)
//         const formDataEntries: Record<string, string> = {};
//         for (const [key, value] of formData.entries()) {
//             if (key.toLowerCase().includes('password')) {
//                 formDataEntries[key] = '[PASSWORD_HIDDEN]';
//             } else {
//                 formDataEntries[key] = typeof value === 'string' ? value : `[FILE: ${value.name}, ${value.size} bytes, ${value.type}]`;
//             }
//         }

//         console.log('🔍 [AUTH LOGIN] Request Details:', {
//             url,
//             method,
//             body: formDataEntries,
//             timestamp: new Date().toISOString()
//         }); 
        
        
//         const response = await fetch(url, {
//             method,
//             body: formData,
//         });

//         console.log('📥 [AUTH LOGIN] Response Details:', {
//             url,
//             method,
//             status: response.status,
//             statusText: response.statusText,
//             ok: response.ok,
//             headers: Object.fromEntries(response.headers.entries()),
//             timestamp: new Date().toISOString()
//         });

//         const data = await response.json();

//         // Check if response contains error
//         if (data && typeof data === 'object' && 'statusError' in data && data.statusError) {
//             console.log('🚨 [AUTH LOGIN] Server Error Response:', {
//                 url,
//                 method,
//                 statusCode: data.statusCode,
//                 statusError: data.statusError,
//                 statusMessage: data.statusMessage,
//                 statusText: data.statusText,
//                 timestamp: new Date().toISOString()
//             });
//         } else {
//             console.log('✅ [AUTH LOGIN] Success:', {
//                 url,
//                 method,
//                 statusCode: data.statusCode,
//                 statusError: data.statusError,
//                 statusMessage: data.statusMessage,
//                 hasToken: !!data.data,
//                 timestamp: new Date().toISOString()
//             });
//         }

//         return data;
//     } catch (error) {
//         console.log('❌ [AUTH LOGIN] Error:', {
//             url,
//             method,
//             error: error instanceof Error ? error.message : error,
//             timestamp: new Date().toISOString()
//         });
//         throw error;
//     }
// }

export async function authRegister(formData: FormData): Promise<{
    statusCode: number;
    statusError: boolean;
    statusMessage: string;
    statusText: string;
    data: {
        id: string;
        username: string;
    };
}> {
    const url = `${API_ENDPOINT}/${API_ROUTES.AUTH.REGISTER}`;
    const method = 'POST';

    try {
        // Log form data entries (without sensitive data like passwords)
        const formDataEntries: Record<string, string> = {};
        for (const [key, value] of formData.entries()) {
            if (key.toLowerCase().includes('password')) {
                formDataEntries[key] = '[PASSWORD_HIDDEN]';
            } else {
                formDataEntries[key] = typeof value === 'string' ? value : `[FILE: ${value.name}, ${value.size} bytes, ${value.type}]`;
            }
        }

        console.log('🔍 [AUTH REGISTER] Request Details:', {
            url,
            method,
            body: formDataEntries,
            timestamp: new Date().toISOString()
        });

        const response = await fetch(url, {
            method,
            body: formData,
        });

        console.log('📥 [AUTH REGISTER] Response Details:', {
            url,
            method,
            status: response.status,
            statusText: response.statusText,
            ok: response.ok,
            headers: Object.fromEntries(response.headers.entries()),
            timestamp: new Date().toISOString()
        });

        const data = await response.json();

        // Check if response contains error
        if (data && typeof data === 'object' && 'statusError' in data && data.statusError) {
            console.log('🚨 [AUTH REGISTER] Server Error Response:', {
                url,
                method,
                statusCode: data.statusCode,
                statusError: data.statusError,
                statusMessage: data.statusMessage,
                statusText: data.statusText,
                timestamp: new Date().toISOString()
            });
        } else {
            console.log('✅ [AUTH REGISTER] Success:', {
                url,
                method,
                statusCode: data.statusCode,
                statusError: data.statusError,
                statusMessage: data.statusMessage,
                userId: data.data?.id,
                username: data.data?.username,
                timestamp: new Date().toISOString()
            });
        }

        return data;
    } catch (error) {
        console.log('❌ [AUTH REGISTER] Error:', {
            url,
            method,
            error: error instanceof Error ? error.message : error,
            timestamp: new Date().toISOString()
        });
        throw error;
    }
}

export async function authVerifyToken(token: string): Promise<boolean> {
    const url = `${API_ENDPOINT}/${API_ROUTES.AUTH.VERIFY}`;
    const method = 'GET';

    try {
        const headers = {
            'Authorization': "Bearer " + token?.replace(/"/g, ''),
            'Content-Type': 'application/json',
        };

        console.log('🔍 [AUTH VERIFY TOKEN] Request Details:', {
            url,
            method,
            headers: {
                'Content-Type': headers['Content-Type'],
                'Authorization': headers['Authorization'] ? 'Bearer [TOKEN_PROVIDED]' : 'No token'
            },
            timestamp: new Date().toISOString()
        });

        const response = await fetch(url, {
            method,
            headers,
        });

        console.log('📥 [AUTH VERIFY TOKEN] Response Details:', {
            url,
            method,
            status: response.status,
            statusText: response.statusText,
            ok: response.ok,
            headers: Object.fromEntries(response.headers.entries()),
            timestamp: new Date().toISOString()
        });

        const isValid = response.ok;

        console.log('✅ [AUTH VERIFY TOKEN] Result:', {
            url,
            method,
            isValid,
            timestamp: new Date().toISOString()
        });

        return isValid;
    } catch (error) {
        console.log('❌ [AUTH VERIFY TOKEN] Error:', {
            url,
            method,
            error: error instanceof Error ? error.message : error,
            timestamp: new Date().toISOString()
        });

        return false;
    }
}

export async function authLogout(token: string): Promise<void> {
    const url = `${API_ENDPOINT}/${API_ROUTES.AUTH.LOGOUT}`;
    const method = 'POST';

    try {
        const headers = {
            'Authorization': "Bearer " + token?.replace(/"/g, ''),
            'Content-Type': 'application/json',
        };

        console.log('🔍 [AUTH LOGOUT] Request Details:', {
            url,
            method,
            headers: {
                'Content-Type': headers['Content-Type'],
                'Authorization': headers['Authorization'] ? 'Bearer [TOKEN_PROVIDED]' : 'No token'
            },
            timestamp: new Date().toISOString()
        });

        const response = await fetch(url, {
            method,
            headers,
        });

        console.log('📥 [AUTH LOGOUT] Response Details:', {
            url,
            method,
            status: response.status,
            statusText: response.statusText,
            ok: response.ok,
            headers: Object.fromEntries(response.headers.entries()),
            timestamp: new Date().toISOString()
        });

        console.log('✅ [AUTH LOGOUT] Success:', {
            url,
            method,
            timestamp: new Date().toISOString()
        });
    } catch (error) {
        // Don't throw error for logout as it's not critical
        console.log('❌ [AUTH LOGOUT] Error (non-critical):', {
            url,
            method,
            error: error instanceof Error ? error.message : error,
            timestamp: new Date().toISOString()
        });
    }
}

export async function authRefreshToken(formData: FormData): Promise<{
    statusCode: number;
    statusError: boolean;
    statusMessage: string;
    statusText: string;
    data: string;
}> {
    const url = `${API_ENDPOINT}/${API_ROUTES.AUTH.REFRESH}`;
    const method = 'POST';

    try {
        // Log form data entries (without sensitive data like tokens)
        const formDataEntries: Record<string, string> = {};
        for (const [key, value] of formData.entries()) {
            if (key.toLowerCase().includes('token') || key.toLowerCase().includes('refresh')) {
                formDataEntries[key] = '[TOKEN_HIDDEN]';
            } else {
                formDataEntries[key] = typeof value === 'string' ? value : `[FILE: ${value.name}, ${value.size} bytes, ${value.type}]`;
            }
        }

        console.log('🔍 [AUTH REFRESH TOKEN] Request Details:', {
            url,
            method,
            body: formDataEntries,
            timestamp: new Date().toISOString()
        });

        const response = await fetch(url, {
            method,
            body: formData,
        });

        console.log('📥 [AUTH REFRESH TOKEN] Response Details:', {
            url,
            method,
            status: response.status,
            statusText: response.statusText,
            ok: response.ok,
            headers: Object.fromEntries(response.headers.entries()),
            timestamp: new Date().toISOString()
        });

        const data = await response.json();

        // Check if response contains error
        if (data && typeof data === 'object' && 'statusError' in data && data.statusError) {
            console.log('🚨 [AUTH REFRESH TOKEN] Server Error Response:', {
                url,
                method,
                statusCode: data.statusCode,
                statusError: data.statusError,
                statusMessage: data.statusMessage,
                statusText: data.statusText,
                timestamp: new Date().toISOString()
            });
        } else {
            console.log('✅ [AUTH REFRESH TOKEN] Success:', {
                url,
                method,
                statusCode: data.statusCode,
                statusError: data.statusError,
                statusMessage: data.statusMessage,
                hasNewToken: !!data.data,
                timestamp: new Date().toISOString()
            });
        }

        return data;
    } catch (error) {
        console.log('❌ [AUTH REFRESH TOKEN] Error:', {
            url,
            method,
            error: error instanceof Error ? error.message : error,
            timestamp: new Date().toISOString()
        });
        throw error;
    }
}
