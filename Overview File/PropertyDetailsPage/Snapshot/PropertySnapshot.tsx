/* eslint-disable @next/next/no-img-element */
import Image from 'next/image';
import React from 'react';

import Title from '@/components/Title';

const PropertySnapshot = ({ item }: { item: any }) => {
    return (
        <div
            id='snapshot'
            className='snapshot-section container mx-auto my-20 flex flex-col'
        >
            {item?.snapshot_heading && <Title>{item?.snapshot_heading}</Title>}
            <div className='snapshot-div mt-12 w-full'>
                <div className='table-content'>
                    <table>
                        <tr>
                            <th>Parameters</th>
                            <th>Description</th>
                        </tr>
                        {item?.snapshot?.Parameters?.map(
                            (item: any, index: any) => {
                                return (
                                    <tr key={index}>
                                        <td>{item?.parameters}</td>
                                        <td>{item?.description}</td>
                                    </tr>
                                );
                            }
                        )}
                    </table>
                </div>
                {item?.snapshot?.image?.url ? (
                    <Image
                        src={item.snapshot.image.url}
                        alt={item?.snapshot_heading || 'Property snapshot'}
                        width={1200}
                        height={700}
                        quality={75}
                        sizes='(max-width: 768px) 100vw, 1200px'
                    />
                ) : null}
            </div>
        </div>
    );
};

export default PropertySnapshot;
