/* eslint-disable @next/next/no-img-element */
import { DocumentRenderer } from '@keystone-6/document-renderer';
import { motion } from 'framer-motion';
import React, { useLayoutEffect } from 'react';
import Slider from 'react-slick';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import ReactImage from '@/components/ReactImage';
import Title from '@/components/Title';

import cardVariants, { theObj } from '@/utils/cardVariants';

const Testimonials = ({ item: propertyDetails }: { item: any }) => {
    const settings = {
        infinite: true,
        slidesToShow:
            propertyDetails.testimonials.length > 3
                ? 3
                : propertyDetails.testimonials.length,
        slidesToScroll: 1,
        swipeToSlide: propertyDetails.testimonials.length > 3 ? true : false,
        centerMode: true,
        speed: 500,
        arrows: propertyDetails.testimonials.length > 3 ? true : false,
        responsive: [
            {
                breakpoint: 1535,
                settings: {
                    slidesToShow:
                        propertyDetails.testimonials.length > 3
                            ? 2
                            : propertyDetails.testimonials.length,
                    swipeToSlide: false,
                },
            },
            {
                breakpoint: 1279,
                settings: {
                    slidesToShow:
                        propertyDetails.testimonials.length > 3
                            ? 2
                            : propertyDetails.testimonials.length,
                    swipeToSlide: false,
                },
            },
            {
                breakpoint: 1023,
                settings: {
                    slidesToShow:
                        propertyDetails.testimonials.length > 3
                            ? 2
                            : propertyDetails.testimonials.length,
                    arrows: false,
                    swipeToSlide: false,
                },
            },
            {
                breakpoint: 767,
                settings: {
                    slidesToShow: 1,
                    swipeToSlide: false,
                },
            },
        ],
    };

    useLayoutEffect(() => {
        setTimeout(() => {
            const slider = document.querySelectorAll(
                '.virtual-tour-section .slick-track div.slick-slide'
            );
            if (slider && propertyDetails.testimonials.length < 4) {
                slider.forEach((item) => {
                    item.children[0].classList.add('opacity-100');
                });
            }
        }, 3000);
    }, [propertyDetails.testimonials]);

    return (
        <motion.section
            className='virtual-tour-section pt-24'
            id='testimonials'
            {...theObj}
            variants={cardVariants}
        >
            <div className='virtual-tour-container container mx-auto flex flex-col'>
                {propertyDetails.testimonial_heading && (
                    <Title>{propertyDetails.testimonial_heading}</Title>
                )}
                <Slider
                    className='virtual-tour-slider slider-gap'
                    {...settings}
                    swipeToSlide={propertyDetails.testimonials.length > 3}
                >
                    {propertyDetails.testimonials.map((item: any) => {
                        return (
                            <div
                                key={item.id}
                                className={`virtual-tour-single justify-content flex flex-col items-center px-4 py-8 text-center shadow-md 2xl:p-8 ${
                                    propertyDetails.testimonials.length > 3
                                        ? 'opacity-100'
                                        : ''
                                } }`}
                            >
                                <figure className='avatar mx-auto'>
                                    <ReactImage
                                        src={item.image.url}
                                        alt={item.name}
                                        className='slider-image'
                                        layout='fill'
                                    />
                                </figure>
                                <h3 className='mt-[28px]'>{item.name}</h3>
                                <span className='designation mt-[10px]'>
                                    {item.designation}
                                </span>
                                <span className='description lead mt-[10px]'>
                                    {item.description?.document && (
                                        <DocumentRenderer
                                            document={item.description.document}
                                        />
                                    )}
                                </span>
                            </div>
                        );
                    })}
                </Slider>
            </div>
        </motion.section>
    );
};

export default Testimonials;
