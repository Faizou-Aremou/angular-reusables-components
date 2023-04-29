export type Download<T> = {
    readonly state: 'PENDING' | 'IN_PROGRESS' | 'DONE'
    readonly progress: number
    readonly content: T | null
}