import { motion } from 'framer-motion';
import React from 'react';

import EMICalculator from '@/components/EMICalculator';
import Title from '@/components/Title';

import cardVariants, { theObj } from '@/utils/cardVariants';

function numDifferentiation(val: any) {
    if (val >= 10000000) val = (val / 10000000).toFixed(2) + ' Cr.';
    else if (val >= 100000) val = (val / 100000).toFixed(2) + ' Lakh.';
    else if (val >= 1000) val = (val / 1000).toFixed(2) + ' K';
    return val;
}

const Price = ({
    item: propertyDetail,
    yourHome,
}: {
    item: any;
    yourHome?: boolean;
}) => {
    // console.log(propertyDetail, 'propertyDetail');
    return (
        <motion.section
            className='price-section py-[40px] md:py-[80px]'
            id='price'
            {...theObj}
            variants={cardVariants}
        >
            <div className='price-container container mx-auto flex flex-col'>
                <Title>Price</Title>
                <div className='grid grid-cols-1 gap-4 lg:grid-cols-8 lg:gap-8 xl:gap-16'>
                    <div className='price-wrapper col-span-1 mt-[20px] flex flex-col md:mt-[28px] lg:col-span-4'>
                        <div
                            className={`price-block ${
                                yourHome ? 'yourHome' : ''
                            } `}
                        >
                            <div className='price-header flex items-center justify-center'>
                                {/* <span className='uppercase'></span> */}
                                <h3 className='font-display font-medium'>
                                    Price
                                </h3>
                            </div>
                            <div className='price-list flex flex-col max-md:px-4'>
                                {propertyDetail?.starting_prices?.map(
                                    (item: any) => {
                                        return (
                                            <div
                                                className='price-single flex items-center justify-between'
                                                key={item.id}
                                            >
                                                <span>{item.name}</span>
                                                {item?.minimum_price ? (
                                                    <span className='price-box'>
                                                        <p>₹</p>
                                                        {numDifferentiation(
                                                            item.minimum_price
                                                        )}{' '}
                                                        {item.super_script && (
                                                            <sup className='super-script'>
                                                                {
                                                                    item.super_script
                                                                }
                                                            </sup>
                                                        )}
                                                        <small className='onwards'>
                                                            onwards
                                                        </small>
                                                    </span>
                                                ) : (
                                                    <span>
                                                        Available On Request
                                                    </span>
                                                )}
                                            </div>
                                        );
                                    }
                                )}
                            </div>
                        </div>
                        <h3 className='mt-[14px] text-left md:mt-[16px]'>
                            {propertyDetail?.other_charges_text
                                ? propertyDetail.other_charges_text
                                : 'GST, AMC, IFMS & other charges additional*'}
                        </h3>
                    </div>
                    <div
                        className={`col-span-1 mt-[20px] flex flex-col md:mt-[28px] lg:col-span-4 ${
                            yourHome ? 'yourHome' : ''
                        }`}
                    >
                        <EMICalculator
                            property={propertyDetail}
                            hideAutoComplete={true}
                        />
                    </div>
                </div>
            </div>
        </motion.section>
    );
};

export default Price;
