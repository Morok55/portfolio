import React from 'react'
import { FaGithub, FaTelegram, FaWhatsapp } from "react-icons/fa";
import MailCopyIcon from './MailCopyIcon';

const GeneralFooter = () => {
    return (
        <footer className='relative mt-auto flex flex-col items-center text-gray-300 mb-6 gap-2 md:flex-row md:justify-evenly'>
            
            <div className='flex gap-x-4 md:order-last'>
                <a className='text-4xl hover:text-primary-color hover:animate-bounce' target='_blank' href="https://t.me/unknown955">
                    <FaTelegram />
                </a>

                <a className='text-4xl hover:text-primary-color hover:animate-bounce' target='_blank' href="https://wa.me/79614852184">
                    <FaWhatsapp />
                </a>

                <a className='text-4xl hover:text-primary-color hover:animate-bounce' target='_blank' href="https://github.com/Morok55">
                    <FaGithub />
                </a>

                <a className='text-4xl hover:text-primary-color hover:animate-bounce' target='_blank' href="mailto:kazadaevalex@yandex.ru">
                    <MailCopyIcon />
                </a>
            </div>

            {/* <p className='md:order-2'>• Copyright ©2023 | All rights reserved • </p> */}
            {/* <p>@diegotellezc</p> */}
        </footer>
    )
}

export default GeneralFooter
