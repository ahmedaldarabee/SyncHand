import { 
    Waypoints, Bolt, Cog, DatabaseZap, DraftingCompass, FileChartColumn, 
    FolderGit2, GraduationCap, Grid2x2Plus, LayoutGrid, NotebookPen, 
    Projector, Pyramid, Settings2, SlidersHorizontal, Speech, Target, 
    TriangleRight, UserRoundPlus, UserRoundSearch, Wrench, BugPlay 
} from 'lucide-react';
import { JSX } from 'react';

const getIconComponent = (
    iconName: string,
    textColor?: string,
    fontSize?: string
): JSX.Element | null => {
    const defaultFontSize = "text-[27px]";
    const defaultTextColor = "text-sky-600";

    const iconProps = {
        className: `${textColor ?? defaultTextColor} ${fontSize ?? defaultFontSize}`.trim()
    };

    switch(iconName) {
        case "Waypoints": return <Waypoints {...iconProps} />;
        case "Bolt": return <Bolt {...iconProps} />;
        case "Cog": return <Cog {...iconProps} />;
        case "DatabaseZap": return <DatabaseZap {...iconProps} />;
        case "DraftingCompass": return <DraftingCompass {...iconProps} />;
        case "FileChartColumn": return <FileChartColumn {...iconProps} />;
        case "FolderGit2": return <FolderGit2 {...iconProps} />;
        case "GraduationCap": return <GraduationCap {...iconProps} />;
        case "Grid2x2Plus": return <Grid2x2Plus {...iconProps} />;
        case "LayoutGrid": return <LayoutGrid {...iconProps} />;
        case "NotebookPen": return <NotebookPen {...iconProps} />;
        case "Projector": return <Projector {...iconProps} />;
        case "Pyramid": return <Pyramid {...iconProps} />;
        case "Settings2": return <Settings2 {...iconProps} />;
        case "SlidersHorizontal": return <SlidersHorizontal {...iconProps} />;
        case "Speech": return <Speech {...iconProps} />;
        case "Target": return <Target {...iconProps} />;
        case "TriangleRight": return <TriangleRight {...iconProps} />;
        case "UserRoundPlus": return <UserRoundPlus {...iconProps} />;
        case "UserRoundSearch": return <UserRoundSearch {...iconProps} />;
        case "Wrench": return <Wrench {...iconProps} />;
        case "BugPlay": return <BugPlay {...iconProps} />;
        default: return null;
    }
};

export default getIconComponent;
