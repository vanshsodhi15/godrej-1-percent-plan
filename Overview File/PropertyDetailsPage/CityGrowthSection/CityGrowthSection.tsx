import Image from 'next/image';
import React from 'react';

import Title from '@/components/Title';

interface GrowthHighlight {
    __typename?: string;
    id?: string;
    value: string;
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

interface GrowthDescriptionDocument {
    __typename?: string;
    document?: Array<{
        type: string;
        children: Array<{ text: string }>;
    }>;
}

interface CityGrowthSectionProps {
    growth_title?: string;
    growth_description?: GrowthDescriptionDocument;
    growth_image?: {
        __typename?: string;
        id?: string;
        filesize?: number;
        width?: number;
        height?: number;
        extension?: string;
        url: string;
    };
    growth_image_alt_text?: string;
    growth_highlights?: GrowthHighlight[];
}

const CityGrowthSection: React.FC<CityGrowthSectionProps> = ({
    growth_title,
    growth_description,
    growth_image,
    growth_image_alt_text,
    growth_highlights,
}) => {
    // Extract description text from the document structure
    const descriptionText = growth_description?.document
        ?.map((block) => block.children?.map((child) => child.text).join(''))
        .join(' ')
        .trim();

    // Filter out highlights without icons if needed
    const validHighlights = growth_highlights?.filter(
        (highlight) => highlight.icon?.url
    );

    // Don't render if no data
    if (!growth_title || !validHighlights?.length) {
        return null;
    }
    const imageUrl = growth_image?.url || '';
    const altText = growth_image_alt_text || 'City Growth';

    const renderHighlightValue = (
        value: string,
        firstLineClassName = '',
        secondLineClassName = ''
    ) => (
        <>
            <p className={`text-center leading-none ${firstLineClassName}`}>
                {value.split(' ')[0]}
            </p>
            <p className={`text-center leading-none ${secondLineClassName}`}>
                {value.split(' ').slice(1).join(' ')}
            </p>
        </>
    );

    return (
        <div
            id='growth'
            className='container mx-auto pb-[20px] pt-[40px] md:pt-[80px]'
        >
            <div className='mb-[20px] md:mb-[28px]'>
                <div className='max-[359px]:[&_.line]:hidden max-[359px]:[&_h2]:whitespace-normal max-[359px]:[&_h2]:break-words max-[359px]:[&_h2]:px-0'>
                    <Title>{growth_title}</Title>
                </div>
                <div className='mx-auto mt-[20px] text-left font-primary text-[16px] leading-[24px] text-[#666666] md:mt-[28px]'>
                    {descriptionText}
                </div>
            </div>
            <div className='relative h-[450px] w-full lg:hidden'>
                <Image
                    loading='lazy'
                    src={imageUrl}
                    alt={altText}
                    fill
                    className='object-cover'
                />
                <div className='absolute inset-0 flex items-center justify-center p-2.5 sm:p-4'>
                    <div className='w-full max-w-[400px] bg-white p-4 max-[413px]:max-w-full max-[413px]:p-2.5 sm:p-4'>
                        {/* <div className='mb-6 flex items-center justify-center gap-4'>
                            <span className='w-[80px] text-center text-[14px]  font-bold text-black'>
                                Parameters
                            </span>
                            <span className='w-full text-center text-[14px]  font-bold text-black'>
                                Description
                            </span>
                        </div> */}
                        <div className='flex max-h-[300px] flex-col gap-5 overflow-y-auto pr-2 max-[413px]:gap-4 max-[413px]:pr-0 [&::-webkit-scrollbar-thumb]:bg-[#C5A86F] [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar]:w-[2px]'>
                            {validHighlights.map((highlight, index) => (
                                <div
                                    key={highlight.id || index}
                                    className='flex items-center justify-center gap-3 sm:gap-8'
                                >
                                    <Image
                                        loading='lazy'
                                        src={highlight.icon?.url || ''}
                                        alt={
                                            highlight.label || 'Highlight icon'
                                        }
                                        height={80}
                                        width={80}
                                        className='h-[52px] w-[52px] shrink-0 sm:h-[80px] sm:w-[80px]'
                                    />
                                    <div className='flex min-w-0 flex-1 items-center'>
                                        <div className='flex h-[96px] min-w-[102px] max-w-[102px] shrink-0 flex-col items-center justify-center border border-[#666666] p-2 text-[14px] font-bold text-[#666666] max-[413px]:h-[84px] max-[413px]:min-w-[92px] max-[413px]:text-[14px] sm:h-[100px] sm:max-w-[110px] sm:p-2.5 sm:text-lg'>
                                            {highlight.value &&
                                                renderHighlightValue(
                                                    highlight.value,
                                                    'text-[#666666]',
                                                    'font-primary text-[#666666]'
                                                )}
                                        </div>
                                        {highlight.icon?.url && (
                                            <p className="-ml-2 min-w-0 flex-1 bg-white pl-2 text-[12px] leading-[1.4] text-black max-[413px]:text-[9.5px] sm:-ml-2.5 sm:max-w-none sm:pr-1 sm:font-['Maven_Pro'] sm:text-sm">
                                                {highlight.label}
                                            </p>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            <div className='hidden items-center justify-between gap-6 px-4 lg:flex lg:flex-row lg:px-14'>
                {/* left side */}
                <div className='mr-2 flex min-w-0 flex-1 flex-col justify-center gap-8'>
                    <div className='flex items-center gap-10 xl:gap-14'>
                        {/* <span className='w-[100px] text-center text-[16px] font-semibold text-black '>
                            Parameters
                        </span>
                        <span className='w-[380px] text-center text-[16px] font-semibold text-black'>
                            Description
                        </span> */}
                    </div>
                    {validHighlights.map((highlight, index) => (
                        <div
                            key={highlight.id || index}
                            className='flex items-center gap-8'
                        >
                            <Image
                                loading='lazy'
                                src={highlight.icon?.url || ''}
                                alt={highlight.label || 'Highlight icon'}
                                height={100}
                                width={100}
                                className='h-[82px] w-[82px] shrink-0'
                            />
                            <div className='flex min-w-0 items-center'>
                                {highlight.value && (
                                    <div className='flex h-[112px] min-w-[150px] max-w-[150px] shrink-0 flex-col items-center justify-center border border-[#666666] p-[15px] font-display text-[16px] font-medium'>
                                        {renderHighlightValue(
                                            highlight.value,
                                            'text-[#666666]',
                                            'text-[#666666]'
                                        )}
                                    </div>
                                )}
                                {highlight.icon?.url && (
                                    <p className='-ml-2.5 bg-white pr-1 font-primary text-[14px] leading-[1.4] text-black'>
                                        {highlight.label}
                                    </p>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
                {/* Right Side - Image */}
                <div className='relative w-full max-w-[430px] shrink-0 xl:max-w-[570px]'>
                    <div className='w-full overflow-hidden'>
                        <Image
                            loading='lazy'
                            src={imageUrl}
                            alt={altText}
                            height={700}
                            width={600}
                            className='h-[450px] w-full object-cover lg:h-[480px]'
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CityGrowthSection;
