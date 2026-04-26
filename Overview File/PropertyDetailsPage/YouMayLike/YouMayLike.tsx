/* eslint-disable @next/next/no-img-element */
import { DocumentRenderer } from '@keystone-6/document-renderer';
import { EmblaOptionsType } from 'embla-carousel-react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React from 'react';

import EmblaCarousel from '@/components/Embla/Embla';
import Title from '@/components/Title';

import cardVariants, { theObj } from '@/utils/cardVariants';

const YouMayLike = ({ item }: { item: any }) => {
    const items = item?.you_may_also_like || [];
    const router = useRouter();

    const OPTIONS: EmblaOptionsType = {
        dragFree: true,
        align: 'center',
        containScroll: 'trimSnaps',
        active: true,
        loop: false,
        breakpoints: {
            '(max-width: 767px)': {
                dragFree: true,
            },
        },
    };
    return (
        <motion.section
            className='you-may-like-section py-24'
            id='YouMayLike'
            {...theObj}
            variants={cardVariants}
        >
            <div className='you-may-like-container container mx-auto flex flex-col'>
                <Title>You may also like</Title>
                <EmblaCarousel
                    options={OPTIONS}
                    className='you-may-like-slider'
                    slides={items}
                    autoplay={true}
                    active={true}
                >
                    {items.map((item: any, index: any) => {
                        return (
                            <div
                                className='embla__slide embla__class-names'
                                key={item.id}
                                style={{
                                    opacity: 1,
                                }}
                            >
                                <a
                                    className='you-may-like-single flex flex-col'
                                    key={`you-may-like-${index}`}
                                    onClick={() => {
                                        router.push(
                                            `/${item.city.name.toLowerCase()}/${item.residentialType.toLowerCase()}/${
                                                item.slug
                                            }`
                                        );
                                    }}
                                >
                                    <figure className='thumbnail relative mx-auto'>
                                        <Image
                                            loading='lazy'
                                            layout='fill'
                                            src={item.thumbnail?.url}
                                            alt={item.name}
                                            className='slider-image'
                                        />
                                    </figure>
                                    <div className='you-may-like-details flex flex-col'>
                                        <span className='location block font-primary text-[14px]'>
                                            {item?.location}, {item?.city?.name}
                                        </span>
                                        <h3 className='mt-[5px]'>
                                            {item?.name}
                                        </h3>
                                        {item?.short_description?.document && (
                                            <DocumentRenderer
                                                document={
                                                    item?.short_description
                                                        ?.document
                                                }
                                            />
                                        )}
                                    </div>
                                </a>
                            </div>
                        );
                    })}
                </EmblaCarousel>
            </div>
        </motion.section>
    );
};

export default YouMayLike;
