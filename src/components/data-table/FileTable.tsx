'use client'

import React, { useState } from 'react';
import { Search, Grid3X3, List, MoreHorizontal, File, Image, Video, Music, FileText, Filter } from 'lucide-react';
import { motion } from 'framer-motion';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { FileItem } from '@/types/api';

interface FileTableProps {
    files?: FileItem[];
    // eslint-disable-next-line no-unused-vars
    onFileSelect?: (file: FileItem) => void;
    // eslint-disable-next-line no-unused-vars
    onFileAction?: (file: FileItem, action: string) => void;
}

const FileTable: React.FC<FileTableProps> = ({
    files = [],
    onFileSelect,
    onFileAction
}) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [viewMode, setViewMode] = useState<'list' | 'grid'>('list');
    const [selectedFile, setSelectedFile] = useState<string | null>(null);
    const [filterDrawerOpened, setFilterDrawerOpened] = useState(false);
    const [fileTypeFilter, setFileTypeFilter] = useState<string | null>(null);
    const [fileSizeFilter, setFileSizeFilter] = useState<string | null>(null);
    const [fromDate, setFromDate] = useState('');
    const [toDate, setToDate] = useState('');

    // Mock data
    const mockFiles: FileItem[] = [
        {
            id: '1',
            name: 'document.pdf',
            uploaded: 'Sep 26, 2025',
            lastModified: 'Sep 28, 2025',
            fileSize: '5 MB',
            type: 'document'
        },
        {
            id: '2',
            name: 'presentation.pptx',
            uploaded: 'Sep 27, 2025',
            lastModified: 'Sep 27, 2025',
            fileSize: '1.2 MB',
            type: 'document'
        },
        {
            id: '3',
            name: 'video.mp4',
            uploaded: 'Sep 27, 2025',
            lastModified: 'Sep 28, 2025',
            fileSize: '1 GB',
            type: 'video'
        },
        {
            id: '4',
            name: 'image.jpg',
            uploaded: 'Sep 27, 2025',
            lastModified: 'Sep 28, 2025',
            fileSize: '20 MB',
            type: 'image'
        },
        {
            id: '5',
            name: 'audio.mp3',
            uploaded: 'Sep 25, 2025',
            lastModified: 'Sep 26, 2025',
            fileSize: '8.5 MB',
            type: 'audio'
        }
    ];

    const displayFiles = files.length > 0 ? files : mockFiles;

    const filteredFiles = displayFiles.filter(file =>
        file.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleFileClick = (file: FileItem) => {
        setSelectedFile(String(file.id));
        onFileSelect?.(file);
    };

    const handleFileAction = (file: FileItem, action: string) => {
        onFileAction?.(file, action);
    };

    const getFileIcon = (type: string) => {
        switch (type) {
            case 'image':
                {/* eslint-disable-next-line jsx-a11y/alt-text */ }
                return <Image className="w-5 h-5 text-green-500" />;
            case 'video':
                return <Video className="w-5 h-5 text-red-500" />;
            case 'audio':
                return <Music className="w-5 h-5 text-purple-500" />;
            case 'document':
                return <FileText className="w-5 h-5 text-blue-500" />;
            default:
                return <File className="w-5 h-5 text-gray-500" />;
        }
    };

    const getFileTypeColor = (type: string) => {
        switch (type) {
            case 'image':
                return 'bg-green-50 border-green-200';
            case 'video':
                return 'bg-red-50 border-red-200';
            case 'audio':
                return 'bg-purple-50 border-purple-200';
            case 'document':
                return 'bg-blue-50 border-blue-200';
            default:
                return 'bg-gray-50 border-gray-200';
        }
    };

    return (
        <div className="bg-white rounded-lg border border-gray-200 ">
            {/* Header with Search and Controls */}
            <div className="p-6 border-b border-gray-200">
                {/* Welcome Message */}
                <div className="mb-4">
                    <h2 className="text-lg font-semibold text-gray-900">Hello, Siren.uix</h2>
                    <p className="text-sm text-gray-600">Welcome back and explore the world</p>
                </div>

                {/* Search Section */}
                <div className="flex items-center justify-end gap-2">
                    {/* Condensed Controls Container */}
                    <div className="flex items-center gap-2">
                        {/* Search Input (fixed width 150px) */}
                        <div className="relative" style={{ width: 150 }}>
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Search"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full h-8 pl-9 pr-3 bg-white border border-gray-200 rounded-md outline-none text-xs placeholder-gray-400 focus:outline-none focus:ring-0 focus:border-gray-200"
                            />
                        </div>

                        {/* Filter Button */}
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => setFilterDrawerOpened(true)}
                            className="flex items-center justify-center w-8 h-8 bg-emerald-500 hover:bg-emerald-600 text-white rounded-md transition-colors"
                            title="Filter"
                        >
                            <Filter className="w-4 h-4" />
                        </motion.button>

                        {/* Search Button */}
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="h-8 px-4 bg-emerald-500 hover:bg-emerald-600 text-white font-medium rounded-md transition-colors whitespace-nowrap text-xs"
                        >
                            Search
                        </motion.button>

                        {/* View Toggle Switch */}
                        <div className="flex items-center bg-gray-100 rounded-md p-1 h-8">
                            {/* List View Option */}
                            <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                onClick={() => setViewMode('list')}
                                className={`flex items-center justify-center w-6 h-6 rounded transition-colors ${viewMode === 'list'
                                    ? 'bg-white text-emerald-600'
                                    : 'text-gray-600 hover:text-gray-800'
                                    }`}
                                title="List View"
                            >
                                <List className="w-4 h-4" />
                            </motion.button>

                            {/* Grid View Option */}
                            <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                onClick={() => setViewMode('grid')}
                                className={`flex items-center justify-center w-6 h-6 rounded transition-colors ${viewMode === 'grid'
                                    ? 'bg-white text-emerald-600'
                                    : 'text-gray-600 hover:text-gray-800'
                                    }`}
                                title="Grid View"
                            >
                                <Grid3X3 className="w-4 h-4" />
                            </motion.button>
                        </div>
                    </div>
                </div>
            </div>

            {/* List View */}
            {viewMode === 'list' && (
                <>
                    {/* Table Headers */}
                    <div className="px-4 py-3 bg-gray-50 border-b border-gray-200">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-8 text-xs font-medium text-gray-600 uppercase tracking-wider">
                                <span className="w-32">UPLOADED</span>
                                <span className="w-32">LAST MODIFIED</span>
                                <span className="w-24">FILE SIZE</span>
                            </div>
                            <MoreHorizontal className="w-4 h-4 text-gray-400" />
                        </div>
                    </div>

                    {/* File List */}
                    <div className="divide-y divide-gray-200">
                        {filteredFiles.map((file, index) => (
                            <motion.div
                                key={file.id}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.05, duration: 0.2 }}
                                className={`px-4 py-3 hover:bg-gray-50 cursor-pointer transition-colors ${selectedFile === file.id ? 'bg-blue-50 border-l-4 border-l-blue-500' : ''
                                    }`}
                                onClick={() => handleFileClick(file)}
                            >
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center space-x-8 text-sm text-gray-900">
                                        <span className="w-32 font-medium">{file.uploaded}</span>
                                        <span className="w-32">{file.lastModified}</span>
                                        <span className="w-24">{file.fileSize}</span>
                                    </div>
                                    <motion.button
                                        whileHover={{ scale: 1.1 }}
                                        whileTap={{ scale: 0.9 }}
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            handleFileAction(file, 'more');
                                        }}
                                        className="h-8 w-8 p-0 rounded-md hover:bg-gray-100 transition-colors flex items-center justify-center text-gray-400 hover:text-gray-600"
                                    >
                                        <MoreHorizontal className="w-4 h-4" />
                                    </motion.button>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </>
            )}

            {/* Grid View */}
            {viewMode === 'grid' && (
                <div className="p-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                        {filteredFiles.map((file, index) => (
                            <motion.div
                                key={file.id}
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: index * 0.05, duration: 0.2 }}
                                className={`relative p-4 border-2 rounded-lg cursor-pointer transition-all duration-200 hover:shadow-md ${selectedFile === file.id
                                    ? 'border-blue-500 bg-blue-50 shadow-md'
                                    : 'border-gray-200 hover:border-gray-300'
                                    }`}
                                onClick={() => handleFileClick(file)}
                            >
                                {/* File Icon */}
                                <div className="flex justify-center mb-3">
                                    <div className={`p-3 rounded-lg border ${getFileTypeColor(file.type)}`}>
                                        {getFileIcon(file.type)}
                                    </div>
                                </div>

                                {/* File Name */}
                                <div className="text-center mb-2">
                                    <h3 className="text-sm font-medium text-gray-900 truncate" title={file.name}>
                                        {file.name}
                                    </h3>
                                </div>

                                {/* File Details */}
                                <div className="text-center text-xs text-gray-500 space-y-1">
                                    <div>Uploaded: {file.uploaded}</div>
                                    <div>Modified: {file.lastModified}</div>
                                    <div className="font-medium text-gray-700">{file.fileSize}</div>
                                </div>

                                {/* More Actions Button */}
                                <motion.button
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.9 }}
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        handleFileAction(file, 'more');
                                    }}
                                    className="absolute top-2 right-2 p-1 text-gray-400 hover:text-gray-600 rounded transition-colors"
                                >
                                    <MoreHorizontal className="w-4 h-4" />
                                </motion.button>
                            </motion.div>
                        ))}
                    </div>
                </div>
            )}

            {/* Empty State */}
            {filteredFiles.length === 0 && (
                <div className="p-8 text-center">
                    <div className="text-gray-400 mb-2">
                        <Search className="w-12 h-12 mx-auto" />
                    </div>
                    <p className="text-gray-500 text-sm">No files found matching your search.</p>
                </div>
            )}

            {/* Filter Drawer */}
            <Sheet open={filterDrawerOpened} onOpenChange={setFilterDrawerOpened}>
                <SheetContent side="right" className="w-[400px] sm:w-[540px]">
                    <SheetHeader>
                        <SheetTitle>Filter Files</SheetTitle>
                    </SheetHeader>
                    <div className="p-4 space-y-4">
                        {/* File Type Filter */}
                        <div>
                            <Label htmlFor="file-type">File Type</Label>
                            <Select
                                value={fileTypeFilter || ''}
                                onValueChange={setFileTypeFilter}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Select file type" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">All Files</SelectItem>
                                    <SelectItem value="image">Images</SelectItem>
                                    <SelectItem value="video">Videos</SelectItem>
                                    <SelectItem value="audio">Audio</SelectItem>
                                    <SelectItem value="document">Documents</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        {/* Date Range Filter */}
                        <div>
                            <Label htmlFor="from-date">From Date</Label>
                            <Input
                                id="from-date"
                                type="date"
                                value={fromDate}
                                onChange={(e) => setFromDate(e.target.value)}
                            />
                        </div>

                        <div>
                            <Label htmlFor="to-date">To Date</Label>
                            <Input
                                id="to-date"
                                type="date"
                                value={toDate}
                                onChange={(e) => setToDate(e.target.value)}
                            />
                        </div>

                        {/* File Size Filter */}
                        <div>
                            <Label htmlFor="file-size">File Size</Label>
                            <Select
                                value={fileSizeFilter || ''}
                                onValueChange={setFileSizeFilter}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Select file size" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">All Sizes</SelectItem>
                                    <SelectItem value="small">Small (&lt; 1 MB)</SelectItem>
                                    <SelectItem value="medium">Medium (1-10 MB)</SelectItem>
                                    <SelectItem value="large">Large (&gt; 10 MB)</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex space-x-2 pt-3 border-t border-gray-200 mt-3">
                            <Button
                                variant="outline"
                                onClick={() => {
                                    setFileTypeFilter(null);
                                    setFileSizeFilter(null);
                                    setFromDate('');
                                    setToDate('');
                                }}
                                className="flex-1 h-8 text-xs rounded-md hover:bg-gray-100 transition-colors"
                            >
                                Clear All
                            </Button>
                            <Button
                                onClick={() => {
                                    // Apply filters logic here
                                    setFilterDrawerOpened(false);
                                }}
                                className="flex-1 h-8 text-xs rounded-md bg-emerald-500 hover:bg-emerald-600 transition-colors"
                            >
                                Apply Filters
                            </Button>
                        </div>
                    </div>
                </SheetContent>
            </Sheet>
        </div>
    );
};

export default FileTable;