/* eslint-disable @next/next/no-img-element */
import { EmblaOptionsType } from 'embla-carousel-react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React from 'react';

import EmblaCarousel from '@/components/Embla/Embla';
import OutlineButton from '@/components/OutlineButton';
import Title from '@/components/Title';

import cardVariants, { theObj } from '@/utils/cardVariants';

const Gallery = ({
    item: propertyDetail,
    yourHome,
}: {
    item: any;
    yourHome?: boolean;
}) => {
    const router = useRouter();

    const OPTIONS: EmblaOptionsType = {
        dragFree: true,
        containScroll: 'trimSnaps',
        active: true,
        loop: true,
        breakpoints: {
            '(max-width: 767px)': {
                dragFree: true,
                active: true,
            },
        },
    };
    const city = String(propertyDetail?.city?.name).toLowerCase();
    const residentialType = String(
        propertyDetail?.residentialType
    ).toLowerCase();

    return (
        <>
            <motion.section
                className={`gallery-section ${
                    yourHome ? 'yourHome' : ''
                }  pb-[20px] pt-[80px] max-md:pt-[40px] ${
                    propertyDetail?.galleries?.length < 3
                        ? 'gallery-slide-center'
                        : ''
                }`}
                id='gallery'
                {...theObj}
                variants={cardVariants}
            >
                <div className='container flex flex-col'>
                    <Title>Gallery</Title>
                    {propertyDetail?.gallery_heading && (
                        <h3 className='mt-[20px] md:mt-[28px]'>
                            {propertyDetail?.gallery_heading}
                        </h3>
                    )}
                    <EmblaCarousel
                        options={OPTIONS}
                        className='recognized-best-slider'
                        slides={propertyDetail}
                        dots={true}
                        margin={true}
                        active={true}
                    >
                        {propertyDetail?.galleries?.map((item: any) => {
                            return (
                                <div
                                    className='embla__slide embla__class-names'
                                    key={item.id}
                                    style={{
                                        opacity: 1,
                                    }}
                                >
                                    {item?.image?.url ? (
                                        <Image
                                            src={item.image.url}
                                            alt={
                                                item?.image_alt_text ||
                                                item.name
                                            }
                                            width={1200}
                                            height={700}
                                            quality={70}
                                            sizes='(min-width: 1441px) 452px, (max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
                                        />
                                    ) : null}
                                    <h4 className='mt-6'>{item.name}</h4>
                                </div>
                            );
                        })}
                    </EmblaCarousel>
                    <OutlineButton
                        id={`${propertyDetail?.name} View Gallery`
                            .toLowerCase()
                            .replace(/ /g, '_')}
                        onClick={() => {
                            router.push(
                                `/${city}/${residentialType}/${propertyDetail?.slug}/gallery`,
                                undefined,
                                {
                                    shallow: true,
                                }
                            );
                        }}
                    >
                        View Gallery
                    </OutlineButton>
                </div>
            </motion.section>
        </>
    );
};

export default Gallery;
