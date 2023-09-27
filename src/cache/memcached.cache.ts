import KeyvMemcache from "@keyv/memcache";

const servers = "localhost:11211";

export const memcache = new KeyvMemcache(servers, {
  retries: 10,
  expires: 60,
});
