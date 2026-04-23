/* eslint-disable indent */
/* eslint-disable @next/next/no-img-element */
import { useRouter } from 'next/router';
import { useState } from 'react';

import ReactImage from '@/components/ReactImage';

const FloorPlans = (props: any) => {
    const { item } = props;
    const router = useRouter();

    const propertyDetail = item?.plans;

    const [mobileTab, setMobileTab] = useState(propertyDetail?.floor_plans[0]);

    const city = String(item?.city?.name).toLowerCase();
    const residentialType = String(item?.residentialType).toLowerCase();
    return (
        <div className='master-plan-content mt-[20px] md:mt-[28px]'>
            <ul className='floor-plan-list flex items-center justify-center'>
                {propertyDetail?.floor_plans?.map((floorItem: any) => {
                    return (
                        <li
                            className={`floor-plan-list-item mt-8 ${
                                mobileTab?.id === floorItem.id ? 'active' : ''
                            }`}
                            key={`floor-plan-${floorItem.id}`}
                        >
                            <span>{floorItem.name}</span>
                            <figure className='mt-2 flex items-center justify-center'>
                                <ReactImage
                                    layout='fill'
                                    onClick={() =>
                                        router.push(
                                            `/${city}/${residentialType}/${item?.slug}/unit-plan/${floorItem?.id}`,
                                            undefined,
                                            {
                                                shallow: true,
                                            }
                                        )
                                    }
                                    className='cursor-pointer'
                                    src={floorItem.thumbnail?.url}
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

export default FloorPlans;
