
import { CursorClickIcon, LightningBoltIcon, MailOpenIcon, SparklesIcon, SwitchHorizontalIcon, UsersIcon } from '@heroicons/react/outline'
import GasPriceCard from './GasPriceCard'

const stats = [
    { id: 1, name: 'Standard', stat: '71,897', icon: SwitchHorizontalIcon, change: '122', changeType: 'increase' },
    { id: 2, name: 'Fast', stat: '58.16%', icon: SparklesIcon, change: '5.4%', changeType: 'increase' },
    { id: 3, name: 'Instant', stat: '24.57%', icon: LightningBoltIcon, change: '3.2%', changeType: 'decrease' },
]

export default function GasPriceListCard() {
    return (
        <div>
            <h3 className="text-lg leading-6 font-medium text-gray-900">Last 30 days</h3>

            <dl className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {stats.map((item) => (
                    <GasPriceCard item={item} />
                ))}
            </dl>
        </div>
    )
}