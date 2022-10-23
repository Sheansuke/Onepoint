import { FC } from "react"

interface IStat {
    title: string
    value: string | number
    shortDescription: string
}

export const Stat: FC<IStat> = ({
    title,
    value,
    shortDescription
}) => {
    return (
        <div className="stat place-items-center">
            <div className="stat-title font-bold text-2xl">{title}</div>
            <div className="stat-value text-main-500">{value}</div>
            <div className="stat-desc">{shortDescription}</div>
        </div>
    )
}
