import { useNavigate } from 'react-router-dom'

const StatusCard = ({ title, count, description, color = "blue", icon: Icon }) => {
    const colorClasses = {
        blue: "text-blue-500",
        green: "text-green-500", 
        yellow: "text-yellow-500",
        red: "text-red-500",
        purple: "text-purple-500",
        gray: "text-gray-500"
    }

    const navigate = useNavigate()

    const filterapplicationsbystatus = (title) => {
       
            navigate(`/dashboard/${title.toLowerCase()}`)
        
    }

    return (
        <div className="p-4 bg-white rounded-2xl border-1 border-gray-300 hover:shadow-lg transition-shadow" onClick={() => filterapplicationsbystatus(title)}>
            <div className="flex flex-col justify-between gap-3">
                <div className="flex items-center justify-between">
                    <h1 className="text-lg font-bold text-gray-800">{title}</h1>
                    {Icon && <Icon size={20} className="text-gray-400" />}
                </div>

                <div className="flex flex-col justify-between gap-2">
                    <h1 className={`text-2xl font-bold ${colorClasses[color]}`}>
                        {count || 0}
                    </h1>
                    <p className="text-sm text-gray-500">{description}</p>
                </div>
            </div>
        </div>
    )
}

export default StatusCard
