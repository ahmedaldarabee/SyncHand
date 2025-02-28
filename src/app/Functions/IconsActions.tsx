import { 
    Waypoints, Bolt, Cog, DatabaseZap, DraftingCompass, FileChartColumn, 
    FolderGit2, GraduationCap, Grid2x2Plus, LayoutGrid, NotebookPen, 
    Projector, Pyramid, Settings2, SlidersHorizontal, Speech, Target, 
    TriangleRight, UserRoundPlus, UserRoundSearch, Wrench, BugPlay, 
    FolderTree
} from 'lucide-react';
import { JSX } from 'react';

const getIconComponent = (
    iconName: string,
): JSX.Element | null => {

    switch(iconName) {
        case "Waypoints": return <Waypoints className="text-[25px] text-white" />;
        case "Bolt": return <Bolt className="text-[25px] text-white" />;
        case "Cog": return <Cog className="text-[25px] text-white" />;
        case "DatabaseZap": return <DatabaseZap className="text-[25px] text-white" />;
        case "DraftingCompass": return <DraftingCompass className="text-[25px] text-white" />;
        case "FileChartColumn": return <FileChartColumn className="text-[25px] text-white" />;
        case "FolderGit2": return <FolderGit2 className="text-[25px] text-white" />;
        case "GraduationCap": return <GraduationCap className="text-[25px] text-white" />;
        case "Grid2x2Plus": return <Grid2x2Plus className="text-[25px] text-white" />;
        case "LayoutGrid": return <LayoutGrid className="text-[25px] text-white" />;
        case "NotebookPen": return <NotebookPen className="text-[25px] text-white" />;
        case "Projector": return <Projector className="text-[25px] text-white" />;
        case "Pyramid": return <Pyramid className="text-[25px] text-white" />;
        case "Settings2": return <Settings2 className="text-[25px] text-white" />;
        case "SlidersHorizontal": return <SlidersHorizontal className="text-[25px] text-white" />;
        case "Speech": return <Speech className="text-[25px] text-white" />;
        case "Target": return <Target className="text-[25px] text-white" />;
        case "TriangleRight": return <TriangleRight className="text-[25px] text-white" />;
        case "UserRoundPlus": return <UserRoundPlus className="text-[25px] text-white" />;
        case "UserRoundSearch": return <UserRoundSearch className="text-[25px] text-white" />;
        case "Wrench": return <Wrench className="text-[25px] text-white" />;
        case "BugPlay": return <BugPlay className="text-[25px] text-white" />;
        case "FolderTree": return <FolderTree className="text-[25px] text-white" />;
        default: return <FolderTree className="text-[25px] text-white" />;
    }
};

export default getIconComponent;