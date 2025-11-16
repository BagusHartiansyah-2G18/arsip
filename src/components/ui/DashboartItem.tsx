import { IDitem } from "@/types";
import { Link, Megaphone } from "lucide-react";

export default function DashboardItem({dt,judul}:{dt:IDitem[], judul:string}) { 
    return (
                    dt && dt.length >0
                    && 
                    <>
                        {/* Upcoming Announcements Section */}
                        <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-4" style={{ height:"fit-content" }}>
                            <div className="flex items-center justify-between mb-3">
                                <div className="flex items-center gap-2">
                                    <Megaphone className="w-4 h-4 text-emerald-600" />
                                    <h3 className="text-sm font-semibold text-gray-900">
                                        {judul} {dt.length}
                                    </h3>
                                </div>
                                <Link
                                    href="/announcements"
                                    className="text-xs text-emerald-600 hover:text-emerald-700 font-medium transition-colors"
                                >
                                    View All
                                </Link>
                            </div>
                            <div className="space-y-2">
                                {dt.map((v, index) => (
                                        <div key={index} className="bg-gray-50 rounded-lg p-3 border border-gray-100 hover:shadow-sm transition-shadow">
                                            <div className="flex items-start gap-3">
                                                <div className="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center flex-shrink-0">
                                                    <Megaphone className="w-4 h-4 text-emerald-600" />
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <h4 className="text-sm font-medium text-gray-900 truncate">{v.nama}</h4>
                                                    <p className="text-xs text-gray-600 mt-1 line-clamp-2">
                                                        {v.total} Data
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    )) 
                                }
                            </div>
                        </div>

                        
                    </>
                )
}