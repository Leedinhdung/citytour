import type React from "react"
interface PageHeaderProps {
    title: string
    description?: string
    action?: React.ReactNode
}

const PageHeader = ({ title, description, action }: PageHeaderProps) => {
    return (
        <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
            <div>
                <h1 className="text-2xl font-bold tracking-tight">{title}</h1>
                {description && <p className="text-sm text-muted-foreground">{description}</p>}
            </div>
            {action && <div>{action}</div>}
        </div>
    )
}

export default PageHeader