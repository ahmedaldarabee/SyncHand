export const formatingDate = (timestamp: number):string => {
    return new Date(timestamp).toLocaleDateString("en-US",{
        year: "numeric",
        month:"numeric",
        day:"numeric"
    })
}