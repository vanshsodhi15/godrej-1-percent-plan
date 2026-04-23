/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
import Image from 'next/image';
import { useRouter } from 'next/router';

import ReactImage from '@/components/ReactImage';

import Enlarge from './assets/zoom.gif';

const MasterPlans = (props: any) => {
    const { item } = props;
    const router = useRouter();

    const city = String(item?.city?.name).toLowerCase();
    const residentialType = String(item?.residentialType).toLowerCase();

    return (
        <figure
            className='master-plan-container mt-12 flex justify-center'
            onClick={() => {
                router.push(
                    `/${city}/${residentialType}/${item?.slug}/master-plan`,
                    undefined,
                    {
                        shallow: true,
                    }
                );
            }}
        >
            <ReactImage
                className='cursor-pointer'
                src={item.plans?.master_plan_fullscreen?.master_image?.url}
                alt={item.plans?.master_plan_fullscreen?.master_alt_text}
                layout='fill'
            />
            <div className='enlarge-status'>
                <span className='click-to-enlarge'>Click to Interact</span>
                <Image
                    loading='lazy'
                    src={Enlarge}
                    alt='enlarge'
                    width={40}
                    height={40}
                />
            </div>
        </figure>
    );
};

export default MasterPlans;
