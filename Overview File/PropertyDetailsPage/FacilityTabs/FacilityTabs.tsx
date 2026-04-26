import { DocumentRenderer } from '@keystone-6/document-renderer';
import Image from 'next/image';
import React, { useState } from 'react';

import Title from '@/components/Title';

interface Facility {
    __typename?: string;
    id?: string;
    label: string;
    icon?: {
        __typename?: string;
        id?: string;
        filesize?: number;
        width?: number;
        height?: number;
        extension?: string;
        url: string;
    } | null;
}

interface FacilityTabsProps {
    project_facilities?: Facility[];
    plot_facilities?: Facility[];
    plot_facilities_title?: string;
    plot_facilities_description?: {
        document: any;
    } | null;
}

const FacilityTabs: React.FC<FacilityTabsProps> = ({
    project_facilities,
    plot_facilities,
    plot_facilities_title,
    plot_facilities_description,
}) => {
    // Filter facilities with valid icons
    const validProjectFacilities =
        project_facilities?.filter((f) => f.icon?.url) || [];
    const validPlotFacilities =
        plot_facilities?.filter((f) => f.icon?.url) || [];

    const hasPlot = validPlotFacilities.length > 0;
    const hasProject = validProjectFacilities.length > 0;

    const defaultTab = hasPlot ? 'plot' : 'project';
    const [activeTab, setActiveTab] = useState<'project' | 'plot'>(defaultTab);

    // Don't render if no facilities
    if (!hasProject && !hasPlot) {
        return null;
    }

    const facilities =
        activeTab === 'project' ? validProjectFacilities : validPlotFacilities;

    return (
        <div
            id='facilities'
            className='amenities-section container pb-[32px] pt-[40px] max-md:pb-0 md:pt-[80px]'
        >
            <Title>{plot_facilities_title || 'Facilities'}</Title>
            {plot_facilities_description?.document && (
                <div className='lead mx-auto !mt-[14px] text-center md:!mt-[16px]'>
                    <DocumentRenderer
                        document={plot_facilities_description.document}
                    />
                </div>
            )}

            <div className='!mt-[20px] flex flex-col items-center justify-center space-y-6 md:!mt-[28px]'>
                <div className='flex items-center space-x-8 md:space-x-16'>
                    {hasProject && (
                        <button
                            onClick={() => setActiveTab('project')}
                            className={`pb-2 font-primary text-[16px] font-medium leading-[1.16] transition-all duration-300 lg:text-[1.5rem] ${
                                activeTab === 'project'
                                    ? 'text-[#27262e] underline underline-offset-8'
                                    : 'text-[#939697]'
                            }`}
                        >
                            Project Facilities
                        </button>
                    )}
                    {hasPlot && (
                        <button
                            onClick={() => setActiveTab('plot')}
                            className={`pb-2 font-primary text-[16px] font-medium leading-[1.16] transition-all duration-300 lg:text-[1.5rem] ${
                                activeTab === 'plot'
                                    ? 'text-[#27262e] underline underline-offset-8'
                                    : 'text-[#939697]'
                            }`}
                        >
                            Plot Facilities
                        </button>
                    )}
                </div>
            </div>

            <div className='amenities-list mx-auto mt-[20px] grid grid-cols-1 gap-y-10 md:mt-[28px] md:flex md:flex-wrap md:items-start md:justify-evenly md:gap-y-0'>
                {facilities.map((item, index) => (
                    <div
                        key={item.id || index}
                        className='flex flex-col items-center text-center'
                    >
                        <div className='h-30  w-30 mb-6  transition-transform duration-300 hover:scale-105'>
                            <Image
                                loading='lazy'
                                src={item.icon?.url || ''}
                                alt={item.label}
                                width={120}
                                height={120}
                                className='h-30 max-w-30 '
                            />
                        </div>
                        <p className='text-dark  max-w-[200px] font-primary text-[14px] font-normal italic leading-5 sm:text-[16px] sm:leading-6'>
                            {item.label}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default FacilityTabs;
