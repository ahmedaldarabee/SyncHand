"use client"
import React, { ReactNode } from 'react'
import { useContextApp } from '../pages/contextApp';
import { LayoutTemplate, BotMessageSquare, Grid2x2, Minimize2 } from 'lucide-react';
import { SvgIconProps } from '@mui/material';

const Menu = () => {
  const {
    openSideBarObject: { openSideBar, setOpenSideBar },
    sideBarMenuObject: { sideBarMenu, setSideBarMenu }
  } = useContextApp();

  const iconMap: Record<string, React.ComponentType<SvgIconProps>> = {
    "1": Grid2x2,
    "2": LayoutTemplate,
    "3": BotMessageSquare,
  };

  const handleClickedItem = (id: number) => {
    const currentSelectedId = sideBarMenu.find((item) => item.isSelected)?.id;

    if (currentSelectedId === id) {
      console.log("Same item clicked, no update.");
      return;
    }
  
    const updatedMenu = sideBarMenu.map((item) => ({
      ...item,
      isSelected: item.id === id
    }));
    setSideBarMenu(updatedMenu);
  };
  

  return (
    <div className='flex flex-col gap-2 items-center'>
      <div className='flex flex-col gap-6'>
        {sideBarMenu.map((menuItem) => {
          const IconComponent = iconMap[menuItem.id.toString()];
          return (
              <div key={menuItem.id} onClick={() => {
                // || menuItem.id === 3 later on
                  if(menuItem.id === 1 || menuItem.id === 2){
                    handleClickedItem(menuItem.id);
                  }
                }
              }
              className='flex items-end gap-2 cursor-pointer'>
              {IconComponent && <IconComponent className={`w-4 h-4 ${menuItem.isSelected ? 'text-sky-600':'text-slate-400'}`}/>}
              
              {openSideBar && (
                <span className={`${menuItem.isSelected? 'text-sky-700':'text-slate-300'}`}>{menuItem.name}</span>
              )}

            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Menu;
