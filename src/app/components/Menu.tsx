"use client"
import React from 'react'
import { useContextApp } from '../pages/contextApp';
import { LayoutTemplate, BotMessageSquare, Grid2x2 } from 'lucide-react';
import { SvgIconProps } from '@mui/material';

const Menu = () => {
  const {
    openSideBarObject: { openSideBar },
    sideBarMenuObject: { sideBarMenu, setSideBarMenu },
    tabsOptionsObject: { setTabsOptions}
  } = useContextApp();

  const iconMap: Record<string, React.ComponentType<SvgIconProps>> = {
    "1": Grid2x2,
    "2": LayoutTemplate,
    "3": BotMessageSquare,
  };

  const handleClickedItem = (id: number) => {
    const currentSelectedId = sideBarMenu.find((item) => item.isSelected)?.id;

    if (currentSelectedId === id) {
      return;
    }
  
    const updatedMenu = sideBarMenu.map((item: any) => ({
      ...item,
      isSelected: item.id === id
    }));
    setSideBarMenu(updatedMenu);
    if(id == 2){
      setTabsOptions((prev: any) => 
        prev.map((option: any) => ({
          ...option,
          isSelected: option.id === 1 ? true : false
        }))
      )
    }
  };
  

  return (
    <div className='flex flex-col gap-2 items-center'>
      <div className='flex flex-col gap-6'>
        {sideBarMenu.map((menuItem: any) => {
          const IconComponent = iconMap[menuItem.id.toString()];
          return (
              <div key={menuItem.id} onClick={() => {
                  if(menuItem.id === 1 || menuItem.id === 2  || menuItem.id === 3){
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
