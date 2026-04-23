/* eslint-disable @next/next/no-img-element */
import { gql, useQuery } from '@apollo/client';
import { DocumentRenderer } from '@keystone-6/document-renderer';
import { motion } from 'framer-motion';
import Head from 'next/head';
import Link from 'next/link';
import { memo, useEffect, useMemo, useState } from 'react';

import ReactImage from '@/components/ReactImage';
import Title from '@/components/Title';
import VideoModal from '@/components/VideoModal';

import cardVariants, { theObj } from '@/utils/cardVariants';

const QUERY = gql`
    query Cities {
        residentialCities {
            name
            slug
        }
    }
`;

const Overview = ({
    item,
    yourHome,
    propertyType,
}: {
    item: any;
    yourHome?: boolean;
    propertyType?: string;
}) => {
    const [modalOpen, setModalOpen] = useState(false);
    const { data } = useQuery(QUERY);

    useEffect(() => {
        if (modalOpen) {
            document.body.classList.add('no-scroll');
        } else {
            document.body.classList.remove('no-scroll');
        }
    }, [modalOpen]);

    const theCity = useMemo(
        () =>
            data?.residentialCities.filter((cityItem: any) => {
                return cityItem?.name === item?.city?.name;
            }),
        [data?.residentialCities, item?.city?.name]
    );
    const typeSlug = useMemo(() => {
        const rawType = propertyType || item?.residentialType || '';
        const normalized = rawType.toString().toLowerCase().trim();
        if (normalized === 'plotted') return 'plotted';
        if (normalized === 'residential') return 'residential';
        if (normalized === 'commercial') return 'commercial';
        return normalized;
    }, [item?.residentialType, propertyType]);

    const typeLabel = useMemo(() => {
        if (typeSlug === 'plotted') return 'Plotted';
        if (typeSlug === 'residential') return 'Residential';
        if (typeSlug === 'commercial') return 'Commercial';
        return item?.residentialType || 'Residential';
    }, [item?.residentialType, typeSlug]);

    const breadcrumbSchema = useMemo(() => {
        const breadcrumbItems = [
            {
                position: 1,
                name: 'Home',
                item: 'https://www.godrejproperties.com/',
            },
            {
                position: 2,
                name: `${typeLabel} Projects`,
                item: `https://www.godrejproperties.com/property/${typeSlug}`,
            },
            {
                position: 3,
                name: item?.city?.name,
                item: `https://www.godrejproperties.com/${theCity?.[0]?.slug}`,
            },
            {
                position: 4,
                name: item?.name,
                item: typeof window !== 'undefined' ? window.location.href : '',
            },
        ];
        return {
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            itemListElement: breadcrumbItems.map((breadcrumb) => ({
                '@type': 'ListItem',
                position: breadcrumb.position,
                name: breadcrumb.name,
                item: breadcrumb.item,
            })),
        };
    }, [item?.name, item?.city?.name, theCity, typeLabel, typeSlug]);

    return (
        <>
            <Head>
                <script
                    id='property-breadcrumb-schema'
                    key='property-breadcrumb-schema'
                    type='application/ld+json'
                    dangerouslySetInnerHTML={{
                        __html: JSON.stringify(breadcrumbSchema),
                    }}
                />
            </Head>

            <section
                className='overview-section pb-[20px] pt-[30px] md:pt-[50px]'
                id='overview'
            >
                <div className='container flex flex-col'>
                    <ul className='breadcrumbs mb-8 md:-mt-4 md:mb-12'>
                        <li className='breadcrumbs__item'>
                            <Link
                                prefetch={false}
                                href='/'
                                className='breadcrumbs__link'
                            >
                                Home
                            </Link>
                        </li>

                        <li className='breadcrumbs__item'>
                            <Link
                                prefetch={false}
                                href={`/property/${typeSlug}`}
                                className='breadcrumbs__link'
                            >
                                {typeLabel} Projects
                            </Link>
                        </li>
                        <li className='breadcrumbs__item'>
                            <Link
                                prefetch={false}
                                href={`/${theCity?.[0]?.slug}`}
                                className='breadcrumbs__link'
                            >
                                {item?.city?.name}
                            </Link>
                        </li>
                        <li className='breadcrumbs__item'>
                            <Link
                                prefetch={false}
                                href='#'
                                className={`breadcrumbs__link breadcrumbs__link--active ${
                                    yourHome ? 'your-home-active' : ''
                                }`}
                            >
                                {item?.name}
                            </Link>
                        </li>
                    </ul>

                    <Title>Overview</Title>
                    <span className='lead mt-[20px] text-center md:mt-[28px]'>
                        {item?.overview?.document && (
                            <DocumentRenderer
                                document={item.overview.document}
                            />
                        )}
                    </span>
                    <motion.figure
                        className='overview-picture mx-auto mt-[20px] flex items-center justify-center md:mt-[28px]'
                        {...theObj}
                        variants={cardVariants}
                    >
                        {item?.overview_image?.url && (
                            <ReactImage
                                src={item?.overview_image?.url}
                                alt={item?.overview_alt_text}
                                layout='fill'
                                // width='100%'
                            />
                        )}
                        {item?.walkthrough_link ? (
                            <div
                                className={`${
                                    item?.overview_image?.url
                                        ? 'walkthrough mx-20 mt-12'
                                        : 'no-overview'
                                }`}
                            >
                                <button
                                    id={`${item?.name} Walkthrough`
                                        .toLowerCase()
                                        .replace(/ /g, '_')}
                                    className={`${
                                        item?.overview_image?.url
                                            ? yourHome
                                                ? 'btn-green btn'
                                                : 'btn-white btn'
                                            : 'btn-black '
                                    }`}
                                    onClick={() => setModalOpen(true)}
                                >
                                    Walkthrough
                                </button>
                            </div>
                        ) : (
                            <></>
                        )}
                    </motion.figure>
                </div>
            </section>
            {modalOpen ? (
                <VideoModal
                    url={item.walkthrough_link}
                    onClose={() => {
                        setModalOpen(false);
                    }}
                    description='Walkthrough'
                />
            ) : (
                <></>
            )}
        </>
    );
};

export default memo(Overview);
