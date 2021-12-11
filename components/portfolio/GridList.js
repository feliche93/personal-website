import React from 'react'
import { CheckCircleIcon, ChevronRightIcon } from '@heroicons/react/solid'
import {portfolio, tagColors} from '../../data/portfolio';
import moment from 'moment'
import Link from 'next/link'


function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export default function GridList() {
    console.log(portfolio)
    console.log(tagColors)
    return (
        <div className="bg-white shadow overflow-hidden sm:rounded-md">
            <ul role="list" className="divide-y divide-gray-200">
                {portfolio.map((project) => (
                    <Link key={project.href} href={project.href}>
                        <a className="block hover:bg-gray-50">
                            <div className="flex items-center px-4 py-4 sm:px-6">
                                <div className="min-w-0 flex-1 flex items-center">
                                    <div className="min-w-0 flex-1 px-4 md:grid md:grid-cols-2 md:gap-4">
                                        <div>
                                            <p className="text-sm font-medium text-blue-600 truncate">{project.name}</p>
                                            <div className='space-x-2'>
                                                {project.tags.map((tag) => (
                                                    <span key={tag} className={
                                                        classNames(
                                                            "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium",
                                                            tagColors[tag].bgColorClass,
                                                            tagColors[tag].textColorClass
                                                        )}>
                                                        {tag}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                        <div className="hidden md:block">
                                            <div>
                                                <p className="text-sm text-gray-900">
                                                    Completed on <time dateTime={project.date}>{moment(project.date).format('MMMM Do YYYY')}</time>
                                                </p>
                                                <p className="mt-2 flex items-center text-sm text-gray-500">
                                                    <CheckCircleIcon className="flex-shrink-0 mr-1.5 h-5 w-5 text-green-400" aria-hidden="true" />
                                                    {project.demo}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <ChevronRightIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                                </div>
                            </div>
                        </a>
                    </Link>
                ))}
            </ul>
        </div>
    )
}

