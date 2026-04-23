/* eslint-disable @next/next/no-img-element */
import Image from 'next/image';
import React from 'react';

import Title from '@/components/Title';

import Phone from '~/svg/investors/call.svg';
import Email from '~/svg/investors/email.svg';

const LeaseSection = ({ item }: { item: any }) => {
    return (
        <div
            id='lease'
            className='lease-section container mx-auto flex flex-col py-20'
        >
            {item?.contact_heading && <Title>{item?.contact_heading}</Title>}
            <figure className='amenities-banner relative mt-20 w-full'>
                {item?.image?.url ? (
                    <Image
                        className='amenities-img w-full'
                        src={item.image.url}
                        alt={item?.contact_heading || 'Lease section image'}
                        width={1440}
                        height={480}
                        quality={75}
                        sizes='(max-width: 768px) 100vw, 1200px'
                    />
                ) : null}
                <div className='info-div flex w-full items-center justify-center gap-2 sm:gap-4 md:gap-8'>
                    <div className='email flex underline'>
                        <Email />
                        <p className='ml-2'>{item?.email}</p>
                    </div>
                    <p className='vertical'>|</p>
                    <div className='phone flex items-center'>
                        <Phone />
                        <p className='ml-2'>{item?.phone}</p>
                    </div>
                </div>
            </figure>
        </div>
    );
};

export default LeaseSection;
