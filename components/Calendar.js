import React from 'react'
import Cal, { getCalApi } from "@calcom/embed-react";
import { useEffect } from 'react';


export default function Calendar() {

  useEffect(() => {
    (async function () {
      const cal = await getCalApi();
      cal("ui", { "styles": { "branding": { "brandColor": "#2563EB" } } });
    })();
  }, []);

  return (
    <div className="relative pt-16 sm:pt-24 lg:pt-32">
      <div className="mx-auto max-w-md px-4 text-center sm:max-w-3xl sm:px-6 lg:px-8 lg:max-w-7xl">
        <h2 className="text-base font-semibold tracking-wider text-blue-600 uppercase">Book a Meeting</h2>
        <p className="mt-2 text-3xl font-extrabold text-gray-900 tracking-tight sm:text-4xl">
          Interested in Working together? 🗓️
        </p>
      </div>
      <Cal className='pt-12 w-full h-full overflow-hidden' calLink="felix-vemmer/30-minute-google-hangout-chat" />
    </div>
  )
}
