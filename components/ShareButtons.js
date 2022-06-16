import React from "react";
import {
    RedditShareButton,
    RedditIcon,
    WhatsappIcon,
    WhatsappShareButton,
    FacebookShareButton,
    FacebookIcon,
    TwitterShareButton,
    TwitterIcon,
    LinkedinShareButton,
    LinkedinIcon,
    EmailShareButton,
    EmailIcon,
    TelegramShareButton,
    TelegramIcon,
} from 'next-share'

export function ShareButtons({ size, title, shareUrl, shareTitle }) {
    return (
        <div className="pt-5 pb-10 space-y-4">
            <h2 className="text-center text-gray-600">{title}</h2>
            <div className="flex justify-center space-x-2">
                <RedditShareButton url={shareUrl} title={shareTitle}>
                    <RedditIcon round size={size} />
                </RedditShareButton>
                <TwitterShareButton url={shareUrl} title={shareTitle}>
                    <TwitterIcon round size={size} />
                </TwitterShareButton>
                <TelegramShareButton url={shareUrl} title={shareTitle}>
                    <TelegramIcon round size={size} />
                </TelegramShareButton>
                <EmailShareButton url={shareUrl} title={shareTitle}>
                    <EmailIcon round size={size} />
                </EmailShareButton>
                <WhatsappShareButton url={shareUrl} title={shareTitle}>
                    <WhatsappIcon round size={size} />
                </WhatsappShareButton>
                <LinkedinShareButton url={shareUrl} title={shareTitle}>
                    <LinkedinIcon round size={size} />
                </LinkedinShareButton>
                <FacebookShareButton url={shareUrl} title={shareTitle}>
                    <FacebookIcon round size={size} />
                </FacebookShareButton>
            </div>
        </div>
    );
}
