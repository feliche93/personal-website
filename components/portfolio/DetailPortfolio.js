import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { portfolio, tagColors } from './GridList';

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export default function DetailPortfolio({ project }) {
    return (
        <div className="pt-1">
            <div className="aspect-video relative">
                {/* Cover Image */}
                <Image
                    priority={true}
                    src={project.coverImage}
                    alt={project.name}
                    layout="fill"
                    className='object-cover rounded'
                />
            </div>

            {/* Product info */}
            <div className="max-w-2xl mx-auto pt-4 pb-16 px-4 sm:px-6 lg:max-w-7xl lg:pt-4 lg:pb-24 lg:px-8 lg:grid lg:grid-cols-3 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8">
                <div className="lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
                    <h1 className="text-2xl font-extrabold tracking-tight text-gray-900 sm:text-3xl">{project.name}</h1>
                </div>

                {/* Sidebar */}
                <div className="mt-4 lg:mt-0 lg:row-span-3">

                    <form className="mt-10">
                        {/* Tags */}
                        <div>
                            <h3 className="text-sm text-gray-900 font-medium">Tags</h3>
                            <div className='space-x-2 pt-3'>
                                {project.tags.map((tag) => (
                                    <span key={tag} className={
                                        classNames(
                                            "inline-flex items-center px-2.5 py-0.5 rounded-full text-sm font-medium",
                                            tagColors[tag].bgColorClass,
                                            tagColors[tag].textColorClass
                                        )}>
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </div>

                        {/* Frameworks */}
                        <div className="mt-10">
                            <div className="flex items-center justify-between">
                                <h3 className="text-sm text-gray-900 font-medium">Framework or Service Used</h3>
                            </div>

                            <div className="pt-3 flex flex-row space-x-3">
                                {project.frameworks.map((framework) => (
                                    <a key={framework.name} href={framework.href}>
                                        <Image
                                            src={framework.image}
                                            alt={framework.name}
                                            className='object-contain cursor-pointer'
                                            width={50}
                                            height={50}
                                        />
                                    </a>
                                ))}
                            </div>
                        </div>

                        <Link href={project.demoHref}>
                            <a className="mt-10 w-full bg-blue-600 border border-transparent rounded-md py-3 px-8 flex items-center justify-center text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                                Go to Demo
                            </a>
                        </Link>

                    </form>
                </div>

                <div className="py-10 lg:pt-6 lg:pb-16 lg:col-start-1 lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
                    {/* Description and details */}
                    <div>
                        <h3 className="sr-only">Description</h3>

                        <div className="space-y-6">
                            <p className="text-base text-gray-900">{project.description}</p>
                        </div>
                    </div>

                    <div className="mt-10">
                        <h3 className="text-sm font-medium text-gray-900">Skills</h3>

                        <div className="mt-4">
                            <ul role="list" className="pl-4 list-disc text-sm space-y-2">
                                {project.skills.map((skill) => (
                                    <li key={skill} className="text-gray-600">
                                        <span className="text-gray-600">{skill}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    {/* <div className="mt-10">
                            <h2 className="text-sm font-medium text-gray-900">Details</h2>

                            <div className="mt-4 space-y-6">
                                <p className="text-sm text-gray-600">{product.details}</p>
                            </div>
                        </div> */}
                </div>
            </div>
        </div>
    )
}
