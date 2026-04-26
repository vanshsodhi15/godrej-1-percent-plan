/* eslint-disable unused-imports/no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/jsx-indent */
import { yupResolver } from '@hookform/resolvers/yup';
import axios from 'axios';
import { motion } from 'framer-motion';
import { PhoneNumberUtil } from 'google-libphonenumber';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { parsePhoneNumber } from 'react-phone-number-input';
import * as yup from 'yup';

import { COUNTRIES } from '@/components/CountrySelector/countries';
import PhoneNoInput from '@/components/PhoneNoInput';
import Title from '@/components/Title';

import PHONECOUNTRYCODE from '@/constant/phoneCountries';
import { useEnquiryPopupContextSafe } from '@/context/EnquiryPopupContext';
import { useUtaContext } from '@/context/UtaContext';
import cardVariants, { theObj } from '@/utils/cardVariants';

declare module 'yup' {
    interface StringSchema {
        phone(message?: string): StringSchema;
    }
}
interface Props {
    item?: any;
    hideAutoComplete?: boolean;
}
const GetInTouch = ({ item, hideAutoComplete }: Props) => {
    const [isSuccess, setIsSuccess] = useState(false);
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const [input, setInput] = useState({
        name: '',
        phone: '',
        email: '',
    });
    const [optSelect, setoptSelect] = useState(true);
    const [phoneCountry, setPhoneCountry] = useState('IN');
    const utaVariable = useUtaContext();
    const enquiryPopupContext = useEnquiryPopupContextSafe();

    const handleChange = (e: any) => {
        setInput({
            ...input,
            [e.target.name]: e.target.value,
        });
    };
    const phoneUtil = PhoneNumberUtil.getInstance();

    yup.addMethod(yup.string, 'phone', function (message) {
        return this.test('phone', message, function (value) {
            const { path, createError } = this;

            if (value == undefined || value == '' || value == null) {
                return createError({
                    path,
                    message:
                        message ||
                        `Enter a valid phone number for ${phoneCountry}`,
                });
            }
            const isValid = phoneUtil.isValidNumber(
                phoneUtil.parse(value, phoneCountry)
            );

            return (
                isValid ||
                createError({
                    path,
                    message:
                        message ||
                        `Enter a valid phone number for ${phoneCountry}`,
                })
            );
        });
    });
    const schema = yup.object({
        phone: yup.string().phone().min(11, 'Enter A Valid Number'),
        email: yup
            .string()
            .email('Enter Valid Email')
            .required({ message: 'Email is required' }),
        lastName: yup.string().required({ message: 'Name is required' }),
    });

    const {
        control,
        formState: { errors },
        getValues,
        register,
        handleSubmit: formSubmit,
    }: any = useForm({
        resolver: yupResolver(schema),
    });

    const handleSubmit = async (e: any) => {
        setLoading(true);
        try {
            const parsedPhone = parsePhoneNumber(getValues().phone);
            const parsedCountryName = COUNTRIES.find(
                (option: any) => option.value === parsedPhone?.country
            );
            const res = await axios.post('/api/enquiry', {
                formData: {
                    firstName: input.name.split(' ')[0],
                    lastName: input.name.split(' ')[1],
                    email: input.email,
                    optIn: optSelect ? 'Yes' : 'No',
                    visitDate: '2015-07-07T11:11:11',
                    ...getValues(),
                    phone: parsedPhone?.nationalNumber,
                    countryCode: '+' + parsedPhone?.countryCallingCode,
                    country: parsedCountryName?.title,
                    // getInTouch: true,
                    propertyType: item?.residentialType,
                    OrganicCampagnID: utaVariable?.campid,
                    websiteName: utaVariable?.websiteName,
                    property: {
                        id: item?.id,
                        name: item?.name,
                        city: item?.city.name,
                        addCode: item?.add_code,
                        projCode: item?.proj_code,
                        url: location.href,
                    },
                },
                // token: token.data,
            });
            if (res.status === 200) {
                setLoading(false);
                setIsSuccess(true);
                // Mark enquiry as submitted (for popup suppression)
                enquiryPopupContext?.markEnquirySubmitted();
            }
        } catch (error) {
            /* empty */
            setLoading(false);
        }
    };
    useEffect(() => {
        if (isSuccess) {
            router.push('/getintouch-success');
        }
    }, [isSuccess]);
    useEffect(() => {
        const removeNode = document.querySelector('.countryCode');
        if (removeNode) {
            removeNode.remove();
        }

        const node = document.querySelector('.PhoneInputCountry'),
            ele = document.createElement('div');
        ele.className = 'countryCode';
        ele.innerHTML = `${
            PHONECOUNTRYCODE[phoneCountry]
                ? PHONECOUNTRYCODE[phoneCountry]
                : '0'
        }`;
        node?.parentNode &&
            node?.parentNode.insertBefore(ele, node.nextSibling);
    }, [phoneCountry]);

    return (
        <motion.section
            id='property-get-in-touch-footer'
            className='get-in-touch-section property-details-connect pb-[80px]'
            {...theObj}
            variants={cardVariants}
        >
            {' '}
            {loading ? (
                <div className='loading-div-getintouch'>
                    <div
                        className='text-success inline-block h-20 w-20 animate-spin rounded-full border-4 border-solid border-current border-green-500 border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]'
                        role='status'
                    >
                        <span className='!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]'>
                            Loading...
                        </span>
                    </div>
                </div>
            ) : (
                !isSuccess && (
                    <div className='get-in-touch-container container mx-auto flex flex-col'>
                        <Title>Get in touch</Title>
                        <p className='lead mt-[20px] text-center md:mt-[28px]'>
                            If you would like to know more details or something
                            specific, feel free to contact us. Our site
                            representative will give you a call back.
                        </p>
                        <div className='get-in-touch-card mt-[20px] p-6 md:mt-[28px]'>
                            <form
                                className='flex items-center'
                                onSubmit={(e) => {
                                    e.preventDefault();
                                }}
                                id='FORM_SUBMIT__GET_IN_TOUCH_CARD_04'
                            >
                                <div className='flex flex-col'>
                                    <div className='flex flex-col items-center gap-8 md:flex-row'>
                                        <label className='w-full flex-1 font-primary'>
                                            <p>Name*</p>
                                            <input
                                                id='FORM_USER_NAME_01'
                                                // placeholder='Name'
                                                autoComplete={
                                                    hideAutoComplete
                                                        ? 'off'
                                                        : 'on'
                                                }
                                                name='name'
                                                // value={input.name}
                                                // onChange={handleChange}
                                                {...register('lastName')}
                                                type='text'
                                                className='flex-1'
                                            />
                                            {errors.lastName && (
                                                <p
                                                    role='alert'
                                                    className='text-red-500'
                                                >
                                                    {errors.lastName.message
                                                        .message ||
                                                        errors.lastName.message}
                                                </p>
                                            )}
                                        </label>
                                        <label
                                            className='w-full flex-1 font-primary'
                                            htmlFor=''
                                        >
                                            <p>
                                                {' '}
                                                Mobile* (Click flag to change
                                                country)
                                            </p>
                                            <Controller
                                                name='phone'
                                                control={control}
                                                defaultValue=''
                                                rules={{
                                                    minLength: 11,
                                                }}
                                                render={({ field }) => (
                                                    <PhoneNoInput
                                                        {...field}
                                                        value={field.value}
                                                        errors={
                                                            errors.phone
                                                                ? true
                                                                : false
                                                        }
                                                        country={phoneCountry}
                                                        onCountryChange={(e) =>
                                                            setPhoneCountry(e)
                                                        }
                                                        isError={
                                                            !!errors.phone
                                                                ?.message
                                                        }
                                                        id='FORM_USER_MOBILE_02'
                                                    />
                                                )}
                                            />

                                            {errors?.phone && (
                                                <p
                                                    role='alert'
                                                    className='text-red-500'
                                                >
                                                    {errors?.phone?.message}
                                                </p>
                                            )}
                                        </label>
                                        <label className='w-full flex-1 font-primary'>
                                            <p>Email ID*</p>
                                            <input
                                                // placeholder='Email ID '
                                                className='flex-1'
                                                name='email'
                                                autoComplete={
                                                    hideAutoComplete
                                                        ? 'off'
                                                        : 'on'
                                                }
                                                // value={input.email}
                                                // onChange={handleChange}
                                                {...register('email')}
                                                type='text'
                                                id='FORM_USER_EMAIL_03'
                                            />
                                            {errors.email && (
                                                <p
                                                    role='alert'
                                                    className='text-red-500'
                                                >
                                                    {errors.email.message
                                                        .message ||
                                                        errors.email.message}
                                                </p>
                                            )}
                                        </label>
                                    </div>
                                    <label
                                        htmlFor='FORM_USER_SUBSCRIBE_04'
                                        className='checkbox-default mt-[14px] flex items-center pt-4 md:mt-[16px]'
                                    >
                                        <input
                                            type='checkbox'
                                            onChange={() =>
                                                setoptSelect(!optSelect)
                                            }
                                            checked={optSelect ? true : false}
                                            className=''
                                            name='status'
                                            id='FORM_USER_SUBSCRIBE_04'
                                        />
                                        <span className='font-primary text-[14px] leading-8'>
                                            Yes, I would like to receive updates
                                            & promotions from Godrej Properties
                                            Limited.
                                        </span>
                                    </label>
                                </div>
                                <button
                                    className='gtm-footer-form btn-black'
                                    onClick={formSubmit(handleSubmit)}
                                >
                                    send
                                </button>
                            </form>
                        </div>
                    </div>
                )
            )}
        </motion.section>
    );
};

export default GetInTouch;
