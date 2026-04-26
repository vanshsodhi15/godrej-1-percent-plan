/* eslint-disable indent */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
import { DocumentRenderer } from '@keystone-6/document-renderer';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { useRouter } from 'next/router';

import Title from '@/components/Title';

import cardVariants, { theObj } from '@/utils/cardVariants';

import ImageTest from './test.webp';

const Amenities = ({
    item: propertyDetail,
    yourHome,
}: {
    item: any;
    yourHome?: boolean;
}) => {
    const AmenitiesLogo = propertyDetail?.amenity_logo_card || [];
    const router = useRouter();

    const city = String(propertyDetail?.city?.name).toLowerCase();
    const residentialType = String(
        propertyDetail?.residentialType
    ).toLowerCase();
    return (
        <>
            <motion.section
                className='amenities-section bg-light-grayish-orange-gradient py-[40px] md:py-[80px]'
                id='amenities'
                {...theObj}
                variants={cardVariants}
            >
                <div className='amenities-container container mx-auto flex flex-col'>
                    {propertyDetail?.amenity_heading && (
                        <Title>{propertyDetail?.amenity_heading}</Title>
                    )}
                    {propertyDetail?.amenity_body?.document && (
                        <span className='lead mt-[20px] text-center md:mt-[28px]'>
                            <DocumentRenderer
                                document={
                                    propertyDetail?.amenity_body?.document
                                }
                            />
                        </span>
                    )}
                    {propertyDetail?.amenity_logo_card?.length > 0 && (
                        <ul className='amenities-list mx-auto mt-[20px] flex flex-wrap items-start justify-evenly  md:mt-[28px]'>
                            {AmenitiesLogo?.map((item: any, index: any) => {
                                return (
                                    <li
                                        key={index}
                                        className={`amenities-list-item ${
                                            index == 4 && 'ml-3 sm:ml-0'
                                        } mt-[14px] flex flex-col items-center md:mt-[16px] `}
                                    >
                                        <div className='icon'>
                                            {item.logo?.logo?.url ? (
                                                <Image
                                                    src={item.logo.logo.url}
                                                    alt={
                                                        item.logo
                                                            ?.logo_alt_text ||
                                                        item.title
                                                    }
                                                    width={120}
                                                    height={120}
                                                    quality={60}
                                                    sizes='120px'
                                                />
                                            ) : null}
                                        </div>
                                        <span className='mt-4'>
                                            {item.title}
                                        </span>
                                    </li>
                                );
                            })}
                        </ul>
                    )}
                    <figure className='amenities-banner mt-[50px]'>
                        {' '}
                        <Image
                            loading='lazy'
                            className='amenities-img h-[150px] w-[1440px]'
                            src={
                                propertyDetail?.amenity_banner_image?.url ||
                                ImageTest
                            }
                            alt='ImageTest'
                            width={500}
                            height={100}
                        />
                        <button
                            id={`${propertyDetail?.name} Amenity`
                                .toLowerCase()
                                .replace(/ /g, '_')}
                            className={` ${yourHome ? 'btn-green' : 'btn'}`}
                            onClick={() => {
                                router.push(
                                    `/${city}/${residentialType}/${propertyDetail?.slug}/amenities`,
                                    undefined,
                                    {
                                        shallow: true,
                                    }
                                );
                            }}
                        >
                            {propertyDetail?.amenity_button_text ||
                                'Experience all lifestyle amenities'}
                        </button>
                    </figure>
                </div>
            </motion.section>
        </>
    );
};

export default Amenities;
