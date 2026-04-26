/* eslint-disable @next/next/no-img-element */
import React, { useState } from 'react';

import ReactImage from '@/components/ReactImage';

const UnitPlan = (props: any) => {
    const { item: propertyDetail } = props;
    const [mobileTab, setMobileTab] = useState(propertyDetail?.floor_plans[0]);
    return (
        <div className='master-plan-content mt-[20px] md:mt-[28px]'>
            <h3 className='text-center'>{propertyDetail?.floor_plan_text}</h3>
            <p className='lead mt-[20px] text-center md:mt-[28px]'>
                {
                    propertyDetail?.floor_plan_body.document?.[0]?.children?.[0]
                        ?.text
                }
            </p>
            <ul className='floor-plan-list flex items-center justify-center'>
                {propertyDetail?.floor_plans?.map((item: any) => {
                    return (
                        <li
                            className={`floor-plan-list-item mt-8 ${
                                mobileTab?.id === item.id ? 'active' : ''
                            }`}
                            key={`floor-plan-${item.id}`}
                        >
                            <span>{item.name}</span>
                            <figure className='mt-2 flex items-center justify-center'>
                                <ReactImage
                                    layout='fill'
                                    onClick={() => props.setLightBox(item)}
                                    className='cursor-pointer'
                                    src={item.thumbnail?.url}
                                    alt='floor-plan'
                                />
                            </figure>
                        </li>
                    );
                })}
                <div className='mobile-list flex items-center justify-center'>
                    {propertyDetail?.floor_plans?.map((item: any) => {
                        return (
                            <span
                                className={`mobile-list-item ${
                                    mobileTab?.id === item.id ? 'active' : ''
                                }`}
                                key={`floor-plan-${item.id}`}
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

export default UnitPlan;
