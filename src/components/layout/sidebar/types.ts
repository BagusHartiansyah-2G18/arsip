export interface NavItem {
    id: string;
    title: string;
    icon?: React.ComponentType<React.SVGProps<SVGSVGElement>> | React.ReactNode;
    badge?: number | React.ReactNode;
}

export interface NavGroup {
    id: string;
    title: string;
    icon?: React.ComponentType<React.SVGProps<SVGSVGElement>> | React.ReactNode;
    badge?: number | React.ReactNode;
    items?: NavItem[];
}

export interface SidebarProps {
    activeId: string;
    // eslint-disable-next-line no-unused-vars
    onChange: (id: string) => void;
    collapsed: boolean;
    onToggleCollapse: () => void;
    parentGroupId?: string | null;
}
