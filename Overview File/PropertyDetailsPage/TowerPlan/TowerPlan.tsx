/* eslint-disable @next/next/no-img-element */
import { DocumentRenderer } from '@keystone-6/document-renderer';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import Slider from 'react-slick';

import ReactImage from '@/components/ReactImage';

const TowerPlan = (props: any) => {
    const { item } = props;
    const propertyDetail = item?.plans;
    const [mobileTab, setMobileTab] = useState(propertyDetail?.tower_plan[0]);
    const router = useRouter();
    const settings = {
        dots: false,
        infinite: true,
        slidesToShow:
            propertyDetail?.tower_plan.length > 3
                ? 3
                : propertyDetail?.tower_plan.length,
        slidesToScroll: 1,
        pauseOnHover: true,
        arrows: true,
        responsive: [
            {
                breakpoint: 1279,
                settings: {
                    slidesToShow: 2,
                },
            },
            {
                breakpoint: 767,
                settings: {
                    slidesToShow: 1,
                },
            },
        ],
    };
    const city = String(item?.city?.name).toLowerCase();
    const residentialType = String(item?.residentialType).toLowerCase();
    return (
        <div className='master-plan-content mt-[20px] md:mt-[28px]'>
            <h3 className='text-center'>{propertyDetail?.tower_plan_text}</h3>
            <span className='lead mt-[20px] text-center md:mt-[28px]'>
                {propertyDetail?.tower_plan_body?.document && (
                    <DocumentRenderer
                        document={propertyDetail.tower_plan_body.document}
                    />
                )}
            </span>
            <ul className='floor-plan-list flex items-center justify-center'>
                <Slider className='floor-slider slider-gap' {...settings}>
                    {propertyDetail?.tower_plan?.map((towerItem: any) => {
                        return (
                            <li
                                className={`floor-plan-list-item mt-8 ${
                                    mobileTab?.id === towerItem.id
                                        ? 'active'
                                        : ''
                                }`}
                                key={towerItem.id}
                            >
                                <span>{towerItem.name}</span>
                                <figure className='mt-2 flex items-center justify-center'>
                                    <ReactImage
                                        layout='fill'
                                        onClick={() =>
                                            // props.setTowerLightBox(item)
                                            router.push(
                                                `/${city}/${residentialType}/${item?.slug}/floor-plan/${towerItem?.id}`,
                                                undefined,
                                                {
                                                    shallow: true,
                                                }
                                            )
                                        }
                                        className='cursor-pointer'
                                        src={towerItem.tower_image?.url}
                                        alt='tower-plan'
                                    />
                                </figure>
                            </li>
                        );
                    })}
                </Slider>
                <figure className='floor-mobile-image flex items-center justify-center'>
                    <ReactImage
                        layout='fill'
                        className='cursor-pointer'
                        onClick={() => props.setTowerLightBox(mobileTab)}
                        src={mobileTab?.tower_image?.url}
                        alt='tower-plan'
                    />
                </figure>
                <div className='mobile-list flex items-center justify-center'>
                    {propertyDetail?.tower_plan?.map((item: any) => {
                        return (
                            <span
                                className={`mobile-list-item ${
                                    mobileTab?.id === item.id ? 'active' : ''
                                }`}
                                key={item.id}
                                onClick={() => setMobileTab(item)}
                            >
                                {item.name}
                            </span>
                        );
                    })}
                </div>
            </ul>
        </div>
    );
};

export default TowerPlan;
