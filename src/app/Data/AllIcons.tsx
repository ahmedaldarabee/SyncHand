import { Waypoints, Bolt, Cog, DatabaseZap, DraftingCompass, FileChartColumn, FolderGit2, GraduationCap, Grid2x2Plus, LayoutGrid, NotebookPen, Projector, Pyramid, Settings2, SlidersHorizontal, Speech, Target, TriangleRight, UserRoundPlus, UserRoundSearch, Wrench, BugPlay, FolderTree } from 'lucide-react';
import { IconData } from '../pages/types/AppTypes';
import { useContextApp } from '../pages/contextApp';

export const allIconsArray: IconData[] = [
    { id: 1, icon: <FolderGit2 className="text-[23px]" />, name: "FolderGit2", isSelected: false },
    { id: 2, icon: <Target className="text-[23px]" />, name: "Target", isSelected: false },
    { id: 3, icon: <Bolt className="text-[23px]" />, name: "Bolt", isSelected: false },
    { id: 4, icon: <Cog className="text-[23px]" />, name: "Cog", isSelected: false },
    { id: 5, icon: <Wrench className="text-[23px]" />, name: "Wrench", isSelected: false },
    { id: 6, icon: <SlidersHorizontal className="text-[23px]" />, name: "SlidersHorizontal", isSelected: false },
    { id: 7, icon: <FolderTree className="text-[23px]" />, name: "FolderTree", isSelected: false },
    { id: 8, icon: <LayoutGrid className="text-[23px]" />, name: "LayoutGrid", isSelected: false },
    { id: 9, icon: <NotebookPen className="text-[23px]" />, name: "NotebookPen", isSelected: false },
    { id: 10, icon: <TriangleRight className="text-[23px]" />, name: "TriangleRight", isSelected: false },
    { id: 11, icon: <Pyramid className="text-[23px]" />, name: "Pyramid", isSelected: false },
    { id: 12, icon: <Settings2 className="text-[23px]" />, name: "Settings2", isSelected: false },
    { id: 13, icon: <DraftingCompass className="text-[23px]" />, name: "DraftingCompass", isSelected: false },
    { id: 14, icon: <Grid2x2Plus className="text-[23px]" />, name: "Grid2x2Plus", isSelected: false },
    { id: 15, icon: <GraduationCap className="text-[23px]" />, name: "GraduationCap", isSelected: false },
    { id: 16, icon: <DatabaseZap className="text-[23px]"/>, name: "DatabaseZap", isSelected: false },
    { id: 17, icon: <Projector className="text-[23px]" />, name: "Projector", isSelected: false },
    { id: 18, icon: <FileChartColumn className="text-[23px]" />, name: "FileChartColumn", isSelected: false },
    { id: 19, icon: <Speech className="text-[23px]" />, name: "Speech", isSelected: false },
    { id: 20, icon: <UserRoundSearch className="text-[23px]" />, name: "UserRoundSearch", isSelected: false },
    { id: 21, icon: <UserRoundPlus className="text-[23px]" />, name: "UserRoundPlus", isSelected: false },
    { id: 22, icon: <Waypoints className="text-[23px]" />, name: "Waypoints", isSelected: false },
    { id: 23, icon: <BugPlay className="text-[23px]" />, name: "BugPlay", isSelected: false },
];

const AllIcons = () => {
    const {
        allIconDataObject: { allIconsData, setAllIconsData },
        openIconWindowObject:{ openIconWindow , setOpenIconWindow },
        selectedIconObject:{ selectedIcon , setSelectedIcon },
    } = useContextApp();

    // updates icons in selection state !
    const handleIconSection = (singleIcon: IconData) => {
        setAllIconsData(prevIcons =>
            prevIcons.map((icon) => ({
                ...icon,
                isSelected: icon.name === singleIcon.name
            }))
        );
        setSelectedIcon({ ...singleIcon, name: singleIcon.name });
        setOpenIconWindow(false);
    };

    return (
        <div className='flex flex-wrap gap-2 text-sky-800 p-3'>
            {
                allIconsData.map((singleIcon, index) => (
                    <div onClick={() => handleIconSection(singleIcon)} key={index} className={`w-8 h-8 border border-slate-50 flex items-center transition-all cursor-pointer text-black justify-center rounded-lg hover:bg-sky-600 hover:text-white`}>
                        {singleIcon.icon}
                    </div>
                ))
            }

        </div>
    );
};

export default AllIcons;