import { Waypoints, Bolt, Cog, DatabaseZap, DraftingCompass, FileChartColumn, FolderGit2, GraduationCap, Grid2x2Plus, LayoutGrid, NotebookPen, Projector, Pyramid, Settings2, SlidersHorizontal, Speech, Target, TriangleRight, UserRoundPlus, UserRoundSearch, Wrench, BugPlay } from 'lucide-react';
import { IconData } from '../pages/types/AppTypes';
import { useContextApp } from '../pages/contextApp';

export const allIconsArray: IconData[] = [
    { id: 1, icon: <FolderGit2 className="text-[23px]" />, name: "icon part: 1", isSelected: false },
    { id: 2, icon: <Target className="text-[23px]" />, name: "icon part: 2", isSelected: false },
    { id: 3, icon: <Bolt className="text-[23px]" />, name: "icon part: 3", isSelected: false },
    { id: 4, icon: <Cog className="text-[23px]" />, name: "icon part: 4", isSelected: false },
    { id: 5, icon: <Wrench className="text-[23px]" />, name: "icon part: 5", isSelected: false },
    { id: 6, icon: <SlidersHorizontal className="text-[23px]" />, name: "icon part: 6", isSelected: false },
    { id: 7, icon: <LayoutGrid className="text-[23px]" />, name: "icon part: 7", isSelected: false },
    { id: 8, icon: <LayoutGrid className="text-[23px]" />, name: "icon part: 8", isSelected: false },
    { id: 9, icon: <NotebookPen className="text-[23px]" />, name: "icon part: 9", isSelected: false },
    { id: 10, icon: <TriangleRight className="text-[23px]" />, name: "icon part: 10", isSelected: false },
    { id: 11, icon: <Pyramid className="text-[23px]" />, name: "icon part: 11", isSelected: false },
    { id: 12, icon: <Settings2 className="text-[23px]" />, name: "icon part: 12", isSelected: false },
    { id: 13, icon: <DraftingCompass className="text-[23px]" />, name: "icon part: 13", isSelected: false },
    { id: 14, icon: <Grid2x2Plus className="text-[23px]" />, name: "icon part: 14", isSelected: false },
    { id: 15, icon: <GraduationCap className="text-[23px]" />, name: "icon part: 15", isSelected: false },
    { id: 16, icon: <DatabaseZap />, name: "icon part: 16", isSelected: false },
    { id: 17, icon: <Projector className="text-[23px]" />, name: "icon part: 17", isSelected: false },
    { id: 18, icon: <FileChartColumn className="text-[23px]" />, name: "icon part: 18", isSelected: false },
    { id: 19, icon: <Speech className="text-[23px]" />, name: "icon part: 19", isSelected: false },
    { id: 20, icon: <UserRoundSearch className="text-[23px]" />, name: "icon part: 20", isSelected: false },
    { id: 21, icon: <UserRoundPlus className="text-[23px]" />, name: "icon part: 21", isSelected: false },
    { id: 22, icon: <Waypoints className="text-[23px]" />, name: "icon part: 22", isSelected: false },
    { id: 23, icon: <BugPlay className="text-[23px]" />, name: "icon part: 23", isSelected: false },
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
            prevIcons.map((icon) =>{
                    if(icon.name === singleIcon.name){
                        setSelectedIcon(singleIcon);
                        return { ...icon, isSelected: true }
                    }
                    return { ...icon, isSelected: true }
                }
            )
        );
        setOpenIconWindow(!openIconWindow);
    };

    return (
        <div className='flex flex-wrap gap-2 text-sky-800 p-3'>
            {
                allIconsData.map((singleIcon, index) => (
                    <div onClick={() => handleIconSection(singleIcon)} key={index} className={`w-8 h-8 border border-slate-50 flex items-center transition-all cursor-pointer justify-center rounded-lg hover:bg-sky-600 hover:text-white`}>
                        {singleIcon.icon}
                    </div>
                ))
            }

        </div>
    );
};

export default AllIcons;