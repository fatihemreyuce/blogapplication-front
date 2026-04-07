import { cookies } from "next/headers";

export class FetchError extends Error {
  constructor(
    public readonly status: number,
    public readonly statusText: string,
    public readonly data: unknown
  ) {
    super(`HTTP ${status}: ${statusText}`);
    this.name = "FetchError";
  }
}

type CacheOptions = {
  cache?: RequestCache;
  revalidate?: number | false;
  tags?: string[];
};

type FetchOptions = Omit<RequestInit, "body" | "cache"> &
  CacheOptions & {
    body?: Record<string, unknown> | FormData | string | null;
    params?: Record<string, string | number | boolean | undefined | null>;
    /**
     * Supabase access_token cookie'sini Authorization header olarak ekler.
     * Varsayılan: true
     */
    withAuth?: boolean;
  };

type FetchResult<T> = {
  data: T;
  status: number;
  headers: Headers;
};

function buildUrl(
  base: string,
  params?: FetchOptions["params"]
): string {
  if (!params) return base;

  const filtered = Object.entries(params).filter(
    ([, v]) => v !== undefined && v !== null
  ) as [string, string | number | boolean][];

  if (filtered.length === 0) return base;

  const qs = new URLSearchParams(
    filtered.map(([k, v]) => [k, String(v)])
  ).toString();

  return `${base}?${qs}`;
}

async function request<T>(
  url: string,
  options: FetchOptions = {}
): Promise<FetchResult<T>> {
  const {
    body,
    params,
    headers: customHeaders,
    withAuth = true,
    cache,
    revalidate,
    tags,
    ...rest
  } = options;

  const isFormData = body instanceof FormData;
  const headers = new Headers(customHeaders);

  if (!isFormData && body && typeof body === "object") {
    headers.set("Content-Type", "application/json");
  }

  if (withAuth) {
    const cookieStore = await cookies();
    const token = cookieStore.get("sb-access-token")?.value;
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }
  }

  // Next.js extended fetch cache options
  const nextOptions: RequestInit["next"] = {};
  if (revalidate !== undefined) nextOptions.revalidate = revalidate;
  if (tags?.length) nextOptions.tags = tags;

  const res = await fetch(buildUrl(url, params), {
    ...rest,
    headers,
    cache: revalidate !== undefined || tags?.length ? undefined : cache,
    next: Object.keys(nextOptions).length > 0 ? nextOptions : undefined,
    body: isFormData
      ? body
      : body
        ? JSON.stringify(body)
        : undefined,
  });

  let data: unknown;
  const contentType = res.headers.get("Content-Type") ?? "";

  if (contentType.includes("application/json")) {
    data = await res.json();
  } else {
    data = await res.text();
  }

  if (!res.ok) {
    throw new FetchError(res.status, res.statusText, data);
  }

  return { data: data as T, status: res.status, headers: res.headers };
}

export const fetchServer = {
  get<T>(url: string, options?: Omit<FetchOptions, "body">) {
    return request<T>(url, { ...options, method: "GET" });
  },

  post<T>(url: string, body?: FetchOptions["body"], options?: FetchOptions) {
    return request<T>(url, { ...options, method: "POST", body });
  },

  put<T>(url: string, body?: FetchOptions["body"], options?: FetchOptions) {
    return request<T>(url, { ...options, method: "PUT", body });
  },

  patch<T>(url: string, body?: FetchOptions["body"], options?: FetchOptions) {
    return request<T>(url, { ...options, method: "PATCH", body });
  },

  delete<T>(url: string, options?: FetchOptions) {
    return request<T>(url, { ...options, method: "DELETE" });
  },
};
