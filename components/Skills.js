import {
    CloudUploadIcon,
    CogIcon,
    CubeTransparentIcon,
    DatabaseIcon,
    LockClosedIcon,
    RefreshIcon,
    ServerIcon,
    ShieldCheckIcon,
    UsersIcon,
} from '@heroicons/react/outline'

const skills = [
    {
        name: 'Web 3',
        icon: CubeTransparentIcon,
        description: "Build and ship the next decentralized App on any EVM compatible block chain with Solidity Smart Contracts.",
        skillDescription: "Languages I speak",
        skillList: ['Solidity', 'Javascript', 'CSS', 'HTML'],
        toolDescription: "Frameworks & Libraries",
        toolList: ['Next.js', 'Hardhat', 'Ether.js', 'Tailwind CSS', 'Alchemy'],

    },
    {
        name: 'Data Engineering',
        icon: DatabaseIcon,
        description: "Derive better insights and build new data products with a scalable data warehouse and custom data pipelines.",
        skillDescription: "Languages I speak",
        skillList: ['Python', 'SQL'],
        toolDescription: "Frameworks & Libraries",
        toolList: ['DBT', 'Prefect', 'Superset', 'Airbyte', 'Great Expectations'],
    },
    {
        name: 'Business & Marketing',
        icon: UsersIcon,
        description: "Learn how to how to optimize your current business or get feedback on a complete new business idea.",
        skillDescription: "Experiences I draw from",
        skillList: ['SEO & SEA', 'Agile Sprints', 'BizDev'],
        toolDescription: "Tools",
        toolList: ['Ahrefs', 'Google Search Console', 'Google Tag Manager', 'Business Model Canvas', 'Notion'],
    },
]

function Skills() {
    return (
        <div className="relative py-16 sm:py-24 lg:py-32">
            <div className="mx-auto max-w-md px-4 text-center sm:max-w-3xl sm:px-6 lg:px-8 lg:max-w-7xl">
                <h2 className="text-base font-semibold tracking-wider text-blue-600 uppercase">Skills</h2>
                <p className="mt-2 text-3xl font-extrabold text-gray-900 tracking-tight sm:text-4xl">
                    What I can help you with? 💪
                </p>
                <p className="mt-5 max-w-prose mx-auto text-xl text-gray-500">
                    I am a self-taught programmer with a CEMS Master in International Management. Having both a business and deep technical understanding allows me to easily communicate complex technical ideas with business stakeholders.
                </p>
                <div className="mt-12">
                    <div className="grid grid-cols-1 gap-8 sm:grid-cols-1 lg:grid-cols-3">
                        {skills.map((skill) => (
                            <div key={skill.name} className="pt-6">
                                <div className="flow-root bg-white rounded-lg px-6 pb-8 shadow">
                                    <div className="-mt-6">
                                        <div>
                                            <span className="inline-flex items-center justify-center p-3 bg-blue-500 rounded-md shadow-lg">
                                                <skill.icon className="h-6 w-6 text-white" aria-hidden="true" />
                                            </span>
                                        </div>
                                        <h3 className="mt-8 text-lg font-medium text-gray-900 tracking-tight">{skill.name}</h3>
                                        <p className="mt-5 text-base text-gray-500">
                                            {skill.description}
                                        </p>
                                        <p className="mt-5 text-base font-medium text-blue-500">{skill.skillDescription}</p>
                                        <div>
                                            <p className="mt-2 text-base text-gray-500">{skill.skillList.join(", ")}</p>
                                        </div>
                                        <p className="mt-5 text-base font-medium text-blue-500">{skill.toolDescription}</p>
                                        <ul>
                                            {skill.toolList.map((tool) => (
                                                <li key={tool} className="mt-2 text-sm font-base text-gray-500">{tool}</li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Skills
