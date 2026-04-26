/* eslint-disable indent */
import { gql, useQuery } from '@apollo/client';
import { useRouter } from 'next/router';
import React, { useState } from 'react';

import { useEnquiryPopupContextSafe } from '@/context/EnquiryPopupContext';

import Back from '~/svg/back.svg';

const CONTACTS = gql`
    query Contacts {
        contactSections {
            contact_heading
            email
            phone
        }
    }
`;

const PageScroll = ({
    virtual,
    virtualTourModalOpen,
    item,
    onePercentPlan,
}: {
    virtual?: string;
    virtualTourModalOpen: () => void;
    item: any;
    onePercentPlan?: boolean;
}) => {
    const { data: contactInfo } = useQuery(CONTACTS);
    const [items] = useState<{ id: string; title: string }[]>(() => {
        const menuItems: { id: string; title: string }[] = [];

        menuItems.push({
            id: 'overview',
            title: 'Overview',
        });

        menuItems.push({
            id: 'neighbourhood',
            title: 'Location',
        });

        if (item?.growth_title && item?.growth_highlights?.length > 0) {
            menuItems.push({
                id: 'growth',
                title: 'Growth',
            });
        }

        if (
            item?.plans?.master_plan_fullscreen ||
            item?.plans?.tower_plan?.length > 0 ||
            item?.plans?.floor_plans?.length > 0
        ) {
            menuItems.push({
                id: 'plans',
                title: 'Plans',
            });
        }

        if (item?.residentialType !== 'Commercial') {
            menuItems.push({
                id: 'price',
                title: 'Price',
            });
        }

        if (item?.residentialType !== 'Commercial') {
            menuItems.push({
                id: 'amenities',
                title: 'Amenities',
            });
        }

        if (
            item?.residentialType === 'Commercial' &&
            item?.amenity_logo_card?.length > 0
        ) {
            menuItems.push({
                id: 'amenities',
                title: 'Highlights',
            });
        }

        if (
            item?.project_facilities?.length > 0 ||
            item?.plot_facilities?.length > 0
        ) {
            menuItems.push({
                id: 'facilities',
                title: 'Facilities',
            });
        }

        if (
            item?.gallery_image_uploads?.length > 0 ||
            item?.gallery_video_uploads?.length > 0
        ) {
            menuItems.push({
                id: 'gallery',
                title: 'Gallery',
            });
        }

        if (item?.snapshot && item?.residentialType === 'Commercial') {
            menuItems.push({
                id: 'snapshot',
                title: 'Snapshot',
            });
        }

        if (item?.brochure?.url) {
            menuItems.push({
                id: 'brochure',
                title: 'Download',
            });
        }

        if (item?.compliance?.length > 0) {
            menuItems.push({
                id: 'compliance',
                title: 'Compliances',
            });
        }

        if (
            contactInfo?.contactSections[0] &&
            item?.residentialType === 'Commercial'
        ) {
            menuItems.push({
                id: 'lease',
                title: 'Contact',
            });
        }

        return menuItems;
    });
    const router = useRouter();
    const popupContext = useEnquiryPopupContextSafe();

    const handleBackClick = () => {
        if (onePercentPlan) {
            router.push('/the-1-percent-plan');
            return;
        }
        // Try to trigger exit intent popup first;
        // if it was shown, don't navigate yet
        if (popupContext?.tryTriggerExitIntent()) {
            return;
        }
        router.back();
    };

    const resultString = item?.name
        .trim()
        .replace(/[\u200B-\u200D\uFEFF]/g, '')
        .replace(/ /g, '_');
    return (
        <div className='single-page-scroll flex items-end justify-between bg-inherit'>
            <a
                className='back-block flex items-center'
                onClick={handleBackClick}
            >
                <div className='back'>
                    <Back />
                </div>
                <span className='ml-2'>Back</span>
            </a>
            <ul className='flex items-center'>
                {items.map((item) => {
                    return (
                        item && (
                            <li key={item.id}>
                                <a
                                    id={`${resultString}_${item?.title}`}
                                    href={`#${item.id}`}
                                >
                                    {item.title}
                                </a>
                            </li>
                        )
                    );
                })}
                {virtual && virtual !== '' && virtual.length > 0 && (
                    <li className='' onClick={() => virtualTourModalOpen()}>
                        <span>virtual tour</span>
                    </li>
                )}
            </ul>
        </div>
    );
};

export default PageScroll;
