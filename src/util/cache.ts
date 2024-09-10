//import { unstable_cache } from 'next/cache'
import { unstable_cache } from "next/dist/server/web/spec-extension/unstable-cache";
import { parse, stringify } from "superjson";

export type Maybe<T> = T | undefined;
export type Callback<T, P extends unknown[]> = (...params: P) => Promise<T>;
export type Keys = Maybe<string[]>;
export type Options = { tags?: string[]; revalidate?: number | false; disableCache?: boolean };

export interface Cache {
  cache<T, P extends unknown[]>(callback: Callback<T, P>, keys: Keys, opts: Options): Callback<T, P>;
}

const cache = <T, P extends unknown[]>(callback: Callback<T, P>, keys: Keys, options: Options) => {
  return async (...params: P): Promise<T> => {
    if (options.disableCache) return callback(...params);
    const serialized = async (params: P): Promise<string> => {
        const res = callback(...params).then(stringify);
        res.then((r) => console.log('r', r));
        return res;
    }
    
    const cachedFn = unstable_cache(serialized, keys, options);
    const result = await cachedFn(params);
    return parse(result);
  };
};

export default cache;
