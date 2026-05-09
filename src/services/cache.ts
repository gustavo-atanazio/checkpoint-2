import AsyncStorage from "@react-native-async-storage/async-storage";

type CachePayload<T> = {
  savedAt: number;
  value: T;
};

const CACHE_PREFIX = "checkpoint2:";

function getStorageKey(key: string) {
  return `${CACHE_PREFIX}${key}`;
}

export async function setCache<T>(key: string, value: T): Promise<void> {
  const payload: CachePayload<T> = { savedAt: Date.now(), value };
  try {
    await AsyncStorage.setItem(getStorageKey(key), JSON.stringify(payload));
  } catch {
    // Cache failures should not block API results.
  }
}

export async function getCache<T>(key: string): Promise<T | null> {
  try {
    const raw = await AsyncStorage.getItem(getStorageKey(key));
    if (!raw) return null;
    const parsed = JSON.parse(raw) as CachePayload<T>;
    if (!parsed || typeof parsed !== "object" || !("value" in parsed)) {
      return null;
    }
    return parsed.value;
  } catch {
    return null;
  }
}
