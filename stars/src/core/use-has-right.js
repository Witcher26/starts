import authorization from './authorization'

export function useHasRight(right) {
    return authorization(right);
}