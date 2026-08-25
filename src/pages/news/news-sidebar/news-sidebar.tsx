import SidebarSection from "./sidebar-section";
import SidebarMenu from "./sidebar-menu";

import {
    categories,
    practiceAreas,
} from "@/data/NewsSidebar";

export default function NewsSidebar() {
    return (
        <>
            <SidebarSection title="Categories">
                <SidebarMenu
                    items={categories}
                    active={0}
                />
            </SidebarSection>

            <SidebarSection title="Practice Areas">
                <SidebarMenu
                    items={practiceAreas}
                />
            </SidebarSection>
        </>
    );
}