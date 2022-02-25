//@useEffects()
export function useTapEffects() {
    return (target: {}, key: PropertyKey,descriptor:any): any => {
        console.log(target,key,descriptor)
    }
}